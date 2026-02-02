import { useState, useEffect } from 'react';
import { IconX, IconSearch, IconFilterCheck } from '@tabler/icons-react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { timeAgo } from '@/utils/timeAgo';
import { Pagination, Avatar, Stack, TextField, InputAdornment, IconButton, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export function ReviewTab({ courseId, onReviewUpdate }: { courseId: string; onReviewUpdate?: () => void }) {
  const { authData } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const userReview = allReviews.find((r) => r.user_id === authData?.id);
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [listLoading, setListLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [hasCourseAccess, setHasCourseAccess] = useState(false);
  const [_accessLoading, setAccessLoading] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const [_editingReview, setEditingReview] = useState<any>(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const ratingCounts = summary?.rating_counts || {};
  const totalReviews = summary?.total_reviews || 0;
  const ratingPercents = [5, 4, 3, 2, 1].map((r) => ((ratingCounts[r] || 0) / (totalReviews || 1)) * 100);

  const average = totalReviews === 0 ? '5.0' : summary?.average?.toFixed(1) || '0.0';

  const totalPages = Math.ceil(reviews.length / perPage);
  const currentReviews = reviews.slice((page - 1) * perPage, page * perPage);

  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId && authData) {
      checkCourseAccess();
    }
  }, [courseId, authData]);

  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/review/course/${courseId}`);
      setSummary(res.data);
      setAllReviews(res.data.reviews || []);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Không thể tải đánh giá', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function checkCourseAccess() {
    if (!authData || !courseId) return;

    try {
      setAccessLoading(true);
      const res = await axios.get(`/api/review/check-access/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
      });
      setHasCourseAccess(res.data.hasAccess);
    } catch (err) {
      console.error('Không thể kiểm tra quyền truy cập:', err);
      setHasCourseAccess(false);
    } finally {
      setAccessLoading(false);
    }
  }

  const toggleComment = (reviewId: string) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    return `/api/file/view/${imageUrl}`;
  };

  function handleEditReview(review: any) {
    setNewRating(review.rating);
    setComment(review.comment);
    setEditingReviewId(review.id);
    setEditingReview(review);
    setReviewDialogOpen(true);
  }

  const isLongReview = (comment: string) => comment.length > 200;

  function handleRatingClick() {
    if (!authData) {
      setSnackbar({ open: true, message: 'Bạn cần đăng nhập để đánh giá', severity: 'error' });
      return;
    }

    if (!hasCourseAccess) {
      setSnackbar({ open: true, message: 'Bạn cần học khóa học này trước khi đánh giá', severity: 'error' });
      return;
    }

    if (userReview) {
      handleEditReview(userReview);
    } else {
      setReviewDialogOpen(true);
    }
  }

  async function handleSubmitReview(fromDialog = false) {
    if (!authData) {
      setSnackbar({ open: true, message: 'Bạn cần đăng nhập để đánh giá', severity: 'error' });
      return;
    }
    if (newRating === 0) {
      setSnackbar({ open: true, message: 'Vui lòng chọn số sao', severity: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      await axios.post(
        `/api/review/course/${courseId}`,
        {
          rating: newRating,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
        },
      );

      setSnackbar({
        open: true,
        message: editingReviewId ? 'Cập nhật đánh giá thành công!' : 'Đánh giá thành công!',
        severity: 'success',
      });

      setComment('');
      setNewRating(0);
      setEditingReviewId(null);
      setEditingReview(null);
      if (fromDialog) setReviewDialogOpen(false);

      if (onReviewUpdate) {
        onReviewUpdate();
      }

      fetchReviews();
    } catch (err: any) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Lỗi khi gửi đánh giá',
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-300">Đang tải đánh giá...</div>;
  }

  const handleCloseDialog = () => {
    setReviewDialogOpen(false);
    setNewRating(0);
    setComment('');
    setEditingReviewId(null);
    setEditingReview(null);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  async function handleSearch() {
    try {
      setListLoading(true);
      const res = await axios.get(`/api/review/course/${courseId}/filter`, {
        params: { query: search.trim(), rating: filterRating || undefined },
      });
      setSummary(res.data);
      setReviews(res.data.reviews || []);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Không thể tìm kiếm đánh giá', severity: 'error' });
    } finally {
      setListLoading(false);
    }
  }

  async function handleFilterChange(value: string) {
    setFilterRating(value);
    try {
      setListLoading(true);
      const res = await axios.get(`/api/review/course/${courseId}/filter`, {
        params: { query: search.trim() || undefined, rating: value || undefined },
      });
      setSummary(res.data);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Không thể lọc đánh giá', severity: 'error' });
    } finally {
      setListLoading(false);
    }
  }

  async function handleClear() {
    setSearch('');
    setSearched(false);
    setListLoading(true);

    try {
      const res = await axios.get(`/api/review/course/${courseId}/filter`, {
        params: { rating: filterRating || undefined },
      });
      setSummary(res.data);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Không thể tải đánh giá', severity: 'error' });
    } finally {
      setListLoading(false);
    }
  }

  const canRate = authData && hasCourseAccess;
  const ratingSectionTitle = canRate ? (userReview ? 'Chỉnh sửa đánh giá của bạn' : 'Đánh giá khóa học này') : 'Học khóa học để đánh giá';

  const renderStars = (rating: number, size: number = 20) => {
    return Array.from({ length: 5 }).map((_, i) => {
      if (i < Math.floor(rating)) {
        return <StarIcon key={i} sx={{ fontSize: size, color: '#fbbf24' }} />;
      } else if (i < rating && rating % 1 >= 0.25 && rating % 1 <= 0.75) {
        return <StarHalfIcon key={i} sx={{ fontSize: size, color: '#fbbf24' }} />;
      } else {
        return <StarBorderIcon key={i} sx={{ fontSize: size, color: '#d1d5db' }} />;
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      {/* Phần hiển thị rating summary */}
      <div className="bg-gray-50 dark:bg-gray-800/40 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className={`w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] flex flex-col items-center justify-center text-center rounded-lg transition-all ${canRate ? 'bg-gray-200/50 dark:bg-gray-700 cursor-pointer hover:bg-gray-300/50 dark:hover:bg-gray-600 shadow-sm' : 'bg-gray-100 dark:bg-gray-700 cursor-default shadow-sm'}`} onClick={canRate ? handleRatingClick : undefined} title={ratingSectionTitle}>
          <p className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-fuchsia-500 text-transparent bg-clip-text mb-1">{average}</p>

          <div className="flex justify-center">{renderStars(Number(average), window.innerWidth < 640 ? 18 : 22)}</div>

          {authData && !hasCourseAccess && <p className="text-[10px] sm:text-xs text-yellow-600 dark:text-yellow-400 mt-1 sm:mt-2 font-medium text-center px-1">⚠️ Học khóa học để đánh giá</p>}
          {canRate && !userReview && <p className="text-[10px] sm:text-xs text-purple-500 dark:text-purple-400 mt-1 sm:mt-2 font-medium text-center px-1">{totalReviews === 0 ? 'Nhấn để đánh giá đầu tiên!' : 'Nhấn để đánh giá!'}</p>}
          {userReview && <p className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 mt-1 sm:mt-2 font-medium text-center px-1">✓ Bạn đã đánh giá khóa học này</p>}
          {!authData && <p className="text-[10px] sm:text-xs text-yellow-600 dark:text-yellow-400 mt-1 sm:mt-2 font-medium text-center px-1">⚠️ Học khóa học để đánh giá</p>}
        </div>

        <div className="hidden sm:block w-[1px] h-24 bg-gray-300 dark:bg-gray-600" />

        {/* 📊 Thống kê sao */}
        <div className="w-full sm:flex-1 sm:max-w-[400px]">
          {[5, 4, 3, 2, 1].map((star) => {
            const isActive = !filterRating || Number(filterRating) === star;

            return (
              <div
                key={star}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterChange(String(star));
                }}
                className={`flex items-center gap-2 mb-1.5 transition-all cursor-pointer ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              >
                <span className="w-5 text-right font-medium text-gray-700 dark:text-gray-300 text-sm">{star}</span>
                <StarIcon sx={{ fontSize: 16, color: '#fbbf24' }} />
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <div className={`h-full transition-all ${star === 5 ? 'bg-green-500' : star === 4 ? 'bg-lime-400' : star === 3 ? 'bg-yellow-400' : star === 2 ? 'bg-orange-400' : 'bg-red-500'}`} style={{ width: `${ratingPercents[5 - star]}%` }}></div>
                  <span className="absolute inset-0 flex justify-center items-center text-[10px] sm:text-[11px] font-semibold dark:text-gray-100">{Math.round(ratingPercents[5 - star])}%</span>
                </div>

                {filterRating && Number(filterRating) === star ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFilterChange('');
                    }}
                    className="ml-1 text-gray-500 hover:text-red-500 transition-colors w-5 flex justify-center"
                    title="Xóa lọc"
                  >
                    <IconX size={20} className="sm:w-5 sm:h-5" />
                  </button>
                ) : (
                  <div className="w-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🆕 Dialog đánh giá */}
      <Dialog
        open={reviewDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            padding: { xs: '16px 20px 12px', sm: '20px 24px 16px' },
            borderBottom: '1px solid',
            borderColor: 'divider',
            '.dark &': {
              color: '#f9fafb',
              borderColor: '#374151',
            },
          }}
        >
          {editingReviewId ? 'Chỉnh sửa đánh giá' : 'Đánh giá khóa học'}
        </DialogTitle>

        <DialogContent sx={{ padding: { xs: '16px', sm: '24px' } }}>
          <div className="flex items-center mb-4 mt-2">
            <span className="mr-3 text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Chọn số sao:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setNewRating(i + 1)} className="focus:outline-none">
                {i < newRating ? <StarIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: '#fbbf24', '&:hover': { transform: 'scale(1.1)' }, transition: 'transform 0.2s' }} /> : <StarBorderIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: '#d1d5db', '&:hover': { color: '#fbbf24', transform: 'scale(1.1)' }, transition: 'all 0.2s' }} />}
              </button>
            ))}
          </div>

          <textarea placeholder="Chia sẻ cảm nghĩ của bạn về khóa học..." rows={4} className="focus:outline-none resize-none w-full p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors text-sm sm:text-base" value={comment} onChange={(e) => setComment(e.target.value)} />
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            pb: { xs: 1, sm: 2 },
            padding: { xs: '12px 20px 16px', sm: '16px 24px 20px' },
            borderTop: '1px solid',
            borderColor: 'divider',
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              bgcolor: '#c7d0e0ff',
              borderRadius: '6px',
              padding: { xs: '6px 12px', sm: '8px 16px' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                bgcolor: '#8e99aaff',
              },
              '.dark &': {
                color: '#9ca3af',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                },
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleSubmitReview(true)}
            disabled={submitting || newRating === 0}
            variant="contained"
            sx={{
              bgcolor: '#8b5cf6',
              color: 'white',
              fontWeight: 500,
              borderRadius: '6px',
              padding: { xs: '6px 16px', sm: '8px 20px' },
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                bgcolor: '#7c3aed',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              },
              '&:disabled': {
                bgcolor: '#d1d5db',
                color: '#9ca3af',
                '.dark &': {
                  bgcolor: '#374151',
                  color: '#6b7280',
                },
              },
              '.dark &': {
                bgcolor: '#8b5cf6',
                '&:hover': {
                  bgcolor: '#7c3aed',
                },
              },
            }}
          >
            {submitting ? (editingReviewId ? 'Đang cập nhật...' : 'Đang gửi...') : editingReviewId ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔍 Tìm kiếm & lọc */}
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center">
          <IconFilterCheck className="pb-2" size={24} />
          <label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 ml-2 block">Tìm kiếm & lọc đánh giá</label>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <TextField
              size="small"
              placeholder="Tìm kiếm đánh giá..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              sx={{
                flex: 1,
                borderRadius: 1,
                minWidth: { xs: 'calc(100% - 40px)', sm: 220 },
                transition: 'width 0.2s ease',
                '& .MuiInputBase-root': {
                  backgroundColor: '#fff',
                  color: '#111827',
                  borderRadius: 1,
                  height: '36px',
                  fontSize: '0.875rem',
                  '.dark &': {
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d1d5db',
                  '.dark &': {
                    borderColor: '#374151',
                  },
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8b5cf6',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {search && (
                      <IconButton size="small" onClick={handleClear}>
                        <IconX className="dark:text-gray-200" size={16} />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />

            {search.trim() && (
              <IconButton
                color="primary"
                size="small"
                onClick={handleSearch}
                sx={{
                  color: '#6b7280',
                  '&:hover': { color: '#ef4444' },
                  '.dark &': {
                    color: '#9ca3af',
                    '&:hover': { color: '#f87171' },
                  },
                }}
              >
                <IconSearch size={16} />
              </IconButton>
            )}
          </div>

          <Select
            size="small"
            value={filterRating}
            onChange={(e) => handleFilterChange(e.target.value)}
            displayEmpty
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#fff',
                  color: '#111827',
                  '.dark &': {
                    bgcolor: '#1f2937',
                    color: '#f3f4f6',
                  },
                },
              },
            }}
            sx={{
              minWidth: { xs: '100%', sm: 160 },
              borderRadius: 1,
              height: '36px',
              fontSize: '0.875rem',
              '& .MuiSelect-select': {
                backgroundColor: '#fff',
                color: '#111827',
                borderRadius: 1,
                py: '6px',
                px: '12px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                '.dark &': {
                  backgroundColor: '#1f2937',
                  color: '#f3f4f6',
                },
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db',
                borderWidth: 1,
                '.dark &': {
                  borderColor: '#b3bcccff',
                },
              },
            }}
          >
            <MenuItem
              value=""
              sx={{
                fontSize: '0.875rem',
                '&:hover': {
                  backgroundColor: '#ede9fe',
                  color: '#030008ff',
                },
                '&.Mui-selected': {
                  backgroundColor: '#ddd6fe',
                  color: '#000000ff',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#ddd6fe',
                  color: '#000000ff',
                },
              }}
            >
              Tất cả xếp hạng
            </MenuItem>
            {[5, 4, 3, 2, 1].map((r) => (
              <MenuItem
                key={r}
                value={r}
                sx={{
                  fontSize: '0.875rem',
                  '&:hover': {
                    backgroundColor: '#ede9fe',
                    color: '#030008ff',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#ddd6fe',
                    color: '#000000ff',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#ddd6fe',
                    color: '#000000ff',
                  },
                }}
              >
                {r} sao
              </MenuItem>
            ))}
          </Select>
        </div>

        {searched && search.trim() && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            {reviews.length} đánh giá đề cập đến "{search}"
          </p>
        )}
      </div>

      {/* 💬 Danh sách đánh giá */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-3 sm:mt-4 min-h-[150px]">
        {listLoading ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-6 sm:py-8 animate-pulse text-sm sm:text-base">Đang tải đánh giá...</div>
        ) : currentReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4 text-sm sm:text-base">Không có đánh giá nào</p>
        ) : (
          currentReviews.map((r: any) => (
            <div key={r.id} className="py-3 sm:py-4 flex gap-2 sm:gap-3 items-start hover:bg-gray-50 dark:hover:bg-gray-800/60 rounded-lg transition-colors px-2 sm:px-3">
              <Avatar src={getImageUrl(r.user?.avatar)} alt={r.user?.name || 'Avatar'} sx={{ width: 33, height: 33, sm: { width: 33, height: 33 }, bgcolor: 'purple', fontWeight: 500 }}>
                {!r.user?.avatar && getInitials(r.user?.name || '')}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 mt-0.5 sm:mt-1">
                  <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 ">
                    {r.user?.name}
                    {authData?.id === r.user_id ? ' (Bạn)' : ''}
                  </p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap mb-2 ">{timeAgo(r.updated_at || r.created_at)}</p>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">{renderStars(r.rating, window.innerWidth < 640 ? 16 : 18)}</div>
                </div>
                <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-[15px] leading-snug pr-1" style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {expandedReviews.has(r.id) ? r.comment : isLongReview(r.comment) ? `${r.comment.slice(0, 150)}...` : r.comment}
                  {isLongReview(r.comment) && (
                    <button onClick={() => toggleComment(r.id)} className="text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium text-xs sm:text-sm ml-1 transition-colors">
                      {expandedReviews.has(r.id) ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Stack alignItems="center" mt={6}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              setPage(value);
              if (event.currentTarget instanceof HTMLElement) {
                event.currentTarget.blur();
              }
            }}
            color="secondary"
            size="small"
            className="rounded-xl px-3 py-1 sm:px-4 sm:py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'inherit',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                minWidth: { xs: '32px', sm: '40px' },
                height: { xs: '32px', sm: '40px' },
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#8b5cf6',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#7c3aed',
                },
              },
            }}
          />
        </Stack>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
