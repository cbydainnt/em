import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Stack, Button, IconButton, Badge, Avatar, CircularProgress, Tabs, Tab, Paper, Divider, Menu, MenuItem, Checkbox, ListItemText, Fade, Alert, Snackbar } from '@mui/material';
import { IconBell, IconCheck, IconTrash, IconFilter, IconChevronLeft, IconChevronDown, IconExternalLink, IconEye, IconEyeOff, IconRefresh } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '@/layouts/default-layout';
import { useAuthStore, useNotificationStore } from '@/hooks/useAuthStore';
import DynamicBreadcrumb from '@/components/EM_BreadCrumb';
import { UserType } from '@/utils/enums';

interface Notification {
  notification_id: string;
  user_id: string | null;
  title: string;
  message: string;
  type: number;
  context?: string;
  action_url?: string;
  status: number;
  created_at: string;
  updated_at?: string;
  user_notification?: {
    status: number;
    read_at: string;
  };
}

interface ApiResponse {
  success: boolean;
  data: Notification[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const typeMap: Record<number, { text: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; icon: string; bgColor: string }> = {
  1: { text: 'Hệ thống', color: 'default', icon: '⚙️', bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  2: { text: 'Nhắc nhở', color: 'warning', icon: '⏰', bgColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  3: { text: 'Phản hồi', color: 'info', icon: '💬', bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  4: { text: 'Hành động', color: 'primary', icon: '👤', bgColor: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' },
  5: { text: 'Quản trị', color: 'secondary', icon: '🛡️', bgColor: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
  6: { text: 'Khuyến mãi', color: 'success', icon: '🎁', bgColor: 'linear-gradient(135deg, #81ffef 0%, #f067b4 100%)' },
  7: { text: 'Nội dung', color: 'info', icon: '📚', bgColor: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
  8: { text: 'Hoàn thành', color: 'success', icon: '🎓', bgColor: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' },
  9: { text: 'Xã hội', color: 'primary', icon: '👥', bgColor: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  11: { text: 'Báo cáo', color: 'error', icon: '🚨', bgColor: 'linear-gradient(135deg, #e2bfbfff 0%, #f50c18ff 100%)' },
};

const AllNotificationsPage = () => {
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const { triggerUpdate, notify } = useNotificationStore(); // Thêm notify từ store
  const [unreadCount, setUnreadCount] = useState(0);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchUnreadCount = useCallback(async () => {
    if (!authData?.id) return;

    try {
      let res = '/api/notifications/unread-count';

      if (authData?.id) {
        res = `/api/notifications/unread-count-with-status?userId=${authData.id}`;
      } else {
        res = '/api/notifications/unread-count';
      }
      res += `&user_type=${UserType.USER}`;
      const response = await fetch(res);

      const data = await response.json();

      if (data.success) {
        setUnreadCount(data.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch unread count', err);
    }
  }, [authData?.id]);

  const fetchNotifications = useCallback(
    async (reset = false) => {
      if (!authData?.id) {
        setLoading(false);
        return;
      }

      try {
        if (reset) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const currentPage = reset ? 1 : page;

        // Xây dựng query parameters đúng cách
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '20',
          userId: authData.id,
        });

        // Thêm filter status theo tab
        if (activeTab === 1) {
          params.append('status', '1'); // Chưa đọc
        } else if (activeTab === 2) {
          params.append('status', '2'); // Đã đọc
        }

        if (selectedTypes.length > 0) {
          // Nếu chỉ có 1 type, gửi như single value
          if (selectedTypes.length === 1) {
            params.append('type', selectedTypes[0].toString());
          } else {
            // Nếu có nhiều type, gửi như comma-separated
            params.append('type', selectedTypes.join(','));
          }
        }

        let url = `/api/notifications?${params.toString()}`;
        console.log('Fetching notifications from:', url); // Debug lo

        url += `&user_type=${UserType.USER}`;
        const response = await fetch(url);
        const data: ApiResponse = await response.json();

        if (data.success) {
          // Debug: Kiểm tra data nhận được
          console.log('Received notifications:', data.data.length);
          console.log('Active tab:', activeTab);
          console.log('Selected types:', selectedTypes);

          if (reset) {
            setNotifications(data.data);
          } else {
            setNotifications((prev) => {
              const existingIds = new Set(prev.map((n) => n.notification_id));
              const newNotifications = data.data.filter((n) => !existingIds.has(n.notification_id));
              return [...prev, ...newNotifications];
            });
          }

          if (data.pagination && currentPage >= data.pagination.pages) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        showSnackbar('Có lỗi xảy ra khi tải thông báo', 'error');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [authData?.id, page, activeTab, selectedTypes, triggerUpdate],
  );

  useEffect(() => {
    fetchUnreadCount();
    fetchNotifications(true);
  }, [authData?.id, activeTab, selectedTypes, triggerUpdate]);

  useEffect(() => {
    if (page > 1 && !loading) {
      fetchNotifications(false);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleMarkAsRead = async (notificationId: string, isSystemNotification: boolean) => {
    try {
      let url = `/api/notifications/${notificationId}/read`;
      if (isSystemNotification && authData?.id) {
        url += `?userId=${authData.id}`;
      }

      const response = await fetch(url, { method: 'PUT' });
      const result = await response.json();

      if (result.success) {
        setNotifications(
          notifications.map((noti) =>
            noti.notification_id === notificationId
              ? {
                  ...noti,
                  status: 2,
                  ...(isSystemNotification && { user_notification: { status: 2, read_at: new Date().toISOString() } }),
                }
              : noti,
          ),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));

        notify(); // QUAN TRỌNG: Trigger update để đồng bộ với NotificationMenu
        showSnackbar('Đã đánh dấu đã đọc', 'success');
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
      showSnackbar('Có lỗi xảy ra', 'error');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      if (!authData?.id) return;

      const response = await fetch(`/api/notifications/read-all?userId=${authData.id}`, {
        method: 'PUT',
      });

      const result = await response.json();

      if (result.success) {
        setNotifications(
          notifications.map((noti) => ({
            ...noti,
            status: 2,
            ...(noti.user_id === null && { user_notification: { status: 2, read_at: new Date().toISOString() } }),
          })),
        );
        notify(); // QUAN TRỌNG: Trigger update để đồng bộ với NotificationMenu
        setUnreadCount(0);
        showSnackbar('Đã đánh dấu tất cả đã đọc', 'success');
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      showSnackbar('Có lỗi xảy ra', 'error');
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      const notificationToDelete = notifications.find((noti) => noti.notification_id === notificationId);

      if (notificationToDelete?.user_id === null) {
        showSnackbar('Không thể xóa thông báo hệ thống', 'error');
        return;
      }

      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setNotifications(notifications.filter((noti) => noti.notification_id !== notificationId));
        notify(); // QUAN TRỌNG: Trigger update để đồng bộ với NotificationMenu
        showSnackbar('Đã xóa thông báo', 'success');
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
      showSnackbar('Có lỗi xảy ra', 'error');
    }
  };

  const handleDeleteAllRead = async () => {
    if (!authData?.id) return;

    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tất cả thông báo đã đọc?');
    if (!confirmed) return;

    try {
      const readNotifications = notifications.filter((noti) => noti.user_id !== null && (noti.status === 2 || (noti.user_notification && noti.user_notification.status === 2)));

      if (readNotifications.length === 0) {
        showSnackbar('Không có thông báo đã đọc để xóa', 'success');
        return;
      }

      // Gọi batch delete endpoint nếu có, hoặc dùng Promise.all
      const promises = readNotifications.map((noti) => fetch(`/api/notifications/${noti.notification_id}`, { method: 'DELETE' }));

      await Promise.all(promises);

      // Giữ lại thông báo hệ thống và chưa đọc
      setNotifications(notifications.filter((noti) => noti.user_id === null || (noti.user_id !== null && noti.status === 1 && (!noti.user_notification || noti.user_notification.status === 1))));

      notify(); // QUAN TRỌNG: Trigger update để đồng bộ với NotificationMenu
      showSnackbar(`Đã xóa ${readNotifications.length} thông báo đã đọc`, 'success');
    } catch (error) {
      console.error('Failed to delete read notifications:', error);
      showSnackbar('Có lỗi xảy ra', 'error');
    }
  };

  const handleDeleteAll = async () => {
    if (!authData?.id) return;

    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa TẤT CẢ thông báo cá nhân? Thao tác này không thể hoàn tác.\n\nThông báo hệ thống sẽ không bị xóa.');
    if (!confirmed) return;

    try {
      const personalNotifications = notifications.filter((noti) => noti.user_id !== null);

      if (personalNotifications.length === 0) {
        showSnackbar('Không có thông báo cá nhân để xóa', 'success');
        return;
      }

      const deletePromises = personalNotifications.map((noti) => fetch(`/api/notifications/${noti.notification_id}`, { method: 'DELETE' }));

      await Promise.all(deletePromises);

      // Chỉ giữ lại thông báo hệ thống
      setNotifications((prev) => prev.filter((noti) => noti.user_id === null));

      notify(); // QUAN TRỌNG: Trigger update để đồng bộ với NotificationMenu
      showSnackbar(`Đã xóa ${personalNotifications.length} thông báo`, 'success');
    } catch (error) {
      console.error('Failed to delete all notifications:', error);
      showSnackbar('Có lỗi xảy ra khi xóa thông báo', 'error');
    }
  };

  const getTimeAgo = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    return created.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getDisplayStatus = (notification: Notification): number => {
    if (notification.user_id === null && notification.user_notification) {
      return notification.user_notification.status;
    }
    return notification.status;
  };

  const toggleTypeFilter = (type: number) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setActiveTab(0);
  };

  const refreshNotifications = () => {
    fetchNotifications(true);
  };

  const hasActiveFilters = selectedTypes.length > 0 || activeTab !== 0;

  if (!authData) {
    return (
      <DefaultLayout>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              color: 'text.secondary',
              '.dark &': {
                color: 'grey.400',
              },
            }}
          >
            Vui lòng đăng nhập để xem thông báo
          </Typography>
        </Container>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Box className="bg-violet-50/40 dark:bg-gray-900 min-h-screen transition-colors">
        <Container maxWidth="lg">
          <DynamicBreadcrumb isNotifications={true} />
        </Container>
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          {/* Header với gradient background */}
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    mr: 2,
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                  }}
                >
                  <IconChevronLeft />
                </IconButton>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    flexGrow: 1,
                    textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}
                >
                  Thông Báo
                </Typography>
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.75rem',
                      height: 20,
                      minWidth: 20,
                    },
                  }}
                >
                  <IconBell size={28} />
                </Badge>
              </Box>

              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Quản lý và xem tất cả thông báo của bạn tại một nơi
              </Typography>
            </Box>
          </Paper>

          {/* Filter và Actions Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              '.dark &': {
                bgcolor: '#1f2937', // gray-800
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} spacing={2}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: 'text.primary',
                      '.dark &': { color: 'grey.100' },
                    }}
                  >
                    Bộ Lọc & Hành Động
                  </Typography>

                  {hasActiveFilters && (
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          '.dark &': { color: 'grey.400' },
                        }}
                      >
                        Đang áp dụng:
                      </Typography>
                      {activeTab === 1 && <Chip label="Chưa đọc" size="small" color="warning" onDelete={() => setActiveTab(0)} deleteIcon={<IconEyeOff size={14} />} />}
                      {activeTab === 2 && <Chip label="Đã đọc" size="small" color="success" onDelete={() => setActiveTab(0)} deleteIcon={<IconEyeOff size={14} />} />}
                      {selectedTypes.map((type) => (
                        <Chip key={type} label={typeMap[type]?.text || `Loại ${type}`} size="small" color={typeMap[type]?.color || 'default'} onDelete={() => toggleTypeFilter(type)} />
                      ))}
                      <Button size="small" onClick={clearAllFilters} sx={{ ml: 1 }}>
                        Xóa tất cả
                      </Button>
                    </Box>
                  )}
                </Box>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button variant="outlined" startIcon={<IconRefresh size={16} />} onClick={refreshNotifications} disabled={loading}>
                    Làm mới
                  </Button>
                  <Button variant="contained" startIcon={<IconCheck size={16} />} onClick={handleMarkAllAsRead} disabled={unreadCount === 0} color="success">
                    Đọc tất cả
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<IconTrash size={16} />} onClick={handleDeleteAllRead}>
                    Xóa đã đọc
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<IconTrash size={16} />} onClick={handleDeleteAll} disabled={notifications.filter((n) => n.user_id !== null).length === 0}>
                    Xóa tất cả
                  </Button>
                </Stack>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: 'primary.main',
                  },
                  '& .MuiTab-root': {
                    color: 'text.secondary',
                    '.dark &': { color: 'grey.400' },
                  },
                  '& .Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  },
                }}
              >
                <Tab label="Tất cả" icon={<IconBell size={18} />} iconPosition="start" sx={{ fontWeight: activeTab === 0 ? 'bold' : 'normal' }} />
                <Tab label={`Chưa đọc ${unreadCount > 0 ? `(${unreadCount})` : ''}`} icon={<IconEye size={18} />} iconPosition="start" sx={{ fontWeight: activeTab === 1 ? 'bold' : 'normal' }} />
                <Tab label="Đã đọc" icon={<IconEyeOff size={18} />} iconPosition="start" sx={{ fontWeight: activeTab === 2 ? 'bold' : 'normal' }} />
              </Tabs>

              {/* Type Filter với dropdown */}
              <Box sx={{ mt: 3 }}>
                <Button variant="outlined" startIcon={<IconFilter size={16} />} endIcon={<IconChevronDown size={16} />} onClick={handleFilterMenuOpen} fullWidth sx={{ justifyContent: 'space-between' }}>
                  {selectedTypes.length > 0 ? `${selectedTypes.length} loại được chọn` : 'Lọc theo loại thông báo'}
                </Button>

                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterMenuClose}
                  PaperProps={{
                    sx: {
                      maxHeight: 300,
                      width: 250,
                      bgcolor: 'background.paper',
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: 'white',
                      },
                    },
                  }}
                >
                  <MenuItem dense>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'text.secondary',
                        '.dark &': {
                          color: 'grey.400',
                        },
                      }}
                    >
                      Chọn loại thông báo
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {Object.entries(typeMap).map(([type, info]) => (
                    <MenuItem key={type} onClick={() => toggleTypeFilter(Number(type))} dense>
                      <Checkbox
                        sx={{
                          '.dark &': {
                            color: '#fff',
                          },
                          '&.Mui-checked': {
                            color: '#2e78e7ff',
                          },
                        }}
                        checked={selectedTypes.includes(Number(type))}
                      />
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: 'transparent',
                                fontSize: '14px',
                                background: info.bgColor,
                              }}
                            >
                              {info.icon}
                            </Avatar>
                            {info.text}
                          </Box>
                        }
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </CardContent>
          </Card>

          {/* Notifications List */}
          {loading && page === 1 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : notifications.length === 0 ? (
            <Fade in={true}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  '.dark &': { bgcolor: '#1f2937' },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      '.dark &': {
                        background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                      },
                    }}
                  >
                    <IconBell size={40} color="#6c757d" />
                  </Box>
                  <Typography variant="h5" color="text.secondary" gutterBottom>
                    Không có thông báo
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
                    {hasActiveFilters ? 'Không tìm thấy thông báo nào phù hợp với bộ lọc của bạn' : 'Bạn không có thông báo nào. Thông báo mới sẽ xuất hiện ở đây.'}
                  </Typography>
                  {hasActiveFilters && (
                    <Button variant="text" onClick={clearAllFilters} sx={{ mt: 2 }}>
                      Xóa bộ lọc
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Fade>
          ) : (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, pl: 1 }}>
                Hiển thị {notifications.length} thông báo
                {hasActiveFilters && ' (đã lọc)'}
              </Typography>

              {notifications.map((notification) => {
                const typeInfo = typeMap[notification.type] || typeMap[4];
                const displayStatus = getDisplayStatus(notification);
                const isSystemNotification = notification.user_id === null;
                const isUnread = displayStatus === 1;

                return (
                  <Fade in={true} key={notification.notification_id}>
                    <Card
                      sx={{
                        mb: 2,
                        borderRadius: 3,
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                        '.dark &': { bgcolor: '#1f2937' },

                        borderLeft: isUnread ? '4px solid' : 'none',
                        borderLeftColor: isUnread ? 'primary.main' : 'transparent',

                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              fontSize: '20px',
                              background: typeInfo.bgColor,
                              flexShrink: 0,
                            }}
                          >
                            {typeInfo.icon}
                          </Avatar>

                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={isUnread ? 'bold' : 'medium'}
                                  sx={{
                                    color: 'text.primary',
                                    '.dark &': { color: 'grey.100' },
                                  }}
                                >
                                  {notification.title}
                                  {isSystemNotification && (
                                    <Chip
                                      label="Hệ thống"
                                      size="small"
                                      sx={{
                                        fontSize: '0.65rem',
                                        height: 20,
                                        bgcolor: 'info.light',
                                        color: 'info.contrastText',
                                      }}
                                    />
                                  )}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'text.secondary',
                                    '.dark &': { color: 'grey.400' },
                                  }}
                                >
                                  {notification.message}
                                </Typography>
                              </Box>

                              <Stack direction="row" spacing={0.5}>
                                {isUnread && (
                                  <IconButton
                                    size="small"
                                    onClick={() => handleMarkAsRead(notification.notification_id, isSystemNotification)}
                                    sx={{
                                      color: 'success.main',
                                      bgcolor: 'success.50',
                                      '.dark &': {
                                        bgcolor: 'rgba(34,197,94,0.15)',
                                      },
                                    }}
                                  >
                                    <IconCheck size={18} />
                                  </IconButton>
                                )}
                                {!isSystemNotification && (
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDelete(notification.notification_id)}
                                    sx={{
                                      color: 'error.main',
                                      bgcolor: 'error.50',
                                      '.dark &': {
                                        bgcolor: 'rgba(34,197,94,0.15)',
                                      },
                                    }}
                                  >
                                    <IconTrash size={18} />
                                  </IconButton>
                                )}
                              </Stack>
                            </Box>

                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mt: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label={typeInfo.text} size="small" color={typeInfo.color} variant="outlined" sx={{ fontSize: '0.75rem' }} />
                                {isUnread && <Chip label="Chưa đọc" size="small" color="warning" variant="filled" sx={{ fontSize: '0.75rem' }} />}
                              </Box>
                              <Typography variant="caption" color="text.secondary" sx={{ mt: { xs: 1, sm: 0 }, '.dark &': { color: 'grey.400' } }}>
                                {getTimeAgo(notification.created_at)}
                              </Typography>
                            </Stack>

                            {notification.action_url && (
                              <Button size="small" variant="text" endIcon={<IconExternalLink size={16} />} onClick={() => window.open(notification.action_url, '_blank')} sx={{ mt: 2 }}>
                                Xem chi tiết
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                );
              })}

              {/* Load More */}
              {hasMore && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    startIcon={loadingMore ? <CircularProgress size={16} /> : null}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 8,
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 },
                      borderColor: 'divider',
                      '.dark &': {
                        color: 'white',
                        borderColor: 'grey.600',
                      },
                    }}
                  >
                    {loadingMore ? 'Đang tải...' : 'Tải thêm thông báo'}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Container>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: '100%',
              '.dark &': {
                color: 'white',
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </DefaultLayout>
  );
};

export default AllNotificationsPage;
