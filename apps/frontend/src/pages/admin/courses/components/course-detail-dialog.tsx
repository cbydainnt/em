import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, Grid, Chip, Divider, Avatar } from '@mui/material';
import { IconX, IconBook, IconClock, IconUsers, IconStar, IconCurrencyDong, IconEye } from '@tabler/icons-react';

interface CourseType {
  course_id: string;
  course_name: string;
  course_description: string;
  course_price: number;
  course_original_price: number;
  state: string;
  thumbnail?: string;
  total_lessons: number;
  total_duration: number;
  total_course_user: number;
  avg_rating: number;
  view_count: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  del_flg: boolean;
}

interface CourseDetailDialogProps {
  open: boolean;
  course: CourseType | null;
  onClose: () => void;
}

export default function CourseDetailDialog({ open, course, onClose }: CourseDetailDialogProps) {
  if (!course) return null;

  const getStateColor = (state: string) => {
    switch (state) {
      case 'New':
        return 'info';
      case 'Highest Rated':
        return 'success';
      case 'Best Seller':
        return 'warning';
      case 'Sale':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStateLabel = (state: string) => {
    switch (state) {
      case 'New':
        return 'Mới';
      case 'Highest Rated':
        return 'Đánh giá cao';
      case 'Best Seller':
        return 'Bán chạy';
      case 'Normal':
        return 'Bình thường';
      case 'Sale':
        return 'Giảm giá';
      default:
        return state;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
        className: 'dark:bg-gray-800',
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
          borderBottom: '1px solid #e9d5ff',
          position: 'relative',
          pr: 6,
        }}
        className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconBook size={28} className="text-purple-600 dark:text-purple-400" />
          <Typography variant="h5" className="text-purple-600 dark:text-purple-400 font-semibold">
            Chi tiết khóa học
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }} size="small">
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, mt: 3 }} className="dark:bg-gray-800">
        <Grid container spacing={3}>
          {/* Thumbnail */}
          <Grid item xs={12} md={4}>
            <Avatar src={course.thumbnail ? (course.thumbnail.includes('http') ? course.thumbnail : `/api/admin/courses/file/${course.thumbnail}`) : ''} variant="rounded" sx={{ width: '100%', height: 300 }}>
              <IconBook size={24} />
            </Avatar>
          </Grid>

          {/* Basic Info */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className="dark:text-gray-200 mb-2 font-semibold">
              {course.course_name}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Chip label={getStateLabel(course.state)} color={getStateColor(course.state)} size="small" />
              <Chip label={course.del_flg ? 'Đã ẩn' : 'Hiển thị'} color={course.del_flg ? 'default' : 'error'} size="small" />
            </Box>

            <Typography variant="body1" color="text.secondary" className="dark:text-gray-400 mb-3">
              {course.course_description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Statistics */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconCurrencyDong size={24} className="text-green-600 dark:text-green-400" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Giá hiện tại
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.course_price)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconCurrencyDong size={24} className="text-gray-600 dark:text-gray-400" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Giá gốc
                    </Typography>
                    <Typography variant="body1" className="dark:text-gray-200" sx={{ textDecoration: 'line-through' }}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.course_original_price)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconBook size={24} className="text-blue-600 dark:text-blue-400" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Số bài học
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                      {course.total_lessons} bài
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconClock size={24} className="text-orange-600 dark:text-orange-400" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Thời lượng
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                      {course.total_duration} phút
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconUsers size={24} className="text-purple-600 dark:text-purple-400" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Học viên
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                      {course.total_course_user} học viên
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconEye size={24} className="text-purple-800 dark:text-purple-500" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Lượt xem
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                      {course.view_count} lượt
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconStar size={24} className="text-yellow-600" fill="currentColor" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                      Đánh giá
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                      {course.avg_rating?.toFixed(1)} ({course.total_reviews} reviews)
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Dates */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                  Ngày tạo
                </Typography>
                <Typography variant="body2" className="dark:text-gray-200">
                  {new Date(course.created_at).toLocaleString('vi-VN')}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle2" color="text.secondary" className="dark:text-gray-400">
                  Cập nhật cuối
                </Typography>
                <Typography variant="body2" className="dark:text-gray-200">
                  {new Date(course.updated_at).toLocaleString('vi-VN')}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Combo Info - Mock data */}
          {/* <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" className="dark:text-gray-200 mb-2">
              Thuộc combo:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Combo Web Development" size="medium" variant="outlined" color="primary" />
              <Chip label="Combo Frontend Master" size="medium" variant="outlined" color="secondary" />
            </Box>
          </Grid> */}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
