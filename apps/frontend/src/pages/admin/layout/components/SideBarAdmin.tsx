import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, ListItemIcon, ListItemText } from '@mui/material';
import { IconDashboard, IconUsers, IconBook2, IconPackage, IconCreditCard, IconSettings, IconCategory, IconFileText, IconShield, IconClipboardList, IconReport, IconBell } from '@tabler/icons-react';
import DiscountIcon from '@mui/icons-material/Discount';
type AdminSidebarProps = {
  headerHeight: number;
  collapsed: boolean;
  isSmallScreen?: boolean;
  isSidebarOpen?: boolean;
  onSidebarClose?: () => void;
};

export default function AdminSidebar({ headerHeight, collapsed, isSmallScreen, isSidebarOpen, onSidebarClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Menu quản trị ---
  const adminMenuItems = [
    { label: 'Dashboard', icon: <IconDashboard size={22} stroke={1.5} />, path: '/admin/manage/dashboard' },
    { label: 'Giảng viên', icon: <IconUsers size={22} stroke={1.5} />, path: '/admin/manage/profile-teacher' },
    { label: 'Người dùng', icon: <IconUsers size={22} stroke={1.5} />, path: '/admin/manage/users' },
    { label: 'Danh mục trang chủ', icon: <IconCategory size={22} stroke={1.5} />, path: '/admin/manage/categories' },
    { label: 'Combo khóa học', icon: <IconPackage size={22} stroke={1.5} />, path: '/admin/manage/combos' },
    { label: 'Khóa học', icon: <IconBook2 size={22} stroke={1.5} />, path: '/admin/manage/courses' },
    { label: 'Mã giảm giá', icon: <DiscountIcon />, path: '/admin/manage/discount-vouchers' },
    { label: 'Giao dịch', icon: <IconCreditCard size={22} stroke={1.5} />, path: '/admin/manage/transactions' },
    { label: 'Quiz', icon: <IconClipboardList size={22} stroke={1.5} />, path: '/admin/manage/quizzes' },
    { label: 'Tài liệu', icon: <IconFileText size={22} stroke={1.5} />, path: '/admin/manage/documents' },
    { label: 'Báo cáo', icon: <IconReport size={22} stroke={1.5} />, path: '/admin/manage/reports' },
    { label: 'Thông báo', icon: <IconBell size={22} stroke={1.5} />, path: '/admin/manage/adminNotify' },
    { label: 'Phân quyền', icon: <IconShield size={22} stroke={1.5} />, path: '/admin/manage/permissions' },
    { label: 'Cài đặt', icon: <IconSettings size={22} stroke={1.5} />, path: '/admin/manage/settings' },
  ];

  const showText = !collapsed || isSmallScreen;

  return (
    <aside
      className={`fixed top-[${headerHeight}px] left-0
  h-[calc(100vh-${headerHeight}px)]
  flex flex-col shadow-md transition-all ease-in-out duration-300
  scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
  ${collapsed ? 'py-1' : 'py-1'}
  ${
    isSmallScreen
      ? `z-50 fixed transform transition-transform ease-in-out 
      ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`
      : 'md:flex'
  }
  bg-gradient-to-b from-violet-50 via-pink-50 to-violet-100 border-r border-violet-200 
  dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700
  `}
      style={{
        width: isSmallScreen ? '85vw' : collapsed ? 55 : 270,
        height: `calc(100vh - ${headerHeight}px)`,
        maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
        overflowClipMargin: '20px',
        left: 0,
        zIndex: isSmallScreen ? 50 : 'auto',
      }}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Menu quản trị */}
        <nav className={`mt-3 flex flex-col flex-shrink-0 gap-2 ${collapsed ? 'px-1' : 'px-1'} transition-all ease-in-out`}>
          {adminMenuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Tooltip key={item.label} title={collapsed && !isSmallScreen ? item.label : ''} placement="right">
                <div
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(item.path);
                    if (isSmallScreen && isSidebarOpen && typeof onSidebarClose === 'function') onSidebarClose();
                  }}
                  className={`group flex items-center cursor-pointer rounded-xl transform transition-all ease-in-out
          ${collapsed && !isSmallScreen ? 'justify-center px-0 py-1' : 'px-1 py-1'}
          ${isActive ? 'bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 dark:from-lavender-200/30 dark:to-fuchsia-400/30 text-violet-700 dark:text-gray-100 shadow-sm -translate-y-0.5' : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-300/60 hover:to-fuchsia-200/50 dark:hover:from-lavender-200/20 dark:hover:to-fuchsia-400/30 hover:text-violet-700 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5'}`}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed && !isSmallScreen ? 0 : 1.5,
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className={`rounded-full p-2 transition-all ease-in-out
              ${isActive ? 'bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white dark:from-lavender-300 dark:to-fuchsia-400' : 'bg-gray-100 dark:bg-[#2A2A2A] text-gray-600 dark:text-gray-200 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-400 group-hover:text-white'}`}
                    >
                      {item.icon}
                    </div>
                  </ListItemIcon>

                  {showText && (
                    <ListItemText
                      className={`transition-opacity ease-in-out ${collapsed && !isSmallScreen ? 'opacity-0' : 'opacity-100'}`}
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: isActive ? 600 : 500,
                        noWrap: true,
                      }}
                      sx={{
                        transition: 'color 0.18s, transform 0.18s, font-weight 0.18s',
                        '.MuiTypography-root': {
                          color: isActive ? '#a21ad8ff' : 'inherit',
                        },
                        '.group:hover & .MuiTypography-root': {
                          color: '#a21ad8ff',
                          fontWeight: 600,
                        },
                        '.dark & .MuiTypography-root': {
                          color: isActive ? '#e5e7eb !important' : 'inherit',
                        },
                        '.dark .group:hover & .MuiTypography-root': {
                          color: '#e5e7eb !important',
                          fontWeight: 600,
                        },
                      }}
                    />
                  )}
                </div>
              </Tooltip>
            );
          })}
        </nav>

        <div className="h-4" />

        {/* Admin Info Footer */}
        {(!collapsed || (isSmallScreen && isSidebarOpen)) && (
          <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-3 min-w-[240px] bg-transparent dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {/* Admin Profile */}
            <div className="flex items-center gap-3 text-center p-3 rounded-lg bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-gray-700 dark:to-gray-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400 flex items-center justify-center text-white font-bold text-lg">A</div>
              <div className="flex flex-col items-start text-left flex-1">
                <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">Admin</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Quản trị viên</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-3 space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="text-xs text-blue-700 dark:text-blue-400">Người dùng mới</span>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-400">+24</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <span className="text-xs text-green-700 dark:text-green-400">Giao dịch hôm nay</span>
                <span className="text-sm font-bold text-green-700 dark:text-green-400">12</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                <span className="text-xs text-purple-700 dark:text-purple-400">Khóa học active</span>
                <span className="text-sm font-bold text-purple-700 dark:text-purple-400">48</span>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Hệ thống</span>
                <span className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-600 dark:text-green-400 font-medium">Hoạt động</span>
                </span>
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Version 2.1.0 • Cập nhật: 22/10/2024</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
