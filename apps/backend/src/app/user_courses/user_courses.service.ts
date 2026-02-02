import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GetCourseStudentsDto } from './dto/get-course-students.dto';
import { UserCourseStatus } from '@/enums/enum';

@Injectable()
export class UserCoursesService {
  private readonly logger = new Logger(UserCoursesService.name);
  private readonly prisma = new PrismaClient();

  async getCourseStudents(courseId: string, query: GetCourseStudentsDto) {
    try {
      const page = Number(query.page ?? 0);
      const pageSize = Number(query.pageSize ?? 20);
      const status = query.status !== undefined ? Number(query.status) : undefined;

      //this.logger.log(`getCourseStudents: courseId=${courseId}, page=${page}, pageSize=${pageSize}, status=${status}`);

      /* ================== 1️⃣ USER COURSES ================== */
      const [userCourses, total] = await this.prisma.$transaction([
        this.prisma.userCourse.findMany({
          where: {
            course_id: courseId,
            del_flg: false,
            ...(status !== undefined && { status }),
            ...(query.search && {
              user: {
                is: {
                  OR: [{ name: { contains: query.search, mode: 'insensitive' } }, { email: { contains: query.search, mode: 'insensitive' } }],
                },
              },
            }),
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
          orderBy: { enrolled_at: 'desc' },
          skip: page * pageSize,
          take: pageSize,
        }),
        this.prisma.userCourse.count({
          where: {
            course_id: courseId,
            del_flg: false,
            ...(status !== undefined && { status }),
          },
        }),
      ]);

      //this.logger.log(`Found ${userCourses.length} userCourses, total=${total}`);

      if (!userCourses.length) {
        //this.logger.log('No user courses found, returning empty array');
        return { data: [], total, page, pageSize };
      }

      const userIds = userCourses.map((u) => u.user_id);
      //this.logger.log(`User IDs: ${userIds.join(', ')}`);

      /* ================== 2️⃣ TỔNG SỐ LESSON TRONG KHÓA HỌC (ALL TYPES) ================== */
      const totalLessons = await this.prisma.lesson.count({
        where: {
          del_flg: false,
          section: {
            course_id: courseId,
            del_flg: false,
          },
        },
      });

      //this.logger.log(`Total lessons in course: ${totalLessons}`);

      /* ================== 3️⃣ CHECK IF COURSE HAS QUIZ LESSONS ================== */
      const hasQuizLessons = await this.prisma.lesson.findFirst({
        where: {
          lesson_type: 2, // QUIZ lesson type
          del_flg: false,
          section: {
            course_id: courseId,
            del_flg: false,
          },
        },
        select: {
          lesson_id: true,
        },
      });

      //this.logger.log(`Course has quiz lessons: ${!!hasQuizLessons}`);

      /* ================== 4️⃣ CHECK IF COURSE HAS FINAL EXAM ================== */
      const courseHasFinalExam = await this.prisma.quiz.findFirst({
        where: {
          course_id: courseId,
          quiz_type: 3, // FINAL_EXAM
          del_flg: false,
        },
        select: {
          quiz_id: true,
          passing_score: true,
          title: true,
        },
      });

      //this.logger.log(`Course has final exam: ${!!courseHasFinalExam}`);
      if (courseHasFinalExam) {
        //this.logger.log(`Final exam ID: ${courseHasFinalExam.quiz_id}, passing score: ${courseHasFinalExam.passing_score}`);
      }

      /* ================== 5️⃣ USER LESSON PROGRESS - Lấy tất cả lessons đã hoàn thành ================== */
      const completedProgress = await this.prisma.userLessonProgress.findMany({
        where: {
          course_id: courseId,
          user_id: { in: userIds },
          completed: 2, // CHỈ LẤY LESSON ĐÃ HOÀN THÀNH
        },
        select: {
          user_id: true,
          lesson_id: true,
        },
      });

      //this.logger.log(`Found ${completedProgress.length} completed progress records`);

      // LOG CHI TIẾT ĐỂ DEBUG
      const progressByUser = new Map<string, Set<string>>();
      completedProgress.forEach((p) => {
        if (!progressByUser.has(p.user_id)) {
          progressByUser.set(p.user_id, new Set());
        }
        progressByUser.get(p.user_id)!.add(p.lesson_id);
      });

      // Gom số lesson hoàn thành theo user (CHỈ ĐẾM LESSON DUY NHẤT)
      const completedLessonsMap = new Map<string, number>();
      progressByUser.forEach((lessonSet, userId) => {
        completedLessonsMap.set(userId, lessonSet.size);
      });

      /* ================== 6️⃣ CHECK STARTED LESSONS ================== */
      const startedLessons = await this.prisma.userLessonProgress.groupBy({
        by: ['user_id'],
        where: {
          course_id: courseId,
          user_id: { in: userIds },
        },
        _count: {
          lesson_id: true,
        },
      });

      const startedMap = new Map(startedLessons.map((p) => [p.user_id, p._count.lesson_id]));

      /* ================== 7️⃣ FINAL EXAM RESULTS - SỬA LOGIC ================== */
      type ExamStatus = 'Passed' | 'Failed' | 'Not attempted' | 'Not required' | 'In progress';
      const examMap = new Map<string, ExamStatus>();

      if (courseHasFinalExam) {
        // Lấy tất cả attempts của final exam cho các user
        const exams = await this.prisma.userQuizProgress.findMany({
          where: {
            user_id: { in: userIds },
            quiz_id: courseHasFinalExam.quiz_id,
          },
          select: {
            user_id: true,
            status: true,
            score: true,
            percentage: true,
            passed: true,
            attempts: true,
          },
          orderBy: {
            attempts: 'desc',
          },
        });

        //this.logger.log(`Found ${exams.length} final exam attempts`);

        // Nhóm theo user (lấy attempt mới nhất)
        const latestAttempts = new Map<string, any>();
        exams.forEach((e) => {
          if (!latestAttempts.has(e.user_id)) {
            latestAttempts.set(e.user_id, e);
          }
        });

        // Xác định trạng thái cho từng user
        userIds.forEach((userId) => {
          const exam = latestAttempts.get(userId);

          if (!exam) {
            examMap.set(userId, 'Not attempted');
            //this.logger.log(`User ${userId}: Exam NOT ATTEMPTED`);
            return;
          }

          // Dựa vào status và passed để xác định trạng thái
          switch (exam.status) {
            case 1: // IN_PROGRESS
              examMap.set(userId, 'In progress');
              //this.logger.log(`User ${userId}: Exam IN PROGRESS (status=1)`);
              break;

            case 2: // COMPLETED
              if (exam.passed) {
                examMap.set(userId, 'Passed');
                //this.logger.log(`User ${userId}: Exam PASSED (passed=${exam.passed}, score=${exam.score})`);
              } else {
                examMap.set(userId, 'Failed');
                //this.logger.log(`User ${userId}: Exam FAILED (passed=${exam.passed}, score=${exam.score})`);
              }
              break;

            case 3: // ABANDONED
              examMap.set(userId, 'Not attempted');
              //this.logger.log(`User ${userId}: Exam ABANDONED (status=3)`);
              break;

            default:
              examMap.set(userId, 'Not attempted');
              //this.logger.log(`User ${userId}: Exam UNKNOWN STATUS (status=${exam.status})`);
          }
        });
      } else if (hasQuizLessons) {
        // Xử lý quiz lessons (logic cũ)
        //this.logger.log('Course has quiz lessons but no final exam, checking quiz completion');

        const lessonQuizzes = await this.prisma.lessonQuiz.findMany({
          where: {
            lesson_id: hasQuizLessons.lesson_id, // Chỉ kiểm tra quiz lesson đầu tiên (hoặc tất cả)
            // Nếu muốn kiểm tra tất cả quiz lessons:
            // lesson: {
            //   lesson_type: 2,
            //   del_flg: false,
            //   section: {
            //     course_id: courseId,
            //     del_flg: false,
            //   },
            // },
          },
          select: {
            quiz_id: true,
          },
        });

        const quizIds = lessonQuizzes.map((lq) => lq.quiz_id);
        //this.logger.log(`Quiz IDs in quiz lessons: ${quizIds.join(', ')}`);

        if (quizIds.length === 0) {
          userIds.forEach((userId) => {
            examMap.set(userId, 'Not required');
          });
          //this.logger.log('No quizzes found in quiz lessons');
          return;
        }

        // 2. Kiểm tra user đã hoàn thành quiz chưa
        const quizProgress = await this.prisma.userQuizProgress.findMany({
          where: {
            user_id: { in: userIds },
            quiz_id: { in: quizIds },
            course_id: courseId,
            lesson_id: { not: null },
          },
          select: {
            user_id: true,
            quiz_id: true,
            status: true,
            passed: true,
          },
        });

        //this.logger.log(`Found ${quizProgress.length} quiz progress records`);

        // 3. Nhóm progress theo user
        const userQuizProgress = new Map<string, { status: number; passed: boolean }[]>();
        quizProgress.forEach((qp) => {
          if (!userQuizProgress.has(qp.user_id)) {
            userQuizProgress.set(qp.user_id, []);
          }
          userQuizProgress.get(qp.user_id)!.push(qp);
        });

        // 4. Xác định trạng thái cho từng user
        for (const userId of userIds) {
          const progresses = userQuizProgress.get(userId) || [];

          if (progresses.length === 0) {
            examMap.set(userId, 'Not attempted');
            //this.logger.log(`User ${userId}: No quiz progress found`);
            continue;
          }

          // Kiểm tra xem user đã passed ít nhất 1 quiz chưa
          const hasPassed = progresses.some((p) => p.status === 2 && p.passed === true);
          const hasInProgress = progresses.some((p) => p.status === 1);
          const hasCompleted = progresses.some((p) => p.status === 2);

          if (hasPassed) {
            examMap.set(userId, 'Passed');
            //this.logger.log(`User ${userId}: Quiz PASSED`);
          } else if (hasInProgress) {
            examMap.set(userId, 'In progress');
            //this.logger.log(`User ${userId}: Quiz IN PROGRESS`);
          } else if (hasCompleted) {
            examMap.set(userId, 'Failed');
            //this.logger.log(`User ${userId}: Quiz FAILED`);
          } else {
            examMap.set(userId, 'Not attempted');
            //this.logger.log(`User ${userId}: Quiz NOT ATTEMPTED`);
          }
        }
      } else {
        userIds.forEach((userId) => {
          examMap.set(userId, 'Not required');
        });
        //this.logger.log('Course has no final exam and no quiz lessons');
      }

      /* ================== 8️⃣ MERGE DATA ================== */
      const data = userCourses.map((uc) => {
        const completedCount = completedLessonsMap.get(uc.user_id) || 0;
        const startedCount = startedMap.get(uc.user_id) || 0;

        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        let lessonStatus: 'Not started' | 'In progress' | 'Completed';
        if (startedCount === 0) {
          lessonStatus = 'Not started';
        } else if (completedCount >= totalLessons) {
          lessonStatus = 'Completed';
        } else {
          lessonStatus = 'In progress';
        }

        let finalStatus: 'Active' | 'Completed' | 'Expired' = this.mapStatus(uc.status);
        const userExamStatus = examMap.get(uc.user_id);

        if (lessonStatus === 'Completed') {
          if (!courseHasFinalExam && !hasQuizLessons) {
            finalStatus = 'Completed';
          } else if (courseHasFinalExam && userExamStatus === 'Passed') {
            finalStatus = 'Completed';
          } else if (hasQuizLessons && (userExamStatus === 'Passed' || userExamStatus === 'Not required')) {
            finalStatus = 'Completed';
          }
        }

        //this.logger.log(`User ${uc.user_id}: ${completedCount}/${totalLessons} lessons, progress=${progress}%, exam=${userExamStatus}, finalStatus=${finalStatus}`);

        return {
          user_id: uc.user.id,
          name: uc.user.name,
          email: uc.user.email,
          avatar: uc.user.avatar,
          enrolledDate: uc.enrolled_at,
          progress,
          lessonStatus,
          completedLessons: completedCount,
          totalLessons,
          finalExam: userExamStatus || 'Not required',
          status: finalStatus,
        };
      });

      return {
        data,
        total,
        page,
        pageSize,
      };
    } catch (error: any) {
      this.logger.error(`Error in getCourseStudents: ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  async getStudentDetail(courseId: string, userId: string) {
    try {
      //this.logger.log(`getStudentDetail: courseId=${courseId}, userId=${userId}`);

      /* ================== 1️⃣ USER COURSE ================== */
      const userCourse = await this.prisma.userCourse.findFirst({
        where: {
          course_id: courseId,
          user_id: userId,
          del_flg: false,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      });

      if (!userCourse) {
        throw new Error('User not enrolled in this course');
      }

      /* ================== 2️⃣ TỔNG SỐ LESSON TRONG KHÓA HỌC ================== */
      const totalLessons = await this.prisma.lesson.count({
        where: {
          del_flg: false,
          section: {
            course_id: courseId,
            del_flg: false,
          },
        },
      });

      //this.logger.log(`Total lessons in course: ${totalLessons}`);

      /* ================== 3️⃣ CHECK IF COURSE HAS QUIZ LESSONS ================== */
      const hasQuizLessons = await this.prisma.lesson.findFirst({
        where: {
          lesson_type: 2,
          del_flg: false,
          section: {
            course_id: courseId,
            del_flg: false,
          },
        },
        select: {
          lesson_id: true,
        },
      });

      //this.logger.log(`Course has quiz lessons: ${!!hasQuizLessons}`);

      /* ================== 4️⃣ CHECK IF COURSE HAS FINAL EXAM ================== */
      const courseHasFinalExam = await this.prisma.quiz.findFirst({
        where: {
          course_id: courseId,
          quiz_type: 3,
          del_flg: false,
        },
        select: {
          quiz_id: true,
          passing_score: true,
          title: true,
        },
      });

      //this.logger.log(`Course has final exam: ${!!courseHasFinalExam}`);
      if (courseHasFinalExam) {
        //this.logger.log(`Final exam details: ID=${courseHasFinalExam.quiz_id}, Title=${courseHasFinalExam.title}, Passing=${courseHasFinalExam.passing_score}`);
      }

      /* ================== 5️⃣ USER PROGRESS ================== */
      const completedProgress = await this.prisma.userLessonProgress.groupBy({
        by: ['lesson_id'],
        where: {
          course_id: courseId,
          user_id: userId,
          completed: 2,
        },
        _count: {
          lesson_id: true,
        },
      });

      const completedCount = completedProgress.length;
      const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
      //this.logger.log(`Progress: ${completedCount}/${totalLessons} = ${progress}%`);

      /* ================== 6️⃣ FINAL EXAM / QUIZ RESULTS - SỬA LOGIC ================== */
      type ExamResultType = 'Passed' | 'Failed' | 'Not attempted' | 'Not required' | 'In progress';
      let examResult: ExamResultType = 'Not required';
      let finalExamScore: number | null = null;
      let finalExamPassingScore: number | null = null;
      let finalExamDetails: any = null;

      if (courseHasFinalExam) {
        // Lấy attempt mới nhất của user cho final exam
        const latestExam = await this.prisma.userQuizProgress.findFirst({
          where: {
            user_id: userId,
            quiz_id: courseHasFinalExam.quiz_id,
            course_id: courseId,
          },
          select: {
            progress_id: true,
            status: true,
            score: true,
            percentage: true,
            passed: true,
            attempts: true,
            started_at: true,
            completed_at: true,
            total_questions: true,
            correct_answers: true,
          },
          orderBy: {
            attempts: 'desc',
          },
        });

        //this.logger.log(`Final exam attempt found: ${!!latestExam}`);
        finalExamDetails = latestExam;
        finalExamPassingScore = courseHasFinalExam.passing_score;

        if (latestExam) {
          finalExamScore = latestExam.score;

          // QUY TẮC MỚI: Dựa vào status và passed
          switch (latestExam.status) {
            case 1: // IN_PROGRESS
              examResult = 'In progress';
              //this.logger.log(`Final exam IN PROGRESS (status=1)`);
              break;

            case 2: // COMPLETED
              if (latestExam.passed === true) {
                examResult = 'Passed';
                //this.logger.log(`Final exam COMPLETED and PASSED (passed=${latestExam.passed}, score=${latestExam.score})`);
              } else if (latestExam.passed === false) {
                examResult = 'Failed';
                //this.logger.log(`Final exam COMPLETED but FAILED (passed=${latestExam.passed}, score=${latestExam.score})`);
              } else {
                // Trường hợp passed = null (chưa chấm bài essay?)
                examResult = latestExam.score !== null && latestExam.score >= courseHasFinalExam.passing_score ? 'Passed' : 'Failed';
                //this.logger.log(`Final exam COMPLETED with null passed, using score: ${latestExam.score}`);
              }
              break;

            case 3: // ABANDONED
              examResult = 'Not attempted';
              //this.logger.log(`Final exam ABANDONED (status=3)`);
              break;

            default:
              examResult = 'Not attempted';
              //this.logger.log(`Final exam UNKNOWN STATUS (status=${latestExam.status})`);
          }
        } else {
          examResult = 'Not attempted';
          //this.logger.log(`No final exam attempts found`);
        }
      } else if (hasQuizLessons) {
        // Xử lý quiz lessons
        const lessonQuizzes = await this.prisma.lessonQuiz.findMany({
          where: {
            lesson: {
              lesson_type: 2,
              del_flg: false,
              section: {
                course_id: courseId,
                del_flg: false,
              },
            },
          },
          select: {
            quiz_id: true,
          },
        });

        const quizIds = lessonQuizzes.map((lq) => lq.quiz_id);
        //this.logger.log(`Quiz IDs in course: ${quizIds.join(', ')}`);

        if (quizIds.length > 0) {
          // Lấy progress của user cho các quiz này
          const quizProgress = await this.prisma.userQuizProgress.findMany({
            where: {
              user_id: userId,
              quiz_id: { in: quizIds },
            },
            select: {
              quiz_id: true,
              status: true,
              passed: true,
              score: true,
            },
            orderBy: {
              attempts: 'desc',
            },
          });

          //this.logger.log(`Found ${quizProgress.length} quiz progress records for user ${userId}`);

          // Nhóm theo quiz_id (lấy attempt mới nhất cho mỗi quiz)
          const quizProgressMap = new Map<string, any>();
          quizProgress.forEach((qp) => {
            if (!quizProgressMap.has(qp.quiz_id)) {
              quizProgressMap.set(qp.quiz_id, qp);
            }
          });

          // Tính toán trạng thái tổng thể
          const totalQuizzes = quizIds.length;
          const passedQuizzes = Array.from(quizProgressMap.values()).filter((qp) => qp.status === 2 && qp.passed === true).length;
          const inProgressQuizzes = Array.from(quizProgressMap.values()).filter((qp) => qp.status === 1).length;
          const completedQuizzes = Array.from(quizProgressMap.values()).filter((qp) => qp.status === 2).length;

          //this.logger.log(`Quiz stats: passed=${passedQuizzes}, inProgress=${inProgressQuizzes}, completed=${completedQuizzes}, total=${totalQuizzes}`);

          if (passedQuizzes >= totalQuizzes) {
            examResult = 'Passed';
            //this.logger.log(`All quizzes passed: ${passedQuizzes}/${totalQuizzes}`);
          } else if (inProgressQuizzes > 0 || completedQuizzes > 0) {
            examResult = 'In progress';
            //this.logger.log(`Some quizzes in progress or completed but not all passed`);
          } else {
            examResult = 'Not attempted';
            //this.logger.log(`No quiz attempts found`);
          }
        } else {
          examResult = 'Not required';
          //this.logger.log(`No quizzes found in quiz lessons`);
        }
      }

      /* ================== 7️⃣ DETERMINE COURSE STATUS ================== */
      let courseStatus: 'Active' | 'Completed' | 'Expired' = this.mapStatus(userCourse.status);
      const hasCompletedAllLessons = completedCount >= totalLessons;

      //this.logger.log(`Course completion check: ${completedCount}/${totalLessons} lessons, exam=${examResult}, hasQuizLessons=${hasQuizLessons}, hasFinalExam=${!!courseHasFinalExam}`);

      if (hasCompletedAllLessons) {
        if (!courseHasFinalExam && !hasQuizLessons) {
          courseStatus = 'Completed';
          //this.logger.log(`No exam/quiz required, marking as COMPLETED`);
        } else if (courseHasFinalExam && examResult === 'Passed') {
          courseStatus = 'Completed';
          //this.logger.log(`Passed final exam, marking as COMPLETED`);
        } else if (hasQuizLessons && (examResult === 'Passed' || examResult === 'Not required')) {
          courseStatus = 'Completed';
          //this.logger.log(`Completed quiz lessons, marking as COMPLETED`);
        } else {
          //this.logger.log(`Has all lessons but exam/quiz not passed: ${examResult}`);
        }
      }

      // Log kết quả cuối cùng
      //this.logger.log(`FINAL RESULT for ${userId}: status=${courseStatus}, progress=${progress}%, exam=${examResult}`);

      /* ================== 8️⃣ MODULE PROGRESS ================== */
      const sections = await this.prisma.section.findMany({
        where: {
          course_id: courseId,
          del_flg: false,
        },
        include: {
          lessons: {
            where: { del_flg: false },
            select: {
              lesson_id: true,
              lesson_title: true,
              lesson_type: true,
            },
          },
        },
      });

      // Lấy lesson progress
      const allLessonProgress = await this.prisma.userLessonProgress.groupBy({
        by: ['lesson_id', 'completed'],
        where: {
          course_id: courseId,
          user_id: userId,
        },
      });

      const lessonProgressMap = new Map<string, number>();
      allLessonProgress.forEach((p) => {
        if (!lessonProgressMap.has(p.lesson_id) || p.completed > lessonProgressMap.get(p.lesson_id)!) {
          lessonProgressMap.set(p.lesson_id, p.completed);
        }
      });

      const modules = sections.map((s) => {
        const totalSectionLessons = s.lessons.length;
        let completedInSection = 0;

        s.lessons.forEach((lesson) => {
          const completedStatus = lessonProgressMap.get(lesson.lesson_id);
          if (completedStatus === 2) {
            completedInSection += 1;
          }
        });

        const sectionProgress = totalSectionLessons > 0 ? Math.round((completedInSection / totalSectionLessons) * 100) : 0;

        let status: 'Not started' | 'In progress' | 'Completed';
        if (completedInSection === 0) {
          status = 'Not started';
        } else if (completedInSection >= totalSectionLessons) {
          status = 'Completed';
        } else {
          status = 'In progress';
        }

        return {
          section_id: s.section_id,
          name: s.section_title,
          completedLessons: completedInSection,
          totalLessons: totalSectionLessons,
          progress: sectionProgress,
          status,
        };
      });

      /* ================== 9️⃣ ACTIVITIES ================== */
      const lessonActivities = await this.prisma.userLessonProgress.findMany({
        where: {
          course_id: courseId,
          user_id: userId,
        },
        orderBy: { updated_at: 'desc' },
        take: 10,
        distinct: ['lesson_id'],
        include: {
          lesson: {
            select: {
              lesson_title: true,
              lesson_type: true,
            },
          },
        },
      });

      const quizActivities = await this.prisma.userQuizProgress.findMany({
        where: {
          user_id: userId,
          course_id: courseId,
          lesson_id: { not: null },
        },
        orderBy: { updated_at: 'desc' },
        take: 10,
        include: {
          quiz: {
            select: { title: true, passing_score: true },
          },
        },
      });

      const activities = [
        ...lessonActivities.map((l) => ({
          date: l.updated_at,
          type: l.lesson.lesson_type === 2 ? ('QUIZ_LESSON' as const) : ('LESSON' as const),
          title: l.lesson.lesson_type === 2 ? `Hoàn thành quiz: ${l.lesson.lesson_title}` : `Hoàn thành bài học: ${l.lesson.lesson_title}`,
        })),
        ...quizActivities.map((q) => ({
          date: q.updated_at,
          type: 'QUIZ_EXAM' as const,
          title: `Làm bài kiểm tra: ${q.quiz.title}`,
          score: q.score !== null ? `${q.score}/${q.quiz.passing_score}` : undefined,
        })),
      ].sort((a, b) => b.date.getTime() - a.date.getTime());

      /* ================== 🔟 STATISTICS ================== */
      const daysSinceEnrollment = Math.max(1, Math.floor((Date.now() - userCourse.enrolled_at.getTime()) / (1000 * 60 * 60 * 24)));
      const totalVideoMinutes = await this.prisma.lesson.aggregate({
        where: {
          del_flg: false,
          lesson_type: 0,
          section: {
            course_id: courseId,
            del_flg: false,
          },
        },
        _sum: { minutes: true },
      });

      const estimatedHours = Math.round((totalVideoMinutes._sum.minutes || 0) * 0.5);

      const result = {
        student: {
          user_id: userCourse.user.id,
          name: userCourse.user.name,
          email: userCourse.user.email,
          avatar: userCourse.user.avatar,
          enrolledDate: userCourse.enrolled_at,
          status: courseStatus,
          progress,
          finalExam: examResult,
          ...(courseHasFinalExam && {
            finalExamScore,
            finalExamPassingScore,
            finalExamTitle: courseHasFinalExam.title,
            finalExamDetails,
          }),
          hasQuizLessons: !!hasQuizLessons,
        },
        statistics: {
          estimatedHours,
          avgProgressPerDay: Number((progress / daysSinceEnrollment).toFixed(1)),
          daysSinceEnrollment,
          hasFinalExam: !!courseHasFinalExam,
          hasQuizLessons: !!hasQuizLessons,
          totalLessons,
          completedLessons: completedCount,
          totalVideoMinutes: totalVideoMinutes._sum.minutes || 0,
        },
        modules,
        activities: activities.slice(0, 10),
      };

      //this.logger.log(`Returning student detail: ${JSON.stringify(result.student, null, 2)}`);
      return result;
    } catch (error: any) {
      this.logger.error(`Error in getStudentDetail: ${error.message}`);
      this.logger.error(error.stack);
      throw error;
    }
  }

  /* ================== STATUS MAPPING ================== */
  private mapStatus(status: number): 'Active' | 'Completed' | 'Expired' {
    const mapped = (() => {
      switch (status) {
        case UserCourseStatus.ACTIVE:
          return 'Active';
        case UserCourseStatus.COMPLETED:
          return 'Completed';
        case UserCourseStatus.RESERVED:
          return 'Expired';
        default:
          return 'Active';
      }
    })();
    return mapped;
  }
}
