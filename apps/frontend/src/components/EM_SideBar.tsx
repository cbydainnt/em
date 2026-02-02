import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconNumber10, IconHome2, IconCertificate, IconBook, IconCarambola, IconCalendarWeek, IconBooks } from '@tabler/icons-react';
import ToeicIcon from '../assets/toeic-ic.svg';
import IeltsIcon from '../assets/ielts.svg';
import EM_Contact from './EM_Contact';
import EM_Community from './EM_Community';
import EM_Knowledge from './EM_Knowledge';
import EM_Policy from './EM_Policy';
import EM_Profile from './EM_Profile';
import axios from 'axios';
import EM_TeacherProfile from './EM_TeacherProfile';
import { useThemeStore } from '@/hooks/useThemeEventStore';
type SidebarProps = {
  headerHeight: number;
  isSidebarOpen: boolean;
  onSidebarClose: () => void;
  onCategorySelect?: (key: string | null) => void;
  selectedCategory?: string | null;
};

export default function Sidebar({ headerHeight, isSidebarOpen, onSidebarClose, onCategorySelect, selectedCategory }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);
  const { theme, fetchTheme } = useThemeStore();
  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => setExpanded(isExpanded ? panel : false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialIcons = [<IconNumber10 size={22} stroke={1.5} />, <IconBook size={22} stroke={1.5} />, <IconCertificate size={22} stroke={1.5} />, <img src={ToeicIcon} alt="TOEIC" style={{ width: 22, height: 22 }} />, <img src={IeltsIcon} alt="IELTS" style={{ width: 22, height: 22 }} />, <IconCarambola size={22} stroke={1.5} />];

  const [learningMenus, setLearningMenus] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/category', {
          signal: controller.signal,
          timeout: 8000,
        });

        if (!mounted) return;
        const data = res.data;

        setLearningMenus((prevMenus) => {
          const newMenus = data.map((cat: any, index: number) => {
            const prev = prevMenus[index];
            return {
              label: cat.title ?? cat.name ?? `Danh mục ${index + 1}`,
              sort_order: cat.sort_order ?? index + 1,
              icon: prev?.icon ?? initialIcons[index] ?? <IconBook size={22} stroke={1.5} />,
              path: `/category/${cat.id ?? index + 1}`,
            };
          });
          newMenus.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
          return newMenus;
        });
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.error('Error fetching categories:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchTheme();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const getAnimation = () => {
    switch (theme) {
      case 'christmas':
        return 'nguoi-tuyet';
      case 'newyear':
        return 'mua-lan';
      case 'independence':
        return 'vay-co';
      default:
        return '';
    }
  };

  // --- Menu chính ---
  const menuItems = [
    { label: 'Trang chủ', icon: <IconHome2 size={22} stroke={1.5} />, path: '/' },
    ...learningMenus, // danh mục động
    { label: 'Lịch học và live', icon: <IconCalendarWeek size={22} stroke={1.5} />, path: '/lich-hoc' },
    { label: 'Sách', icon: <IconBooks size={22} stroke={1.5} />, path: '/tat-ca-sach' },
  ];

  return (
    <aside
      className={`
    fixed left-0 z-50 w-[270px]
    flex flex-col shadow-md
    transition-transform duration-300 ease-in-out
    scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
    transform
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    bg-gradient-to-b from-violet-50 via-pink-50 to-violet-100
    border-r border-violet-200
    dark:border-gray-700
  `}
      style={{
        top: headerHeight,
        height: `calc(100vh - ${headerHeight}px)`,
        background: 'rgb(var(--bg-primary))',
      }}
    >
      <div className="flex flex-col h-full overflow-y-auto py-1">
        {/* Menu chính */}
        <nav className="mt-3 flex flex-col flex-shrink-0 gap-2 px-1">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <CircularProgress size={28} thickness={4} color="secondary" />
            </div>
          ) : (
            menuItems.map((item) => {
              const isLearningMenu = learningMenus.some((menu) => menu.label === item.label);
              const isActive = isLearningMenu ? selectedCategory === item.label : !selectedCategory && location.pathname === item.path;

              return (
                <Tooltip key={item.label} title={item.label} placement="right">
                  <div
                    key={item.label}
                    onClick={() => {
                      if (isLearningMenu) {
                        if (onCategorySelect) onCategorySelect(item.label);
                      } else {
                        window.scrollTo(0, 0);
                        navigate(item.path);
                        if (onCategorySelect) onCategorySelect(null);
                      }
                      onSidebarClose();
                    }}
                    className={`group flex items-center cursor-pointer rounded-xl transform transition-all ease-in-out px-1 py-1
                    ${isActive ? 'bg-gradient-to-r from-violet-400/70 to-fuchsia-200/50 dark:from-lavender-200/30 dark:to-fuchsia-400/30 text-violet-700 dark:text-gray-100 shadow-sm -translate-y-0.5' : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-300/60 hover:to-fuchsia-200/50 dark:hover:from-lavender-200/20 dark:hover:to-fuchsia-400/30 hover:text-violet-700 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5'}`}
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

                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: isActive ? 600 : 500,
                        noWrap: false,
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
                  </div>
                </Tooltip>
              );
            })
          )}
        </nav>

        <div className="h-4" />
        {/* Footer Giảng viên */}
        {isSidebarOpen && (
          // <div className="flex-grow dark:border-gray-700 px-0 pb-0 pt-3 min-w-[240px] bg-transparent dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex-shrink-0">
          <div className={`relative flex-grow dark:border-gray-700 px-0 pb-0 pt-3 min-w-[240px] bg-transparent dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex-shrink-0 ${getAnimation()}`}>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700 p-3 min-w-[240px] bg-transparent dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex-shrink-0">
              <EM_TeacherProfile />
            </div>
            {/* Icon mạng xã hội */}
            <div className="flex justify-center gap-3 mt-3">
              <EM_Profile />
            </div>

            {/* Accordion */}
            <div className="mt-4 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-full">
              {[{ title: 'Cộng đồng' }, { title: 'Kiến thức' }, { title: 'Liên hệ' }, { title: 'Chính sách' }].map((section, i) => (
                <Accordion
                  key={i}
                  expanded={expanded === `panel${i}`}
                  onChange={handleAccordionChange(`panel${i}`)}
                  disableGutters
                  elevation={0}
                  className="
                    text-gray-800 dark:text-gray-200
                    border-b border-gray-200 dark:border-gray-600
                    transition-all duration-300
                    hover:bg-gray-50 dark:hover:bg-gray-900 w-full
                  "
                  sx={{ background: 'var(--bg-primary)' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon className="text-gray-600 dark:text-gray-300" />} className="hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors">
                    <span className="text-sm font-semibold">{section.title}</span>
                  </AccordionSummary>
                  <AccordionDetails className="w-full bg-transparent !shadow-none !border-0">
                    {section.title === 'Cộng đồng' && <EM_Community />}
                    {section.title === 'Liên hệ' && <EM_Contact />}
                    {section.title === 'Kiến thức' && <EM_Knowledge />}
                    {section.title === 'Chính sách' && <EM_Policy />}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
