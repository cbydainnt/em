import { Popover, Box, Button, Typography, Snackbar, Alert, Rating } from '@mui/material';
import { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconTargetArrow } from '@tabler/icons-react';
import EM_Login from './EM_Login';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useCartStore } from '@/hooks/useCartStore';
import { useAuth } from '@/hooks/useAuth';
import { useCourseStatus } from '@/hooks/useCourseStatus';

interface CoursePopoverProps {
  courseId?: string;
  onMouseEnterPopover?: () => void;
  onMouseLeavePopover?: () => void;
}

const CoursePopover = forwardRef(function CoursePopover({ courseId, onMouseEnterPopover, onMouseLeavePopover }: CoursePopoverProps, ref) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const loginRef = useRef<any>(null);
  const { authData } = useAuthStore();
  const { fetchUser } = useAuth();
  const [isInCart, setIsInCart] = useState(false);
  const { hasUnusedCode, userCourseStatus } = useCourseStatus(courseId ?? null);
  const isCourseActivated = userCourseStatus === 1 || userCourseStatus === 3;
  const { incrementCartCount } = useCartStore();
  const [anchorPosition, setAnchorPosition] = useState({
    vertical: 'top' as 'top' | 'bottom',
    horizontal: 'right' as 'left' | 'right',
  });
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const show = (anchor: HTMLElement) => {
    const rect = anchor.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    const shouldOpenLeft = screenWidth - rect.right < 400;

    setAnchorEl(anchor);
    setAnchorPosition({
      vertical: 'top',
      horizontal: shouldOpenLeft ? 'left' : 'right',
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToCart = async () => {
    if (!authData) {
      loginRef.current?.show();
      return;
    }
    try {
      const cartData = {
        user_id: authData.id,
        course_id: course.course_id,
      };
      await axios.post('/api/cart_item/add', cartData);
      await fetchUser();
      setOpenSnackbar(true);
      incrementCartCount();
      handleClose();
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert('⚠️ Khóa học đã có trong giỏ hàng');
      } else {
        console.error('Lỗi thêm giỏ hàng:', error);
        alert('❌ Không thể thêm vào giỏ hàng');
      }
    }
  };

  const handleBuyNow = () => {
    handleClose();
    navigate(`/thanh-toan?courseID=${courseId}`);
  };

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  useImperativeHandle(ref, () => ({ show, close: () => setAnchorEl(null) }));

  useEffect(() => {
    if (!courseId) return;
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/course/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    fetchCourse();
    const bInCart = authData?.cartItems?.some((item: any) => item.course_id === courseId);
    setIsInCart(bInCart);
  }, [courseId, authData]);

  const handleViewCard = () => {
    navigate(`/gio-hang`); // 👉 Hiện giao diện thanh toán sau khi đóng
  };

  const formatMinutes = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableRestoreFocus={true}
        disablePortal
        sx={{ pointerEvents: 'none' }}
        slotProps={{
          paper: {
            onMouseEnter: onMouseEnterPopover,
            onMouseLeave: onMouseLeavePopover,
            sx: {
              position: 'relative',
              overflow: 'visible',
              pointerEvents: 'auto',
              width: 350,
              maxHeight: 'auto',
              borderRadius: 4,
              boxShadow: '0 8px 30px rgba(167,139,250,0.3)',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              className: 'dark:bg-gray-900 dark:text-gray-100',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                [anchorPosition.horizontal === 'right' ? 'left' : 'right']: '-8px',
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                [anchorPosition.horizontal === 'right' ? 'borderRight' : 'borderLeft']: '8px solid rgba(255,255,255,0.9)',
                filter: 'drop-shadow(-2px 0 4px rgba(167,139,250,0.2))',
              },
            },
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: anchorPosition.horizontal,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: anchorPosition.horizontal === 'right' ? 'left' : 'right',
        }}
      >
        {/* Nội dung */}
        <Box sx={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* CHI TIẾT */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight="700"
                  sx={{
                    background: 'linear-gradient(90deg, #030303, #030303, #030303)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5,
                  }}
                >
                  {course?.course_name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Đánh giá trung bình:
                  </Typography>
                  <Rating name="course-rating" value={course?.ratingSummary?.avg_rating && course.ratingSummary.avg_rating > 0 ? course.ratingSummary.avg_rating : 5} precision={0.5} readOnly size="small" icon={<StarIcon fontSize="inherit" />} emptyIcon={<StarIcon fontSize="inherit" sx={{ opacity: 0.3 }} />} />
                  <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                    {course?.ratingSummary?.avg_rating.toFixed(1) || '5.0'}
                  </Typography>
                  {/* <StarIcon sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} /> */}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h6" sx={{ color: '#b02732ff', fontWeight: 700 }}>
                    {course?.course_price ? `${course.course_price.toLocaleString('vi-VN')} VNĐ` : 'Đang cập nhật'}
                  </Typography>

                  {course?.course_original_price && course?.course_original_price > course?.course_price && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'line-through',
                        ml: 1,
                        fontSize: '0.9rem',
                      }}
                    >
                      {course.course_original_price.toLocaleString('vi-VN')} VNĐ
                    </Typography>
                  )}
                </Box>
                <Box display="flex" flexDirection="column" gap={0.5} mb={2}>
                  <Box display="flex" gap={3}>
                    <Typography variant="body2" color="text.primary">
                      Bài học: <b style={{ fontWeight: 500 }}>{course?.total_lessons || 0}</b> bài
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Học viên: <b style={{ fontWeight: 500 }}>{course?.total_user || 0}</b>
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.primary">
                    Thời lượng: <b style={{ fontWeight: 500 }}>{formatMinutes(course?.total_duration || 0)}</b>
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Ngày tạo: <b style={{ fontWeight: 500 }}>{course?.created_at ? new Date(course.created_at).toISOString().split('T')[0] : 'Đang cập nhật'}</b>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ px: 3, pt: 0.5, pb: 2, mt: -3.5 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#a229e7ff', mb: 1 }}>
              Mô tả khóa học
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.8,
                color: 'text.primary',
                textAlign: 'justify',
                whiteSpace: 'pre-line',
                letterSpacing: 0,
                wordSpacing: 0,
                fontFamily: 'inherit',
              }}
            >
              {course?.course_description}
            </Typography>
          </Box>

          <Box sx={{ px: 3, pb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#a229e7ff', mb: 1.5 }}>
              Mục tiêu
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, color: 'text.primary' }}>
              {course?.target
                ?.split('\n') // tách chuỗi target theo dòng
                .map((line: string) => line.trim()) // bỏ khoảng trắng thừa
                .filter((line: string) => line) // bỏ dòng rỗng
                .map((line: string, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconTargetArrow size={18} stroke={2} color="#000000ff" />
                    </Box>

                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {line.replace(/^•\s*/, '')} {/* loại bỏ ký tự • nếu có */}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>

          {/* BUTTONS */}
          {!hasUnusedCode && !isCourseActivated && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                pb: 3,
              }}
            >
              {isInCart ? (
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleViewCard}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.8,
                    minWidth: 'auto',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    color: '#333',
                    whiteSpace: 'nowrap',
                    '& .MuiButton-startIcon': {
                      marginRight: '6px',
                    },
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#bbb',
                    },
                  }}
                >
                  Xem giỏ hàng
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.8,
                    minWidth: 'auto',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    color: '#333',
                    whiteSpace: 'nowrap',
                    '& .MuiButton-startIcon': {
                      marginRight: '6px',
                    },
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#bbb',
                    },
                  }}
                >
                  Thêm vào
                </Button>
              )}

              <Button
                variant="contained"
                startIcon={<PaymentIcon />}
                onClick={handleBuyNow}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 0.5,
                  minWidth: 'auto',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  backgroundColor: '#7c4dff',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(124, 77, 255, 0.5)',
                  '& .MuiButton-startIcon': {
                    marginRight: '6px',
                  },
                  '&:hover': {
                    backgroundColor: '#652dcf',
                    boxShadow: '0 6px 16px rgba(101, 45, 207, 0.6)',
                  },
                }}
              >
                Mua ngay
              </Button>
            </Box>
          )}
        </Box>
      </Popover>
      <EM_Login ref={loginRef} />

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            background: 'linear-gradient(90deg, #81c784, #4caf50, #388e3c)',
            color: 'white',
          }}
        >
          Đã thêm vào giỏ hàng
        </Alert>
      </Snackbar>
    </>
  );
});
export default CoursePopover;
