// components/ComboSection.tsx
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import CourseItem from '@/components/EM_GenerateCourseItem';
import { useComboStatus } from '@/hooks/useComboStatus';
import { IconArrowRight } from '@tabler/icons-react';
import { useThemeStore } from '@/hooks/useThemeEventStore';
interface ComboSectionProps {
  category: any;
  selectedComboId: string | null;
  courses: any[];
  onComboSelect: (comboId: string) => void;
  onPurchaseClick: (event: React.MouseEvent, comboId: string) => void;
  categoryRef: (el: HTMLDivElement | null) => void;
  loading?: boolean;
  isLoggedIn: boolean;
  imageUrl?: string;
}

const ComboSection: React.FC<ComboSectionProps> = ({ category, selectedComboId, courses, onComboSelect, onPurchaseClick, categoryRef, loading = false, isLoggedIn, imageUrl }) => {
  const selectedCombo = category.combos?.find((item: any) => item.combo.combo_id === selectedComboId)?.combo;

  const { hasPurchased, loading: purchaseLoading } = useComboStatus(selectedComboId);
  const showPurchaseButton = selectedCombo && !loading && (!isLoggedIn || !hasPurchased);
  const { theme, fetchTheme } = useThemeStore();
  const handleComboClick = async (comboId: string) => {
    if (selectedComboId === comboId) return;
    onComboSelect(comboId);
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  return (
    <div ref={categoryRef} className="mb-12 ml-4">
      <div className="flex items-center gap-5 mb-5">
        {theme != 'default' && imageUrl && (
          <div className="relative group">
            <img src={imageUrl} alt={category.title} className="relative w-24 h-24 object-cover transition duration-300 group-hover:scale-105" />
          </div>
        )}
        <h3 className="relative inline-block pb-2 pt-2 text-xl sm:text-2xl text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 after:content-[''] after:block after:w-20 after:h-[2px] after:bg-purple-600 after:absolute after:bottom-0 after:left-0 dark:after:bg-red-600 uppercase">{category.title}</h3>
      </div>

      {/* Combo Selection Buttons */}
      <div className="flex flex-wrap gap-8 mb-6 ml-4">
        {category.combos?.map((item: any) => {
          const isSelected = selectedComboId === item.combo.combo_id;
          return (
            <button
              key={item.combo.combo_id}
              onClick={() => handleComboClick(item.combo.combo_id)}
              className={`relative group flex items-center text-[17px] font-semibold 
                  transition-all duration-200
                  ${isSelected ? 'text-purple-700' : 'text-gray-600'}
                  hover:text-purple-700`}
            >
              <span
                className={`absolute left-[-1rem] transition-all duration-200 ease-in-out
                  ${isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
                `}
              >
                <IconArrowRight size={16} />
              </span>
              <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-2">{item.combo.combo_name}</span>
            </button>
          );
        })}
      </div>

      {/* Purchase Button & Course List */}

      {showPurchaseButton && (
        <div className="mb-6">
          <button
            onClick={(event) => onPurchaseClick(event, selectedCombo.combo_id)}
            disabled={purchaseLoading}
            className={`inline-flex items-center gap-3 px-5 py-2 rounded-full text-white font-semibold 
              bg-gradient-to-r from-violet-600 to-fuchsia-400
              transform shadow-md transition-all duration-300
              btn-hover-gradient hover:from-violet-500 hover:to-fuchsia-300 hover:scale-[1.03] hover:shadow-lg
              ${purchaseLoading ? 'animate-pulse' : ''}
            `}
          >
            {purchaseLoading ? (
              <span>🔍 Đang kiểm tra...</span>
            ) : (
              <>
                <span>🛒 Mua combo</span>
                <div className="h-5 border-l border-white/60" />
                <span className="text-base font-bold">{selectedCombo.price?.toLocaleString('vi-VN')}₫</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Course Grid */}
      {selectedCombo && !loading && courses.length > 0 && (
        <div className="list-courses dark:text-gray-200">
          <Grid container spacing={{ xs: 2, sm: 2, md: 3, lg: 4 }}>
            {courses.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CourseItem loading={false} courseId={item.course_id} courseName={item.course_name} thumbnail={item.thumbnail} price={item.course_price} originalPrice={item.course_original_price} description={item.course_description} createAt={item.created_at} state={item.state} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p>Đang tải khóa học...</p>
        </div>
      )}
    </div>
  );
};

export default ComboSection;
