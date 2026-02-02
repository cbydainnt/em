import { Box, Typography, Button, Divider, Card, CardContent, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DefaultLayout from '@/layouts/default-layout';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useCartStore } from '@/hooks/useCartStore';
import { formatVND } from '@/utils';
import DynamicBreadcrumb from '@/components/EM_BreadCrumb';

export default function EM_AddToCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const { decrementCartCount } = useCartStore();

  useEffect(() => {
    if (!authData?.id) return; // không có user thì không fetch

    const fetchCart = async () => {
      try {
        const res = await axios.get(`/api/cart_item/${authData.id}`);
        const formatted = res.data.map((item: any) => ({
          course_id: item.course.course_id,
          course_name: item.course.course_name,
          course_price: item.course.course_price,
          course_original_price: item.course.course_original_price,
          thumbnail: item.course.thumbnail,

          access_type: item.course.access_type,
          access_duration_months: item.course.access_duration_months,
          access_expire_at: item.course.access_expire_at,

          selected: item.selected,
        }));
        setCartItems(formatted);

        const selectedFromDB = formatted.filter((item: any) => item.selected).map((item: any) => item.course_id);

        setSelectedItems(selectedFromDB);

        console.log('formatted', formatted);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [authData]);

  const handleRemove = async (courseId: string) => {
    if (!authData?.id) return;

    try {
      await axios.delete(`/api/cart_item/remove`, {
        params: { user_id: authData.id, course_id: courseId },
      });
      setCartItems((prev) => prev.filter((item) => item.course_id !== courseId));
      setSelectedItems((prev) => prev.filter((id) => id !== courseId));
      decrementCartCount();
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  const handleRemoveSelected = async () => {
    if (!authData?.id || selectedItems.length === 0) return;

    try {
      await axios.post('/api/cart_item/remove-selected', {
        user_id: authData.id,
        course_ids: selectedItems,
      });

      setCartItems((prev) => prev.filter((item) => !selectedItems.includes(item.course_id)));
      setSelectedItems([]);

      selectedItems.forEach(() => decrementCartCount());
    } catch (err) {
      console.error('Error removing selected items:', err);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.course_id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = async (courseId: string, checked: boolean) => {
    setSelectedItems((prev) => (checked ? [...prev, courseId] : prev.filter((id) => id !== courseId)));
  };

  const selectedCourses = cartItems.filter((item) => selectedItems.includes(item.course_id));

  const totalPrice = selectedCourses.reduce((sum, item) => sum + item.course_price, 0);

  const handleCheckout = async () => {
    if (!authData?.id || selectedCourses.length === 0) return;
    try {
      await axios.post('/api/cart_item/confirm-selection', {
        user_id: authData.id,
        course_ids: selectedItems,
      });
      navigate(`/thanh-toan?userId=${authData?.id}`);
    } catch (err) {
      console.error('Error during checkout:', err);
    }
  };

  const getThumbnailUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('api/file/view')) {
      return url;
    }
    return `api/file/view/${url}`;
  };

  return (
    <DefaultLayout hideSidebarToggle={true}>
      <Box
        sx={{
          display: 'flex',
          px: { xs: 2, sm: 4, md: 10, lg: 18 },
        }}
      >
        <DynamicBreadcrumb isAddToCart={true} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          px: { xs: 2, sm: 4, md: 10, lg: 20 },
          alignItems: 'flex-start',
        }}
      >
        {/* --- Left: Cart items list --- */}
        <Box flex={{ md: 3 }} width={{ xs: '100%', md: 'auto' }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Giỏ hàng ({cartItems.length})
          </Typography>

          {cartItems.length > 0 && (
            <Box
              sx={{
                position: { xs: 'sticky', md: 'sticky' },
                top: { xs: 0, md: 0 }, // Điều chỉnh vị trí sticky
                zIndex: 10,
                py: { xs: 1, md: 0.5 },
                mb: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // trắng đục
                backdropFilter: 'blur(25px)', // làm mờ phía sau
                WebkitBackdropFilter: 'blur(10px)',
              }}
              className="dark:bg-gray-900"
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mt={1} sx={{ pl: 2 }}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={selectedItems.length === cartItems.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    sx={{
                      '.dark &': {
                        color: '#fff',
                      },
                      '&.Mui-checked': {
                        color: '#2e78e7ff',
                      },
                    }}
                  />
                  <Typography>Chọn tất cả</Typography>
                </Box>
                <Button
                  color="error"
                  variant="text"
                  onClick={handleRemoveSelected}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    textDecoration: 'underline',
                    fontSize: '1rem',
                  }}
                >
                  Xóa
                </Button>
              </Box>
            </Box>
          )}

          {cartItems.length === 0 ? (
            <Typography color="text.secondary">Chưa có khóa học nào trong giỏ hàng.</Typography>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.course_id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: 'space-between',
                  mb: 2,
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                className="dark:bg-gray-800 dark:text-white"
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 1.5, sm: 2 },
                    width: '100%',
                  }}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.course_id)}
                    onChange={(e) => handleSelectItem(item.course_id, e.target.checked)}
                    sx={{
                      '.dark &': {
                        color: '#fff',
                      },
                      '&.Mui-checked': {
                        color: '#2e78e7ff',
                      },
                    }}
                  />
                  {item.thumbnail && (
                    <Box
                      component="img"
                      src={getThumbnailUrl(item.thumbnail)}
                      alt={item.course_name}
                      sx={{
                        // Responsive width/height theo breakpoint
                        width: { xs: '90%', sm: 180, md: 260 },
                        height: { xs: 'auto', sm: 120, md: 180 },
                        // minWidth/minHeight đảm bảo tất cả hình có cùng kích thước
                        minWidth: { sm: 180, md: 260 },
                        minHeight: { sm: 120, md: 180 },
                        borderRadius: 2,
                        objectFit: 'cover',
                        cursor: 'pointer',

                        display: 'block',
                        mx: { xs: 'auto', sm: 0 },
                      }}
                      onClick={() => navigate(`/khoa-hoc/${item.course_id}`)}
                    />
                  )}
                  <Box
                    sx={{
                      width: { xs: '90%', sm: 'auto' }, // ✅ bằng width ảnh
                      mx: { xs: 'auto', sm: 0 }, // ✅ cùng mép trái ảnh
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                          cursor: 'pointer',
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // 👈 tối đa 2 dòng
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word', // 👈 chống từ quá dài
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                        onClick={() => navigate(`/khoa-hoc/${item.course_id}`)}
                      >
                        {item.course_name}
                      </Typography>
                      {(item.access_type === 1 || item.access_type === 3) && (
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            display: 'inline-block',
                            py: 0.25,
                            borderRadius: 1,
                            fontSize: '0.9rem',
                          }}
                        >
                          {item.access_type === 1 ? `(Truy cập ${item.access_duration_months} tháng kể từ khi kích hoạt)` : `(Hết hạn vào ${new Date(item.access_expire_at).toLocaleDateString('vi-VN')})`}
                        </Typography>
                      )}
                      <Typography variant="body1" fontWeight={600} color="#ff0000" sx={{ mt: 0.5 }}>
                        {formatVND(item.course_price)}
                      </Typography>
                    </CardContent>
                  </Box>
                </Box>

                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleRemove(item.course_id)}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                    textDecoration: 'underline',
                    minWidth: 'auto',
                    p: 0,
                    mt: { xs: 1, sm: 0 },
                    ml: { xs: 1.5, sm: 3 },
                    alignSelf: { xs: 'flex-start', sm: 'center' },
                  }}
                >
                  Xóa
                </Button>
              </Card>
            ))
          )}
        </Box>

        {/* --- Right: Order summary --- */}
        <Box
          flex={{ md: 1.2 }}
          width="100%"
          sx={{
            position: { xs: 'static', md: 'sticky' },
            top: { md: 16 },
            mt: { xs: 3, md: 16 },
            mb: { xs: 'calc(16px + env(safe-area-inset-bottom))', md: 0 },
            alignSelf: 'flex-start',
            zIndex: 10,
          }}
        >
          <Card
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              bgcolor: '#fff',
            }}
            className="dark:bg-gray-800 dark:text-white"
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
              sx={{
                color: '#1f2937',
                '.dark &': {
                  color: '#fff',
                },
                whiteSpace: 'nowrap',
              }}
            >
              Thông tin đơn hàng:
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tổng</Typography>
              <Typography>{selectedCourses.length} khoá học</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tạm tính</Typography>
              <Typography>{formatVND(totalPrice)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
                Tổng thanh toán
              </Typography>
              <Typography fontWeight={700} color="#ff0000" sx={{ ml: 1 }}>
                {formatVND(totalPrice)}
              </Typography>
            </Box>

            <Button fullWidth variant="contained" className="bg-purple-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" sx={{ whiteSpace: 'nowrap' }} onClick={handleCheckout}>
              Xác nhận thanh toán
            </Button>
          </Card>
        </Box>
      </Box>
    </DefaultLayout>
  );
}
