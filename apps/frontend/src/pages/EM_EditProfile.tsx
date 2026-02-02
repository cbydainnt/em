import { useAuthStore } from '@/hooks/useAuthStore';
import { Avatar, Box, Button, Grid, IconButton, Typography, Dialog, DialogContent, DialogTitle, Portal, Snackbar, Alert, InputAdornment, MenuItem, TextField, Alert as MuiAlert } from '@mui/material';
import { IconPassword, IconX, IconEye, IconEyeOff, IconPhone, IconMapPin } from '@tabler/icons-react';
import { useForm, Controller } from 'react-hook-form';
import { ChangeEvent, useState, useEffect } from 'react';
import { FormInputText } from '@/components/FormInputText';
import { useAuth } from '@/hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { gql } from '@apollo/client';
import apolloClient from '@/utils/apollo';

interface IFormInput {
  email: string;
  name: string;
  phone: string;
  detailAddress: string;
}

interface IChangePasswordInput {
  password: string;
  newPassword: string;
  confirm: string;
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

export default function ProfileDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { authData } = useAuthStore();
  const { fetchUser } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('error');
  const [imgSrc, setImgSrc] = useState(authData.avatar && authData.avatar.includes('http') ? `${authData.avatar}` : authData.avatar ? `/api/user/image/${authData.avatar}` : '');
  const [avatarExt, setAvatarExt] = useState('');
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    defaultValues: {
      email: authData ? authData.email : '',
      name: authData ? authData.name : '',
      phone: authData ? authData.phone : '',
      detailAddress: '',
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    control: passwordControl,
    watch,
    reset: resetPassword,
  } = useForm<IChangePasswordInput>({
    defaultValues: { password: '', newPassword: '', confirm: '' },
  });

  const newPassword = watch('newPassword', '');
  const currentPassword = watch('password', '');
  const confirmPassword = watch('confirm', '');

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (open && authData.address && provinces.length > 0) {
      parseAddressOptimized(authData.address);
    }
  }, [open, authData.address, provinces.length]);

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

  const onSubmit = async (data: IFormInput) => {
    // Nếu có chọn bất kỳ select nào thì phải có đủ 3
    const hasSelectedAddress = selectedProvince || selectedDistrict || selectedWard;

    if (hasSelectedAddress) {
      if (!selectedProvince || !selectedDistrict || !selectedWard) {
        setAlertMessage('Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện và Xã/Phường');
        setAlertSeverity('error');
        setOpenAlert(true);
        return;
      }
    }

    let fullAddress = '';

    if (selectedProvince && selectedDistrict && selectedWard) {
      const wardName = wards.find((w) => w.code === selectedWard)?.name || '';
      const districtName = districts.find((d) => d.code === selectedDistrict)?.name || '';
      const provinceName = provinces.find((p) => p.code === selectedProvince)?.name || '';

      if (data.detailAddress) {
        fullAddress = `${data.detailAddress} - ${wardName} - ${districtName} - ${provinceName}`;
      } else {
        fullAddress = `${wardName} - ${districtName} - ${provinceName}`;
      }
    } else if (data.detailAddress) {
      fullAddress = data.detailAddress;
    }

    const inputData = {
      ...data,
      id: authData.id,
      avatar: imgSrc,
      avatarExt,
      address: fullAddress,
    };

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        await fetchUser();
        setAlertMessage('Cập nhật hồ sơ thành công');
        setAlertSeverity('success');
        setOpenAlert(true);
        onClose();
      } else {
        const errorText = await response.text();
        console.error('Update failed:', errorText);
        setAlertMessage('Cập nhật hồ sơ thất bại');
        setAlertSeverity('error');
        setOpenAlert(true);
      }
    } catch (error) {
      console.error('Update error:', error);
      setAlertMessage('Lỗi kết nối');
      setAlertSeverity('error');
      setOpenAlert(true);
    }
  };

  const onChangePassword = async (data: IChangePasswordInput) => {
    setLoadingPassword(true);
    try {
      const res = await apolloClient.mutate({
        mutation: gql`
          mutation ($currentPassword: String!, $newPassword: String!) {
            changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
              id
            }
          }
        `,
        variables: { currentPassword: data.password, newPassword: data.newPassword },
      });
      if (res?.data?.changePassword) {
        setAlertMessage('Đổi mật khẩu thành công');
        setAlertSeverity('success');
        setOpenAlert(true);
        setOpenChangePasswordDialog(false);
        resetPassword();
        setShowPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } else throw new Error();
    } catch {
      setAlertMessage('Mật khẩu hiện tại không đúng. Vui lòng thử lại');
      setAlertSeverity('error');
      setOpenAlert(true);
    }
    setLoadingPassword(false);
  };

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      const txt = files[0].name.split('.').pop();
      setAvatarExt(txt!);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleCloseAlert = () => setOpenAlert(false);

  // ✅ Reset form khi đóng dialog
  useEffect(() => {
    if (!open) {
      reset();
      setSelectedProvince('');
      setSelectedDistrict('');
      setSelectedWard('');
      setDistricts([]);
      setWards([]);
    }
  }, [open, reset]);

  // ✅ Kiểm tra xem có thông tin địa chỉ nào được chọn không
  const hasSelectedAddress = selectedProvince || selectedDistrict || selectedWard;
  const isAddressIncomplete = hasSelectedAddress && (!selectedProvince || !selectedDistrict || !selectedWard);

  return (
    <>
      {/* MAIN PROFILE DIALOG */}
      <Dialog
        open={open}
        onClose={(_event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return; // ❌ không cho đóng
          }
          onClose(); // các case khác (nếu có)
        }}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: 'rgb(var(--dialog-bg))',
            color: 'rgb(var(--text-primary))',
          },
        }}
      >
        <DialogTitle className="text-purple-600 dark:text-purple-400 font-semibold">
          Hồ sơ cá nhân
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{
              position: 'absolute',
              right: 18,
              top: 18,
              color: (theme) => theme.palette.grey[500],
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                transform: 'rotate(90deg)',
              },
            }}
          >
            <IconX height={18} width={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            bgcolor: 'rgb(var(--dialog-bg))',
            borderBottom: 'none',
            borderColor: 'rgb(var(--border-default))',
          }}
        >
          {authData ? (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="space-y-4 pt-2">
              <Grid container spacing={3}>
                {/* Avatar */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 1 }}>
                  <Avatar variant="circular" src={imgSrc} sx={{ width: 120, height: 120, mb: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Button component="label" variant="contained" className="btn-hover-gradient text-white transition" sx={{ minWidth: 140, textTransform: 'none' }} htmlFor="upload-image">
                      Tải ảnh mới
                      <input hidden type="file" onChange={onChange} accept="image/png, image/jpeg" id="upload-image" />
                    </Button>
                    <Button variant="outlined" color="error" sx={{ minWidth: 140, textTransform: 'none' }} onClick={() => setImgSrc(authData.avatar && authData.avatar.includes('http') ? `${authData.avatar}` : authData.avatar ? `/api/user/image/${authData.avatar}` : '')}>
                      Đặt lại
                    </Button>
                  </Box>
                </Grid>

                {/* Email */}
                <Grid item xs={12} md={12}>
                  <FormInputText
                    name="email"
                    control={control}
                    label="Email"
                    size="small"
                    fullWidth
                    disabled
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgb(var(--surface-muted))',
                        color: 'rgb(var(--text-muted))',
                        '& fieldset': {
                          borderColor: 'rgb(var(--border-default))',
                        },
                      },

                      /* Chữ khi disabled */
                      '& .MuiOutlinedInput-input.Mui-disabled': {
                        WebkitTextFillColor: 'rgb(var(--text-muted))',
                      },

                      /* Label khi disabled */
                      '& .MuiInputLabel-root.Mui-disabled': {
                        color: 'rgb(var(--text-muted))',
                      },
                    }}
                  />
                </Grid>

                {/* Tên */}
                <Grid item xs={12} md={6}>
                  <FormInputText
                    rules={{ required: 'Tên là bắt buộc!' }}
                    name="name"
                    control={control}
                    label="Tên"
                    size="small"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      sx: {
                        backgroundColor: '#fff',
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
                        borderColor: 'rgb(var(--border-default))',
                      },

                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },

                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },
                    }}
                  />
                </Grid>

                {/* Số điện thoại */}
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
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        label="Số điện thoại"
                        placeholder="0123456789"
                        error={!!error}
                        helperText={error?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconPhone size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                            </InputAdornment>
                          ),
                          sx: {
                            backgroundColor: '#fff',
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
                            borderColor: 'rgb(var(--border-default))',
                          },

                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(var(--border-focus))',
                          },

                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(var(--border-focus))',
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Cảnh báo địa chỉ */}
                {isAddressIncomplete && (
                  <Grid item xs={12}>
                    <MuiAlert severity="warning" sx={{ mb: 2 }}>
                      Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện và Xã/Phường
                    </MuiAlert>
                  </Grid>
                )}

                {/* Tỉnh/Thành phố */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Tỉnh/Thành phố"
                    value={provinces.some((p) => p.code === selectedProvince) ? selectedProvince : ''}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      fetchDistricts(e.target.value);
                    }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: '#fff',
                            color: '#111827',

                            // dark mode
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                            },

                            // MenuItem
                            '& .MuiMenuItem-root': {
                              fontSize: 14,
                              '&.Mui-selected': {
                                bgcolor: '#e5e7eb',
                                '.dark &': {
                                  bgcolor: '#374151',
                                },
                              },
                              '&:hover': {
                                bgcolor: '#f3f4f6',
                                '.dark &': {
                                  bgcolor: '#374151',
                                },
                              },
                            },
                          },
                        },
                      },
                    }}
                    InputProps={{
                      sx: {
                        backgroundColor: '#fff',
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
                        borderColor: 'rgb(var(--border-default))',
                      },

                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },

                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },
                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },
                    }}
                  >
                    <MenuItem value="">-- Chọn tỉnh/thành --</MenuItem>
                    {provinces.map((p) => (
                      <MenuItem key={p.code} value={p.code}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Quận/Huyện */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Quận/Huyện"
                    value={districts.some((d) => d.code === selectedDistrict) ? selectedDistrict : ''}
                    disabled={!selectedProvince || loadingAddress}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      fetchWards(e.target.value);
                    }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: '#fff',
                            color: '#111827',

                            // dark mode
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                            },

                            // MenuItem
                            '& .MuiMenuItem-root': {
                              fontSize: 14,
                              '&.Mui-selected': {
                                bgcolor: '#e5e7eb',
                                '.dark &': {
                                  bgcolor: '#374151',
                                },
                              },
                              '&:hover': {
                                bgcolor: '#f3f4f6',
                                '.dark &': {
                                  bgcolor: '#374151',
                                },
                              },
                            },
                          },
                        },
                      },
                    }}
                    InputProps={{
                      sx: {
                        backgroundColor: '#fff',
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
                        borderColor: 'rgb(var(--border-default))',
                      },

                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },

                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },
                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },
                    }}
                  >
                    <MenuItem value="">-- Chọn quận/huyện --</MenuItem>
                    {districts.map((d) => (
                      <MenuItem key={d.code} value={d.code}>
                        {d.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Xã/Phường */}
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Xã/Phường"
                    value={wards.some((w) => w.code === selectedWard) ? selectedWard : ''}
                    disabled={!selectedDistrict || loadingAddress}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: '#fff',
                            color: '#111827',

                            // dark mode
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                            },

                            // MenuItem
                            '& .MuiMenuItem-root': {
                              fontSize: 14,
                              '&.Mui-selected': {
                                bgcolor: '#e5e7eb',
                                '.dark &': {
                                  bgcolor: '#374151',
                                },
                              },
                              '&:hover': {
                                bgcolor: '#f3f4f6',
                                '.dark &': {
                                  bgcolor: '#374151',
                                },
                              },
                            },
                          },
                        },
                      },
                    }}
                    InputProps={{
                      sx: {
                        backgroundColor: '#fff',
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
                        borderColor: 'rgb(var(--border-default))',
                      },

                      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },

                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgb(var(--border-focus))',
                      },
                      '& .MuiSelect-icon': {
                        color: '#6b7280',
                      },
                    }}
                  >
                    <MenuItem value="">-- Chọn xã/phường --</MenuItem>
                    {wards.map((w) => (
                      <MenuItem key={w.code} value={w.code}>
                        {w.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Thôn/Xóm/Số nhà */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="detailAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        label="Thôn/Xóm/Số nhà (Tùy chọn)"
                        placeholder="Số nhà, thôn, xóm..."
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconMapPin size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                            </InputAdornment>
                          ),
                          sx: {
                            backgroundColor: '#fff',
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
                            borderColor: 'rgb(var(--border-default))',
                          },

                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(var(--border-focus))',
                          },

                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgb(var(--border-focus))',
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                {!authData.googleId && (
                  <Grid item xs={12} className="mb-4">
                    <Button
                      variant="outlined"
                      startIcon={<IconPassword />}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenChangePasswordDialog(true);
                      }}
                      fullWidth
                    >
                      Đổi mật khẩu
                    </Button>
                  </Grid>
                )}

                {/* Buttons */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                  <Button type="submit" variant="contained" className="btn-hover-gradient bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300 transition" sx={{ minWidth: 140, textTransform: 'none' }}>
                    Lưu thay đổi
                  </Button>
                  <Button onClick={() => reset()} variant="outlined" color="secondary" sx={{ minWidth: 140, textTransform: 'none' }}>
                    Đặt lại
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Typography variant="h5" align="center" className="dark:text-gray-200">
              Vui lòng đăng nhập
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      {/* CHANGE PASSWORD DIALOG và ALERT SNACKBAR giữ nguyên */}
      {!authData.googleId && (
        <Dialog
          open={openChangePasswordDialog}
          onClose={() => setOpenChangePasswordDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'rgb(var(--dialog-bg))',
              color: 'rgb(var(--text-primary))',
            },
          }}
        >
          <DialogTitle className="text-purple-600 dark:text-purple-400 font-semibold">
            Đổi mật khẩu
            <IconButton
              aria-label="close"
              onClick={() => setOpenChangePasswordDialog(false)}
              size="small"
              sx={{
                position: 'absolute',
                right: 18,
                top: 18,
                color: (theme) => theme.palette.grey[500],
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#7c3aed',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  transform: 'rotate(90deg)',
                },
              }}
            >
              <IconX height={18} width={18} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              bgcolor: 'rgb(var(--dialog-bg))',
              borderBottom: 'none',
              borderColor: 'rgb(var(--border-default))',
            }}
          >
            <Box component="form" onSubmit={handlePasswordSubmit(onChangePassword)} className="space-y-4 pt-4">
              <FormInputText
                autoFocus
                rules={{ required: 'Mật khẩu hiện tại là bắt buộc!' }}
                control={passwordControl}
                name="password"
                label="Mật khẩu hiện tại"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: currentPassword && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" tabIndex={-1}>
                        {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'rgb(var(--input-bg))',
                    color: 'rgb(var(--input-text))',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgb(var(--text-muted))',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-default))',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--accent-primary))',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'rgb(var(--icon-primary))',
                  },
                }}
              />
              <FormInputText
                rules={{ required: 'Mật khẩu mới là bắt buộc!' }}
                control={passwordControl}
                name="newPassword"
                label="Mật khẩu mới"
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: newPassword && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end" size="small" tabIndex={-1}>
                        {showNewPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'rgb(var(--input-bg))',
                    color: 'rgb(var(--input-text))',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgb(var(--text-muted))',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-default))',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--accent-primary))',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'rgb(var(--icon-primary))',
                  },
                }}
              />
              <FormInputText
                rules={{
                  required: 'Xác nhận mật khẩu là bắt buộc!',
                  validate: (value: any) => value === newPassword || 'Mật khẩu không khớp',
                }}
                control={passwordControl}
                name="confirm"
                label="Xác nhận mật khẩu"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: confirmPassword && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small" tabIndex={-1}>
                        {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'rgb(var(--input-bg))',
                    color: 'rgb(var(--input-text))',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgb(var(--text-muted))',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-default))',
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--accent-primary))',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'rgb(var(--icon-primary))',
                  },
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button onClick={() => setOpenChangePasswordDialog(false)} variant="outlined" color="secondary">
                  Hủy
                </Button>
                <LoadingButton loading={loadingPassword} type="submit" variant="contained" className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300" startIcon={<IconPassword height={16} width={16} />}>
                  Đổi mật khẩu
                </LoadingButton>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* ALERT SNACKBAR */}
      <Portal>
        <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} variant="filled" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
}
