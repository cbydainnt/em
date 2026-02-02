import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Grid, Avatar, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconSearch, IconEye, IconCurrencyDong, IconBuildingBank, IconShoppingCart, IconClock, IconChecks, IconX, IconFilter } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import BankAccountForm from './bank-acount-form';
import { OrderItemType, OrderStatus, PaymentMethod, DiscountType } from '@/utils/enums';
import { formatVND } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { IconChartBar } from '@tabler/icons-react';

interface OrderType {
  order_id: string;
  user_id: string;
  total_price: number;
  status: OrderStatus; // Sử dụng enum
  payment_method: PaymentMethod; // Sử dụng enum
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  order_items: Array<{
    order_item_id: string;
    item_type: OrderItemType; // Sử dụng enum
    final_price: number;
    course?: {
      course_id: string;
      course_name: string;
      thumbnail?: string;
    };
    combo?: {
      combo_id: string;
      combo_name: string;
    };
  }>;
  discount_voucher?: {
    code: string;
    discount_type: DiscountType; // Sử dụng enum
    discount_value: number;
  };
}

interface Statistics {
  totalOrders: number;
  pendingOrders: number;
  paidOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export default function OrderManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 10 : 20);
  const [totalOrders, setTotalOrders] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [bankAccountDialogOpen, setBankAccountDialogOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [searchType, setSearchType] = useState<'customer' | 'course' | 'combo'>('customer');

  const statusMap: Record<OrderStatus, { label: string; color: 'warning' | 'success' | 'error' | 'default' }> = {
    [OrderStatus.PENDING]: { label: 'Chờ thanh toán', color: 'warning' },
    [OrderStatus.PAID]: { label: 'Đã thanh toán', color: 'success' },
    [OrderStatus.CANCELLED]: { label: 'Đã hủy', color: 'error' },
    [OrderStatus.FAILED]: { label: 'Thất bại', color: 'error' },
    [OrderStatus.PROCESSING]: { label: 'Đang xử lý', color: 'default' },
  };

  const paymentMethodMap: Record<PaymentMethod, string> = {
    [PaymentMethod.VNPAY]: 'VNPay',
    [PaymentMethod.MOMO]: 'Momo',
    [PaymentMethod.QRCODE]: 'QR Code',
  };

  useEffect(() => {
    if (page > 0) {
      loadData();
      loadStatistics();
    }
  }, [page, rowsPerPage, searchText, statusFilter, paymentMethodFilter]);

  const loadStatistics = async () => {
    try {
      const response = await axios.get('/api/admin/orders/statistics');
      setStatistics(response.data);
    } catch (error) {
      console.error('Error loading statistics', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/orders', {
        params: {
          page,
          pageSize: rowsPerPage,
          // search: searchText || undefined,
          status: statusFilter || undefined,
          paymentMethod: paymentMethodFilter || undefined,
          ...(searchText && {
            searchType,
            search: searchText,
          }),
        },
      });

      if (response.data) {
        setOrders(response.data.data);
        setTotalOrders(response.data.total);
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRowKeys(orders.map((o) => o.order_id));
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

  const isSelected = (id: string) => selectedRowKeys.indexOf(id) !== -1;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
    setParams({ page: String(newPage + 1) });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    setParams({ page: '1' });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const handleViewDetail = async (orderId: string) => {
    try {
      const response = await axios.get(`/api/admin/orders/${orderId}`);
      setSelectedOrder(response.data);
      setDetailDialogOpen(true);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể tải chi tiết đơn hàng',
        severity: 'error',
      });
    }
  };

  const handleUpdateStatus = async (orderId: string, status: number) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, { status });
      setSnackbar({
        open: true,
        message: 'Cập nhật trạng thái thành công',
        severity: 'success',
      });
      loadData();
      if (selectedOrder?.order_id === orderId) {
        setDetailDialogOpen(false);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể cập nhật trạng thái',
        severity: 'error',
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const clearFilters = () => {
    setSearchText('');
    setStatusFilter('');
    setPaymentMethodFilter('');
    setPage(1);
  };

  return (
    <AdminLayout>
      <Box sx={{ p: isSmallMobile ? 1 : 2, pt: 3 }}>
        {/* Statistics Cards - Responsive */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2,
          }}
        >
          <Typography variant={isMobile ? 'h5' : 'h4'} className="text-gray-800 dark:text-gray-100 font-semibold">
            Quản lý đơn hàng
          </Typography>
          <Button variant="contained" color="secondary" startIcon={<IconChartBar size={20} />} onClick={() => navigate('/admin/manage/transactions/report')}>
            Báo cáo tổng hợp
          </Button>
        </Box>
        {statistics && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={6} md={3}>
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white dark:from-blue-600 dark:to-blue-700">
                <CardContent sx={{ p: isSmallMobile ? 2 : 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconShoppingCart size={isSmallMobile ? 32 : 40} />
                    <Box>
                      <Typography variant={isSmallMobile ? 'h6' : 'h5'} fontWeight="bold">
                        {statistics.totalOrders}
                      </Typography>
                      <Typography variant={isSmallMobile ? 'caption' : 'body2'}>Tổng đơn hàng</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white dark:from-orange-600 dark:to-orange-700">
                <CardContent sx={{ p: isSmallMobile ? 2 : 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconClock size={isSmallMobile ? 32 : 40} />
                    <Box>
                      <Typography variant={isSmallMobile ? 'h6' : 'h5'} fontWeight="bold">
                        {statistics.pendingOrders}
                      </Typography>
                      <Typography variant={isSmallMobile ? 'caption' : 'body2'}>Chờ thanh toán</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white dark:from-green-600 dark:to-green-700">
                <CardContent sx={{ p: isSmallMobile ? 2 : 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconChecks size={isSmallMobile ? 32 : 40} />
                    <Box>
                      <Typography variant={isSmallMobile ? 'h6' : 'h5'} fontWeight="bold">
                        {statistics.paidOrders}
                      </Typography>
                      <Typography variant={isSmallMobile ? 'caption' : 'body2'}>Đã thanh toán</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white dark:from-purple-600 dark:to-purple-700">
                <CardContent sx={{ p: isSmallMobile ? 2 : 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconCurrencyDong size={isSmallMobile ? 32 : 40} />
                    <Box>
                      <Typography variant={isSmallMobile ? 'h6' : 'h5'} fontWeight="bold">
                        {formatVND(statistics.totalRevenue)}
                      </Typography>
                      <Typography variant={isSmallMobile ? 'caption' : 'body2'}>Doanh thu</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Header Section */}
        <Box>
          {/* Search and Filters */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: isMobile ? '100%' : 160,
              }}
            >
              <InputLabel className="dark:text-gray-300">Tìm theo</InputLabel>
              <Select
                value={searchType}
                label="Tìm theo"
                onChange={(e) => {
                  setSearchType(e.target.value as any);
                  setPage(1);
                }}
                sx={{
                  bgcolor: '#fff',
                  color: '#111827',
                  borderRadius: 1,

                  // border
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db',
                  },

                  // icon mũi tên
                  '& .MuiSelect-icon': {
                    color: '#6b7280',
                  },

                  '.dark &': {
                    bgcolor: '#1f2937',
                    color: '#f3f4f6',

                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#374151',
                    },

                    '& .MuiSelect-icon': {
                      color: '#9ca3af',
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

                      // MenuItem hover
                      '& .MuiMenuItem-root:hover': {
                        bgcolor: '#e5e7eb',
                      },
                      '.dark & .MuiMenuItem-root:hover': {
                        bgcolor: '#374151',
                      },

                      // MenuItem selected
                      '& .MuiMenuItem-root.Mui-selected': {
                        bgcolor: '#e0e7ff',
                      },
                      '.dark & .MuiMenuItem-root.Mui-selected': {
                        bgcolor: '#312e81',
                      },
                    },
                  },
                }}
              >
                <MenuItem value="customer">Khách hàng</MenuItem>
                <MenuItem value="course">Khóa học</MenuItem>
                <MenuItem value="combo">Combo</MenuItem>
              </Select>
            </FormControl>

            {/* Search Field */}
            <TextField
              size="small"
              placeholder={searchType === 'customer' ? 'Tìm tên hoặc email khách hàng...' : searchType === 'course' ? 'Tìm theo tên khóa học...' : 'Tìm theo tên combo...'}
              value={searchText}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={20} className="dark:text-gray-400" />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: '#fff',
                  color: '#111827',
                  borderRadius: '6px',
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
                minWidth: isMobile ? '100%' : 280,
                flex: isMobile ? 1 : 'none',
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
                '& .MuiInputBase-input': {
                  '.dark &::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
                },
              }}
            />

            {(isMobile ? filtersOpen : true) && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <FormControl size="small" sx={{ minWidth: isMobile ? 'calc(50% - 8px)' : 150 }}>
                  <InputLabel className="dark:text-gray-300">Trạng thái</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    sx={{
                      bgcolor: '#fff',
                      color: '#111827',
                      borderRadius: 1,

                      // border
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },

                      // icon mũi tên
                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },

                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',

                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#374151',
                        },

                        '& .MuiSelect-icon': {
                          color: '#9ca3af',
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

                          // MenuItem hover
                          '& .MuiMenuItem-root:hover': {
                            bgcolor: '#e5e7eb',
                          },
                          '.dark & .MuiMenuItem-root:hover': {
                            bgcolor: '#374151',
                          },

                          // MenuItem selected
                          '& .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#e0e7ff',
                          },
                          '.dark & .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#312e81',
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Tất cả</MenuItem>
                    <MenuItem value={OrderStatus.PENDING}>Chờ thanh toán</MenuItem>
                    <MenuItem value={OrderStatus.PAID}>Đã thanh toán</MenuItem>
                    <MenuItem value={OrderStatus.CANCELLED}>Đã hủy</MenuItem>
                    <MenuItem value={OrderStatus.FAILED}>Thất bại</MenuItem>
                    <MenuItem value={OrderStatus.PROCESSING}>Đang xử lý</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: isMobile ? 'calc(50% - 8px)' : 150 }}>
                  <InputLabel className="dark:text-gray-300">Thanh toán</InputLabel>
                  <Select
                    value={paymentMethodFilter}
                    label="Thanh toán"
                    sx={{
                      bgcolor: '#fff',
                      color: '#111827',
                      borderRadius: 1,

                      // border
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },

                      // icon mũi tên
                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },

                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#f3f4f6',

                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#374151',
                        },

                        '& .MuiSelect-icon': {
                          color: '#9ca3af',
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

                          // MenuItem hover
                          '& .MuiMenuItem-root:hover': {
                            bgcolor: '#e5e7eb',
                          },
                          '.dark & .MuiMenuItem-root:hover': {
                            bgcolor: '#374151',
                          },

                          // MenuItem selected
                          '& .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#e0e7ff',
                          },
                          '.dark & .MuiMenuItem-root.Mui-selected': {
                            bgcolor: '#312e81',
                          },
                        },
                      },
                    }}
                    onChange={(e) => {
                      setPaymentMethodFilter(e.target.value);
                      setPage(1);
                    }}
                    className="dark:text-gray-200"
                  >
                    <MenuItem value="">Tất cả</MenuItem>
                    <MenuItem value="1">VNPay</MenuItem>
                    <MenuItem value="2">Momo</MenuItem>
                    <MenuItem value="3">QR Code</MenuItem>
                  </Select>
                </FormControl>
                {selectedRowKeys.length > 0 && <Chip label={`Đã chọn ${selectedRowKeys.length} đơn`} color="primary" size="small" onDelete={() => setSelectedRowKeys([])} />}

                {(statusFilter || paymentMethodFilter || searchText) && (
                  <Button size="small" onClick={clearFilters} variant="outlined" color="secondary">
                    Xóa bộ lọc
                  </Button>
                )}
              </Box>
            )}
            <Box sx={{ display: 'flex-end', gap: 2, alignItems: 'center', flexWrap: 'wrap', marginLeft: 'auto' }}>
              {/* Bank Account Button */}
              <Button variant="outlined" size={isSmallMobile ? 'small' : 'medium'} startIcon={<IconBuildingBank size={20} />} onClick={() => setBankAccountDialogOpen(true)} className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">
                {isMobile ? 'Ngân hàng' : 'Tài khoản ngân hàng'}
              </Button>
              {/* Filter Toggle for Mobile */}
              {isMobile && (
                <IconButton onClick={() => setFiltersOpen(!filtersOpen)} className="border border-gray-300 dark:border-gray-600">
                  <IconFilter size={20} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>

        <TablePagination
          rowsPerPageOptions={isMobile ? [5, 10, 20] : [10, 20, 50]}
          component="div"
          count={totalOrders}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng:"
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

        {/* Orders Table */}
        <Paper className="dark:bg-gray-800 shadow-lg overflow-hidden">
          <TableContainer sx={{ maxHeight: isMobile ? 400 : 600 }}>
            <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
              <TableHead
                style={{
                  backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                  position: 'sticky',
                  top: 0,
                  zIndex: 2,
                }}
                className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
              >
                <TableRow className="dark:bg-gray-700">
                  <TableCell
                    padding="checkbox"
                    sx={{
                      bgcolor: 'inherit',
                      '.dark &': {
                        borderBottomColor: '#374151',
                      },
                    }}
                  >
                    <Checkbox
                      color="primary"
                      indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < orders.length}
                      checked={orders.length > 0 && selectedRowKeys.length === orders.length}
                      onChange={handleSelectAllClick}
                      sx={{
                        '& .MuiSvgIcon-root': {
                          color: '#6b7280',
                          '.dark &': {
                            color: '#9ca3af',
                          },
                        },
                        '&.Mui-checked .MuiSvgIcon-root': {
                          color: '#8b5cf6',
                          '.dark &': {
                            color: '#8b5cf6',
                          },
                        },
                      }}
                    />
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      className="font-semibold dark:text-gray-200"
                      sx={{
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Mã đơn
                    </TableCell>
                  )}
                  <TableCell
                    className="font-semibold dark:text-gray-200"
                    sx={{
                      bgcolor: 'inherit',
                      '.dark &': {
                        borderBottomColor: '#374151',
                        color: '#d1d5db',
                      },
                    }}
                  >
                    {isMobile ? 'Thông tin' : 'Khách hàng'}
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      className="font-semibold dark:text-gray-200"
                      sx={{
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Sản phẩm
                    </TableCell>
                  )}
                  <TableCell
                    className="font-semibold dark:text-gray-200"
                    sx={{
                      bgcolor: 'inherit',
                      '.dark &': {
                        borderBottomColor: '#374151',
                        color: '#d1d5db',
                      },
                    }}
                  >
                    Tổng tiền
                  </TableCell>
                  {!isSmallMobile && (
                    <TableCell
                      className="font-semibold dark:text-gray-200"
                      sx={{
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Thanh toán
                    </TableCell>
                  )}
                  <TableCell
                    className="font-semibold dark:text-gray-200"
                    sx={{
                      bgcolor: 'inherit',
                      '.dark &': {
                        borderBottomColor: '#374151',
                        color: '#d1d5db',
                      },
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      className="font-semibold dark:text-gray-200"
                      sx={{
                        bgcolor: 'inherit',
                        '.dark &': {
                          borderBottomColor: '#374151',
                          color: '#d1d5db',
                        },
                      }}
                    >
                      Ngày tạo
                    </TableCell>
                  )}
                  <TableCell
                    align="center"
                    className="font-semibold dark:text-gray-200"
                    sx={{
                      bgcolor: 'inherit',
                      '.dark &': {
                        borderBottomColor: '#374151',
                        color: '#d1d5db',
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
                    <TableCell colSpan={isMobile ? 5 : 9} align="center" sx={{ py: 10 }}>
                      <Typography className="dark:text-gray-300">Đang tải...</Typography>
                    </TableCell>
                  </TableRow>
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 5 : 9} align="center" sx={{ py: 10 }}>
                      <IconShoppingCart size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <Typography className="text-gray-500 dark:text-gray-400">Không có đơn hàng nào</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => {
                    const isItemSelected = isSelected(order.order_id);
                    const statusInfo = statusMap[order.status] || { label: 'Unknown', color: 'default' };

                    return (
                      <TableRow key={order.order_id} hover onClick={() => handleClick(order.order_id)} role="checkbox" aria-checked={isItemSelected} selected={isItemSelected} sx={{ cursor: 'pointer' }} className="dark:hover:bg-gray-700">
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
                        {!isMobile && <TableCell className="dark:text-gray-200 font-mono text-sm">{order.order_id.slice(-12).toUpperCase()}</TableCell>}
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar src={order.user.avatar} alt={order.user.name} sx={{ width: 32, height: 32 }}>
                              {order.user.name?.charAt(0)}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="body2" className="dark:text-gray-200 font-medium" noWrap>
                                {order.user.name}
                              </Typography>
                              {!isMobile && (
                                <Typography variant="caption" className="dark:text-gray-400">
                                  {order.user.email}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        {!isMobile && (
                          <TableCell className="dark:text-gray-200">
                            <Typography variant="body2">{order.order_items.length} khóa học</Typography>
                            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                              {order.order_items[0]?.course?.course_name || order.order_items[0]?.combo?.combo_name || 'N/A'}
                              {order.order_items.length > 1 && ` +${order.order_items.length - 1}`}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell className="dark:text-gray-200 font-semibold">{formatVND(order.total_price)}</TableCell>
                        {!isSmallMobile && (
                          <TableCell>
                            <Chip label={paymentMethodMap[order.payment_method || 1]} size="small" color="info" variant="outlined" />
                          </TableCell>
                        )}
                        <TableCell>
                          <Chip label={isMobile ? statusInfo.label.substring(0, 3) : statusInfo.label} color={statusInfo.color} size="small" />
                        </TableCell>
                        {!isMobile && (
                          <TableCell className="dark:text-gray-200">
                            <Typography variant="body2">{formatDate(order.created_at)}</Typography>
                            <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                              {new Date(order.created_at).toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetail(order.order_id);
                            }}
                            className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            <IconEye size={20} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={isMobile ? [5, 10, 20] : [10, 20, 50]}
            component="div"
            count={totalOrders}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng:"
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

        {/* Order Detail Dialog */}
        <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="md" fullWidth fullScreen={isMobile} PaperProps={{ className: 'dark:bg-gray-800' }}>
          <DialogTitle className="flex items-center justify-between dark:text-gray-200">
            <Typography variant="h6">Chi tiết đơn hàng</Typography>
            <IconButton
              sx={{
                color: 'text.secondary',
                '.dark &': {
                  color: '#9ca3af',
                },
              }}
              onClick={() => setDetailDialogOpen(false)}
            >
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedOrder && (
              <Box>
                {/* Customer Info */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" className="dark:text-gray-200 mb-2">
                    Thông tin khách hàng
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={selectedOrder.user.avatar} sx={{ width: 56, height: 56 }}>
                      {selectedOrder.user.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" className="dark:text-gray-200">
                        {selectedOrder.user.name}
                      </Typography>
                      <Typography variant="body2" className="dark:text-gray-400">
                        {selectedOrder.user.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Order Items */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" className="dark:text-gray-200 mb-2">
                    Sản phẩm ({selectedOrder.order_items.length})
                  </Typography>
                  {selectedOrder.order_items.map((item) => (
                    <Box
                      key={item.order_item_id}
                      sx={{
                        p: 2,
                        mb: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                        <Box sx={{ flex: 1, minWidth: 200 }}>
                          <Typography variant="body1" className="dark:text-gray-200">
                            {item.course?.course_name || item.combo?.combo_name}
                          </Typography>
                          <Typography variant="caption" className="dark:text-gray-400">
                            {item.item_type === 1 ? 'Combo' : 'Khóa học'}
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold" className="dark:text-gray-200">
                          {formatVND(item.final_price)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Order Summary */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" className="dark:text-gray-200 mb-2">
                    Thông tin đơn hàng
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" className="dark:text-gray-400">
                        Mã đơn:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className="dark:text-gray-200 font-mono">
                        {selectedOrder.order_id.slice(-12).toUpperCase()}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" className="dark:text-gray-400">
                        Ngày tạo:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" className="dark:text-gray-200">
                        {formatDateTime(selectedOrder.created_at)}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" className="dark:text-gray-400">
                        Phương thức:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Chip label={paymentMethodMap[selectedOrder.payment_method || 1]} size="small" color="info" />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" className="dark:text-gray-400">
                        Trạng thái:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Chip label={statusMap[selectedOrder.status]?.label || 'Unknown'} color={statusMap[selectedOrder.status]?.color || 'default'} size="small" />
                    </Grid>

                    {selectedOrder.discount_voucher && (
                      <>
                        <Grid item xs={6}>
                          <Typography variant="body2" className="dark:text-gray-400">
                            Mã giảm giá:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Chip label={selectedOrder.discount_voucher.code} size="small" color="success" variant="outlined" />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="h6" className="dark:text-gray-200">
                        Tổng tiền:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" className="dark:text-gray-200 text-right font-bold text-purple-600">
                        {formatVND(selectedOrder.total_price)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Status Actions */}
                {selectedOrder.status === 1 && (
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                    <Typography variant="body2" className="mb-2 dark:text-gray-800">
                      Đơn hàng đang chờ thanh toán. Cập nhật trạng thái:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button variant="contained" color="success" size="small" onClick={() => handleUpdateStatus(selectedOrder.order_id, 2)}>
                        Xác nhận đã thanh toán
                      </Button>
                      <Button variant="outlined" color="error" size="small" onClick={() => handleUpdateStatus(selectedOrder.order_id, 3)}>
                        Hủy đơn
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button onClick={() => setDetailDialogOpen(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>

        {/* Bank Account Dialog */}
        <Dialog open={bankAccountDialogOpen} onClose={() => setBankAccountDialogOpen(false)} maxWidth="md" fullWidth fullScreen={isMobile} PaperProps={{ className: 'dark:bg-gray-800' }}>
          <DialogTitle className="flex items-center justify-between dark:text-gray-200">
            <Typography variant="h6" className="flex items-center gap-2">
              <IconBuildingBank size={24} />
              Quản lý tài khoản ngân hàng
            </Typography>
            <IconButton onClick={() => setBankAccountDialogOpen(false)}>
              <IconX />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <BankAccountForm />
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button onClick={() => setBankAccountDialogOpen(false)}>Đóng</Button>
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
      </Box>
    </AdminLayout>
  );
}
