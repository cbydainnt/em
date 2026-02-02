import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Card, CardContent, Chip, Stack, Button, IconButton, Avatar, CircularProgress, Tabs, Tab, Divider, Menu, MenuItem, Checkbox, ListItemText, Fade, Alert, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, TextField, Badge, Select, FormControl, InputLabel, TablePagination, useMediaQuery, useTheme } from '@mui/material';
import { IconBell, IconCheck, IconTrash, IconFilter, IconChevronDown, IconExternalLink, IconEye, IconEyeOff, IconRefresh, IconUsers, IconSearch } from '@tabler/icons-react';
import { useAuthStore, useNotificationStore } from '@/hooks/useAuthStore';
import { UserType } from '@/utils/enums';
import AdminLayout from '../admin/layout/AdminLayout';
import { timeAgo } from '@/utils/timeAgo';

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
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
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

interface SearchResponse {
  success: boolean;
  data: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string;
    type: string;
  }>;
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

const AdminNotificationsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { authData } = useAuthStore();
  const { triggerUpdate, notify } = useNotificationStore();
  const [unreadCount, setUnreadCount] = useState(0);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const isAdmin = authData?.type === UserType.ADMIN;

  // 🔥 State cho phân trang
  const [page, setPage] = useState(0); // Trang hiện tại (0-indexed)
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [, setTotalPages] = useState(1);

  // State cho search users
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResponse['data']>([]);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchResponse['data'][0] | null>(null);
  const [loadingUserNotifications, setLoadingUserNotifications] = useState(false);

  // 🔥 State để lưu tất cả thông báo của các user trong search results
  const [allUserNotifications, setAllUserNotifications] = useState<Notification[]>([]);
  const [loadingAllUserNotifications, setLoadingAllUserNotifications] = useState(false);

  // 🔥 Thêm state để theo dõi khi nào cần fetch
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // 🔥 State cho search type
  const [searchType, setSearchType] = useState<'name' | 'email'>('name');

  const fetchUnreadCount = useCallback(async () => {
    if (!authData?.id) return;

    try {
      let res = '/api/notifications/unread-count';
      if (authData?.id) {
        res = `/api/notifications/unread-count-with-status?userId=${authData.id}`;
      }
      res += `&user_type=${UserType.ADMIN}`;
      const response = await fetch(res);
      const data = await response.json();
      if (data.success) {
        setUnreadCount(data.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch unread count', err);
    }
  }, [authData?.id]);

  // Fetch notifications thông thường (cho admin)
  const fetchNotifications = useCallback(async () => {
    if (!authData?.id || activeTab === 3) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: (page + 1).toString(), // API dùng 1-indexed, MUI dùng 0-indexed
        limit: rowsPerPage.toString(),
        userId: authData.id,
        sortBy: 'created_at',
        sortOrder: 'desc',
      });

      if (activeTab === 1) {
        params.append('status', '1');
      } else if (activeTab === 2) {
        params.append('status', '2');
      }

      if (selectedTypes.length > 0) {
        if (selectedTypes.length === 1) {
          params.append('type', selectedTypes[0].toString());
        } else {
          params.append('type', selectedTypes.join(','));
        }
      }

      params.append('user_type', UserType.ADMIN);

      const url = `/api/notifications?${params.toString()}`;
      console.log('Fetching admin notifications from:', url);
      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      console.log('Admin notifications response:', data);

      if (data.success) {
        setNotifications(data.data);

        // 🔥 Cập nhật thông tin phân trang
        if (data.pagination) {
          setTotalNotifications(data.pagination.total);
          setTotalPages(data.pagination.pages);
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      showSnackbar('Có lỗi xảy ra khi tải thông báo', 'error');
    } finally {
      setLoading(false);
    }
  }, [authData?.id, page, rowsPerPage, activeTab, selectedTypes, triggerUpdate]);

  // 🔥 Fetch tất cả thông báo của danh sách user trong search results
  const fetchAllUserNotifications = async (userIds: string[]) => {
    if (userIds.length === 0) {
      setAllUserNotifications([]);
      return;
    }

    try {
      setLoadingAllUserNotifications(true);
      const params = new URLSearchParams({
        userIds: userIds.join(','),
        limit: '50',
        sortBy: 'created_at',
        sortOrder: 'desc',
      });

      if (activeTab === 1) {
        params.append('status', '1');
      } else if (activeTab === 2) {
        params.append('status', '2');
      }

      if (selectedTypes.length > 0) {
        if (selectedTypes.length === 1) {
          params.append('type', selectedTypes[0].toString());
        } else {
          params.append('type', selectedTypes.join(','));
        }
      }

      const url = `/api/notifications/admin/by-users?${params.toString()}`;
      console.log('Fetching all user notifications from:', url);
      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      console.log('All user notifications response:', data);

      if (data.success) {
        const sortedData = data.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setAllUserNotifications(sortedData);
        setTotalNotifications(sortedData.length);
      }
    } catch (error) {
      console.error('Failed to fetch all user notifications:', error);
      showSnackbar('Có lỗi xảy ra khi tải thông báo của nhiều người dùng', 'error');
    } finally {
      setLoadingAllUserNotifications(false);
    }
  };

  // Search users cho tab học viên
  const searchUsers = async () => {
    if (!searchKeyword.trim()) {
      setSearchResults([]);
      setAllUserNotifications([]);
      showSnackbar('Vui lòng nhập từ khóa tìm kiếm', 'error');
      return;
    }

    try {
      setSearchingUsers(true);
      const response = await fetch(`/api/notifications/search?keyword=${encodeURIComponent(searchKeyword.trim())}&searchType=${searchType}&limit=10`);
      const data: SearchResponse = await response.json();

      if (data.success) {
        setSearchResults(data.data);

        // 🔥 Reset selected user khi search mới
        setSelectedUser(null);
        setNotifications([]);
        setPage(0); // Reset về trang đầu tiên

        if (data.data.length > 0) {
          // 🔥 Nếu chỉ có 1 kết quả, tự động chọn
          if (data.data.length === 1) {
            handleUserSelect(data.data[0]);
            showSnackbar(`Đã tìm thấy học viên: ${data.data[0].name}`, 'success');
          } else {
            // Nếu nhiều hơn 1 kết quả, fetch tất cả thông báo
            await fetchAllUserNotifications(data.data.map((user) => user.id));
            showSnackbar(`Đã tìm thấy ${data.data.length} học viên`, 'success');
          }
        } else {
          setAllUserNotifications([]);
          setTotalNotifications(0);
          showSnackbar('Không tìm thấy người dùng nào', 'error');
        }
      }
    } catch (error) {
      console.error('Failed to search users:', error);
      showSnackbar('Có lỗi xảy ra khi tìm kiếm', 'error');
    } finally {
      setSearchingUsers(false);
    }
  };

  // 🔥 Xử lý khi chọn user
  const handleUserSelect = (user: SearchResponse['data'][0]) => {
    setSelectedUser(user);
    setPage(0); // Reset về trang đầu tiên
    // Khi chọn user, hiển thị thông báo của user đó
    setFetchTrigger((prev) => prev + 1);
    showSnackbar(`Đang xem thông báo của: ${user.name}`, 'success');
  };

  // Fetch notifications của user được chọn
  const fetchUserNotifications = useCallback(async () => {
    if (!selectedUser) return;

    try {
      setLoadingUserNotifications(true);

      const params = new URLSearchParams({
        userId: selectedUser.id,
        page: (page + 1).toString(), // API dùng 1-indexed, MUI dùng 0-indexed
        limit: rowsPerPage.toString(),
        sortBy: 'created_at',
        sortOrder: 'desc',
      });

      if (activeTab === 1) {
        params.append('status', '1');
      } else if (activeTab === 2) {
        params.append('status', '2');
      }

      if (selectedTypes.length > 0) {
        if (selectedTypes.length === 1) {
          params.append('type', selectedTypes[0].toString());
        } else {
          params.append('type', selectedTypes.join(','));
        }
      }

      const url = `/api/notifications/admin/by-user?${params.toString()}`;
      console.log('Fetching user notifications from:', url);
      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      console.log('User notifications response:', data);

      if (data.success) {
        setNotifications(data.data);

        // 🔥 Cập nhật thông tin phân trang
        if (data.pagination) {
          setTotalNotifications(data.pagination.total);
          setTotalPages(data.pagination.pages);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user notifications:', error);
      showSnackbar('Có lỗi xảy ra khi tải thông báo', 'error');
    } finally {
      setLoadingUserNotifications(false);
    }
  }, [selectedUser, page, rowsPerPage, activeTab, selectedTypes]);

  // 🔥 CHỈ CẦN 1 useEffect DUY NHẤT để quản lý tất cả
  useEffect(() => {
    console.log('Fetch trigger changed:', fetchTrigger, 'activeTab:', activeTab, 'selectedTypes:', selectedTypes, 'selectedUser:', selectedUser?.id);

    // Luôn fetch unread count
    fetchUnreadCount();

    // Fetch dữ liệu dựa trên tab hiện tại
    if (activeTab === 3) {
      if (selectedUser) {
        fetchUserNotifications();
      } else {
        setLoading(false);
        setLoadingUserNotifications(false);
      }
    } else {
      fetchNotifications();
    }
  }, [fetchTrigger, page, rowsPerPage]);

  // 🔥 Effect để fetch all user notifications khi search results thay đổi
  useEffect(() => {
    if (activeTab === 3 && searchResults.length > 0 && !selectedUser) {
      fetchAllUserNotifications(searchResults.map((user) => user.id));
    }
  }, [searchResults, activeTab, selectedUser]);

  // 🔥 Tạo các effect để tăng fetchTrigger khi có thay đổi
  useEffect(() => {
    setFetchTrigger((prev) => prev + 1);
  }, [activeTab]);

  useEffect(() => {
    setFetchTrigger((prev) => prev + 1);
  }, [selectedTypes]);

  useEffect(() => {
    if (activeTab === 3) {
      setFetchTrigger((prev) => prev + 1);
    }
  }, [selectedUser?.id]);

  useEffect(() => {
    setFetchTrigger((prev) => prev + 1);
  }, [triggerUpdate]);

  // 🔥 Xử lý khi thay đổi trang
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 🔥 Xử lý khi thay đổi số dòng mỗi trang
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset về trang đầu tiên khi thay đổi số dòng
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // 🔥 Xóa chọn user và quay lại xem tất cả
  const clearUserSelection = () => {
    setSelectedUser(null);
    setNotifications([]);
    setPage(0);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const url = `/api/notifications/${notificationId}/read?userId=${authData?.id}`;
      const response = await fetch(url, { method: 'PUT' });
      const result = await response.json();

      if (result.success) {
        setNotifications(notifications.map((noti) => (noti.notification_id === notificationId ? { ...noti, status: 2 } : noti)));
        setAllUserNotifications((prev) => prev.map((noti) => (noti.notification_id === notificationId ? { ...noti, status: 2 } : noti)));
        setUnreadCount((prev) => Math.max(0, prev - 1));
        notify();
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
          })),
        );
        setAllUserNotifications((prev) =>
          prev.map((noti) => ({
            ...noti,
            status: 2,
          })),
        );
        notify();
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
      const response = await fetch(`/api/notifications/${notificationId}?isAdmin=true`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setNotifications(notifications.filter((noti) => noti.notification_id !== notificationId));
        setAllUserNotifications((prev) => prev.filter((noti) => noti.notification_id !== notificationId));
        setTotalNotifications((prev) => prev - 1);
        notify();
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
      const readNotifications = notifications.filter((noti) => noti.status === 2);

      if (readNotifications.length === 0) {
        showSnackbar('Không có thông báo đã đọc để xóa', 'error');
        return;
      }

      const promises = readNotifications.map((noti) => fetch(`/api/notifications/${noti.notification_id}?isAdmin=true`, { method: 'DELETE' }));

      await Promise.all(promises);
      setNotifications(notifications.filter((noti) => noti.status !== 2));
      setAllUserNotifications((prev) => prev.filter((noti) => noti.status !== 2));
      setTotalNotifications((prev) => prev - readNotifications.length);
      notify();
      showSnackbar(`Đã xóa ${readNotifications.length} thông báo đã đọc`, 'success');
    } catch (error) {
      console.error('Failed to delete read notifications:', error);
      showSnackbar('Có lỗi xảy ra', 'error');
    }
  };

  const handleDeleteAll = async () => {
    if (!authData?.id) return;

    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa TẤT CẢ thông báo cá nhân? Thao tác này không thể hoàn tác.');
    if (!confirmed) return;

    try {
      if (notifications.length === 0) {
        showSnackbar('Không có thông báo để xóa', 'error');
        return;
      }

      const deletePromises = notifications.map((noti) => fetch(`/api/notifications/${noti.notification_id}?isAdmin=true`, { method: 'DELETE' }));

      await Promise.all(deletePromises);
      setNotifications([]);
      setTotalNotifications(0);
      if (selectedUser) {
        setAllUserNotifications((prev) => prev.filter((noti) => noti.user_id !== selectedUser.id));
      }
      notify();
      showSnackbar(`Đã xóa ${notifications.length} thông báo`, 'success');
    } catch (error) {
      console.error('Failed to delete all notifications:', error);
      showSnackbar('Có lỗi xảy ra khi xóa thông báo', 'error');
    }
  };

  const toggleTypeFilter = (type: number) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
    setPage(0); // Reset về trang đầu tiên khi thay đổi filter
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
    setPage(0);
  };

  const refreshNotifications = () => {
    setFetchTrigger((prev) => prev + 1);
  };

  const hasActiveFilters = selectedTypes.length > 0 || activeTab === 1 || activeTab === 2;

  // 🔥 Hàm để xác định notifications cần hiển thị
  const getDisplayNotifications = () => {
    if (activeTab === 3) {
      if (selectedUser) {
        return notifications;
      } else if (searchResults.length > 0) {
        // Hiển thị tất cả thông báo của các user trong search results
        return allUserNotifications;
      }
      return [];
    }
    return notifications;
  };

  // 🔥 Tính toán notifications hiển thị cho phân trang
  const getPaginatedNotifications = () => {
    const allNotifications = getDisplayNotifications();

    if (activeTab === 3 && searchResults.length > 0 && !selectedUser) {
      // Phân trang client-side cho allUserNotifications
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return allNotifications.slice(startIndex, endIndex);
    }

    // Các trường hợp khác đã được phân trang server-side
    return allNotifications;
  };

  const displayNotifications = getPaginatedNotifications();
  const displayTotal = activeTab === 3 && searchResults.length > 0 && !selectedUser ? allUserNotifications.length : totalNotifications;

  if (!authData) {
    return (
      <AdminLayout>
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box
        className="bg-violet-50/40 dark:bg-gray-900 min-h-screen transition-colors"
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          '.dark &': {
            bgcolor: '#111827',
          },
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters={false}
          sx={{
            mb: 6,
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, sm: 2 },
          }}
        >
          {/* Filter và Actions Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: { xs: 2, sm: 3 },
              overflow: 'hidden',
              bgcolor: 'background.paper',
              '.dark &': {
                bgcolor: '#1f2937',
                border: '1px solid #374151',
              },
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: 'text.primary',
                      '.dark &': {
                        color: '#f3f4f6',
                      },
                      fontSize: { xs: '1rem', sm: '1.25rem' },
                      mb: 1,
                    }}
                  >
                    Bộ Lọc & Hành Động
                  </Typography>

                  {hasActiveFilters && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        mt: 1,
                        '.dark &': {
                          '& .MuiChip-root': {
                            color: '#f3f4f6',
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          '.dark &': {
                            color: '#9ca3af',
                          },
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        }}
                      >
                        Đang áp dụng:
                      </Typography>
                      {activeTab === 1 && (
                        <Chip
                          label="Chưa đọc"
                          size="small"
                          color="warning"
                          onDelete={() => setActiveTab(0)}
                          sx={{
                            '.dark &': {
                              bgcolor: 'rgba(245, 158, 11, 0.2)',
                              color: '#f59e0b',
                            },
                          }}
                        />
                      )}
                      {activeTab === 2 && (
                        <Chip
                          label="Đã đọc"
                          size="small"
                          color="success"
                          onDelete={() => setActiveTab(0)}
                          sx={{
                            '.dark &': {
                              bgcolor: 'rgba(34, 197, 94, 0.2)',
                              color: '#22c55e',
                            },
                          }}
                        />
                      )}
                      {selectedTypes.map((type) => (
                        <Chip
                          key={type}
                          label={typeMap[type]?.text || `Loại ${type}`}
                          size="small"
                          sx={{
                            '.dark &': {
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              color: '#d1d5db',
                              border: '1px solid #4b5563',
                            },
                          }}
                          onDelete={() => toggleTypeFilter(type)}
                        />
                      ))}
                      <Button
                        size="small"
                        onClick={clearAllFilters}
                        sx={{
                          ml: 0.5,
                          mb: 0.5,
                          '.dark &': {
                            color: '#60a5fa',
                            '&:hover': {
                              bgcolor: 'rgba(96, 165, 250, 0.1)',
                            },
                          },
                        }}
                      >
                        Xóa tất cả
                      </Button>
                    </Box>
                  )}
                </Box>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{
                    width: { xs: '100%', md: 'auto' },
                    justifyContent: { xs: 'flex-start', md: 'flex-end' },
                    gap: { xs: 1, sm: 1 },
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<IconRefresh size={16} />}
                    onClick={refreshNotifications}
                    disabled={loading || (activeTab === 3 && loadingUserNotifications) || (activeTab === 3 && !selectedUser && loadingAllUserNotifications)}
                    sx={{
                      minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' },
                      flex: { xs: '1 0 calc(50% - 8px)', sm: '0 1 auto' },
                      mx: { xs: 0, sm: 'auto' },
                      '.dark &': {
                        borderColor: '#4b5563',
                        color: '#d1d5db',
                        '&:hover': {
                          borderColor: '#6b7280',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                        },
                      },
                    }}
                  >
                    Làm mới
                  </Button>
                  {activeTab !== 3 && (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<IconCheck size={16} />}
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                        color="success"
                        sx={{
                          minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' },
                          flex: { xs: '1 0 calc(50% - 8px)', sm: '0 1 auto' },
                          mx: { xs: 0, sm: 'auto' },
                          '.dark &': {
                            bgcolor: '#10b981',
                            '&:hover': {
                              bgcolor: '#059669',
                            },
                          },
                        }}
                      >
                        Đọc tất cả
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<IconTrash size={16} />}
                        onClick={handleDeleteAllRead}
                        sx={{
                          minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' },
                          flex: { xs: '1 0 calc(50% - 8px)', sm: '0 1 auto' },
                          mx: { xs: 0, sm: 'auto' },
                          '.dark &': {
                            borderColor: '#f87171',
                            color: '#f87171',
                            '&:hover': {
                              borderColor: '#fca5a5',
                              bgcolor: 'rgba(248, 113, 113, 0.1)',
                            },
                          },
                        }}
                      >
                        Xóa đã đọc
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<IconTrash size={16} />}
                        onClick={handleDeleteAll}
                        sx={{
                          minWidth: { xs: 'calc(100% - 8px)', sm: 'auto' },
                          flex: { xs: '1 0 calc(100% - 8px)', sm: '0 1 auto' },
                          mx: { xs: 0, sm: 'auto' },
                          '.dark &': {
                            borderColor: '#ef4444',
                            color: '#ef4444',
                            '&:hover': {
                              borderColor: '#fca5a5',
                              bgcolor: 'rgba(239, 68, 68, 0.1)',
                            },
                          },
                        }}
                      >
                        Xóa tất cả
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>

              <Divider
                sx={{
                  my: 3,
                  '.dark &': {
                    borderColor: '#374151',
                  },
                }}
              />

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => {
                  setActiveTab(newValue);
                  setPage(0); // Reset về trang đầu tiên
                  if (newValue !== 3) {
                    setSearchKeyword('');
                    setSearchResults([]);
                    setAllUserNotifications([]);
                    setSelectedUser(null);
                  }
                }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  '& .MuiTabs-scrollButtons': {
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    bgcolor: 'primary.main',
                  },
                  '& .MuiTab-root': {
                    minWidth: { xs: 100, sm: 120 },
                    px: { xs: 1, sm: 2 },
                    py: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    color: 'text.secondary',
                    '.dark &': {
                      color: '#9ca3af',
                    },
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 'bold',
                      '.dark &': {
                        color: '#60a5fa',
                      },
                    },
                  },
                }}
              >
                <Tab
                  label="Tất cả"
                  icon={<IconBell size={16} />}
                  iconPosition="start"
                  sx={{
                    '& .MuiTab-iconWrapper': {
                      mr: 0.5,
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span>Chưa đọc</span>
                      {unreadCount > 0 && (
                        <Badge
                          badgeContent={unreadCount}
                          color="error"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '0.6rem',
                              height: 16,
                              minWidth: 16,
                            },
                          }}
                        />
                      )}
                    </Box>
                  }
                  icon={<IconEye size={16} />}
                  iconPosition="start"
                />
                <Tab label="Đã đọc" icon={<IconEyeOff size={16} />} iconPosition="start" />
                {isAdmin && (
                  <Tab
                    label={
                      <Box
                        sx={{
                          display: { xs: 'none', sm: 'flex' },
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        Học viên
                      </Box>
                    }
                    icon={<IconUsers size={16} />}
                    iconPosition="start"
                  />
                )}
              </Tabs>

              {/* Type Filter với dropdown */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<IconFilter size={16} />}
                  endIcon={<IconChevronDown size={16} />}
                  onClick={handleFilterMenuOpen}
                  fullWidth
                  sx={{
                    justifyContent: 'space-between',
                    py: 1,
                    '.dark &': {
                      borderColor: '#4b5563',
                      color: '#d1d5db',
                      '&:hover': {
                        borderColor: '#6b7280',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {selectedTypes.length > 0 ? `${selectedTypes.length} loại được chọn` : 'Lọc theo loại thông báo'}
                  </Typography>
                </Button>

                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterMenuClose}
                  PaperProps={{
                    sx: {
                      maxHeight: 300,
                      width: { xs: 'calc(100vw - 32px)', sm: 250 },
                      bgcolor: 'background.paper',
                      '.dark &': {
                        bgcolor: '#1f2937',
                        border: '1px solid #374151',
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem dense>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'text.secondary',
                        '.dark &': {
                          color: '#9ca3af',
                        },
                        fontSize: { xs: '0.875rem', sm: '0.875rem' },
                      }}
                    >
                      Chọn loại thông báo
                    </Typography>
                  </MenuItem>
                  <Divider
                    sx={{
                      '.dark &': {
                        borderColor: '#374151',
                      },
                    }}
                  />
                  {Object.entries(typeMap).map(([type, info]) => (
                    <MenuItem
                      key={type}
                      onClick={() => toggleTypeFilter(Number(type))}
                      dense
                      sx={{
                        '.dark &': {
                          color: '#f3f4f6',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                          },
                        },
                      }}
                    >
                      <Checkbox
                        sx={{
                          color: '#6b7280',
                          '&.Mui-checked': {
                            color: '#3b82f6',
                          },
                          '.dark &': {
                            color: '#9ca3af',
                            '&.Mui-checked': {
                              color: '#3b82f6',
                            },
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
                            <Typography
                              sx={{
                                fontSize: { xs: '0.875rem', sm: '0.875rem' },
                              }}
                            >
                              {info.text}
                            </Typography>
                          </Box>
                        }
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </CardContent>
          </Card>

          {/* Search Section cho tab học viên */}
          {activeTab === 3 && isAdmin && (
            <Card
              sx={{
                mb: 3,
                borderRadius: { xs: 2, sm: 3 },
                overflow: 'hidden',
                bgcolor: 'background.paper',
                '.dark &': {
                  bgcolor: '#1f2937',
                  border: '1px solid #374151',
                },
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    color: 'text.primary',
                    '.dark &': {
                      color: '#f3f4f6',
                    },
                  }}
                >
                  Tìm kiếm học viên
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    mb: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  {/* 🔥 Select để chọn loại tìm kiếm */}
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ '.dark &': { color: '#9ca3af' } }}>Tìm theo</InputLabel>
                    <Select
                      value={searchType}
                      label="Tìm theo"
                      onChange={(e) => setSearchType(e.target.value as 'name' | 'email')}
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
                      <MenuItem value="name">Tên</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    size="small"
                    placeholder={searchType === 'name' ? 'Nhập tên học viên...' : 'Nhập email học viên...'}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch size={20} className="dark:text-gray-400" />
                        </InputAdornment>
                      ),
                      sx: {
                        bgcolor: 'background.paper',
                        '.dark &': {
                          bgcolor: '#111827',
                          color: '#f3f4f6',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4b5563',
                          },
                        },
                      },
                    }}
                    sx={{
                      flex: 1,
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={searchingUsers ? <CircularProgress size={16} /> : <IconSearch size={16} />}
                    onClick={searchUsers}
                    disabled={searchingUsers || !searchKeyword.trim()}
                    sx={{
                      minWidth: { xs: '100%', sm: 120 },
                      '.dark &': {
                        bgcolor: '#3b82f6',
                        '&:hover': {
                          bgcolor: '#2563eb',
                        },
                      },
                    }}
                  >
                    Tìm kiếm
                  </Button>
                </Box>

                {/* 🔥 Hiển thị selected user nếu có */}
                {selectedUser && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                      mb: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                      '.dark &': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #374151',
                      },
                    }}
                  >
                    <Avatar src={selectedUser.avatar} alt={selectedUser.name} />
                    <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography fontWeight="bold" sx={{ '.dark &': { color: '#f3f4f6' } }}>
                        Đang xem thông báo của: {selectedUser.name}
                      </Typography>
                      <Typography variant="body2" sx={{ '.dark &': { color: '#9ca3af' } }}>
                        {selectedUser.email}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={clearUserSelection}
                      sx={{
                        '.dark &': {
                          borderColor: '#4b5563',
                          color: '#d1d5db',
                          '&:hover': {
                            borderColor: '#6b7280',
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                          },
                        },
                      }}
                    >
                      Quay lại
                    </Button>
                  </Box>
                )}

                {/* 🔥 Hiển thị search results (chỉ khi có nhiều hơn 1 kết quả và chưa chọn user) */}
                {searchResults.length > 1 && !selectedUser && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        '.dark &': {
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Kết quả tìm kiếm ({searchResults.length} học viên):
                    </Typography>
                    <Stack spacing={1}>
                      {searchResults.map((user) => (
                        <Card
                          key={user.id}
                          variant="outlined"
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            borderLeft: '4px solid',
                            borderLeftColor: '#3b82f6',
                            '.dark &': {
                              bgcolor: '#111827',
                              borderColor: '#374151',
                              '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                              },
                            },
                          }}
                          onClick={() => handleUserSelect(user)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Avatar src={user.avatar} alt={user.name} />
                            <Box
                              sx={{
                                flexGrow: 1,
                                textAlign: { xs: 'center', sm: 'left' },
                                '.dark &': {
                                  '& .MuiTypography-root': {
                                    color: '#f3f4f6',
                                  },
                                },
                              }}
                            >
                              <Typography fontWeight="medium">{user.name}</Typography>
                              <Typography variant="body2" sx={{ '.dark &': { color: '#9ca3af' } }}>
                                {user.email}
                              </Typography>
                              <Typography variant="caption" sx={{ '.dark &': { color: '#9ca3af' } }}>
                                {allUserNotifications.filter((n) => n.user_id === user.id).length} thông báo
                              </Typography>
                            </Box>
                            <Chip
                              label={user.type}
                              size="small"
                              sx={{
                                '.dark &': {
                                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                                  color: '#d1d5db',
                                },
                              }}
                            />
                            <Button
                              size="small"
                              variant="contained"
                              endIcon={<IconExternalLink size={14} />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUserSelect(user);
                              }}
                            >
                              Xem
                            </Button>
                          </Box>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Notifications Table */}
          {loading || (activeTab === 3 && loadingUserNotifications) || (activeTab === 3 && !selectedUser && loadingAllUserNotifications) ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 8,
                bgcolor: 'background.paper',
                borderRadius: 3,
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  '.dark &': {
                    color: '#3b82f6',
                  },
                }}
              />
            </Box>
          ) : displayNotifications.length === 0 ? (
            <Fade in>
              <Card
                sx={{
                  borderRadius: { xs: 2, sm: 3 },
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  '.dark &': {
                    bgcolor: '#1f2937',
                    border: '1px solid #374151',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 8, px: { xs: 2, sm: 4 } }}>
                  <Box
                    sx={{
                      width: { xs: 60, sm: 80 },
                      height: { xs: 60, sm: 80 },
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '.dark &': {
                        background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                      },
                    }}
                  >
                    <IconBell size={40} className="text-gray-500 dark:text-gray-400" />
                  </Box>

                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      color: 'text.primary',
                      '.dark &': {
                        color: '#f3f4f6',
                      },
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    {activeTab === 3 ? (selectedUser ? 'Không có thông báo' : searchResults.length > 0 ? 'Không có thông báo từ các học viên này' : 'Nhập từ khóa để tìm kiếm học viên') : 'Không có thông báo'}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: 400,
                      mx: 'auto',
                      color: 'text.secondary',
                      '.dark &': {
                        color: '#9ca3af',
                      },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    {activeTab === 3 && !selectedUser && searchResults.length === 0 ? 'Tìm kiếm học viên để xem thông báo của họ' : hasActiveFilters ? 'Không tìm thấy thông báo nào phù hợp với bộ lọc của bạn' : 'Không có thông báo nào.'}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          ) : (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    color: 'text.secondary',
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  }}
                >
                  Hiển thị {displayNotifications.length} thông báo (tổng cộng {displayTotal}){selectedUser && ` - Học viên: ${selectedUser.name}`}
                  {!selectedUser && searchResults.length > 0 && ` - ${searchResults.length} học viên`}
                  {hasActiveFilters && ' (đã lọc)'}
                  {selectedTypes.length > 0 && ` - Loại: ${selectedTypes.map((t) => typeMap[t]?.text || t).join(', ')}`}
                </Typography>

                <TablePagination
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  component="div"
                  count={displayTotal}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số dòng mỗi trang:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                  sx={{
                    '.dark &': {
                      color: '#d1d5db',
                      bgcolor: '#1f2937',
                      borderTop: '1px solid #374151',
                      '& .MuiTablePagination-selectIcon': {
                        color: '#9ca3af',
                      },
                      '& .MuiTablePagination-actions button': {
                        color: '#d1d5db',
                        '&:disabled': {
                          color: '#6b7280',
                        },
                      },
                      '& .MuiTablePagination-select': {
                        color: '#d1d5db',
                      },
                    },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          bgcolor: '#ffffff',
                          color: '#111827',

                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',
                          },

                          // hover item
                          '& .MuiMenuItem-root:hover': {
                            bgcolor: '#e5e7eb',
                          },
                          '.dark & .MuiMenuItem-root:hover': {
                            bgcolor: '#374151',
                          },

                          // selected item
                          '& .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#e0e7ff',
                          },
                          '.dark & .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#312e81',
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Paper>
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: isMobile ? 400 : 600,
                    borderRadius: { xs: 2, sm: 3 },
                    bgcolor: 'background.paper',
                    '.dark &': {
                      bgcolor: '#1f2937',
                      border: '1px solid #374151',
                    },
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <Table size={isMobile ? 'small' : 'medium'}>
                    <TableHead
                      style={{
                        backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                      }}
                    >
                      <TableRow
                        sx={{
                          bgcolor: 'action.hover',
                          '.dark &': {
                            bgcolor: '#111827',
                          },
                        }}
                      >
                        <TableCell
                          width="60px"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            '.dark &': {
                              color: '#f3f4f6',
                            },
                          }}
                        >
                          Loại
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            '.dark &': {
                              color: '#f3f4f6',
                            },
                          }}
                        >
                          Tiêu đề & Nội dung
                        </TableCell>
                        {activeTab === 3 && (
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            Người dùng
                          </TableCell>
                        )}
                        <TableCell
                          width="150px"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            '.dark &': {
                              color: '#f3f4f6',
                            },
                          }}
                        >
                          Thời gian
                        </TableCell>
                        <TableCell
                          width="150px"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            '.dark &': {
                              color: '#f3f4f6',
                            },
                          }}
                        >
                          Trạng thái
                        </TableCell>
                        {activeTab !== 3 && (
                          <TableCell
                            width="100px"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            Hành động
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayNotifications.map((notification) => {
                        const typeInfo = typeMap[notification.type] || typeMap[4];
                        const isUnread = notification.status === 1;

                        return (
                          <TableRow
                            key={notification.notification_id}
                            sx={{
                              '&:hover': {
                                bgcolor: 'action.hover',
                                '.dark &': {
                                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                                },
                              },
                              borderLeft: isUnread ? '4px solid' : 'none',
                              borderLeftColor: isUnread ? 'primary.main' : 'transparent',
                              '.dark &': {
                                borderLeftColor: isUnread ? '#3b82f6' : 'transparent',
                              },
                            }}
                          >
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: 0.5,
                                  '.dark &': {
                                    '& .MuiTypography-root': {
                                      color: '#9ca3af',
                                    },
                                  },
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: { xs: 32, sm: 36 },
                                    height: { xs: 32, sm: 36 },
                                    fontSize: { xs: '14px', sm: '16px' },
                                    background: typeInfo.bgColor,
                                  }}
                                >
                                  {typeInfo.icon}
                                </Avatar>
                                <Typography
                                  variant="caption"
                                  textAlign="center"
                                  sx={{
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  }}
                                >
                                  {typeInfo.text}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography
                                  fontWeight={isUnread ? 'bold' : 'medium'}
                                  gutterBottom
                                  sx={{
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    color: 'text.primary',
                                    '.dark &': {
                                      color: '#f3f4f6',
                                    },
                                  }}
                                >
                                  {notification.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'text.secondary',
                                    '.dark &': {
                                      color: '#9ca3af',
                                    },
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    wordBreak: 'break-word',
                                  }}
                                >
                                  {notification.message}
                                </Typography>
                                {notification.action_url && (
                                  <Button
                                    size="small"
                                    variant="text"
                                    endIcon={<IconExternalLink size={14} />}
                                    onClick={() => window.open(notification.action_url, '_blank')}
                                    sx={{
                                      mt: 1,
                                      '.dark &': {
                                        color: '#60a5fa',
                                        '&:hover': {
                                          bgcolor: 'rgba(96, 165, 250, 0.1)',
                                        },
                                      },
                                    }}
                                  >
                                    Xem chi tiết
                                  </Button>
                                )}
                              </Box>
                            </TableCell>
                            {activeTab === 3 && (
                              <TableCell>
                                {notification.user ? (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                      flexDirection: { xs: 'column', sm: 'row' },
                                      textAlign: { xs: 'center', sm: 'left' },
                                    }}
                                  >
                                    <Avatar src={notification.user.avatar} alt={notification.user.name} sx={{ width: 32, height: 32 }} />
                                    <Box>
                                      <Typography
                                        variant="body2"
                                        fontWeight="medium"
                                        sx={{
                                          '.dark &': {
                                            color: '#f3f4f6',
                                          },
                                        }}
                                      >
                                        {notification.user.name}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: 'text.secondary',
                                          '.dark &': {
                                            color: '#9ca3af',
                                          },
                                        }}
                                      >
                                        {notification.user.email}
                                      </Typography>
                                    </Box>
                                  </Box>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: 'text.secondary',
                                      '.dark &': {
                                        color: '#9ca3af',
                                      },
                                    }}
                                  >
                                    -
                                  </Typography>
                                )}
                              </TableCell>
                            )}
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  '.dark &': {
                                    color: '#d1d5db',
                                  },
                                }}
                              >
                                {timeAgo(notification.created_at)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={isUnread ? 'Chưa đọc' : 'Đã đọc'}
                                size="small"
                                color={isUnread ? 'warning' : 'success'}
                                sx={{
                                  fontSize: '0.75rem',
                                  '.dark &': {
                                    bgcolor: isUnread ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                                    color: isUnread ? '#f59e0b' : '#22c55e',
                                  },
                                }}
                              />
                            </TableCell>
                            {activeTab !== 3 && (
                              <TableCell>
                                <Stack direction="row" spacing={0.5}>
                                  {isUnread && (
                                    <IconButton
                                      size="small"
                                      onClick={() => handleMarkAsRead(notification.notification_id)}
                                      sx={{
                                        color: 'success.main',
                                        bgcolor: 'success.50',
                                        '&:hover': {
                                          bgcolor: 'success.100',
                                        },
                                        '.dark &': {
                                          bgcolor: 'rgba(34, 197, 94, 0.15)',
                                          color: '#22c55e',
                                          '&:hover': {
                                            bgcolor: 'rgba(34, 197, 94, 0.25)',
                                          },
                                        },
                                      }}
                                    >
                                      <IconCheck size={18} />
                                    </IconButton>
                                  )}
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDelete(notification.notification_id)}
                                    sx={{
                                      color: 'error.main',
                                      bgcolor: 'error.50',
                                      '&:hover': {
                                        bgcolor: 'error.100',
                                      },
                                      '.dark &': {
                                        bgcolor: 'rgba(239, 68, 68, 0.15)',
                                        color: '#ef4444',
                                        '&:hover': {
                                          bgcolor: 'rgba(239, 68, 68, 0.25)',
                                        },
                                      },
                                    }}
                                  >
                                    <IconTrash size={18} />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* 🔥 Phân trang */}
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50, 100]}
                  component="div"
                  count={displayTotal}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Số dòng mỗi trang:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                  sx={{
                    '.dark &': {
                      color: '#d1d5db',
                      bgcolor: '#1f2937',
                      borderTop: '1px solid #374151',
                      '& .MuiTablePagination-selectIcon': {
                        color: '#9ca3af',
                      },
                      '& .MuiTablePagination-actions button': {
                        color: '#d1d5db',
                        '&:disabled': {
                          color: '#6b7280',
                        },
                      },
                      '& .MuiTablePagination-select': {
                        color: '#d1d5db',
                      },
                    },
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          bgcolor: '#ffffff',
                          color: '#111827',

                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',
                          },

                          // hover item
                          '& .MuiMenuItem-root:hover': {
                            bgcolor: '#e5e7eb',
                          },
                          '.dark & .MuiMenuItem-root:hover': {
                            bgcolor: '#374151',
                          },

                          // selected item
                          '& .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#e0e7ff',
                          },
                          '.dark & .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#312e81',
                          },
                        },
                      },
                    },
                  }}
                />
              </Paper>
            </Box>
          )}
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            bottom: { xs: 70, sm: 24 },
            right: { xs: 8, sm: 24 },
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: '100%',
              '.dark &': {
                bgcolor: snackbar.severity === 'success' ? '#10b981' : snackbar.severity === 'error' ? '#ef4444' : snackbar.severity === 'warning' ? '#f59e0b' : snackbar.severity === 'info' ? '#3b82f6' : '',
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
