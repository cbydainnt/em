import { Box, Chip, IconButton, Tooltip, Badge, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { IconHistory, IconClock, IconUsers, IconCheck, IconArrowBack } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface QuizVersion {
  quiz_id: string;
  title: string;
  version: number;
  is_latest_version: boolean;
  version_notes?: string;
  status: number;
  created_at: string;
  updated_at: string;
  question_count: number;
  total_points: number;
  _count: {
    user_progress: number;
  };
}

interface QuizVersionsDialogProps {
  quiz_id: string;
  onClose: () => void;
  onVersionSelect?: (version: QuizVersion) => void;
  onRestoreVersion?: (version_id: string) => void;
}

// Component hiển thị danh sách versions
export function QuizVersionsDialog({ quiz_id, onClose, onVersionSelect, onRestoreVersion }: QuizVersionsDialogProps) {
  const [versions, setVersions] = useState<QuizVersion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/quizzes/${quiz_id}/versions`);
      setVersions(response.data);
    } catch (error) {
      console.error('Error loading versions:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVersions();
  }, [quiz_id]);

  const handleRestore = async (version_id: string) => {
    if (!confirm('Bạn có chắc chắn muốn khôi phục version này?')) return;

    try {
      await axios.post(`/api/admin/quizzes/${version_id}/versions/restore`, {
        version_notes: `Khôi phục từ version trước`,
      });
      alert('Khôi phục version thành công!');
      if (onRestoreVersion) onRestoreVersion(version_id);
      await loadVersions();
    } catch (error: any) {
      alert('Lỗi: ' + (error.response?.data?.message || 'Không thể khôi phục version'));
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth PaperProps={{ className: 'dark:bg-gray-800' }}>
      <DialogTitle className="dark:text-gray-200">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconHistory size={24} className="dark:text-blue-400" />
          <Typography variant="h6">Lịch sử versions</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers className="dark:bg-gray-800">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : versions.length === 0 ? (
          <Typography className="dark:text-gray-400">Chưa có version nào</Typography>
        ) : (
          <List>
            {versions.map((version, index) => (
              <Box key={version.quiz_id}>
                <ListItem
                  sx={{
                    bgcolor: version.is_latest_version ? 'primary.light' : 'transparent',
                    borderRadius: 1,
                    mb: 1,
                    '.dark &': {
                      bgcolor: version.is_latest_version ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Chip
                          label={`v${version.version}`}
                          size="small"
                          color={version.is_latest_version ? 'primary' : 'default'}
                          icon={version.is_latest_version ? <IconCheck size={14} /> : undefined}
                          sx={{
                            '.dark &': {
                              backgroundColor: version.is_latest_version ? '#3b82f6' : '#374151',
                              color: 'white',
                            },
                          }}
                        />
                        <Typography variant="subtitle2" className="dark:text-gray-200">
                          {version.title}
                        </Typography>
                        <Chip label={`${version.question_count} câu`} size="small" variant="outlined" className="dark:text-gray-300 dark:border-gray-600" />
                        <Chip label={`${version.total_points} điểm`} size="small" variant="outlined" className="dark:text-gray-300 dark:border-gray-600" />
                      </Box>
                    }
                    secondary={
                      <Box>
                        {version.version_notes && (
                          <Typography variant="caption" display="block" sx={{ mb: 0.5 }} className="dark:text-gray-400">
                            {version.version_notes}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconClock size={14} className="dark:text-gray-500" />
                            <Typography variant="caption" className="dark:text-gray-400">
                              {new Date(version.created_at).toLocaleDateString('vi-VN')}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconUsers size={14} className="dark:text-gray-500" />
                            <Typography variant="caption" className="dark:text-gray-400">
                              {version._count.user_progress} người làm
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!version.is_latest_version && (
                      <Tooltip title="Khôi phục version này">
                        <IconButton size="small" color="primary" onClick={() => handleRestore(version.quiz_id)} className="dark:text-blue-400">
                          <IconArrowBack size={18} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Xem chi tiết">
                      <Button size="small" variant="outlined" onClick={() => onVersionSelect && onVersionSelect(version)} className="dark:border-gray-600 dark:text-gray-300">
                        Xem
                      </Button>
                    </Tooltip>
                  </Box>
                </ListItem>
                {index < versions.length - 1 && <Divider className="dark:border-gray-700" />}
              </Box>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Component hiển thị version badge trong quiz table
export function QuizVersionBadge({ quiz, onClick }: { quiz: any; onClick: () => void }) {
  const [hasProgress, setHasProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProgress = async () => {
      try {
        const response = await axios.get(`/api/admin/quizzes/${quiz.quiz_id}/has-progress`);
        setHasProgress(response.data.has_progress);
      } catch (error) {
        console.error('Error checking progress:', error);
      } finally {
        setLoading(false);
      }
    };
    checkProgress();
  }, [quiz.quiz_id]);

  if (loading) {
    return <CircularProgress size={16} />;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title="Xem lịch sử versions">
        <IconButton size="small" onClick={onClick}>
          <Badge
            badgeContent={quiz._count?.quiz_versions || 0}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.6rem',
                height: 16,
                minWidth: 16,
              },
            }}
          >
            <IconHistory size={18} className="dark:text-gray-400" />
          </Badge>
        </IconButton>
      </Tooltip>

      {hasProgress && (
        <Tooltip title="Quiz đã có người làm - cập nhật sẽ tạo version mới">
          <Chip
            icon={<IconUsers size={12} />}
            label="Có progress"
            size="small"
            color="warning"
            variant="outlined"
            sx={{
              height: 20,
              '.dark &': {
                borderColor: '#fbbf24',
                color: '#fbbf24',
              },
            }}
          />
        </Tooltip>
      )}
    </Box>
  );
}
