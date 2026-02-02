import DefaultLayout from '@/layouts/default-layout';
import { useEffect, useState, useMemo } from 'react';
import { Box, Grid, InputAdornment, Pagination, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import CourseItem from '@/components/EM_GenerateCourseItem';
import SidebarCourse from '@/components/EM_SideBarCourse';
import { useAuthStore } from '@/hooks/useAuthStore';
import axios from 'axios';
import CourseExpiryLogger from './component/CourseExpiryLogger';
import { IconSearch } from '@tabler/icons-react';

interface Course {
  course_id: string;
  course_name: string;
  course_price: string;
  course_original_price: string;
  src: string;
  course_description: string;
  created_at: string;
  state: string;
  total_lessons?: number;
  total_duration?: number;
  avg_rating?: number;
  total_reviews?: number;
  enrolled_at?: string;
  expired_date?: string | null;
  active_code?: string;
  type?: 'favorite' | 'activated' | 'inactive';
}

interface CoursesResponse {
  favorite: Course[];
  activated: Course[];
  inactive: Course[];
}

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<'favorite' | 'activated' | 'inactive'>('activated');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const [coursesData, setCoursesData] = useState<CoursesResponse>({
    favorite: [],
    activated: [],
    inactive: [],
  });

  const { authData } = useAuthStore();
  const itemsPerPage = 8;
  const [courseOwnership, setCourseOwnership] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!authData?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get<CoursesResponse>(`/api/course/my-courses/${authData.id}`);
        if (response.data) {
          setCoursesData(response.data);
          await checkCourseOwnership(response.data.inactive, authData.id);
        }
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setCoursesData({
          favorite: [],
          activated: [],
          inactive: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [authData?.id]);

  const checkCourseOwnership = async (courses: Course[], userId: string) => {
    const ownershipMap: Record<string, boolean> = {};

    for (const course of courses) {
      try {
        const response = await axios.get(`/api/active-code/check-status`, {
          params: {
            user_id: userId,
            course_id: course.course_id,
          },
        });

        ownershipMap[course.course_id] = response.data.success && response.data.hasUnusedCode;
      } catch (error) {
        console.error(`Error checking ownership for course ${course.course_id}:`, error);
        ownershipMap[course.course_id] = false;
      }
    }

    setCourseOwnership(ownershipMap);
  };

  // Filter courses based on search text
  const getFilteredCourses = (courses: Course[]): Course[] => {
    if (!searchText.trim()) return courses;

    const searchTerm = searchText.toLowerCase().trim();
    return courses.filter((course) => course.course_name.toLowerCase().includes(searchTerm));
  };

  // Memoized filtered data
  const filteredData = useMemo(() => {
    let data: Course[] = [];

    if (activeTab === 'favorite') {
      data = getFilteredCourses(coursesData.favorite);
    } else if (activeTab === 'activated') {
      // 20251211 VietNH-Start If remaining day < 1, remove this from array
      coursesData.activated = coursesData.activated.filter((item: any) => item.remaining_days === null || item.remaining_days >= 1);
      // 20251211 VietNH-End If remaining day < 1, remove this from array
      data = getFilteredCourses(coursesData.activated);
    } else {
      const inactiveCourses = coursesData.inactive.filter((course) => courseOwnership[course.course_id] === true);
      data = getFilteredCourses(inactiveCourses);
    }

    return data;
  }, [activeTab, coursesData, courseOwnership, searchText]);

  // Paginated display data
  const getDisplayData = (): Course[] => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredData.slice(startIdx, endIdx);
  };

  const getTotalPages = (): number => {
    return Math.ceil(filteredData.length / itemsPerPage);
  };

  const getTabCounts = () => {
    const favoriteFiltered = getFilteredCourses(coursesData.favorite);
    const activatedFiltered = getFilteredCourses(coursesData.activated);
    const inactiveFiltered = getFilteredCourses(coursesData.inactive.filter((course) => courseOwnership[course.course_id] === true));

    return {
      favorite: favoriteFiltered.length,
      activated: activatedFiltered.length,
      inactive: inactiveFiltered.length,
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchText('');
    setCurrentPage(1);
  };

  const handleTabChange = (tab: 'favorite' | 'activated' | 'inactive') => {
    setActiveTab(tab);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const counts = getTabCounts();

  if (loading) {
    return (
      <DefaultLayout sidebarId="sidebar2">
        {({ headerHeight }: any) => (
          <div className="flex justify-center items-center h-full" style={{ marginTop: headerHeight }}>
            <div className="text-lg">Đang tải khóa học...</div>
          </div>
        )}
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout sidebarId="sidebar2">
      {({ collapsed, isSidebarOpen, setSidebarOpen, isSmallScreen, headerHeight }: any) => (
        <div className="flex h-full">
          {isSidebarOpen && isSmallScreen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} style={{ top: headerHeight }} />}

          <SidebarCourse headerHeight={headerHeight} collapsed={collapsed} isSmallScreen={isSmallScreen} isSidebarOpen={isSidebarOpen} onSidebarClose={() => setSidebarOpen(false)} selectedCombo="my-course" />

          {/* Vùng nội dung chính */}
          <div
            className="flex-1 overflow-y-auto transition-all duration-100 ease-in-out"
            style={{
              marginLeft: isSmallScreen ? 0 : collapsed ? 0 : 260,
              backgroundColor: 'rgb(var(--bg-primary))',
            }}
          >
            <main className="flex justify-center flex-1 p-4 sm:p-6 overflow-y-auto">
              <div className="w-full h-full rounded-2xl shadow p-4 sm:p-6">
                {/* Header với tìm kiếm */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Khóa học của tôi</h1>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 border-b border-gray-300 dark:border-gray-700 px-0 py-3">
                  <button className={`flex items-center gradient-underline gap-2 px-2 sm:px-4 py-2 sm:py-4 rounded-t-lg text-sm sm:text-base transition-colors ${activeTab === 'activated' ? 'active text-purple-600 dark:text-purple-500 ' : 'text-gray-600 dark:text-gray-400 hover:text-purple-400'}`} onClick={() => handleTabChange('activated')}>
                    <CheckCircleIcon fontSize="small" />
                    Đã kích hoạt ({counts.activated})
                  </button>
                  <button className={`flex items-center gradient-underline gap-2 px-2 sm:px-4 py-2 sm:py-4 rounded-t-lg text-sm sm:text-base transition-colors ${activeTab === 'inactive' ? 'active text-purple-600 dark:text-purple-500 ' : 'text-gray-600 dark:text-gray-400 hover:text-purple-400'}`} onClick={() => handleTabChange('inactive')}>
                    <LockIcon fontSize="small" />
                    Chưa kích hoạt ({counts.inactive})
                  </button>
                  <button className={`flex items-center gradient-underline gap-2 px-2 sm:px-4 py-2 sm:py-4 rounded-t-lg text-sm sm:text-base transition-colors ${activeTab === 'favorite' ? 'active text-purple-600 dark:text-purple-500 ' : 'text-gray-600 dark:text-gray-400 hover:text-purple-400'}`} onClick={() => handleTabChange('favorite')}>
                    <FavoriteIcon fontSize="small" />
                    Yêu thích ({counts.favorite})
                  </button>
                </div>
                <div className="mt-4 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="w-full max-w-sm ">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder={`Tìm kiếm khóa học...`}
                        value={searchText}
                        onChange={handleSearch}
                        sx={{
                          borderRadius: '12px',

                          /* ===== ROOT INPUT ===== */
                          '& .MuiOutlinedInput-root': {
                            color: '#111827',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#555',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#888',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#6366f1',
                            },
                          },

                          /* ===== DARK MODE ===== */
                          '.dark & .MuiOutlinedInput-root': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4b5563',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#9ca3af',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#a78bfa',
                            },
                          },

                          /* ===== INPUT TEXT ===== */
                          '& .MuiOutlinedInput-input': {
                            color: '#111827',
                          },
                          '.dark & .MuiOutlinedInput-input': {
                            color: '#f9fafb',
                          },

                          /* ===== ICON ===== */
                          '& .MuiSvgIcon-root': {
                            color: '#6b7280',
                          },
                          '.dark & .MuiSvgIcon-root': {
                            color: '#d1d5db',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconSearch size={18} className="text-gray-400 dark:text-gray-300" />
                            </InputAdornment>
                          ),
                          inputProps: {
                            className: 'placeholder:text-gray-500 dark:placeholder:text-gray-300',
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Nội dung từng tab */}
                <Box className="p-4 sm:p-7 rounded-xl transition-colors min-h-96">
                  {getDisplayData().length === 0 ? (
                    <div className="text-center py-12">
                      {searchText ? (
                        <>
                          <IconSearch className="mx-auto text-gray-400 mb-4" size={48} />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Không tìm thấy khóa học nào phù hợp</h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Không có khóa học nào có tên chứa "{searchText}" trong danh mục {activeTab === 'activated' ? 'đã kích hoạt' : activeTab === 'inactive' ? 'chưa kích hoạt' : 'yêu thích'}
                          </p>
                          <button onClick={clearSearch} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                            Xóa tìm kiếm
                          </button>
                        </>
                      ) : (
                        <>
                          <LockIcon className="mx-auto text-gray-400 mb-4" style={{ fontSize: 48 }} />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {activeTab === 'activated' && 'Chưa có khóa học nào được kích hoạt'}
                            {activeTab === 'favorite' && 'Chưa có khóa học yêu thích'}
                            {activeTab === 'inactive' && 'Chưa có khóa học chưa kích hoạt'}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">{activeTab === 'inactive' ? 'Các khóa học bạn đã mua nhưng chưa kích hoạt sẽ hiển thị ở đây' : 'Hãy khám phá và đăng ký các khóa học mới nhé!'}</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <Grid container spacing={5}>
                        {getDisplayData().map((item: Course, idx: number) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.course_id || idx}>
                            <CourseItem loading={false} courseId={item.course_id} courseName={item.course_name} thumbnail={item.src} price={item.course_price} originalPrice={item.course_original_price} description={item.course_description} createAt={item.created_at} state={item.state} />
                          </Grid>
                        ))}
                      </Grid>

                      {/* Pagination */}
                      {getTotalPages() > 1 && (
                        <div className="flex justify-center mt-6">
                          <Pagination
                            count={getTotalPages()}
                            page={currentPage}
                            onChange={(_, page) => setCurrentPage(page)}
                            color="primary"
                            showFirstButton
                            showLastButton
                            sx={{
                              /* text + icon mặc định */
                              '& .MuiPaginationItem-root': {
                                color: '#111827',
                              },

                              /* selected (light) */
                              '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#6366f1',
                                color: '#ffffff',
                              },

                              '& .MuiPaginationItem-root:hover': {
                                backgroundColor: '#e5e7eb',
                              },

                              /* ===== DARK MODE ===== */
                              '.dark & .MuiPaginationItem-root': {
                                color: '#d1d5db',
                              },

                              '.dark & .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#8b5cf6',
                                color: '#ffffff',
                              },

                              '.dark & .MuiPaginationItem-root:hover': {
                                backgroundColor: '#374151',
                              },

                              /* icon first / last / prev / next */
                              '.dark & .MuiPaginationItem-icon': {
                                color: '#d1d5db',
                              },
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </Box>
              </div>
            </main>
            <CourseExpiryLogger courses={coursesData.activated} userId={authData?.id} />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
