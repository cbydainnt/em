import { Dialog, DialogTitle, MenuItem, DialogContent, DialogActions, IconButton, TextField, Button, Box, Grid, Snackbar, Alert, InputAdornment } from '@mui/material';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { IconDeviceFloppy, IconX, IconMail, IconUser, IconLock, IconEye, IconEyeOff, IconMapPin, IconPhone } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import { gql } from '@apollo/client';
import apolloClient from '@/utils/apollo';
import { useForm, Controller } from 'react-hook-form';

interface IFormInput {
  email: string;
  name: string;
  password: string;
  type: string;
  confirm: string;
  detailAddress: string;
  phone: string;
}

interface UserFormDialogProps {
  saved: () => void;
}

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
}

interface Ward {
  code: string;
  name: string;
}

const UserFormDialog = forwardRef(function UserForm({ saved }: UserFormDialogProps, ref) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });

  // ✅ Địa chỉ state với cache (giống profile dialog)
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [addressCache, setAddressCache] = useState<{
    provinces: Province[];
    districts: { [provinceCode: string]: District[] };
    wards: { [districtCode: string]: Ward[] };
  }>({
    provinces: [],
    districts: {},
    wards: {},
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirm: '',
      detailAddress: '',
      phone: '',
    },
  });

  const password = watch('password');
  const confirmPassword = watch('confirm');

  // ✅ Preload provinces khi component mount (giống profile dialog)
  useEffect(() => {
    fetchProvinces();
  }, []);

  // ✅ Parse địa chỉ khi mở dialog và provinces đã load (giống profile dialog)
  useEffect(() => {
    if (open && id && provinces.length > 0) {
      // Parse address sẽ được gọi trong hàm show
    }
  }, [open, id, provinces.length]);

  // ✅ Fetch tỉnh/thành với cache (giống profile dialog)
  const fetchProvinces = async () => {
    if (addressCache.provinces.length > 0) {
      setProvinces(addressCache.provinces);
      return addressCache.provinces;
    }

    try {
      const res = await fetch('https://provinces.open-api.vn/api/p/');
      const data = await res.json();
      setProvinces(data);
      setAddressCache((prev) => ({ ...prev, provinces: data }));
      return data;
    } catch (error) {
      console.error('Lỗi tải tỉnh/thành:', error);
      return [];
    }
  };

  // ✅ Fetch quận/huyện với cache (giống profile dialog)
  const fetchDistricts = async (provinceCode: string) => {
    if (addressCache.districts[provinceCode]) {
      setDistricts(addressCache.districts[provinceCode]);
      return addressCache.districts[provinceCode];
    }

    setLoadingAddress(true);
    try {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await res.json();
      const districtsData = data.districts || [];

      setDistricts(districtsData);
      setAddressCache((prev) => ({
        ...prev,
        districts: { ...prev.districts, [provinceCode]: districtsData },
      }));

      setWards([]);
      setSelectedDistrict('');
      setSelectedWard('');
      return districtsData;
    } catch (error) {
      console.error('Lỗi tải quận/huyện:', error);
      return [];
    } finally {
      setLoadingAddress(false);
    }
  };

  // ✅ Fetch xã/phường với cache (giống profile dialog)
  const fetchWards = async (districtCode: string) => {
    if (addressCache.wards[districtCode]) {
      setWards(addressCache.wards[districtCode]);
      return addressCache.wards[districtCode];
    }

    setLoadingAddress(true);
    try {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await res.json();
      const wardsData = data.wards || [];

      setWards(wardsData);
      setAddressCache((prev) => ({
        ...prev,
        wards: { ...prev.wards, [districtCode]: wardsData },
      }));

      setSelectedWard('');
      return wardsData;
    } catch (error) {
      console.error('Lỗi tải xã/phường:', error);
      return [];
    } finally {
      setLoadingAddress(false);
    }
  };

  // ✅ Parse địa chỉ từ DB - PHIÊN BẢN TỐI ƯU (giống profile dialog)
  const parseAddressOptimized = async (address: string) => {
    if (!address) {
      console.log('No address to parse');
      return;
    }

    const parts = address.split(' - ').filter((part) => part.trim() !== '');

    if (parts.length < 3) {
      setValue('detailAddress', address);
      return;
    }

    let detailAddress: string = '';
    let wardPart: string = '';
    let districtPart: string = '';
    let provincePart: string = '';

    if (parts.length === 4) {
      [detailAddress, wardPart, districtPart, provincePart] = parts;
    } else if (parts.length === 3) {
      [wardPart, districtPart, provincePart] = parts;
      detailAddress = '';
    }

    if (detailAddress) {
      setValue('detailAddress', detailAddress);
    }

    const province = provinces.find((p) => provincePart.includes(p.name) || p.name.includes(provincePart));

    if (province) {
      setSelectedProvince(province.code);

      const districtsData = await fetchDistricts(province.code);
      const district = districtsData.find((d: any) => districtPart.includes(d.name) || d.name.includes(districtPart));

      if (district) {
        setSelectedDistrict(district.code);

        const wardsData = await fetchWards(district.code);
        const ward = wardsData.find((w: any) => wardPart.includes(w.name) || w.name.includes(wardPart));

        if (ward) {
          setSelectedWard(ward.code);
        }
      }
    }
  };

  // ✅ Reset địa chỉ khi đóng dialog
  const resetAddress = () => {
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedWard('');
    setDistricts([]);
    setWards([]);
    setValue('detailAddress', '');
  };

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
    reset();
    resetAddress();
  };

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      // ✅ Ghép địa chỉ: "Địa chỉ chi tiết - Xã - Huyện - Tỉnh"
      let fullAddress = '';
      if (data.detailAddress || selectedWard || selectedDistrict || selectedProvince) {
        const wardName = wards.find((w) => w.code === selectedWard)?.name || '';
        const districtName = districts.find((d) => d.code === selectedDistrict)?.name || '';
        const provinceName = provinces.find((p) => p.code === selectedProvince)?.name || '';

        fullAddress = [data.detailAddress, wardName, districtName, provinceName].filter(Boolean).join(' - ');
      }

      let res: any = null;

      if (id) {
        res = await apolloClient.mutate({
          mutation: gql`
            mutation ($payload: UpdateUserInput!) {
              updateUser(payload: $payload) {
                id
                email
                name
                type
                address
                phone
              }
            }
          `,
          variables: {
            payload: {
              id,
              type: data.type || 'student',
              email: data.email,
              password: data.password || undefined,
              name: data.name,
              address: fullAddress,
              phone: data.phone,
            },
          },
        });
      } else {
        res = await apolloClient.mutate({
          mutation: gql`
            mutation ($payload: CreateUserInput!) {
              createUser(payload: $payload) {
                id
                email
                name
                type
                address
                phone
              }
            }
          `,
          variables: {
            payload: {
              type: data.type || 'student',
              email: data.email,
              password: data.password,
              name: data.name,
              address: fullAddress,
              phone: data.phone,
            },
          },
        });
      }

      if (res && res.data && (res.data.createUser || res.data.updateUser)) {
        if (res.data.createUser && res.data.createUser.email === 'exist') {
          setSnackbar({
            open: true,
            message: 'Email đã tồn tại. Vui lòng nhập email khác!',
            severity: 'error',
          });
          setLoading(false);
          return;
        }
        setSnackbar({
          open: true,
          message: id ? 'Cập nhật người dùng thành công' : 'Tạo người dùng thành công',
          severity: 'success',
        });
        saved();
        handleClose();
      } else {
        setSnackbar({
          open: true,
          message: 'Lưu người dùng thất bại',
          severity: 'error',
        });
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const show = async (data: any) => {
    if (data) {
      setId(data.id);
      reset({
        email: data.email,
        name: data.name,
        type: data.type || 'student',
        password: '',
        confirm: '',
        detailAddress: '',
        phone: data.phone || '',
      });

      // Reset địa chỉ trước khi parse mới
      resetAddress();

      // Parse địa chỉ nếu có - sử dụng phiên bản tối ưu
      if (data.address) {
        // Đợi provinces load xong trước khi parse
        if (provinces.length === 0) {
          await fetchProvinces();
        }
        parseAddressOptimized(data.address);
      }
    } else {
      reset({
        email: '',
        name: '',
        type: 'student',
        password: '',
        confirm: '',
        detailAddress: '',
        phone: '',
      });
      resetAddress();
    }
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  // ✅ Kiểm tra xem có thông tin địa chỉ nào được chọn không (giống profile dialog)
  const hasSelectedAddress = selectedProvince || selectedDistrict || selectedWard;
  const isAddressIncomplete = hasSelectedAddress && (!selectedProvince || !selectedDistrict || !selectedWard);

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
          {id ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}
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
              {/* Email */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập email',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email không hợp lệ',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      placeholder="example@email.com"
                      disabled={!!id}
                      error={!!errors.email}
                      helperText={errors.email?.message}
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
                  )}
                />
              </Grid>

              {/* Name */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Vui lòng nhập tên' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tên"
                      placeholder="Nhập tên người dùng"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconUser size={20} className="dark:text-gray-400" />
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
                  )}
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Số điện thoại"
                      placeholder="0123456789"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconPhone size={20} className="dark:text-gray-400" />
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
                  )}
                />
              </Grid>

              {/* Type */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue="user"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      label="Quyền"
                      InputProps={{
                        sx: {
                          backgroundColor: '#ffffff',
                          color: '#111827',

                          '& .MuiSelect-icon': {
                            color: '#6b7280',
                          },

                          '.dark &': {
                            backgroundColor: '#1f2937',
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
                      <MenuItem
                        value="user"
                        sx={{
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            },
                          },
                        }}
                      >
                        User
                      </MenuItem>
                      <MenuItem
                        value="student"
                        sx={{
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            },
                          },
                        }}
                      >
                        Học viên
                      </MenuItem>
                      <MenuItem
                        value="teacher"
                        sx={{
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            },
                          },
                        }}
                      >
                        Giáo viên
                      </MenuItem>
                      <MenuItem
                        value="admin"
                        sx={{
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                            '&:hover': {
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            },
                          },
                        }}
                      >
                        Admin
                      </MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              {/* Cảnh báo địa chỉ */}
              {isAddressIncomplete && (
                <Grid item xs={12}>
                  <Alert
                    severity="warning"
                    sx={{
                      mb: 2,
                      '.dark &': {
                        backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        color: '#fbbf24',
                      },
                    }}
                  >
                    Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện và Xã/Phường
                  </Alert>
                </Grid>
              )}

              {/* ✅ Tỉnh/Thành phố */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Tỉnh/Thành phố"
                  value={provinces.some((p) => p.code === selectedProvince) ? selectedProvince : ''}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    fetchDistricts(e.target.value);
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: '#ffffff',
                      color: '#111827',

                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },

                      '.dark &': {
                        backgroundColor: '#1f2937',
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
                      borderColor: '#6b7280',
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
                  <MenuItem value="">-- Chọn tỉnh/thành --</MenuItem>
                  {provinces.map((p) => (
                    <MenuItem
                      key={p.code}
                      value={p.code}
                      sx={{
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#faf6f6ff',
                          '&:hover': {
                            backgroundColor: 'rgba(194, 9, 250, 0.69)',
                          },
                        },
                      }}
                    >
                      {p.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* ✅ Quận/Huyện */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Quận/Huyện"
                  value={districts.some((d) => d.code === selectedDistrict) ? selectedDistrict : ''}
                  disabled={!selectedProvince || loadingAddress}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    fetchWards(e.target.value);
                  }}
                  InputProps={{
                    sx: {
                      backgroundColor: '#ffffff',
                      color: '#111827',

                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },

                      '.dark &': {
                        backgroundColor: '#1f2937',
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
                      borderColor: '#6b7280',
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
                  <MenuItem value="">-- Chọn quận/huyện --</MenuItem>
                  {districts.map((d) => (
                    <MenuItem
                      key={d.code}
                      value={d.code}
                      sx={{
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#faf6f6ff',
                          '&:hover': {
                            backgroundColor: 'rgba(194, 9, 250, 0.69)',
                          },
                        },
                      }}
                    >
                      {d.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* ✅ Xã/Phường */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Xã/Phường"
                  value={wards.some((w) => w.code === selectedWard) ? selectedWard : ''}
                  disabled={!selectedDistrict || loadingAddress}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  InputProps={{
                    sx: {
                      backgroundColor: '#ffffff',
                      color: '#111827',

                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },

                      '.dark &': {
                        backgroundColor: '#1f2937',
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
                      borderColor: '#6b7280',
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
                  <MenuItem value="">-- Chọn xã/phường --</MenuItem>
                  {wards.map((w) => (
                    <MenuItem
                      key={w.code}
                      value={w.code}
                      sx={{
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#faf6f6ff',
                          '&:hover': {
                            backgroundColor: 'rgba(194, 9, 250, 0.69)',
                          },
                        },
                      }}
                    >
                      {w.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* ✅ Địa chỉ chi tiết */}
              <Grid item xs={12}>
                <Controller
                  name="detailAddress"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Địa chỉ chi tiết"
                      placeholder="Số nhà, đường, thôn/xóm..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconMapPin size={20} className="dark:text-gray-400" />
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
                  )}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: id ? false : 'Vui lòng nhập mật khẩu',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Mật khẩu"
                      placeholder={id ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconLock size={20} className="dark:text-gray-400" />
                          </InputAdornment>
                        ),
                        endAdornment: password && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                              sx={{
                                color: '#6b7280',
                                '&:hover': {
                                  color: '#374151',
                                },
                                '.dark &': {
                                  color: '#9ca3af',
                                  '&:hover': {
                                    color: '#d1d5db',
                                  },
                                },
                              }}
                            >
                              {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                            </IconButton>
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
                  )}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="confirm"
                  control={control}
                  rules={{
                    required: id ? false : 'Vui lòng xác nhận mật khẩu',
                    validate: (value) => {
                      if (password && !value) {
                        return 'Vui lòng xác nhận mật khẩu';
                      }
                      if (value && value !== password) {
                        return 'Mật khẩu không khớp';
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type={showConfirm ? 'text' : 'password'}
                      label="Xác nhận mật khẩu"
                      placeholder="Nhập lại mật khẩu"
                      error={!!errors.confirm}
                      helperText={errors.confirm?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconLock size={20} className="dark:text-gray-400" />
                          </InputAdornment>
                        ),
                        endAdornment: confirmPassword && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirm(!showConfirm)}
                              edge="end"
                              size="small"
                              sx={{
                                color: '#6b7280',
                                '&:hover': {
                                  color: '#374151',
                                },
                                '.dark &': {
                                  color: '#9ca3af',
                                  '&:hover': {
                                    color: '#d1d5db',
                                  },
                                },
                              }}
                            >
                              {showConfirm ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                            </IconButton>
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

export default UserFormDialog;
