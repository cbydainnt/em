import { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Alert, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Tooltip, Divider, Paper } from '@mui/material';
import { IconBug, IconPlus, IconEye, IconClock, IconCheck, IconX, IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useAuthStore } from '@/hooks/useAuthStore';
import ReportDialog from './EM_ReportDialog';

interface ReportTabProps {
  courseId: string;
  lessonId: string;
  lessonTitle?: string;
  sectionName?: string;
}

interface Report {
  report_id: string;
  title: string;
  description: string;
  report_type: number;
  category: number;
  status: number;
  priority: number;
  created_at: string;
  screenshot_urls: string[];
  resolution_notes?: string;
  resolved_at?: string;
  course?: {
    course_id: string;
    course_name: string;
  };
  lesson?: {
    lesson_id: string;
    lesson_title: string;
  };
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
}

const STATUS_CONFIG = {
  1: { label: 'Chờ xử lý', color: 'warning', icon: <IconClock size={16} /> },
  2: { label: 'Đang xem xét', color: 'info', icon: <IconAlertCircle size={16} /> },
  3: { label: 'Đã giải quyết', color: 'success', icon: <IconCheck size={16} /> },
  4: { label: 'Đã từ chối', color: 'error', icon: <IconX size={16} /> },
};

const TYPE_CONFIG = {
  1: { label: 'Video', icon: '🎥' },
  2: { label: 'Bài học', icon: '📚' },
  3: { label: 'Kỹ thuật', icon: '🔧' },
  4: { label: 'Nội dung', icon: '📝' },
  5: { label: 'Khác', icon: '❓' },
};

export default function ReportTab({ courseId, lessonId, lessonTitle, sectionName }: ReportTabProps) {
  const { authData } = useAuthStore();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [filter, setFilter] = useState({
    status: '',
    type: '',
  });

  useEffect(() => {
    if (authData) {
      fetchReports();
    }
  }, [authData, filter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        courseId,
        ...(filter.status && { status: filter.status }),
        ...(filter.type && { type: filter.type }),
      });

      const res = await axios.get(`/api/report/my-reports?${params}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setReports(res.data);
    } catch (err: any) {
      console.error('Error fetching reports:', err);
      setError('Không thể tải danh sách báo cáo');
    } finally {
      setLoading(false);
    }
  };

  const handleReportSuccess = () => {
    fetchReports();
    setOpenReportDialog(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  const getReportTypeLabel = (type: number) => {
    return TYPE_CONFIG[type as keyof typeof TYPE_CONFIG]?.label || 'Khác';
  };

  const getStatusChip = (status: number) => {
    const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
    if (!config) return null;

    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color as any}
        size="small"
        variant="outlined"
        sx={{
          '.dark &': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      />
    );
  };

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    return `/api/file/view/${imageUrl}`;
  };

  if (!authData) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Vui lòng đăng nhập để xem và tạo báo cáo
      </Alert>
    );
  }

  return (
    <Box className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom className="dark:text-gray-100">
            Báo cáo sự cố
          </Typography>
          <Typography variant="body2" className="dark:text-gray-400">
            Theo dõi và báo cáo các vấn đề gặp phải
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<IconPlus size={18} />}
          onClick={() => setOpenReportDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
            },
          }}
        >
          Tạo báo cáo
        </Button>
      </Box>

      {/* Filters */}
      <Card
        className="dark:bg-gray-800 dark:border-gray-700"
        sx={{
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          '.dark &': {
            borderColor: '#374151',
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel className="dark:text-gray-300">Trạng thái</InputLabel>
                <Select
                  value={filter.status}
                  label="Trạng thái"
                  onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
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
                    '& .MuiSelect-select': {
                      backgroundColor: '#fff',
                      color: '#111827',
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
                  }}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="1">Chờ xử lý</MenuItem>
                  <MenuItem value="2">Đang xem xét</MenuItem>
                  <MenuItem value="3">Đã giải quyết</MenuItem>
                  <MenuItem value="4">Đã từ chối</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel className="dark:text-gray-300">Loại báo cáo</InputLabel>
                <Select
                  value={filter.type}
                  label="Loại báo cáo"
                  onChange={(e) => setFilter((prev) => ({ ...prev, type: e.target.value }))}
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
                    '& .MuiSelect-select': {
                      backgroundColor: '#fff',
                      color: '#111827',
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
                  }}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="1">Video</MenuItem>
                  <MenuItem value="2">Bài học</MenuItem>
                  <MenuItem value="3">Kỹ thuật</MenuItem>
                  <MenuItem value="5">Khác</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={fetchReports}
                  disabled={loading}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    '.dark &': {
                      borderColor: '#4b5563',
                      color: '#d1d5db',
                    },
                  }}
                >
                  Làm mới
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Reports List */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : reports.length === 0 ? (
        <Paper
          className="dark:bg-gray-800 dark:border-gray-700"
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          <IconBug size={48} className="dark:text-gray-400" style={{ marginBottom: 16 }} />
          <Typography variant="h6" className="dark:text-gray-300" gutterBottom>
            Chưa có báo cáo nào
          </Typography>
          <Typography variant="body2" className="dark:text-gray-400" sx={{ mb: 3 }}>
            Bắt đầu bằng cách tạo báo cáo đầu tiên
          </Typography>
          <Button
            variant="contained"
            startIcon={<IconPlus size={18} />}
            onClick={() => setOpenReportDialog(true)}
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
              },
            }}
          >
            Tạo báo cáo
          </Button>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          className="dark:bg-gray-800 dark:border-gray-700"
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          <Table>
            <TableHead className="dark:bg-gray-900">
              <TableRow>
                <TableCell className="dark:text-gray-300 dark:border-gray-700">Tiêu đề</TableCell>
                <TableCell className="dark:text-gray-300 dark:border-gray-700">Loại</TableCell>
                <TableCell className="dark:text-gray-300 dark:border-gray-700">Trạng thái</TableCell>
                <TableCell className="dark:text-gray-300 dark:border-gray-700">Ngày tạo</TableCell>
                <TableCell align="right" className="dark:text-gray-300 dark:border-gray-700">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow
                  key={report.report_id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      '.dark &': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    },
                  }}
                >
                  <TableCell className="dark:border-gray-700">
                    <Typography variant="subtitle2" noWrap sx={{ maxWidth: 200 }} className="dark:text-gray-100">
                      {report.title}
                    </Typography>
                    {report.lesson && (
                      <Typography variant="caption" className="dark:text-gray-400">
                        Bài: {report.lesson.lesson_title}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell className="dark:border-gray-700">
                    <Chip
                      label={getReportTypeLabel(report.report_type)}
                      size="small"
                      variant="outlined"
                      sx={{
                        '.dark &': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          color: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell className="dark:border-gray-700">{getStatusChip(report.status)}</TableCell>
                  <TableCell className="dark:border-gray-700">
                    <Typography variant="body2" className="dark:text-gray-300">
                      {formatDate(report.created_at)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" className="dark:border-gray-700">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setSelectedReport(report);
                            setDetailDialog(true);
                          }}
                          sx={{
                            color: '#6b7280',
                            '&:hover': {
                              color: '#374151',
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                            '.dark &': {
                              color: '#9ca3af',
                              '&:hover': {
                                color: '#e5e7eb',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              },
                            },
                          }}
                        >
                          <IconEye size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Report Dialog */}
      <ReportDialog open={openReportDialog} onClose={() => setOpenReportDialog(false)} onSuccess={handleReportSuccess} courseId={courseId} lessonId={lessonId} lessonTitle={lessonTitle} sectionName={sectionName} />

      {/* Report Detail Dialog */}
      <Dialog
        open={detailDialog}
        onClose={() => setDetailDialog(false)}
        maxWidth="md"
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
        {selectedReport && (
          <>
            <DialogTitle
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                padding: '20px 24px 16px',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '.dark &': {
                  color: '#f9fafb',
                  borderColor: '#374151',
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <IconBug size={24} color="#f59e0b" />
                <Typography variant="h6">Chi tiết báo cáo</Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" className="dark:text-gray-400">
                    Tiêu đề
                  </Typography>
                  <Typography variant="body1" className="dark:text-gray-100">
                    {selectedReport.title}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" className="dark:text-gray-400">
                    Mô tả
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }} className="dark:text-gray-300">
                    {selectedReport.description}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" className="dark:text-gray-400">
                    Loại báo cáo
                  </Typography>
                  <Typography variant="body1" className="dark:text-gray-100">
                    {getReportTypeLabel(selectedReport.report_type)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" className="dark:text-gray-400">
                    Trạng thái
                  </Typography>
                  <Box mt={1}>{getStatusChip(selectedReport.status)}</Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" className="dark:text-gray-400">
                    Ngày tạo
                  </Typography>
                  <Typography variant="body1" className="dark:text-gray-100">
                    {formatDate(selectedReport.created_at)}
                  </Typography>
                </Grid>

                {selectedReport.resolved_at && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" className="dark:text-gray-400">
                      Ngày giải quyết
                    </Typography>
                    <Typography variant="body1" className="dark:text-gray-100">
                      {formatDate(selectedReport.resolved_at)}
                    </Typography>
                  </Grid>
                )}

                {selectedReport.resolution_notes && (
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        my: 2,
                        '.dark &': {
                          borderColor: '#374151',
                        },
                      }}
                    />
                    <Typography variant="subtitle2" className="dark:text-gray-400">
                      Ghi chú giải quyết
                    </Typography>
                    <Alert
                      severity="info"
                      sx={{
                        mt: 1,
                        '.dark &': {
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#93c5fd',
                        },
                      }}
                    >
                      {selectedReport.resolution_notes}
                    </Alert>
                  </Grid>
                )}

                {selectedReport.screenshot_urls?.length > 0 && (
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        my: 2,
                        '.dark &': {
                          borderColor: '#374151',
                        },
                      }}
                    />
                    <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                      Ảnh chụp màn hình
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {selectedReport.screenshot_urls.map((url, index) => (
                        <img
                          key={index}
                          src={getImageUrl(url)}
                          alt={`Screenshot ${index + 1}`}
                          style={{
                            width: 120,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 8,
                            cursor: 'pointer',
                            border: '1px solid #e5e7eb',
                          }}
                          onClick={() => window.open(getImageUrl(url), '_blank')}
                        />
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{
                padding: '16px 24px 20px',
                borderTop: '1px solid',
                borderColor: 'divider',
                '.dark &': {
                  borderColor: '#374151',
                },
              }}
            >
              <Button
                onClick={() => setDetailDialog(false)}
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  bgcolor: '#c7d0e0ff',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  '&:hover': {
                    bgcolor: '#8e99aaff',
                  },
                  '.dark &': {
                    color: '#9ca3af',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                  },
                }}
              >
                Đóng
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
