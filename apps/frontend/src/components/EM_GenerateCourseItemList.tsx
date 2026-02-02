import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CourseDialog from './EM_DescribeCourse';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatVND } from '@/utils';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';

import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ActivateCourseModal } from '@/pages/EM_CourseDetail/component/EM_ActivateCourseModal';
import { useCourseStatus } from '@/hooks/useCourseStatus';
import { toSlug } from '@/helpers/SeoHelper';

const CourseTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: 0,
  color: theme.palette.text.primary,
  fontSize: '1.125rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition: 'color 0.3s ease',
  [theme.breakpoints.down(1400)]: {
    fontSize: '1.05rem',
  },
  [theme.breakpoints.down(1200)]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.95rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '0.8rem',
    lineHeight: 1.2,
  },
}));

const CourseDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.85rem',
    lineHeight: 1.5,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
    lineHeight: 1.4,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    lineHeight: 1.3,
  },
  [theme.breakpoints.down(480)]: {
    fontSize: '0.7rem',
    lineHeight: 1.2,
  },
}));

const cardStyle = (theme: any) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
  minHeight: 280,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none',
  borderRadius: 0,
  '&:hover': {
    boxShadow: '0 5px 5px rgba(139, 92, 246, 0.2)',
    cursor: 'pointer',
    '& .course-title': {
      color: '#8b5cf6',
    },
    '& .course-thumbnail': {
      transform: 'scale(1.08)',
    },
    '& .discount-badge': {
      transform: 'scale(1.1)',
      boxShadow: '0 4px 12px rgba(255, 107, 107, 0.6)',
    },
  },
  [theme.breakpoints.down(1400)]: {
    minHeight: 260,
  },
  [theme.breakpoints.down(1200)]: {
    minHeight: 240,
  },
  [theme.breakpoints.down('md')]: {
    minHeight: 220,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 200,
  },
  [theme.breakpoints.down(480)]: {
    minHeight: 180,
  },
});

interface GenerateCourseItemListProps {
  courseId: string | null;
  title: string | null;
  src: string | null;
  price: string | null;
  state: string | null;
  originalPrice: string | null;
  loading: boolean;
  description: string | null;
  createAt: string | null;
}

interface CourseSection {
  section_title: string;
  lessons: { lesson_id: string; minutes: number; lesson_title: string }[];
}

// ✅ Cập nhật hàm renderStars để dùng icon từ tabler (giống GenerateCourseItem)
const renderStars = (rating: number) => {
  if (rating === null || rating === 0) {
    return Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="w-4 h-4 text-yellow-500" />);
  }

  const numericRating = Number(rating);
  return Array.from({ length: 5 }).map((_, i) => {
    if (i < Math.floor(numericRating)) {
      return <StarIcon key={i} className="w-4 h-4 text-yellow-500" />;
    }
    if (i < numericRating && numericRating % 1 >= 0.25 && numericRating % 1 <= 0.75) {
      return <StarHalfIcon key={i} className="w-4 h-4 text-yellow-500" />;
    }
    return <StarBorderIcon key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" />;
  });
};

export default function GenerateCourseItemList(props: GenerateCourseItemListProps) {
  const dialogRef = useRef<{ show: () => void; close: () => void }>(null);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourseId] = useState<string | null>(null);

  // ✅ Sử dụng hook useCourseStatus (giống GenerateCourseItem)
  const { hasUnusedCode, isActivated, loading: purchaseLoading, refresh } = useCourseStatus(props.courseId);

  const [showActivateModal, setShowActivateModal] = useState(false);
  const [courseSections, setCourseSections] = useState<CourseSection[]>([]);

  const [totalMinutes, setTotalMinutes] = useState(0);
  const [ratingSummary, setRatingSummary] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVideo, setTotalVideo] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [countView, setCountView] = useState<number>(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!props.courseId) return;

      try {
        const [sectionsRes, userRes, ratingRes, res, viewCount] = await Promise.all([axios.get(`/api/lesson/get-all-lesson-by-courseId/${props.courseId}`), axios.get(`/api/user/count-user-by-courseId/${props.courseId}`), axios.get(`/api/review/course/${props.courseId}`), axios.get(`/api/course/${props.courseId}`), axios.get(`/api/course/${props.courseId}/view-count`)]);

        let totalDuration = 0;
        if (sectionsRes.data && Array.isArray(sectionsRes.data)) {
          sectionsRes.data.forEach((section: any) => {
            if (Array.isArray(section.lessons)) {
              section.lessons.forEach((lesson: any) => {
                totalDuration += lesson.minutes || 0;
              });
            }
          });
          setCourseSections(sectionsRes.data);
          setTotalVideo(res.data.total_lessons);
          setTotalDocuments(res.data.total_documents);
          setCountView(viewCount.data??0)
        }
        setTotalMinutes(totalDuration);
        setTotalUsers(userRes.data);
        setRatingSummary(ratingRes.data?.average || 0);
      } catch (err) {
        console.error('Call api get error:', err);
      }
    };

    fetchCourseData();
  }, [props.courseId]);

  const handleCardClick = () => {
    if (!isDialogOpen && props.courseId) {
      navigate(`/khoa-hoc/${props.courseId}`);
    }
  };

  // ✅ Logic điều hướng học (giống GenerateCourseItem)
  const handleGoToLearn = () => {
    if (courseSections.length > 0 && courseSections[0].lessons?.length > 0) {
      const firstSection = courseSections[0];
      const firstLesson = firstSection.lessons[0];
      const slug = `${toSlug(firstLesson.lesson_title)}-${firstLesson.lesson_id}`;
      navigate(`/bai-hoc/${slug}`, {
        state: {
          lessonId: firstLesson.lesson_id,
          courseId: props.courseId,
          courseName: props.title || '',
          sectionName: firstSection.section_title,
        },
      });
    } else {
      alert('Chưa có bài học nào trong khóa này!');
    }
  };

  // ✅ Logic xử lý button click (giống GenerateCourseItem)
  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isActivated) {
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

  // ✅ Logic hiển thị text button (giống GenerateCourseItem)
  const getButtonText = () => {
    if (purchaseLoading) return '🔄 Đang kiểm tra...';
    if (isActivated) return 'Vào học';
    if (hasUnusedCode) return 'Đã mua (chưa kích hoạt)';
    return 'Mua ngay';
  };

  // ✅ Logic màu button (giống GenerateCourseItem)
  const getButtonColor = () => {
    if (isActivated) return 'linear-gradient(to right, oklch(0.546 0.245 262.881), oklch(0.546 0.245 320))';
    if (hasUnusedCode) return '#f59e0b';
    return '#000';
  };

  const getHoverGradient = () => {
    if (isActivated) return 'linear-gradient(to right, oklch(0.446 0.245 262.881), oklch(0.446 0.245 320))';
    if (hasUnusedCode) return 'linear-gradient(to right, #d97706, #f59e0b)';
    return 'linear-gradient(to right, #7c3aed, #f472b6)';
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // ✅ Format minutes (giống GenerateCourseItem)
  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  const discount = props.originalPrice && props.price ? Math.round(((Number(props.originalPrice) - Number(props.price)) / Number(props.originalPrice)) * 100) : 0;

  // ✅ Handle success - refresh course status (giống GenerateCourseItem)
  const handleActivateSuccess = async () => {
    await refresh(); // Force refresh status
    window.location.reload();
  };

  return (
    <>
      <Card sx={(theme) => cardStyle(theme)} className="course-item rounded-md dark:border-gray-700 dark:bg-gray-800" onClick={handleCardClick}>
        {props.loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 250 }}>
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            {/* Thumbnail */}
            <Box
              sx={(theme) => ({
                position: 'relative',
                flexShrink: 0,
                width: 400,
                m: 3,
                overflow: 'hidden',
                borderRadius: 1,
                [theme.breakpoints.down(1400)]: {
                  width: 280,
                  m: 2.5,
                },
                [theme.breakpoints.down(1200)]: {
                  width: 240,
                  m: 2,
                },
                [theme.breakpoints.down('lg')]: {
                  width: 220,
                  m: 2,
                },
                [theme.breakpoints.down('md')]: {
                  width: 180,
                  m: 1.5,
                },
                [theme.breakpoints.down('sm')]: {
                  width: 140,
                  m: 1.5,
                },
                [theme.breakpoints.down(480)]: {
                  width: 100,
                  m: 1,
                },
                [theme.breakpoints.down(400)]: {
                  width: 80,
                  m: 0.8,
                },
              })}
            >
              <CardMedia
                className="course-thumbnail"
                sx={(theme) => ({
                  width: '100%',
                  height: 230,
                  objectFit: 'cover',
                  borderRadius: 1,
                  transition: 'transform 0.5s cubic-bezier(0.2, 0, 0.2, 1)',
                  [theme.breakpoints.down(1400)]: {
                    height: 180,
                  },
                  [theme.breakpoints.down(1200)]: {
                    height: 160,
                  },
                  [theme.breakpoints.down('md')]: {
                    height: 140,
                  },
                  [theme.breakpoints.down('sm')]: {
                    height: 120,
                  },
                  [theme.breakpoints.down(480)]: {
                    height: 100,
                  },
                  [theme.breakpoints.down(400)]: {
                    height: 80,
                  },
                })}
                image={props.src ? (props.src.includes('http') ? props.src : `/api/admin/courses/file/${props.src}`) : ''}
              />

              {/* Badges Container - Cập nhật logic hiển thị state badge giống GenerateCourseItem */}
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  right: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 1,
                  zIndex: 2,
                  flexWrap: 'wrap',
                  [theme.breakpoints.down(1400)]: {
                    top: 8,
                    left: 8,
                    right: 8,
                  },
                  [theme.breakpoints.down('sm')]: {
                    top: 5,
                    left: 5,
                    right: 5,
                    gap: 0.5,
                  },
                  [theme.breakpoints.down(480)]: {
                    top: 4,
                    left: 4,
                    right: 4,
                  },
                })}
              >
                {/* State Badge - Giống logic từ GenerateCourseItem */}
                {props.state && (
                  <Box
                    sx={(theme) => {
                      const gradient = props.state === 'New' ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : props.state === 'Sale' ? 'linear-gradient(90deg, #f43f5e, #ec4899)' : props.state === 'Best Seller' ? 'linear-gradient(90deg, #fb923c, #f97316)' : props.state === 'Highest Rated' ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #9ca3af, #d1d5db)';
                      return {
                        background: gradient,
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        px: 2,
                        py: 0.75,
                        borderRadius: 10,
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                        [theme.breakpoints.down(1400)]: {
                          fontSize: '0.65rem',
                          px: 1.5,
                          py: 0.6,
                        },
                        [theme.breakpoints.down('sm')]: {
                          fontSize: '0.55rem',
                          px: 1,
                          py: 0.4,
                        },
                        [theme.breakpoints.down(480)]: {
                          fontSize: '0.5rem',
                          px: 0.8,
                          py: 0.3,
                        },
                      };
                    }}
                  >
                    {props.state}
                  </Box>
                )}

                {/* Discount Badge */}
                {discount > 0 && (
                  <Box
                    className="discount-badge"
                    sx={(theme) => ({
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      px: 2,
                      py: 0.85,
                      borderRadius: 10,
                      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      transition: 'all 0.3s ease',
                      [theme.breakpoints.down(1400)]: {
                        fontSize: '0.7rem',
                        px: 1.5,
                        py: 0.7,
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '0.6rem',
                        px: 1,
                        py: 0.5,
                        gap: 0.3,
                      },
                      [theme.breakpoints.down(480)]: {
                        fontSize: '0.55rem',
                        px: 0.8,
                        py: 0.4,
                      },
                    })}
                  >
                    <Box
                      component="span"
                      sx={(theme) => ({
                        fontSize: '0.9rem',
                        [theme.breakpoints.down(1400)]: { fontSize: '0.8rem' },
                        [theme.breakpoints.down(480)]: { fontSize: '0.65rem' },
                      })}
                    >
                      🔥
                    </Box>
                    {discount}%
                  </Box>
                )}
              </Box>
            </Box>

            {/* Content */}
            <CardContent
              sx={(theme) => ({
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                py: 3,
                px: 0,
                pr: 3.5,
                minWidth: 0,
                [theme.breakpoints.down('md')]: {
                  py: 2,
                  pr: 2,
                },
                [theme.breakpoints.down('sm')]: {
                  py: 1.5,
                  pr: 1.5,
                },
                [theme.breakpoints.down(480)]: {
                  py: 1,
                  pr: 1,
                },
              })}
            >
              {/* Top Section */}
              <Box sx={{ minWidth: 0 }}>
                {/* Ngày tạo - Giống GenerateCourseItem */}
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    alignItems: 'start-end',
                    justifyContent: 'flex-end',
                    fontSize: '12px',
                    color: 'gray',
                    fontWeight: 600,
                    gap: 0.4,
                    mb: 1,
                  }}
                  className="dark:text-gray-400"
                >
                  <CalendarMonthIcon sx={{ fontSize: 14 }} />
                  {props.createAt?.slice(0, 10)}
                </Box>

                {/* Title */}
                <CourseTitle
                  className="dark:text-gray-100 course-title"
                  sx={(theme) => ({
                    mb: 2,
                    [theme.breakpoints.down('sm')]: { mb: 1 },
                    [theme.breakpoints.down(480)]: { mb: 0.5 },
                  })}
                >
                  {props.title || 'No title'}
                </CourseTitle>

                {/* Description - Cập nhật để có ellipsis giống GenerateCourseItem */}
                <CourseDescription
                  className="dark:text-gray-200"
                  sx={(theme) => ({
                    mb: 2.5,
                    [theme.breakpoints.down('sm')]: { mb: 1.5 },
                    [theme.breakpoints.down(480)]: { mb: 1 },
                  })}
                >
                  {props.description}
                </CourseDescription>

                {/* Stats - Cập nhật layout giống GenerateCourseItem */}
                <Box display="flex" width="100%" mt={0.4}>
                  <Box display="flex" alignItems="center" flex={1}>
                    <OndemandVideoIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                    <Typography className=" dark:text-white" sx={{ color: 'text.primary' }}>
                      {totalVideo}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" flex={1}>
                    <LibraryBooksIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                    <Typography className=" dark:text-white" sx={{ color: 'text.primary' }}>
                      {totalDocuments}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" flex={1}>
                    <GroupIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                    <Typography className=" dark:text-white" sx={{ color: 'text.primary' }}>
                      {totalUsers}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" width="100%" mt={1}>
                  <Box display="flex" alignItems="center" flex={1}>
                    <RemoveRedEyeIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                    <Typography className=" dark:text-white" sx={{ color: 'text.primary' }}>
                      {countView}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" flex={1}>
                    <AccessTimeIcon className="dark:text-gray-500" sx={{ mr: 0.4, fontSize: 24, color: '#a229e7ff' }} />
                    <Typography className=" dark:text-white" sx={{ color: 'text.primary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {formatMinutes(totalMinutes)}
                    </Typography>
                  </Box>

                  {/* box giả */}
                  <Box flex={1} />
                </Box>
              </Box>

              {/* Bottom Section - Rating & Price */}
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  gap: 1.5,
                  mt: 1,
                  [theme.breakpoints.down(1400)]: {
                    pt: 1.5,
                    gap: 1,
                  },
                  [theme.breakpoints.down(1200)]: {
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 1,
                  },
                  [theme.breakpoints.down('md')]: {
                    pt: 1.5,
                  },
                  [theme.breakpoints.down('sm')]: {
                    pt: 1,
                    gap: 1,
                  },
                })}
              >
                {/* Rating - Cập nhật để dùng renderStars mới */}
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    [theme.breakpoints.down(1200)]: {
                      gap: 0.5,
                      justifyContent: 'flex-start',
                    },
                    [theme.breakpoints.down('sm')]: {
                      gap: 0.5,
                      justifyContent: 'flex-start',
                    },
                  })}
                >
                  <Typography
                    className="dark:text-gray-100"
                    variant="body2"
                    sx={(theme) => ({
                      fontWeight: 700,
                      color: 'text.primary',
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
                  <Box
                    sx={(theme) => ({
                      display: 'flex',
                      alignItems: 'center',
                      [theme.breakpoints.down(480)]: {
                        transform: 'scale(0.85)',
                        transformOrigin: 'left',
                      },
                    })}
                  >
                    {renderStars(ratingSummary || 0)}
                  </Box>
                </Box>
                {/* Price & Button Section */}
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    [theme.breakpoints.down(1400)]: { gap: 2 },
                    [theme.breakpoints.down(1200)]: {
                      justifyContent: 'space-between',
                      gap: 1.5,
                    },
                    [theme.breakpoints.down('md')]: { gap: 2 },
                    [theme.breakpoints.down('sm')]: {
                      justifyContent: 'space-between',
                      gap: 1.5,
                    },
                  })}
                >
                  {/* Price - Cập nhật layout giống GenerateCourseItem */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {props.originalPrice && Number(props.originalPrice) > Number(props.price) && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: 'line-through',
                          color: 'text.secondary',
                          fontSize: '0.85rem',
                        }}
                        className="dark:text-gray-400"
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
                      className="dark:text-gray-100"
                    >
                      {formatVND(props.price)}
                    </Typography>
                  </Box>

                  {/* Button - Sử dụng logic từ GenerateCourseItem */}
                  <Button
                    variant="text"
                    sx={(theme) => ({
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      px: 3,
                      py: 1,
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8,
                      flexShrink: 0,
                      backgroundImage: getButtonColor(),
                      backgroundColor: getButtonColor(),
                      color: 'white',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundImage: getHoverGradient(),
                        border: 'none',
                        color: 'white',
                      },
                      [theme.breakpoints.down(1400)]: {
                        fontSize: '0.8rem',
                        px: 2.5,
                        py: 0.9,
                      },
                      [theme.breakpoints.down(1200)]: {
                        fontSize: '0.75rem',
                        px: 2.2,
                        py: 0.8,
                        gap: 0.6,
                      },
                      [theme.breakpoints.down('md')]: {
                        fontSize: '0.75rem',
                        px: 2,
                        py: 0.7,
                      },
                      [theme.breakpoints.down('sm')]: {
                        fontSize: '0.7rem',
                        px: 1.8,
                        py: 0.7,
                        gap: 0.5,
                      },
                      [theme.breakpoints.down(480)]: {
                        fontSize: '0.65rem',
                        px: 1.5,
                        py: 0.6,
                      },
                      [theme.breakpoints.down(400)]: {
                        fontSize: '0.6rem',
                        px: 1.2,
                        py: 0.5,
                      },
                    })}
                    onClick={handleButtonClick}
                    disabled={purchaseLoading}
                  >
                    {getButtonText()}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </>
        )}
      </Card>

      <ActivateCourseModal showModal={showActivateModal} onClose={() => setShowActivateModal(false)} courseId={props.courseId ?? ''} onSuccess={handleActivateSuccess} />

      <CourseDialog ref={dialogRef} onClose={handleDialogClose} courseId={selectedCourseId ?? undefined} />
    </>
  );
}
