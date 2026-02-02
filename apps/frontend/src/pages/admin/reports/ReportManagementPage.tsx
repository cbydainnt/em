// pages/admin/reports/ReportManagementPage.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Avatar, Tooltip, Alert, CircularProgress, Pagination, Tabs, Tab, Divider, Stack, useMediaQuery, useTheme, Paper } from '@mui/material';
import {
  IconEye,
  IconCheck,
  IconX,
  IconRefresh,
  IconMessage,
  IconSearch,
  IconBug,
  IconClock,
  IconAlertCircle,
  IconExternalLink,
  IconFlag,
  IconGolf, // Thêm icon mới
} from '@tabler/icons-react';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';

// Config constants
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
  4: { label: 'Khác', icon: '❓' },
  5: { label: 'Bình luận', icon: '💬' },
};

const PRIORITY_CONFIG = {
  1: { label: 'Thấp', color: 'default' },
  2: { label: 'Trung bình', color: 'primary' },
  3: { label: 'Cao', color: 'warning' },
  4: { label: 'Khẩn cấp', color: 'error' },
};

export default function ReportManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalStats, setGlobalStats] = useState({
    pending: 0,
    inReview: 0,
    resolved: 0,
    rejected: 0,
    total: 0,
  });
  const [, setStats] = useState({
    pending: 0,
    inReview: 0,
    resolved: 0,
    rejected: 0,
    total: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    priority: '',
    search: '',
  });

  // State cho dialogs
  const [priorityDialog, setPriorityDialog] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<number>(2);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [resolutionDialog, setResolutionDialog] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [selectedAction, setSelectedAction] = useState<'resolve' | 'reject'>('resolve');
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showDirectActionWarning, setShowDirectActionWarning] = useState(false);
  const [directActionType, setDirectActionType] = useState<'resolve' | 'reject' | null>(null);

  // Fetch reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.status && { status: filters.status }),
        ...(filters.type && { type: filters.type }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.search && { search: filters.search }),
      });

      const res = await axios.get(`/api/admin/reports?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setReports(res.data.reports);
      setPagination(res.data.pagination);

      // Calculate stats
      const stats = {
        pending: res.data.reports.filter((r: any) => r.status === 1).length,
        inReview: res.data.reports.filter((r: any) => r.status === 2).length,
        resolved: res.data.reports.filter((r: any) => r.status === 3).length,
        rejected: res.data.reports.filter((r: any) => r.status === 4).length,
        total: res.data.reports.length,
      };
      setStats(stats);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalStats = async () => {
    try {
      const res = await axios.get('/api/admin/reports/dashboard-stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setGlobalStats(res.data);
    } catch (error) {
      console.error('Error fetching global stats:', error);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const res = await axios.get('/api/admin/reports/statistics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStats(res.data);
      // Process statistics if needed
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  // Fetch report comments
  const fetchComments = async (reportId: string) => {
    try {
      const res = await axios.get(`/api/admin/reports/${reportId}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setComments(res.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle status update
  const handleUpdateStatus = async (reportId: string, status: number) => {
    try {
      await axios.put(
        `/api/admin/reports/${reportId}/status`,
        {
          status,
          resolution_notes: resolutionNotes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      await fetchReports();
      setResolutionDialog(false);
      setDetailDialog(false);
      setResolutionNotes('');
      // Gửi notification dựa trên trạng thái
      if (selectedReport) {
        if (status === 3) {
          // RESOLVED
          logClientMessage(
            'Báo cáo đã được giải quyết',
            `Báo cáo "${selectedReport.title}" đã được  giải quyết. Ghi chú: ${resolutionNotes}`,
            selectedReport.user_id, // Gửi cho người tạo báo cáo
            UserType.USER,
            NotificationType.REPORT,
            selectedReport.course_id || null,
            NotificationType.REPORT,
          );
        } else if (status === 4) {
          // REJECTED
          logClientMessage(
            'Báo cáo đã bị từ chối',
            `Báo cáo "${selectedReport.title}" đã bị  từ chối. Lý do: ${resolutionNotes}`,
            selectedReport.user_id, // Gửi cho người tạo báo cáo
            UserType.USER,
            NotificationType.REPORT,
            selectedReport.course_id || null,
            NotificationType.REPORT,
          );
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle add comment
  const handleAddComment = async (reportId: string) => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `/api/admin/reports/${reportId}/comments`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      await fetchComments(reportId);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Handle view report details
  const handleViewDetails = async (report: any) => {
    setSelectedReport(report);
    await fetchComments(report.report_id);
    setDetailDialog(true);
  };

  // Handle start review
  const handleStartReview = async (reportId: string) => {
    try {
      await axios.post(`/api/admin/reports/${reportId}/start-review`, {});
      await fetchReports();
      if (selectedReport?.report_id === reportId) {
        setSelectedReport((prev: any) => ({ ...prev, status: 2 }));
      }
      logClientMessage(
        'Báo cáo đang được xem xét',
        `Báo cáo "${selectedReport?.title}" đang được xem xét. Chúng tôi sẽ phản hồi sớm nhất có thể.`,
        selectedReport?.user_id, // Gửi cho người đã tạo báo cáo
        UserType.USER,
        NotificationType.REPORT,
        selectedReport?.course_id || null,
        NotificationType.REPORT,
      );
    } catch (error) {
      console.error('Error starting review:', error);
    }
  };

  // Handle update priority
  const handleUpdatePriority = async (reportId: string, priority: number) => {
    try {
      await axios.put(
        `/api/admin/reports/${reportId}/priority`,
        { priority },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      await fetchReports();
      if (selectedReport?.report_id === reportId) {
        setSelectedReport((prev: any) => ({ ...prev, priority }));
      }
      setPriorityDialog(false);
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  // Format time ago
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 30) return `${diffDays} ngày trước`;
    return format(date, 'dd/MM/yyyy');
  };

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    return `/api/file/view/${imageUrl}`;
  };

  // Initialize
  useEffect(() => {
    fetchReports();
    fetchStatistics();
    fetchGlobalStats();
  }, [pagination.page, filters]);

  // Handle tab change
  useEffect(() => {
    if (activeTab === 0) {
      setFilters((prev) => ({ ...prev, status: '' }));
    } else if (activeTab === 1) {
      setFilters((prev) => ({ ...prev, status: '1' }));
    } else if (activeTab === 2) {
      setFilters((prev) => ({ ...prev, status: '2' }));
    }
  }, [activeTab]);

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom className="dark:text-gray-100">
            Quản lý báo cáo
          </Typography>
          <Typography variant="body1" className="dark:text-gray-400">
            Quản lý và xử lý các báo cáo sự cố từ người dùng
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'warning.light',
                '.dark &': {
                  bgcolor: 'rgba(251, 191, 36, 0.2)',
                },
              }}
            >
              <Typography variant="h4" className="dark:text-yellow-400">
                {globalStats.pending}
              </Typography>
              <Typography variant="body2" className="dark:text-yellow-300">
                Chờ xử lý
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'info.light',
                '.dark &': {
                  bgcolor: 'rgba(59, 130, 246, 0.2)',
                },
              }}
            >
              <Typography variant="h4" className="dark:text-blue-400">
                {globalStats.inReview}
              </Typography>
              <Typography variant="body2" className="dark:text-blue-300">
                Đang xem xét
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'success.light',
                '.dark &': {
                  bgcolor: 'rgba(34, 197, 94, 0.2)',
                },
              }}
            >
              <Typography variant="h4" className="dark:text-green-400">
                {globalStats.resolved}
              </Typography>
              <Typography variant="body2" className="dark:text-green-300">
                Đã giải quyết
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                bgcolor: 'error.light',
                '.dark &': {
                  bgcolor: 'rgba(239, 68, 68, 0.2)',
                },
              }}
            >
              <Typography variant="h4" className="dark:text-red-400">
                {globalStats.rejected}
              </Typography>
              <Typography variant="body2" className="dark:text-red-300">
                Đã từ chối
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card
          sx={{
            p: 2,
            mb: 3,
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ minWidth: 0 }} className="dark:text-gray-300">
              <Tab className="dark:text-white" label="Tất cả" />
              <Tab className="dark:text-white" label="Chờ xử lý" />
              <Tab className="dark:text-white" label="Đang xem xét" />
            </Tabs>

            <Box sx={{ flex: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel className="dark:text-gray-300">Loại báo cáo</InputLabel>
                <Select
                  value={filters.type}
                  label="Loại báo cáo"
                  onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
                  sx={{
                    bgcolor: '#fff',
                    color: '#111827',
                    borderRadius: 1,

                    // border
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },

                    // icon mũi tên
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
                    },

                    '.dark &': {
                      bgcolor: '#1f2937',
                      color: '#f3f4f6',

                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#374151',
                      },

                      '& .MuiSelect-icon': {
                        color: '#9ca3af',
                      },
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // MenuItem hover
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // MenuItem selected
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="1">Video</MenuItem>
                  <MenuItem value="2">Bài học</MenuItem>
                  <MenuItem value="3">Kỹ thuật</MenuItem>
                  <MenuItem value="4">Nội dung</MenuItem>
                  <MenuItem value="5">Khác</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel className="dark:text-gray-300">Độ ưu tiên</InputLabel>
                <Select
                  value={filters.priority}
                  label="Độ ưu tiên"
                  onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
                  sx={{
                    bgcolor: '#fff',
                    color: '#111827',
                    borderRadius: 1,

                    // border
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },

                    // icon mũi tên
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
                    },

                    '.dark &': {
                      bgcolor: '#1f2937',
                      color: '#f3f4f6',

                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#374151',
                      },

                      '& .MuiSelect-icon': {
                        color: '#9ca3af',
                      },
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // MenuItem hover
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // MenuItem selected
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="1">Thấp</MenuItem>
                  <MenuItem value="2">Trung bình</MenuItem>
                  <MenuItem value="3">Cao</MenuItem>
                  <MenuItem value="4">Khẩn cấp</MenuItem>
                </Select>
              </FormControl>

              <TextField
                size="small"
                placeholder="Tìm kiếm..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                InputProps={{
                  startAdornment: <IconSearch size={18} className="dark:text-gray-400" />,
                  sx: {
                    backgroundColor: '#fff',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#1f2937',
                      color: '#f3f4f6',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  },
                }}
                sx={{
                  minWidth: 200,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db',
                    '.dark &': {
                      borderColor: '#374151',
                    },
                  },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<IconRefresh size={18} className="dark:text-gray-400" />}
                onClick={fetchReports}
                disabled={loading}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#9ca3af',
                  },
                  '.dark &': {
                    borderColor: '#4b5563',
                    color: '#d1d5db',
                    '&:hover': {
                      borderColor: '#6b7280',
                    },
                  },
                }}
              >
                Làm mới
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mb: 2 }}>
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={(_, page) => setPagination((prev) => ({ ...prev, page }))}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#374151',
                  '.dark &': {
                    color: '#d1d5db',
                  },
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  '.dark &': {
                    backgroundColor: '#60a5fa',
                    color: '#1f2937',
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Reports Table */}
        <TableContainer sx={{ maxHeight: isMobile ? 400 : 600 }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead
              component={Paper}
              style={{
                backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                position: 'sticky',
                top: 0,
                zIndex: 2,
              }}
              className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
            >
              <TableRow className="dark:border-gray-700">
                <TableCell className="dark:text-gray-900">ID</TableCell>
                <TableCell className="dark:text-gray-900">Thông tin</TableCell>
                <TableCell className="dark:text-gray-900">Loại</TableCell>
                <TableCell className="dark:text-gray-900">Trạng thái</TableCell>
                <TableCell className="dark:text-gray-900">Độ ưu tiên</TableCell>
                <TableCell className="dark:text-gray-900">Ngày tạo</TableCell>
                <TableCell align="right" className="dark:text-gray-300">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography className="dark:text-gray-400">Không có báo cáo nào</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report) => (
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
                    <TableCell>
                      <Typography variant="caption" className="dark:text-gray-400">
                        #{report.report_id.slice(-6)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" noWrap sx={{ maxWidth: 250 }} className="dark:text-gray-200">
                          {report.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          {!report.is_anonymous && report.user && (
                            <>
                              <Avatar src={getImageUrl(report.user.avatar)} sx={{ width: 20, height: 20 }} />
                              <Typography variant="caption" className="dark:text-gray-400">
                                {report.user.name}
                              </Typography>
                            </>
                          )}
                          {report.course && (
                            <Chip
                              size="small"
                              label={report.course.course_name}
                              variant="outlined"
                              onClick={() => navigate(`/khoa-hoc/${report.course.course_id}`)}
                              sx={{
                                '.dark &': {
                                  borderColor: '#4b5563',
                                  color: '#d1d5db',
                                  '&:hover': {
                                    borderColor: '#6b7280',
                                  },
                                },
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={TYPE_CONFIG[report.report_type as keyof typeof TYPE_CONFIG]?.label || 'Khác'}
                        size="small"
                        variant="outlined"
                        sx={{
                          '.dark &': {
                            borderColor: '#4b5563',
                            color: '#d1d5db',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG]?.label}
                        color={STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG]?.color as any}
                        size="small"
                        icon={STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG]?.icon}
                        sx={{
                          '.dark &': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#d1d5db',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={PRIORITY_CONFIG[report.priority as keyof typeof PRIORITY_CONFIG]?.label}
                        color={PRIORITY_CONFIG[report.priority as keyof typeof PRIORITY_CONFIG]?.color as any}
                        size="small"
                        sx={{
                          '.dark &': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#d1d5db',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" className="dark:text-gray-300">
                        {formatDate(report.created_at)}
                      </Typography>
                      <Typography variant="caption" className="dark:text-gray-500">
                        {timeAgo(report.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        {/* Priority button */}
                        {(report.status === 1 || report.status === 2) && (
                          <Tooltip title="Cập nhật độ ưu tiên">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedReport(report);
                                setSelectedPriority(report.priority);
                                setPriorityDialog(true);
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
                              <IconFlag size={18} />
                            </IconButton>
                          </Tooltip>
                        )}

                        {/* Start review button */}
                        {report.status === 1 && (
                          <Tooltip title="Bắt đầu xem xét">
                            <IconButton
                              size="small"
                              onClick={() => handleStartReview(report.report_id)}
                              color="info"
                              sx={{
                                '.dark &': {
                                  color: '#60a5fa',
                                },
                              }}
                            >
                              <IconGolf size={18} />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(report)}
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

                        <Tooltip title="Bình luận">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(report)}
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
                            <IconMessage size={18} />
                          </IconButton>
                        </Tooltip>

                        {report.course && (
                          <Tooltip title="Xem khóa học">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`/khoa-hoc/${report.course.course_id}`)}
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
                              <IconExternalLink size={18} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={(_, page) => setPagination((prev) => ({ ...prev, page }))}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#374151',
                  '.dark &': {
                    color: '#d1d5db',
                  },
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  '.dark &': {
                    backgroundColor: '#60a5fa',
                    color: '#1f2937',
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Report Detail Dialog */}
        <Dialog
          open={detailDialog}
          onClose={() => setDetailDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              maxHeight: '90vh',
              bgcolor: 'background.paper',
              '.dark &': {
                bgcolor: '#1f2937',
                border: '1px solid #374151',
              },
            },
          }}
        >
          {selectedReport && (
            <>
              <DialogTitle className="dark:text-gray-200">
                <Box display="flex" alignItems="center" gap={1}>
                  <IconBug size={24} color="#f59e0b" />
                  <Typography variant="h6">Chi tiết báo cáo</Typography>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                {/* Report Details */}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom className="dark:text-gray-200">
                      {selectedReport.title}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }} className="dark:text-gray-300">
                      {selectedReport.description}
                    </Typography>
                  </Grid>

                  {/* Metadata */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                      Thông tin chung
                    </Typography>
                    <Stack spacing={1}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" className="dark:text-gray-300">
                          Loại:
                        </Typography>
                        <Chip
                          label={TYPE_CONFIG[selectedReport.report_type as keyof typeof TYPE_CONFIG]?.label}
                          size="small"
                          variant="outlined"
                          sx={{
                            '.dark &': {
                              borderColor: '#4b5563',
                              color: '#d1d5db',
                            },
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" className="dark:text-gray-300">
                          Trạng thái:
                        </Typography>
                        <Chip
                          label={STATUS_CONFIG[selectedReport.status as keyof typeof STATUS_CONFIG]?.label}
                          color={STATUS_CONFIG[selectedReport.status as keyof typeof STATUS_CONFIG]?.color as any}
                          size="small"
                          sx={{
                            '.dark &': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: '#d1d5db',
                            },
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" className="dark:text-gray-300">
                          Độ ưu tiên:
                        </Typography>
                        <Chip
                          label={PRIORITY_CONFIG[selectedReport.priority as keyof typeof PRIORITY_CONFIG]?.label}
                          color={PRIORITY_CONFIG[selectedReport.priority as keyof typeof PRIORITY_CONFIG]?.color as any}
                          size="small"
                          sx={{
                            '.dark &': {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: '#d1d5db',
                            },
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body2" className="dark:text-gray-300">
                          Ngày tạo:
                        </Typography>
                        <Typography variant="body2" className="dark:text-gray-300">
                          {formatDate(selectedReport.created_at)}
                        </Typography>
                      </Box>

                      {/* Hiển thị thời gian giải quyết nếu có */}
                      {selectedReport.resolved_at && (
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2" className="dark:text-gray-300">
                            Ngày giải quyết:
                          </Typography>
                          <Typography variant="body2" className="dark:text-gray-300">
                            {formatDate(selectedReport.resolved_at)}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Grid>

                  {/* User Info */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                      Thông tin người báo cáo
                    </Typography>
                    {selectedReport.is_anonymous ? (
                      <Alert severity="info" className="dark:bg-blue-900/20 dark:text-blue-300">
                        Báo cáo ẩn danh
                      </Alert>
                    ) : selectedReport.user ? (
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={selectedReport.user.avatar} />
                        <Box>
                          <Typography variant="subtitle2" className="dark:text-gray-200">
                            {selectedReport.user.name}
                          </Typography>
                          <Typography variant="caption" className="dark:text-gray-400">
                            {selectedReport.user.email}
                          </Typography>
                          {selectedReport.allow_contact && (
                            <Typography variant="caption" className="dark:text-blue-400">
                              Cho phép liên hệ
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ) : (
                      <Typography variant="body2" className="dark:text-gray-400">
                        Không có thông tin
                      </Typography>
                    )}
                  </Grid>

                  {/* Course/Lesson Information */}
                  {(selectedReport.course || selectedReport.lesson) && (
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2, '.dark &': { borderColor: '#374151' } }} />
                      <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                        Thông tin liên quan
                      </Typography>
                      <Stack spacing={2}>
                        {selectedReport.course && (
                          <Box>
                            <Typography variant="body2" fontWeight={500} gutterBottom className="dark:text-gray-300">
                              Khóa học:
                            </Typography>
                            <Box
                              sx={{
                                p: 1.5,
                                bgcolor: 'background.default',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'action.hover' },
                                '.dark &': {
                                  bgcolor: '#111827',
                                  '&:hover': { bgcolor: '#1f2937' },
                                },
                              }}
                              onClick={() => navigate(`/khoa-hoc/${selectedReport.course.course_id}`)}
                            >
                              <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                <IconExternalLink size={20} />
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" className="dark:text-gray-200">
                                  {selectedReport.course.course_name}
                                </Typography>
                                <Typography variant="caption" className="dark:text-gray-400">
                                  ID: {selectedReport.course.course_id}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        )}

                        {selectedReport.lesson && (
                          <Box>
                            <Typography variant="body2" fontWeight={500} gutterBottom className="dark:text-gray-300">
                              {selectedReport.report_type === 1 ? 'Video bài học:' : 'Bài học:'}
                            </Typography>
                            <Box
                              sx={{
                                p: 1.5,
                                bgcolor: 'background.default',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                cursor: selectedReport.course ? 'pointer' : 'default',
                                '.dark &': {
                                  bgcolor: '#111827',
                                },
                              }}
                              onClick={selectedReport.course ? () => navigate(`/course/${selectedReport.course.course_id}/lesson/${selectedReport.lesson.lesson_id}`) : undefined}
                            >
                              <Avatar
                                variant="rounded"
                                sx={{
                                  bgcolor: selectedReport.report_type === 1 ? 'info.main' : 'warning.main',
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                {selectedReport.report_type === 1 ? '🎥' : '📚'}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" className="dark:text-gray-200">
                                  {selectedReport.lesson.lesson_title}
                                </Typography>
                                <Typography variant="caption" className="dark:text-gray-400">
                                  ID: {selectedReport.lesson.lesson_id}
                                </Typography>
                                {selectedReport.report_type === 1 && (
                                  <Typography variant="caption" className="dark:text-blue-400">
                                    Báo cáo về video
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Stack>
                    </Grid>
                  )}

                  {/* Resolution Notes */}
                  {selectedReport.resolution_notes && (
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2, '.dark &': { borderColor: '#374151' } }} />
                      <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                        Ghi chú giải quyết
                      </Typography>
                      <Alert severity={selectedReport.status === 3 ? 'success' : 'error'} sx={{ whiteSpace: 'pre-wrap' }} className="dark:bg-green-900/20 dark:text-green-300">
                        <Typography variant="body2">{selectedReport.resolution_notes}</Typography>
                        {selectedReport.resolver && (
                          <Typography variant="caption" display="block" sx={{ mt: 1 }} className="dark:text-gray-400">
                            — {selectedReport.resolver.name}
                            {selectedReport.resolved_at && `, ${timeAgo(selectedReport.resolved_at)}`}
                          </Typography>
                        )}
                      </Alert>
                    </Grid>
                  )}

                  {/* Screenshots */}
                  {selectedReport.screenshot_urls?.length > 0 && (
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2, '.dark &': { borderColor: '#374151' } }} />
                      <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                        Ảnh chụp màn hình ({selectedReport.screenshot_urls.length})
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {selectedReport.screenshot_urls.map((url: string, index: number) => (
                          <Box
                            key={index}
                            sx={{
                              '& img': {
                                width: 120,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 8,
                                cursor: 'pointer',
                                border: '1px solid #e0e0e0',
                                '.dark &': {
                                  borderColor: '#4b5563',
                                },
                              },
                            }}
                          >
                            <img src={getImageUrl(url)} alt={`Screenshot ${index + 1}`} onClick={() => window.open(getImageUrl(url), '_blank')} />
                          </Box>
                        ))}
                      </Box>
                    </Grid>
                  )}

                  {/* Comments Section */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, '.dark &': { borderColor: '#374151' } }} />
                    <Typography variant="subtitle2" className="dark:text-gray-400" gutterBottom>
                      Trao đổi ({comments.length})
                    </Typography>

                    {/* Comments List */}
                    <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
                      {comments.map((comment) => (
                        <Box
                          key={comment.comment_id}
                          sx={{
                            mb: 2,
                            p: 1.5,
                            bgcolor: 'background.default',
                            borderRadius: 1,
                            borderLeft: '3px solid',
                            borderColor: comment.user ? 'primary.main' : 'info.main',
                            '.dark &': {
                              bgcolor: '#111827',
                              borderColor: comment.user ? '#3b82f6' : '#60a5fa',
                            },
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                            <Box display="flex" alignItems="center" gap={1}>
                              {comment.user ? (
                                <>
                                  <Avatar src={comment.user.avatar} sx={{ width: 24, height: 24 }} />
                                  <Typography variant="body2" fontWeight={500} className="dark:text-gray-200">
                                    {comment.user.name}
                                    <Typography variant="caption" className="dark:text-gray-500" sx={{ ml: 1 }}>
                                      (Người dùng)
                                    </Typography>
                                  </Typography>
                                </>
                              ) : (
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Avatar sx={{ width: 24, height: 24, bgcolor: 'info.main' }}>
                                    <IconGolf size={14} />
                                  </Avatar>
                                  <Typography variant="body2" fontWeight={500} className="dark:text-blue-400">
                                    Quản trị viên
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                            <Typography variant="caption" className="dark:text-gray-500">
                              {timeAgo(comment.created_at)}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ ml: 0.5 }} className="dark:text-gray-300">
                            {comment.content}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Add Comment */}
                    <Box display="flex" gap={1}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Nhập phản hồi..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        multiline
                        maxRows={3}
                        disabled={selectedReport.status === 3 || selectedReport.status === 4}
                        helperText={selectedReport.status === 3 || selectedReport.status === 4 ? 'Báo cáo đã đóng, không thể thêm bình luận' : ''}
                        InputProps={{
                          sx: {
                            backgroundColor: '#fff',
                            color: '#111827',
                            '.dark &': {
                              backgroundColor: '#1f2937',
                              color: '#f3f4f6',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            '.dark &': {
                              color: '#9ca3af',
                            },
                          },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                            '.dark &': {
                              borderColor: '#374151',
                            },
                          },
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => handleAddComment(selectedReport.report_id)}
                        disabled={!newComment.trim() || selectedReport.status === 3 || selectedReport.status === 4}
                        sx={{
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#7c3aed',
                          },
                          '&:disabled': {
                            backgroundColor: '#d1d5db',
                            color: '#9ca3af',
                            '.dark &': {
                              backgroundColor: '#374151',
                              color: '#6b7280',
                            },
                          },
                        }}
                      >
                        Gửi
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  '.dark &': {
                    borderTop: '1px solid #374151',
                  },
                }}
              >
                {/* Priority update button */}
                {(selectedReport.status === 1 || selectedReport.status === 2) && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<IconFlag size={18} />}
                    onClick={() => {
                      setSelectedPriority(selectedReport.priority);
                      setPriorityDialog(true);
                    }}
                    sx={{
                      borderColor: '#d1d5db',
                      color: '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                      '.dark &': {
                        borderColor: '#4b5563',
                        color: '#d1d5db',
                        '&:hover': {
                          borderColor: '#6b7280',
                        },
                      },
                    }}
                  >
                    Độ ưu tiên
                  </Button>
                )}

                {/* Start review button */}
                {selectedReport.status === 1 && (
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<IconGolf size={18} />}
                    onClick={() => handleStartReview(selectedReport.report_id)}
                    sx={{
                      borderColor: '#60a5fa',
                      color: '#3b82f6',
                      '&:hover': {
                        borderColor: '#93c5fd',
                      },
                      '.dark &': {
                        borderColor: '#60a5fa',
                        color: '#60a5fa',
                        '&:hover': {
                          borderColor: '#93c5fd',
                        },
                      },
                    }}
                  >
                    Bắt đầu xem xét
                  </Button>
                )}

                {/* Resolution buttons */}
                {(selectedReport.status === 1 || selectedReport.status === 2) && (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<IconX size={18} />}
                      onClick={() => {
                        if (selectedReport.status === 1) {
                          setDirectActionType('reject');
                          setShowDirectActionWarning(true);
                        } else {
                          setSelectedAction('reject');
                          setResolutionDialog(true);
                        }
                      }}
                      sx={{
                        borderColor: '#f87171',
                        color: '#ef4444',
                        '&:hover': {
                          borderColor: '#fca5a5',
                        },
                        '.dark &': {
                          borderColor: '#f87171',
                          color: '#f87171',
                          '&:hover': {
                            borderColor: '#fca5a5',
                          },
                        },
                      }}
                    >
                      Từ chối
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<IconCheck size={18} />}
                      onClick={() => {
                        if (selectedReport.status === 1) {
                          setDirectActionType('resolve');
                          setShowDirectActionWarning(true);
                        } else {
                          setSelectedAction('resolve');
                          setResolutionDialog(true);
                        }
                      }}
                      sx={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#059669',
                        },
                        '.dark &': {
                          backgroundColor: '#10b981',
                          '&:hover': {
                            backgroundColor: '#059669',
                          },
                        },
                      }}
                    >
                      Đánh dấu đã giải quyết
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => setDetailDialog(false)}
                  sx={{
                    color: '#374151',
                    '.dark &': {
                      color: '#d1d5db',
                    },
                  }}
                >
                  Đóng
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Priority Dialog */}
        <Dialog
          open={priorityDialog}
          onClose={() => setPriorityDialog(false)}
          PaperProps={{
            sx: {
              '.dark &': {
                bgcolor: '#1f2937',
                border: '1px solid #374151',
              },
            },
          }}
        >
          <DialogTitle className="dark:text-gray-200">Cập nhật độ ưu tiên</DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="dark:text-gray-400" gutterBottom>
              Báo cáo: {selectedReport?.title}
            </Typography>
            <Box sx={{ mt: 2, minWidth: 300 }}>
              <FormControl fullWidth>
                <Select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(Number(e.target.value))}
                  size="small"
                  sx={{
                    bgcolor: '#fff',
                    color: '#111827',
                    borderRadius: 1,

                    // border
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },

                    // icon mũi tên
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
                    },

                    '.dark &': {
                      bgcolor: '#1f2937',
                      color: '#f3f4f6',

                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#374151',
                      },

                      '& .MuiSelect-icon': {
                        color: '#9ca3af',
                      },
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // MenuItem hover
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // MenuItem selected
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'grey.400' }} />
                      <Typography className="dark:text-gray-300">Thấp</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                      <Typography className="dark:text-gray-300">Trung bình</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value={3}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
                      <Typography className="dark:text-gray-300">Cao</Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem value={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                      <Typography className="dark:text-gray-300">Khẩn cấp</Typography>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setPriorityDialog(false)}
              sx={{
                color: '#374151',
                '.dark &': {
                  color: '#d1d5db',
                },
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => handleUpdatePriority(selectedReport.report_id, selectedPriority)}
              sx={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7c3aed',
                },
              }}
            >
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>

        {/* Direct Action Warning Dialog */}
        <Dialog
          open={showDirectActionWarning}
          onClose={() => setShowDirectActionWarning(false)}
          PaperProps={{
            sx: {
              '.dark &': {
                bgcolor: '#1f2937',
                border: '1px solid #374151',
              },
            },
          }}
        >
          <DialogTitle className="dark:text-gray-200">{directActionType === 'resolve' ? 'Giải quyết ngay' : 'Từ chối ngay'}</DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }} className="dark:bg-yellow-900/20 dark:text-yellow-300">
              <Typography variant="body2">Bạn đang {directActionType === 'resolve' ? 'giải quyết' : 'từ chối'} báo cáo mà không qua bước "Xem xét".</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Hành động này sẽ chuyển trạng thái trực tiếp từ <strong>Chờ xử lý</strong> sang <strong>{directActionType === 'resolve' ? 'Đã giải quyết' : 'Đã từ chối'}</strong>.
              </Typography>
            </Alert>
            <Typography variant="body2" className="dark:text-gray-300">
              Bạn có chắc chắn muốn tiếp tục?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowDirectActionWarning(false)}
              sx={{
                color: '#374151',
                '.dark &': {
                  color: '#d1d5db',
                },
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (directActionType) {
                  setSelectedAction(directActionType);
                  setResolutionDialog(true);
                  setShowDirectActionWarning(false);
                }
              }}
              sx={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7c3aed',
                },
              }}
            >
              Tiếp tục
            </Button>
          </DialogActions>
        </Dialog>

        {/* Resolution Dialog */}
        <Dialog
          open={resolutionDialog}
          onClose={() => setResolutionDialog(false)}
          PaperProps={{
            sx: {
              '.dark &': {
                bgcolor: '#1f2937',
                border: '1px solid #374151',
              },
            },
          }}
        >
          <DialogTitle className="dark:text-gray-200">{selectedAction === 'resolve' ? 'Đánh dấu đã giải quyết' : 'Từ chối báo cáo'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Ghi chú giải quyết"
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              sx={{ mt: 1, minWidth: 300 }}
              placeholder={selectedAction === 'resolve' ? 'Mô tả cách bạn đã giải quyết vấn đề này...' : 'Lý do từ chối báo cáo...'}
              required
              InputProps={{
                sx: {
                  backgroundColor: '#fff',
                  color: '#111827',
                  '.dark &': {
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  '.dark &': {
                    color: '#9ca3af',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setResolutionDialog(false)}
              sx={{
                color: '#374151',
                '.dark &': {
                  color: '#d1d5db',
                },
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => handleUpdateStatus(selectedReport.report_id, selectedAction === 'resolve' ? 3 : 4)}
              disabled={!resolutionNotes.trim()}
              sx={{
                backgroundColor: selectedAction === 'resolve' ? '#10b981' : '#ef4444',
                color: 'white',
                '&:hover': {
                  backgroundColor: selectedAction === 'resolve' ? '#059669' : '#dc2626',
                },
                '&:disabled': {
                  backgroundColor: '#d1d5db',
                  color: '#9ca3af',
                  '.dark &': {
                    backgroundColor: '#374151',
                    color: '#6b7280',
                  },
                },
              }}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
}
