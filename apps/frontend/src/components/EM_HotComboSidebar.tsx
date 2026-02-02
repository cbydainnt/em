import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Collapse, Divider, Tooltip } from '@mui/material';
import axios from 'axios';
import { IconCategory } from '@tabler/icons-react';

type SidebarProps = {
  headerHeight: number;
  collapsed: boolean;
  isSmallScreen?: boolean;
  isSidebarOpen?: boolean;
  onSidebarClose?: () => void;
  onComboSelect?: (combo: { combo_id: string; combo_name: string; combo_price: number } | 'all' | null) => void;
  selectedCombo?: { combo_id: string; combo_name: string; combo_price: number } | 'all' | null;
};

export default function HotComboSidebar({ headerHeight, collapsed, isSmallScreen, isSidebarOpen, onSidebarClose, onComboSelect, selectedCombo }: SidebarProps) {
  const navigate = useNavigate();

  const [openCategory, setOpenCategory] = useState<boolean>(true);
  const [combos, setCombos] = useState<{ combo_id: string; combo_name: string; price: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  useEffect(() => {
    async function fetchHotCombos() {
      try {
        setLoading(true);
        const res = await axios.get('/api/combo/hot');
        const data = res.data;

        const sorted = data.filter((x: any) => x && typeof x.combo_name === 'string').sort((a: any, b: any) => a.combo_name.localeCompare(b.combo_name, 'vi', { sensitivity: 'base' }));

        const mapped = sorted.map((combo: any) => ({
          combo_id: combo.combo_id,
          combo_name: combo.combo_name,
          price: combo.price,
        }));

        setCombos(mapped);
      } catch (err) {
        console.error('Error fetching hot combos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHotCombos();
  }, []);

  useEffect(() => {
    if (!combos.length) return;

    const urlComboID = new URLSearchParams(location.search).get('comboID');
    if (urlComboID) return;

    const first = combos[0];

    onComboSelect?.({
      combo_id: first.combo_id,
      combo_name: first.combo_name,
      combo_price: first.price,
    });

    navigate(`?comboID=${first.combo_id}`, { replace: true });
  }, [combos]);

  const handleButtonClick = (event: React.MouseEvent, combo: { combo_id: string; combo_name: string; price: number }) => {
    event.stopPropagation();

    if (isSmallScreen && onSidebarClose) onSidebarClose();

    if (onComboSelect) {
      onComboSelect({
        combo_id: combo.combo_id,
        combo_name: combo.combo_name,
        combo_price: combo.price,
      });
    }
    navigate(`?comboID=${combo.combo_id}`);
    window.scrollTo(0, 0);
  };

  const showText = !collapsed || isSmallScreen;

  return (
    (isSmallScreen ? isSidebarOpen : !collapsed) && (
      <aside
        className={`
    ${isSmallScreen ? 'relative' : 'fixed'} left-0 top-[${headerHeight}px]
    flex flex-col shadow-md transition-all ease-in-out duration-300
    ${isSmallScreen ? `z-50 transform ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}` : ''}
  `}
        style={{
          width: isSmallScreen ? '100%' : 350,
          height: isSmallScreen ? 'auto' : `calc(100vh - ${headerHeight}px)`,
          borderTopRightRadius: isSmallScreen ? '30px' : '0',
          maskImage: isSmallScreen ? 'linear-gradient(to bottom, black 95%, transparent 100%)' : 'none',
          WebkitMaskImage: isSmallScreen ? 'linear-gradient(to bottom, black 95%, transparent 100%)' : 'none',
        }}
      >
        <div className={`flex flex-col h-full py-1 gap-2 mx-3 my-3 overflow-y-auto transition-opacity duration-300`}>
          <Tooltip title={collapsed && !isSmallScreen ? 'Danh sách Hot Combo' : ''} placement="right">
            <div
              onClick={() => {
                setOpenCategory((prev) => !prev);
              }}
              className={`group flex items-center cursor-pointer rounded-xl transition-all ease-in-out
      ${collapsed && !isSmallScreen ? 'justify-center p-2' : 'px-3 py-3'}
      bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 
      dark:from-lavender-200 dark:to-fuchsia-400/30
      text-violet-700 dark:text-gray-100 shadow-sm
    `}
            >
              {/* Icon */}
              <div className="rounded-full p-2 bg-white/80 dark:bg-gray-700 mr-3">
                <IconCategory size={22} stroke={1.5} />
              </div>

              {/* Text */}
              {showText && <span className="text-[15px] font-semibold">Danh sách Hot Combo</span>}
            </div>
          </Tooltip>

          {/* --- DANH SÁCH COMBO --- */}
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <Divider className="group my-2 border-gray-300 dark:border-gray-600" />
            <div className="space-y-1 mt-1">
              {loading ? (
                <div className="text-center text-gray-500 text-sm italic">Đang tải...</div>
              ) : (
                combos.map((combo) => {
                  const isActive = selectedCombo && selectedCombo !== 'all' && selectedCombo.combo_id === combo.combo_id;
                  return (
                    <Tooltip key={combo.combo_id} title={collapsed && !isSmallScreen ? combo.combo_name : ''} placement="right">
                      <div
                        onClick={(e) => handleButtonClick(e, combo)}
                        className={`group cursor-pointer transition-all rounded-xl 
    ${collapsed && !isSmallScreen ? 'justify-center p-2' : 'px-3 py-3'}
    ${isActive ? 'bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 dark:from-lavender-200 dark:to-fuchsia-400/30 text-violet-700 dark:text-gray-100 shadow-sm -translate-y-0.5' : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-300/60 hover:to-fuchsia-200/50 dark:hover:from-lavender-200 dark:hover:to-fuchsia-400/30 hover:text-violet-700 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5'}`}
                      >
                        {showText && (
                          <div className="flex items-center justify-between w-full">
                            {/* Tên combo */}
                            <Box
                              className={`flex-1 px-4 py-3 rounded-xl text-[15px] font-medium `}
                              sx={{
                                background: isActive ? 'var(--active-icon-bg)' : 'var(--inactive-icon-bg)',
                                color: '#fff',
                              }}
                            >
                              {combo.combo_name}
                            </Box>

                            {/* Giá tiền */}
                            <div
                              className={`
        px-4 py-3 text-[15px] font-semibold whitespace-nowrap
        ${isActive ? 'text-violet-700 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200'}
      `}
                            >
                              {combo.price.toLocaleString('vi-VN')} VNĐ
                            </div>
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  );
                })
              )}
            </div>
          </Collapse>

          <div className="flex-grow" />
        </div>
      </aside>
    )
  );
}
