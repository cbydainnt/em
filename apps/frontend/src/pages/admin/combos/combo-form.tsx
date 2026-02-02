import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button, Box, Grid, Snackbar, Alert, InputAdornment, FormControlLabel, Switch, Autocomplete, Chip as MuiChip, Typography, Tooltip, Paper } from '@mui/material';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { IconDeviceFloppy, IconX, IconBook, IconTrash as IconDelete, IconCurrencyDong, } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { ComboType } from '@/utils/enums';

interface IFormInput {
  combo_name: string;
  original_price: number;
  combo_type: number;
  price: number;
  del_flg: boolean;
  courses: string[];
  categories?: string[];
}

const COMBO_TYPES = [
  { value: 1, label: 'Bình thường' },
  { value: 2, label: 'Hot Combo' },
];
interface CourseOption {
  course_id: string;
  course_name: string;
}

interface CategoryOption {
  category_id: string;
  title: string;
}

interface ComboFormDialogProps {
  saved: () => void;
}

const ComboFormDialog = forwardRef(function ComboForm({ saved }: ComboFormDialogProps, ref) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [allCourses, setAllCourses] = useState<CourseOption[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryOption[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<CourseOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [expandedCourse, setExpandedCourse] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      combo_name: '',
      original_price: 0,
      price: 0,
      combo_type: ComboType.NORMAL,
      del_flg: false,
      courses: [],
      categories: [],
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load courses
        const coursesRes = await axios.get('/api/course');
        if (coursesRes.data) {
          setAllCourses(coursesRes.data);
        }

        // Load categories
        const categoriesRes = await axios.get('/api/category');
        if (categoriesRes.data) {
          setAllCategories(categoriesRes.data);
        }
      } catch (error) {
        console.error('Error loading data', error);
      }
    };
    loadData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
    setSelectedCourses([]);
    setSelectedCategories([]);
    setExpandedCourse(false);
    reset();
  };

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      const payload = {
        combo_name: data.combo_name,
        original_price: Number(data.original_price),
        price: Number(data.price),
        combo_type: Number(data.combo_type),
        del_flg: data.del_flg,
        courses: selectedCourses.map((c) => c.course_id),
        categories: selectedCategories.map((c) => c.category_id),
      };

      let response;
      if (id) {
        // Update
        response = await axios.put(`/api/admin/combos/${id}`, payload);
      } else {
        // Create
        response = await axios.post(`/api/admin/combos`, payload);
      }

      if (response.data) {
        setSnackbar({
          open: true,
          message: id ? 'Cập nhật combo thành công' : 'Tạo combo thành công',
          severity: 'success',
        });
        saved();
        handleClose();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const show = async (data: any) => {
    // Reset hoàn toàn về trạng thái mặc định
    reset({
      combo_name: '',
      original_price: 0,
      price: 0,
      combo_type: 1,
      del_flg: false,
      courses: [],
      categories: [],
    });
    setSelectedCourses([]);
    setSelectedCategories([]);
    setExpandedCourse(false);
    setId(undefined);

    if (data) {
      setId(data.combo_id);

      if (data.combo_id) {
        try {
          const response = await axios.get(`/api/admin/combos/${data.combo_id}`);
          const fullData = response.data;

          reset({
            combo_name: fullData.combo_name,
            original_price: fullData.original_price,
            price: fullData.price,
            combo_type: fullData.combo_type || ComboType.NORMAL,
            del_flg: fullData.del_flg,
            courses: fullData.courses?.map((c: any) => c.course_id) || [],
            categories: fullData.categories?.map((c: any) => c.category_id) || [],
          });

          setSelectedCourses(fullData.courses || []);
          setSelectedCategories(fullData.categories || []);
        } catch (error) {
          console.error('Error loading combo details', error);
          setSnackbar({
            open: true,
            message: 'Không thể tải thông tin combo',
            severity: 'error',
          });
        }
      }
    }

    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  const handleCourseChange = (_event: any, value: CourseOption[]) => {
    setSelectedCourses(value);
    setValue(
      'courses',
      value.map((v) => v.course_id),
    );
  };

  const handleCategoryChange = (_event: any, value: CategoryOption[]) => {
    setSelectedCategories(value);
    setValue(
      'categories',
      value.map((v) => v.category_id),
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newSelected = Array.from(selectedCourses);
    const [reorderedItem] = newSelected.splice(result.source.index, 1);
    newSelected.splice(result.destination.index, 0, reorderedItem);

    setSelectedCourses(newSelected);
    setValue(
      'courses',
      newSelected.map((c) => c.course_id),
    );
  };

  const handleDeleteCourse = (courseToDelete: CourseOption) => {
    const newSelected = selectedCourses.filter((c) => c.course_id !== courseToDelete.course_id);
    setSelectedCourses(newSelected);
    setValue(
      'courses',
      newSelected.map((c) => c.course_id),
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <DialogTitle
          className="dark:text-purple-400 font-semibold"
          sx={{
            background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
            borderBottom: '1px solid #e9d5ff',
            color: '#7c3aed',
            padding: '20px 24px 16px',
            '.dark &': {
              background: 'linear-gradient(135deg, #2d1b69 0%, #1f2937 100%)',
              borderBottom: '1px solid #4c1d95',
              color: '#c4b5fd',
            },
          }}
        >
          {id ? 'Chỉnh sửa combo' : 'Tạo combo mới'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '.dark &': {
                color: '#9ca3af',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
            size="small"
          >
            <IconX height={18} width={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            pt: 3,
            bgcolor: 'background.paper',
            '.dark &': {
              bgcolor: '#1f2937',
              borderColor: '#374151',
            },
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* combo_name */}
              <Grid item xs={12}>
                <Controller
                  name="combo_name"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập tên combo',
                    minLength: {
                      value: 3,
                      message: 'Tên phải có ít nhất 3 ký tự',
                    },
                    pattern: {
                      value: /^[a-zA-ZÀ-ỹ0-9\s.,!?()\-]+$/,
                      message: 'Tên combo không được chứa ký tự đặc biệt',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tên combo"
                      placeholder="Nhập tên combo"
                      error={!!errors.combo_name}
                      helperText={errors.combo_name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconBook size={20} className="dark:text-gray-400" />
                          </InputAdornment>
                        ),
                        sx: {
                          backgroundColor: '#fff',
                          color: '#111827',
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          '.dark &': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                          '.dark &': {
                            borderColor: '#374151',
                          },
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#8b5cf6',
                          '.dark &': {
                            borderColor: '#8b5cf6',
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* price */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập giá',
                    min: { value: 0, message: 'Giá không được âm' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Giá (VNĐ)"
                      value={field.value === 0 ? '' : field.value.toLocaleString('vi-VN')}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\D/g, '');

                        if (value.length > 1 && value.startsWith('0')) {
                          value = value.replace(/^0+/, '');
                        }

                        const numValue = value === '' ? 0 : parseInt(value, 10) || 0;
                        field.onChange(numValue);
                      }}
                      onBlur={(e) => {
                        if (field.value > 0) {
                          e.target.value = field.value.toLocaleString('vi-VN');
                        }
                      }}
                      onFocus={(e) => {
                        if (field.value > 0) {
                          e.target.value = field.value.toString();
                        }
                      }}
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconCurrencyDong size={20} className="dark:text-gray-400" />
                          </InputAdornment>
                        ),
                        sx: {
                          backgroundColor: '#fff',
                          color: '#111827',
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          '.dark &': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                          '.dark &': {
                            borderColor: '#374151',
                          },
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#8b5cf6',
                          '.dark &': {
                            borderColor: '#8b5cf6',
                          },
                        },
                      }}
                      placeholder="Nhập giá..."
                    />
                  )}
                />
              </Grid>

              {/* original_price */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="original_price"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập giá gốc',
                    min: { value: 0, message: 'Giá không được âm' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Giá gốc (VNĐ)"
                      value={field.value === 0 ? '' : field.value.toLocaleString('vi-VN')}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\D/g, '');

                        if (value.length > 1 && value.startsWith('0')) {
                          value = value.replace(/^0+/, '');
                        }

                        const numValue = value === '' ? 0 : parseInt(value, 10) || 0;
                        field.onChange(numValue);
                      }}
                      onBlur={(e) => {
                        if (field.value > 0) {
                          e.target.value = field.value.toLocaleString('vi-VN');
                        }
                      }}
                      onFocus={(e) => {
                        if (field.value > 0) {
                          e.target.value = field.value.toString();
                        }
                      }}
                      error={!!errors.original_price}
                      helperText={errors.original_price?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconCurrencyDong size={20} className="dark:text-gray-400" />
                          </InputAdornment>
                        ),
                        sx: {
                          backgroundColor: '#fff',
                          color: '#111827',
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          '.dark &': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                          '.dark &': {
                            borderColor: '#374151',
                          },
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#8b5cf6',
                          '.dark &': {
                            borderColor: '#8b5cf6',
                          },
                        },
                      }}
                      placeholder="Nhập giá gốc..."
                    />
                  )}
                />
              </Grid>

              {/* combo_type */}
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    color: '#374151',
                    '.dark &': {
                      color: '#d1d5db',
                    },
                  }}
                >
                  Loại combo
                </Typography>
                <Controller
                  name="combo_type"
                  control={control}
                  rules={{ required: 'Vui lòng chọn loại combo' }}
                  render={({ field }) => (
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      {COMBO_TYPES.map((type) => (
                        <Box
                          key={type.value}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '4px 6px',
                            border: '1px solid',
                            borderColor: field.value === type.value ? (type.value === 2 ? '#f59e0b' : '#8b5cf6') : '#e5e7eb',
                            borderRadius: '10px',
                            backgroundColor: field.value === type.value ? (type.value === 2 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(139, 92, 246, 0.1)') : 'transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: type.value === 2 ? '#f59e0b' : '#8b5cf6',
                              backgroundColor: type.value === 2 ? 'rgba(245, 158, 11, 0.05)' : 'rgba(139, 92, 246, 0.05)',
                            },
                            '.dark &': {
                              borderColor: field.value === type.value ? (type.value === 2 ? '#f59e0b' : '#8b5cf6') : '#4b5563',
                              backgroundColor: field.value === type.value ? (type.value === 2 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(139, 92, 246, 0.2)') : 'transparent',
                              '&:hover': {
                                backgroundColor: field.value === type.value ? (type.value === 2 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(139, 92, 246, 0.3)') : 'rgba(139, 92, 246, 0.05)',
                              },
                            },
                          }}
                          onClick={() => field.onChange(type.value)}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              border: '1px solid',
                              borderColor: field.value === type.value ? (type.value === 2 ? '#f59e0b' : '#8b5cf6') : '#9ca3af',
                              backgroundColor: field.value === type.value ? (type.value === 2 ? '#f59e0b' : '#8b5cf6') : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 2,
                              position: 'relative',
                              '&::after':
                                field.value === type.value
                                  ? {
                                      content: '""',
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      backgroundColor: 'white',
                                    }
                                  : {},
                              '.dark &': {
                                borderColor: field.value === type.value ? (type.value === 2 ? '#f59e0b' : '#8b5cf6') : '#6b7280',
                              },
                            }}
                          />
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              sx={{
                                color: field.value === type.value ? (type.value === 2 ? '#f59e0b' : '#8b5cf6') : '#374151',
                                '.dark &': {
                                  color: field.value === type.value ? (type.value === 2 ? '#fbbf24' : '#a78bfa') : '#d1d5db',
                                },
                              }}
                            >
                              {type.label}
                            </Typography>
                            {type.value === 2 && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: field.value === type.value ? '#f59e0b' : '#6b7280',
                                  '.dark &': {
                                    color: field.value === type.value ? '#fbbf24' : '#9ca3af',
                                  },
                                }}
                              >
                                Combo nổi bật, hiển thị ở vị trí đặc biệt
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                />
                {errors.combo_type && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{
                      mt: 1,
                      display: 'block',
                      '.dark &': {
                        color: '#fca5a5',
                      },
                    }}
                  >
                    {errors.combo_type.message}
                  </Typography>
                )}
              </Grid>

              {/* Select Categories */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={allCategories}
                  getOptionLabel={(option) => option.title}
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Chọn danh mục"
                      placeholder="Tìm kiếm và chọn danh mục"
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          '.dark &': {
                            bgcolor: '#374151',
                            color: '#f3f4f6',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4b5563',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#8b5cf6',
                            },
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          '.dark &': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                      sx={{
                        '.dark & .MuiAutocomplete-popupIndicator': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiAutocomplete-clearIndicator': {
                          color: '#9ca3af',
                        },
                      }}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <MuiChip
                        {...getTagProps({ index })}
                        key={option.category_id}
                        label={option.title}
                        size="small"
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          '.dark &': {
                            bgcolor: '#374151',
                            color: '#d1d5db',
                            border: '1px solid #4b5563',
                            '& .MuiChip-deleteIcon': {
                              color: '#9ca3af',
                              '&:hover': {
                                color: '#d1d5db',
                              },
                            },
                          },
                        }}
                      />
                    ))
                  }
                  // Thêm PaperProps để style dropdown popup
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      sx={{
                        mt: 1,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        '.dark &': {
                          bgcolor: '#1f2937',
                          border: '1px solid #374151',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        },
                      }}
                    />
                  )}
                  // Thêm ListboxProps để style option items
                  ListboxProps={{
                    sx: {
                      maxHeight: 250,
                      '.dark &': {
                        '& .MuiAutocomplete-option': {
                          color: '#d1d5db',
                          '&:hover': {
                            bgcolor: 'rgba(139, 92, 246, 0.1)',
                          },
                          '&[aria-selected="true"]': {
                            bgcolor: 'rgba(139, 92, 246, 0.2)',
                            color: '#c4b5fd',
                            '&.Mui-focused': {
                              bgcolor: 'rgba(139, 92, 246, 0.3)',
                            },
                          },
                          '&.Mui-focused': {
                            bgcolor: 'rgba(139, 92, 246, 0.15)',
                          },
                        },
                      },
                    },
                  }}
                  // Thêm renderOption để custom option item
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      style={{
                        ...props.style,
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <span>{option.title}</span>
                    </li>
                  )}
                  // Optional: Thêm loading và no options text cho dark mode
                  loadingText={
                    <Typography
                      sx={{
                        color: '#6b7280',
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      }}
                    >
                      Đang tải danh mục...
                    </Typography>
                  }
                  noOptionsText={
                    <Typography
                      sx={{
                        color: '#6b7280',
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      }}
                    >
                      Không tìm thấy danh mục
                    </Typography>
                  }
                />
              </Grid>

              {/* Select Courses */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={allCourses}
                  getOptionLabel={(option) => option.course_name}
                  value={selectedCourses}
                  onChange={handleCourseChange}
                  renderTags={() => null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Chọn khóa học"
                      placeholder="Tìm kiếm và chọn khóa học"
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          '.dark &': {
                            bgcolor: '#374151',
                            color: '#f3f4f6',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4b5563',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#8b5cf6',
                            },
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          '.dark &': {
                            color: '#9ca3af',
                          },
                        },
                      }}
                      sx={{
                        '.dark & .MuiAutocomplete-popupIndicator': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiAutocomplete-clearIndicator': {
                          color: '#9ca3af',
                        },
                      }}
                    />
                  )}
                  // Thêm PaperProps để style dropdown popup
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      sx={{
                        mt: 1,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        '.dark &': {
                          bgcolor: '#1f2937',
                          border: '1px solid #374151',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        },
                      }}
                    />
                  )}
                  // Thêm ListboxProps để style option items
                  ListboxProps={{
                    sx: {
                      maxHeight: 250,
                      '.dark &': {
                        '& .MuiAutocomplete-option': {
                          color: '#d1d5db',
                          '&:hover': {
                            bgcolor: 'rgba(139, 92, 246, 0.1)',
                          },
                          '&[aria-selected="true"]': {
                            bgcolor: 'rgba(139, 92, 246, 0.2)',
                            color: '#c4b5fd',
                            '&.Mui-focused': {
                              bgcolor: 'rgba(139, 92, 246, 0.3)',
                            },
                          },
                          '&.Mui-focused': {
                            bgcolor: 'rgba(139, 92, 246, 0.15)',
                          },
                        },
                      },
                    },
                  }}
                  // Thêm renderOption để custom option item
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      style={{
                        ...props.style,
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: '#111827',
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            {option.course_name}
                          </Typography>
                          
                        </Box>
                      </Box>
                    </li>
                  )}
                  // Thêm filterOptions để search tốt hơn
                  filterOptions={(options, { inputValue }) => {
                    const searchTerm = inputValue.toLowerCase();
                    return options.filter((option) => option.course_name.toLowerCase().includes(searchTerm) || (option.course_name && option.course_name.toLowerCase().includes(searchTerm)));
                  }}
                  // Optional: Thêm loading và no options text cho dark mode
                  loadingText={
                    <Typography
                      sx={{
                        color: '#6b7280',
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      }}
                    >
                      Đang tải khóa học...
                    </Typography>
                  }
                  noOptionsText={
                    <Typography
                      sx={{
                        color: '#6b7280',
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      }}
                    >
                      Không tìm thấy khóa học
                    </Typography>
                  }
                />
              </Grid>

              {/* Selected Courses with Drag and Drop */}
              {selectedCourses.length > 0 && (
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 2,
                      color: '#374151',
                      '.dark &': {
                        color: '#d1d5db',
                      },
                    }}
                  >
                    Khóa học đã chọn ({selectedCourses.length})
                  </Typography>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="selected-courses">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {selectedCourses.slice(0, expandedCourse ? selectedCourses.length : 3).map((course, index) => (
                            <Draggable key={course.course_id} draggableId={course.course_id} index={index}>
                              {(provided, snapshot) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                    p: 1.5,
                                    border: '1px solid',
                                    borderColor: snapshot.isDragging ? 'primary.main' : 'grey.300',
                                    borderRadius: 2,
                                    bgcolor: index === 0 ? 'rgba(139,92,246,0.1)' : snapshot.isDragging ? 'action.hover' : 'background.paper',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                      borderColor: 'primary.light',
                                      bgcolor: 'action.hover',
                                    },
                                    '.dark &': {
                                      borderColor: snapshot.isDragging ? '#8b5cf6' : '#4b5563',
                                      bgcolor: index === 0 ? 'rgba(139,92,246,0.2)' : snapshot.isDragging ? 'rgba(139,92,246,0.1)' : '#374151',
                                      '&:hover': {
                                        borderColor: '#8b5cf6',
                                        bgcolor: 'rgba(139,92,246,0.15)',
                                      },
                                    },
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      flexGrow: 1,
                                      color: '#111827',
                                      '.dark &': {
                                        color: '#f3f4f6',
                                      },
                                    }}
                                  >
                                    <strong>{selectedCourses.length - index}.</strong> {course.course_name}
                                  </Typography>
                                  <Tooltip title="Xóa">
                                    <IconButton
                                      size="medium"
                                      onClick={() => handleDeleteCourse(course)}
                                      sx={{
                                        color: '#ef4444',
                                        '&:hover': {
                                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                        },
                                        '.dark &': {
                                          color: '#fca5a5',
                                          '&:hover': {
                                            backgroundColor: 'rgba(248, 113, 113, 0.2)',
                                          },
                                        },
                                      }}
                                    >
                                      <IconDelete size={16} />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}

                          {selectedCourses.length > 3 && (
                            <Button
                              size="small"
                              variant="text"
                              onClick={() => setExpandedCourse(!expandedCourse)}
                              sx={{
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                mt: 0.5,
                                color: '#7c3aed',
                                '&:hover': {
                                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                                },
                                '.dark &': {
                                  color: '#a78bfa',
                                  '&:hover': {
                                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                                  },
                                },
                              }}
                            >
                              {expandedCourse ? '▲ Thu gọn' : `+${selectedCourses.length - 3} khóa học khác ▼`}
                            </Button>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Grid>
              )}

              {/* del_flg */}
              <Grid item xs={12}>
                <Controller
                  name="del_flg"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          {...field}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#8b5cf6',
                              '&:hover': {
                                backgroundColor: 'rgba(139, 92, 246, 0.08)',
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#8b5cf6',
                            },
                            '.dark &': {
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#a78bfa',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#a78bfa',
                              },
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color: '#374151',
                            '.dark &': {
                              color: '#d1d5db',
                            },
                          }}
                        >
                          Ẩn combo: <strong>{field.value ? 'Đang ẩn' : 'Đang hiện'}</strong>
                        </Typography>
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
            borderTop: '1px solid #e9d5ff',
            background: '#faf5ff',
            '.dark &': {
              borderTop: '1px solid #4c1d95',
              background: '#111827',
            },
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            disabled={loading}
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              '&:hover': {
                borderColor: '#9ca3af',
              },
              '&:disabled': {
                borderColor: '#e5e7eb',
                color: '#9ca3af',
              },
              '.dark &': {
                borderColor: '#4b5563',
                color: '#d1d5db',
                '&:hover': {
                  borderColor: '#6b7280',
                },
                '&:disabled': {
                  borderColor: '#374151',
                  color: '#6b7280',
                },
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={<IconDeviceFloppy size={18} />}
            disabled={loading}
            sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
              },
              '&:disabled': {
                background: '#d1d5db',
                color: '#9ca3af',
                '.dark &': {
                  background: '#374151',
                  color: '#6b7280',
                },
              },
            }}
          >
            {loading ? 'Đang lưu...' : id ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            '& .MuiAlert-message': {
              padding: '6px 0',
            },
            '.dark &': {
              bgcolor: snackbar.severity === 'error' ? '#dc2626' : snackbar.severity === 'success' ? '#059669' : snackbar.severity === 'warning' ? '#d97706' : '#2563eb',
            },
          }}
          iconMapping={{
            success: <CheckCircleIcon sx={{ fontSize: 18, color: 'white' }} />,
            error: <ErrorIcon sx={{ fontSize: 18, color: 'white' }} />,
            warning: <WarningIcon sx={{ fontSize: 18, color: 'white' }} />,
            info: <InfoIcon sx={{ fontSize: 18, color: 'white' }} />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
});

export default ComboFormDialog;
