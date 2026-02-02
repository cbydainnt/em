import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider, Tooltip, Stack, IconButton, useTheme, useMediaQuery, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '@/layouts/default-layout';
import { useAuthStore } from '@/hooks/useAuthStore';
import axios from 'axios';
import { IconCopy } from '@tabler/icons-react';
import { Snackbar, Alert } from '@mui/material';
import { ActiveCodeStatus } from '@/utils/enums';
import { DiscountType } from '@/utils/enums';
import { formatVND } from '@/utils';
import { OrderStatus } from '@/utils/enums';
import DynamicBreadcrumb from '@/components/EM_BreadCrumb';

const keyGradient = 'linear-gradient(90deg, #a78bfa, #937debff, #8c70beff, #9b71caff, #9c7ef7ff)';
const gradientActive = 'linear-gradient(90deg, #22c55e, #22c55e)';
const gradientInactive = 'linear-gradient(90deg, #f3f3f3, #f3f3f3)';

interface CourseType {
  course_id: string;
  course_name: string;
  course_description: string;
  course_price: number;
  thumbnail: string;
}

interface ComboType {
  combo_id: string;
  combo_name: string;
  price: number;
  original_price: number;
  courses?: CourseType[];
}

interface OrderItem {
  order_item_id: string;
  item_type: number;
  final_price: number;
  course: CourseType;
  combo: ComboType | null;
}

interface Order {
  order_id: string;
  created_at: string;
  original_total_price: number;
  total_price: number;
  status: number;
  activated: string;
  order_items: OrderItem[];
  discount_vouchers?: DiscountVoucherUsage[];
}

interface ActiveCodeInfo {
  code: string;
  status: number;
  expires_at?: string | null;
  order_item_id: string;
}

interface DiscountVoucherUsage {
  id: string;
  discount_voucher_id: string;
  voucher?: {
    code: string;
    discount_type: number;
    discount_value: number;
  };
}

export default function OrderHistoryPage() {
  // const [selected, setSelected] = useState(mockOrders[0]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { authData } = useAuthStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [comboCourses, setComboCourses] = useState<Record<string, CourseType[]>>({});
  const [activeCodes, setActiveCodes] = useState<Record<string, ActiveCodeInfo>>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const getMonthDiff = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;

    const now = new Date();
    const expire = new Date(dateStr);

    const months = (expire.getFullYear() - now.getFullYear()) * 12 + (expire.getMonth() - now.getMonth());

    return months > 0 ? months : 0;
  };

  useEffect(() => {
    if (!authData?.id) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/order/user/${authData.id}`);
        console.log(res);
        const data = res.data;
        setOrders(data);
        if (data.length > 0) setSelected(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    };
    fetchOrders();
  }, [authData]);

  useEffect(() => {
    if (!orders.length) return;

    const fetchAllComboCourses = async () => {
      for (const order of orders) {
        for (const item of order.order_items) {
          if (item.combo?.combo_id && !comboCourses[item.combo.combo_id]) {
            try {
              const res = await axios.get(`/api/combo/${item.combo.combo_id}/courses`);
              setComboCourses((prev) => ({ ...prev, [item.combo!.combo_id]: res.data }));
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    };

    fetchAllComboCourses();
  }, [orders]);

  const getItemActivatedStatus = (item: OrderItem) => {
    let courses: string[] = [];

    if (item.course) {
      courses = [item.course.course_id];
    } else if (item.combo && comboCourses[item.combo.combo_id]?.length > 0) {
      courses = comboCourses[item.combo.combo_id].map((c) => c.course_id);
    }

    const total = courses.length;

    // 🚀 SỬA: Dùng composite key để tìm active code
    const used = courses.filter((cid) => {
      const compositeKey = `${cid}_${item.order_item_id}`;
      const activeCode = activeCodes[compositeKey];
      return activeCode?.status === ActiveCodeStatus.USED;
    }).length;

    return { used, total };
  };

  useEffect(() => {
    if (!authData?.id || !orders.length) return;

    const fetchAllActiveCodes = async () => {
      const newActiveCodes: Record<string, ActiveCodeInfo> = {};

      for (const order of orders) {
        for (const item of order.order_items) {
          // Course riêng
          if (item.course) {
            try {
              const res = await axios.get(`/api/active-code/course-code/${authData.id}/${item.course.course_id}/${item.order_item_id}`);
              if (res.data.success && res.data.data.length > 0) {
                // 🚀 SỬA: Dùng composite key
                const compositeKey = `${item.course.course_id}_${item.order_item_id}`;
                newActiveCodes[compositeKey] = {
                  code: res.data.data[0].code,
                  status: res.data.data[0].status,
                  expires_at: res.data.data[0].expires_at,
                  order_item_id: item.order_item_id,
                };
              }
            } catch (err) {
              console.error(err);
            }
          }

          // Combo
          if (item.combo && comboCourses[item.combo.combo_id]?.length > 0) {
            for (const c of comboCourses[item.combo.combo_id]) {
              try {
                const res = await axios.get(`/api/active-code/course-code/${authData.id}/${c.course_id}/${item.order_item_id}`);
                if (res.data.success && res.data.data.length > 0) {
                  // 🚀 SỬA: Dùng composite key
                  const compositeKey = `${c.course_id}_${item.order_item_id}`;
                  newActiveCodes[compositeKey] = {
                    code: res.data.data[0].code,
                    status: res.data.data[0].status,
                    expires_at: res.data.data[0].expires_at,
                    order_item_id: item.order_item_id,
                  };
                }
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
      }

      setActiveCodes((prev) => ({ ...prev, ...newActiveCodes }));
    };

    fetchAllActiveCodes();
  }, [authData, orders, comboCourses]);

  const getThumbnailUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('api/file/view')) {
      return url;
    }
    return `api/file/view/${url}`;
  };

  const getOrderActivationStatus = (order: Order) => {
    let total = 0;
    let used = 0;

    for (const item of order.order_items) {
      const status = getItemActivatedStatus(item);
      total += status.total;
      used += status.used;
    }

    return { used, total };
  };

  const getOrderColor = (order: Order) => {
    const { used, total } = getOrderActivationStatus(order);

    if (total > 0 && used === total) return gradientActive;
    return gradientInactive;
  };

  const getTotalActivationStatus = (order: Order) => {
    let total = 0;
    let used = 0;

    // Duyệt qua tất cả các item trong đơn hàng và tính tổng
    order.order_items.forEach((item) => {
      const { used: itemUsed, total: itemTotal } = getItemActivatedStatus(item);
      used += itemUsed;
      total += itemTotal;
    });

    return { used, total };
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'paid') return order.status === OrderStatus.PAID;
    if (filterStatus === 'pending') return order.status === OrderStatus.PENDING;
    if (filterStatus === 'cancelled') return order.status === OrderStatus.CANCELLED;
    if (filterStatus === 'failed') return order.status === OrderStatus.FAILED;
    return true;
  });
  useEffect(() => {
    if (filteredOrders.length > 0) {
      setSelected(filteredOrders[0]);
    } else {
      setSelected(null);
    }
  }, [filterStatus, orders]);

  const statusMessages = {
    paid: 'Không tìm thấy đơn hàng "Đã thanh toán" trong lịch sử!',
    pending: 'Không tìm thấy đơn hàng "Chưa thanh toán" trong lịch sử!',
    cancelled: 'Không tìm thấy đơn hàng "Đã hủy" trong lịch sử!',
    failed: 'Không tìm thấy đơn hàng "Giao dịch thất bại" trong lịch sử!',
  };

  return (
    <DefaultLayout hideSidebarToggle>
      <Box
        sx={{
          px: { xs: 2, md: 2 },
        }}
      >
        <DynamicBreadcrumb isOrderHistory={true} />
      </Box>
      <Box
        sx={{
          minHeight: '100vh',
          p: { xs: 2, md: 2 },
          backgroundColor: 'rgb(var(--bg-primary))',
          color: 'text.primary',
          transition: 'all 0.3s ease',
        }}
      >
        {orders.length > 0 && (
          <Box sx={{ mb: 2, width: 220 }}>
            <FormControl fullWidth size="small">
              <InputLabel className="dark:text-gray-300">Trạng thái</InputLabel>
              <Select
                label="Trạng thái"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="dark:text-white"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'inherit',
                  },
                  '& .MuiSelect-icon': {
                    color: 'inherit',
                  },
                }}
                MenuProps={{
                  classes: {
                    paper: 'dark:bg-gray-900 dark:text-white',
                  },
                  MenuListProps: {
                    className: 'dark:bg-gray-900',
                  },
                }}
              >
                <MenuItem
                  value="all"
                  sx={{
                    fontWeight: filterStatus === 'all' ? 'bold' : 'normal',
                    color: filterStatus === 'all' ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 113, 207, 0.25)',
                    },
                  }}
                >
                  Tất cả đơn hàng
                </MenuItem>
                <MenuItem
                  value="paid"
                  sx={{
                    fontWeight: filterStatus === 'paid' ? 'bold' : 'normal',
                    color: filterStatus === 'paid' ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 113, 207, 0.25)',
                    },
                  }}
                >
                  Đã thanh toán
                </MenuItem>
                <MenuItem
                  value="pending"
                  sx={{
                    fontWeight: filterStatus === 'pending' ? 'bold' : 'normal',
                    color: filterStatus === 'pending' ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 113, 207, 0.25)',
                    },
                  }}
                >
                  Chưa thanh toán
                </MenuItem>
                <MenuItem
                  value="cancelled"
                  sx={{
                    fontWeight: filterStatus === 'cancelled' ? 'bold' : 'normal',
                    color: filterStatus === 'cancelled' ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 113, 207, 0.25)',
                    },
                  }}
                >
                  Đã hủy
                </MenuItem>
                <MenuItem
                  value="failed"
                  sx={{
                    fontWeight: filterStatus === 'failed' ? 'bold' : 'normal',
                    color: filterStatus === 'failed' ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 113, 207, 0.25)',
                    },
                  }}
                >
                  Giao dịch thất bại
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        <Grid container spacing={isMobile ? 2 : 3}>
          {loading ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '50vh',
                }}
              >
                <CircularProgress />
              </Box>
            </Grid>
          ) : orders.length === 0 ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '50vh',
                  textAlign: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Không có đơn hàng. Mua ngay để tham gia khóa học!
                </Typography>

                <img
                  src="api/file/view/englishmaster/Images/11329060.png" // đường dẫn tới hình ảnh
                  style={{ width: 200, height: 200, objectFit: 'contain' }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1,
                      textTransform: 'none',
                      fontSize: '15px',
                      fontWeight: 500,
                      backgroundColor: '#9c27b0',
                      '&:hover': { backgroundColor: '#7b1fa2' },
                    }}
                  >
                    Về trang chủ
                  </Button>
                </Box>
              </Box>
            </Grid>
          ) : filteredOrders.length === 0 ? ( // Check if there are no orders after filtering
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '50vh',
                  textAlign: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="h6" className="dark:text-white" sx={{ fontWeight: 600 }}>
                  {statusMessages[filterStatus as keyof typeof statusMessages]}
                </Typography>

                <img
                  src="api/file/view/englishmaster/Images/11329060.png" // replace with the correct image path if needed
                  style={{ width: 200, height: 200, objectFit: 'contain' }}
                />
              </Box>
            </Grid>
          ) : (
            <>
              {/* DANH SÁCH ĐƠN HÀNG */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    borderRadius: 3,
                    // boxShadow: '0 2px 10px rgba(167,139,250,0.15)',
                    overflow: 'hidden',
                  }}
                  className="dark:bg-gray-800 dark:text-white"
                >
                  <CardContent sx={{ p: 2, maxHeight: '75vh', overflowY: 'auto' }}>
                    {filteredOrders.map((order, index) => {
                      const { used, total } = getTotalActivationStatus(order);

                      return (
                        <Box
                          key={order.order_id || `order-${index}`}
                          onClick={() => setSelected(order)}
                          sx={{
                            p: 1.5,
                            mb: 1.5,
                            borderRadius: 2,
                            cursor: 'pointer',
                            background: selected?.order_id === order.order_id ? keyGradient : getOrderColor(order),
                            color: selected?.order_id === order.order_id ? 'white' : '#5e5a5aff',
                            transition: '0.25s',
                            '&:hover': {
                              background: selected?.order_id === order.order_id ? keyGradient : getOrderColor(order),
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                              <Typography fontWeight={600}>{new Date(order.created_at).toLocaleDateString('vi-VN')}</Typography>
                              <Typography variant="caption">Thời gian: {new Date(order.created_at).toLocaleTimeString('vi-VN')}</Typography>
                            </Box>

                            {/* Hiển thị thông tin "Đã kích hoạt: x/y" một lần duy nhất */}
                            <Typography variant="caption" fontWeight={600}>
                              Đã kích hoạt: {used}/{total}
                            </Typography>
                          </Stack>

                          <Divider sx={{ my: 0.8, opacity: 0.5 }} />

                          {/* Danh sách khóa học */}
                          <Box mt={0.5}>
                            {order.order_items.map((item) => (
                              <Typography key={item.order_item_id} variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                {item.course?.course_name || item.combo?.combo_name}
                              </Typography>
                            ))}
                            {order.discount_vouchers?.length ? (
                              <Box sx={{ mt: 0.5 }}>
                                {order.discount_vouchers.map((usage) => (
                                  <Typography key={usage.id} variant="caption" display="block">
                                    Mã khuyến mãi: {usage.voucher?.code} - Giảm {usage.voucher?.discount_type === DiscountType.PERCENT ? `${usage.voucher?.discount_value}%` : formatVND(usage.voucher?.discount_value || 0)}
                                  </Typography>
                                ))}
                              </Box>
                            ) : null}
                            <Typography variant="caption">
                              Tổng giá trị: {''}
                              <span>{formatVND(order?.total_price)}</span>
                            </Typography>
                          </Box>
                          <Typography variant="caption">Trạng thái: {order.status === 1 ? 'Chưa thanh toán' : order.status === 2 ? 'Đã thanh toán' : order.status === 3 ? 'Hủy' : order.status === 4 ? 'Giao dịch thất bại' : 'Không Xác Định'}</Typography>
                        </Box>
                      );
                    })}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    borderRadius: 3,
                    // boxShadow: '0 2px 10px rgba(167,139,250,0.15)',
                    overflow: 'hidden',
                  }}
                  className="dark:bg-gray-800 dark:text-white"
                >
                  <CardContent sx={{ p: 2.5 }}>
                    {/* STATUS BADGE */}
                    {selected && (
                      <Box
                        sx={{
                          display: 'inline-block',
                          mb: 2,
                          px: 1.8,
                          py: 0.6,
                          borderRadius: 2,
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: 'white',
                          backgroundColor: selected.status === 1 ? '#facc15' : selected.status === 2 ? '#22c55e' : selected.status === 3 ? '#9ca3af' : selected.status === 4 ? '#ef4444' : '#6b7280',
                          width: 'fit-content',
                          textTransform: 'uppercase',
                        }}
                      >
                        {selected.status === 1 ? 'Chưa thanh toán' : selected.status === 2 ? 'Đã thanh toán' : selected.status === 3 ? 'Hủy' : selected.status === 4 ? 'Giao dịch thất bại' : 'Không xác định'}
                      </Box>
                    )}
                    <Grid container spacing={1} mb={2}>
                      <Grid item xs={6} md={6}>
                        <Typography
                          component="div"
                          variant="body2"
                          sx={{
                            mt: 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'nowrap',
                            gap: 0.5,
                            fontSize: '0.9rem',
                            whiteSpace: 'nowrap',
                            '@media (max-width: 600px)': {
                              whiteSpace: 'normal',
                              flexWrap: 'wrap',
                            },
                          }}
                        >
                          <span style={{ whiteSpace: 'nowrap' }}>{selected?.created_at ? new Date(selected.created_at).toLocaleString() : ''}</span>
                          <Typography component="span" sx={{ mx: 1 }}>
                            |
                          </Typography>
                          <Typography component="span" variant="body2" sx={{}}>
                            Mã đơn hàng: {''}
                            <span>{selected?.order_id}</span>
                          </Typography>
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ mb: 2 }} />

                    {/* DANH SÁCH KHÓA HỌC */}
                    {selected?.order_items?.map((item, index) => {
                      const coursesInCombo = item.combo?.combo_id ? comboCourses[item.combo.combo_id] : [];

                      // Nếu là course riêng
                      if (item.course) {
                        return (
                          <Box
                            key={item.order_item_id || `item-${index}`}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              p: 1.5,
                              mb: 1.5,
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              justifyContent: 'space-between',
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              gap: 1.5,
                              transition: '0.2s',
                              '&:hover': { borderColor: '#7130e9ff' },
                            }}
                            className="dark:bg-gray-700 dark:text-white"
                          >
                            <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                              <img
                                src={getThumbnailUrl(item.course.thumbnail)}
                                alt={item.course.course_name}
                                style={{
                                  width: 200,
                                  height: 105,
                                  borderRadius: 8,
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                }}
                                onClick={() => item.course && navigate(`/khoa-hoc/${item.course.course_id}`)}
                              />
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => item.course && navigate(`/khoa-hoc/${item.course.course_id}`)}>
                                  {item.course.course_name}
                                </Typography>
                                <Typography variant="body2" fontWeight={700} textAlign="right" sx={{ whiteSpace: 'nowrap', color: '#854ceeff' }}>
                                  {formatVND(item.course.course_price)}
                                </Typography>
                              </Box>
                            </Box>

                            {item.course && (
                              <Box
                                sx={{
                                  width: 205,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  alignItems: 'flex-start',
                                  padding: 0,
                                }}
                              >
                                <Typography variant="subtitle2" fontWeight={700} textAlign="right" sx={{ whiteSpace: 'nowrap' }}>
                                  Mã kích hoạt: {''}
                                  {activeCodes[`${item.course.course_id}_${item.order_item_id}`]?.status != ActiveCodeStatus.USED ? (
                                    <span>
                                      <span style={{ color: '#854ceeff' }}>{activeCodes[`${item.course.course_id}_${item.order_item_id}`]?.code || 'Đang chờ'}</span>
                                      {activeCodes[`${item.course.course_id}_${item.order_item_id}`] && (
                                        <Tooltip title="Sao chép">
                                          <IconButton
                                            size="small"
                                            sx={{
                                              color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                                            }}
                                            onClick={() => {
                                              const code = activeCodes[`${item.course.course_id}_${item.order_item_id}`]?.code;
                                              if (code) {
                                                navigator.clipboard.writeText(code);
                                                setCopySuccess(true);
                                              }
                                            }}
                                          >
                                            <IconCopy size={16} />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </span>
                                  ) : (
                                    <span style={{ color: '#ee4c4cff' }}>Đã sử dụng</span>
                                  )}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                  <Typography variant="subtitle2" fontWeight={700} textAlign="right" sx={{ whiteSpace: 'nowrap' }}>
                                    Thời hạn: {!activeCodes[`${item.course.course_id}_${item.order_item_id}`] ? 'Không có' : activeCodes[`${item.course.course_id}_${item.order_item_id}`]?.expires_at ? `${getMonthDiff(activeCodes[`${item.course.course_id}_${item.order_item_id}`]?.expires_at)} tháng` : 'Vĩnh viễn'}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        );
                      }

                      // Nếu là combo → hiển thị tất cả course trong combo
                      if (item.combo && coursesInCombo?.length > 0) {
                        return coursesInCombo.map((c) => {
                          const compositeKey = `${c.course_id}_${item.order_item_id}`;
                          const activeCode = activeCodes[compositeKey];

                          return (
                            <Box
                              key={c.course_id}
                              sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                p: 1.5,
                                mb: 1.5,
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: { xs: 'flex-start', sm: 'center' },
                                gap: 1.5,
                                transition: '0.2s',
                                '&:hover': { borderColor: '#7130e9ff' },
                              }}
                              className="dark:bg-gray-700 dark:text-white"
                            >
                              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                                <img
                                  src={getThumbnailUrl(c.thumbnail)}
                                  alt={c.course_name}
                                  style={{
                                    width: 200,
                                    height: 105,
                                    borderRadius: 8,
                                    objectFit: 'cover',
                                  }}
                                />
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                  }}
                                >
                                  <Typography variant="subtitle1" sx={{ fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => c?.course_id && navigate(`/khoa-hoc/${c.course_id}`)}>
                                    {c.course_name}
                                  </Typography>
                                  <Typography variant="subtitle2" fontWeight={700} textAlign="right" sx={{ whiteSpace: 'nowrap', color: '#854ceeff' }}>
                                    {formatVND(c.course_price)}
                                  </Typography>
                                </Box>
                              </Box>
                              {/* <Box
                                sx={{
                                  width: '1px',
                                  height: '70px',
                                }}
                              /> */}
                              <Box
                                sx={{
                                  width: 205,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                  alignItems: 'flex-start',
                                  padding: 0,
                                }}
                              >
                                <Typography variant="subtitle2" fontWeight={700} textAlign="right" sx={{ whiteSpace: 'nowrap' }}>
                                  Mã kích hoạt: {''}
                                  {activeCodes[`${c.course_id}_${item.order_item_id}`]?.status != ActiveCodeStatus.USED ? (
                                    <span>
                                      <span style={{ color: '#854ceeff' }}>{activeCode?.code || 'Đang chờ'}</span>
                                      {activeCode && (
                                        <Tooltip title="Sao chép">
                                          <IconButton
                                            size="small"
                                            sx={{
                                              color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
                                            }}
                                            onClick={() => {
                                              if (activeCode.code) {
                                                navigator.clipboard.writeText(activeCode.code);
                                                setCopySuccess(true);
                                              }
                                            }}
                                          >
                                            <IconCopy size={16} />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </span>
                                  ) : (
                                    <span style={{ color: '#ee4c4cff' }}>Đã sử dụng</span>
                                  )}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                  <Typography variant="subtitle2" fontWeight={700} textAlign="right" sx={{ whiteSpace: 'nowrap' }}>
                                    Thời hạn: {!activeCode ? 'Không có' : activeCode.expires_at ? `${getMonthDiff(activeCode.expires_at)} tháng` : 'Vĩnh viễn'}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          );
                        });
                      }
                      return null;
                    })}
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <Snackbar open={copySuccess} autoHideDuration={2000} onClose={() => setCopySuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ mt: 8 }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Đã sao chép mã kích hoạt!
        </Alert>
      </Snackbar>
    </DefaultLayout>
  );
}
