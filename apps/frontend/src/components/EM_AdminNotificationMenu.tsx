import { useState, useRef, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { Badge, IconButton, Menu, MenuItem, Typography, Box, Divider, Button, Avatar, ListItemIcon, ListItemText, Chip, Stack } from '@mui/material';
import { useAuthStore, useNotificationStore } from '@/hooks/useAuthStore';
import { IconBell, IconCheck, IconTrash, IconList } from '@tabler/icons-react';
import { timeAgo } from '@/utils/timeAgo';
import { UserType } from '@/utils/enums';

interface Notification {
  notification_id: string;
  user_id: string | null;
  user_type: string | null;
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

interface UnreadCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

// Map type number sang readable text
const typeMap: Record<number, { text: string; color: any; icon: string }> = {
  1: { text: 'Hệ thống', color: 'default', icon: '⚙️' },
  2: { text: 'Nhắc nhở', color: 'warning', icon: '⏰' },
  3: { text: 'Phản hồi', color: 'info', icon: '💬' },
  4: { text: 'Hành động', color: 'primary', icon: '👤' },
  5: { text: 'Quản trị', color: 'secondary', icon: '🛡️' },
  6: { text: 'Khuyến mãi', color: 'success', icon: '🎁' },
  7: { text: 'Nội dung', color: 'info', icon: '📚' },
  8: { text: 'Hoàn thành', color: 'success', icon: '🎓' },
  9: { text: 'Xã hội', color: 'primary', icon: '👥' },
  11: { text: 'Báo cáo', color: 'error', icon: '🚨' },
};

const EM_AdminNotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { authData } = useAuthStore();
  const { triggerUpdate, updateNotification } = useNotificationStore();
  const open = Boolean(anchorEl);

  // Clear data khi logout
  useEffect(() => {
    if (!authData) {
      setNotifications([]);
      setUnreadCount(0);
      setAnchorEl(null); // Đóng menu nếu đang mở
    }
  }, [authData]);
  // Fetch notifications với trạng thái user
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      let url = '/api/notifications?limit=50';

      if (authData?.id) {
        url = `/api/notifications?userId=${authData.id}&limit=50`;
      }

      url += `&user_type=${UserType.ADMIN}`;
      const response = await fetch(url);
      const data: ApiResponse = await response.json();

      if (data.success) {
        // 🔥 THÊM: Filter thêm ở client side để đảm bảo
        const userNotifications = data.data.filter((noti) => {
          // Lấy thông báo cá nhân của user này
          if (noti.user_id === authData?.id) return true;

          // Lấy thông báo hệ thống có user_type = 'user' hoặc không có user_type
          if (noti.user_id === null) {
            return !noti.user_type || noti.user_type === 'admin';
          }

          return false;
        });
        setNotifications(userNotifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch số lượng thông báo chưa đọc với UserNotification support
  const fetchUnreadCount = async () => {
    try {
      let url = '/api/notifications/unread-count';

      if (authData?.id) {
        url = `/api/notifications/unread-count-with-status?userId=${authData.id}`;
      } else {
        url = '/api/notifications/unread-count';
      }

      // 🔥 THÊM: Filter theo user_type
      url += `&user_type=${UserType.ADMIN}`;

      const response = await fetch(url);
      const data: UnreadCountResponse = await response.json();

      if (data.success) {
        setUnreadCount(data.data.count);
        useNotificationStore.getState().setUnreadCount(data.data.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
      // Fallback: tính unread count từ local notifications
      const localUnreadCount = notifications.filter((noti) => {
        // Với thông báo hệ thống, kiểm tra cả user_notification status
        if (noti.user_id === null && noti.user_notification) {
          return noti.user_notification.status === 1;
        }
        return noti.status === 1;
      }).length;
      setUnreadCount(localUnreadCount);
    }
  };

  useEffect(() => {
    if (authData?.id) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [triggerUpdate, authData?.id]);

  // Fetch unread count khi component mount và polling
  useEffect(() => {
    if (authData?.id) {
      fetchUnreadCount();
    }

    const interval = setInterval(
      () => {
        if (authData?.id) {
          fetchUnreadCount();
        }
      },
      10 * 30 * 1000,
    ); // 5p

    return () => clearInterval(interval);
  }, [authData?.id]);

  // Fetch notifications khi mở menu
  useEffect(() => {
    if (open && authData?.id) {
      fetchNotifications();
    }
  }, [open, authData?.id]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Đánh dấu đã đọc với hỗ trợ UserNotification
  const handleMarkAsRead = async (notificationId: string, isSystemNotification: boolean) => {
    try {
      let url = `/api/notifications/${notificationId}/read`;

      // Thêm userId cho thông báo hệ thống
      if (isSystemNotification && authData?.id) {
        url += `?userId=${authData.id}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
      });

      const result = await response.json();

      if (result.success) {
        // Cập nhật local state
        setNotifications(
          notifications.map((noti) =>
            noti.notification_id === notificationId
              ? {
                  ...noti,
                  status: 2,
                  // Cập nhật user_notification cho thông báo hệ thống
                  ...(isSystemNotification && { user_notification: { status: 2, read_at: new Date().toISOString() } }),
                }
              : noti,
          ),
        );
        // Giảm unread count
        setUnreadCount((prev) => Math.max(0, prev - 1));
        updateNotification();
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  // Đánh dấu tất cả đã đọc với hỗ trợ UserNotification
  const handleMarkAllAsRead = async () => {
    try {
      let url = '/api/notifications/read-all';

      if (authData?.id) {
        url += `?userId=${authData.id}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
      });

      const result = await response.json();

      if (result.success) {
        // Cập nhật local state - đánh dấu đọc tất cả thông báo
        setNotifications(
          notifications.map((noti) => ({
            ...noti,
            status: 2,
            // Cập nhật user_notification cho thông báo hệ thống
            ...(noti.user_id === null && { user_notification: { status: 2, read_at: new Date().toISOString() } }),
          })),
        );
        // Reset unread count về 0
        setUnreadCount(0);
        updateNotification();
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      const notificationToDelete = notifications.find((noti) => noti.notification_id === notificationId);
      // 🔥 THÊM: Admin có thể xóa cả system notifications
      const isAdmin = authData?.type === UserType.ADMIN;
      // Chỉ cho phép xóa thông báo cá nhân, không xóa thông báo hệ thống
      if (!isAdmin && notificationToDelete?.user_id === null) {
        alert('Không thể xóa thông báo hệ thống');
        return;
      }

      const response = await fetch(`/api/notifications/${notificationId}?isAdmin=${isAdmin}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Cập nhật local state
        setNotifications(notifications.filter((noti) => noti.notification_id !== notificationId));
        // Giảm unread count nếu notification chưa đọc
        if (notificationToDelete?.status === 1) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
        updateNotification();
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleClearAll = async () => {
    try {
      // Chỉ xóa thông báo cá nhân
      if (!authData?.id) return;

      const response = await fetch(`/api/notifications/user/${authData.id}/clear-all`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Chỉ xóa thông báo cá nhân khỏi local state, giữ lại thông báo hệ thống
        setNotifications(notifications.filter((noti) => noti.user_id === null));
        // Reset unread count về số lượng thông báo hệ thống chưa đọc
        const systemUnreadCount = notifications.filter((noti) => noti.user_id === null && (noti.user_notification ? noti.user_notification.status === 1 : noti.status === 1)).length;
        setUnreadCount(systemUnreadCount);
        updateNotification();
      }
    } catch (error) {
      console.error('Failed to clear all notifications:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Kiểm tra trạng thái thực tế (bao gồm cả user_notification)
    const actualStatus = notification.user_id === null && notification.user_notification ? notification.user_notification.status : notification.status;

    // Đánh dấu đã đọc khi click nếu chưa đọc
    if (actualStatus === 1) {
      handleMarkAsRead(notification.notification_id, notification.user_id === null);
    }

    // Điều hướng nếu có action_url
    if (notification.action_url) {
      window.location.href = notification.action_url;
    }

    handleClose();
  };

  // Tính trạng thái hiển thị thực tế (bao gồm cả user_notification)
  const getDisplayStatus = (notification: Notification): number => {
    if (notification.user_id === null && notification.user_notification) {
      return notification.user_notification.status;
    }
    return notification.status;
  };

  // Tính unread count từ notifications (fallback)
  const calculatedUnreadCount = notifications.filter((noti) => getDisplayStatus(noti) === 1).length;
  const displayUnreadCount = unreadCount > 0 ? unreadCount : calculatedUnreadCount;

  // Lọc thông báo cá nhân để tính số lượng có thể xóa
  const personalNotifications = notifications.filter((noti) => noti.user_id !== null);

  return (
    <div ref={menuRef}>
      <Tooltip
        title="Thông báo"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: 'grey.900',
              color: 'white',
              fontSize: '0.75rem',
            },
          },
          arrow: {
            sx: { color: 'grey.900' },
          },
        }}
      >
        <IconButton
          onClick={handleClick}
          className="text-gray-700 dark:text-gray-200 hover:bg-violet-100 dark:hover:bg-gray-700 transition"
          sx={{
            position: 'relative',
          }}
        >
          <Badge badgeContent={displayUnreadCount} color="error">
            <IconBell size={22} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 380,
            maxWidth: '90vw',
            maxHeight: '70vh',
            overflow: 'hidden',
            mt: 1.5,
            borderRadius: 2,

            bgcolor: 'background.paper',
            '.dark &': {
              bgcolor: '#1f2937', // gray-800
              color: 'white',
            },

            '& .MuiMenuItem-root': {
              py: 1.5,
              px: 2,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {/* Header */}
        <Box sx={{ p: 2, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: 'text.primary',
                '.dark &': { color: 'grey.100' },
              }}
            >
              Thông báo
            </Typography>
            {displayUnreadCount > 0 && (
              <Button size="small" onClick={handleMarkAllAsRead} startIcon={<IconCheck size={16} />} sx={{ minWidth: 'auto' }} disabled={loading}>
                Đọc tất cả
              </Button>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                '.dark &': { color: 'grey.100' },
              }}
            >
              {displayUnreadCount} thông báo chưa đọc
            </Typography>
            {personalNotifications.length > 0 && (
              <Button size="small" color="error" onClick={handleClearAll} startIcon={<IconTrash size={16} />} sx={{ minWidth: 'auto' }} disabled={loading}>
                Xóa tất cả
              </Button>
            )}
          </Box>
        </Box>

        <Divider />

        {/* Notifications List */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  '.dark &': { color: 'grey.100' },
                }}
              >
                Đang tải thông báo...
              </Typography>
            </Box>
          ) : notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <IconBell size={48} color="#ccc" />
              <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary', '.dark &': { color: 'grey.100' } }}>
                Không có thông báo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  '.dark &': { color: 'grey.100' },
                }}
              >
                Các thông báo mới sẽ xuất hiện ở đây
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => {
              const typeInfo = typeMap[notification.type] || typeMap[4];
              const displayStatus = getDisplayStatus(notification);
              const isSystemNotification = notification.user_id === null;

              return <NotificationItem key={notification.notification_id} notification={notification} displayStatus={displayStatus} typeInfo={typeInfo} onMarkAsRead={() => handleMarkAsRead(notification.notification_id, isSystemNotification)} onDelete={handleDelete} onClick={handleNotificationClick} getTimeAgo={timeAgo} isSystemNotification={isSystemNotification} />;
            })
          )}
        </Box>

        {/* Footer */}
        {notifications.length > 0 && authData?.id && (
          <>
            <Divider />
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Button
                fullWidth
                startIcon={<IconList size={16} />}
                sx={{
                  color: 'text.secondary',
                  '.dark &': { color: 'grey.300' },
                  '&:hover': { color: 'primary.main' },
                }}
                onClick={() => {
                  window.location.href = '/admin/manage/adminNotify';
                  handleClose();
                }}
              >
                Tất cả thông báo
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </div>
  );
};

export default EM_AdminNotificationMenu;

interface AdminNotificationItemProps {
  notification: Notification;
  displayStatus: number;
  typeInfo: { text: string; color: any; icon: string };
  onMarkAsRead: () => void;
  onDelete: (id: string) => void;
  onClick: (notification: Notification) => void;
  getTimeAgo: (createdAt: string) => string;
  isSystemNotification: boolean;
}

function NotificationItem({ notification, displayStatus, typeInfo, onMarkAsRead, onDelete, onClick, getTimeAgo, isSystemNotification }: AdminNotificationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { authData } = useAuthStore();
  const isAdmin = authData?.type === UserType.ADMIN;
  const canDelete = !isSystemNotification || isAdmin;
  return (
    <MenuItem
      onClick={() => onClick(notification)}
      sx={{
        borderLeft: displayStatus === 1 ? '3px solid' : 'none',
        borderLeftColor: displayStatus === 1 ? 'primary.main' : 'transparent',

        bgcolor: displayStatus === 1 ? 'action.selected' : 'transparent',

        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'transparent',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {typeInfo.icon}
        </Avatar>
      </ListItemIcon>

      <ListItemText
        primary={
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="subtitle2"
                fontWeight={displayStatus === 1 ? 'bold' : 'normal'}
                sx={{
                  color: 'text.primary',
                  '.dark &': { color: 'grey.100' },
                }}
              >
                {notification.title}
              </Typography>

              {isSystemNotification && (
                <Chip
                  label="Hệ thống"
                  size="small"
                  sx={{
                    fontSize: '0.6rem',
                    height: 20,
                    bgcolor: 'info.light',
                    color: 'info.contrastText',
                    '.dark &': {
                      bgcolor: 'rgba(56,189,248,0.2)',
                      color: '#e0f2fe',
                    },
                  }}
                />
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: isExpanded ? 'unset' : 3,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.5,
                mb: 1,
                cursor: 'pointer',
                color: 'text.secondary',
                '.dark &': {
                  color: 'grey.400',
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {notification.message}
            </Typography>

            {notification.message.length > 150 && (
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                sx={{
                  mt: 0.5,
                  minWidth: 'auto',
                  fontSize: '0.75rem',
                  color: 'primary.main',
                }}
              >
                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
              </Button>
            )}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Chip
                label={typeInfo.text}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.6rem',
                  height: 20,
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '.dark &': {
                    color: 'grey.400',
                    borderColor: 'grey.700',
                  },
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  '.dark &': {
                    color: 'grey.400',
                  },
                }}
              >
                {getTimeAgo(notification.created_at)}
              </Typography>
            </Stack>
          </Box>
        }
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 1 }}>
        {displayStatus === 1 && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead();
            }}
            sx={{
              color: 'success.main',
              '&:hover': { bgcolor: 'success.main', color: 'white' },
            }}
          >
            <IconCheck size={16} />
          </IconButton>
        )}
        {canDelete && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.notification_id);
            }}
            sx={{
              color: 'error.main',
              '&:hover': { bgcolor: 'error.main', color: 'white' },
            }}
          >
            <IconTrash size={16} />
          </IconButton>
        )}
      </Box>
    </MenuItem>
  );
}
