import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, Switch, FormControlLabel, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ComboFormDialog from './combo-form';
import { useSearchParams } from 'react-router-dom';
import { IconEdit, IconPlus, IconTrash, IconBook, IconAlertCircle, IconSearch, IconRestore, IconTrashX } from '@tabler/icons-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ComboType {
  combo_id: string;
  combo_name: string;
  original_price: number;
  price: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  del_flg: boolean;
  courses: { course_id: string; course_name: string }[];
  categories?: { category_id: string; title: string }[];
}

export default function ComboManagementPage() {
  const [params, setParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [combos, setCombos] = useState<ComboType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalCombos, setTotalCombos] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchText, setSearchText] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const refComboForm = useRef<any>(null);
  const [expandedComboId, setExpandedComboId] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = combos.map((n) => n.combo_id);
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
      // Check if combo is already soft deleted
      const combo = combos.find((c) => c.combo_id === id);
      if (combo?.del_flg) {
        setDeleteType('hard');
      } else {
        setDeleteType(type);
      }
    } else {
      // Check if all selected combos are soft deleted
      const allDeleted = selectedRowKeys.every((id) => combos.find((c) => c.combo_id === id)?.del_flg);
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
        // Single delete
        await axios.delete(`/api/admin/combos/${ids[0]}/${type}`);
        setSnackbar({
          open: true,
          message: type === 'soft' ? 'Xóa combo thành công' : 'Xóa vĩnh viễn combo thành công',
          severity: 'success',
        });
      } else {
        // Bulk delete
        const endpoint = type === 'soft' ? 'bulk-soft-delete' : 'bulk-hard-delete';
        await axios.post(`/api/admin/combos/${endpoint}`, { ids });
        setSnackbar({
          open: true,
          message: type === 'soft' ? `Xóa ${ids.length} combo thành công` : `Xóa vĩnh viễn ${ids.length} combo thành công`,
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
      await axios.put(`/api/admin/combos/${id}/restore`);
      setSnackbar({
        open: true,
        message: 'Khôi phục combo thành công',
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
      const response = await axios.get(`/api/admin/combos`, {
        params: {
          page,
          pageSize: rowsPerPage,
          search: searchText || undefined,
          includeDeleted,
        },
      });

      if (response.data) {
        setCombos(response.data.data);
        setTotalCombos(response.data.total);
      }
    } catch (error: any) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Không thể tải dữ liệu',
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

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const comboId = result.destination.droppableId;
    const comboIndex = combos.findIndex((com) => com.combo_id === comboId);
    if (comboIndex === -1) return;

    const newCourses = Array.from(combos[comboIndex].courses);
    const [reorderedItem] = newCourses.splice(result.source.index, 1);
    newCourses.splice(result.destination.index, 0, reorderedItem);

    const newCombos = [...combos];
    newCombos[comboIndex].courses = newCourses;
    setCombos(newCombos);

    // Update order via API
    try {
      await axios.put(`/api/admin/combos/${comboId}/course-order`, {
        courseIds: newCourses.map((c) => c.course_id),
      });
    } catch (error) {
      console.error('Error updating order', error);
      setSnackbar({
        open: true,
        message: 'Không thể cập nhật thứ tự',
        severity: 'error',
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const hasSelectedDeleted = selectedRowKeys.some((id) => combos.find((c) => c.combo_id === id)?.del_flg);

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#111827',
              fontWeight: 600,
              '.dark &': {
                color: '#f3f4f6',
              },
            }}
          >
            Quản lý combo
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Search TextField */}
            <TextField
              size="small"
              placeholder="Tìm kiếm combo..."
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

            {/* Include Deleted Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={includeDeleted}
                  onChange={(e) => setIncludeDeleted(e.target.checked)}
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
                    '& .MuiSwitch-track': {
                      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#4b5563' : '#a4a8adff'),
                    },
                    '& .MuiSwitch-switchBase': {
                      color: (theme) => (theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280'),
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
                  Chỉ hiển thị đã xóa
                </Typography>
              }
            />

            {/* Selected Chips & Buttons */}
            {selectedRowKeys.length > 0 && (
              <>
                <Chip
                  label={`Đã chọn ${selectedRowKeys.length} combo`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    color: '#7c3aed',
                    '.dark &': {
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      color: '#c4b5fd',
                    },
                  }}
                />
                {hasSelectedDeleted ? (
                  <Button
                    variant="outlined"
                    startIcon={<IconTrashX size={20} />}
                    onClick={() => handleDeleteDialogOpen(undefined, 'hard')}
                    disabled={loading}
                    sx={{
                      borderColor: '#ef4444',
                      color: '#ef4444',
                      '&:hover': {
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(239, 68, 68, 0.04)',
                      },
                      '.dark &': {
                        borderColor: '#f87171',
                        color: '#f87171',
                        '&:hover': {
                          borderColor: '#fca5a5',
                          backgroundColor: 'rgba(248, 113, 113, 0.1)',
                        },
                      },
                      '&:disabled': {
                        borderColor: '#e5e7eb',
                        color: '#9ca3af',
                        '.dark &': {
                          borderColor: '#4b5563',
                          color: '#6b7280',
                        },
                      },
                    }}
                  >
                    Xóa vĩnh viễn
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<IconTrash size={20} />}
                    onClick={() => handleDeleteDialogOpen(undefined, 'soft')}
                    disabled={loading}
                    sx={{
                      borderColor: '#f59e0b',
                      color: '#f59e0b',
                      '&:hover': {
                        borderColor: '#d97706',
                        backgroundColor: 'rgba(245, 158, 11, 0.04)',
                      },
                      '.dark &': {
                        borderColor: '#fbbf24',
                        color: '#fbbf24',
                        '&:hover': {
                          borderColor: '#fcd34d',
                          backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        },
                      },
                    }}
                  >
                    Xóa
                  </Button>
                )}
              </>
            )}

            {/* Create New Button */}
            <Button
              variant="contained"
              startIcon={<IconPlus size={20} />}
              onClick={() => refComboForm.current.show(null)}
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
              Tạo combo mới
            </Button>
          </Box>
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalCombos}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
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
          <Paper
            sx={{
              bgcolor: 'background.paper',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              '.dark &': {
                bgcolor: '#1f2937',
                border: '1px solid #374151',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              },
            }}
          >
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
                        sx={{
                          color: '#6b7280',
                          '&.Mui-checked': {
                            color: '#8b5cf6',
                          },
                          '.dark &': {
                            color: '#9ca3af',
                            '&.Mui-checked': {
                              color: '#8b5cf6',
                            },
                          },
                        }}
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < combos.length}
                        checked={combos.length > 0 && selectedRowKeys.length === combos.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Tên combo
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Giá gốc
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Giá
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Khóa học
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Trạng thái
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Cập nhật
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        color: '#7c3aed',
                        '.dark &': {
                          color: '#111111',
                        },
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                        <Typography
                          sx={{
                            color: '#6b7280',
                            '.dark &': {
                              color: '#9ca3af',
                            },
                          }}
                        >
                          Đang tải...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : combos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                        <IconBook size={48} />
                        <Typography
                          sx={{
                            color: '#6b7280',
                            '.dark &': {
                              color: '#9ca3af',
                            },
                          }}
                        >
                          Không có combo nào
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    combos.map((row) => {
                      const isItemSelected = isSelected(row.combo_id);
                      return (
                        <TableRow
                          key={row.combo_id}
                          hover
                          onClick={() => handleClick(row.combo_id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                          sx={{
                            cursor: 'pointer',
                            opacity: row.del_flg ? 0.6 : 1,
                            '&.Mui-selected': {
                              backgroundColor: 'rgba(139, 92, 246, 0.08)',
                              '&:hover': {
                                backgroundColor: 'rgba(139, 92, 246, 0.12)',
                              },
                            },
                            '.dark &.Mui-selected': {
                              backgroundColor: 'rgba(139, 92, 246, 0.16)',
                              '&:hover': {
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                              },
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              sx={{
                                color: '#6b7280',
                                '&.Mui-checked': {
                                  color: '#8b5cf6',
                                },
                                '.dark &': {
                                  color: '#9ca3af',
                                  '&.Mui-checked': {
                                    color: '#8b5cf6',
                                  },
                                },
                              }}
                              checked={isItemSelected}
                            />
                          </TableCell>

                          <TableCell
                            sx={{
                              color: '#111827',
                              fontWeight: 500,
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            {row.combo_name}
                            {row.del_flg && (
                              <Chip
                                label="Đã xóa"
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: '#fef2f2',
                                  color: '#991b1b',
                                  '.dark &': {
                                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                    color: '#fca5a5',
                                  },
                                }}
                              />
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              color: '#111827',
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.original_price)}
                          </TableCell>

                          <TableCell
                            sx={{
                              color: '#111827',
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price)}
                          </TableCell>

                          <TableCell sx={{ maxWidth: 300 }}>
                            <Droppable droppableId={row.combo_id}>
                              {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                  {(() => {
                                    const displayedCourses = row.courses.slice(0, expandedComboId === row.combo_id ? row.courses.length : 2);
                                    return displayedCourses.map((course, displayIndex) => (
                                      <Draggable key={`${row.combo_id}-${course.course_id}`} draggableId={course.course_id} index={displayIndex}>
                                        {(provided) => (
                                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Chip
                                              label={course.course_name}
                                              sx={{
                                                m: 0.5,
                                                fontSize: '0.8rem',
                                                backgroundColor: '#f3f4f6',
                                                color: '#374151',
                                                '.dark &': {
                                                  backgroundColor: '#374151',
                                                  color: '#d1d5db',
                                                },
                                              }}
                                              size="medium"
                                            />
                                          </div>
                                        )}
                                      </Draggable>
                                    ));
                                  })()}
                                  {provided.placeholder}
                                  {row.courses.length > 2 && (
                                    <Button
                                      size="small"
                                      variant="text"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedComboId(expandedComboId === row.combo_id ? null : row.combo_id);
                                      }}
                                      sx={{
                                        fontSize: '0.75rem',
                                        textTransform: 'none',
                                        mt: 0.5,
                                        color: '#6b7280',
                                        '.dark &': {
                                          color: '#9ca3af',
                                        },
                                        '&:hover': {
                                          color: '#374151',
                                          '.dark &': {
                                            color: '#d1d5db',
                                          },
                                        },
                                      }}
                                    >
                                      {expandedComboId === row.combo_id ? '▲ Thu gọn' : `+${row.courses.length - 2} khóa học ▼`}
                                    </Button>
                                  )}
                                </div>
                              )}
                            </Droppable>
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={row.del_flg ? 'Đã ẩn' : 'Hoạt động'}
                              size="small"
                              sx={{
                                backgroundColor: row.del_flg ? '#fef2f2' : '#f0fdf4',
                                color: row.del_flg ? '#991b1b' : '#166534',
                                '.dark &': {
                                  backgroundColor: row.del_flg ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                                  color: row.del_flg ? '#fca5a5' : '#86efac',
                                },
                              }}
                            />
                          </TableCell>

                          <TableCell align="center" className="dark:text-gray-200">
                            <Typography variant="body2">{formatDateTime(row.updated_at)}</Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              {!row.del_flg && (
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    refComboForm.current.show(row);
                                  }}
                                  sx={{
                                    color: '#2563eb',
                                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                    '&:hover': {
                                      backgroundColor: 'rgba(37, 99, 235, 0.2)',
                                    },
                                    '.dark &': {
                                      color: '#60a5fa',
                                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                                      '&:hover': {
                                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                                      },
                                    },
                                  }}
                                >
                                  <IconEdit size={20} />
                                </IconButton>
                              )}

                              {row.del_flg ? (
                                <>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRestore(row.combo_id);
                                    }}
                                    sx={{
                                      color: '#16a34a',
                                      backgroundColor: 'rgba(22, 163, 74, 0.1)',
                                      '&:hover': {
                                        backgroundColor: 'rgba(22, 163, 74, 0.2)',
                                      },
                                      '.dark &': {
                                        color: '#4ade80',
                                        backgroundColor: 'rgba(74, 222, 128, 0.1)',
                                        '&:hover': {
                                          backgroundColor: 'rgba(74, 222, 128, 0.2)',
                                        },
                                      },
                                    }}
                                  >
                                    <IconRestore size={20} />
                                  </IconButton>

                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteDialogOpen(row.combo_id, 'hard');
                                    }}
                                    sx={{
                                      color: '#dc2626',
                                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                      '&:hover': {
                                        backgroundColor: 'rgba(220, 38, 38, 0.2)',
                                      },
                                      '.dark &': {
                                        color: '#f87171',
                                        backgroundColor: 'rgba(248, 113, 113, 0.1)',
                                        '&:hover': {
                                          backgroundColor: 'rgba(248, 113, 113, 0.2)',
                                        },
                                      },
                                    }}
                                  >
                                    <IconTrashX size={20} />
                                  </IconButton>
                                </>
                              ) : (
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteDialogOpen(row.combo_id, 'soft');
                                  }}
                                  sx={{
                                    color: '#f59e0b',
                                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                    '&:hover': {
                                      backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                    },
                                    '.dark &': {
                                      color: '#fbbf24',
                                      backgroundColor: 'rgba(251, 191, 36, 0.1)',
                                      '&:hover': {
                                        backgroundColor: 'rgba(251, 191, 36, 0.2)',
                                      },
                                    },
                                  }}
                                >
                                  <IconTrash size={20} />
                                </IconButton>
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
              count={totalCombos}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số dòng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
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

        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          maxWidth="sm"
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
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              color: deleteType === 'soft' ? '#f59e0b' : '#dc2626',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)',
              borderBottom: '1px solid #fde68a',
              padding: '20px 24px 16px',
              '.dark &': {
                color: deleteType === 'soft' ? '#fbbf24' : '#f87171',
                background: 'linear-gradient(135deg, #422006 0%, #451a03 100%)',
                borderBottom: '1px solid #92400e',
              },
            }}
          >
            <IconAlertCircle size={24} />
            {deleteType === 'soft' ? 'Xác nhận xóa' : 'Xác nhận xóa vĩnh viễn'}
          </DialogTitle>

          <DialogContent
            sx={{
              pt: 3,
              bgcolor: 'background.paper',
              '.dark &': {
                bgcolor: '#1f2937',
                borderColor: '#374151',
              },
            }}
          >
            <DialogContentText
              sx={{
                color: '#374151',
                '.dark &': {
                  color: '#d1d5db',
                },
              }}
            >
              {deleteType === 'soft' ? (
                deleteTargetId ? (
                  'Bạn có chắc chắn muốn xóa combo này? Bạn có thể khôi phục sau.'
                ) : (
                  `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} combo đã chọn? Bạn có thể khôi phục sau.`
                )
              ) : (
                <>
                  <Typography
                    sx={{
                      color: '#dc2626',
                      fontWeight: 600,
                      mb: 2,
                      '.dark &': {
                        color: '#f87171',
                      },
                    }}
                  >
                    ⚠️ CẢNH BÁO: HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!
                  </Typography>
                  {deleteTargetId ? 'Combo sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.' : `${selectedRowKeys.length} combo sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.`}
                </>
              )}
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{
              p: 2,
              gap: 1,
              borderTop: '1px solid #e5e7eb',
              background: '#fff',
              '.dark &': {
                borderTop: '1px solid #374151',
                background: '#1f2937',
              },
            }}
          >
            <Button
              onClick={handleDeleteDialogClose}
              variant="outlined"
              sx={{
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': {
                  borderColor: '#9ca3af',
                },
                '.dark &': {
                  borderColor: '#4b5563',
                  color: '#d1d5db',
                  '&:hover': {
                    borderColor: '#6b7280',
                  },
                },
              }}
            >
              Hủy
            </Button>

            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: deleteType === 'soft' ? '#f59e0b' : '#dc2626',
                color: 'white',
                '&:hover': {
                  backgroundColor: deleteType === 'soft' ? '#d97706' : '#b91c1c',
                },
                '&:disabled': {
                  backgroundColor: '#d1d5db',
                  color: '#9ca3af',
                  '.dark &': {
                    backgroundColor: '#374151',
                    color: '#6b7280',
                  },
                },
                '.dark &': {
                  backgroundColor: deleteType === 'soft' ? '#f59e0b' : '#dc2626',
                  '&:hover': {
                    backgroundColor: deleteType === 'soft' ? '#d97706' : '#b91c1c',
                  },
                },
              }}
            >
              {deleteType === 'soft' ? 'Xóa' : 'Xóa vĩnh viễn'}
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

        <ComboFormDialog ref={refComboForm} saved={handleSaved} />
      </Box>
    </AdminLayout>
  );
}
