import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListItemIcon, ListItemText, Collapse, Tooltip, Divider, Box } from '@mui/material';
import { IconCategory, IconAddressBook } from '@tabler/icons-react';
import LockClockIcon from '@mui/icons-material/LockClock';
import { useAuthStore } from '@/hooks/useAuthStore';
import axios from 'axios';
import { useThemeStore } from '@/hooks/useThemeEventStore';
type SidebarProps = {
  headerHeight: number;
  collapsed: boolean;
  isSmallScreen?: boolean;
  isSidebarOpen?: boolean;
  onSidebarClose?: () => void;
  onComboSelect?: (combo: { combo_id: string; combo_name: string; combo_price: number } | 'all' | null) => void;
  selectedCombo?: { combo_id: string; combo_name: string; combo_price: number } | 'all' | null | 'my-course';
};

export default function SidebarCourse({ headerHeight, collapsed, isSmallScreen, isSidebarOpen, onSidebarClose, onComboSelect, selectedCombo }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { authData } = useAuthStore();
  const [openCategory, setOpenCategory] = useState<boolean>(true);
  const handleToggleCategory = () => setOpenCategory((prev) => !prev);

  const [combos, setCombos] = useState<{ combo_id: string; combo_name: string; price: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchTheme } = useThemeStore();
  useEffect(() => {
    async function fetchCombos() {
      try {
        const res = await axios.get('/api/combo');
        const data = res.data;

        interface Combo {
          combo_id: string;
          combo_name: string;
          price: number;
        }

        const sorted: Combo[] = (data as Combo[]).filter((x) => x && typeof x.combo_name === 'string').sort((a, b) => a.combo_name.localeCompare(b.combo_name, 'vi', { sensitivity: 'base' }));

        setCombos(sorted);
      } catch (err: any) {
        console.error('Error fetching combos:', err.message);
        if (err.response) {
          console.error('Response:', err.response.data);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCombos();
    fetchTheme();
  }, []);

  useEffect(() => {
    if (location.pathname === '/khoa-hoc-cua-toi') {
      setOpenCategory(false);
    } else if (location.pathname.startsWith('/tat-ca-khoa-hoc')) {
      setOpenCategory(true);
    } else if (location.pathname.includes('reserve')) setOpenCategory(false);
  }, [location.pathname]);

  const menuMain = [
    ...(authData
      ? [
          { label: 'Danh mục khóa học', icon: <IconCategory size={22} stroke={1.5} />, path: '#category' },
          { label: 'Khóa học của tôi', icon: <IconAddressBook size={22} stroke={1.5} />, path: '/khoa-hoc-cua-toi' },
        ]
      : []),
    ...(authData ? [{ label: 'Bảo lưu khóa học', icon: <LockClockIcon sx={{ width: 20, height: 20, strokeWidth: 1.5 }} />, path: '/bao-luu' }] : []),
  ];

  const showText = !collapsed || isSmallScreen;

  return (
    (isSmallScreen ? isSidebarOpen : !collapsed) && (
      <aside
        className={`
          fixed left-0 top-[${headerHeight}px]
          flex flex-col shadow-md transition-all ease-in-out duration-300
          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
          ${isSmallScreen ? `z-50 transform ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}` : 'md:flex'}
          dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700
        `}
        style={{
          background: 'var(--bg-primary)',
          width: 270,
          height: `calc(100vh - ${headerHeight}px)`,
          borderTopRightRadius: isSmallScreen ? '30px' : '0',
          maskImage: isSmallScreen ? 'linear-gradient(to bottom, black 95%, transparent 100%)' : 'none',
          WebkitMaskImage: isSmallScreen ? 'linear-gradient(to bottom, black 95%, transparent 100%)' : 'none',
        }}
      >
        <div
          className={`flex flex-col flex-shrink-0 justify-between h-full py-1 gap-2 mx-3 my-3 transition-opacity duration-300 ${!showText && !isSmallScreen ? 'opacity-0' : 'opacity-100'} overflow-y-auto`}
          style={{
            willChange: 'opacity',
          }}
        >
          {menuMain.map((item) => {
            const isCategoryMenu = item.label === 'Danh mục khóa học';
            const isActive = (!isCategoryMenu && location.pathname === item.path) || (isCategoryMenu && location.pathname.startsWith('/tat-ca-khoa-hoc'));

            return (
              <Tooltip key={item.label} title={collapsed && !isSmallScreen ? item.label : ''} placement="right">
                <div
                  onClick={() => {
                    if (isCategoryMenu) {
                      handleToggleCategory();
                      if (onComboSelect) onComboSelect('all');
                      navigate('/tat-ca-khoa-hoc');
                      window.scrollTo(0, 0);
                    } else {
                      navigate(item.path);
                      if (isSmallScreen && onSidebarClose) onSidebarClose();
                      if (onComboSelect) onComboSelect(null);
                    }
                  }}
                  className={`group flex items-center cursor-pointer rounded-xl transform transition-all ease-in-out 
                ${collapsed && !isSmallScreen ? 'justify-center p-2' : 'px-1 py-1'}
                ${isActive ? 'bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 dark:from-lavender-200 dark:to-fuchsia-400/30 text-violet-700 dark:text-gray-100 shadow-sm -translate-y-0.5' : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-300/60 hover:to-fuchsia-200/50 dark:hover:from-lavender-200 dark:hover:to-fuchsia-400/30 hover:text-violet-700 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5'}`}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: 1.5, justifyContent: 'center' }}>
                    <Box
                      sx={{
                        borderRadius: '50%',
                        p: 1,
                        transition: 'all 0.2s ease-in-out',
                        background: isActive ? 'var(--active-icon-bg)' : 'var(--inactive-icon-bg)',
                        color: isActive ? 'rgb(255,240,150)' : '#fff',

                        '&:hover': !isActive
                          ? {
                              background: 'linear-gradient(to right, rgb(150,0,0), rgb(100,0,0))',
                              color: 'rgb(255,240,150)',
                            }
                          : {},
                      }}
                    >
                      {item.icon}
                    </Box>
                  </ListItemIcon>

                  {showText && (
                    <div
                      className={`transition-opacity ease-in-out
                      ${collapsed && !isSmallScreen ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 15,
                          fontWeight: isActive ? 600 : 500,
                        }}
                        sx={{
                          transition: 'color 0.18s, font-weight 0.18s',
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
                    </div>
                  )}
                </div>
              </Tooltip>
            );
          })}

          {/* --- DANH MỤC CON --- */}
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <Divider className="group my-2 border-gray-300 dark:border-gray-600" />

            <div className="space-y-1 mt-5">
              {loading ? (
                <div className="text-center text-gray-500 text-sm italic">Đang tải...</div>
              ) : (
                <>
                  {/* TẤT CẢ KHÓA HỌC */}
                  <Tooltip key="all-courses" title={collapsed && !isSmallScreen ? 'Tất cả khóa học' : ''} placement="right">
                    <div
                      key="all-courses"
                      onClick={() => {
                        if (isSmallScreen && onSidebarClose) onSidebarClose();
                        if (onComboSelect) onComboSelect('all');
                        navigate('/tat-ca-khoa-hoc');
                        window.scrollTo(0, 0);
                      }}
                      className={`group flex items-center cursor-pointer rounded-xl transform transition-all ease-in-out
              ${collapsed && !isSmallScreen ? 'justify-center p-2' : 'px-2 py-2'}
              ${selectedCombo === 'all' ? 'bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 dark:from-lavender-200 dark:to-fuchsia-400/30 text-violet-700 dark:text-gray-100 shadow-sm -translate-y-0.5' : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-300/60 hover:to-fuchsia-200/50 dark:hover:from-lavender-200 dark:hover:to-fuchsia-400/30 hover:text-violet-700 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5'}
            `}
                    >
                      {showText && (
                        <ListItemText
                          primary="Tất cả khóa học"
                          primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: selectedCombo === 'all' ? 600 : 500,
                          }}
                          sx={{
                            transition: 'color 0.18s, font-weight 0.18s',
                            '.MuiTypography-root': {
                              color: selectedCombo === 'all' ? '#a21ad8ff' : 'inherit',
                            },
                            '.group:hover & .MuiTypography-root': {
                              color: '#a21ad8ff',
                              fontWeight: 600,
                            },
                            '.dark & .MuiTypography-root': {
                              color: selectedCombo === 'all' ? '#e5e7eb !important' : 'inherit',
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

                  {/* --- DANH SÁCH COMBO --- */}
                  {combos.map((combo) => {
                    const isActive = selectedCombo && selectedCombo !== 'all' && selectedCombo !== 'my-course' && selectedCombo.combo_id === combo.combo_id;
                    return (
                      <Tooltip key={combo.combo_id} title={collapsed && !isSmallScreen ? combo.combo_name : ''} placement="right">
                        <div
                          onClick={() => {
                            if (isSmallScreen && onSidebarClose) onSidebarClose();
                            if (onComboSelect) onComboSelect({ combo_id: combo.combo_id, combo_name: combo.combo_name, combo_price: combo.price });
                            if (location.pathname !== '/tat-ca-khoa-hoc') navigate('/tat-ca-khoa-hoc');
                            window.scrollTo(0, 0);
                          }}
                          className={`group flex items-center cursor-pointer rounded-xl transform transition-all ease-in-out 
                  ${collapsed && !isSmallScreen ? 'justify-center p-2' : 'px-2 py-2'}
                  ${isActive ? 'bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 dark:from-lavender-200 dark:to-fuchsia-400/30 text-violet-700 dark:text-gray-100 shadow-sm -translate-y-0.5' : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-300/60 hover:to-fuchsia-200/50 dark:hover:from-lavender-200 dark:hover:to-fuchsia-400/30 hover:text-violet-700 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5'}
                `}
                        >
                          {showText && (
                            <ListItemText
                              primary={combo.combo_name}
                              primaryTypographyProps={{
                                fontSize: 15,
                                fontWeight: isActive ? 600 : 500,
                              }}
                              sx={{
                                transition: 'color 0.18s, font-weight 0.18s',
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
                </>
              )}
            </div>
          </Collapse>

          <div className="flex-grow" />
        </div>
      </aside>
    )
  );
}
