// components/ReportCommentDialog.tsx
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { IconFlag } from '@tabler/icons-react';
import axios from 'axios';
import { logClientMessage } from '@/utils';
import { useAuthStore } from '@/hooks/useAuthStore';
import { NotificationType, UserType } from '@/utils/enums';

interface ReportCommentDialogProps {
  open: boolean;
  onClose: () => void;
  comment: {
    id: string;
    content: string;
    user: {
      id: string;
      name?: string;
    };
    course_id?: string;
    lesson_id?: string;
  };
  onSuccess?: () => void;
}

const REPORT_REASONS = [
  { id: 16, label: 'Nội dung không phù hợp' },
  { id: 17, label: 'Ngôn từ thô tục, xúc phạm' },
  { id: 18, label: 'Spam hoặc quảng cáo' },
  { id: 19, label: 'Thông tin sai sự thật' },
  { id: 20, label: 'Vi phạm bản quyền' },
  { id: 21, label: 'Khác' },
];

export function ReportCommentDialog({ open, onClose, comment, onSuccess }: ReportCommentDialogProps) {
  const [selectedReason, setSelectedReason] = useState<number>(6);
  const [customReason, setCustomReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authData } = useAuthStore();

  const getReportTitle = () => {
    const reason = REPORT_REASONS.find((r) => r.id === selectedReason);
    return `Báo cáo comment: ${reason?.label || 'Khác'}`;
  };

  const getReportDescription = () => {
    if (selectedReason === 6 && customReason.trim()) {
      return customReason;
    }
    const reason = REPORT_REASONS.find((r) => r.id === selectedReason);
    return `Lý do: ${reason?.label}\n\nBình luận bị báo cáo: "${comment.content.substring(0, 100)}..."`;
  };

  const handleSubmit = async () => {
    if (selectedReason === 6 && !customReason.trim()) {
      setError('Vui lòng nhập lý do báo cáo');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        '/api/report/create',
        {
          report_type: 5, // Loại "Khác" hoặc có thể thêm type mới
          category: selectedReason,
          title: getReportTitle(),
          description: getReportDescription(),
          course_id: comment.course_id,
          lesson_id: comment.lesson_id,
          context: {
            comment_id: comment.id,
            comment_content: comment.content,
            reported_user_id: comment.user.id,
            reported_user_name: comment.user.name,
            report_reason_id: selectedReason,
          },
          allow_contact: true,
          is_anonymous: false,
          priority: 2, // Medium priority
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      // Reset form
      setSelectedReason(6);
      setCustomReason('');

      // Close dialog
      onClose();

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }

      // Show success message (có thể dùng snackbar/toast)
      console.log('Báo cáo comment thành công:', response.data);
      logClientMessage(
        'Báo cáo comment thành công',
        `Báo cáo "${getReportDescription()}" đã được gửi đến quản trị viên`,
        authData?.id, // Gửi cho người tạo báo cáo
        UserType.USER,
        NotificationType.REPORT,
        comment.course_id || null,
        NotificationType.REPORT,
      );
      logClientMessage(
        'Báo cáo comment mới',
        `Báo cáo comment mới từ ${authData?.name || 'người dùng'}: ${getReportDescription()}n`,
        null, 
        UserType.ADMIN,
        NotificationType.REPORT,
        comment.course_id || null,
        NotificationType.REPORT,
      );
    } catch (err: any) {
      console.error('Error reporting comment:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi gửi báo cáo');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedReason(6);
      setCustomReason('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <IconFlag size={24} className="text-red-500" />
          <Typography variant="h6">Báo cáo bình luận</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          {/* Comment preview */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Bình luận của <strong>{comment.user?.name || 'người dùng'}</strong>:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
          </Box>

          {/* Select reason */}
          <Typography variant="subtitle2" gutterBottom>
            Chọn lý do báo cáo *
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
            {REPORT_REASONS.map((reason) => (
              <Button
                key={reason.id}
                variant={selectedReason === reason.id ? 'contained' : 'outlined'}
                onClick={() => setSelectedReason(reason.id)}
                size="small"
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  color: selectedReason === reason.id ? 'white' : 'inherit',
                }}
              >
                {reason.label}
              </Button>
            ))}
          </Box>

          {/* Custom reason (if "Khác" is selected) */}
          {selectedReason === 6 && (
            <Box sx={{ mb: 3 }}>
              <TextField fullWidth multiline rows={3} label="Mô tả chi tiết lý do" value={customReason} onChange={(e) => setCustomReason(e.target.value)} placeholder="Vui lòng mô tả chi tiết lý do báo cáo..." required />
            </Box>
          )}

          {/* Warning */}
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Lưu ý:</strong> Chỉ báo cáo những bình luận vi phạm quy định. Hệ thống sẽ xem xét và có biện pháp xử lý phù hợp.
            </Typography>
          </Alert>

          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="error" disabled={loading || (selectedReason === 6 && !customReason.trim())} startIcon={loading ? <CircularProgress size={16} /> : <IconFlag size={16} />}>
          {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
