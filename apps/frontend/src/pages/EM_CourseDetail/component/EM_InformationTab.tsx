import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { IconTargetArrow } from '@tabler/icons-react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useCourseStatus } from '@/hooks/useCourseStatus';

interface CourseInfo {
  course_id: string;
  course_name: string;
  course_description: string;
  course_price: number;
  course_original_price?: number;
  total_lessons: number;
  total_user: number;
  total_duration: number;
  view_count?: number;
  created_at: string;
  target?: string;
}

export function InformationTab({ courseId }: { courseId: string }) {
  const { authData } = useAuth();
  const { hasUnusedCode, isActivated } = useCourseStatus(courseId);

  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/course/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Không thể tải thông tin khóa học');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h} giờ ${m} phút`;
    if (h > 0) return `${h} giờ`;
    return `${m} phút`;
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[300px]">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box p={3}>
        <Alert severity="info">Không tìm thấy thông tin khóa học</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* ================= SUMMARY GRID — NEW UI ================= */}
      <Box
        className="
   flex flex-wrap
    gap-3 sm:gap-4 md:gap-5
    mt-2
  "
      >
        {[
          {
            label: 'Bài học',
            value: `${course.total_lessons} bài`,
          },
          {
            label: 'Học viên',
            value: course.total_user,
          },
          {
            label: 'Lượt xem',
            value: course.view_count?.toLocaleString('vi-VN') ?? 0,
          },
          {
            label: 'Thời lượng',
            value: formatMinutes(course.total_duration),
          },
          {
            label: 'Ngày tạo',
            value: course.created_at ? new Date(course.created_at).toLocaleDateString('vi-VN') : 'Đang cập nhật',
          },
          authData && {
            label: 'Trạng thái',
            value: isActivated ? 'Đã kích hoạt' : hasUnusedCode ? 'Chưa kích hoạt' : 'Chưa sở hữu',
          },
        ]
          .filter(Boolean)
          .map((item: any, idx: number) => (
            <Box
              key={idx}
              className="
                flex flex-col gap-1
                p-4 sm:p-5
                rounded-xl sm:rounded-2xl

                shadow-sm border relative overflow-hidden
                bg-white/80 dark:bg-gray-800/60
                border-gray-200 dark:border-gray-700
                backdrop-blur-sm

                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1 hover:border-purple-400/70

                w-full         
                sm:w-[calc(50%-0.75rem)]
        "
            >
              {/* Subtle gradient highlight */}
              <span
                className="
            absolute inset-0 opacity-[0.06]
            bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 
            pointer-events-none
          "
              />

              <Typography variant="subtitle2" className="relative font-semibold text-purple-600 dark:text-purple-300 text-sm sm:text-base">
                {item.label}
              </Typography>

              <Typography variant="h6" className="relative text-gray-900 dark:text-gray-100 text-base sm:text-lg">
                {item.value}
              </Typography>
            </Box>
          ))}
      </Box>

      {/* ================= DESCRIPTION ================= */}
      <Box className="mt-8">
        <Typography variant="h6" className="text-purple-600 dark:text-purple-400 font-bold mb-3">
          Mô tả khóa học
        </Typography>

        <Box
          className="
    p-6 rounded-2xl shadow-sm border 
    bg-white/90 dark:bg-gray-800/70 
    border-gray-200 dark:border-gray-700 
    backdrop-blur-sm leading-relaxed
    tracking-wide

    transition duration-200 hover:shadow-lg
  "
        >
          {course.course_description || 'Chưa có mô tả chi tiết.'}
        </Box>
      </Box>

      {/* ================= TARGET ================= */}
      {course.target && (
        <Box className="mt-8">
          <Typography variant="h6" className="text-purple-600 dark:text-purple-400 font-bold mb-3">
            Mục tiêu học tập
          </Typography>

          <Box
            className="
              flex flex-col gap-4 p-5 rounded-2xl shadow 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700
            "
          >
            {course.target
              .split('\n')
              .map((line) => line.trim())
              .filter((line) => line)
              .map((line, i) => (
                <Box
                  key={i}
                  className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-600/40
                            transition-all duration-200 hover:bg-purple-50 hover:dark:bg-purple-900/30"
                >
                  <IconTargetArrow size={22} stroke={2} className="flex-shrink-0 text-purple-600 dark:text-purple-400" />
                  <Typography variant="body1" className="text-gray-800 dark:text-gray-300">
                    {line.replace(/^[•\-]\s*/, '')}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
