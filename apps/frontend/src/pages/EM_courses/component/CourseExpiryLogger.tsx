import { useEffect, useRef } from 'react';
import { logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';

interface Course {
  course_id: string;
  course_name: string;
  remaining_days?: number | null;
}

interface Props {
  courses: Course[];
  userId?: string | null;
}

const WARNING_DAYS = [30, 7, 3, 2, 1, 0];

export default function CourseExpiryLogger({ courses, userId }: Props) {
  const loggedCoursesFromStorage = JSON.parse(localStorage.getItem('loggedCourses') || '[]');
  const loggedCoursesRef = useRef<Set<string>>(new Set(loggedCoursesFromStorage));

  useEffect(() => {
    if (!userId) return;

    const expiringCourses = courses.filter((course) => {
      const shouldLog = WARNING_DAYS.includes(course.remaining_days ?? -1);
      const courseKey = `${course.course_id}_${course.remaining_days}`;
      const alreadyLogged = loggedCoursesRef.current.has(courseKey);
      return shouldLog && !alreadyLogged;
    });

    expiringCourses.forEach((course) => {
      if (course.remaining_days == null) return;
      console.log(`Logging expiry notification for course ${course.course_name} (${course.course_id}) with ${course.remaining_days} days remaining.`);
      let title = '';
      let message = '';

      switch (course.remaining_days) {
        case 30:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course_name}" sẽ hết hạn trong 30 ngày.`;
          break;
        case 7:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course_name}" sẽ hết hạn trong 7 ngày. Hãy hoàn thành sớm!`;
          break;
        case 3:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course_name}" sẽ hết hạn trong 3 ngày. Thời gian không còn nhiều!`;
          break;
        case 2:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course_name}" sẽ hết hạn trong 2 ngày. Hãy nhanh chóng hoàn thành!`;
          break;
        case 1:
          title = 'Khóa học sắp hết hạn';
          message = `Khóa học "${course.course_name}" sẽ hết hạn vào NGÀY MAI!`;
          break;
        case 0:
          title = 'Khóa học đã hết hạn';
          message = `Khóa học "${course.course_name}" đã HẾT HẠN. Bạn không thể truy cập nội dung nữa.`;
          break;
      }

      logClientMessage(title, message, userId, UserType.USER, '', course.course_id, NotificationType.REMINDER);

      // Lưu lại khóa học đã log
      const courseKey = `${course.course_id}_${course.remaining_days}`;
      loggedCoursesRef.current.add(courseKey);

      localStorage.setItem('loggedCourses', JSON.stringify(Array.from(loggedCoursesRef.current)));
    });
  }, [userId]);

  return null; // Không render UI, chỉ side-effect
}
