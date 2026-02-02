import { useState, useEffect } from 'react';
import { IconFilter, IconX, IconChevronDown, IconChevronUp, IconLayoutGrid, IconListDetails } from '@tabler/icons-react';
import { Collapse, MenuItem, Select, Slider, Tooltip } from '@mui/material';
import axios from 'axios';
import { formatVND } from '@/utils';
import { useAuthStore } from '@/hooks/useAuthStore';

interface CourseFilterProps {
  onFilterChange: (filters: FilterValues) => void;
  currentFilters: FilterValues;
  sortOption: string;
  onSortChange: (value: string) => void;
  layout: 'grid' | 'list';
  onLayoutChange: (value: 'grid' | 'list') => void;
  sortOptions: { value: string; label: string }[];
}

export interface FilterValues {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  state?: string;
  purchaseStatus?: string;
  comboId?: string;
  categoryId?: string;
}

const MAX_PRICE = 10000000;

export default function CourseFilter({ onFilterChange, currentFilters, sortOption, onSortChange, layout, onLayoutChange, sortOptions }: CourseFilterProps) {
  const { authData } = useAuthStore();
  const isLoggedIn = !!authData;

  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterValues>(currentFilters);
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [combos, setCombos] = useState<{ combo_id: string; combo_name: string }[]>([]);
  const [categories, setCategories] = useState<{ category_id: string; title: string }[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([Number(currentFilters.minPrice) || 0, Number(currentFilters.maxPrice) || MAX_PRICE]);
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const priceOptions = [
    { label: '< 500k', min: 0, max: 499999 },
    { label: '500k - 2tr', min: 500000, max: 1999999 },
    { label: '2tr - 5tr', min: 2000000, max: 4999999 },
    { label: '5tr - 10tr', min: 5000000, max: 9999999 },
    { label: '>10tr', min: 10000000, max: MAX_PRICE },
  ];

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const coursesRes = await axios.get('/api/course');
      const uniqueStates = [...new Set(coursesRes.data.map((c: any) => c.state))].filter(Boolean);
      setStates([{ value: '', label: 'Tất cả trạng thái' }, ...(uniqueStates as string[]).map((state) => ({ value: state, label: state }))]);

      const combosRes = await axios.get('/api/combo');
      setCombos(combosRes.data.filter((c: any) => !c.del_flg));

      const categoriesRes = await axios.get('/api/category');
      setCategories(categoriesRes.data.filter((c: any) => !c.del_flg));
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(localFilters);
    }, 200);
    return () => clearTimeout(timer);
  }, [localFilters.name]);

  const handleSelectChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleNameChange = (value: string) => {
    setLocalFilters((prev) => ({ ...prev, name: value }));
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    setSelectedRange(null);
  };

  const handlePriceCommit = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    const newFilters = {
      ...localFilters,
      minPrice: min === 0 ? '' : String(min),
      maxPrice: max === MAX_PRICE ? '' : String(max),
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const emptyFilters: FilterValues = { name: '', minPrice: '', maxPrice: '', state: '', comboId: '', categoryId: '' };
    setLocalFilters(emptyFilters);
    setPriceRange([0, MAX_PRICE]);
    onFilterChange(emptyFilters);
    setIsOpen(true);
    setSelectedRange(null);
  };

  const countActiveFilters = () => {
    let count = 0;
    const { name, state, comboId, categoryId, minPrice, maxPrice } = currentFilters;
    if (name) count++;
    if (state) count++;
    if (comboId) count++;
    if (categoryId) count++;
    if (minPrice || maxPrice) count++;
    return count;
  };

  const activeCount = countActiveFilters();
  const hasActiveFilters = activeCount > 0;

  const selectStyles = {
    borderRadius: '4px',
    fontSize: { xs: 12, md: 14 },
    bgcolor: 'background.paper',
    color: 'text.primary',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#8b5cf6' },
    '& .MuiSelect-icon': { color: '#6b7280', '.dark &': { color: '#9ca3af' } },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db', borderWidth: 1, '.dark &': { borderColor: '#b3bcccff' } },
    '.MuiSelect-select': {
      py: { xs: '4px', md: '6px' },
      px: { xs: '8px', md: '12px' },
      backgroundColor: '#fff',
      color: '#111827',
      '.dark &': { backgroundColor: '#48525fff', color: '#f3f4f6', borderColor: '#b3bcccff' },
    },
  };

  const menuItemStyles = {
    fontSize: { xs: 12, md: 14 },
    '&:hover': { backgroundColor: '#ede9fe', color: '#030008ff' },
    '&.Mui-selected': { backgroundColor: '#ddd6fe', color: '#000000ff' },
    '&.Mui-selected:hover': { backgroundColor: '#ddd6fe', color: '#000000ff' },
  };

  return (
    <div className="xl:mb-5 md:mb-0">
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center gap-1.5 md:gap-2 focus:outline-none px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl border transition-all duration-200 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
          <IconFilter className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="font-medium text-xs md:text-sm">Bộ lọc</span>
          {hasActiveFilters && <span className="px-1 py-0.5 text-[10px] md:text-xs rounded-full bg-violet-500 text-white min-w-[16px] text-center">{activeCount}</span>}
          {isOpen ? <IconChevronUp className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <IconChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" />}
        </button>

        <div className="flex-1"></div>

        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <div className="px-2 py-1.5 md:px-3 md:py-2 bg-gradient-to-r from-violet-500 to-violet-600 text-white text-xs md:text-sm font-medium whitespace-nowrap hidden sm:inline-block">Sắp xếp</div>
          <Select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            size="small"
            variant="outlined"
            MenuProps={{ PaperProps: { sx: { bgcolor: '#fff', color: '#111827', '.dark &': { bgcolor: '#1f2937', color: '#f3f4f6' } } } }}
            sx={{
              minWidth: { xs: 120, sm: 140, md: 180 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              color: 'inherit',
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiSelect-select': {
                py: { xs: '6px', md: '8.5px' },
                px: { xs: '8px', md: '12px' },
                backgroundColor: '#fff',
                color: '#111827',
                '.dark &': { backgroundColor: '#48525fff', color: '#f3f4f6', borderColor: '#b3bcccff' },
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
          <div className="relative inline-flex items-center dark:bg-gray-800 rounded-md p-0.5 md:p-1 shadow-sm border-gray-300 dark:border-gray-700 flex-shrink-0 h-[32px] md:h-[36px]">
            <div className="absolute top-0.5 md:top-1 bottom-0.5 md:bottom-1 bg-gradient-to-r from-violet-500 to-violet-600 rounded-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg" style={{ width: 'calc(50% - 4px)', left: layout === 'grid' ? '4px' : 'calc(50% + 0px)' }} />
            <Tooltip title="Grid view">
              <button onClick={() => onLayoutChange('grid')} className={`relative z-10 p-1 md:p-1 rounded-md transition-all duration-300 flex items-center justify-center ${layout === 'grid' ? 'text-white scale-105' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <IconLayoutGrid className="w-4 h-4 md:w-4 md:h-4" />
              </button>
            </Tooltip>
            <Tooltip title="List view">
              <button onClick={() => onLayoutChange('list')} className={`relative z-10 p-1 md:p-1 rounded-md transition-all duration-300 flex items-center justify-center ${layout === 'list' ? 'text-white scale-105' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <IconListDetails className="w-4 h-4 md:w-4 md:h-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Collapse in={isOpen}>
        <div className="mt-2 md:mt-3 p-2 md:p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            <div className="lg:col-span-3">
              <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1 text-black dark:text-violet-300">Tìm kiếm khóa học</label>
              <input
                type="text"
                placeholder="Nhập tên khóa học..."
                value={localFilters.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onFilterChange(localFilters);
                }}
                className="w-full px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none dark:focus:ring-violet-800 transition text-xs md:text-sm"
              />
            </div>

            {isLoggedIn && (
              <div>
                <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1 text-black dark:text-violet-300">Trạng thái học</label>
                <Select value={localFilters.purchaseStatus || ''} onChange={(e) => handleSelectChange('purchaseStatus', e.target.value)} fullWidth size="small" displayEmpty MenuProps={{ PaperProps: { sx: { bgcolor: '#fff', color: '#111827', '.dark &': { bgcolor: '#1f2937', color: '#f3f4f6' } } } }} sx={selectStyles}>
                  <MenuItem value="" sx={menuItemStyles}>
                    Tất cả
                  </MenuItem>
                  <MenuItem value="activated" sx={menuItemStyles}>
                    Đã kích hoạt
                  </MenuItem>
                  <MenuItem value="purchased_not_activated" sx={menuItemStyles}>
                    Đã mua (chưa kích hoạt)
                  </MenuItem>
                  <MenuItem value="not_purchased" sx={menuItemStyles}>
                    Chưa mua
                  </MenuItem>
                </Select>
              </div>
            )}

            <div className="lg:col-span-3">
              <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1 text-black dark:text-violet-300">Khoảng giá</label>
              <div className="px-1 md:px-2">
                <Slider value={priceRange} onChange={handlePriceChange} onChangeCommitted={handlePriceCommit} valueLabelDisplay="auto" valueLabelFormat={formatVND} min={0} max={MAX_PRICE} step={100000} sx={{ color: '#8b5cf6', height: { xs: 3, md: 4 }, '& .MuiSlider-thumb': { height: { xs: 14, md: 16 }, width: { xs: 14, md: 16 }, backgroundColor: '#8b5cf6', '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 6px rgba(139, 92, 246, 0.16)' } }, '& .MuiSlider-track': { height: { xs: 3, md: 4 }, backgroundColor: '#8b5cf6' }, '& .MuiSlider-rail': { height: { xs: 3, md: 4 }, backgroundColor: '#d1d5db' }, '& .MuiSlider-valueLabel': { fontSize: { xs: 11, md: 14 }, fontWeight: 600, backgroundColor: '#8b5cf6' } }} />
                <div className="flex justify-between text-[11px] md:text-sm text-gray-600 dark:text-gray-400 mb-1.5 md:mb-2">
                  <span>{formatVND(priceRange[0])}</span>
                  <span>{formatVND(priceRange[1])}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1">
                  {priceOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => {
                        setPriceRange([option.min, option.max]);
                        handlePriceCommit(null as any, [option.min, option.max]);
                        setSelectedRange(option.label);
                      }}
                      className={`px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-sm rounded-sm border border-violet-400 text-black hover:bg-violet-100 dark:border-violet-600 dark:text-violet-300 dark:hover:bg-violet-900/30 transition ${selectedRange === option.label ? 'bg-violet-100 border-violet-500 text-black dark:bg-violet-900/30 dark:text-white' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1 text-black dark:text-violet-300">Combo</label>
              <Select value={localFilters.comboId || ''} onChange={(e) => handleSelectChange('comboId', e.target.value)} fullWidth size="small" displayEmpty MenuProps={{ PaperProps: { sx: { bgcolor: '#fff', color: '#111827', '.dark &': { bgcolor: '#1f2937', color: '#f3f4f6' } } } }} sx={selectStyles}>
                <MenuItem value="" sx={menuItemStyles}>
                  Tất cả combo
                </MenuItem>
                {combos.map((combo) => (
                  <MenuItem key={combo.combo_id} value={combo.combo_id} sx={menuItemStyles}>
                    {combo.combo_name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1 text-black dark:text-violet-300">Danh mục</label>
              <Select value={localFilters.categoryId || ''} onChange={(e) => handleSelectChange('categoryId', e.target.value)} fullWidth size="small" displayEmpty MenuProps={{ PaperProps: { sx: { bgcolor: '#fff', color: '#111827', '.dark &': { bgcolor: '#1f2937', color: '#f3f4f6' } } } }} sx={selectStyles}>
                <MenuItem value="" sx={menuItemStyles}>
                  Tất cả danh mục
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_id} sx={menuItemStyles}>
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1 text-black dark:text-violet-300">Trạng thái</label>
              <Select value={localFilters.state || ''} onChange={(e) => handleSelectChange('state', e.target.value)} fullWidth size="small" displayEmpty MenuProps={{ PaperProps: { sx: { bgcolor: '#fff', color: '#111827', '.dark &': { bgcolor: '#1f2937', color: '#f3f4f6' } } } }} sx={selectStyles}>
                {states.map((state) => (
                  <MenuItem key={state.value} value={state.value} sx={menuItemStyles}>
                    {state.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center justify-end mt-2 md:mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
              <button onClick={handleReset} className="inline-flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-xs md:text-sm">
                <IconX className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}
