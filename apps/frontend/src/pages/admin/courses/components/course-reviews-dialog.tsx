import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, Avatar, Rating, Divider, CircularProgress, Alert } from '@mui/material';
import { IconX, IconStar } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { timeAgo } from '@/utils/timeAgo';
import { useAuth } from '@/hooks/useAuth';

interface CourseType {
  course_id: string;
  course_name: string;
  avg_rating: number;
  total_reviews: number;
}

interface ReviewType {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  helpful_count?: number;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface RatingSummary {
  average: number;
  total_reviews: number;
  rating_counts: Record<number, number>;
  reviews: ReviewType[];
}

interface CourseReviewsDialogProps {
  open: boolean;
  course: CourseType | null;
  onClose: () => void;
}

export default function CourseReviewsDialog({ open, course, onClose }: CourseReviewsDialogProps) {
  const { authData } = useAuth();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [summary, setSummary] = useState<RatingSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && course) {
      fetchReviews();
    }
  }, [open, course]);

  const fetchReviews = async () => {
    if (!course) return;

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`/api/review/course/${course.course_id}`);
      setSummary(res.data);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error('Lỗi khi tải đánh giá:', err);
      setError('Không thể tải đánh giá. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    return `/api/file/view/${imageUrl}`;
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (summary?.rating_counts) {
      Object.entries(summary.rating_counts).forEach(([key, value]) => {
        const rating = parseInt(key);
        if (rating >= 1 && rating <= 5) {
          distribution[rating as keyof typeof distribution] = value;
        }
      });
    }

    return distribution;
  };

  if (!course) return null;

  const distribution = getRatingDistribution();
  const totalReviews = summary?.total_reviews || course.total_reviews || 0;
  const averageRating = summary?.average || course.avg_rating || 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, maxHeight: '90vh' },
        className: 'dark:bg-gray-800',
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)',
          borderBottom: '1px solid #fde68a',
          position: 'relative',
          pr: 6,
        }}
        className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconStar size={28} className="text-yellow-600 dark:text-yellow-400" fill="currentColor" />
          <Box>
            <Typography variant="h6" className="text-yellow-700 dark:text-yellow-400 font-semibold">
              Đánh giá khóa học
            </Typography>
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
              {course.course_name}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }} size="small">
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }} className="dark:bg-gray-800">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <>
            {/* Rating Summary */}
            <Box sx={{ mb: 4, p: 3, bgcolor: 'background.default', borderRadius: 2 }} className="dark:bg-gray-900">
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" className="text-yellow-600 dark:text-yellow-400 font-bold">
                    {averageRating.toFixed(1)}
                  </Typography>
                  <Rating value={averageRating} readOnly precision={0.1} size="large" />
                  <Typography variant="body2" color="text.secondary" className="dark:text-gray-400 mt-1">
                    {totalReviews} đánh giá
                  </Typography>
                </Box>

                <Box sx={{ flex: 1, minWidth: 250 }}>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = distribution[star as keyof typeof distribution];
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                    return (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 30 }} className="dark:text-gray-200">
                          {star} <IconStar size={14} className="inline text-yellow-500" fill="currentColor" />
                        </Typography>
                        <Box
                          sx={{
                            flex: 1,
                            height: 8,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                          className="dark:bg-gray-700"
                        >
                          <Box
                            sx={{
                              width: `${percentage}%`,
                              height: '100%',
                              bgcolor: 'warning.main',
                              transition: 'width 0.3s',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" sx={{ minWidth: 40 }} className="dark:text-gray-200">
                          {count}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* Reviews List */}
            <Typography variant="h6" className="dark:text-gray-200 mb-3">
              Tất cả đánh giá ({reviews.length})
            </Typography>

            {reviews.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary" className="dark:text-gray-400">
                  Chưa có đánh giá nào cho khóa học này
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                {reviews.map((review, index) => {
                  // const isHelpful = helpfulVotes.has(review.id);
                  // const helpfulCount = review.helpful_count || 0;

                  return (
                    <Box key={review.id}>
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Avatar src={getImageUrl(review.user?.avatar)} sx={{ width: 48, height: 48 }}>
                            {!review.user?.avatar && getInitials(review.user?.name || 'Người dùng')}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                              <Box>
                                <Typography variant="subtitle2" fontWeight="bold" className="dark:text-gray-200">
                                  {review.user?.name || 'Người dùng ẩn danh'}
                                  {authData?.id === review.user_id && ' (Bạn)'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" className="dark:text-gray-400">
                                  {timeAgo(review.updated_at || review.created_at)}
                                </Typography>
                              </Box>
                              <Rating value={review.rating} readOnly size="small" />
                            </Box>

                            <Typography variant="body2" className="dark:text-gray-300 mb-2">
                              {review.comment}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      {index < reviews.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  );
                })}
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
