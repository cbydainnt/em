import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button, Box, Grid, Snackbar, Alert, InputAdornment, MenuItem, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, Typography } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconDeviceFloppy, IconX, IconTicket, IconPercentage, IconCurrencyDong, IconUsers } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { DiscountType, NotificationType, UserType, VoucherApplicableType, VoucherStatus } from '@/utils/enums';
import { formatVND, logClientMessage } from '@/utils';
import { ApplicableItemMultiSelect } from './components/ApplicableItemMultiSelect';
import { useAuthStore } from '@/hooks/useAuthStore';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import { ApplicableUserMultiSelect } from './components/ApplicableUserMultiSelect';

interface IFormInput {
  code: string;
  discount_type: number;
  discount_value: number;
  min_order_amount: number;
  applicable_type: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  status: number;
  user_scope: number;
  applicable_user_ids?: string[];
  applicable_course_ids?: string[];
  applicable_combo_ids?: string[];
}

interface VoucherFormDialogProps {
  saved: () => void;
}

const VoucherFormDialog = forwardRef(function VoucherForm({ saved }: VoucherFormDialogProps, ref) {
  const [open, setOpen] = useState(false);
  const authData = useAuthStore((state) => state.authData);

  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [originalStatus, setOriginalStatus] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      code: '',
      discount_type: DiscountType.PERCENT,
      discount_value: 0,
      min_order_amount: 0,
      applicable_type: VoucherApplicableType.ALL,
      user_scope: 1,
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      usage_limit: 0,
      status: VoucherStatus.ACTIVE,
      applicable_user_ids: [],
      applicable_course_ids: [],
      applicable_combo_ids: [],
    },
  });

  const discountType = watch('discount_type');

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
    setOriginalStatus(null);
    reset();
  };

  const onSubmit = async (data: IFormInput) => {
     if (data.user_scope === 2) {
       if (!data.applicable_user_ids || data.applicable_user_ids.length === 0) {
         setSnackbar({
           open: true,
           message: 'Vui lòng chọn ít nhất một người dùng khi chọn phạm vi "Người dùng cụ thể"',
           severity: 'error',
         });
         return;
       }
     }
    setLoading(true);
    try {
      const payload: Record<string, any> = {
        code: data.code.toUpperCase(),
        discount_type: Number(data.discount_type),
        discount_value: Number(data.discount_value),
        min_order_amount: Number(data.min_order_amount) || 0,
        applicable_type: Number(data.applicable_type),
        user_scope: Number(data.user_scope),
        start_date: new Date(data.start_date),
        end_date: data.end_date ? new Date(data.end_date) : null,
        usage_limit: Number(data.usage_limit) || null,
        status: Number(data.status),
      };
      

      if (data.user_scope === 2 && data.applicable_user_ids) {
        payload.applicable_user_ids = data.applicable_user_ids;
      }
      if (data.applicable_type === 2 && data.applicable_course_ids) {
        payload.applicable_course_ids = data.applicable_course_ids;
      }

      if (data.applicable_type === 3 && data.applicable_combo_ids) {
        payload.applicable_combo_ids = data.applicable_combo_ids;
      }

      // Hàm tạo applicable text từ voucher data
      const getApplicableText = (applicableType: number, itemDetails: any[]) => {
        switch (applicableType) {
          case VoucherApplicableType.ALL:
            return 'Áp dụng cho tất cả đơn hàng';
          case VoucherApplicableType.COURSE:
            if (itemDetails.length > 0) {
              const courseNames = itemDetails.map((item) => item.course_name);
              return `Áp dụng cho khóa học: ${courseNames.join(', ')}`;
            }
            return 'Áp dụng cho các khóa học được chọn';
          case VoucherApplicableType.COMBO:
            if (itemDetails.length > 0) {
              const comboNames = itemDetails.map((item) => item.combo_name);
              return `Áp dụng cho combo: ${comboNames.join(', ')}`;
            }
            return 'Áp dụng cho các combo được chọn';
          default:
            return 'Áp dụng cho tất cả đơn hàng';
        }
      };

      // Hàm lấy thông tin chi tiết items
      const getItemDetails = async (type: 'course' | 'combo', ids: string[]) => {
        if (!ids || ids.length === 0) return [];

        try {
          const endpoint = type === 'course' ? '/api/course' : '/api/combo';
          const response = await axios.get(endpoint);
          const allItems = response.data?.data || response.data || [];
          return allItems.filter((item: any) => ids.includes(type === 'course' ? item.course_id : item.combo_id));
        } catch (error) {
          console.error(`Error fetching ${type} details:`, error);
          return [];
        }
      };

      let itemDetails: any[] = [];
      if (data.applicable_type === VoucherApplicableType.COURSE && data.applicable_course_ids) {
        itemDetails = await getItemDetails('course', data.applicable_course_ids);
      } else if (data.applicable_type === VoucherApplicableType.COMBO && data.applicable_combo_ids) {
        itemDetails = await getItemDetails('combo', data.applicable_combo_ids);
      }

      if (id) {
        // Lấy thông tin voucher cũ để so sánh
        const oldVoucherResponse = await axios.get(`/api/admin/discount-vouchers/${id}`);
        const oldVoucher = oldVoucherResponse.data;

        const response = await axios.put(`/api/admin/discount-vouchers/${id}`, payload);
        const updatedVoucher = response.data;

        const isReactivated = updatedVoucher.status === VoucherStatus.ACTIVE && (originalStatus === VoucherStatus.INACTIVE || originalStatus === VoucherStatus.EXPIRED);

        // Kiểm tra xem có thay đổi về phạm vi áp dụng không
        const applicableTypeChanged = oldVoucher.applicable_type !== updatedVoucher.applicable_type;
        const applicableItemsChanged = JSON.stringify(oldVoucher.applicable_course_ids || []) !== JSON.stringify(data.applicable_course_ids || []) || JSON.stringify(oldVoucher.applicable_combo_ids || []) !== JSON.stringify(data.applicable_combo_ids || []);

        if (isReactivated) {
          // Log khi kích hoạt lại
          const applicableText = getApplicableText(updatedVoucher.applicable_type, itemDetails);
          const discountText = updatedVoucher.discount_type === 1 ? `${updatedVoucher.discount_value}%` : formatVND(updatedVoucher.discount_value);
          const minOrderText = updatedVoucher.min_order_amount > 0 ? ` cho đơn từ ${formatVND(updatedVoucher.min_order_amount)}` : '';

          await logClientMessage('Mã giảm giá được kích hoạt lại!', `Mã ${updatedVoucher.code} đã được kích hoạt trở lại! Giảm ${discountText}${minOrderText} - ${applicableText} - Dùng ngay thôi nào!`, null, UserType.USER, '', null, NotificationType.PROMOTION);
          await logClientMessage('Mã giảm giá được kích hoạt lại!', `Mã ${updatedVoucher.code} đã được kích hoạt trở lại! Giảm ${discountText}${minOrderText} - ${applicableText}`, null, UserType.ADMIN, '', null, NotificationType.PROMOTION);
        } else if (applicableTypeChanged || applicableItemsChanged) {
          // Log khi thay đổi phạm vi áp dụng
          const applicableText = getApplicableText(updatedVoucher.applicable_type, itemDetails);
          const discountText = updatedVoucher.discount_type === 1 ? `${updatedVoucher.discount_value}%` : formatVND(updatedVoucher.discount_value);

          let changeMessage = '';
          if (applicableTypeChanged) {
            const oldType = getApplicableTypeLabel(oldVoucher.applicable_type);
            const newType = getApplicableTypeLabel(updatedVoucher.applicable_type);
            changeMessage = `Phạm vi áp dụng đã thay đổi từ "${oldType}" sang "${newType}"`;
          } else {
            changeMessage = 'Danh sách khóa học/combo áp dụng đã được cập nhật';
          }

          await logClientMessage('Mã giảm giá được cập nhật!', `Mã ${updatedVoucher.code} vừa được cập nhật! ${changeMessage}. Giảm ${discountText} - ${applicableText}`, null, UserType.USER, '', null, NotificationType.PROMOTION);
          await logClientMessage('Mã giảm giá được cập nhật!', `Mã ${updatedVoucher.code} vừa được cập nhật! ${changeMessage}. Giảm ${discountText} - ${applicableText}`, null, UserType.ADMIN, '', null, NotificationType.PROMOTION);
        }

        setSnackbar({ open: true, message: 'Cập nhật thành công!', severity: 'success' });
      } else {
        // Tạo mới voucher
        const response = await axios.post('/api/admin/discount-vouchers', payload);
        const newVoucher = response.data;

        const applicableText = getApplicableText(newVoucher.applicable_type, itemDetails);
        const discountText = newVoucher.discount_type === 1 ? `Giảm ${newVoucher.discount_value}%` : `Giảm ${formatVND(newVoucher.discount_value)}`;
        const minOrderText = newVoucher.min_order_amount > 0 ? ` cho đơn từ ${formatVND(newVoucher.min_order_amount)}` : '';
        const expiryText = newVoucher.end_date ? ` - Hết hạn: ${new Date(newVoucher.end_date).toLocaleDateString('vi-VN')}` : '';

        const message = `Mã ${newVoucher.code} vừa được tạo! ${discountText}${minOrderText} - ${applicableText}${expiryText}`;
        console.log('Logging message:', message);
        await logClientMessage('Mã giảm giá mới!', `Bạn đã tạo thành công mã ${newVoucher.code}! ${discountText}${minOrderText} - ${applicableText}${expiryText}`, authData?.id, UserType.ADMIN, '', null, NotificationType.PROMOTION);
        await logClientMessage('Mã giảm giá mới!', message, null, UserType.USER, '', null, NotificationType.PROMOTION);

        setSnackbar({
          open: true,
          message: 'Tạo mã giảm giá thành công & đã thông báo đến người dùng!',
          severity: 'success',
        });
      }
      saved();
      handleClose();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const getApplicableTypeLabel = (type: number) => {
    switch (type) {
      case VoucherApplicableType.ALL:
        return 'Tất cả sản phẩm';
      case VoucherApplicableType.COURSE:
        return 'Khóa học';
      case VoucherApplicableType.COMBO:
        return 'Combo';
      default:
        return 'Không xác định';
    }
  };

  const show = async (data: any) => {
    if (data) {
      setId(data.discount_voucher_id);
      setOriginalStatus(Number(data.status));

      // Reset form với dữ liệu cơ bản
      reset({
        code: data.code,
        discount_type: Number(data.discount_type),
        discount_value: Number(data.discount_value),
        min_order_amount: Number(data.min_order_amount) || 0,
        applicable_type: Number(data.applicable_type),
        user_scope: Number(data.user_scope) || 1,
        start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
        end_date: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : '',
        usage_limit: Number(data.usage_limit) || 0,
        status: Number(data.status),
        applicable_user_ids: [],
        applicable_course_ids: [],
        applicable_combo_ids: [],
      });

      // Fetch selected users nếu có
      if (data.discount_voucher_id && data.user_scope === 2) {
        try {
          const response = await axios.get(`/api/admin/discount-vouchers/${data.discount_voucher_id}/applicable-users`);
          if (response.data && Array.isArray(response.data)) {
            const userIds = response.data.map((user: any) => user.user_id);
            setValue('applicable_user_ids', userIds);
          }
        } catch (error) {
          console.error('Error fetching selected users:', error);
        }
      }
    } else {
      setId(undefined);
      setOriginalStatus(null);
      reset({
        code: '',
        discount_type: DiscountType.PERCENT,
        discount_value: 0,
        min_order_amount: 0,
        applicable_type: VoucherApplicableType.ALL,
        user_scope: 1,
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        usage_limit: 0,
        status: VoucherStatus.ACTIVE,
        applicable_user_ids: [],
        applicable_course_ids: [],
        applicable_combo_ids: [],
      });
    }
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            {id ? 'Chỉnh sửa mã giảm giá' : 'Tạo mã giảm giá mới'}
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
                {/* Mã giảm giá */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="code"
                    control={control}
                    rules={{
                      required: 'Vui lòng nhập mã giảm giá',
                      pattern: {
                        value: /^[A-Z0-9]+$/,
                        message: 'Mã chỉ chứa chữ in hoa và số',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Mã giảm giá"
                        placeholder="SUMMER2025"
                        error={!!errors.code}
                        helperText={errors.code?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconTicket size={20} className="dark:text-gray-400" />
                            </InputAdornment>
                          ),
                          sx: {
                            backgroundColor: '#fff',
                            color: '#111827',
                            '.dark &': {
                              backgroundColor: '#111827',
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
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    )}
                  />
                </Grid>

                {/* Trạng thái */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Trạng thái"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        InputProps={{
                          sx: {
                            backgroundColor: '#ffffff',
                            color: '#111827',

                            '& .MuiSelect-icon': {
                              color: '#6b7280',
                            },

                            '.dark &': {
                              backgroundColor: '#111827',
                              color: '#f3f4f6',

                              '& .MuiSelect-icon': {
                                color: '#9ca3af',
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
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d1d5db',
                          },
                          '.dark & .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#374151',
                          },
                        }}
                        /* ⭐ FIX POPUP */
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

                                /* hover */
                                '& .MuiMenuItem-root:hover': {
                                  bgcolor: '#e5e7eb',
                                },
                                '.dark & .MuiMenuItem-root:hover': {
                                  bgcolor: 'rgba(139, 92, 246, 0.15)',
                                },

                                /* selected */
                                '& .MuiMenuItem-root.Mui-selected': {
                                  bgcolor: '#e0e7ff',
                                },
                                '.dark & .MuiMenuItem-root.Mui-selected': {
                                  bgcolor: 'rgba(139, 92, 246, 0.25)',
                                },
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value={VoucherStatus.ACTIVE}>Hoạt động</MenuItem>
                        <MenuItem value={VoucherStatus.INACTIVE}>Tạm dừng</MenuItem>
                        <MenuItem value={VoucherStatus.EXPIRED}>Hết hạn</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Loại giảm giá */}
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className="dark:text-gray-300">
                      Loại giảm giá
                    </FormLabel>
                    <Controller
                      name="discount_type"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          value={Number(field.value)}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          sx={{
                            '& .MuiRadio-root': {
                              color: '#6b7280',
                              '.dark &': {
                                color: '#9ca3af',
                                '&.Mui-checked': {
                                  color: '#8b5cf6',
                                },
                              },
                            },
                            '& .MuiFormControlLabel-label': {
                              '.dark &': {
                                color: '#d1d5db',
                              },
                            },
                          }}
                        >
                          <FormControlLabel value={DiscountType.PERCENT} control={<Radio />} label="Phần trăm (%)" className="dark:text-gray-300" />
                          <FormControlLabel value={DiscountType.FIXED_AMOUNT} control={<Radio />} label="Số tiền cố định (VNĐ)" className="dark:text-gray-300" />
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>

                {/* Giá trị giảm */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="discount_value"
                    control={control}
                    rules={{
                      required: 'Vui lòng nhập giá trị giảm',
                      min: { value: 1, message: 'Giá trị phải lớn hơn 0' },
                      max: Number(discountType) === DiscountType.PERCENT ? { value: 100, message: 'Phần trăm không được vượt quá 100' } : undefined,
                    }}
                    render={({ field }) => {
                      const isFixedAmount = Number(discountType) === DiscountType.FIXED_AMOUNT;

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          type="text"
                          label={isFixedAmount ? 'Giá trị giảm (VNĐ)' : 'Giá trị giảm (%)'}
                          value={isFixedAmount && field.value > 0 ? field.value.toLocaleString('vi-VN') : field.value}
                          onChange={(e) => {
                            let input = e.target.value;

                            if (isFixedAmount) {
                              input = input.replace(/\D/g, '');

                              if (input.length > 1 && input.startsWith('0')) {
                                input = input.replace(/^0+/, '');
                              }

                              const numValue = input === '' ? 0 : parseInt(input, 10) || 0;
                              field.onChange(numValue);
                            } else {
                              const numValue = input === '' ? 0 : parseInt(input, 10) || 0;
                              field.onChange(numValue);
                            }
                          }}
                          onFocus={(e) => {
                            if (isFixedAmount && field.value > 0) {
                              e.target.value = field.value.toString();
                            }
                          }}
                          onBlur={(e) => {
                            if (isFixedAmount && field.value > 0) {
                              e.target.value = field.value.toLocaleString('vi-VN');
                            }
                          }}
                          error={!!errors.discount_value}
                          helperText={errors.discount_value?.message}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">{isFixedAmount ? <IconCurrencyDong size={20} className="dark:text-gray-400" /> : <IconPercentage size={20} className="dark:text-gray-400" />}</InputAdornment>,
                            endAdornment:
                              field.value > 0 && isFixedAmount ? (
                                <InputAdornment position="end">
                                  <Typography variant="body2" className="dark:text-gray-400">
                                    VNĐ
                                  </Typography>
                                </InputAdornment>
                              ) : null,
                            sx: {
                              backgroundColor: '#fff',
                              color: '#111827',
                              '.dark &': {
                                backgroundColor: '#111827',
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
                          placeholder={isFixedAmount ? 'Ví dụ: 150000' : 'Ví dụ: 15'}
                        />
                      );
                    }}
                  />
                </Grid>

                {/* Đơn tối thiểu */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="min_order_amount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="text"
                        label="Đơn tối thiểu (VNĐ)"
                        value={field.value > 0 ? field.value.toLocaleString('vi-VN') : ''}
                        onChange={(e) => {
                          let input = e.target.value.replace(/\D/g, '');
                          if (input.length > 1 && input.startsWith('0')) {
                            input = input.replace(/^0+/, '');
                          }
                          const numValue = input === '' ? 0 : parseInt(input, 10) || 0;
                          field.onChange(numValue);
                        }}
                        onFocus={(e) => {
                          if (field.value > 0) {
                            e.target.value = field.value.toString();
                          }
                        }}
                        onBlur={(e) => {
                          if (field.value > 0) {
                            e.target.value = field.value.toLocaleString('vi-VN');
                          }
                        }}
                        helperText="Để trống hoặc 0 nếu không giới hạn"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconCurrencyDong size={20} className="dark:text-gray-400" />
                            </InputAdornment>
                          ),
                          endAdornment:
                            field.value > 0 ? (
                              <InputAdornment position="end">
                                <Typography variant="body2" className="dark:text-gray-400">
                                  VNĐ
                                </Typography>
                              </InputAdornment>
                            ) : null,
                          sx: {
                            backgroundColor: '#fff',
                            color: '#111827',
                            '.dark &': {
                              backgroundColor: '#111827',
                              color: '#f3f4f6',
                            },
                          },
                        }}
                        FormHelperTextProps={{
                          sx: {
                            color: '#6b7280', // text-gray-500
                            '.dark &': {
                              color: '#d1d5db', // dark:text-gray-300
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
                        placeholder="Ví dụ: 500000"
                      />
                    )}
                  />
                </Grid>

                {/* User Scope - Phạm vi người dùng */}
                {/* User Scope - Phạm vi người dùng */}
                <Grid item xs={12}>
                  <Typography variant="body1" className="dark:text-gray-300 mb-2" sx={{ fontWeight: 500 }}>
                    Phạm vi người dùng
                  </Typography>
                  <Controller
                    name="user_scope"
                    control={control}
                    rules={{
                      validate: (value, formValues) => {
                        if (value === 2 && (!formValues.applicable_user_ids || formValues.applicable_user_ids.length === 0)) {
                          return "Vui lòng chọn ít nhất một người dùng khi chọn phạm vi 'Người dùng cụ thể'";
                        }
                        return true;
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Box>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                          {[
                            {
                              value: 1,
                              label: 'Tất cả người dùng',
                              desc: 'Áp dụng cho tất cả người dùng trong hệ thống',
                            },
                            {
                              value: 2,
                              label: 'Người dùng cụ thể',
                              desc: 'Chỉ áp dụng cho một số người dùng được chọn',
                            },
                          ].map((scope) => (
                            <Box
                              key={scope.value}
                              sx={{
                                flex: '1 1 calc(50% - 8px)',
                                minWidth: '200px',
                                cursor: 'pointer',
                                padding: '16px',
                                border: '2px solid',
                                borderColor: Number(field.value) === scope.value ? '#8b5cf6' : '#e5e7eb',
                                borderRadius: '12px',
                                backgroundColor: Number(field.value) === scope.value ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: '#8b5cf6',
                                  backgroundColor: 'rgba(139, 92, 246, 0.04)',
                                },
                                '.dark &': {
                                  borderColor: Number(field.value) === scope.value ? '#8b5cf6' : '#4b5563',
                                  backgroundColor: Number(field.value) === scope.value ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                  '&:hover': {
                                    borderColor: '#8b5cf6',
                                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                                  },
                                },
                              }}
                              onClick={() => field.onChange(scope.value)}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: Number(field.value) === scope.value ? '#8b5cf6' : '#9ca3af',
                                    backgroundColor: Number(field.value) === scope.value ? '#8b5cf6' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    '&::after':
                                      Number(field.value) === scope.value
                                        ? {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                          }
                                        : {},
                                  }}
                                />
                                <Box>
                                  <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    className="dark:text-gray-100"
                                    sx={{
                                      color: Number(field.value) === scope.value ? '#8b5cf6' : 'inherit',
                                      mb: 0.5,
                                    }}
                                  >
                                    {scope.label}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className="dark:text-gray-400"
                                    sx={{
                                      color: Number(field.value) === scope.value ? '#7c3aed' : '#6b7280',
                                      display: 'block',
                                      lineHeight: 1.4,
                                      '.dark &': {
                                        color: Number(field.value) === scope.value ? '#a78bfa' : '#9ca3af',
                                      },
                                    }}
                                  >
                                    {scope.desc}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        {fieldState.error && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{
                              display: 'block',
                              mb: 1,
                              '.dark &': {
                                color: '#f87171',
                              },
                            }}
                          >
                            {fieldState.error.message}
                          </Typography>
                        )}

                        {/* Hiển thị User Selector khi chọn "Người dùng cụ thể" */}
                        {field.value === 2 && <ApplicableUserMultiSelect voucherId={id} control={control} name="applicable_user_ids" setValue={setValue} />}
                      </Box>
                    )}
                  />
                </Grid>

                {/* Áp dụng cho */}
                <Grid item xs={12}>
                  <Typography variant="body1" className="dark:text-gray-300 mb-2" sx={{ fontWeight: 500 }}>
                    Phạm vi áp dụng
                  </Typography>
                  <Controller
                    name="applicable_type"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                          {[
                            { value: VoucherApplicableType.ALL, label: 'Tất cả sản phẩm', desc: 'Áp dụng cho tất cả khóa học và combo' },
                            { value: VoucherApplicableType.COURSE, label: 'Khóa học', desc: 'Chỉ áp dụng cho một số khóa học' },
                            { value: VoucherApplicableType.COMBO, label: 'Combo', desc: 'Chỉ áp dụng cho một số combo' },
                          ].map((type) => (
                            <Box
                              key={type.value}
                              sx={{
                                flex: '1 1 calc(33.333% - 16px)',
                                minWidth: '200px',
                                cursor: 'pointer',
                                padding: '5px',
                                border: '2px solid',
                                borderColor: Number(field.value) === type.value ? '#8b5cf6' : '#e5e7eb',
                                borderRadius: '15px',
                                backgroundColor: Number(field.value) === type.value ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: '#8b5cf6',
                                  backgroundColor: 'rgba(139, 92, 246, 0.04)',
                                },
                                '.dark &': {
                                  borderColor: Number(field.value) === type.value ? '#8b5cf6' : '#4b5563',
                                  backgroundColor: Number(field.value) === type.value ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                  '&:hover': {
                                    borderColor: '#8b5cf6',
                                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                                  },
                                },
                              }}
                              onClick={() => field.onChange(type.value)}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: Number(field.value) === type.value ? '#8b5cf6' : '#9ca3af',
                                    backgroundColor: Number(field.value) === type.value ? '#8b5cf6' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    // mt: 0.2,
                                    '&::after':
                                      Number(field.value) === type.value
                                        ? {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: 'white',
                                          }
                                        : {},
                                  }}
                                />
                                <Box>
                                  <Typography
                                    variant="body1"
                                    fontWeight={600}
                                    className="dark:text-gray-100"
                                    sx={{
                                      color: Number(field.value) === type.value ? '#8b5cf6' : 'inherit',
                                      mb: 0,
                                    }}
                                  >
                                    {type.label}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className="dark:text-gray-400"
                                    sx={{
                                      color: Number(field.value) === type.value ? '#7c3aed' : '#6b7280',
                                      display: 'block',
                                      lineHeight: 1.4,
                                      '.dark &': {
                                        color: Number(field.value) === type.value ? '#a78bfa' : '#9ca3af',
                                      },
                                    }}
                                  >
                                    {type.desc}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        {field.value === VoucherApplicableType.COURSE && <ApplicableItemMultiSelect type="course" voucherId={id} control={control} name="applicable_course_ids" />}
                        {field.value === VoucherApplicableType.COMBO && <ApplicableItemMultiSelect type="combo" voucherId={id} control={control} name="applicable_combo_ids" />}
                      </Box>
                    )}
                  />
                </Grid>

                {/* Ngày bắt đầu */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: 'Vui lòng chọn ngày bắt đầu' }}
                    render={({ field: { onChange, value, ...field } }) => (
                      <DatePicker
                        {...field}
                        label="Ngày bắt đầu"
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => {
                          onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
                        }}
                        slotProps={{
                          popper: {
                            placement: 'bottom-end',
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [5, 4],
                                },
                              },
                            ],
                          },
                          textField: {
                            fullWidth: true,
                            error: !!errors.start_date,
                            helperText: errors.start_date?.message,
                            InputLabelProps: {
                              shrink: true,
                              sx: {
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              },
                            },
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#fff',
                                color: '#111827',
                                '.dark &': {
                                  backgroundColor: '#111827',
                                  color: '#f3f4f6',
                                },
                              },
                              // ✅ TEXT VALUE YYYY-MM-DD
                              '& .MuiInputBase-input': {
                                color: '#111827',

                                '.dark &': {
                                  color: '#f3f4f6',
                                },
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                '.dark &': {
                                  borderColor: '#374151',
                                },
                              },
                              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#8b5cf6',
                                '.dark &': {
                                  borderColor: '#8b5cf6',
                                },
                              },
                              // Style cho calendar icon
                              '& .MuiInputAdornment-root .MuiIconButton-root': {
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              },
                            },
                          },
                          actionBar: {
                            actions: ['clear', 'today'],
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Ngày kết thúc */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="end_date"
                    control={control}
                    rules={{
                      validate: (value, { start_date }) => {
                        if (!value || !start_date) return true;
                        const start = new Date(start_date);
                        const end = new Date(value);
                        start.setHours(0, 0, 0, 0);
                        end.setHours(0, 0, 0, 0);
                        return end > start || 'Ngày kết thúc phải sau ngày bắt đầu';
                      },
                    }}
                    render={({ field: { onChange, value, ...field } }) => (
                      <DatePicker
                        {...field}
                        label="Ngày kết thúc"
                        format="MM/DD/YYYY"
                        value={value ? dayjs(value) : null}
                        onChange={(newValue) => {
                          onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
                        }}
                        minDate={watch('start_date') ? dayjs(watch('start_date')).add(1, 'day') : undefined}
                        slotProps={{
                          popper: {
                            placement: 'bottom-end',
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [5, 4],
                                },
                              },
                            ],
                          },
                          textField: {
                            fullWidth: true,
                            error: !!errors.end_date,
                            helperText: errors.end_date?.message || 'Để trống nếu không giới hạn',
                            InputLabelProps: {
                              shrink: true,
                              sx: {
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              },
                            },
                            FormHelperTextProps: {
                              sx: {
                                color: '#6b7280',
                                '.dark &': {
                                  color: '#d1d5db',
                                },
                              },
                            },
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#fff',
                                color: '#111827',
                                '.dark &': {
                                  backgroundColor: '#111827',
                                  color: '#f3f4f6',
                                },
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                '.dark &': {
                                  borderColor: '#374151',
                                },
                              },
                              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#8b5cf6',
                                '.dark &': {
                                  borderColor: '#8b5cf6',
                                },
                              },
                              '& .MuiInputAdornment-root .MuiIconButton-root': {
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              },
                            },
                          },
                          actionBar: {
                            actions: ['clear', 'today'],
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Giới hạn sử dụng */}
                <Grid item xs={12} md={12}>
                  <Controller
                    name="usage_limit"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <TextField
                        {...field}
                        value={value || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          onChange(val === '' ? 0 : Number(val));
                        }}
                        onFocus={(e) => {
                          if (value === 0 || value === undefined) {
                            e.target.select();
                          }
                        }}
                        fullWidth
                        type="number"
                        label="Tổng số lần sử dụng"
                        placeholder="Không giới hạn"
                        helperText="Để trống nếu không giới hạn"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconUsers size={20} className="dark:text-gray-400" />
                            </InputAdornment>
                          ),
                          sx: {
                            backgroundColor: '#fff',
                            color: '#111827',
                            '.dark &': {
                              backgroundColor: '#111827',
                              color: '#f3f4f6',
                            },
                          },
                        }}
                        FormHelperTextProps={{
                          sx: {
                            color: '#6b7280', // text-gray-500
                            '.dark &': {
                              color: '#d1d5db', // dark:text-gray-300
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
                        inputProps={{
                          min: 0,
                        }}
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
      </LocalizationProvider>
    </>
  );
});

export default VoucherFormDialog;
