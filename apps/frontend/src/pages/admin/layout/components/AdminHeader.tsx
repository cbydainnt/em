import { Link, IconButton,  Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { IconMenu2, IconSun, IconMoon,  IconSettings } from '@tabler/icons-react';
import UserMenu from '@/layouts/components/user-menu';
import { useDarkModeToggle } from '@/layouts/components/EM_DarkModeToggle';
import logo1 from '@/assets/LOGO11GIF.gif';
import logo2 from '@/assets/EMLOGOLIGHT.gif';
import logo3 from '@/assets/EMLOGODARK.gif';
import EM_AdminNotificationMenu from '@/components/EM_AdminNotificationMenu';

type AdminHeaderProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  headerHeight: number;
};

export default function AdminHeader({ onToggleCollapse, headerHeight }: AdminHeaderProps) {
  const { mode, toggleTheme } = useDarkModeToggle();

  return (
    <header
      className={`flex items-center justify-between px-4 py-2 transition-colors duration-300 backdrop-blur-sm shadow-md z-50
        ${mode === 'light' ? 'bg-gradient-to-r from-violet-50 via-pink-50 to-violet-100 border-b border-violet-200' : 'bg-gray-800 border-b border-gray-700'}`}
      style={{ height: headerHeight }}
    >
      {/* Left: Logo + Toggle */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Sidebar Toggle */}
        <IconButton onClick={onToggleCollapse} className="text-gray-700 dark:text-gray-200 hover:bg-violet-100 dark:hover:bg-gray-700 transition" size="small">
          <IconMenu2 size={22} stroke={1.8} />
        </IconButton>

        {/* Logo */}
        <Link component={RouterLink} to="/" underline="none" className="flex items-center gap-2 shrink-0">
          <img src={logo1} className="h-[36px]" alt="Logo" />
          <img src={mode === 'dark' ? logo3 : logo2} className="h-7 w-auto hidden lg:block" alt="Admin Logo" />
        </Link>

        {/* Admin Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white text-xs font-semibold">
          <IconSettings size={14} />
          <span>ADMIN PANEL</span>
        </div>
      </div>

      {/* Center: Breadcrumb or Title */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 hidden sm:block">Quản trị hệ thống</h1>
      </div>

      {/* Right: Actions + User Menu */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notifications */}
        <EM_AdminNotificationMenu />

        {/* Settings */}
        <Tooltip title="Cài đặt" arrow>
          <IconButton component={RouterLink} to="/admin/settings" className="text-gray-700 dark:text-gray-200 hover:bg-violet-100 dark:hover:bg-gray-700 transition">
            <IconSettings size={20} />
          </IconButton>
        </Tooltip>

        {/* Theme toggle */}
        <Tooltip title="Chuyển chế độ" arrow>
          <IconButton onClick={toggleTheme} className="text-gray-700 dark:text-gray-200 hover:bg-violet-100 dark:hover:bg-gray-700 transition">
            {mode === 'light' ? <IconMoon size={20} /> : <IconSun size={20} className="text-yellow-400" />}
          </IconButton>
        </Tooltip>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
