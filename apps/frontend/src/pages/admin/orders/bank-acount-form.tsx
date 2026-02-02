import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Avatar, Divider, Alert, Snackbar, Paper, Chip, IconButton, Autocomplete } from '@mui/material';
import { IconBuildingBank, IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import axios from 'axios';

interface BankAccount {
  id?: string;
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_holder: string;
  branch: string;
  is_primary: boolean;
  status: 'active' | 'inactive';
}

interface BankInfo {
  code: string;
  name: string;
  short_name: string;
  bin: string;
  logo: string;
}

export default function BankAccountForm() {
  const [bankAccounts, _setBankAccounts] = useState<BankAccount[]>([]);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [banks, setBanks] = useState<BankInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });

  // Form state
  const [formData, setFormData] = useState({
    bank_code: '',
    account_number: '',
    account_holder: '',
    branch: '',
  });

  useEffect(() => {
    // loadBankAccounts();
    loadBankList();
  }, []);

  // const loadBankAccounts = async () => {
  //   try {
  //     const response = await axios.get('/api/teacher/bank-accounts');
  //     setBankAccounts(response.data);
  //   } catch (error) {
  //     console.error('Error loading bank accounts', error);
  //   }
  // };

  const loadBankList = async () => {
    try {
      // Sử dụng API từ vietqr.io
      const response = await axios.get('https://api.vietqr.io/v2/banks');

      if (response.data && response.data.data) {
        // Transform data từ API về format cần
        const transformedBanks = response.data.data.map((bank: any) => ({
          code: bank.bin,
          name: bank.name,
          short_name: bank.short_name,
          bin: bank.bin,
          logo: bank.logo,
        }));

        setBanks(transformedBanks);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error loading bank list from API, using fallback', error);

      // Fallback: dùng data cứng nếu API fail
      // const fallbackBanks: BankInfo[] = [
      //   {
      //     code: '970418',
      //     name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
      //     short_name: 'BIDV',
      //     bin: '970418',
      //     logo: 'https://api.vietqr.io/img/BIDV.png',
      //   },
      //   {
      //     code: '970436',
      //     name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
      //     short_name: 'Vietcombank',
      //     bin: '970436',
      //     logo: 'https://api.vietqr.io/img/VCB.png',
      //   },
      //   {
      //     code: '970407',
      //     name: 'Ngân hàng TMCP Kỹ thương Việt Nam',
      //     short_name: 'Techcombank',
      //     bin: '970407',
      //     logo: 'https://api.vietqr.io/img/TCB.png',
      //   },
      //   {
      //     code: '970422',
      //     name: 'Ngân hàng TMCP Quân đội',
      //     short_name: 'MBBank',
      //     bin: '970422',
      //     logo: 'https://api.vietqr.io/img/MB.png',
      //   },
      //   {
      //     code: '970416',
      //     name: 'Ngân hàng TMCP Á Châu',
      //     short_name: 'ACB',
      //     bin: '970416',
      //     logo: 'https://api.vietqr.io/img/ACB.png',
      //   },
      //   {
      //     code: '970441',
      //     name: 'Ngân hàng TMCP Quốc tế Việt Nam',
      //     short_name: 'VIB',
      //     bin: '970441',
      //     logo: 'https://api.vietqr.io/img/VIB.png',
      //   },
      //   {
      //     code: '970423',
      //     name: 'Ngân hàng TMCP Tiên Phong',
      //     short_name: 'TPBank',
      //     bin: '970423',
      //     logo: 'https://api.vietqr.io/img/TPB.png',
      //   },
      //   {
      //     code: '970458',
      //     name: 'Ngân hàng TMCP Bưu điện Liên Việt',
      //     short_name: 'LPBank',
      //     bin: '970458',
      //     logo: 'https://api.vietqr.io/img/LPB.png',
      //   },
      //   {
      //     code: '970405',
      //     name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
      //     short_name: 'VPBank',
      //     bin: '970405',
      //     logo: 'https://api.vietqr.io/img/VPB.png',
      //   },
      //   {
      //     code: '970433',
      //     name: 'Ngân hàng TMCP Sài Gòn Thương Tín',
      //     short_name: 'Sacombank',
      //     bin: '970433',
      //     logo: 'https://api.vietqr.io/img/STB.png',
      //   },
      // ];

      // setBanks(fallbackBanks);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (isEditing && editingAccount) {
      setEditingAccount({
        ...editingAccount,
        [field]: value,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleBankSelect = (bankCode: string) => {
    const selectedBank = banks.find((bank) => bank.code === bankCode);
    if (selectedBank) {
      if (isEditing && editingAccount) {
        setEditingAccount({
          ...editingAccount,
          bank_code: bankCode,
          bank_name: selectedBank.name,
        });
      } else {
        setFormData({
          ...formData,
          bank_code: bankCode,
        });
      }
    }
  };

  const validateForm = () => {
    const data = isEditing ? editingAccount : formData;
    if (!data?.bank_code) {
      setSnackbar({
        open: true,
        message: 'Vui lòng chọn ngân hàng',
        severity: 'error',
      });
      return false;
    }
    if (!data.account_number || data.account_number.length < 8) {
      setSnackbar({
        open: true,
        message: 'Số tài khoản phải có ít nhất 8 ký tự',
        severity: 'error',
      });
      return false;
    }
    if (!data.account_holder) {
      setSnackbar({
        open: true,
        message: 'Vui lòng nhập tên chủ tài khoản',
        severity: 'error',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = isEditing ? editingAccount : formData;

      if (isEditing && editingAccount?.id) {
        // Update existing account
        await axios.put(`/api/teacher/bank-accounts/${editingAccount.id}`, data);
        setSnackbar({
          open: true,
          message: 'Cập nhật tài khoản ngân hàng thành công',
          severity: 'success',
        });
      } else {
        // Create new account
        await axios.post('/api/teacher/bank-accounts', {
          ...data,
          is_primary: bankAccounts.length === 0, // Set as primary if first account
          status: 'active',
        });
        setSnackbar({
          open: true,
          message: 'Thêm tài khoản ngân hàng thành công',
          severity: 'success',
        });
      }

      // Reset form and reload data
      resetForm();
      // loadBankAccounts();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Có lỗi xảy ra',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
    setIsEditing(true);
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      bank_code: '',
      account_number: '',
      account_holder: '',
      branch: '',
    });
    setEditingAccount(null);
    setIsEditing(false);
  };

  const handleSetPrimary = async (accountId: string) => {
    try {
      await axios.put(`/api/teacher/bank-accounts/${accountId}/set-primary`);
      setSnackbar({
        open: true,
        message: 'Đã đặt làm tài khoản chính',
        severity: 'success',
      });
      // loadBankAccounts();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể đặt tài khoản chính',
        severity: 'error',
      });
    }
  };

  const handleDelete = async (accountId: string) => {
    if (!confirm('Bạn có chắc muốn xóa tài khoản ngân hàng này?')) return;

    try {
      await axios.delete(`/api/teacher/bank-accounts/${accountId}`);
      setSnackbar({
        open: true,
        message: 'Đã xóa tài khoản ngân hàng',
        severity: 'success',
      });
      // loadBankAccounts();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể xóa tài khoản ngân hàng',
        severity: 'error',
      });
    }
  };

  const getSelectedBank = () => {
    const bankCode = isEditing ? editingAccount?.bank_code : formData.bank_code;
    return banks.find((bank) => bank.code === bankCode);
  };

  const selectedBank = getSelectedBank();

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom className="flex items-center gap-2 dark:text-gray-100">
          <IconBuildingBank size={32} className="text-blue-600 dark:text-blue-400" />
          Tài khoản ngân hàng
        </Typography>
        <Typography variant="body1" className="dark:text-gray-400">
          Thêm tài khoản ngân hàng để nhận tiền từ việc bán khóa học
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <Typography variant="h6" gutterBottom className="flex items-center gap-2 dark:text-gray-200">
                {isEditing ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
              </Typography>

              {/* Bank Selection - Sử dụng Autocomplete để dễ tìm kiếm */}
              <Autocomplete
                options={banks}
                getOptionLabel={(bank) => `${bank.short_name} - ${bank.name}`}
                value={banks.find((bank) => bank.code === (isEditing ? editingAccount?.bank_code : formData.bank_code)) || null}
                onChange={(_, newValue) => {
                  if (newValue) {
                    handleBankSelect(newValue.code);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chọn ngân hàng"
                    placeholder="Tìm kiếm ngân hàng..."
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: '#fff',
                        color: '#111827',
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#f3f4f6',
                        },
                      },
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
                    InputLabelProps={{
                      sx: {
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      },
                    }}
                  />
                )}
                renderOption={(props, bank) => (
                  <li {...props} className="dark:bg-gray-700 dark:text-gray-200">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Avatar src={bank.logo} sx={{ width: 24, height: 24 }} alt={bank.short_name} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="bold" className="dark:text-gray-100">
                          {bank.short_name}
                        </Typography>
                        <Typography variant="caption" className="dark:text-gray-400">
                          {bank.name}
                        </Typography>
                      </Box>
                    </Box>
                  </li>
                )}
                sx={{
                  mb: 2,
                  '& .MuiAutocomplete-popper': {
                    '.dark &': {
                      backgroundColor: '#1f2937',
                    },
                  },
                }}
              />

              {/* Account Number */}
              <TextField
                fullWidth
                label="Số tài khoản"
                value={isEditing ? editingAccount?.account_number : formData.account_number}
                onChange={(e) => handleInputChange('account_number', e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#1f2937',
                      color: '#f3f4f6',
                    },
                  },
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
                InputLabelProps={{
                  sx: {
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  },
                }}
                placeholder="Nhập số tài khoản"
              />

              {/* Account Holder */}
              <TextField
                fullWidth
                label="Tên chủ tài khoản"
                value={isEditing ? editingAccount?.account_holder : formData.account_holder}
                onChange={(e) => handleInputChange('account_holder', e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#1f2937',
                      color: '#f3f4f6',
                    },
                  },
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
                InputLabelProps={{
                  sx: {
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  },
                }}
                placeholder="Nhập đúng tên chủ tài khoản"
              />

              {/* Branch */}
              <TextField
                fullWidth
                label="Chi nhánh (tuỳ chọn)"
                value={isEditing ? editingAccount?.branch : formData.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    color: '#111827',
                    '.dark &': {
                      backgroundColor: '#1f2937',
                      color: '#f3f4f6',
                    },
                  },
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
                InputLabelProps={{
                  sx: {
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  },
                }}
                placeholder="Ví dụ: Chi nhánh Hà Nội"
              />

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={<IconCheck size={20} />}
                  sx={{
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#7c3aed',
                    },
                    '&:disabled': {
                      backgroundColor: '#d1d5db',
                      color: '#9ca3af',
                      '.dark &': {
                        backgroundColor: '#374151',
                        color: '#6b7280',
                      },
                    },
                  }}
                >
                  {isEditing ? 'Cập nhật' : 'Thêm tài khoản'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                  startIcon={<IconX size={20} />}
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
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview & List Section */}
        <Grid item xs={12} md={6}>
          {/* Bank Preview */}
          {selectedBank && (
            <Card
              className="dark:bg-gray-800 dark:border-gray-700"
              sx={{
                mb: 3,
                border: '1px solid',
                borderColor: 'divider',
                '.dark &': {
                  borderColor: '#374151',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom className="dark:text-gray-200">
                  Xem trước
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar src={selectedBank.logo} sx={{ width: 48, height: 48 }} alt={selectedBank.short_name} />
                  <Box>
                    <Typography variant="body1" fontWeight="bold" className="dark:text-gray-100">
                      {selectedBank.name}
                    </Typography>
                    <Typography variant="body2" className="dark:text-gray-400">
                      {selectedBank.short_name}
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    '.dark &': {
                      borderColor: '#374151',
                    },
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" className="dark:text-gray-400">
                      Số tài khoản:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" className="dark:text-gray-100">
                      {isEditing ? editingAccount?.account_number : formData.account_number}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" className="dark:text-gray-400">
                      Chủ tài khoản:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" className="dark:text-gray-100">
                      {isEditing ? editingAccount?.account_holder : formData.account_holder}
                    </Typography>
                  </Box>
                  {formData.branch && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" className="dark:text-gray-400">
                        Chi nhánh:
                      </Typography>
                      <Typography variant="body2" className="dark:text-gray-300">
                        {formData.branch}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Existing Accounts */}
          <Card
            className="dark:bg-gray-800 dark:border-gray-700"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              '.dark &': {
                borderColor: '#374151',
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom className="dark:text-gray-200">
                Tài khoản của tôi ({bankAccounts.length})
              </Typography>

              {bankAccounts.length === 0 ? (
                <Typography variant="body2" className="dark:text-gray-400" textAlign="center" py={3}>
                  Chưa có tài khoản ngân hàng nào
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {bankAccounts.map((account) => (
                    <Paper
                      key={account.id}
                      variant="outlined"
                      sx={{
                        p: 2,
                        position: 'relative',
                        border: '1px solid',
                        borderColor: account.is_primary ? '#3b82f6' : '#e5e7eb',
                        backgroundColor: 'background.paper',
                        '.dark &': {
                          borderColor: account.is_primary ? '#3b82f6' : '#374151',
                          backgroundColor: '#111827',
                        },
                      }}
                    >
                      {account.is_primary && (
                        <Chip
                          label="Chính"
                          color="primary"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -10,
                            right: -10,
                            '.dark &': {
                              backgroundColor: 'rgba(59, 130, 246, 0.2)',
                              color: '#60a5fa',
                            },
                          }}
                        />
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Avatar src={banks.find((b) => b.code === account.bank_code)?.logo} sx={{ width: 32, height: 32 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" fontWeight="bold" className="dark:text-gray-100">
                            {account.bank_name}
                          </Typography>
                          <Typography variant="body2" className="dark:text-gray-400">
                            {account.account_number}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ mb: 1 }} className="dark:text-gray-300">
                        {account.account_holder}
                      </Typography>

                      {account.branch && (
                        <Typography variant="caption" className="dark:text-gray-500">
                          Chi nhánh: {account.branch}
                        </Typography>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(account)}
                          sx={{
                            color: '#6b7280',
                            '&:hover': {
                              color: '#374151',
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                            '.dark &': {
                              color: '#9ca3af',
                              '&:hover': {
                                color: '#e5e7eb',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              },
                            },
                          }}
                        >
                          <IconEdit size={16} />
                        </IconButton>
                        {!account.is_primary && (
                          <>
                            <Button
                              size="small"
                              onClick={() => handleSetPrimary(account.id!)}
                              sx={{
                                color: '#374151',
                                '&:hover': {
                                  color: '#1f2937',
                                },
                                '.dark &': {
                                  color: '#d1d5db',
                                  '&:hover': {
                                    color: '#f3f4f6',
                                  },
                                },
                              }}
                            >
                              Đặt làm chính
                            </Button>
                            <Button
                              size="small"
                              onClick={() => handleDelete(account.id!)}
                              sx={{
                                color: '#ef4444',
                                '&:hover': {
                                  color: '#dc2626',
                                },
                                '.dark &': {
                                  color: '#f87171',
                                  '&:hover': {
                                    color: '#fca5a5',
                                  },
                                },
                              }}
                            >
                              Xóa
                            </Button>
                          </>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Important Notice */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Lưu ý quan trọng:</strong>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          • Vui lòng nhập chính xác thông tin tài khoản ngân hàng
          <br />
          • Tên chủ tài khoản phải khớp với tên trong hệ thống ngân hàng
          <br />• Thanh toán sẽ được chuyển khoản vào tài khoản chính của bạn
        </Typography>
      </Alert>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
