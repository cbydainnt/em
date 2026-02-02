import { Badge, Box, Link, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IconMenu2, IconSun, IconMoon } from '@tabler/icons-react';
import UserMenu from '@/layouts/components/user-menu';
import { useDarkModeToggle } from '@/layouts/components/EM_DarkModeToggle';
import { useEffect, useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';
import { useCartStore } from '@/hooks/useCartStore';
import { useAuthStore } from '@/hooks/useAuthStore';
import EM_NotificationMenu from '../../components/EM_NotificationMenu';
import { useThemeStore } from '@/hooks/useThemeEventStore';

type HeaderProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onToggleSidebarMobile?: () => void;
  showSidebarToggle?: boolean;
  customToggleHandler?: () => void;
};

export default function Header({ onToggleCollapse, showSidebarToggle = true, customToggleHandler }: HeaderProps) {
  const { mode, toggleTheme } = useDarkModeToggle();
  // const [showSearch, setShowSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const { cartCount, fetchCartCount, resetCart } = useCartStore();
  const { authData } = useAuthStore();
  const { theme, fetchTheme } = useThemeStore();
  useEffect(() => {
    if (authData?.id) {
      fetchCartCount(authData.id);
    } else {
      resetCart();
    }
  }, [authData]);

  useEffect(() => {
    fetchTheme();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    if (customToggleHandler) {
      customToggleHandler();
    } else {
      onToggleCollapse();
    }
  };

  const getBrandLogoImage = () => {
    switch (theme) {
      case 'christmas':
        return 'christmast-brand-logo';
      case 'newyear':
        return 'newyear-brand-logo';
      case 'independence':
        return 'independence-brand-logo';
      default:
        return '';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1, sm: 3 },
        py: 0.4,
        backgroundColor: 'rgb(var(--bg-primary))',
        transition: 'background-color 300ms',
      }}
    >
      {/* Left: Logo + Toggle */}
      <div className="flex items-center gap-0 flex-shrink-0">
        {/* Chỉ hiện nút toggle khi showSidebarToggle = true */}
        {showSidebarToggle && (
          <button onClick={handleToggle} className="p-1 rounded-full hover:bg-gradient-to-r text-gray-700 dark:text-gray-200 hover:text-white transition">
            <IconMenu2 size={22} stroke={1.8} />
          </button>
        )}

        <Link component={RouterLink} to="/" underline="none" className="flex items-center gap-2 shrink-0">
          <Box className="relative">
            <Typography className={`${getBrandLogoImage()} relative z-20`} sx={{ color: 'rgb(var(--text-secondary))', fontSize: 36 }}>
              English Master
            </Typography>
          </Box>
        </Link>
      </div>

      <nav className="flex flex-nowrap items-center justify-center lg:gap-12 flex-1 min-w-0 overflow-hidden">
        {/* --- Khóa học --- */}
        <Tooltip title="Khóa học" arrow>
          <Link
            component={RouterLink}
            to="/tat-ca-khoa-hoc"
            underline="none"
            className={`gradient-underline relative flex items-center gap-3 px-1 pb-1 text-gray-900 dark:text-gray-100 hover:text-violet-500 transition shrink-0
            ${location.pathname.startsWith('/tat-ca-khoa-hoc') || location.pathname === '/khoa-hoc-cua-toi' ? 'active' : ''}`}
            sx={{
              '& span': {
                fontSize: '1.1rem',
                fontWeight: 500,
              },
            }}
          >
            <img src="https://ngoaingu24h.vn/images/nn24h/course.svg" alt="Khóa học" width={20} height={20} />
            {windowWidth >= 768 && <span>Khóa học</span>}
          </Link>
        </Tooltip>

        {/* --- Hot Combo --- */}
        <Tooltip title="Hot Combo" arrow>
          <Link
            component={RouterLink}
            to="/combo"
            underline="none"
            onClick={(e) => {
              if (location.pathname === '/combo') {
                e.preventDefault(); // ⛔ chặn navigate lại
              }
            }}
            className={`gradient-underline relative flex items-center gap-3 px-1 pb-1 text-gray-900 dark:text-gray-100 hover:text-violet-500 transition shrink-0
            ${location.pathname === '/combo' ? 'active' : ''}`}
            sx={{
              '& span': {
                fontSize: '1.1rem',
                fontWeight: 500,
              },
            }}
          >
            <img src="https://ngoaingu24h.vn/_next/image?url=%2Fimages%2Fnn24h%2Ffire_gif.gif&w=16&q=80" alt="Hot Combo" width={20} height={20} />
            {windowWidth >= 768 && <span className="text-red-600 animate-pulse">Hot Combo</span>}
          </Link>
        </Tooltip>

        {/* --- Tài liệu --- */}
        <Tooltip title="Tài liệu" arrow>
          <Link
            component={RouterLink}
            to="https://local.bipvn.com.vn:38088/tat-ca-khoa-hoc"
            underline="none"
            className={`gradient-underline relative flex items-center gap-3 px-1 pb-1 text-gray-900 dark:text-gray-100 hover:text-violet-500 transition shrink-0
            ${location.pathname === '/tai-lieu' ? 'active' : ''}`}
            sx={{
              '& span': {
                fontSize: '1.1rem',
                fontWeight: 500,
              },
            }}
          >
            <img src="https://ngoaingu24h.vn/images/nn24h/document.svg" alt="Tài liệu" width={20} height={20} />
            {windowWidth >= 900 && <span>Tài liệu</span>}
          </Link>
        </Tooltip>

        {/* --- Tra từ --- */}
        <Tooltip title="Tra từ" arrow>
          <Link
            component={RouterLink}
            to="/tra-tu"
            underline="none"
            className={`gradient-underline relative flex items-center gap-3 px-1 pb-1 text-gray-900 dark:text-gray-100 hover:text-violet-500 transition shrink-0
            ${location.pathname === '/tra-tu' ? 'active' : ''}`}
            sx={{
              '& span': {
                fontSize: '1.1rem',
                fontWeight: 500,
              },
            }}
          >
            <img src="https://ngoaingu24h.vn/images/nn24h/icon-search.svg" alt="Tra từ" width={20} height={20} />
            {windowWidth >= 900 && <span>Tra từ</span>}
          </Link>
        </Tooltip>
      </nav>

      {/* Right: Search + User */}
      <div className="flex items-center sm:gap-3 gap-0 flex-shrink-0">
        {/* Search box → icon khi nhỏ */}
        {/* {(showSearch && windowWidth < 768) || windowWidth >= 1025 ? (
          <div
            className={`flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 transition-all duration-200
        ${windowWidth < 640 ? 'w-[150px]' : 'w-[200px]'}`}
          >
            <IconVocabulary className="text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              autoFocus
              onBlur={() => windowWidth < 768 && setShowSearch(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (windowWidth < 768) setShowSearch(false);
                }
              }}
              className="w-full outline-none text-sm bg-transparent text-gray-700 dark:text-gray-100"
            />
          </div>
        ) : (
          <IconButton onClick={() => setShowSearch(true)} className="text-gray-700 dark:text-gray-200">
            <IconSearch size={20} />
          </IconButton>
        )} */}

        <EM_NotificationMenu />
        <Tooltip title="Giỏ hàng" arrow>
          <Link component={RouterLink} to="/gio-hang" underline="none" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Badge badgeContent={cartCount} color="error" overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <IconShoppingCart size={22} className="text-gray-700 dark:text-gray-200 hover:text-violet-500 transition" />
            </Badge>
          </Link>
        </Tooltip>

        {/* Theme toggle */}
        {windowWidth >= 375 && (
          <Tooltip title={mode === 'light' ? 'Tối' : 'Sáng'} arrow>
            <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {mode === 'light' ? <IconMoon size={22} className="text-gray-700" /> : <IconSun size={22} className="text-yellow-400" />}
            </button>
          </Tooltip>
        )}

        <UserMenu />
      </div>
    </Box>
  );
}
