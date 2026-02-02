import React, { useState, useEffect } from 'react';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { Autocomplete, TextField, Chip, Box, Typography, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';
import { IconUser } from '@tabler/icons-react';

interface ApplicableUserMultiSelectProps {
  voucherId?: string;
  control: Control<any>;
  name: string;
  setValue?: UseFormSetValue<any>;
}

export const ApplicableUserMultiSelect: React.FC<ApplicableUserMultiSelectProps> = ({ voucherId, control, name, setValue }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch selected users khi có voucherId (edit mode)
  useEffect(() => {
    if (voucherId) {
      fetchSelectedUsers(voucherId);
    }
  }, [voucherId]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/user', {
        params: {
          pageSize: 100,
          role: 'user',
        },
      });
      const userList = response.data.data || response.data || [];
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedUsers = async (voucherId: string) => {
    setInitialLoading(true);
    try {
      const response = await axios.get(`/api/admin/discount-vouchers/${voucherId}/applicable-users`);
      if (response.data && Array.isArray(response.data)) {
        const userIds = response.data.map((user: any) => user.user_id);
        setSelectedUserIds(userIds);

        // Cập nhật form value
        if (setValue) {
          setValue(name, userIds);
        }
      }
    } catch (error) {
      console.error('Error fetching selected users:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const getSelectedUserObjects = () => {
    return users.filter((user) => selectedUserIds.includes(user.user_id || user.id));
  };
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    return `/api/file/view/${imageUrl}`;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value) => {
          if (!value || value.length === 0) {
            return 'Vui lòng chọn ít nhất một người dùng';
          }
          return true;
        },
      }}
      render={({ field: { onChange, ref }, fieldState }) => (
        <Box>
          {initialLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Autocomplete
              multiple
              options={users}
              value={getSelectedUserObjects()}
              onChange={(_, newValue) => {
                const newUserIds = newValue.map((user) => user.user_id || user.id);
                setSelectedUserIds(newUserIds);
                onChange(newUserIds);
              }}
              isOptionEqualToValue={(option, value) => (option.user_id || option.id) === (value.user_id || value.id)}
              getOptionLabel={(option) => (option.name ? `${option.name} (${option.email})` : option.email)}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={ref}
                  label="Chọn người dùng"
                  placeholder="Tìm kiếm theo tên hoặc email"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || 'Chọn người dùng được phép sử dụng voucher này'}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  InputLabelProps={{
                    sx: {
                      '.dark &': {
                        color: '#9ca3af',
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      color: '#6b7280',
                      '.dark &': {
                        color: '#d1d5db',
                      },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                      color: '#111827',
                      '.dark &': {
                        backgroundColor: '#111827',
                        color: '#f3f4f6',
                      },
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: fieldState.error ? '#ef4444' : '#d1d5db',
                      '.dark &': {
                        borderColor: fieldState.error ? '#f87171' : '#374151',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: fieldState.error ? '#ef4444' : '#8b5cf6',
                      '.dark &': {
                        borderColor: fieldState.error ? '#f87171' : '#8b5cf6',
                      },
                    },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#8b5cf6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      <Avatar src={getImageUrl(option.avatar)} sx={{ width: 40, height: 40 }}>
                        {!getImageUrl(option.avatar) && <IconUser size={20} />}
                      </Avatar>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {option.name || 'Không có tên'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.email}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.user_id || option.id}
                    label={option.name ? `${option.name}` : option.email}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      color: '#7c3aed',
                      '& .MuiChip-deleteIcon': {
                        color: '#7c3aed',
                        '&:hover': {
                          color: '#5b21b6',
                        },
                      },
                      '.dark &': {
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        color: '#c4b5fd',
                        '& .MuiChip-deleteIcon': {
                          color: '#c4b5fd',
                          '&:hover': {
                            color: '#a78bfa',
                          },
                        },
                      },
                    }}
                  />
                ))
              }
              sx={{
                '& .MuiAutocomplete-popper': {
                  '.dark &': {
                    '& .MuiPaper-root': {
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                    },
                  },
                },
              }}
            />
          )}

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              color: '#6b7280',
              '.dark &': {
                color: '#9ca3af',
              },
            }}
          >
            Đã chọn: {selectedUserIds.length} người dùng
          </Typography>
        </Box>
      )}
    />
  );
};
