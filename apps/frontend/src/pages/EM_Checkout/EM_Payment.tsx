import { Box, Typography, Stepper, Step, StepLabel, TextField, Button, Divider, Fade, Grid, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState, useRef } from 'react';
import { IconQrcode } from '@tabler/icons-react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import EM_Login from '@/components/EM_Login';
import ConfirmDialog from '@/components/EM_ConfirmDialog';
import { logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';
const steps = ['Xác nhận thông tin đơn hàng', 'Xác nhận thanh toán', 'Giao dịch', 'Hoàn tất thanh toán'];

export default function EM_Payment() {
  const [activeStep, setActiveStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [course, setCourse] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { authData } = useAuthStore();
  const courseID = searchParams.get('courseID');
  const comboID = searchParams.get('comboID');
  const userID = searchParams.get('userId');
  const navigate = useNavigate();
  const refEM_Login = useRef<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [itemsList, setItemsList] = useState<string[]>([]);
  const [promoResult, setPromoResult] = useState<any>(null);
  interface Order {
    order_id: string;
    user_id: string;
    total_price: number;
    status: number;
    payment_method: number;
    created_at: string;
    updated_at: string;
    discount_voucher_id: string | null;
  }
  useEffect(() => {
    if (!authData) {
      setPromoResult(null);
      setPromoCode('');
    }
  }, [authData]);

  useEffect(() => {
    if (!courseID && !comboID && !userID) {
      setLoading(false);
      return;
    }
    const fetchCourses = async () => {
      try {
        let res;

        if (courseID) {
          //Trường hợp 1: Mua 1 khóa lẻ
          res = await axios.get(`/api/course/${courseID}`);
          const data = res.data;
          setCourse(Array.isArray(data) ? data : [data]);
        } else if (comboID) {
          //Trường hợp 2: Mua combo
          res = await axios.get(`/api/combo/${comboID}/courses`);
          setCourse(res.data);

          const comboRes = await axios.get(`/api/combo/${comboID}`);
          const comboData = comboRes.data;
          setCourse((prev) => (prev.length > 0 ? [{ ...prev[0], combo_price: comboData.price }, ...prev.slice(1)] : [{ combo_price: comboData.price }]));
        } else if (userID) {
          //Trường hợp 3: Mua nhiều khóa lẻ trong giỏ hàng
          res = await axios.get(`/api/cart_item/${userID}`);
          const selectedItems = res.data.filter((item: any) => item.selected === true);
          const coursesOnly = selectedItems.map((item: any) => item.course);
          setCourse(coursesOnly);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseID, comboID, userID]);

  useEffect(() => {
    const lst: string[] = [];
    if (courseID) {
      lst.push(courseID);
    } else {
      lst.push(...course.map((c) => c.course_id));
    }
    setItemsList(lst);
  }, [courseID, comboID, userID, course]);

  const totalPrice = comboID ? course[0]?.combo_price || 0 : course.reduce((sum, c) => sum + (c.course_price || 0), 0);
  const discountValue = promoResult?.voucher?.discount_value || 0;
  const discountType = promoResult?.voucher?.discount_type || 0;
  const applicableItems = promoResult?.applicableItems || [];

  let applicableAmount = 0;

  // Lấy tổng giá các khóa được áp dụng voucher
  if (comboID) {
    applicableAmount = course[0]?.combo_price || 0;
  } else {
    // Lấy tổng giá các khóa được áp dụng voucher
    if (Array.isArray(applicableItems) && applicableItems.length > 0) {
      applicableAmount = course.filter((c) => applicableItems.includes(c.course_id)).reduce((sum, c) => sum + (c.course_price || 0), 0);
    }
  }

  let discount = 0;

  if (discountType === 2) {
    discount = discountValue;
  } else if (discountType === 1) {
    discount = Math.floor((applicableAmount * discountValue) / 100);
  }
  const discountApplied = Math.min(discount, applicableAmount || totalPrice);
  const lastPrice = totalPrice - discountApplied;
  const handleApplyPromo = async () => {
    if (!authData) {
      refEM_Login.current.show();
      setPromoCode('');
      return;
    }
    try {
      const payload: any = {
        code: promoCode,
        userId: authData.id,
        orderItems: itemsList,
      };
      if (comboID) payload.comboId = comboID;
      const res = await axios.post('/api/admin/discount-vouchers/apply', payload);
      setPromoResult(res.data);
      localStorage.setItem('voucherId', res.data.voucher.discount_voucher_id);
    } catch (error: any) {
      if (error.response?.data?.message) {
        discount = 0;
        setPromoCode('');
        alert(`Lỗi áp dụng voucher: ${error.response.data.message}`);
      } else {
        setPromoCode('');
        alert('Có lỗi xảy ra khi áp dụng voucher.');
      }
    }
  };

  const handleBuy = async () => {
    const data = {
      combo_id: comboID,
      user_id: authData.id,
      total_price: lastPrice,
      payment_method: 'qrcode',
      items: itemsList,
    };
    try {
      const response = await axios.post('/api/order/create', data);
      const orderData = response.data.order;
      setOrder(orderData);
      localStorage.setItem('checkoutOrderId', orderData.order_id);
      if (data.total_price > 0) {
        // Create QR code if total price > 0
        let content = `Thanh toán đơn hàng`;
        setContent(content);
        const makeQrRes = await axios.post('/api/qrcode/payos-link', {
          amount: lastPrice,
          addInfo: content,
          courseID: courseID,
          comboID: comboID,
          origin: window.location.origin,
        });
        if (makeQrRes.status === 201) {
          window.location.href = makeQrRes.data.checkoutUrl;
        }
      } else {
        handlePaymentSucess();
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const [order, setOrder] = useState<Order | null>(null);
  const [content, setContent] = useState<string>();
  const handleNext = async () => {
    if (activeStep == 2) {
      if (!authData) {
        refEM_Login.current.show();
        return;
      }

      if (courseID) {
        const res = await checkOrder([courseID], 2, authData.id);
        if (res.data.length > 0) {
          setConfirmMessage('Khóa học đã được thanh toán. Bạn có muốn mua lại?');
          setConfirmOpen(true);
        } else {
          handleBuy();
        }
      } else if (comboID) {
        const res = await checkOrder([comboID], 1, authData.id);
        if (res.data.length > 0) {
          setConfirmMessage('Combo đã được thanh toán. Bạn có muốn mua lại?');
          setConfirmOpen(true);
        } else {
          handleBuy();
        }
      } else {
        handleBuy();
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const success = searchParams.get('success');
  const status = searchParams.get('status');
  useEffect(() => {
    if (!success || !status) return;
    if (!authData?.id || !authData?.name) return;

    const savedOrderId = localStorage.getItem('checkoutOrderId');

    if (status.toUpperCase() === 'CANCELLED' || (success === 'true' && status.toUpperCase() === 'PAID')) {
      handlePaymentSucess();
      return;
    }

    if (success === 'false') {
      if (savedOrderId) {
        let stat = '';
        switch (status) {
          case 'PENDING':
            stat = 'pending';
            break;
          case 'PROCESSING':
            stat = 'processing';
            break;
          case 'CANCELLED':
            stat = 'cancelled';
            break;
        }

        axios.put(`/api/order/${savedOrderId}`, { status: stat });
        localStorage.removeItem('checkoutOrderId');
      }

      setActiveStep(1);
    }
  }, [success, status, authData]);

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  function checkOrder(key: string[], type: number, userId: string) {
    return axios.post('/api/order/check-order', {
      keys: key,
      type: type,
      user_id: userId,
    });
  }

  function handlePaymentSucess() {
    const savedOrderId = localStorage.getItem('checkoutOrderId');
    const savedVoucherId = localStorage.getItem('voucherId');
    if (savedVoucherId) {
      const handleVoucherUse = async () => {
        try {
          const res = await axios.post('/api/admin/discount-vouchers/use', {
            voucherId: savedVoucherId,
            userId: authData.id,
            orderId: savedOrderId,
          });

          if (res.data.success) {
            localStorage.removeItem('voucherId');
          } else {
            console.error('Failed to mark voucher as used', res.data.error);
          }
        } catch (error) {
          console.error('Error updating order after payment:', error);
        }
      };
      handleVoucherUse();
    }

    if (savedOrderId) {
      const updateOrderStatus = async () => {
        try {
          const data = { status: 'paid' };
          const updatedOrder = await axios.put(`/api/order/${savedOrderId}`, data);

          if (updatedOrder.data.order_id && updatedOrder.data.status == 2) {
            const activeCodeData = {
              user_id: authData.id,
              order_id: updatedOrder.data.order_id,
              active_code_status: 'unused',
            };

            await axios.post('/api/active-code/', activeCodeData);
          }

          setOrder(updatedOrder.data);
          await axios.delete(`/api/cart_item/clear/${authData.id}`);

          setActiveStep(4);

          localStorage.removeItem('checkoutOrderId');
        } catch (error) {
          console.error('Error updating order after payment:', error);
        }
      };

      updateOrderStatus();

      logClientMessage('Thanh toán thành công', `Đơn hàng ${savedOrderId} đã được thanh toán thành công. Bạn có thể kiểm tra trong lịch sử đơn hàng`, authData.id, UserType.USER, NotificationType.USER_ACTION);
      logClientMessage('Thanh toán thành công', ` ${authData.name} đã thanh toán thành công đơn hàng ${savedOrderId}. `, null, UserType.ADMIN, NotificationType.USER_ACTION);
    }
  }

  const getAccessStyle = (course: any) => {
    if (course?.access_type === 1 || (course?.access_type === 3 && new Date(course.access_expire_at).getTime() > Date.now())) {
      return {
        color: '#2e7d32',
        backgroundColor: '#e8f5e9',
      };
    }

    if (course?.access_type === 3) {
      return {
        color: '#d32f2f',
        backgroundColor: '#ffebee',
      };
    }

    return {};
  };

  const getAccessText = (course: any) => {
    if (course?.access_type === 1) {
      return `(${course.access_duration_months} tháng kể từ khi kích hoạt)`;
    }

    if (course?.access_type === 3 && course.access_expire_at) {
      const expireDate = new Date(course.access_expire_at);
      const isExpired = expireDate.getTime() < Date.now();

      return isExpired ? `Đã hết hạn (Ngày kết thúc ${expireDate.toLocaleDateString('vi-VN')})` : `Hết hạn vào ${expireDate.toLocaleDateString('vi-VN')}`;
    }

    return '';
  };
  if (success === 'true' && activeStep !== 4) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
        }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
        <Typography variant="h6" color="textSecondary">
          Đang xác nhận thanh toán, vui lòng chờ trong giây lát ...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          my: 8,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#fff',
          boxShadow: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        className="dark:bg-gray-900 dark:text-gray-100 dark:border dark:border-gray-700"
      >
        <Typography variant="h6" align="center" fontWeight="bold" color="#9c27b0" mb={3}>
          Thanh toán đơn hàng
        </Typography>

        {/* Stepper */}
        <Stepper
          activeStep={activeStep - 1}
          alternativeLabel
          sx={{
            '& .MuiStepLabel-label': {
              color: 'black',
              fontWeight: 500,
              transition: 'color 0.3s',
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: '#9c27b0',
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: '#9c27b0',
            },
            '& .MuiStepConnector-line': {
              borderColor: '#ccc',
            },
            '& .MuiStepIcon-root': {
              fontSize: '2rem', // tăng kích thước icon
            },
            '& .MuiStepIcon-root.Mui-active': {
              color: '#9c27b0',
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: '#9c27b0',
            },
          }}
          className="dark:[&_span.MuiStepLabel-label]:text-gray-300 dark:[&_span.MuiStepLabel-label.Mui-active]:text-purple-300 dark:[&_span.MuiStepLabel-label.Mui-completed]:text-purple-300 dark:[&_span.MuiStepLabel-label.Mui-disabled]:text-gray-500 dark:[&_span.MuiStepConnector-line]:border-gray-600"
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  style: {
                    color: index + 1 <= activeStep ? '#9c27b0' : '#bdbdbd',
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4} sx={{ minHeight: 280, position: 'relative' }}>
          {/* STEP 1 */}
          <Fade in={activeStep === 1} timeout={400} unmountOnExit>
            <Box>
              <Typography fontWeight="bold" mb={1}>
                Khóa học ({course.length})
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Typography align="center">Đang tải khóa học...</Typography>
              ) : (
                course.map((course, key) => (
                  <Box
                    key={course.course_id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: '1px solid #ddd',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box display="flex" alignItems="center" sx={{ flexWrap: 'wrap' }}>
                        <Typography
                          component="a"
                          href={`/khoa-hoc/${course.course_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          fontWeight={500}
                          sx={{
                            color: 'red',
                            mr: 1,
                            textDecoration: 'none',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }, // hover kiểu link
                            // whiteSpace: 'nowrap',
                          }}
                        >
                          {key + 1}. {course.course_name}
                        </Typography>
                        {(course?.access_type === 1 || course?.access_type === 3) && (
                          <Typography
                            fontWeight="500"
                            sx={{
                              mr: 1,
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.25rem',
                              fontSize: '0.875rem',
                              ...getAccessStyle(course),
                            }}
                          >
                            {getAccessText(course)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {!comboID && (
                      <Typography fontWeight="bold" color="#f50000">
                        {course.course_price?.toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    )}
                  </Box>
                ))
              )}

              <Box mt={3.8} display="flex" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap">
                <Typography fontWeight="bold" mb={1}>
                  Mã khuyến mãi của bạn
                </Typography>
                <Box display="flex" gap={1} alignItems="center">
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Nhập mã khuyến mãi"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                      },
                    }}
                    className="dark:[&_input]:text-gray-100 dark:[&_fieldset]:border-gray-600"
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleApplyPromo}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 3,
                      fontWeight: 'bold',
                      borderColor: '#f50000ff',
                      color: '#f50000ff',
                      '&:hover': {
                        backgroundColor: '#f50000ff',
                        color: '#fff',
                        borderColor: '#f50000ff',
                      },
                    }}
                  >
                    Áp dụng
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ mt: 0, my: 3 }} className="dark:border-gray-700" />
              <Box display="flex" flexDirection="column" justifyContent="space-between" sx={{ whiteSpace: 'nowrap' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>Giá trị đơn hàng</Typography>
                  <Typography
                    fontSize="1.1rem"
                    sx={{
                      textAlign: 'right',
                      minWidth: { xs: '143.5px', sm: 'auto' },
                      ml: 2,
                    }}
                  >
                    {totalPrice.toLocaleString('vi-VN')} VNĐ
                  </Typography>
                </Box>
                {promoResult && (
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      Voucher giảm giá
                    </Typography>
                    <Typography
                      sx={{
                        display: { xs: 'none', md: 'block' },
                      }}
                    >
                      Tổng cộng voucher giảm giá
                    </Typography>
                    <Typography
                      fontSize="1.1rem"
                      sx={{
                        textAlign: 'right',
                        minWidth: { xs: '135px', sm: 'auto' },
                        ml: 2,
                      }}
                    >
                      {' '}
                      - {discountApplied.toLocaleString('vi-VN')} VNĐ
                    </Typography>
                  </Box>
                )}

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight="bold">Tổng thanh toán</Typography>
                  <Typography
                    fontWeight="bold"
                    color="#f50000"
                    fontSize="1.2rem"
                    sx={{
                      textAlign: 'right',
                      minWidth: { xs: '135px', sm: 'auto' },
                      ml: 2,
                    }}
                  >
                    {lastPrice.toLocaleString('vi-VN')} VNĐ
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* STEP 2 */}
          <Fade in={activeStep === 2} timeout={400} unmountOnExit>
            <Box>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Hình thức thanh toán:
              </Typography>

              {/* Tiêu đề nhỏ */}
              <Box
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 3,
                  backgroundColor: '#fafafa',
                  p: 2, // giảm padding để box thấp hơn
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1, // khoảng cách giữa icon và text
                }}
              >
                <IconQrcode size={22} color="#1976d2" />
                <Typography fontWeight="bold" className="dark:text-gray-500">
                  Quét mã QR
                </Typography>
              </Box>
              <Box
                sx={{
                  border: '1px solid #e0e0e0',
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                  p: 3,
                  mb: 3,
                  mt: 2,
                  lineHeight: 1.8,
                }}
              >
                <Typography mb={2} className="dark:text-gray-500">
                  Chỉ còn một bước nữa thôi! Sau khi hoàn tất thanh toán, trong vòng 2–3 phút bạn sẽ có thể bắt đầu học ngay. Hãy thực hiện theo hướng dẫn dưới đây nhé:
                </Typography>

                <ul style={{ paddingLeft: '20px' }}>
                  <li className="dark:text-gray-500">
                    <b>Bước 1:</b> Nhấn vào nút{' '}
                    <Typography component="span" color="red">
                      “Quét mã QR”
                    </Typography>{' '}
                    và chọn “Xác nhận”. Hệ thống sẽ tự động hiển thị mã QR tương ứng với đơn hàng của bạn.
                  </li>
                  <li className="dark:text-gray-500">
                    <b>Bước 2:</b> Mở ứng dụng ngân hàng trên điện thoại, chọn chức năng{' '}
                    <Typography component="span" color="red">
                      “Quét mã QR”
                    </Typography>{' '}
                    để tiến hành thanh toán.
                  </li>
                  <li className="dark:text-gray-500">
                    <b>Bước 3:</b> Quét mã QR hiển thị trên màn hình và xác nhận giao dịch. Sau khi thanh toán thành công, hệ thống sẽ gửi code về trang lịch sử giao dịch trong tài khoản của bạn và hiển thị các khóa học bạn vừa mua. Dưới đây là video mô phỏng cách thanh toán “Quét mã QR”.
                  </li>
                </ul>

                <Typography mt={2} className="dark:text-gray-500">
                  Bạn có thể xem video minh họa quy trình thanh toán qua mã QR bên dưới:
                </Typography>

                <Box mt={2} sx={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <video
                    src="/api/file/view/englishmaster/Video_huong_dan/English%20Master%20-%20Google%20Chrome%202025-11-13%2014-50-33.mp4"
                    controls
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                  </video>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* STEP 3 */}
          <Fade in={activeStep === 3} timeout={200} unmountOnExit>
            <Box>
              <Grid
                container
                spacing={3}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 3,
                  p: 3,
                  backgroundColor: '#fff',
                }}
              >
                {/* BÊN TRÁI */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" mb={2}>
                      Thông tin đơn hàng
                    </Typography>

                    <Divider />

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Mã đơn hàng
                      </Typography>
                      <Typography fontWeight="medium">{order?.order_id}</Typography>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Mô tả
                      </Typography>
                      {course.map((c, index) => (
                        <Typography key={c.course_id} fontWeight="medium">
                          {index + 1}.{c.course_name}
                        </Typography>
                      ))}
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Nhà cung cấp
                      </Typography>
                      <Typography fontWeight="medium">CÔNG TY TNHH BIZS VN</Typography>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Ngân hàng
                      </Typography>
                      <Typography fontWeight="medium">Techcombank</Typography>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Chi nhánh
                      </Typography>
                      <Typography fontWeight="medium">Nguyễn Cơ Thạch</Typography>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Nội dung
                      </Typography>
                      <Typography fontWeight="medium">{content}</Typography>
                    </Box>

                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Số tiền thanh toán
                      </Typography>
                      <Typography variant="h5" color="red">
                        {totalPrice}đ
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* BÊN PHẢI */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      p: 3,
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        mt: 2,
                        border: '1px solid #000',
                        borderRadius: 2,
                        p: 1.5,
                        position: 'relative',
                      }}
                    >
                      {/* <img src={qrCode}></img> */}
                    </Box>

                    <Typography mt={2} color="text.secondary" fontSize="0.9rem">
                      Quét mã QR bằng ứng dụng Ngân hàng / Ví điện tử để thanh toán
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>

          {/* STEP 4 */}
          <Fade in={activeStep === 4} timeout={400} unmountOnExit>
            <Box textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: 40,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 70, color: 'green' }} />
              </Box>

              {/* Dòng chữ */}
              <Typography variant="h5" color="success.main" fontWeight="bold">
                Thanh toán thành công!
              </Typography>
              {order && (
                <Box
                  sx={{
                    mt: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    p: 2,
                    width: '100%',
                    maxWidth: 600,
                    textAlign: 'left',
                  }}
                >
                  <Typography variant="body1">
                    <strong>Mã đơn hàng:</strong> {order.order_id}
                  </Typography>
                  <Box mb={2}>
                    {course.map((c, index) => (
                      <Box
                        key={c.course_id || c.id}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gridAutoFlow: 'row',
                          alignItems: 'start',
                          py: 1,
                          borderBottom: '1px dashed #ccc',
                          columnGap: 2,
                        }}
                      >
                        <Typography>
                          {index + 1}. {c.course_name || 'Khóa học không xác định'}
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          color="error.main"
                          sx={{
                            whiteSpace: 'nowrap',
                            // minWidth: '90px',
                            // textAlign: 'right',
                          }}
                        >
                          {totalPrice.toLocaleString('vi-VN')} VNĐ
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography variant="body1">
                    <strong>Tổng tiền:</strong> {order.total_price.toLocaleString()} đ
                  </Typography>
                  <Typography variant="body1">
                    <strong>Trạng thái:</strong> {order.status === 2 ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phương thức thanh toán:</strong> {order.payment_method === 1 ? 'VNPAY' : order.payment_method === 2 ? 'MOMO' : order.payment_method === 3 ? 'QR Code' : 'Không xác định'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Ngày tạo:</strong> {new Date(order.created_at).toLocaleString()}
                  </Typography>
                  {order.discount_voucher_id && (
                    <Typography variant="body1">
                      <strong>Voucher áp dụng:</strong> {order.discount_voucher_id}
                    </Typography>
                  )}
                </Box>
              )}
              <Typography variant="body1" marginTop="1em">
                Cảm ơn bạn đã đăng ký . Giờ thì hãy{' '}
                <Typography
                  component="span"
                  sx={{
                    color: 'green',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onClick={() => (window.location.href = `${window.location.origin}/lich-su-don-hang`)}
                >
                  kích hoạt khóa học
                </Typography>{' '}
                để bắt đầu hành trình học tập của mình nhé!
              </Typography>
            </Box>
          </Fade>
        </Box>

        {/* Nút điều hướng bước */}
        <Box
          display="flex"
          flexDirection={{ xs: 'row', sm: 'row' }}
          justifyContent={{
            xs: activeStep > 1 && activeStep <= 3 ? 'space-between' : 'center',
            sm: activeStep === 4 ? 'center' : 'space-between',
          }}
          // justifyContent={activeStep === 4 ? 'center' : 'space-between'}
          alignItems="center"
          gap={2}
          mt={1}
        >
          {/* Nút Quay lại */}
          {activeStep > 1 && activeStep <= 3 ? (
            <Button
              onClick={handleBack}
              variant="contained"
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                px: { xs: 1.6, sm: 3 },
                py: { xs: 1, sm: 1 },
                background: 'red',
                color: 'white',
                '&:hover': {
                  background: 'blue',
                  color: 'white',
                },
              }}
            >
              Quay lại bước {activeStep - 1}
            </Button>
          ) : (
            <Box />
          )}

          {/* Nút bên phải */}
          {activeStep === 4 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1,
                  width: { xs: '100%', sm: 'auto' },
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
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleNext}
              sx={{
                borderRadius: '50px',
                px: { xs: 2.05, sm: 4 },
                py: { xs: 1, sm: 1 },
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              {/* {activeStep === 2 ? 'Hoàn tất' : 'Xác nhận'} */}
              Xác nhận
            </Button>
          )}
        </Box>
      </Box>
      <EM_Login ref={refEM_Login} />
      <ConfirmDialog open={confirmOpen} setOpen={setConfirmOpen} message={confirmMessage} onConfirm={handleBuy} />
    </Box>
  );
}
