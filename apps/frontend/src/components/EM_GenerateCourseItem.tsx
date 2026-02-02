import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatVND } from '@/utils';
import CoursePopover from './EM_DescribeCoursePopover';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import axios from 'axios';
import { ActivateCourseModal } from '@/pages/EM_CourseDetail/component/EM_ActivateCourseModal';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useCourseStatus } from '@/hooks/useCourseStatus';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { courseItemBackground } from '@/helpers/theme';
import { useThemeStore } from '@/hooks/useThemeEventStore';
import { toSlug } from '@/helpers/SeoHelper';
const CourseTitle = styled('h2')(({ theme }) => ({
  height: '2.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 'bold',
  lineHeight: 1.2,
  letterSpacing: 0,
  maxInlineSize: '36em',
  marginTop: '0.4em',
  color: theme.palette.text.primary,
}));

const CourseDescription = styled('span')(({ theme }) => ({
  height: '4.1rem',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  color: theme.palette.text.secondary,
  fontSize: '0.95rem',
  lineHeight: 1.4,
  maxWidth: '32em',
}));

const cardStyle = {
  maxWidth: 380,
  maxHeight: 580,
  width: '100%',
  height: '100%',
  willChange: 'transform',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-15px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
    cursor: 'pointer',
  },
};

interface GenerateItemProps {
  courseId: string | null;
  courseName: string | null;
  thumbnail: string | null;
  price: string | null;
  originalPrice: string | null;
  loading: boolean;
  description: string | null;
  createAt: string | null;
  state: string | null;
  //theme?: string;
}

interface CourseSection {
  section_title: string;
  lessons: { lesson_id: string; minutes: number; lesson_title: string }[];
}

export default function GenerateCourseItem(props: GenerateItemProps) {
  const navigate = useNavigate();

  // ✅ Dùng hook mới - không động vào authData
  const { hasUnusedCode, userCourseStatus, loading: purchaseLoading, refresh } = useCourseStatus(props.courseId);

  const [showActivateModal, setShowActivateModal] = useState(false);
  const [courseSections, setCourseSections] = useState<CourseSection[]>([]);

  const popoverRef = useRef<{ show: (anchor: HTMLElement) => void; close: () => void }>(null);
  const [totalVideo, setTotalVideo] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [countView, setCountView] = useState<number>(0);
  const isCourseActivated = userCourseStatus === 1 || userCourseStatus === 3;
  const isReserved = userCourseStatus === 3;
  const { theme, fetchTheme } = useThemeStore();
  useEffect(() => {
    const fetchCourseSections = async () => {
      if (!props.courseId) return;

      try {
        const res = await axios.get(`/api/course/${props.courseId}`);
        if (res.data?.sections) {
          setCourseSections(res.data.sections);
          setTotalVideo(res.data.total_lessons);
          setTotalDocuments(res.data.total_documents);
        }

        fetchTheme();
      } catch (error) {
        console.error('Error fetching course sections:', error);
      }
    };
    const fetchViewCount = async () => {
      if (!props.courseId) return;
      try {
        const res = await axios.get(`/api/course/${props.courseId}/view-count`);
        setCountView(res.data ?? 0);
      } catch (err) {
        console.error('Error fetching view count:', err);
      }
    };

    fetchCourseSections();
    fetchViewCount();
  }, [props.courseId]);

  const handleGoToLearn = () => {
    if (courseSections.length > 0 && courseSections[0].lessons?.length > 0) {
      const firstSection = courseSections[0];
      const firstLesson = firstSection.lessons[0];
      const slug = `${toSlug(firstLesson.lesson_title)}-${firstLesson.lesson_id}`;
      navigate(`/bai-hoc/${slug}`, {
        state: {
          lessonId: firstLesson.lesson_id,
          courseId: props.courseId,
          courseName: props.courseName || '',
          sectionName: firstSection.section_title,
        },
      });
    } else {
      alert('Chưa có bài học nào trong khóa này!');
    }
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isReserved) {
      // ✅ Trạng thái 4: Đang bảo lưu
      return;
    }

    if (isCourseActivated) {
      // ✅ Trạng thái 3: Đã kích hoạt -> Vào học
      handleGoToLearn();
    } else if (hasUnusedCode) {
      // ✅ Trạng thái 2: Đã mua, mã chưa dùng -> Mở modal kích hoạt
      setShowActivateModal(true);
    } else {
      // ✅ Trạng thái 1: Mua ngay (chưa mua / mã hết hạn / người khác dùng / khóa học hết hạn)
      navigate(`/thanh-toan?courseID=${props.courseId}`);
    }
  };

  const getButtonText = () => {
    if (purchaseLoading) return '🔄 Đang kiểm tra...';
    if (isReserved) return '⏸ Đang bảo lưu';
    if (isCourseActivated) return 'Vào học';
    if (hasUnusedCode) return 'Đã mua (chưa kích hoạt)';
    return 'Mua ngay';
  };

  const getButtonColor = () => {
    if (isReserved) return '#6b7280';
    if (isCourseActivated) return 'linear-gradient(to right, oklch(0.546 0.245 262.881), oklch(0.546 0.245 320))';
    if (hasUnusedCode) return '#f59e0b';
    return theme === 'newyear' ? 'linear-gradient(90deg, #D9381E, #F16E30)' : '#000';
  };

  const getHoverGradient = () => {
    if (isCourseActivated) return 'linear-gradient(to right, oklch(0.446 0.245 262.881), oklch(0.446 0.245 320))';
    if (hasUnusedCode) return 'linear-gradient(to right, #d97706, #f59e0b)';
    return 'linear-gradient(to right, #7c3aed, #f472b6)';
  };

  const currentTargetRef = useRef<HTMLElement | null>(null);
  const isHoveringPopoverRef = useRef(false);

  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    currentTargetRef.current = event.currentTarget;

    // Huỷ đóng nếu đang chờ
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // Nếu đang chờ mở thì không tạo thêm
    if (openTimeoutRef.current) return;

    openTimeoutRef.current = setTimeout(() => {
      if (!currentTargetRef.current) return;

      popoverRef.current?.show(currentTargetRef.current);
      openTimeoutRef.current = null;
    }, 1000);
  };

  const handlePopoverClose = () => {
    // Huỷ mở nếu chưa kịp mở
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    closeTimeoutRef.current = setTimeout(() => {
      if (!isHoveringPopoverRef.current) {
        popoverRef.current?.close?.();
      }
    }, 200);
  };

  const handleDetailClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (props.courseId) {
      navigate(`/khoa-hoc/${props.courseId}`);
    }
  };

  const [totalMinutes, setTotalMinutes] = useState(0);
  const [ratingSummary, setRatingSummary] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const countTotalDurationCourse = async () => {
      try {
        if (props.courseId) {
          const [lessonRes, userRes, ratingRes] = await Promise.all([axios.get(`/api/lesson/get-all-lesson-by-courseId/${props.courseId}`), axios.get(`/api/user/count-user-by-courseId/${props.courseId}`), axios.get(`/api/review/course/${props.courseId}`)]);

          let total = 0;
          lessonRes.data.forEach((section: any) => {
            if (Array.isArray(section.lessons)) {
              section.lessons.forEach((lesson: any) => {
                total += lesson.minutes || 0;
              });
            }
          });

          setTotalMinutes(total);
          setTotalUsers(userRes.data);
          setRatingSummary(ratingRes.data.average);
        }
      } catch (err) {
        console.error('Call api get error:', err);
      }
    };

    countTotalDurationCourse();
  }, [props.courseId]);

  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  // ✅ Handle success - refresh course status
  const handleActivateSuccess = async () => {
    await refresh(); // Force refresh status
    window.location.reload();
  };

  const backgroundImg = courseItemBackground[theme].src;

  const getDecorationClass = () => {
    switch (theme) {
      case 'christmas':
        return 'melt-snow';
      case 'newyear':
        return '';
      case 'independence':
        return '';
      default:
        return '';
    }
  };

  const getButtonDecorationClass = () => {
    switch (theme) {
      case 'christmas':
        return 'melt-snow-btn';
      case 'newyear':
        return '';
      case 'independence':
        return '';
      default:
        return '';
    }
  };
  return (
    <>
      <Card
        sx={{
          ...cardStyle,
          position: 'relative',
          overflow: 'visible',
        }}
        className={`course-item dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 ${getDecorationClass()}`}
        onClick={handleDetailClick}
        onMouseMove={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {props.loading ? (
          <div className="flex items-center justify-center w-full h-[140px] bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">Loading...</div>
        ) : (
          <>
            <CardActionArea>
              <CardMedia sx={{ width: '100%', aspectRatio: '16/9' }} image={props.thumbnail ? (props.thumbnail.includes('http') ? props.thumbnail : `/api/admin/courses/file/${props.thumbnail}`) : ''} />
              {props.state && (
                <Box
                  sx={() => {
                    const gradient = props.state === 'New' ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : props.state === 'Sale' ? 'linear-gradient(90deg, #f43f5e, #ec4899)' : props.state === 'Best Seller' ? 'linear-gradient(90deg, #fb923c, #f97316)' : props.state === 'Highest Rated' ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #9ca3af, #d1d5db)';

                    return {
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: gradient,
                      color: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 5,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    };
                  }}
                >
                  {props.state}
                </Box>
              )}
            </CardActionArea>

            {/* ⭐ CardContent với background - BỌC TẤT CẢ content + actions */}
            <CardContent
              sx={{
                backgroundImage: backgroundImg
                  ? `
      linear-gradient(rgba(255, 252, 240, 0.28), rgba(255, 250, 235, 0.28)),
      url(${backgroundImg})
    `
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '16px',
                paddingBottom: '8px !important', // ⭐ Bỏ padding dưới vì button sẽ ở trong
              }}
              className="dark:text-gray-200"
            >
              {/* Date */}
              <Box
                component="span"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontSize: '12px',
                  color: 'rgb(var(--text-primary))',
                  fontWeight: 600,
                  gap: 0.4,
                }}
              >
                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                {props.createAt?.slice(0, 10)}
              </Box>

              {/* Title */}
              <CourseTitle
                sx={{
                  color: 'rgb(var(--text-primary))',
                  //  textShadow: '0 1px 3px rgba(255,255,255,0.9)', // ⭐ Text shadow
                }}
              >
                {props.courseName || 'No title'}
              </CourseTitle>

              {/* Description */}
              <CourseDescription
                sx={{
                  color: 'rgb(var(--text-primary))',
                }}
              >
                {props.description}
              </CourseDescription>

              {/* Stats Row 1 */}
              <Box display="flex" width="100%" mt={0.4}>
                <Box display="flex" alignItems="center" flex={1}>
                  <OndemandVideoIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                  <Typography
                    sx={{
                      color: 'rgb(var(--text-primary))',
                    }}
                  >
                    {totalVideo}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" flex={1}>
                  <LibraryBooksIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                  <Typography
                    sx={{
                      color: 'rgb(var(--text-primary))',
                    }}
                  >
                    {totalDocuments}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" flex={1}>
                  <GroupIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                  <Typography
                    sx={{
                      color: 'rgb(var(--text-primary))',
                    }}
                  >
                    {totalUsers}
                  </Typography>
                </Box>
              </Box>

              {/* Stats Row 2 */}
              <Box display="flex" width="100%" mt={1}>
                <Box display="flex" alignItems="center" flex={1}>
                  <RemoveRedEyeIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                  <Typography
                    sx={{
                      color: 'rgb(var(--text-primary))',
                    }}
                  >
                    {countView}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" flex={1}>
                  <AccessTimeIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                  <Typography
                    sx={{
                      color: 'rgb(var(--text-primary))',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {formatMinutes(totalMinutes)}
                  </Typography>
                </Box>

                <Box flex={1} />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1.5,
                  pt: 1,
                }}
              >
                {/* Price Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {props.originalPrice && (
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'rgb(var(--text-primary))',
                        fontSize: '0.85rem',
                      }}
                    >
                      {formatVND(props.originalPrice)}
                    </Typography>
                  )}

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: props.originalPrice ? '#e11d48' : '#000',
                      fontSize: '1rem',
                    }}
                  >
                    {formatVND(props.price)}
                  </Typography>
                </Box>

                {/* Rating Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      fontWeight: 700,
                      color: 'rgb(var(--text-primary))',
                      fontSize: '0.8rem',
                      paddingTop: '5px',
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                      [theme.breakpoints.down('sm')]: { fontSize: '0.7rem' },
                      [theme.breakpoints.down(480)]: { fontSize: '0.65rem' },
                    })}
                  >
                    {(ratingSummary || 5).toFixed(1)}
                  </Typography>
                  {ratingSummary === null || ratingSummary === 0
                    ? Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="w-4 h-4 text-yellow-500" />)
                    : Array.from({ length: 5 }).map((_, i) => {
                        const rating = Number(ratingSummary);
                        if (i < Math.floor(rating)) {
                          return <StarIcon key={i} className="w-4 h-4 text-yellow-500" />;
                        }
                        if (i < rating && rating % 1 >= 0.25 && rating % 1 <= 0.75) {
                          return <StarHalfIcon key={i} className="w-4 h-4 text-yellow-500" />;
                        }
                        return <StarBorderIcon key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />;
                      })}
                </Box>
              </Box>

              <Button
                variant="text"
                className={` ${getButtonDecorationClass()}`}
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  mt: '20px',
                  backgroundImage: getButtonColor(),
                  backgroundColor: getButtonColor(),
                  color: 'white',
                  boxShadow: 'none',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundImage: getHoverGradient(),
                    border: 'none',
                    color: 'white',
                  },
                }}
                onClick={handleButtonClick}
                disabled={purchaseLoading}
              >
                {getButtonText()}
              </Button>
            </CardContent>
          </>
        )}
      </Card>
      <ActivateCourseModal showModal={showActivateModal} onClose={() => setShowActivateModal(false)} courseId={props.courseId ?? ''} onSuccess={handleActivateSuccess} />
      <CoursePopover
        ref={popoverRef}
        courseId={props.courseId ?? undefined}
        onMouseEnterPopover={() => {
          isHoveringPopoverRef.current = true;
        }}
        onMouseLeavePopover={() => {
          isHoveringPopoverRef.current = false;
          handlePopoverClose();
        }}
      />
    </>
  );
}
