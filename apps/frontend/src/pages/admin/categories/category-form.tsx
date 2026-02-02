import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, Box, Autocomplete, CircularProgress, Typography, FormControlLabel, Switch, IconButton, InputAdornment, Tooltip, Snackbar, Alert } from '@mui/material';
import { IconX, IconCheck, IconTrash as IconDelete, IconSearch, IconMail } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

interface ComboType {
  combo_id: string;
  combo_name: string;
  price: number;
  original_price: number;
}

interface CategoryType {
  category_id?: string;
  title: string;
  sort_order?: number;
  combos?: ComboType[];
  del_flg?: boolean;
}

interface CategoryFormDialogProps {
  saved: () => void;
}

const CategoryFormDialog = forwardRef((props: CategoryFormDialogProps, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCombos, setLoadingCombos] = useState(false);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [title, setTitle] = useState('');
  const [selectedCombos, setSelectedCombos] = useState<ComboType[]>([]);
  const [availableCombos, setAvailableCombos] = useState<ComboType[]>([]);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(true);
  const [searchCombo, setSearchCombo] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(0);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  useImperativeHandle(ref, () => ({
    show: async (categoryData: any | null) => {
      setCategory(categoryData);
      setTitle(categoryData?.title || '');
      setSortOrder(categoryData?.sort_order ?? 0);
      setError('');
      setVisible(!categoryData?.del_flg);
      setSearchCombo('');

      if (categoryData?.category_id) {
        try {
          const response = await axios.get(`/api/admin/categories/${categoryData.category_id}`);
          setSelectedCombos(response.data.combos || []);
        } catch (error) {
          console.error('Error loading category details', error);
          setSelectedCombos([]);
        }
      } else {
        setSelectedCombos([]);
      }

      setOpen(true);
      await loadAvailableCombos(categoryData?.category_id);
    },
  }));

  const loadAvailableCombos = async (categoryId?: string) => {
    setLoadingCombos(true);
    try {
      const response = await axios.get(`/api/admin/categories/combos/available`, {
        params: categoryId ? { categoryId } : {},
      });
      setAvailableCombos(response.data || []);
    } catch (error) {
      console.error('Error loading combos:', error);
      showSnackbar('Lỗi khi tải danh sách combo', 'error');
    }
    setLoadingCombos(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setSelectedCombos([]);
    setCategory(null);
    setError('');
    setVisible(true);
    setSearchCombo('');
    setSortOrder(0);
  };

  const validateCategoryName = (name: string) => {
    const regex = /^[a-zA-ZÀ-ỹ0-9\s.,!?()\-]+$/;
    return regex.test(name.trim());
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Vui lòng nhập tên danh mục');
      showSnackbar('Vui lòng nhập tên danh mục', 'error');
      return;
    }

    if (!validateCategoryName(title)) {
      setError('Tên danh mục không được chứa ký tự đặc biệt');
      showSnackbar('Tên danh mục không được chứa ký tự đặc biệt', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (category?.category_id) {
        await axios.put(`/api/admin/categories/${category.category_id}`, {
          title: title.trim(),
          del_flg: !visible,
          sort_order: sortOrder,
        });

        const currentComboIds = category.combos?.map((c) => c.combo_id) || [];
        const newComboIds = selectedCombos.map((c) => c.combo_id);

        const removedComboIds = currentComboIds.filter((id) => !newComboIds.includes(id));
        const addedComboIds = newComboIds.filter((id) => !currentComboIds.includes(id));

        if (removedComboIds.length > 0) {
          await axios.delete(`/api/admin/categories/${category.category_id}/combos`, {
            data: { combo_ids: removedComboIds },
          });
        }

        if (addedComboIds.length > 0 || newComboIds.length !== currentComboIds.length) {
          await axios.post(`/api/admin/categories/${category.category_id}/combos`, {
            combo_ids: newComboIds,
          });
        }

        showSnackbar('Cập nhật danh mục thành công');
      } else {
        const response = await axios.post(`/api/admin/categories/`, {
          title: title.trim(),
          del_flg: !visible,
          sort_order: sortOrder,
        });

        if (selectedCombos.length > 0) {
          await axios.post(`/api/admin/categories/${response.data.category_id}/combos`, {
            combo_ids: selectedCombos.map((c) => c.combo_id),
          });
        }

        showSnackbar('Tạo danh mục mới thành công');
      }

      props.saved();
      handleClose();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Đã xảy ra lỗi';
      setError(errorMsg);
      showSnackbar(errorMsg, 'error');
    }
    setLoading(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newSelected = Array.from(selectedCombos);
    const [reorderedItem] = newSelected.splice(result.source.index, 1);
    newSelected.splice(result.destination.index, 0, reorderedItem);

    setSelectedCombos(newSelected);
  };

  const handleDeleteCombo = (comboToDelete: ComboType) => {
    setSelectedCombos(selectedCombos.filter((c) => c.combo_id !== comboToDelete.combo_id));
    showSnackbar(`Đã xóa combo "${comboToDelete.combo_name}" khỏi danh mục`, 'info');
  };

  const handleComboSelect = (combo: ComboType) => {
    if (!selectedCombos.find((c) => c.combo_id === combo.combo_id)) {
      setSelectedCombos([combo, ...selectedCombos]);
      showSnackbar(`Đã thêm combo "${combo.combo_name}" vào danh mục`, 'success');
    }
    setSearchCombo('');
  };

  const filteredCombos = availableCombos.filter((combo) => {
    const isNotSelected = !selectedCombos.find((c) => c.combo_id === combo.combo_id);
    const matchesSearch = combo.combo_name.toLowerCase().includes(searchCombo.toLowerCase());
    return isNotSelected && matchesSearch;
  });

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
          },
          className: 'dark:bg-gray-800',
        }}
      >
        <Typography
          className="dark:text-gray-100 bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-gray-700 dark:to-gray-800 p-4"
          variant="h6"
          sx={{
            borderBottom: '1px solid #e9d5ff',
          }}
        >
          {category ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
            }}
            size="small"
          >
            <IconX height={18} width={18} />
          </IconButton>
        </Typography>

        <DialogContent className="dark:bg-gray-800" sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Title field */}
            <TextField
              label="Tên danh mục"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // Clear error khi user đang sửa
                if (error && validateCategoryName(e.target.value)) {
                  setError('');
                }
              }}
              fullWidth
              required
              error={!!error}
              helperText={error || (title.trim() && !validateCategoryName(title) ? 'Tên danh mục không được chứa ký tự đặc biệt' : '')}
              className="dark:text-gray-100"
              InputLabelProps={{ className: 'dark:text-gray-300' }}
              InputProps={{
                className: 'dark:text-gray-100 dark:bg-gray-700',
              }}
            />

            {/* Visibility switch */}
            <FormControlLabel
              control={<Switch checked={visible} onChange={(e) => setVisible(e.target.checked)} color="secondary" />}
              label={
                <Typography className="dark:text-gray-300">
                  Hiển thị: <strong>{visible ? 'Hiện' : 'Ẩn'}</strong>
                </Typography>
              }
              sx={{
                '.MuiSwitch-switchBase.Mui-checked': { color: '#8b5cf6' },
                '.MuiSwitch-track': {
                  backgroundColor: visible ? '#c084fc !important' : '#9ca3af !important',
                },
              }}
            />

            <TextField
              label="Thứ tự hiển thị"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 0 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconMail size={20} className="dark:text-gray-400" />
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

            {/* Search and select combos */}
            <Box>
              <Typography variant="subtitle1" className="dark:text-gray-300 mb-2">
                Chọn Combos cho danh mục
              </Typography>
              <Autocomplete
                options={filteredCombos}
                getOptionLabel={(option) => option.combo_name}
                inputValue={searchCombo}
                onInputChange={(_, newValue) => setSearchCombo(newValue)}
                onChange={(_, value) => {
                  if (value) {
                    handleComboSelect(value);
                    setSearchCombo('');
                  }
                }}
                loading={loadingCombos}
                noOptionsText="Không tìm thấy combo"
                clearOnBlur={false}
                value={null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Tìm kiếm combo..."
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        backgroundColor: '#fff',
                        color: '#111827',
                        '.MuiSelect-icon': {
                          color: '#ffffffff', // light mode
                        },
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#f3f4f6',
                        },
                        
                        '& .MuiAutocomplete-popupIndicator': {
                          color: '#9ca3af', // dark mode
                        },
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconSearch size={20} className="text-gray-500 dark:text-gray-400" />
                        </InputAdornment>
                      ),
                      className: 'dark:text-gray-100 dark:bg-gray-700 rounded-md',
                      endAdornment: (
                        <>
                          {loadingCombos ? <CircularProgress size={20} color="secondary" /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.combo_id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <Typography variant="body1">{option.combo_name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(option.price)}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
              <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mt-2 block">
                Tìm kiếm và chọn combo để thêm vào danh mục
              </Typography>
            </Box>

            {/* Selected Combos with Drag and Drop */}
            {selectedCombos.length > 0 && (
              <Box>
                <Typography variant="subtitle1" className="dark:text-gray-300 mb-2">
                  Combo đã chọn ({selectedCombos.length})
                </Typography>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="selected-combos">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {selectedCombos.map((combo, index) => (
                          <Draggable key={combo.combo_id} draggableId={combo.combo_id} index={index}>
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
                                }}
                                className="dark:border-gray-600 dark:bg-gray-700"
                              >
                                <Typography sx={{ flexGrow: 1 }} className="dark:text-gray-100">
                                  <strong>{selectedCombos.length - index}.</strong> {combo.combo_name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }} className="dark:text-gray-400">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(combo.price)}
                                </Typography>
                                <Tooltip title="Xóa">
                                  <IconButton size="medium" onClick={() => handleDeleteCombo(combo)} color="error">
                                    <IconDelete size={16} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </Box>
            )}

            {error && !!title.trim() && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          className="dark:bg-gray-900"
          sx={{
            p: 2,
            gap: 1,
            borderTop: '1px solid #e9d5ff',
            background: '#faf5ff',
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: '#9ca3af',
              color: '#bd0616ff',
              '&:hover': { borderColor: '#6b7280', backgroundColor: '#fc96a1ff' },
            }}
          >
            Hủy
          </Button>

          <Button onClick={handleSubmit} variant="contained" startIcon={loading ? <CircularProgress size={18} /> : <IconCheck size={18} />} disabled={loading} className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300">
            {category ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
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

export default CategoryFormDialog;
