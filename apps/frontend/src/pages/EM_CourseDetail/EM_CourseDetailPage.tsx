// CourseDetailPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseContent from './EM_CourseContent';
import CourseOverview from './EM_CourseOverview';
import { CourseRecentActivity } from './component/EM_CourseRecentActivity';
import DefaultLayout from '@/layouts/default-layout';
import DynamicBreadcrumb from '@/components/EM_BreadCrumb';
import { Box } from '@mui/material';
import { useThemeStore } from '@/hooks/useThemeEventStore';
import { toSlug } from '@/helpers/SeoHelper';
interface Course {
  course_id: string;
  course_name: string;
  description?: string;
}

export default function CourseDetailPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadFlag, setReloadFlag] = useState(0);

  const triggerReload = () => setReloadFlag((prev) => prev + 1);
  const { theme, fetchTheme } = useThemeStore();
  const navigate = useNavigate();
  const { course_id } = useParams();
  const parts = (course_id ?? '').split('-');
  const last_course_id = parts.pop();
  useEffect(() => {
    if (!course_id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${last_course_id}`);
        const data = await res.json();
        setCourse(data);
        const correctSlug = `${toSlug(data.course_name)}-${last_course_id}`;
        navigate(`/khoa-hoc/${correctSlug}`, { replace: true });
      } catch (err) {
        console.error('Failed to fetch course', err);
      } finally {
        setLoading(false);
      }
    };
    fetch(`/api/course/${last_course_id}/view`, { method: 'POST' });

    fetchCourse();
    fetchTheme();
  }, [course_id]);

  //const image = (courseDetailGif as any)[theme]?.src ?? courseDetailGif.default.src;
  const getRightImageClass = () => {
    switch (theme) {
      case 'christmas':
        return 'garland-chrismast';
      case 'newyear':
        return 'latern';
      case 'independence':
        return 'garland-independence';
      default:
        return '';
    }
  };
  if (loading) return <div className="text-center p-6">Đang tải dữ liệu...</div>;
  if (!course) return <div className="text-center p-6 text-red-500">Không tìm thấy khóa học</div>;

  return (
    <DefaultLayout hideSidebarToggle={true}>
      {() => (
        <Box className={`relative flex flex-col min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-y-auto ${getRightImageClass()}`} sx={{ bgcolor: 'rgb(var(--bg-primary))' }}>
          <div className="w-full flex justify-center px-6 pt-4">
            <div className="w-full max-w-6xl">
              <DynamicBreadcrumb courseId={last_course_id} />
            </div>
          </div>
          <main className="flex justify-center flex-1 p-6 overflow-y-auto z-30">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
              {/* Cột trái: nội dung khóa học */}
              <div className="flex-1 lg:w-2/3">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                  <CourseContent courseId={course.course_id} courseName={course.course_name} onActivated={triggerReload} reloadFlag={reloadFlag} />
                </div>

                {/* Component hoạt động gần đây - NẰM DƯỚI NỘI DUNG KHÓA HỌC */}
                <CourseRecentActivity courseId={course.course_id} courseName={course.course_name} />
              </div>

              {/* Cột phải: thông tin khóa học */}
              <div className="lg:w-1/3">
                <CourseOverview courseId={course.course_id} reloadFlag={reloadFlag} onActivated={triggerReload} />
              </div>
            </div>
          </main>
        </Box>
      )}
    </DefaultLayout>
  );
}
