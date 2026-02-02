// App.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import DefaultLayout from '@/layouts/default-layout';
import Sidebar from '@/components/EM_SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ComboSection from '@/components/EM_ComboSection';
import CourseExpiryLogger from './EM_courses/component/CourseExpiryLogger';
import { useAuthStore } from '@/hooks/useAuthStore';
import Banner from '@/components/EM_Banner';
import Stats from '@/components/EM_Stats';
import { useThemeStore } from '@/hooks/useThemeEventStore';
import { Box } from '@mui/material';
const imageLists = {
  default: [],
  newyear: [
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/352-3527680_mai-png-hoa-mai-vng-png-clipart.png',
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/anh-bong-hoa-anh-dao-png_102501655.png',
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/banh-chung-vector-8_39e2fee8df2d408dbe0fdb41782e101e.png',
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/pngtree-a-lunar-new-year-citrus-plant-for-luck-png-image_14987595-removebg-preview.png',
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/pngtree-new-year-firecracker-plum-blossom-branch-vector-picture-png-image_4063892-removebg-preview.png',
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/pngtree-red-envelope-new-year-money-money-new-year-png-image_400382-removebg-preview.png',
    'api/file/view/englishmaster/system_banner/theme/new_year/newyear_category/pngtree-vietnam-tết-dưa-hấu-watermelon-png-image_5934011-removebg-preview.png',
  ],
  independence: [],
  christmas: ['api/file/view/englishmaster/system_banner/theme/christ_mast/christmast_category/cay-thong.png', 'api/file/view/englishmaster/system_banner/theme/christ_mast/christmast_category/doi-tat.png', 'api/file/view/englishmaster/system_banner/theme/christ_mast/christmast_category/hop-qua.png', 'api/file/view/englishmaster/system_banner/theme/christ_mast/christmast_category/keo-giang-sinh.png', 'api/file/view/englishmaster/system_banner/theme/christ_mast/christmast_category/nguoi-tuyet.png', 'api/file/view/englishmaster/system_banner/theme/christ_mast/christmast_category/ong-khoi.png'],
} as const;
export default function App() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { authData } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [comboCourse, setCourseByComboAndCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedCombos, setSelectedCombos] = useState<Record<string, string>>({});
  const [coursesByCombo, setCoursesByCombo] = useState<Record<string, any[]>>({});
  const { theme, fetchTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleCategorySelect = (categoryName: string | null, shouldScroll: boolean = true) => {
    if (selectedCategory === categoryName) return;
    setSelectedCategory(categoryName);

    if (!shouldScroll) return;

    if (categoryName === null) {
      contentRef.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    setTimeout(() => {
      const target = categoryRefs.current[categoryName];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Fetch combo data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/combo/group-by-category');
        let data = (res.data ?? [])
          .slice()
          .sort((a: any, b: any) => a.sort_order - b.sort_order)
          .map((cat: any) => ({
            ...cat,
            combos: (cat.combos ?? []).filter((c: any) => c.combo && c.combo.del_flg === false),
          }))
          .filter((cat: any) => cat.combos.length > 0);
        setCourseByComboAndCategory(data);
      } catch (err) {
        console.error('Call api get error :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchTheme();
  }, []);

  const themeImages = (imageLists as any)[theme] || imageLists.default;

  // Initialize selected combos
  useEffect(() => {
    const initialSelected: Record<string, string> = {};
    const promises: Promise<void>[] = [];

    comboCourse.forEach((cat: any) => {
      if (cat.combos?.length > 0) {
        const firstComboId = cat.combos[0].combo.combo_id;
        initialSelected[cat.category_id] = firstComboId;

        // Preload courses for first combo
        if (!coursesByCombo[firstComboId]) {
          const promise = axios
            .get(`/api/course/with-combo/${firstComboId}`)
            .then((res) => {
              setCoursesByCombo((prev) => ({
                ...prev,
                [firstComboId]: res.data,
              }));
            })
            .catch((err) => {
              console.error(`[Error] Load courses for combo ${firstComboId}:`, err);
            });
          promises.push(promise);
        }
      }
    });

    setSelectedCombos(initialSelected);
  }, [comboCourse]);

  // Handle combo selection
  const handleComboSelect = useCallback(
    async (categoryId: string, comboId: string) => {
      if (selectedCombos[categoryId] === comboId) return;

      setSelectedCombos((prev) => ({
        ...prev,
        [categoryId]: comboId,
      }));

      // Load courses if not cached
      if (!coursesByCombo[comboId]) {
        try {
          const res = await axios.get(`/api/course/with-combo/${comboId}`);
          setCoursesByCombo((prev) => ({
            ...prev,
            [comboId]: res.data,
          }));
        } catch (err) {
          console.error(`[Error] Load courses for combo ${comboId}:`, err);
        }
      }
    },
    [selectedCombos, coursesByCombo],
  );

  const handlePurchaseClick = (event: React.MouseEvent, comboID: string) => {
    event.stopPropagation();
    navigate(`/thanh-toan?comboID=${comboID}`);
  };

  return (
    <DefaultLayout sidebarId="sidebar1" customToggleHandler={() => setIsSidebarOpen((prev) => !prev)}>
      {({ headerHeight }: any) => (
        <div className="flex h-full">
          {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsSidebarOpen(false)} style={{ top: headerHeight }} />}

          <Sidebar headerHeight={headerHeight} isSidebarOpen={isSidebarOpen} onSidebarClose={() => setIsSidebarOpen(false)} onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />

          <div
            className="flex-1 overflow-y-auto transition-all duration-100 ease-in-out bg-violet-50/40 dark:bg-gray-900"
            style={{
              marginLeft: 0,
            }}
            ref={contentRef}
          >
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : comboCourse.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p>Không có khóa học nào</p>
              </div>
            ) : (
              <Box
                className="flex-1 transition-all duration-300 ease-in-out"
                sx={{
                  backgroundColor: 'rgb(var(--bg-primary))',
                }}
              >
                <Banner></Banner>
                <Stats></Stats>
                <div className="p-5 sm:p-6 md:p-8">
                  {comboCourse.map((category, index) => {
                    const img = themeImages[index % themeImages.length];

                    return <ComboSection key={category.category_id} category={category} imageUrl={img} selectedComboId={selectedCombos[category.category_id]} courses={coursesByCombo[selectedCombos[category.category_id]] || []} onComboSelect={(comboId) => handleComboSelect(category.category_id, comboId)} onPurchaseClick={handlePurchaseClick} categoryRef={(el) => (categoryRefs.current[category.title] = el)} loading={loading} isLoggedIn={!!authData} />;
                  })}
                </div>
              </Box>
            )}
          </div>
          <CourseExpiryLogger courses={authData?.courses || []} userId={authData?.user?.user_id || null} />
        </div>
      )}
    </DefaultLayout>
  );
}
