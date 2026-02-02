import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, MenuItem, TableCell, Select, TableContainer, TableHead, TableRow, Checkbox, Avatar, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, useMediaQuery, useTheme, TextField, InputAdornment, FormControl, InputLabel } from '@mui/material';
import { useEffect, useRef, useState, useCallback } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import UserFormDialog from './user-form';
import apolloClient from '@/utils/apollo';
import { gql } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { IconEdit, IconPlus, IconTrash, IconUser, IconAlertCircle, IconSearch } from '@tabler/icons-react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import debounce from 'lodash/debounce'; 

interface DataType {
  id: string;
  email: string;
  avatar: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  googleId: string;
  updated_at?: string;
}

export default function UserManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [params] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalUsers, setTotalUsers] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const refUserForm = useRef<any>(null);
  const { authData } = useAuthStore();
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState<string>(''); // 'user', 'student', 'admin', 'teacher', '' = all

 
  const debouncedSearchRef = useRef(
    debounce((searchValue: string) => {
     
      loadDataWithSearch(searchValue);
    }, 500), 
  );

  // ✅ Hàm loadData với search
  const loadDataWithSearch = useCallback(
    async (searchValue: string) => {
      setLoading(true);
      try {
        const variables: any = {
          filters: {
            search: searchValue?.trim() || null,
            page: page ? Number(page) : 1,
            pageSize: rowsPerPage,
            orderBy: undefined,
          },
        };

        if (userType) {
          variables.filters.type = userType;
        }

        const countRes = await apolloClient.query({
          query: gql`
            query ($filters: FilterUserInput!) {
              countUser(filters: $filters)
            }
          `,
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
          variables,
        });

        if (countRes && countRes.data && countRes.data.countUser > 0) {
          setTotalUsers(countRes.data.countUser);

          const response = await apolloClient.query({
            query: gql`
              query ($filters: FilterUserInput!) {
                users(filters: $filters) {
                  id
                  email
                  avatar
                  address
                  phone
                  name
                  type
                  googleId
                  updated_at
                }
              }
            `,
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
            variables,
          });

          if (response && response.data && response.data.users) {
            setUsers(response.data.users);
          }
        } else {
          setUsers([]);
          setTotalUsers(0);
        }
      } catch (error: any) {
        console.log(error.message);
        setSnackbar({ open: true, message: 'Không thể tải dữ liệu', severity: 'error' });
      }
      setLoading(false);
    },
    [page, rowsPerPage, userType],
  );

  
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const variables: any = {
        filters: {
          search: search?.trim() || null,
          page: page ? Number(page) : 1,
          pageSize: rowsPerPage,
          orderBy: undefined,
        },
      };

      if (userType) {
        variables.filters.type = userType;
      }

      const countRes = await apolloClient.query({
        query: gql`
          query ($filters: FilterUserInput!) {
            countUser(filters: $filters)
          }
        `,
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
        variables,
      });

      if (countRes && countRes.data && countRes.data.countUser > 0) {
        setTotalUsers(countRes.data.countUser);

        const response = await apolloClient.query({
          query: gql`
            query ($filters: FilterUserInput!) {
              users(filters: $filters) {
                id
                email
                avatar
                address
                phone
                name
                type
                googleId
                updated_at
              }
            }
          `,
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
          variables,
        });

        if (response && response.data && response.data.users) {
          setUsers(response.data.users);
        }
      } else {
        setUsers([]);
        setTotalUsers(0);
      }
    } catch (error: any) {
      console.log(error.message);
      setSnackbar({ open: true, message: 'Không thể tải dữ liệu', severity: 'error' });
    }
    setLoading(false);
  }, [page, rowsPerPage, search, userType]);

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.id);
      setSelectedRowKeys(newSelected);
      return;
    }
    setSelectedRowKeys([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selectedRowKeys.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRowKeys, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRowKeys.slice(1));
    } else if (selectedIndex === selectedRowKeys.length - 1) {
      newSelected = newSelected.concat(selectedRowKeys.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRowKeys.slice(0, selectedIndex), selectedRowKeys.slice(selectedIndex + 1));
    }

    setSelectedRowKeys(newSelected);
  };

  const isSelected = (id: string) => selectedRowKeys.indexOf(id) !== -1;

  const handleSaved = async () => {
    setPage(1);
    await loadData();
  };

  
  useEffect(() => {
    if (page > 0) {
      setTimeout(async () => {
        await loadData();
      }, 0);
    }
  }, [page, rowsPerPage, userType, loadData]); 

  useEffect(() => {
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  const handleDeleteDialogOpen = (id?: string) => {
    if (id) {
      setDeleteTargetId(id);
    }
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteItems([deleteTargetId]);
    } else {
      await deleteItems(selectedRowKeys);
    }
    handleDeleteDialogClose();
  };

  const deleteItems = async (ids: string[]) => {
    setLoading(true);
    try {
      const res = await apolloClient.mutate({
        mutation: gql`
          mutation ($ids: [String!]!) {
            removeUser(ids: $ids)
          }
        `,
        variables: { ids },
      });

      if (res && res.data && res.data.removeUser) {
        setSnackbar({ open: true, message: 'Xóa người dùng thành công', severity: 'success' });
        setSelectedRowKeys([]);
        await loadData();
      } else {
        setSnackbar({ open: true, message: 'Xóa người dùng thất bại', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Đã xảy ra lỗi', severity: 'error' });
    }
    setLoading(false);
  };

  const updateUserType = gql`
    mutation ($id: String!, $type: String!) {
      updateUserType(id: $id, type: $type) {
        id
        type
      }
    }
  `;



  const handleChangeRole = async (id: string, newRole: string) => {
    setLoading(true);
    try {
      const res = await apolloClient.mutate({
        mutation: updateUserType,
        variables: { id, type: newRole },
      });

      if (res.data?.updateUserType) {
        setSnackbar({ open: true, message: 'Cập nhật quyền thành công', severity: 'success' });
        await loadData();
      } else {
        setSnackbar({ open: true, message: 'Không thể cập nhật quyền', severity: 'error' });
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Lỗi khi cập nhật quyền', severity: 'error' });
    }
    setLoading(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

 
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset về trang 1 khi search

    // Gọi debounced function
    debouncedSearchRef.current(value);
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" className="text-gray-800 dark:text-gray-100 font-semibold">
            Quản lý người dùng
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            {selectedRowKeys.length > 0 && (
              <>
                <Chip label={`Đã chọn ${selectedRowKeys.length} người dùng`} color="primary" size="small" />
                <Button variant="outlined" color="error" startIcon={<IconTrash size={20} />} onClick={() => handleDeleteDialogOpen()} disabled={loading}>
                  Xóa
                </Button>
              </>
            )}
            <Button variant="contained" className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300" startIcon={<IconPlus size={20} />} onClick={() => refUserForm.current.show(null)}>
              Tạo người dùng mới
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search Input */}
            <TextField
              size="small"
              placeholder="Tìm theo tên hoặc email..."
              value={search}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={20} className="text-gray-500 dark:text-gray-400" />
                  </InputAdornment>
                ),
                sx: {
                  '.dark &': {
                    bgcolor: '#374151',
                    color: '#f3f4f6',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4b5563',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8b5cf6',
                    },
                  },
                },
              }}
              sx={{ minWidth: 280 }}
            />

            {/* Type Filter Select */}
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel className="dark:text-gray-400">Loại người dùng</InputLabel>
              <Select
                value={userType}
                onChange={(e) => {
                  setUserType(e.target.value);
                  setPage(1);
                }}
                label="Loại người dùng"
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
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="student">Học viên</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="teacher">Giáo viên</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
        </Box>

        {/* Table - GIỮ NGUYÊN */}
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
                      indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < users.length}
                      checked={users.length > 0 && selectedRowKeys.length === users.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Email</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Tên</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Quyền</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Cập nhật</TableCell>
                  <TableCell align="center" className="font-semibold dark:text-gray-900">
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                      <Typography>Đang tải...</Typography>
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                      <Typography className="text-gray-500">{search || userType ? 'Không tìm thấy người dùng nào phù hợp' : 'Không có dữ liệu'}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((row) => {
                    const isItemSelected = isSelected(row.id);
                    return (
                      <TableRow key={row.id} hover onClick={() => handleClick(row.id)} role="checkbox" aria-checked={isItemSelected} selected={isItemSelected} sx={{ cursor: 'pointer' }} className="dark:hover:bg-gray-700">
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={row.avatar && row.avatar.includes('http') ? `${row.avatar}` : row.avatar ? `/api/user/image/${row.avatar}` : undefined} sx={{ width: 40, height: 40 }}>
                              {!row.avatar && <IconUser size={20} />}
                            </Avatar>
                            <Typography className="dark:text-gray-200">{row.email}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">{row.name}</TableCell>
                        <TableCell className="dark:text-gray-200">
                          {authData?.type === 'admin' ? (
                            <Select
                              size="small"
                              value={row.type}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleChangeRole(row.id, e.target.value)}
                              sx={{
                                minWidth: 130,
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
                            >
                              <MenuItem value="user" className="dark:text-gray-100 dark:hover:bg-gray-700">
                                User
                              </MenuItem>
                              <MenuItem value="student" className="dark:text-gray-100 dark:hover:bg-gray-700">
                                Học viên
                              </MenuItem>
                              <MenuItem value="admin" className="dark:text-gray-100 dark:hover:bg-gray-700">
                                Admin
                              </MenuItem>
                              <MenuItem value="teacher" className="dark:text-gray-100 dark:hover:bg-gray-700">
                                Giáo viên
                              </MenuItem>
                            </Select>
                          ) : (
                            row.type
                          )}
                        </TableCell>
                        <TableCell className="dark:text-gray-200">{row.updated_at ? formatDateTime(row.updated_at) : ''}</TableCell>

                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                refUserForm.current.show(row);
                              }}
                              className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                              <IconEdit size={20} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDialogOpen(row.id);
                              }}
                              className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                            >
                              <IconTrash size={20} />
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
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
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

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            className: 'dark:bg-gray-800',
          }}
        >
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <IconAlertCircle size={24} />
            Xác nhận xóa
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="dark:text-gray-300">{deleteTargetId ? 'Bạn có chắc chắn muốn xóa người dùng này?' : `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} người dùng đã chọn?`}</DialogContentText>
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

        <UserFormDialog ref={refUserForm} saved={handleSaved} />
      </Box>
    </AdminLayout>
  );
}
