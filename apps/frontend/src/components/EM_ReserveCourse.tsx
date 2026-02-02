import DefaultLayout from '@/layouts/default-layout';
import SidebarCourse from '@/components/EM_SideBarCourse';
import { Box, Button, CardContent, CardMedia, FormControl, IconButton, MenuItem, Pagination, Select, Stack, Tooltip, Typography } from '@mui/material';
import DynamicBreadcrumb from './EM_BreadCrumb';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useEffect, useState } from 'react';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RestoreIcon from '@mui/icons-material/Restore';
import axios from 'axios';
import ConfirmDialog from './EM_ConfirmDialog';
import { logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
interface Course {
  id: string;
  status: number;
  enrolled_at: string;
  expired_date: string;
  total_paused_days: number;
  pause_count: number;
  course: {
    course_id: string;
    course_name: string;
    course_description: string;
    course_price: number;
    thumbnail: string;
    created_at: string;
  };
}

export default function ReserveCourse() {
  const { authData } = useAuthStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [userCourseId, setUserCourseId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'RESERVE' | 'CANCEL' | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'RESERVED' | 'PAUSED_DONE'>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 10;
  const navigate = useNavigate();
  async function fetchCourse() {
    if (!authData?.id) return;

    try {
      const res = await axios.get(`/api/course/get-reserve-courses/${authData.id}`);
      const filtered = Array.isArray(res.data) ? res.data.filter((item: any) => (item.status === 1 || item.status === 3) && item.expired_date) : [];

      setCourses(filtered);
    } catch (error) {
      console.error('Get reserve course failed: ', error);
    }
  }

  useEffect(() => {
    fetchCourse();
  }, [authData]);

  function formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  }

  function handleReserveCourse(userCourseId: string) {
    setConfirmMessage('Bạn có chắc chắn muốn bảo lưu khóa học này ?');
    setActionType('RESERVE');
    setUserCourseId(userCourseId);
    setConfirmOpen(true);
  }

  function handleCancelReserveCourse(userCourseId: string) {
    setConfirmMessage('Bạn có chắc chắn muốn hủy trạng thái bảo lưu của khóa học này ?');
    setActionType('CANCEL');
    setUserCourseId(userCourseId);
    setConfirmOpen(true);
  }

  const handleReserve = async (userCourseId: string) => {
    try {
      const res = await axios.post(`/api/course/reserve-course`, { userCourseId });
      fetchCourse();
      logClientMessage('Bảo lưu khóa học', `Bạn đã bảo lưu khóa học ${res.data.course.course_name}. Thời hạn bảo lưu là 60 ngày kể từ thời điểm bảo lưu.`, authData.id, UserType.USER, NotificationType.USER_ACTION);
      logClientMessage('Bảo lưu khóa học', `${authData.name} đã bảo lưu khóa học ${res.data.course.course_name}.`, null, UserType.ADMIN, NotificationType.USER_ACTION);
    } catch (error: any) {
      alert(error.response?.data?.message);
      console.error('Reserve course failed: ', error);
    }
  };

  const handleCancelReserve = async (userCourseId: string) => {
    try {
      const res = await axios.post(`/api/course/cancel-reserve-course`, { userCourseId });
      fetchCourse();
      logClientMessage('Hủy bảo lưu khóa học', `Bạn đã hủy bảo lưu khóa học ${res.data.course.course_name}. Tiếp tục vào học ngay thôi nào.`, authData.id, UserType.USER, NotificationType.USER_ACTION);
      logClientMessage('Hủy bảo lưu khóa học', `${authData.name} đã hủy bảo lưu khóa học ${res.data.course.course_name}.`, null, UserType.ADMIN, NotificationType.USER_ACTION);
    } catch (error: any) {
      alert(error.response?.data?.message);
      console.error('Cancel reserve course failed: ', error);
    }
  };

  const filteredCourses = courses.filter((item: any) => {
    switch (filterStatus) {
      case 'ALL':
        return item.status === 1;

      case 'ACTIVE':
        return item.status === 1 && item.total_paused_days < 60 && item.pause_count < 2;

      case 'RESERVED':
        return item.status === 3;

      case 'PAUSED_DONE':
        return item.status === 1 && (item.total_paused_days >= 60 || item.pause_count >= 2);

      default:
        return true;
    }
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const purpleGlow = '109,40,217';

  const handleDetailClick = (courseId: string) => {
    if (courseId) {
      navigate(`/khoa-hoc/${courseId}`);
    }
  };

  return (
    <DefaultLayout sidebarId="sidebar2">
      {({ collapsed, isSidebarOpen, setSidebarOpen, isSmallScreen, headerHeight }: any) => (
        <div className="flex h-full">
          {isSidebarOpen && isSmallScreen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} style={{ top: headerHeight }} />}

          <SidebarCourse headerHeight={headerHeight} collapsed={collapsed} isSmallScreen={isSmallScreen} isSidebarOpen={isSidebarOpen} onSidebarClose={() => setSidebarOpen(false)} selectedCombo="my-course" />

          <div
            className="flex-1 overflow-y-auto transition-all duration-100 ease-in-out"
            style={{
              marginLeft: isSmallScreen ? 0 : collapsed ? 0 : 260,
            }}
          >
            <Box
              sx={{
                px: { xs: 2, md: 2 },
              }}
            >
              <DynamicBreadcrumb isReserveCourse={true} />
            </Box>
            <main className="flex justify-center flex-1 px-6 overflow-y-auto">
              <div className="w-full h-full rounded-2xl p-6 shadow ">
                <Typography variant="h5" sx={{ mb: '1em' }} fontWeight={700}>
                  Bảo lưu khóa học
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <FormControl fullWidth size="small" sx={{ maxWidth: '200px' }}>
                    <Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ccc',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                      }}
                    >
                      <MenuItem value="ALL">Tất cả</MenuItem>
                      <MenuItem value="ACTIVE">Chưa bảo lưu</MenuItem>
                      <MenuItem value="RESERVED">Đang bảo lưu</MenuItem>
                      <MenuItem value="PAUSED_DONE">Đã bảo lưu</MenuItem>
                    </Select>
                  </FormControl>

                  <Tooltip
                    title={<Typography variant="body2">Chế độ bảo lưu giúp bạn tạm dừng khóa học. Bạn có thể thực hiện bảo lưu tối đa 2 lần. Tổng thời gian tích lũy cho cả 2 lần bảo lưu không được vượt quá 60 ngày. Nếu bạn đã bảo lưu đủ 60 ngày (hoặc đã sử dụng hết 2 lần bảo lưu), bạn sẽ không thể bảo lưu thêm. Bạn có thể hủy bảo lưu bất cứ lúc nào để tiếp tục học.</Typography>}
                    placement="right"
                    arrow
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: '#67707eff',
                          color: '#F8FAFC',
                          fontSize: '0.875rem',
                          fontWeight: 400,
                          p: 2,
                          borderRadius: 2,
                          maxWidth: 300,
                          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                        },
                      },
                      arrow: {
                        sx: {
                          color: '#1E293B',
                        },
                      },
                    }}
                  >
                    <IconButton size="small">
                      <HelpOutlineIcon className="dark:text-white" sx={{ color: 'rgb(139, 92, 246)' }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Stack spacing={4}>
                  {currentCourses.map((item) => (
                    <CardContent
                      key={item.id}
                      onClick={() => handleDetailClick(item.course.course_id)}
                      className="dark:text-gray-200"
                      sx={{
                        display: 'flex',
                        flexDirection: {
                          xs: 'column',
                          md: 'row',
                        },
                        gap: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'background-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                        cursor: 'pointer',
                        backgroundColor: 'background.paper',
                        '&:hover': {
                          borderColor: '#C4B5FD',
                          boxShadow: `
        0 4px 12px rgba(${purpleGlow},0.25),
        0 10px 32px rgba(${purpleGlow},0.35)
      `,
                          transform: 'translateY(-2px)',
                        },

                        '.dark &': {
                          backgroundColor: 'rgb(31, 41, 55)',
                          borderColor: 'rgba(255,255,255,0.08)',

                          '&:hover': {
                            borderColor: 'rgba(139,92,246,0.6)',
                            boxShadow: `
          0 6px 20px rgba(${purpleGlow},0.45),
          0 14px 40px rgba(${purpleGlow},0.6)
        `,
                          },
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: {
                            xs: '100%',
                            sm: 340,
                            md: 280,
                          },
                          aspectRatio: '16 / 9',

                          mx: {
                            xs: 'auto',
                            sm: 'auto',
                            md: 0,
                          },

                          display: 'block',
                        }}
                        image={item.course.thumbnail ? (item.course.thumbnail.includes('http') ? item.course.thumbnail : `/api/admin/courses/file/${item.course.thumbnail}`) : ''}
                        alt={item.course.course_name}
                      />
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', minWidth: 0, gap: 1 }}>
                        {/* Name + Description wrapper */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              lineHeight: 1.2,

                              wordBreak: 'break-word',
                              // color: 'rgb(139, 92, 246)',
                              fontSize: '1.5rem',
                            }}
                          >
                            {item.course.course_name}
                          </Typography>

                          {/* Course description */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.2,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              wordBreak: 'break-word',
                              mt: '0.5rem',
                            }}
                            className="dark:text-white"
                          >
                            {item.course.course_description}
                          </Typography>
                        </Box>
                        {/* Expired date */}
                        <Typography variant="body2" sx={{}}>
                          Ngày hết hạn: <span style={{ fontWeight: 600 }}>{formatDate(item.expired_date)}</span>
                        </Typography>

                        <Box sx={{ width: '100%' }}>
                          {/* Display Course Status and Pause Count */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            {item.status === 1 &&
                              (item.total_paused_days >= 60 || item.pause_count == 2 ? (
                                <Button
                                  variant="contained"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  sx={{
                                    width: {
                                      xs: '100%',
                                      sm: 150,
                                    },
                                    height: '36px',
                                    fontSize: '0.85rem',
                                    borderRadius: '6px',
                                    backgroundColor: '#9e9e9e',
                                    cursor: 'not-allowed',
                                    color: 'white',
                                    '&.Mui-disabled': {
                                      backgroundColor: '#9e9e9e',
                                      color: 'white',
                                      opacity: 1,
                                    },
                                    '&:hover': {
                                      backgroundColor: '#9e9e9e',
                                    },

                                    '&:active': {
                                      backgroundColor: '#9e9e9e',
                                      boxShadow: 'none',
                                    },

                                    '&.Mui-focusVisible': {
                                      backgroundColor: '#9e9e9e',
                                    },

                                    '&:focus': {
                                      outline: 'none',
                                    },
                                  }}
                                  startIcon={<PauseCircleIcon />}
                                >
                                  Đã bảo lưu
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReserveCourse(item.id);
                                  }}
                                  sx={{
                                    backgroundColor: 'rgb(37, 202, 113)',
                                    color: 'white',
                                    width: {
                                      xs: '100%',
                                      sm: 120,
                                    },
                                    height: '36px',
                                    padding: '4px 8px',
                                    fontSize: '0.85rem',
                                    borderRadius: '6px',
                                    '&:hover': { backgroundColor: 'rgb(75, 147, 254)' },
                                  }}
                                  startIcon={<PauseCircleIcon />}
                                >
                                  Bảo lưu
                                </Button>
                              ))}

                            {item.status === 3 && (
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelReserveCourse(item.id);
                                }}
                                sx={{
                                  backgroundColor: 'black',
                                  color: 'white',
                                  width: {
                                    xs: '100%',
                                    sm: 150,
                                  },
                                  height: '36px',
                                  padding: '4px 8px',
                                  fontSize: '0.85rem',
                                  borderRadius: '6px',
                                  '&:hover': { backgroundColor: 'rgb(75, 147, 254)' },
                                }}
                                startIcon={<RestoreIcon />}
                              >
                                Hủy bảo lưu
                              </Button>
                            )}

                            {/* Display Pause Count */}
                            <Typography
                              sx={{
                                fontSize: '0.9rem',
                                color: 'gray',
                                whiteSpace: 'nowrap',
                                ml: {
                                  xs: 0,
                                  sm: 2,
                                },
                              }}
                            >
                              Số lần bảo lưu: {item.pause_count} / 2
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardContent>
                  ))}

                  {/* Pagination */}
                  {totalPages > 0 && (
                    <Stack alignItems="center" mt={6}>
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color="secondary"
                        sx={{
                          '& .MuiPaginationItem-root': {
                            color: 'inherit',
                          },
                          '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#8b5cf6',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#7c3aed',
                            },
                          },
                        }}
                      />
                    </Stack>
                  )}
                </Stack>
              </div>
            </main>
          </div>
          <ConfirmDialog
            open={confirmOpen}
            setOpen={setConfirmOpen}
            message={confirmMessage}
            onConfirm={async () => {
              if (userCourseId !== null) {
                if (actionType === 'RESERVE') {
                  await handleReserve(userCourseId);
                } else if (actionType === 'CANCEL') {
                  await handleCancelReserve(userCourseId);
                }
                setConfirmOpen(false);
              } else {
                alert('ID khóa học không hợp lệ.');
              }
            }}
          />
        </div>
      )}
    </DefaultLayout>
  );
}
