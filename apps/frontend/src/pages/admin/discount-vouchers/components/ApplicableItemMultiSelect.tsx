import { Autocomplete, TextField, Typography, Chip as MuiChip, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

export const ApplicableItemMultiSelect = ({ type, voucherId, control, name }: any) => {
  const [options, setOptions] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        // 1. Load danh sách tất cả course/combo
        const res = await axios.get(type === 'course' ? '/api/course' : '/api/combo');
        const list = res.data?.data || res.data || [];
        setOptions(list);

        // 2. Nếu đang edit, load các item đã chọn
        if (voucherId) {
          const itemsRes = await axios.get(`/api/admin/discount-vouchers/${voucherId}/applicable-items`);
          const rawItems = itemsRes.data || [];

          // Lọc ra các item có course_id hoặc combo_id
          const selectedIds = rawItems.filter((x: any) => (type === 'course' ? x.course_id : x.combo_id)).map((x: any) => (type === 'course' ? x.course_id : x.combo_id));

          // Tìm full object từ danh sách options
          const fullSelected = list.filter((opt: any) => {
            const id = type === 'course' ? opt.course_id : opt.combo_id;
            return selectedIds.includes(id);
          });

          setSelected(fullSelected);
        } else {
          setSelected([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setSelected([]);
      }

      setIsLoading(false);
    };

    loadData();
  }, [voucherId, type]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // ✅ Sync giá trị từ selected vào form khi load xong
        useEffect(() => {
          if (selected.length > 0 && !isLoading) {
            const ids = selected.map((x) => (type === 'course' ? x.course_id : x.combo_id));
            field.onChange(ids);
          }
        }, [selected, isLoading]);

        return (
          <Autocomplete
            multiple
            loading={isLoading}
            options={options}
            getOptionLabel={(opt: any) => (type === 'course' ? opt.course_name : opt.combo_name)}
            value={selected}
            isOptionEqualToValue={(option, value) => (type === 'course' ? option.course_id === value.course_id : option.combo_id === value.combo_id)}
            onChange={(_, newVal) => {
              setSelected(newVal);
              const ids = newVal.map((x) => (type === 'course' ? x.course_id : x.combo_id));
              field.onChange(ids);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
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
                FormHelperTextProps={{
                  sx: {
                    color: '#6b7280',
                    '.dark &': {
                      color: '#d1d5db',
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
                label={type === 'course' ? 'Chọn khóa học áp dụng' : 'Chọn combo áp dụng'}
                helperText="Không chọn = áp dụng cho tất cả"
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
            // Thêm renderOption để custom option item với icon phân biệt
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
                      {type === 'course' ? option.course_name : option.combo_name}
                    </Typography>
                    
                  </Box>
                </Box>
                
              </li>
            )}
            // Thêm renderTags để style tags được chọn
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <MuiChip
                  {...getTagProps({ index })}
                  key={type === 'course' ? option.course_id : option.combo_id}
                  label={type === 'course' ? option.course_name : option.combo_name}
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
            // Thêm filterOptions để search tốt hơn
            filterOptions={(options, { inputValue }) => {
              const searchTerm = inputValue.toLowerCase();
              return options.filter((option) => {
                if (type === 'course') {
                  return option.course_name.toLowerCase().includes(searchTerm) || (option.instructor_name && option.instructor_name.toLowerCase().includes(searchTerm));
                } else {
                  return option.combo_name.toLowerCase().includes(searchTerm);
                }
              });
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
                Đang tải {type === 'course' ? 'khóa học' : 'combo'}...
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
                Không tìm thấy {type === 'course' ? 'khóa học' : 'combo'}
              </Typography>
            }
          />
        );
      }}
    />
  );
};
