import { Grid, Stack, Pagination, CircularProgress, Box } from '@mui/material';
import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import DefaultLayout from '@/layouts/default-layout';
import SidebarCourse from '@/components/EM_SideBarCourse';
import CourseItem from '@/components/EM_GenerateCourseItem';
import CourseItemList from '@/components/EM_GenerateCourseItemList';
import { formatVND } from '@/utils';
import axios from 'axios';
import CourseFilter, { FilterValues } from './CourseFilter';
import { useComboStatus } from '@/hooks/useComboStatus';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface CoursesProps {
  comboID?: string;
  comboName?: string;
  comboPrice?: number;
}

export default function Courses(props: CoursesProps) {
  const [selectedCombo, setSelectedCombo] = useState<{ combo_id: string; combo_name: string; combo_price: number } | 'all' | null>('all');
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [searchParams] = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const { hasPurchased, loading: purchaseLoading } = useComboStatus(selectedCombo && selectedCombo !== 'all' ? selectedCombo.combo_id : null);

  const [filters, setFilters] = useState<FilterValues>({
    name: '',
    minPrice: '',
    maxPrice: '',
    state: '',
    comboId: '',
    categoryId: '',
  });

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = 0;
    }
  }, [page]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSelectedCombo('all');
      setFilters((prev) => ({ ...prev, name: search }));
    }
  }, [searchParams]);

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'rated', label: 'Đánh giá cao nhất' },
    { value: 'priceLow', label: 'Giá: Thấp đến Cao' },
    { value: 'priceHigh', label: 'Giá: Cao đến Thấp' },
    { value: 'az', label: 'A-Z' },
  ];

  const sortedCourses = useMemo(() => {
    let sorted = [...courses];

    switch (sortOption) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'rated':
        sorted.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
        break;
      case 'priceLow':
        sorted.sort((a, b) => (a.course_price || 0) - (b.course_price || 0));
        break;
      case 'priceHigh':
        sorted.sort((a, b) => (b.course_price || 0) - (a.course_price || 0));
        break;
      case 'az':
        sorted.sort((a, b) => (a.course_name || '').localeCompare(b.course_name || ''));
        break;
      default:
        break;
    }

    return sorted;
  }, [courses, sortOption]);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedCombo && selectedCombo !== 'all') {
      navigate(`/thanh-toan?comboID=${props.comboID ?? selectedCombo.combo_id}`);
    }
  };

  const isAllCourses = selectedCombo === 'all' || selectedCombo === null;

  const totalPages = Math.ceil(sortedCourses.length / pageSize);
  const currentCourses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedCourses.slice(start, start + pageSize);
  }, [sortedCourses, page]);

  const filterCourses = (courses: any[]) => {
    const timeNow = Date.now();
    return courses.filter((item) => {
      return !(item.access_type === 3 && new Date(item.access_expire_at).getTime() < timeNow);
    });
  };

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        if (selectedCombo === 'all' || selectedCombo === null) {
          const params = new URLSearchParams();

          if (filters.purchaseStatus) {
            params.append('status', filters.purchaseStatus);
          }

          if (filters.name) params.append('name', filters.name);
          if (filters.minPrice) params.append('minPrice', filters.minPrice);
          if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
          if (filters.state) params.append('state', filters.state);
          if (filters.comboId) params.append('comboId', filters.comboId);
          if (filters.categoryId) params.append('categoryId', filters.categoryId);

          if (sortOption === 'priceLow') {
            params.append('sortBy', 'course_price');
            params.append('order', 'asc');
          } else if (sortOption === 'priceHigh') {
            params.append('sortBy', 'course_price');
            params.append('order', 'desc');
          } else if (sortOption === 'rated') {
            params.append('sortBy', 'avg_rating');
            params.append('order', 'desc');
          } else {
            params.append('sortBy', 'created_at');
            params.append('order', 'desc');
          }

          params.append('page', '1');
          params.append('limit', '1000');

          const res = await axios.get(`/api/course/search?${params.toString()}`);
          const filteredCourses = filterCourses(res.data);
          setCourses(filteredCourses);
        } else {
          const res = await axios.get(`/api/combo/${selectedCombo.combo_id}/courses`);
          const filteredCourses = filterCourses(res.data);
          setCourses(filteredCourses);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [selectedCombo, filters, sortOption]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setPage(1);
  };

  const combo = useMemo(() => {
    if (selectedCombo && selectedCombo !== 'all') {
      return {
        id: Number(selectedCombo.combo_id),
        name: selectedCombo.combo_name,
        price: selectedCombo.combo_price,
      };
    }
  }, [selectedCombo]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = 0;
  }, [selectedCombo]);

  return (
    <DefaultLayout sidebarId="sidebar2">
      {({ collapsed, isSidebarOpen, setSidebarOpen, isSmallScreen, headerHeight }: any) => (
        <div className="flex h-full">
          {isSidebarOpen && isSmallScreen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} style={{ top: headerHeight }} />}

          <SidebarCourse
            headerHeight={headerHeight}
            collapsed={collapsed}
            isSmallScreen={isSmallScreen}
            isSidebarOpen={isSidebarOpen}
            onSidebarClose={() => setSidebarOpen(false)}
            onComboSelect={(combo) => {
              setSelectedCombo(combo);
              setPage(1);
            }}
            selectedCombo={selectedCombo}
          />
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto transition-all duration-100 ease-in-out" style={{ marginLeft: isSmallScreen ? 0 : collapsed ? 0 : 270 }}>
            <Box className="p-5 sm:p-6 md:p-8" sx={{ backgroundColor: 'rgb(var(--bg-primary))' }}>
              {/* Tiêu đề */}
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 my-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-gradient-underline relative inline-block pb-1 text-xl font-bold uppercase">{selectedCombo === 'all' ? 'Tất cả khóa học' : (selectedCombo?.combo_name ?? '')}</h3>
                  <span className="ml-2 text-l text-gray-500 dark:text-gray-400">({courses.length} khóa học)</span>
                </div>
              </div>

              {/* Filter with Sort and Layout */}
              <div className="grid my-1 xl:my-2 grid-cols-1 xl:grid-cols-[1fr_auto] items-center">
                {isAllCourses && <CourseFilter onFilterChange={handleFilterChange} currentFilters={filters} sortOption={sortOption} onSortChange={setSortOption} layout={layout} onLayoutChange={setLayout} sortOptions={sortOptions} />}
                <div className="xl:inline-flex items-center justify-end gap-2 sm:gap-3 mt-2 xl:mt-0">
                  <div className="mt-2 mb-2 xl:mb-2">
                    {/* Button Mua Combo */}
                    {!isAllCourses && !loading && !hasPurchased && (
                      <button
                        onClick={handleButtonClick}
                        disabled={purchaseLoading}
                        className={`inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full text-white font-semibold 
            bg-gradient-to-r from-violet-600 to-fuchsia-400
            btn-hover-gradient hover:from-violet-500 hover:to-fuchsia-300 transform hover:scale-[1.03] shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap
            ${purchaseLoading ? 'animate-pulse' : ''}`}
                      >
                        {purchaseLoading ? (
                          <span>🔍 Đang kiểm tra...</span>
                        ) : (
                          <>
                            <span>🛒 Mua combo</span>
                            <div className="h-4 sm:h-5 border-l border-white/60" />
                            <span className="text-sm sm:text-base font-bold">{formatVND(combo?.price)}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Danh sách khóa học */}
              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex justify-center items-center py-6 mt-6">
                    <CircularProgress size={45} thickness={4} color="secondary" />
                  </div>
                </div>
              ) : (
                <>
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    {currentCourses.map((item, index) => (
                      <Grid item xs={12} sm={layout === 'grid' ? 6 : 12} md={layout === 'grid' ? 4 : 12} lg={layout === 'grid' ? 3 : 12} key={item.course_id || index}>
                        {layout === 'grid' ? <CourseItem loading={false} courseId={item.course_id} courseName={item.course_name} thumbnail={item.thumbnail} price={item.course_price} originalPrice={item.course_original_price} description={item.course_description} createAt={item.created_at} state={item.state} /> : <CourseItemList loading={false} courseId={item.course_id} title={item.course_name} src={item.thumbnail} price={item.course_price} state={item.state} originalPrice={item.course_original_price} description={item.course_description} createAt={item.created_at} />}
                      </Grid>
                    ))}
                  </Grid>
                  {totalPages > 1 && (
                    <Stack alignItems="center" mt={6}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(event, value) => {
                          setPage(value);
                          if (event.currentTarget instanceof HTMLElement) {
                            event.currentTarget.blur();
                          }
                        }}
                        color="secondary"
                        className="rounded-xl px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
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
                </>
              )}
            </Box>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
