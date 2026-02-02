import { Dialog, DialogContent, DialogActions, Button, Typography, Box, Divider, Snackbar, Alert, IconButton } from '@mui/material';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface CourseDialogProps {
  courseId?: string;
  onClose?: () => void;
}

const CourseDialog = forwardRef(function CourseDialog({ onClose, courseId }: CourseDialogProps, ref) {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);

  const show = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleAddToCart = () => {
    setOpenSnackbar(true);
    handleClose();
  };

  const handleBuyNow = () => {
    handleClose();
    navigate(`/thanh-toan?courseID=${courseId}`);
  };

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (!courseId) return; // tránh fetch nếu chưa có id
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/course/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };

    fetchCourse();
  }, [courseId]);

  useImperativeHandle(ref, () => ({ show }));

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(167,139,250,0.3)',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            className: 'dark:bg-gray-900 dark:text-gray-100',
          },
        }}
      >
        {/* nút X */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          sx={{
            position: 'absolute',
            right: -0.5,
            top: -0.5,
            color: 'text.secondary',
            zIndex: 10,
            transition: 'transform 0.3s ease, color 0.3s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
              color: '#a345e2ff',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* CONTENT */}
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            p: 3,
          }}
        >
          {/* ẢNH */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: 300 },
            }}
          >
            <Box
              component="img"
              src={course?.thumbnail}
              alt={course?.course_name}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(167,139,250,0.25)',
              }}
            />

            {course?.state && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: '999px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  letterSpacing: 0.4,
                  zIndex: 2,
                  background: course.state === 'New' ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : course.state === 'Sale' ? 'linear-gradient(90deg, #f43f5e, #ec4899)' : course.state === 'Best Seller' ? 'linear-gradient(90deg, #fb923c, #f97316)' : course.state === 'Highest Rated' ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #9ca3af, #d1d5db)',
                }}
              >
                {course.state}
              </Box>
            )}
          </Box>
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

              {/* {course?.state && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 48,
                    px: 1.6,
                    py: 0.4,
                    borderRadius: '999px',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    letterSpacing: 0.4,
                    zIndex: 2,
                    background: course.state === 'New' ? 'linear-gradient(90deg, #3b82f6, #60a5fa)' : course.state === 'Sale' ? 'linear-gradient(90deg, #f43f5e, #ec4899)' : course.state === 'Best Seller' ? 'linear-gradient(90deg, #0bf50bff, #36fb24ff)' : course.state === 'Highest Rated' ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #9ca3af, #d1d5db)',
                  }}
                >
                  {course.state}
                </Box>
              )} */}

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Đánh giá trung bình:
                </Typography>
                <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 500 }}>
                  {course?.avg_rate_star?.toFixed(1) || '0.0'}
                </Typography>
                <StarIcon sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
                {/* <Rating name="avg-rating" value={course?.avg_rate_star || 0} precision={0.1} readOnly size="small" /> */}
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
                  <Typography variant="body2" color="text.secondary">
                    Bài học: <b>{course?.total_course_duration || 0}</b> bài
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Học viên: <b>{course?.total_course_user || '...'}</b>
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Thời lượng: <b>{course?.total_course_duration || 0}</b> phút
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày tạo: <b>{course?.created_at ? new Date(course.created_at).toLocaleDateString('vi-VN') : 'Đang cập nhật'}</b>
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        {/* <Divider sx={{ mt: 1.5, mx: 2, my: 1, borderColor: 'rgba(0, 0, 0, 0.24)' }} /> */}
        <Box sx={{ px: 3, pb: 2 }}>
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

        <Divider sx={{ mx: 2, my: 1, borderColor: 'rgba(0, 0, 0, 0.24)' }} />

        {/* BUTTONS */}
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            gap: 2,
            px: 3,
            pb: 3,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#582bd4ff',
              color: '#8531d4ff',
              '&:hover': {
                background: 'rgba(236,72,153,0.08)',
                borderColor: '#9427eeff',
              },
            }}
          >
            Thêm vào giỏ hàng
          </Button>

          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
            onClick={handleBuyNow}
            className="btn-hover-gradient"
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #a78bfa, #ab44e7ff, #8f3edbff)',
              boxShadow: '0 4px 12px rgba(236,72,153,0.3)',
              '&:hover': {
                boxShadow: '0 4px 20px rgba(236,72,153,0.45)',
              },
            }}
          >
            Mua ngay
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            background: 'linear-gradient(90deg, #a78bfa, #8f47e0ff, #974bd4ff)',
            color: 'white',
          }}
        >
          ✅ Đã thêm vào giỏ hàng
        </Alert>
      </Snackbar>
    </>
  );
});

export default CourseDialog;
