import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/hooks/useAuthStore';
import { Avatar, Button, Divider, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { IconLogout2, IconUser, IconAddressBook, IconShoppingCartCheck, IconDeviceDesktopCog } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EM_RegisterDialog from '@/components/EM_RegisterDialog';
import EM_Login from '@/components/EM_Login';
import LockClockIcon from '@mui/icons-material/LockClock';
export default function UserMenu() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { authData } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const refEM_Login = useRef<any>(null);
  const refEM_RegisterDialog = useRef<any>(null);

  const logout = () => {
    setAnchorEl(null);
    logoutUser();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Trang cá nhân', icon: <IconUser size={20} stroke={1.5} />, path: '/thong-tin-ca-nhan' },
    { label: 'Khóa học của tôi', icon: <IconAddressBook size={20} stroke={1.5} />, path: '/khoa-hoc-cua-toi' },
    { label: 'Lịch sử mua hàng', icon: <IconShoppingCartCheck size={20} stroke={1.5} />, path: '/lich-su-don-hang' },
    { label: 'Bảo lưu khóa học', icon: <LockClockIcon sx={{ width: 20, height: 20, strokeWidth: 1.5 }} />, path: '/bao-luu' },
    ...(authData?.type === 'admin'
      ? [
          {
            label: 'Trang quản lý',
            icon: <IconDeviceDesktopCog size={20} stroke={1.5} />,
            path: '/admin/manage/users',
          },
        ]
      : []),
  ];

  return (
    <>
      {authData ? (
        <>
          {/* Khi đã đăng nhập */}
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="flex items-center p-2 normal-case h-12 md:h-auto hover:shadow-lg transition-all duration-300"
            sx={{
              textTransform: 'none',
              padding: '8px 12px',
              '&:hover': {
                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* Ẩn text khi màn hình nhỏ */}
            <div className="hidden sm:block lg:hidden xl:block mr-2 text-right text-gray-900 dark:text-gray-100">
              <h1 className="text-xs sm:text-sm font-semibold">{authData.name}</h1>
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400" display="block">
                {authData.email}
              </Typography>
            </div>
            <Avatar variant="rounded" src={authData.avatar && authData.avatar.includes('http') ? `${authData.avatar}` : authData.avatar ? `/api/user/image/${authData.avatar}` : ''} sx={{ width: 36, height: 36 }} />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
                backdropFilter: 'blur(10px)',
                minWidth: '220px',
                '&.dark': {
                  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* Hiện thông tin user trên mobile khi mở menu */}
            <div className="md:hidden px-4 py-3 bg-gradient-to-r from-violet-400/10 to-fuchsia-200/10 dark:from-lavender-200/5 dark:to-fuchsia-400/5 rounded-t-xl">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{authData.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{authData.email}</p>
            </div>
            <Divider className="md:hidden my-1" />

            {/* Menu Items */}
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => handleMenuClick(item.path)}
                sx={{
                  margin: '4px 6px',
                  borderRadius: '10px',
                  padding: '6px 8px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 50%, #ddd6fe 100%)',
                    color: '#7c3aed',
                    transform: 'translateX(6px)',
                    boxShadow: '0 8px 16px rgba(124, 58, 237, 0.2)',
                    '& .icon-wrapper': {
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    },
                    '& .MuiTypography-root': {
                      fontWeight: 600,
                      color: '#7c3aed',
                    },
                  },
                  '&.dark:hover': {
                    background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #a78bfa 100%)',
                  },
                }}
              >
                <div
                  className="icon-wrapper transition-all duration-300"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                    color: '#7c3aed',
                  }}
                >
                  {item.icon}
                </div>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: 500,
                    noWrap: true,
                  }}
                  sx={{
                    flex: '1 1 auto',
                    minWidth: 0,
                    '& .MuiTypography-root': {
                      transition: 'all 0.3s ease-in-out',
                      color: '#374151',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                    '&.dark .MuiTypography-root': {
                      color: '#e5e7eb',
                    },
                  }}
                />
              </MenuItem>
            ))}

            <Divider sx={{ my: 1 }} />

            {/* Logout Item */}
            <MenuItem
              onClick={logout}
              sx={{
                margin: '4px 6px',
                borderRadius: '10px',
                padding: '6px 8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)',
                  color: '#dc2626',
                  transform: 'translateX(6px)',
                  boxShadow: '0 8px 16px rgba(220, 38, 38, 0.2)',
                  '& .icon-wrapper': {
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    transform: 'scale(1.1) rotate(-5deg)',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                  },
                  '& .MuiTypography-root': {
                    fontWeight: 600,
                    color: '#dc2626',
                  },
                },
              }}
            >
              <div
                className="icon-wrapper transition-all duration-300"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
                  color: '#dc2626',
                }}
              >
                <IconLogout2 size={20} stroke={1.5} />
              </div>
              <ListItemText
                primary="Đăng xuất"
                primaryTypographyProps={{
                  fontSize: '14px',
                  fontWeight: 500,
                  noWrap: true,
                }}
                sx={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  '& .MuiTypography-root': {
                    transition: 'all 0.3s ease-in-out',
                    color: '#374151',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                  '&.dark .MuiTypography-root': {
                    color: '#e5e7eb',
                  },
                }}
              />
            </MenuItem>
          </Menu>
        </>
      ) : (
        <div className="flex gap-2 h-8 my-3">
          <Button
            className="md:inline-flex px-2 py-1 text-sm transition hover"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#2C31CF',
              fontSize: '16px',
              width: 'auto',
              py: 0.75,
              height: '100%',
              transition: 'all 0.25s ease',
              '&:hover': {
                color: '#4e53d4ff',
                transform: 'translateY(-2px)',
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              refEM_Login.current.show();
            }}
          >
            Đăng nhập
          </Button>
          <Button
            className="hidden md:inline-flex px-2 py-1 text-sm transition"
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#fff',
              fontSize: '16px',
              backgroundColor: '#E8505B',
              px: 1,
              py: 0.75,
              height: '100%',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: 'linear-gradient(to right, #a78bfa, #e879f9)',
                color: '#fff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(162, 26, 216, 0.3)',
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              refEM_RegisterDialog.current.show();
            }}
          >
            Đăng ký
          </Button>
        </div>
      )}
      <EM_Login ref={refEM_Login} />
      <EM_RegisterDialog ref={refEM_RegisterDialog} />
    </>
  );
}
