import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Tooltip, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, Switch, FormControlLabel, Avatar, TableSortLabel, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState, useCallback } from 'react';
import CourseFormDialog from './course-form';
import CourseDetailDialog from './components/course-detail-dialog';
import CourseStudentsDialog from './components/course-students-dialog';
import CourseReviewsDialog from './components/course-reviews-dialog';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconEdit, IconPlus, IconTrash, IconBook, IconAlertCircle, IconStar, IconSearch, IconRestore, IconTrashX, IconSelector, IconUsers } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import debounce from 'lodash/debounce'; 

interface CourseType {
  course_id: string;
  course_name: string;
  course_description: string;
  course_price: number;
  course_original_price: number;
  state: string;
  thumbnail?: string;
  total_lessons: number;
  total_duration: number;
  total_course_user: number;
  avg_rating: number;
  view_count: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  del_flg: boolean;
}

type SortField = 'course_price' | 'total_course_user' | null;
type SortOrder = 'asc' | 'desc';

export default function CourseManagementPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalCourses, setTotalCourses] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchText, setSearchText] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openStudentsDialog, setOpenStudentsDialog] = useState(false);
  const [openReviewsDialog, setOpenReviewsDialog] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const refCourseForm = useRef<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  
  const debouncedSearchRef = useRef(
    debounce((searchValue: string) => {
      // Khi người dùng ngừng gõ 500ms thì mới thực hiện tìm kiếm
      setSearchText(searchValue);
      setPage(1); // Reset về trang 1 khi search
    }, 500), // 500ms delay
  );

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = courses.map((n) => n.course_id);
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

  // ✅ Hàm loadData với useCallback để tránh re-render không cần thiết
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/courses`, {
        params: {
          page,
          pageSize: rowsPerPage,
          search: searchText || undefined,
          includeDeleted,
        },
      });

      if (response.data) {
        let sortedCourses = response.data.data;

        // Lấy số học viên thực tế cho từng khóa học
        const coursesWithRealStudentCount = await Promise.all(
          sortedCourses.map(async (course: any) => {
            try {
              // Gọi API để lấy số học viên thực tế
              const studentsResponse = await axios.get(`/api/usercourses/${course.course_id}/students`, {
                params: {
                  page: 1,
                  pageSize: 1, // Chỉ cần lấy total count
                },
              });

              return {
                ...course,
                total_course_user: studentsResponse.data.total || 0,
              };
            } catch (error) {
              console.error(`Error fetching students for course ${course.course_id}:`, error);
              return {
                ...course,
                total_students: 0,
              };
            }
          }),
        );

        // Client-side sorting
        if (sortField) {
          coursesWithRealStudentCount.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortOrder === 'asc') {
              return aValue > bValue ? 1 : -1;
            } else {
              return aValue < bValue ? 1 : -1;
            }
          });
        }

        setCourses(coursesWithRealStudentCount);
        setTotalCourses(response.data.total);
      }
    } catch (error: any) {
      console.error('Error loading courses:', error);
      setSnackbar({
        open: true,
        message: 'Không thể tải dữ liệu',
        severity: 'error',
      });
    }
    setLoading(false);
  }, [page, rowsPerPage, searchText, includeDeleted, sortField, sortOrder]);

  // ✅ Cập nhật useEffect với đúng dependencies
  useEffect(() => {
    if (page > 0) {
      setTimeout(async () => {
        await loadData();
      }, 0);
    }
  }, [page, rowsPerPage, searchText, includeDeleted, sortField, sortOrder, loadData]);

  // ✅ Cleanup debounce khi component unmount
  useEffect(() => {
    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, []);

  const handleDeleteDialogOpen = (id?: string, type: 'soft' | 'hard' = 'soft') => {
    if (id) {
      setDeleteTargetId(id);
      const course = courses.find((c) => c.course_id === id);
      if (course?.del_flg) {
        setDeleteType('hard');
      } else {
        setDeleteType(type);
      }
    } else {
      const allDeleted = selectedRowKeys.every((id) => courses.find((c) => c.course_id === id)?.del_flg);
      setDeleteType(allDeleted ? 'hard' : type);
    }
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteItems([deleteTargetId], deleteType);
    } else {
      await deleteItems(selectedRowKeys, deleteType);
    }
    handleDeleteDialogClose();
  };

  const deleteItems = async (ids: string[], type: 'soft' | 'hard') => {
    setLoading(true);
    try {
      if (ids.length === 1) {
        await axios.delete(`/api/admin/courses/${ids[0]}/${type}`);
        setSnackbar({
          open: true,
          message: type === 'soft' ? 'Xóa khóa học thành công!' : 'Xóa vĩnh viễn khóa học thành công!',
          severity: 'success',
        });
      } else {
        const endpoint = type === 'soft' ? 'bulk-soft-delete' : 'bulk-hard-delete';
        await axios.post(`/api/admin/courses/${endpoint}`, { ids });
        setSnackbar({
          open: true,
          message: type === 'soft' ? `Xóa ${ids.length} khóa học thành công!` : `Xóa vĩnh viễn ${ids.length} khóa học thành công!`,
          severity: 'success',
        });
      }
      setSelectedRowKeys([]);
      await loadData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleRestore = async (id: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/courses/${id}/restore`);
      setSnackbar({
        open: true,
        message: 'Khôi phục khóa học thành công!',
        severity: 'success',
      });
      await loadData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
    setParams({ page: String(newPage + 1) });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setParams({ page: '1' });
  };

  // ✅ Cập nhật hàm handleSearch với debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Cập nhật giá trị hiển thị ngay lập tức
    e.target.value = value;
    // Gọi debounced function
    debouncedSearchRef.current(value);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'New':
        return 'info';
      case 'Highest Rated':
        return 'success';
      case 'Best Seller':
        return 'warning';
      case 'Sale':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const getStateLabel = (state: string) => {
    switch (state) {
      case 'New':
        return 'Mới';
      case 'Highest Rated':
        return 'Đánh giá cao';
      case 'Best Seller':
        return 'Bán chạy';
      case 'Normal':
        return 'Bình thường';
      case 'Sale':
        return 'Giảm giá';
      default:
        return state;
    }
  };

  const hasSelectedDeleted = selectedRowKeys.some((id) => courses.find((c) => c.course_id === id)?.del_flg);

  const handleOpenCourseDetail = (course: CourseType) => {
    setSelectedCourse(course);
    setOpenDetailDialog(true);
  };

  const handleOpenStudents = (course: CourseType) => {
    setSelectedCourse(course);
    setOpenStudentsDialog(true);
  };

  const handleOpenReviews = (course: CourseType) => {
    setSelectedCourse(course);
    setOpenReviewsDialog(true);
  };

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" className="text-gray-800 dark:text-gray-100 font-semibold">
            Quản lý khóa học
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm khóa học..."
              defaultValue={searchText} // ✅ Dùng defaultValue thay vì value
              onChange={handleSearch} // ✅ Dùng hàm handleSearch với debounce
              sx={{
                borderRadius: '12px',

                /* ===== ROOT INPUT ===== */
                '& .MuiOutlinedInput-root': {
                  color: '#111827',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',

                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6366f1',
                  },
                },

                /* ===== DARK MODE ===== */
                '.dark & .MuiOutlinedInput-root': {
                  backgroundColor: '#1f2937',
                  color: '#f3f4f6',

                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4b5563',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#a78bfa',
                  },
                },

                /* ===== INPUT TEXT ===== */
                '& .MuiOutlinedInput-input': {
                  color: '#111827',
                },
                '.dark & .MuiOutlinedInput-input': {
                  color: '#f9fafb',
                },

                /* ===== ICON ===== */
                '& .MuiSvgIcon-root': {
                  color: '#6b7280',
                },
                '.dark & .MuiSvgIcon-root': {
                  color: '#d1d5db',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={18} className="text-gray-400 dark:text-gray-300" />
                  </InputAdornment>
                ),
                inputProps: {
                  className: 'placeholder:text-gray-500 dark:placeholder:text-gray-300',
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={includeDeleted}
                  onChange={(e) => {
                    setIncludeDeleted(e.target.checked);
                    setPage(1);
                  }}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#8b5cf6',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 92, 246, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#8b5cf6',
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#4b5563' : '#a4a8adff'),
                    },
                    '& .MuiSwitch-switchBase': {
                      color: (theme) => (theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280'),
                    },
                  }}
                />
              }
              label={
                <Typography
                  className={`${includeDeleted ? 'text-violet-600 dark:text-violet-400 font-medium' : 'text-gray-700 dark:text-gray-300'}`}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: includeDeleted ? 600 : 400,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {includeDeleted ? 'Đang hiện khóa đã xóa' : 'Chỉ hiển thị đã xóa'}
                </Typography>
              }
              sx={{
                margin: 0,
                '&:hover': {
                  '& .MuiTypography-root': {
                    color: (theme) => (theme.palette.mode === 'dark' ? '#c4b5fd' : '#7c3aed'),
                  },
                },
              }}
            />
            {selectedRowKeys.length > 0 && (
              <>
                <Chip label={`Đã chọn ${selectedRowKeys.length} khóa học`} color="primary" size="small" />
                {hasSelectedDeleted ? (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<IconTrashX size={20} />}
                    onClick={() => handleDeleteDialogOpen(undefined, 'hard')}
                    disabled={loading}
                    sx={{
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 },
                    }}
                  >
                    Xóa vĩnh viễn
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<IconTrash size={20} />}
                    onClick={() => handleDeleteDialogOpen(undefined, 'soft')}
                    disabled={loading}
                    sx={{
                      borderWidth: 2,
                      '&:hover': { borderWidth: 2 },
                    }}
                  >
                    Xóa
                  </Button>
                )}
              </>
            )}
            <Button
              variant="contained"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300"
              startIcon={<IconPlus size={20} />}
              onClick={() => refCourseForm.current.show(null)}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              Tạo khóa học mới
            </Button>
          </Box>
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalCourses}
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

        <Paper className="dark:bg-gray-800 shadow-lg" sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
                      indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < courses.length}
                      checked={courses.length > 0 && selectedRowKeys.length === courses.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Ảnh</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Tên khóa học</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">
                    <TableSortLabel
                      active={sortField === 'course_price'}
                      direction={sortField === 'course_price' ? sortOrder : 'asc'}
                      onClick={() => handleSort('course_price')}
                      IconComponent={sortField === 'course_price' ? undefined : IconSelector} // 👈 thêm dòng này
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: (theme) => (theme.palette.mode === 'dark' ? '#e5e7eb' : '#4b5563'),
                          opacity: sortField === 'course_price' ? 1 : 0.5,
                        },
                        '&:hover .MuiTableSortLabel-icon': {
                          color: (theme) => (theme.palette.mode === 'dark' ? '#c084fc' : '#7c3aed'),
                          opacity: 1,
                        },
                      }}
                    >
                      Giá
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center" className="font-semibold dark:text-gray-900">
                    Trạng thái
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Bài học</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Thời lượng</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">
                    <TableSortLabel
                      active={sortField === 'total_course_user'}
                      direction={sortField === 'total_course_user' ? sortOrder : 'asc'}
                      onClick={() => handleSort('total_course_user')}
                      IconComponent={sortField === 'total_course_user' ? undefined : IconSelector}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: (theme) => (theme.palette.mode === 'dark' ? '#e5e7eb' : '#4b5563'),
                          opacity: sortField === 'total_course_user' ? 1 : 0.5,
                        },
                        '&:hover .MuiTableSortLabel-icon': {
                          color: (theme) => (theme.palette.mode === 'dark' ? '#c084fc' : '#7c3aed'),
                          opacity: 1,
                        },
                      }}
                    >
                      Học viên
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Đánh giá</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Lượt xem</TableCell>
                  <TableCell align="center" className="font-semibold dark:text-gray-900">
                    Hiển thị
                  </TableCell>
                  <TableCell align="center" className="font-semibold dark:text-gray-900">
                    Cập nhật
                  </TableCell>
                  <TableCell align="center" className="font-semibold dark:text-gray-900">
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center" sx={{ py: 10 }}>
                      <Typography>Đang tải...</Typography>
                    </TableCell>
                  </TableRow>
                ) : courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13} align="center" sx={{ py: 10 }}>
                      <IconBook size={48} className="text-gray-400 mx-auto mb-2" />
                      <Typography className="text-gray-500">{searchText ? 'Không tìm thấy khóa học nào phù hợp' : 'Không có khóa học nào'}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((row) => {
                    const isItemSelected = isSelected(row.course_id);
                    return (
                      <TableRow key={row.course_id} hover onClick={() => handleClick(row.course_id)} role="checkbox" aria-checked={isItemSelected} selected={isItemSelected} className="dark:hover:bg-gray-700">
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
                          <Avatar src={row.thumbnail ? (row.thumbnail.includes('http') ? row.thumbnail : `/api/admin/courses/file/${row.thumbnail}`) : ''} variant="rounded" sx={{ width: 50, height: 50 }}>
                            <IconBook size={24} />
                          </Avatar>
                        </TableCell>
                        <TableCell className="dark:text-gray-200 font-medium">
                          <Box>
                            <Typography
                              variant="subtitle1"
                              fontWeight="600"
                              color="primary.main"
                              sx={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'inline-block',
                                '&:hover': {
                                  color: 'primary.dark',
                                  textDecoration: 'underline',
                                  transform: 'scale(1.02)',
                                },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCourseDetail(row);
                              }}
                            >
                              {row.course_name}
                            </Typography>

                            {row.del_flg && <Chip label="Đã xóa" size="small" color="error" sx={{ ml: 1 }} />}
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{
                              maxWidth: 350,
                              display: 'block',
                              fontSize: '0.85rem',
                            }}
                            className="dark:text-gray-300"
                          >
                            {row.course_description}
                          </Typography>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.course_price)}
                            </Typography>
                            <Typography variant="caption" sx={{ textDecoration: 'line-through' }}>
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.course_original_price)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={getStateLabel(row.state)} color={getStateColor(row.state)} size="small" />
                        </TableCell>
                        <TableCell className="dark:text-gray-200">{row.total_lessons || 0}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.total_duration || 0} phút</TableCell>
                        <TableCell className="dark:text-gray-200">
                          <Typography
                            fontWeight="500"
                            color="primary.main"
                            sx={{
                              cursor: 'pointer',
                              transition: 'color 0.2s',
                              '&:hover': {
                                color: 'primary.dark',
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenStudents(row);
                            }}
                          >
                            {row.total_course_user || 0}
                          </Typography>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                color: 'primary.light',
                                transform: 'scale(1.03)',
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenReviews(row);
                            }}
                          >
                            <IconStar size={16} className="text-yellow-500" fill="currentColor" />
                            <Typography align="center" variant="body2" fontWeight="500" sx={{ color: 'text.primary' }} className="dark:text-gray-100 ">
                              {row.avg_rating?.toFixed(1) || '0.0'}
                            </Typography>

                            <Typography variant="caption" color="text.secondary" className="dark:text-gray-400">
                              ({row.total_reviews || 0})
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell className="dark:text-gray-200">{row.view_count || 0} </TableCell>

                        <TableCell align="center">
                          <Chip label={row.del_flg ? 'Đã ẩn' : 'Hiển thị'} color={row.del_flg ? 'error' : 'success'} size="small" />
                        </TableCell>
                        <TableCell align="center" className="dark:text-gray-200">
                          <Typography variant="body2">{formatDateTime(row.updated_at)}</Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            {!row.del_flg && (
                              <>
                                <Tooltip title="Chỉnh sửa khóa học">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      refCourseForm.current.show(row);
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                  >
                                    <IconEdit size={20} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Học viên khóa học">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/admin/manage/${row.course_id}/students`);
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                  >
                                    <IconUsers size={20} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {row.del_flg ? (
                              <>
                                <Tooltip title="Khôi phục khóa học">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRestore(row.course_id);
                                    }}
                                    className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                  >
                                    <IconRestore size={20} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa vĩnh viễn">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteDialogOpen(row.course_id, 'hard');
                                    }}
                                    className="text-red-900 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
                                  >
                                    <IconTrashX size={20} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <Tooltip title="Xóa khóa học">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteDialogOpen(row.course_id, 'soft');
                                  }}
                                  className="text-red-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-red-900"
                                >
                                  <IconTrash size={20} />
                                </IconButton>
                              </Tooltip>
                            )}
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
            count={totalCourses}
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

        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose} maxWidth="sm" fullWidth PaperProps={{ className: 'dark:bg-gray-800' }}>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <IconAlertCircle size={24} />
            {deleteType === 'soft' ? 'Xác nhận xóa' : 'Xác nhận xóa vĩnh viễn'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="dark:text-gray-300">
              {deleteType === 'soft' ? (
                deleteTargetId ? (
                  'Bạn có chắc chắn muốn xóa khóa học này? Bạn có thể khôi phục sau.'
                ) : (
                  `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} khóa học đã chọn? Bạn có thể khôi phục sau.`
                )
              ) : (
                <>
                  <Typography color="error" fontWeight="bold" gutterBottom>
                    ⚠️ CẢNH BÁO: HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!
                  </Typography>
                  {deleteTargetId ? 'Khóa học cùng tất cả chương và bài học sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.' : `${selectedRowKeys.length} khóa học cùng tất cả chương và bài học sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.`}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button onClick={handleDeleteDialogClose} color="inherit" variant="outlined" sx={{ borderWidth: 2 }}>
              Hủy
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={loading}>
              {deleteType === 'soft' ? 'Xóa' : 'Xóa vĩnh viễn'}
            </Button>
          </DialogActions>
        </Dialog>

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

        <CourseFormDialog ref={refCourseForm} saved={handleSaved} />
        <CourseDetailDialog open={openDetailDialog} course={selectedCourse} onClose={() => setOpenDetailDialog(false)} />
        <CourseStudentsDialog open={openStudentsDialog} course={selectedCourse} onClose={() => setOpenStudentsDialog(false)} />
        <CourseReviewsDialog open={openReviewsDialog} course={selectedCourse} onClose={() => setOpenReviewsDialog(false)} />
      </Box>
    </AdminLayout>
  );
}
