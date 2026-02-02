import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface QuizFilterDto {
  page?: number;
  pageSize?: number;
  search?: string;
  includeDeleted?: boolean;
  quiz_type?: number;
  difficulty_level?: number;
  status?: number;
}

export interface CreateQuizDto {
  title: string;
  quiz_type: number;
  difficulty_level: number;
  duration_minutes?: number;
  passing_score: number;
  status: number;
  has_audio: boolean;
  show_explanation: boolean;
  randomize_questions: boolean;
  randomize_answers: boolean;
  allow_review: boolean;
  max_attempts?: number;
  allow_retake: boolean;
  show_results: boolean;
  course_id?: string;
  questions: CreateQuestionDto[];
}

export interface CreateQuestionDto {
  question_text: string;
  question_type: number;
  points: number;
  difficulty: number;
  explanation?: string;
  order: number;
  answers: CreateAnswerDto[];
}

export interface CreateAnswerDto {
  answer_text: string;
  is_correct: boolean;
  order: number;
}

export interface UpdateQuizDto extends Partial<CreateQuizDto> {}

export interface SubmitQuizDto {
  answers: QuestionAnswerDto[];
  time_spent?: number;
}

export interface QuestionAnswerDto {
  question_id: string;
  selected_answer_ids: string[];
  answer_text?: string;
}

export interface SaveProgressDto {
  progress_id?: string;
  current_question: number;
  answers: QuestionAnswerDto[];
  time_spent: number;
}

export interface ReportQuestionDto {
  content: string;
  type: string;
}

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  //-----------------Admin Methods-----------------//
  async findAllForAdmin(filters: QuizFilterDto) {
    const { page = 1, pageSize = 20, search, includeDeleted = false, quiz_type, difficulty_level, status } = filters;
    const skip = (page - 1) * pageSize;

    const where: any = {};

    if (!includeDeleted) {
      where.del_flg = false;
    } else {
      where.del_flg = true;
    }
    where.is_latest_version = true;

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    if (quiz_type) {
      where.quiz_type = Number(quiz_type);
    }

    if (difficulty_level) {
      where.difficulty_level = Number(difficulty_level);
    }

    if (status) {
      where.status = Number(status);
    }

    const [data, total] = await Promise.all([
      this.prisma.quiz.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          course: {
            select: {
              course_id: true,
              course_name: true,
            },
          },
          _count: {
            select: {
              questions: true,
              quiz_versions: true, // Count versions
            },
          },
        },
        orderBy: {
          updated_at: 'desc',
        },
      }),
      this.prisma.quiz.count({ where }),
    ]);

    const enrichedData = await Promise.all(
      data.map(async (quiz) => {
        const questions = await this.prisma.question.findMany({
          where: { quiz_id: quiz.quiz_id },
          select: { points: true },
        });

        const total_points = questions.reduce((sum, q) => sum + q.points, 0);
        const question_count = questions.length;
        const hasProgress = await this.hasUserProgress(quiz.quiz_id);

        return {
          ...quiz,
          question_count,
          total_points,
          has_user_progress: hasProgress,
        };
      }),
    );

    return {
      data: enrichedData,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async createQuiz(data: { title: string; quiz_type: number; difficulty_level: number; passing_score: number; status: number; questions: any[]; randomize_questions?: boolean; randomize_answers?: boolean; allow_review?: boolean; max_attempts?: number; allow_retake?: boolean; show_explanation?: boolean; total_questions?: number; duration_minutes?: number }) {
    const questionCount = data.questions.length;
    const totalPoints = data.questions.reduce((sum, q) => sum + (q.points || 1), 0);

    // Tạo quiz với transaction
    return await this.prisma.$transaction(async (tx) => {
      // 1. Tạo quiz
      const quiz = await tx.quiz.create({
        data: {
          title: data.title,
          quiz_type: data.quiz_type,
          difficulty_level: data.difficulty_level,
          duration_minutes: data.duration_minutes || null,
          passing_score: data.passing_score,
          randomize_questions: data.randomize_questions || false,
          randomize_answers: data.randomize_answers || false,
          show_explanation: data.show_explanation || true,
          allow_review: data.allow_review || false,
          max_attempts: data.max_attempts || 0,
          allow_retake: data.allow_retake || false,
          status: data.status,
          total_questions: data.total_questions || 0,
          question_count: questionCount,
          total_points: totalPoints,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // 2. Tạo các câu hỏi và đáp án
      for (let i = 0; i < data.questions.length; i++) {
        const questionData = data.questions[i];

        const question = await tx.question.create({
          data: {
            quiz_id: quiz.quiz_id,
            question_text: questionData.question_text,
            question_type: questionData.question_type,
            points: questionData.points || 1,
            difficulty: questionData.difficulty || 3,
            explanation: questionData.explanation || null,
            order: i,
            created_at: new Date(),
          },
        });

        // Tạo đáp án
        if (questionData.answers && questionData.answers.length > 0) {
          const answersData = questionData.answers.map((answer: any, ansIndex: number) => ({
            question_id: question.question_id,
            answer_text: answer.answer_text,
            is_correct: answer.is_correct || false,
            order: ansIndex,
          }));

          await tx.answer.createMany({
            data: answersData,
          });
        }
      }

      return quiz;
    });
  }

  async updateQuiz(quiz_id: string, data: UpdateQuizDto) {
    const existingQuiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
    });

    if (!existingQuiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    const { questions, ...quizData } = data;

    // If questions are provided, delete old ones and create new
    if (questions) {
      await this.prisma.question.deleteMany({
        where: { quiz_id },
      });

      const question_count = questions.length;
      const total_points = questions.reduce((sum, q) => sum + q.points, 0);

      return this.prisma.quiz.update({
        where: { quiz_id },
        data: {
          ...quizData,
          question_count,
          total_points,
          updated_at: new Date(),
          questions: {
            create: questions.map((q) => ({
              question_text: q.question_text,
              question_type: q.question_type,
              points: q.points,
              difficulty: q.difficulty,
              explanation: q.explanation,
              order: q.order,
              answers: {
                create: q.answers.map((a) => ({
                  answer_text: a.answer_text,
                  is_correct: a.is_correct,
                  order: a.order,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });
    }

    // Update only quiz metadata
    return this.prisma.quiz.update({
      where: { quiz_id },
      data: {
        ...quizData,
        updated_at: new Date(),
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async softDeleteQuiz(quiz_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    return this.prisma.quiz.update({
      where: { quiz_id },
      data: {
        del_flg: true,
        updated_at: new Date(),
      },
    });
  }

  async hardDeleteQuiz(quiz_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    // Delete all related data
    await this.prisma.question.deleteMany({
      where: { quiz_id },
    });

    return this.prisma.quiz.delete({
      where: { quiz_id },
    });
  }

  async restoreQuiz(quiz_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    if (!quiz.del_flg) {
      throw new BadRequestException('Quiz chưa bị xóa');
    }

    return this.prisma.quiz.update({
      where: { quiz_id },
      data: {
        del_flg: false,
        updated_at: new Date(),
      },
    });
  }

  async bulkSoftDelete(ids: string[]) {
    return this.prisma.quiz.updateMany({
      where: {
        quiz_id: { in: ids },
      },
      data: {
        del_flg: true,
        updated_at: new Date(),
      },
    });
  }

  async bulkHardDelete(ids: string[]) {
    // Delete all questions first
    await this.prisma.question.deleteMany({
      where: {
        quiz_id: { in: ids },
      },
    });

    return this.prisma.quiz.deleteMany({
      where: {
        quiz_id: { in: ids },
      },
    });
  }

  async findByQuizId(quiz_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
      include: {
        course: true,
        questions: {
          include: {
            answers: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        audios: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    return quiz;
  }

  async findAll() {
    return this.prisma.quiz.findMany({
      where: {
        del_flg: false,
        status: 1, // Only active quizzes
      },
      include: {
        course: {
          select: {
            course_id: true,
            course_name: true,
          },
        },
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async hasUserProgress(quiz_id: string): Promise<boolean> {
    const count = await this.prisma.userQuizProgress.count({
      where: {
        quiz_id,
        status: 2, // Completed
      },
    });
    return count > 0;
  }

  async getQuizVersions(quiz_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
      select: {
        quiz_id: true,
        parent_quiz_id: true,
        version: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    const rootQuizId = quiz.parent_quiz_id || quiz.quiz_id;

    const versions = await this.prisma.quiz.findMany({
      where: {
        OR: [{ quiz_id: rootQuizId }, { parent_quiz_id: rootQuizId }],
      },
      select: {
        quiz_id: true,
        title: true,
        version: true,
        is_latest_version: true,
        version_notes: true,
        status: true,
        created_at: true,
        updated_at: true,
        question_count: true,
        total_points: true,
        _count: {
          select: {
            user_progress: {
              where: { status: 2 },
            },
          },
        },
      },
      orderBy: {
        version: 'desc',
      },
    });

    return versions;
  }

  async getLatestVersion(quiz_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
      select: {
        quiz_id: true,
        parent_quiz_id: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    const rootQuizId = quiz.parent_quiz_id || quiz.quiz_id;

    const latestVersion = await this.prisma.quiz.findFirst({
      where: {
        OR: [{ quiz_id: rootQuizId }, { parent_quiz_id: rootQuizId }],
        is_latest_version: true,
      },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        audios: true,
      },
    });

    if (!latestVersion) {
      throw new NotFoundException('Không tìm thấy version mới nhất');
    }

    return latestVersion;
  }

  async createNewVersion(quiz_id: string, data: UpdateQuizDto, versionNotes?: string) {
    const existingQuiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        audios: true,
      },
    });

    if (!existingQuiz) {
      throw new NotFoundException('Quiz không tồn tại');
    }

    const hasProgress = await this.hasUserProgress(quiz_id);

    if (!hasProgress) {
      throw new BadRequestException('Quiz chưa có người làm, không cần tạo version mới. Hãy cập nhật trực tiếp.');
    }

    return await this.prisma.$transaction(async (tx) => {
      const rootQuizId = existingQuiz.parent_quiz_id || existingQuiz.quiz_id;
      const currentVersion = existingQuiz.version;
      const newVersion = currentVersion + 1;

      // Mark all existing versions as not latest
      await tx.quiz.updateMany({
        where: {
          OR: [{ quiz_id: rootQuizId }, { parent_quiz_id: rootQuizId }],
        },
        data: {
          is_latest_version: false,
          updated_at: new Date(),
        },
      });

      // Archive current quiz
      await tx.quiz.update({
        where: { quiz_id },
        data: {
          status: 3, // Archived
          is_latest_version: false,
          updated_at: new Date(),
        },
      });

      // Prepare new quiz data
      const { questions, ...quizData } = data;
      const questionCount = questions?.length || 0;
      const totalPoints = questions?.reduce((sum, q) => sum + (q.points || 1), 0) || 0;

      // Create new quiz version
      const newQuiz = await tx.quiz.create({
        data: {
          title: data.title || existingQuiz.title,
          quiz_type: data.quiz_type ?? existingQuiz.quiz_type,
          difficulty_level: data.difficulty_level ?? existingQuiz.difficulty_level,
          duration_minutes: data.duration_minutes ?? existingQuiz.duration_minutes,
          passing_score: data.passing_score ?? existingQuiz.passing_score,
          randomize_questions: data.randomize_questions ?? existingQuiz.randomize_questions,
          randomize_answers: data.randomize_answers ?? existingQuiz.randomize_answers,
          show_explanation: data.show_explanation ?? existingQuiz.show_explanation,
          allow_review: data.allow_review ?? existingQuiz.allow_review,
          max_attempts: data.max_attempts ?? existingQuiz.max_attempts,
          allow_retake: data.allow_retake ?? existingQuiz.allow_retake,
          show_results: data.show_results ?? existingQuiz.show_results,
          status: data.status ?? 1,
          total_questions: questionCount,
          question_count: questionCount,
          total_points: totalPoints,

          version: newVersion,
          parent_quiz_id: rootQuizId,
          is_latest_version: true,
          version_notes: versionNotes || `Phiên bản ${newVersion}`,

          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Copy or create questions
      if (questions && questions.length > 0) {
        for (let i = 0; i < questions.length; i++) {
          const questionData = questions[i];

          const question = await tx.question.create({
            data: {
              quiz_id: newQuiz.quiz_id,
              question_text: questionData.question_text,
              question_type: questionData.question_type,
              points: questionData.points || 1,
              difficulty: questionData.difficulty || 3,
              explanation: questionData.explanation || null,
              order: i,
              created_at: new Date(),
            },
          });

          if (questionData.answers && questionData.answers.length > 0) {
            const answersData = questionData.answers.map((answer: any, ansIndex: number) => ({
              question_id: question.question_id,
              answer_text: answer.answer_text,
              is_correct: answer.is_correct || false,
              order: ansIndex,
              match_key: answer.match_key || null,
            }));

            await tx.answer.createMany({
              data: answersData,
            });
          }
        }
      } else {
        // Copy from existing quiz
        for (const existingQuestion of existingQuiz.questions) {
          const newQuestion = await tx.question.create({
            data: {
              quiz_id: newQuiz.quiz_id,
              question_text: existingQuestion.question_text,
              question_type: existingQuestion.question_type,
              points: existingQuestion.points,
              difficulty: existingQuestion.difficulty,
              explanation: existingQuestion.explanation,
              order: existingQuestion.order,
              created_at: new Date(),
            },
          });

          const existingAnswers = existingQuestion.answers;
          if (existingAnswers && existingAnswers.length > 0) {
            const answersData = existingAnswers.map((answer) => ({
              question_id: newQuestion.question_id,
              answer_text: answer.answer_text,
              is_correct: answer.is_correct,
              order: answer.order,
              match_key: answer.match_key,
            }));

            await tx.answer.createMany({
              data: answersData,
            });
          }
        }
      }

      // Copy audios if exist
      if (existingQuiz.audios && existingQuiz.audios.length > 0) {
        for (const audio of existingQuiz.audios) {
          await tx.quizAudio.create({
            data: {
              quiz_id: newQuiz.quiz_id,
              title: audio.title,
              audio_url: audio.audio_url,
              file_name: audio.file_name,
              duration_seconds: audio.duration_seconds,
              transcript: audio.transcript,
              total_questions: audio.total_questions,
              question_ordering: audio.question_ordering,
              created_at: new Date(),
            },
          });
        }
      }

      return await tx.quiz.findUnique({
        where: { quiz_id: newQuiz.quiz_id },
        include: {
          questions: {
            include: {
              answers: {
                orderBy: { order: 'asc' },
              },
            },
            orderBy: { order: 'asc' },
          },
          audios: true,
        },
      });
    });
  }

  async updateQuizWithVersioning(quiz_id: string, data: UpdateQuizDto, versionNotes?: string) {
    const hasProgress = await this.hasUserProgress(quiz_id);

    if (hasProgress) {
      return {
        action: 'created_new_version',
        data: await this.createNewVersion(quiz_id, data, versionNotes),
      };
    } else {
      return {
        action: 'updated_directly',
        data: await this.updateQuiz(quiz_id, data),
      };
    }
  }

  async restoreVersion(quiz_id: string, versionNotes?: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        audios: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz version không tồn tại');
    }

    if (quiz.is_latest_version) {
      throw new BadRequestException('Đây đã là version mới nhất');
    }

    const rootQuizId = quiz.parent_quiz_id || quiz.quiz_id;

    return await this.prisma.$transaction(async (tx) => {
      await tx.quiz.updateMany({
        where: {
          OR: [{ quiz_id: rootQuizId }, { parent_quiz_id: rootQuizId }],
        },
        data: {
          is_latest_version: false,
          updated_at: new Date(),
        },
      });

      const versions = await tx.quiz.findMany({
        where: {
          OR: [{ quiz_id: rootQuizId }, { parent_quiz_id: rootQuizId }],
        },
        select: { version: true },
        orderBy: { version: 'desc' },
        take: 1,
      });

      const newVersion = versions[0].version + 1;

      const newQuiz = await tx.quiz.create({
        data: {
          title: quiz.title,
          quiz_type: quiz.quiz_type,
          difficulty_level: quiz.difficulty_level,
          duration_minutes: quiz.duration_minutes,
          passing_score: quiz.passing_score,
          randomize_questions: quiz.randomize_questions,
          randomize_answers: quiz.randomize_answers,
          show_explanation: quiz.show_explanation,
          allow_review: quiz.allow_review,
          max_attempts: quiz.max_attempts,
          allow_retake: quiz.allow_retake,
          show_results: quiz.show_results,
          status: 1,
          total_questions: quiz.total_questions,
          question_count: quiz.question_count,
          total_points: quiz.total_points,

          version: newVersion,
          parent_quiz_id: rootQuizId,
          is_latest_version: true,
          version_notes: versionNotes || `Khôi phục từ version ${quiz.version}`,

          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Copy questions and answers
      for (const existingQuestion of quiz.questions) {
        const newQuestion = await tx.question.create({
          data: {
            quiz_id: newQuiz.quiz_id,
            question_text: existingQuestion.question_text,
            question_type: existingQuestion.question_type,
            points: existingQuestion.points,
            difficulty: existingQuestion.difficulty,
            explanation: existingQuestion.explanation,
            order: existingQuestion.order,
            created_at: new Date(),
          },
        });

        if (existingQuestion.answers && existingQuestion.answers.length > 0) {
          const answersData = existingQuestion.answers.map((answer) => ({
            question_id: newQuestion.question_id,
            answer_text: answer.answer_text,
            is_correct: answer.is_correct,
            order: answer.order,
            match_key: answer.match_key,
          }));

          await tx.answer.createMany({
            data: answersData,
          });
        }
      }

      return newQuiz;
    });
  }

  // ========== STUDENT METHODS ==========
  async getQuizForStudent(quiz_id: string, user_id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        quiz_id,
        del_flg: false,
        status: {
          in: [1, 3],
        },
      },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: { order: 'asc' },
              select: {
                answer_id: true,
                answer_text: true,
                order: true,
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        audios: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz không tồn tại hoặc không khả dụng');
    }

    if (quiz.lesson_id) {
      const userCourse = await this.prisma.userCourse.findFirst({
        where: {
          user_id,
          course: {
            sections: {
              some: {
                lessons: {
                  some: {
                    lesson_id: quiz.lesson_id,
                  },
                },
              },
            },
          },
        },
      });

      if (!userCourse) {
        throw new BadRequestException('Bạn không có quyền truy cập quiz này');
      }
    }

    if (quiz.max_attempts) {
      const attemptCount = await this.prisma.userQuizProgress.count({
        where: {
          user_id,
          quiz_id,
          status: 2,
        },
      });

      if (attemptCount >= quiz.max_attempts) {
        throw new BadRequestException('Bạn đã hết lượt làm bài');
      }
    }

    if (quiz.randomize_questions) {
      quiz.questions = this.shuffleArray(quiz.questions);
    }

    if (quiz.randomize_answers) {
      quiz.questions = quiz.questions.map((q) => ({
        ...q,
        answers: this.shuffleArray(q.answers),
      }));
    }

    return quiz;
  }

  async canUserTakeQuiz(quiz_id: string, user_id: string) {
    // Check quiz tồn tại
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id },
    });
    if (!quiz || quiz.del_flg) {
      return {
        canTake: false,
        reason: 'Quiz không tồn tại hoặc không khả dụng',
      };
    }

    // Check quiz đã publish
    if (quiz.status === 2) {
      return {
        canTake: false,
        reason: 'Quiz chưa được xuất bản',
      };
    }

    // Check quyền truy cập khóa học
    if (quiz.lesson_id) {
      const userCourse = await this.prisma.userCourse.findFirst({
        where: {
          user_id,
          course: {
            sections: {
              some: {
                lessons: {
                  some: {
                    lesson_id: quiz.lesson_id,
                  },
                },
              },
            },
          },
        },
      });
      if (!userCourse) {
        return {
          canTake: false,
          reason: 'Bạn không có quyền truy cập quiz này',
        };
      }
    }
    // Check số lần làm
    if (quiz.max_attempts) {
      const attemptCount = await this.prisma.userQuizProgress.count({
        where: {
          user_id,
          quiz_id,
          status: 2,
        },
      });
      if (attemptCount >= quiz.max_attempts) {
        return {
          canTake: false,
          reason: 'Bạn đã hết lượt làm bài',
        };
      }
    }

    return {
      canTake: true,
      reason: 'Có thể làm bài',
    };
  }

  async startQuizAttempt(quiz_id: string, user_id: string) {
    const quiz = await this.findByQuizId(quiz_id);

    if (quiz.del_flg) {
      throw new BadRequestException('Quiz đã bị xóa');
    }

    if (quiz.status === 2) {
      throw new BadRequestException('Quiz chưa được xuất bản');
    }

    const attemptCount = await this.prisma.userQuizProgress.count({
      where: {
        user_id,
        quiz_id,
        status: 2, // completed
      },
    });

    if (quiz.max_attempts && attemptCount >= quiz.max_attempts) {
      throw new BadRequestException('Bạn đã hết lượt làm bài');
    }

    const { lesson_id, course_id } = await this.resolveLessonAndCourse(quiz_id);
    const progress = await this.prisma.userQuizProgress.create({
      data: {
        user_id,
        quiz_id,
        lesson_id,
        course_id,
        status: 1, // in_progress
        attempts: attemptCount + 1,
        started_at: new Date(),
      },
    });

    return progress;
  }

  async saveProgress(quiz_id: string, user_id: string, data: SaveProgressDto) {
    let progress;

    if (data.progress_id) {
      const { lesson_id, course_id } = await this.resolveLessonAndCourse(quiz_id);
      progress = await this.prisma.userQuizProgress.update({
        where: {
          progress_id: data.progress_id,
          user_id,
          quiz_id,
        },
        data: {
          lesson_id: lesson_id ?? undefined,
          course_id: course_id ?? undefined,
          time_spent: data.time_spent,
          updated_at: new Date(),
        },
      });

      await this.prisma.userQuizAnswer.deleteMany({
        where: { progress_id: data.progress_id },
      });

      if (data.answers.length > 0) {
        const answersData = data.answers.map((answer) => ({
          progress_id: data.progress_id,
          question_id: answer.question_id,
          selected_answer_ids: answer.selected_answer_ids,
          answer_text: answer.answer_text,
          created_at: new Date(),
        }));

        await this.prisma.userQuizAnswer.createMany({
          data: answersData,
        });
      }
    }

    return {
      progress_id: progress?.progress_id,
      saved_at: new Date(),
    };
  }

  async getQuizProgress(quiz_id: string, user_id: string) {
    const progress = await this.prisma.userQuizProgress.findFirst({
      where: {
        user_id,
        quiz_id,
        status: 1, // in_progress
      },
      select: {
        progress_id: true,
        attempts: true,
        time_spent: true,
        answers: true,
        started_at: true,
        updated_at: true,
        quiz: true,
        completed_at: true,
        correct_answers: true,
        total_questions: true,
        score: true,
        percentage: true,
        passed: true,
        status: true,
      },
      orderBy: {
        started_at: 'desc',
      },
    });

    if (!progress) {
      throw new NotFoundException('Không tìm thấy tiến trình làm bài');
    }

    return progress;
  }

  async getActiveQuizzes(search?: string, quiz_type?: number) {
    const where: any = {
      del_flg: false,
      status: {
        in: [1, 3],
      }, // Only active quizzes
    };

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    if (quiz_type) {
      where.quiz_type = quiz_type;
    }

    const quizzes = await this.prisma.quiz.findMany({
      where,
      select: {
        quiz_id: true,
        title: true,
        quiz_type: true,
        difficulty_level: true,
        duration_minutes: true,
        passing_score: true,
        total_questions: true,
        question_count: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return quizzes;
  }

  async submitQuiz(quiz_id: string, user_id: string, data: SubmitQuizDto & { progress_id?: string }) {
    const quiz = await this.findByQuizId(quiz_id);

    if (quiz.del_flg) {
      throw new BadRequestException('Quiz đã bị xóa');
    }

    if (quiz.status === 2) {
      throw new BadRequestException('Quiz chưa được xuất bản');
    }

    // Tìm progress hiện tại hoặc tạo mới
    let progress;

    if (data.progress_id) {
      // Sử dụng progress đã có
      progress = await this.prisma.userQuizProgress.findFirst({
        where: {
          progress_id: data.progress_id,
          user_id,
          quiz_id,
          status: 1, // Chỉ xử lý progress đang làm
        },
      });
    }

    if (!progress) {
      // Tạo progress mới nếu không tìm thấy
      const attemptCount = await this.prisma.userQuizProgress.count({
        where: { user_id, quiz_id, status: 2 },
      });

      const { lesson_id, course_id } = await this.resolveLessonAndCourse(quiz_id);
      progress = await this.prisma.userQuizProgress.create({
        data: {
          user_id,
          quiz_id,
          lesson_id,
          course_id,
          status: 1,
          attempts: attemptCount + 1,
          started_at: new Date(),
        },
      });
    }

    // Tính điểm và cập nhật progress
    let correct_answers = 0;
    let total_points = 0;
    let score = 0;

    const userAnswers = [];

    for (const userAnswer of data.answers) {
      const question = quiz.questions.find((q) => q.question_id === userAnswer.question_id);
      if (!question) continue;

      const correctAnswerIds = question.answers.filter((a) => a.is_correct).map((a) => a.answer_id);
      const userAnswerIds = userAnswer.selected_answer_ids || [];

      const isCorrect = correctAnswerIds.length === userAnswerIds.length && correctAnswerIds.every((id) => userAnswerIds.includes(id));

      if (isCorrect) {
        correct_answers++;
        score += question.points;
      }

      total_points = quiz.total_points;

      userAnswers.push({
        question_id: question.question_id,
        selected_answer_ids: userAnswerIds,
        answer_text: userAnswer.answer_text,
        is_correct: isCorrect,
        points_earned: isCorrect ? question.points : 0,
      });
    }

    const percentage = total_points > 0 ? (score / total_points) * 100 : 0;
    const passed = percentage >= quiz.passing_score;

    // Cập nhật progress
    const { lesson_id, course_id } = await this.resolveLessonAndCourse(quiz_id);
    const updatedProgress = await this.prisma.userQuizProgress.update({
      where: { progress_id: progress.progress_id },
      data: {
        lesson_id: progress.lesson_id ?? lesson_id,
        course_id: progress.course_id ?? course_id,
        score,
        percentage,
        total_questions: quiz.questions.length,
        correct_answers,
        status: 2, // completed
        passed,
        time_spent: data.time_spent || 0,
        completed_at: new Date(),
        updated_at: new Date(),
      },
    });

    // Xóa answers cũ và tạo mới
    await this.prisma.userQuizAnswer.deleteMany({
      where: { progress_id: progress.progress_id }, // ✅ FIXED
    });

    if (userAnswers.length > 0) {
      const answersData = userAnswers.map((answer) => ({
        progress_id: progress.progress_id, // ✅ FIXED
        question_id: answer.question_id,
        selected_answer_ids: answer.selected_answer_ids,
        answer_text: answer.answer_text,
        is_correct: answer.is_correct,
        points_earned: answer.points_earned,
        created_at: new Date(),
      }));

      await this.prisma.userQuizAnswer.createMany({
        data: answersData,
      });
    }

    const result = await this.prisma.userQuizProgress.findUnique({
      where: { progress_id: progress.progress_id }, // ✅ FIXED
      include: {
        answers: {
          include: {
            question: {
              include: {
                answers: true,
              },
            },
          },
        },
        quiz: {
          select: {
            quiz_id: true,
            title: true,
            passing_score: true,
            total_points: true,
            allow_review: true,
            show_explanation: true,
            max_attempts: true,
            allow_retake: true,
          },
        },
      },
    });

    return result;
  }

  async getQuizzesByLesson(lessonId: string) {
    const lessonQuizzes = await this.prisma.lessonQuiz.findMany({
      where: { lesson_id: lessonId },
      include: {
        quiz: {
          select: {
            quiz_id: true,
            title: true,
            question_count: true,
            total_points: true,
            duration_minutes: true,
            passing_score: true,
            difficulty_level: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return lessonQuizzes.map((lq) => ({
      ...lq.quiz,
      order: lq.order,
    }));
  }

  async getLatestProgress(quizId: string, userId: string) {
    return this.prisma.userQuizProgress.findFirst({
      where: {
        quiz_id: quizId,
        user_id: userId,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getProgressAnswers(progressId: string) {
    return this.prisma.userQuizAnswer.findMany({
      where: { progress_id: progressId },
      select: {
        question_id: true,
        selected_answer_ids: true,
      },
    });
  }

  async getLatestResult(quizId: string, userId: string) {
    const results = await this.getUserQuizResults(quizId, userId);
    return results.length > 0 ? results[0] : null;
  }

  async getUserQuizResults(quiz_id: string, user_id: string) {
    const results = await this.prisma.userQuizProgress.findMany({
      where: {
        quiz_id,
        user_id,
        status: 2, // Chỉ lấy kết quả đã hoàn thành
      },
      include: {
        answers: {
          include: {
            question: {
              include: {
                answers: true,
              },
            },
          },
        },
        quiz: {
          select: {
            quiz_id: true,
            title: true,
            passing_score: true,
            total_points: true,
            allow_review: true,
            show_explanation: true,
            max_attempts: true,
            allow_retake: true,
          },
        },
      },
      orderBy: {
        completed_at: 'asc', // Sắp xếp theo thời gian hoàn thành giảm dần
      },
    });
    return results.map((result, index) => ({
      ...result,
      attemptNumber: index + 1, // Thêm attemptNumber tính từ 1
    }));
  }

  async getAttemptResult(quiz_id: string, user_id: string, attempt: number) {
    const results = await this.getUserQuizResults(quiz_id, user_id);
    const attemptResult = results.find((r) => r.attempts === attempt);

    if (!attemptResult) {
      throw new NotFoundException('Không tìm thấy kết quả');
    }

    return attemptResult;
  }

  async getLessonQuizzes(search?: string) {
    const where: any = {
      quiz_type: 1, // Lesson Quiz only
      status: {
        in: [1, 3],
      }, // Active only
      del_flg: false,
    };

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const quizzes = await this.prisma.quiz.findMany({
      where,
      select: {
        quiz_id: true,
        title: true,
        duration_minutes: true,
        total_questions: true,
        difficulty_level: true,
        passing_score: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
    });

    return quizzes;
  }

  async reportQuestion(question_id: string, user_id: string, data: ReportQuestionDto) {
    const question = await this.prisma.question.findUnique({
      where: { question_id },
    });

    if (!question) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    const report = await this.prisma.report.create({
      data: {
        user_id,
        title: `Báo cáo câu hỏi: ${question_id}`,
        description: data.content,
        report_type: 4,
        category: 1,
        status: 1,
        priority: 2,
      },
    });

    return {
      report_id: report.report_id,
    };
  }

  async getUserStatistics(user_id: string) {
    const totalQuizzes = await this.prisma.userQuizProgress.count({
      where: { user_id, status: 2 },
    });

    const passedQuizzes = await this.prisma.userQuizProgress.count({
      where: { user_id, status: 2, passed: true },
    });

    const averageScore = await this.prisma.userQuizProgress.aggregate({
      where: { user_id, status: 2 },
      _avg: { percentage: true },
    });

    const totalTimeSpent = await this.prisma.userQuizProgress.aggregate({
      where: { user_id, status: 2 },
      _sum: { time_spent: true },
    });

    return {
      total_quizzes_taken: totalQuizzes,
      total_quizzes_passed: passedQuizzes,
      average_score: averageScore._avg.percentage || 0,
      total_time_spent: totalTimeSpent._sum.time_spent || 0,
    };
  }

  async getQuizResultDetail(progress_id: string, user_id: string) {
    const result = await this.prisma.userQuizProgress.findFirst({
      where: {
        progress_id: progress_id,
        user_id,
      },
      include: {
        answers: {
          include: {
            question: {
              include: {
                answers: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
        quiz: {
          include: {
            questions: {
              include: {
                answers: {
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Không tìm thấy kết quả');
    }

    const transformedResult = {
      ...result,
      quiz: {
        ...result.quiz,
        questions: result.quiz.questions.map((q) => ({
          question: q,
        })),
      },
    };

    return transformedResult;
  }

  async getQuizLessonInfo(quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { quiz_id: quizId },
      include: {
        quiz_lessons: {
          orderBy: { order: 'asc' },
          include: {
            lesson: {
              include: {
                section: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!quiz || quiz.quiz_lessons.length === 0) {
      return [];
    }

    return quiz.quiz_lessons.map((ql) => ({
      lessonId: ql.lesson.lesson_id,
      lessonTitle: ql.lesson.lesson_title,
      lessonOrder: ql.order,

      sectionId: ql.lesson.section.section_id,
      sectionTitle: ql.lesson.section.section_title,

      courseId: ql.lesson.section.course.course_id,
      courseName: ql.lesson.section.course.course_name,
    }));
  }

  async getAllResult(userId: string, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      this.prisma.userQuizProgress.findMany({
        where: {
          user_id: userId,
          status: 2,
          quiz: { quiz_type: { in: [2, 3] } },
        },
        include: {
          quiz: true,
          lesson: true,
        },
        skip,
        take: pageSize,
        orderBy: { created_at: 'desc' },
      }),

      this.prisma.userQuizProgress.count({
        where: {
          user_id: userId,
          status: 2,
          quiz: { quiz_type: { in: [2, 3] } },
        },
      }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // ========== HELPER METHODS ==========
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  private async resolveLessonAndCourse(quiz_id: string) {
    const lessonQuiz = await this.prisma.lessonQuiz.findFirst({
      where: { quiz_id },
      orderBy: { order: 'asc' },
      include: {
        lesson: {
          include: {
            section: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    if (!lessonQuiz) {
      return {
        lesson_id: null,
        course_id: null,
      };
    }

    return {
      lesson_id: lessonQuiz.lesson.lesson_id,
      course_id: lessonQuiz.lesson.section.course.course_id,
    };
  }
}
