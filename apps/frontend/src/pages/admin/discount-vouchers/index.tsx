import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IconEdit, IconPlus, IconTrash, IconTicket, IconAlertCircle, IconSearch, IconToggleLeft, IconToggleRight } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import VoucherFormDialog from './discount-form';
import axios from 'axios';
import { formatVND, logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface VoucherType {
  discount_voucher_id: string;
  code: string;
  discount_type: number;
  discount_value: number;
  min_order_amount?: number;
  applicable_type: number;
  user_scope: number; // 1: ALL_USERS, 2: SPECIFIC_USERS
  applicable_user_count?: number; // Số lượng user được chọn (cho SPECIFIC_USERS)
  applicable_user_ids?: string[]; // ID của các user được chọn
  course_id?: string;
  combo_id?: string;
  start_date: string;
  end_date?: string;
  usage_limit?: number;
  used_count: number;
  per_user_limit?: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export default function VoucherManagementPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState<VoucherType[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalVouchers, setTotalVouchers] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | ''>('');
  const [typeFilter, setTypeFilter] = useState<number | ''>('');
  const [userScopeFilter, setUserScopeFilter] = useState<number | ''>('');
  const refVoucherForm = useRef<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    loadData();
  }, [page, rowsPerPage, searchText, statusFilter, typeFilter, userScopeFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/discount-vouchers', {
        params: {
          page,
          pageSize: rowsPerPage,
          search: searchText || undefined,
          status: statusFilter || undefined,
          applicable_type: typeFilter || undefined,
          user_scope: userScopeFilter || undefined,
        },
      });

      if (response.data) {
        setVouchers(response.data.data);
        setTotalVouchers(response.data.total);
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Không thể tải dữ liệu',
        severity: 'error',
      });
    }
    setLoading(false);
  };
  const getUserScopeLabel = (scope: number) => {
    switch (scope) {
      case 1:
        return 'Tất cả ';
      case 2:
        return 'Cụ thể';
      default:
        return 'Không xác định';
    }
  };

  const getUserScopeColor = (scope: number) => {
    switch (scope) {
      case 1:
        return 'primary';
      case 2:
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRowKeys(vouchers.map((v) => v.discount_voucher_id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleClick = (id: string) => {
    const selectedIndex = selectedRowKeys.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRowKeys, id];
    } else {
      newSelected = selectedRowKeys.filter((key) => key !== id);
    }

    setSelectedRowKeys(newSelected);
  };

  const handleDeleteDialogOpen = (id?: string) => {
    setDeleteTargetId(id || null);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    const ids = deleteTargetId ? [deleteTargetId] : selectedRowKeys;
    setLoading(true);
    try {
      await axios.delete('/api/admin/discount-vouchers', { data: { ids } });
      setSnackbar({
        open: true,
        message: `Xóa ${ids.length} voucher thành công`,
        severity: 'success',
      });
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
    handleDeleteDialogClose();
  };

  const handleToggleStatus = async (voucher: VoucherType) => {
    setLoading(true);
    try {
      const oldStatus = voucher.status;

      const response = await axios.put(`/api/admin/discount-vouchers/${voucher.discount_voucher_id}/toggle-status`);
      const updatedVoucher = response.data;

      const isReactivated = updatedVoucher.status === 1 && (oldStatus === 2 || oldStatus === 3);

      if (isReactivated) {
        await logClientMessage('Mã giảm giá được kích hoạt lại!', `Mã ${updatedVoucher.code} đã được kích hoạt trở lại! ` + (updatedVoucher.discount_type === 1 ? `${updatedVoucher.discount_value}%` : formatVND(updatedVoucher.discount_value)) + ` - Dùng ngay thôi nào`, null, UserType.USER, '', null, NotificationType.PROMOTION);
        await logClientMessage('Mã giảm giá được kích hoạt lại!', `Mã ${updatedVoucher.code} đã được kích hoạt trở lại! ` + (updatedVoucher.discount_type === 1 ? `${updatedVoucher.discount_value}%` : formatVND(updatedVoucher.discount_value)) + `.`, null, UserType.ADMIN, '', null, NotificationType.PROMOTION);
      }

      setSnackbar({
        open: true,
        message: isReactivated ? 'Đã kích hoạt lại mã giảm giá & thông báo người dùng!' : 'Cập nhật trạng thái thành công',
        severity: 'success',
      });

      await loadData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Không thể cập nhật trạng thái',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const getApplicableTypeLabel = (type: number) => {
    switch (type) {
      case 1:
        return 'Tất cả';
      case 2:
        return 'Khóa học';
      case 3:
        return 'Combo';
      default:
        return 'Không xác định';
    }
  };

  const getApplicableTypeColor = (type: number) => {
    switch (type) {
      case 1:
        return 'primary';
      case 2:
        return 'success';
      case 3:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return 'Hoạt động';
      case 2:
        return 'Tạm dừng';
      case 3:
        return 'Hết hạn';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDiscount = (type: number, value: number) => {
    if (type === 1) {
      return `${value}%`;
    } else {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" className="text-gray-800 dark:text-gray-100 font-semibold">
            Quản lý mã giảm giá
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Tìm mã giảm giá..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel className="dark:text-gray-200">Trạng thái</InputLabel>
              <Select
                label="Trạng thái"
                className="dark:text-gray-200"
                sx={{
                  minWidth: 130,
                  borderRadius: 6,
                  fontWeight: 500,

                  background: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                  '.MuiSelect-icon': {
                    color: '#ffffffff', // light mode
                  },
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8b5cf6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b3bcccff',
                    borderWidth: 1,
                    borderRadius: 5,
                    '.dark &': {
                      borderColor: '#b3bcccff',
                    },
                  },
                  '.MuiSelect-select': {
                    py: '6px',
                    px: '12px',
                    backgroundColor: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#48525fff',
                      color: '#f3f4f6',
                      borderColor: '#48525fff',
                      borderRadius: 5,
                    },
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#fff',
                      color: '#111827',
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',
                      },
                    },
                  },
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as number)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value={1}>Hoạt động</MenuItem>
                <MenuItem value={2}>Tạm dừng</MenuItem>
                <MenuItem value={3}>Hết hạn</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel className="dark:text-gray-200">Áp dụng cho</InputLabel>
              <Select
                value={typeFilter}
                sx={{
                  minWidth: 130,
                  borderRadius: 6,
                  fontWeight: 500,
                  background: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                  '.MuiSelect-icon': {
                    color: '#ffffffff', // light mode
                  },
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8b5cf6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b3bcccff',
                    borderWidth: 1,
                    borderRadius: 5,
                    '.dark &': {
                      borderColor: '#b3bcccff',
                    },
                  },
                  '.MuiSelect-select': {
                    py: '6px',
                    px: '12px',
                    backgroundColor: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#48525fff',
                      color: '#f3f4f6',
                      borderColor: '#48525fff',
                      borderRadius: 5,
                    },
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#fff',
                      color: '#111827',
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',
                      },
                    },
                  },
                }}
                onChange={(e) => setTypeFilter(e.target.value as number)}
                label="Áp dụng cho"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value={1}>Tất cả đơn</MenuItem>
                <MenuItem value={2}>Khóa học</MenuItem>
                <MenuItem value={3}>Combo</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel className="dark:text-gray-200">Phạm vi người dùng</InputLabel>
              <Select
                value={userScopeFilter}
                sx={{
                  minWidth: 150,
                  borderRadius: 6,
                  fontWeight: 500,
                  background: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                  '.MuiSelect-icon': {
                    color: '#ffffffff',
                  },
                  color: 'text.primary',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8b5cf6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b3bcccff',
                    borderWidth: 1,
                    borderRadius: 5,
                    '.dark &': {
                      borderColor: '#b3bcccff',
                    },
                  },
                  '.MuiSelect-select': {
                    py: '6px',
                    px: '12px',
                    backgroundColor: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#48525fff',
                      color: '#f3f4f6',
                      borderColor: '#48525fff',
                      borderRadius: 5,
                    },
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#fff',
                      color: '#111827',
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',
                      },
                    },
                  },
                }}
                onChange={(e) => setUserScopeFilter(e.target.value as number)}
                label="Phạm vi người dùng"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value={1}>Tất cả người dùng</MenuItem>
                <MenuItem value={2}>Người dùng cụ thể</MenuItem>
              </Select>
            </FormControl>

            {selectedRowKeys.length > 0 && (
              <>
                <Chip label={`Đã chọn ${selectedRowKeys.length}`} color="primary" size="small" />
                <Button variant="outlined" color="error" startIcon={<IconTrash size={20} />} onClick={() => handleDeleteDialogOpen()} disabled={loading}>
                  Xóa
                </Button>
              </>
            )}

            <Button variant="contained" className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300" startIcon={<IconPlus size={20} />} onClick={() => refVoucherForm.current.show(null)}>
              Tạo mã giảm giá
            </Button>
          </Box>
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalVouchers}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={(_, newPage) => setPage(newPage + 1)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
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

        {/* Table */}
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
                    <Checkbox color="primary" indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < vouchers.length} checked={vouchers.length > 0 && selectedRowKeys.length === vouchers.length} onChange={handleSelectAllClick} />
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Mã giảm giá</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Giá trị giảm</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Đơn tối thiểu</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Áp dụng cho</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Phạm vi người dùng</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Thời gian</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Sử dụng</TableCell>
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
                    <TableCell colSpan={9} align="center" sx={{ py: 10 }}>
                      <Typography>Đang tải...</Typography>
                    </TableCell>
                  </TableRow>
                ) : vouchers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 10 }}>
                      <IconTicket size={48} className="text-gray-400 mx-auto mb-2" />
                      <Typography className="text-gray-500">Chưa có mã giảm giá nào</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  vouchers.map((row) => {
                    const isItemSelected = selectedRowKeys.includes(row.discount_voucher_id);
                    return (
                      <TableRow key={row.discount_voucher_id} hover onClick={() => handleClick(row.discount_voucher_id)} selected={isItemSelected} className="dark:hover:bg-gray-700">
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
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="500" className="dark:text-gray-200">
                              {row.code}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" fontWeight="600" color="primary.main" className="dark:text-purple-400">
                            {formatDiscount(row.discount_type, row.discount_value)}
                          </Typography>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">{row.min_order_amount ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.min_order_amount) : 'Không'}</TableCell>
                        <TableCell>
                          <Chip label={getApplicableTypeLabel(row.applicable_type)} color={getApplicableTypeColor(row.applicable_type)} size="small" />
                        </TableCell>
                        {/* Cột Phạm vi người dùng */}
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Chip
                              label={getUserScopeLabel(row.user_scope || 1)}
                              color={getUserScopeColor(row.user_scope || 1)}
                              size="small"
                              sx={{
                                fontWeight: 500,
                                mb: 0.5,
                                '.dark &': {
                                  '&.MuiChip-colorPrimary': {
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                  },
                                  '&.MuiChip-colorSecondary': {
                                    backgroundColor: '#8b5cf6',
                                    color: 'white',
                                  },
                                },
                              }}
                            />

                            {row.user_scope === 2 && row.applicable_user_count !== undefined && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'text.secondary',
                                  '.dark &': {
                                    color: '#9ca3af',
                                  },
                                }}
                              >
                                {row.applicable_user_count} người dùng
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">
                          <Typography variant="caption" display="block">
                            Từ: {new Date(row.start_date).toLocaleDateString('vi-VN')}
                          </Typography>
                          <Typography variant="caption" display="block">
                            Đến: {row.end_date ? new Date(row.end_date).toLocaleDateString('vi-VN') : 'Không giới hạn'}
                          </Typography>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">
                          <Typography variant="body2">
                            {row.used_count} / {row.usage_limit || '∞'}
                          </Typography>
                          <Typography className="dark:text-gray-200" variant="caption" color="text.secondary">
                            Mỗi user: {row.per_user_limit}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={getStatusLabel(row.status)} color={getStatusColor(row.status)} size="small" />
                        </TableCell>
                        <TableCell align="center" className="dark:text-gray-200">
                          <Typography variant="body2">{formatDateTime(row.updated_at)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStatus(row);
                              }}
                              className={row.status === 1 ? 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20' : 'text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20'}
                              title={row.status === 1 ? 'Tạm dừng' : 'Kích hoạt'}
                            >
                              {row.status === 1 ? <IconToggleRight size={22} /> : <IconToggleLeft size={22} />}
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                refVoucherForm.current.show(row);
                              }}
                              className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                              <IconEdit size={20} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDialogOpen(row.discount_voucher_id);
                              }}
                              className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              <IconTrash size={22} />
                            </IconButton>
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
            count={totalVouchers}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={(_, newPage) => setPage(newPage + 1)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
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

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose} maxWidth="sm" fullWidth PaperProps={{ className: 'dark:bg-gray-800' }}>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <IconAlertCircle size={24} />
            Xác nhận xóa
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="dark:text-gray-300">{deleteTargetId ? 'Bạn có chắc chắn muốn xóa mã giảm giá này?' : `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} mã giảm giá đã chọn?`}</DialogContentText>
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button onClick={handleDeleteDialogClose} color="inherit">
              Hủy
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={loading}>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            iconMapping={{
              success: <CheckCircleIcon sx={{ fontSize: 18 }} />,
              error: <ErrorIcon sx={{ fontSize: 18 }} />,
              warning: <WarningIcon sx={{ fontSize: 18 }} />,
              info: <InfoIcon sx={{ fontSize: 18 }} />,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <VoucherFormDialog ref={refVoucherForm} saved={loadData} />
      </Box>
    </AdminLayout>
  );
}
