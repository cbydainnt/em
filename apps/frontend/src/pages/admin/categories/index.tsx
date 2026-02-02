import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, Switch, FormControlLabel, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CategoryFormDialog from './category-form';
import { useSearchParams } from 'react-router-dom';
import { IconEdit, IconPlus, IconTrash, IconBook, IconAlertCircle, IconSearch, IconRestore, IconTrashX } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ComboType {
  combo_id: string;
  combo_name: string;
  price: number;
  original_price: number;
}

interface CategoryType {
  category_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  del_flg: boolean;
  combos: ComboType[];
  sort_order: number;
}

export default function CategoryManagementPage() {
  const [params, setParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalCategories, setTotalCategories] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchText, setSearchText] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const refCategoryForm = useRef<any>(null);

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = categories.map((n) => n.category_id);
      setSelectedRowKeys(newSelected);
      return;
    }
    setSelectedRowKeys([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selectedRowKeys.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRowKeys, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRowKeys.slice(1));
    } else if (selectedIndex === selectedRowKeys.length - 1) {
      newSelected = newSelected.concat(selectedRowKeys.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRowKeys.slice(0, selectedIndex), selectedRowKeys.slice(selectedIndex + 1));
    }

    setSelectedRowKeys(newSelected);
  };

  const isSelected = (id: string) => selectedRowKeys.indexOf(id) !== -1;

  const handleSaved = async () => {
    setPage(1);
    await loadData();
  };

  useEffect(() => {
    if (page > 0) {
      setTimeout(async () => {
        await loadData();
      }, 0);
    }
  }, [page, rowsPerPage, searchText, includeDeleted]);

  const handleDeleteDialogOpen = (id?: string, type: 'soft' | 'hard' = 'soft') => {
    if (id) {
      setDeleteTargetId(id);
      const category = categories.find((c) => c.category_id === id);
      if (category?.del_flg) {
        setDeleteType('hard');
      } else {
        setDeleteType(type);
      }
    } else {
      const allDeleted = selectedRowKeys.every((id) => categories.find((c) => c.category_id === id)?.del_flg);
      setDeleteType(allDeleted ? 'hard' : type);
    }
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteItems([deleteTargetId], deleteType);
    } else {
      await deleteItems(selectedRowKeys, deleteType);
    }
    handleDeleteDialogClose();
  };

  const deleteItems = async (ids: string[], type: 'soft' | 'hard') => {
    setLoading(true);
    try {
      if (ids.length === 1) {
        await axios.delete(`/api/admin/categories/${ids[0]}/${type}`);
        setSnackbar({
          open: true,
          message: type === 'soft' ? 'Xóa danh mục thành công' : 'Xóa vĩnh viễn danh mục thành công',
          severity: 'success',
        });
      } else {
        const endpoint = type === 'soft' ? 'bulk-soft-delete' : 'bulk-hard-delete';
        await axios.post(`/api/admin/categories/${endpoint}`, { ids });
        setSnackbar({
          open: true,
          message: type === 'soft' ? `Xóa ${ids.length} danh mục thành công` : `Xóa vĩnh viễn ${ids.length} danh mục thành công`,
          severity: 'success',
        });
      }
      setSelectedRowKeys([]);
      await loadData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleRestore = async (id: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/categories/${id}/restore`);
      setSnackbar({
        open: true,
        message: 'Khôi phục danh mục thành công',
        severity: 'success',
      });
      await loadData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/categories`, {
        params: {
          page,
          pageSize: rowsPerPage,
          search: searchText || undefined,
          includeDeleted,
        },
      });

      if (response.data) {
        setCategories(response.data.data);
        setTotalCategories(response.data.total);
      }
    } catch (error: any) {
      console.error('Error loading categories:', error);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách danh mục',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
    setParams({ page: String(newPage + 1) });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setParams({ page: '1' });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId || source.index === destination.index) {
      return;
    }

    const categoryId = destination.droppableId;
    const categoryIndex = categories.findIndex((cat) => cat.category_id === categoryId);

    if (categoryIndex === -1) return;

    const category = categories[categoryIndex];
    const combos = [...category.combos];

    if (source.index >= combos.length || destination.index >= combos.length) {
      return;
    }

    const [reorderedItem] = combos.splice(source.index, 1);

    if (!reorderedItem) {
      console.error('Item not found at index:', source.index);
      return;
    }

    combos.splice(destination.index, 0, reorderedItem);

    const newCategories = [...categories];
    newCategories[categoryIndex] = {
      ...category,
      combos,
    };
    setCategories(newCategories);

    try {
      await axios.put(`/api/admin/categories/${categoryId}/combo-order`, {
        comboIds: combos.map((c) => c.combo_id),
      });

      setSnackbar({
        open: true,
        message: 'Cập nhật thứ tự thành công',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating order', error);

      setCategories(categories);

      setSnackbar({
        open: true,
        message: 'Không thể cập nhật thứ tự',
        severity: 'error',
      });
    }
  };

  const hasSelectedDeleted = selectedRowKeys.some((id) => categories.find((c) => c.category_id === id)?.del_flg);

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" className="text-gray-800 dark:text-gray-100 font-semibold">
            Quản lý danh mục
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm danh mục..."
              value={searchText}
              onChange={handleSearch}
              className="dark:text-white"
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
            <FormControlLabel control={<Switch checked={includeDeleted} onChange={(e) => setIncludeDeleted(e.target.checked)} />} label="Chỉ hiển thị đã xóa" />
            {selectedRowKeys.length > 0 && (
              <>
                <Chip label={`Đã chọn ${selectedRowKeys.length} danh mục`} color="primary" size="small" />
                {hasSelectedDeleted ? (
                  <Button variant="outlined" color="error" startIcon={<IconTrashX size={20} />} onClick={() => handleDeleteDialogOpen(undefined, 'hard')} disabled={loading}>
                    Xóa vĩnh viễn
                  </Button>
                ) : (
                  <Button variant="outlined" color="warning" startIcon={<IconTrash size={20} />} onClick={() => handleDeleteDialogOpen(undefined, 'soft')} disabled={loading}>
                    Xóa
                  </Button>
                )}
              </>
            )}
            <Button variant="contained" className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300" startIcon={<IconPlus size={20} />} onClick={() => refCategoryForm.current.show(null)}>
              Tạo danh mục mới
            </Button>
          </Box>
        </Box>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalCategories}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
          className="dark:text-gray-200 dark:bg-gray-800"
          sx={{
            '.dark &': {
              color: '#d1d5db',
              bgcolor: '#1f2937',
              borderTop: '1px solid #374151',
              '& .MuiTablePagination-selectIcon': {
                color: '#9ca3af',
              },
              '& .MuiTablePagination-actions button': {
                color: '#d1d5db',
                '&:disabled': {
                  color: '#6b7280',
                },
              },
              '& .MuiTablePagination-select': {
                color: '#d1d5db',
              },
            },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: '#ffffff',
                  color: '#111827',

                  '.dark &': {
                    bgcolor: '#1f2937',
                    color: '#f3f4f6',
                  },

                  // hover item
                  '& .MuiMenuItem-root:hover': {
                    bgcolor: '#e5e7eb',
                  },
                  '.dark & .MuiMenuItem-root:hover': {
                    bgcolor: '#374151',
                  },

                  // selected item
                  '& .MuiMenuItem-root.Mui-selected': {
                    bgcolor: '#e0e7ff',
                  },
                  '.dark & .MuiMenuItem-root.Mui-selected': {
                    bgcolor: '#312e81',
                  },
                },
              },
            },
          }}
        />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Paper className="dark:bg-gray-800 shadow-lg">
            <TableContainer sx={{ maxHeight: isMobile ? 400 : 600 }}>
              <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead
                  style={{
                    backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                  }}
                  className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
                >
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{
                          '.dark &': {
                            color: '#fff',
                          },
                          '&.Mui-checked': {
                            color: '#2e78e7ff',
                          },
                        }}
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < categories.length}
                        checked={categories.length > 0 && selectedRowKeys.length === categories.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>

                    <TableCell className="font-semibold dark:text-gray-900">Tiêu đề danh mục</TableCell>
                    <TableCell className="font-semibold dark:text-gray-900">Các Combo thuộc danh mục</TableCell>
                    <TableCell align="center" className="font-semibold dark:text-gray-900">
                      Thứ tự danh mục
                    </TableCell>
                    <TableCell className="font-semibold dark:text-gray-900">Trạng thái</TableCell>
                    <TableCell align="center" className="font-semibold dark:text-gray-900">
                      Cập nhật
                    </TableCell>
                    <TableCell align="center" className="font-semibold dark:text-gray-900">
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                        <Typography>Đang tải...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                        <IconBook size={48} className="text-gray-400 mx-auto mb-2" />
                        <Typography className="text-gray-500">Không có danh mục nào</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((row) => {
                      const isItemSelected = isSelected(row.category_id);
                      return (
                        <TableRow key={row.category_id} hover onClick={() => handleClick(row.category_id)} role="checkbox" aria-checked={isItemSelected} selected={isItemSelected} sx={{ cursor: 'pointer', opacity: row.del_flg ? 0.6 : 1 }} className="dark:hover:bg-gray-700">
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              sx={{
                                '.dark &': {
                                  color: '#fff',
                                },
                                '&.Mui-checked': {
                                  color: '#2e78e7ff',
                                },
                              }}
                              checked={isItemSelected}
                            />
                          </TableCell>
                          <TableCell className="dark:text-gray-200 font-medium">
                            {row.title}
                            {row.del_flg && <Chip label="Đã xóa" size="small" color="error" sx={{ ml: 1 }} />}
                          </TableCell>
                          <TableCell sx={{ maxWidth: 300 }}>
                            <Droppable droppableId={row.category_id}>
                              {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                  {row.combos?.length > 0 ? (
                                    <>
                                      {row.combos.slice(0, expandedRow === row.category_id ? row.combos.length : 2).map((combo, index) => (
                                        <Draggable key={combo.combo_id} draggableId={combo.combo_id} index={index}>
                                          {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={provided.draggableProps.style}>
                                              <Chip
                                                label={combo.combo_name}
                                                sx={{
                                                  m: 0.5,
                                                  fontSize: '0.8rem',
                                                  cursor: 'grab',
                                                  '&:active': {
                                                    cursor: 'grabbing',
                                                  },
                                                  // Light mode
                                                  backgroundColor: snapshot.isDragging ? '#8b5cf6' : '#f3f4f6',
                                                  color: snapshot.isDragging ? 'white' : '#374151',
                                                  border: '1px solid',
                                                  borderColor: snapshot.isDragging ? '#7c3aed' : '#d1d5db',
                                                  '&:hover': {
                                                    backgroundColor: snapshot.isDragging ? '#7c3aed' : '#e5e7eb',
                                                  },
                                                  // Dark mode
                                                  '.dark &': {
                                                    backgroundColor: snapshot.isDragging ? '#8b5cf6' : '#374151',
                                                    color: snapshot.isDragging ? 'white' : '#d1d5db',
                                                    borderColor: snapshot.isDragging ? '#7c3aed' : '#4b5563',
                                                    '&:hover': {
                                                      backgroundColor: snapshot.isDragging ? '#7c3aed' : '#4b5563',
                                                    },
                                                  },
                                                }}
                                                size="medium"
                                              />
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}
                                      {provided.placeholder}
                                      {row.combos.length > 2 && (
                                        <Button
                                          size="small"
                                          variant="text"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedRow(expandedRow === row.category_id ? null : row.category_id);
                                          }}
                                          sx={{
                                            fontSize: '0.75rem',
                                            textTransform: 'none',
                                            mt: 0.5,
                                            color: 'primary.main',
                                          }}
                                        >
                                          {expandedRow === row.category_id ? '▲ Thu gọn' : `+${row.combos.length - 2} combo khác ▼`}
                                        </Button>
                                      )}
                                    </>
                                  ) : (
                                    <Typography variant="body2" className="text-gray-400">
                                      Chưa có combo
                                    </Typography>
                                  )}
                                </div>
                              )}
                            </Droppable>
                          </TableCell>
                          <TableCell align="center" className="dark:text-gray-200 font-medium">
                            {row.sort_order}
                          </TableCell>
                          <TableCell>
                            <Chip label={row.del_flg ? 'Đã ẩn' : 'Hoạt động'} color={row.del_flg ? 'error' : 'success'} size="small" />
                          </TableCell>
                          <TableCell align="center" className="dark:text-gray-200">
                            <Typography variant="body2">{formatDateTime(row.updated_at)}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              {!row.del_flg && (
                                <Tooltip title="Chỉnh sửa">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      refCategoryForm.current.show(row);
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                  >
                                    <IconEdit size={20} />
                                  </IconButton>
                                </Tooltip>
                              )}
                              {row.del_flg ? (
                                <>
                                  <Tooltip title="Khôi phục">
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRestore(row.category_id);
                                      }}
                                      className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                    >
                                      <IconRestore size={20} />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Xóa vĩnh viễn">
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteDialogOpen(row.category_id, 'hard');
                                      }}
                                      className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                    >
                                      <IconTrashX size={20} />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              ) : (
                                <Tooltip title="Xóa">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteDialogOpen(row.category_id, 'soft');
                                    }}
                                    className="text-red-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
                                  >
                                    <IconTrash size={20} />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={totalCategories}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số dòng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
              className="dark:text-gray-200 dark:bg-gray-800"
              sx={{
                '.dark &': {
                  color: '#d1d5db',
                  bgcolor: '#1f2937',
                  borderTop: '1px solid #374151',
                  '& .MuiTablePagination-selectIcon': {
                    color: '#9ca3af',
                  },
                  '& .MuiTablePagination-actions button': {
                    color: '#d1d5db',
                    '&:disabled': {
                      color: '#6b7280',
                    },
                  },
                  '& .MuiTablePagination-select': {
                    color: '#d1d5db',
                  },
                },
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: '#ffffff',
                      color: '#111827',

                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',
                      },

                      // hover item
                      '& .MuiMenuItem-root:hover': {
                        bgcolor: '#e5e7eb',
                      },
                      '.dark & .MuiMenuItem-root:hover': {
                        bgcolor: '#374151',
                      },

                      // selected item
                      '& .MuiMenuItem-root.Mui-selected': {
                        bgcolor: '#e0e7ff',
                      },
                      '.dark & .MuiMenuItem-root.Mui-selected': {
                        bgcolor: '#312e81',
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </DragDropContext>

        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose} maxWidth="sm" fullWidth PaperProps={{ className: 'dark:bg-gray-800' }}>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <IconAlertCircle size={24} />
            {deleteType === 'soft' ? 'Xác nhận xóa' : 'Xác nhận xóa vĩnh viễn'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="dark:text-gray-300">
              {deleteType === 'soft' ? (
                deleteTargetId ? (
                  'Bạn có chắc chắn muốn xóa danh mục này? Bạn có thể khôi phục sau.'
                ) : (
                  `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} danh mục đã chọn? Bạn có thể khôi phục sau.`
                )
              ) : (
                <>
                  <Typography color="error" fontWeight="bold" gutterBottom>
                    ⚠️ CẢNH BÁO: HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!
                  </Typography>
                  {deleteTargetId ? 'Danh mục sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.' : `${selectedRowKeys.length} danh mục sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.`}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button onClick={handleDeleteDialogClose} color="inherit">
              Hủy
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={loading}>
              {deleteType === 'soft' ? 'Xóa' : 'Xóa vĩnh viễn'}
            </Button>
          </DialogActions>
        </Dialog>

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

        <CategoryFormDialog ref={refCategoryForm} saved={handleSaved} />
      </Box>
    </AdminLayout>
  );
}
