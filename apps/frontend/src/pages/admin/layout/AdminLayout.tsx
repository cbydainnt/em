import { ReactNode, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from '@/pages/admin/layout/components/SideBarAdmin';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const headerHeight = 64;
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const handleToggleCollapse = () => {
    if (isSmallScreen) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Admin Header */}
      <AdminHeader collapsed={collapsed} onToggleCollapse={handleToggleCollapse} headerHeight={headerHeight} />

      {/* Layout với Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <AdminSidebar headerHeight={headerHeight} collapsed={collapsed} isSmallScreen={isSmallScreen} isSidebarOpen={isSidebarOpen} onSidebarClose={handleSidebarClose} />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${isSmallScreen ? 'ml-0' : collapsed ? 'ml-[55px]' : 'ml-[270px]'}`}
          style={{
            height: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          {children}
        </main>

        {/* Overlay for mobile */}
        {isSmallScreen && isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleSidebarClose} style={{ top: headerHeight }} />}
      </div>
    </div>
  );
}
