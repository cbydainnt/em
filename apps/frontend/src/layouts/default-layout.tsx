import { ReactNode, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './components/EM_Header';
import { useSidebarState } from '@/hooks/EM_SidebarStateContext';

type DefaultLayoutProps = {
  children: ReactNode | ((props: { collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>>; isSidebarOpen: boolean; setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; isSmallScreen: boolean; headerHeight: number }) => ReactNode);
  hideSidebarToggle?: boolean;
  sidebarId?: 'sidebar1' | 'sidebar2';
};

export default function DefaultLayout({ children, hideSidebarToggle = false, sidebarId = 'sidebar1', customToggleHandler }: DefaultLayoutProps & { customToggleHandler?: () => void }) {
  const headerHeight = 64;
  const { states, setSidebarState } = useSidebarState();

  const collapsedFromContext = states[sidebarId];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleToggleCollapse = () => {
    if (customToggleHandler) {
      customToggleHandler();
    } else {
      if (isSmallScreen) {
        setIsSidebarOpen((prev) => !prev);
      } else {
        setSidebarState(sidebarId, !collapsedFromContext);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header collapsed={collapsedFromContext} onToggleCollapse={handleToggleCollapse} showSidebarToggle={!hideSidebarToggle} customToggleHandler={customToggleHandler} />

      <main
        className="flex-1 overflow-auto"
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          backgroundColor: 'rgb(var(--bg-primary))',
        }}
      >
        {typeof children === 'function'
          ? children({
              collapsed: collapsedFromContext,
              setCollapsed: (value) => setSidebarState(sidebarId, typeof value === 'function' ? value(collapsedFromContext) : value),
              isSidebarOpen: sidebarId === 'sidebar1' ? isSidebarOpen : isSmallScreen ? isSidebarOpen : false,
              setSidebarOpen: setIsSidebarOpen,
              isSmallScreen,
              headerHeight,
            })
          : children}
      </main>
    </div>
  );
}
