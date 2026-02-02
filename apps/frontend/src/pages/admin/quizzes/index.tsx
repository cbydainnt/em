import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, Switch, FormControlLabel, CircularProgress, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import QuizFormDialog from './quiz-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { IconEdit, IconPlus, IconTrash, IconAlertCircle, IconSearch, IconRestore, IconHelpOctagonFilled, IconTrashX, IconFileDownload, IconBook } from '@tabler/icons-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { QuizVersionsDialog, QuizVersionBadge } from '@/pages/admin/quizzes/quiz-version';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface QuizType {
  quiz_id: string;
  title: string;
  quiz_type: number;
  question_count: number;
  total_points: number;
  passing_score: number;
  duration_minutes?: number;
  difficulty_level: number;
  status: number;
  created_at: string;
  updated_at: string;
  del_flg: boolean;
  lesson?: { lesson_id: string; lesson_title: string };
  course?: { course_id: string; course_name: string };
  has_audio: boolean;
  show_explanation: boolean;
}

const QUIZ_TYPES = {
  1: { label: 'Bài kiểm tra', color: 'primary' },
  2: { label: 'Bài thi khóa học', color: 'secondary' },
  3: { label: 'Thi cuối kỳ', color: 'error' },
  4: { label: 'IELTS', color: 'success' },
  5: { label: 'TOEIC', color: 'info' },
};

const STATUS = {
  1: { label: 'Hoạt động', color: 'success' },
  2: { label: 'Nháp', color: 'warning' },
  3: { label: 'Lưu trữ', color: 'default' },
};

const DIFFICULTY_LEVELS = {
  1: { label: 'Rất dễ', color: 'success' },
  2: { label: 'Dễ', color: 'info' },
  3: { label: 'Trung bình', color: 'warning' },
  4: { label: 'Khó', color: 'error' },
  5: { label: 'Rất khó', color: 'error' },
};

export default function QuizManagementPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchText, setSearchText] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [downloadingTemplate, setDownloadingTemplate] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const refQuizForm = useRef<any>(null);
  const [versionsDialogOpen, setVersionsDialogOpen] = useState(false);
  const [selectedQuizForVersions, setSelectedQuizForVersions] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch {
      return dateString;
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = quizzes.map((n) => n.quiz_id);
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
  }, [page, rowsPerPage, searchText, includeDeleted]);

  const handleDeleteDialogOpen = (id?: string, type: 'soft' | 'hard' = 'soft') => {
    if (id) {
      setDeleteTargetId(id);
      const quiz = quizzes.find((q) => q.quiz_id === id);
      if (quiz?.del_flg) {
        setDeleteType('hard');
      } else {
        setDeleteType(type);
      }
    } else {
      const allDeleted = selectedRowKeys.every((id) => quizzes.find((q) => q.quiz_id === id)?.del_flg);
      setDeleteType(allDeleted ? 'hard' : type);
    }
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    if (deleteTargetId) {
      await deleteItems([deleteTargetId], deleteType);
    } else {
      await deleteItems(selectedRowKeys, deleteType);
    }
    setDeleting(false);
    handleDeleteDialogClose();
  };

  const deleteItems = async (ids: string[], type: 'soft' | 'hard') => {
    try {
      if (ids.length === 1) {
        await axios.delete(`/api/admin/quizzes/${ids[0]}/${type}`);
        setSnackbar({
          open: true,
          message: type === 'soft' ? 'Xóa quiz thành công' : 'Xóa vĩnh viễn quiz thành công',
          severity: 'success',
        });
      } else {
        const endpoint = type === 'soft' ? 'bulk-soft-delete' : 'bulk-hard-delete';
        await axios.post(`/api/admin/quizzes/${endpoint}`, { ids });
        setSnackbar({
          open: true,
          message: type === 'soft' ? `Xóa ${ids.length} quiz thành công` : `Xóa vĩnh viễn ${ids.length} quiz thành công`,
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
  };

  const handleRestore = async (id: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/quizzes/${id}/restore`);
      setSnackbar({
        open: true,
        message: 'Khôi phục quiz thành công',
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

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/admin/quizzes`, {
        params: {
          page,
          pageSize: rowsPerPage,
          search: searchText || undefined,
          includeDeleted,
        },
      });

      if (response.data) {
        setQuizzes(response.data.data);
        setTotalQuizzes(response.data.total);
      }
    } catch (error: any) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Không thể tải dữ liệu',
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const handleDownloadTemplate = async () => {
    setDownloadingTemplate(true);
    try {
      const response = await axios.get('/api/admin/quizzes/download-template', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'quiz_import_template.docx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSnackbar({
        open: true,
        message: 'Tải template thành công',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể tải template',
        severity: 'error',
      });
    } finally {
      setDownloadingTemplate(false);
    }
  };

  const hasSelectedDeleted = selectedRowKeys.some((id) => quizzes.find((q) => q.quiz_id === id)?.del_flg);

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" className="text-gray-800 dark:text-gray-100 font-semibold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Quản lý đề thi/bài kiểm tra
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm quiz..."
              value={searchText}
              onChange={handleSearch}
              className="dark:text-white"
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
                  onChange={(e) => setIncludeDeleted(e.target.checked)}
                  size="small"
                />
              }
              label={<Typography variant="body2">Chỉ hiển thị đã xóa</Typography>}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
            {selectedRowKeys.length > 0 && (
              <>
                <Chip label={`${selectedRowKeys.length} quiz`} color="primary" size="small" />
                {hasSelectedDeleted ? (
                  <Tooltip title="Xóa vĩnh viễn">
                    <Button size="small" variant="contained" color="error" onClick={() => handleDeleteDialogOpen(undefined, 'hard')} disabled={loading}>
                      <IconTrashX size={18} />
                      <Typography variant="body2" fontWeight="medium">
                        Xóa vĩnh viễn
                      </Typography>
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Xóa các quiz đã chọn">
                    <IconButton size="small" color="warning" onClick={() => handleDeleteDialogOpen(undefined, 'soft')} disabled={loading}>
                      <IconTrash size={20} />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
            <Button variant="contained" size="small" color="info" className="bg-gradient-to-r from-yellow-500 to-green-600 rounded-md gap-2 hover:from-yellow-400" onClick={handleDownloadTemplate} disabled={downloadingTemplate} startIcon={downloadingTemplate ? <CircularProgress size={16} /> : <IconFileDownload size={20} />}>
              {downloadingTemplate ? 'Đang tải...' : 'Tải template'}
            </Button>
            <Button variant="contained" size="small" color="primary" className="bg-gradient-to-r from-green-600 rounded-md gap-2 hover:from-green-500" onClick={() => navigate('/admin/manage/quizzes/questions')}>
              <Tooltip title="Ngân hàng câu hỏi">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconHelpOctagonFilled size={20} />
                  <span className="hidden sm:inline">Ngân hàng câu hỏi</span>
                </Box>
              </Tooltip>
            </Button>
            <Button variant="contained" className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-300" startIcon={<IconPlus size={20} />} onClick={() => refQuizForm.current.show(null)} size="small" sx={{ minWidth: { xs: 'auto', sm: 'auto' } }}>
              <span className="hidden sm:inline">Tạo quiz</span>
              <span className="sm:hidden">Tạo</span>
            </Button>
          </Box>
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalQuizzes}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
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

        <Paper className="dark:bg-gray-800 shadow-lg" sx={{ overflowX: 'auto' }}>
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
                      indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < quizzes.length}
                      checked={quizzes.length > 0 && selectedRowKeys.length === quizzes.length}
                      onChange={handleSelectAllClick}
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Tiêu đề</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    Loại
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900">Số câu</TableCell>
                  <TableCell className="font-semibold dark:text-gray-900" sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                    Độ khó
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    Trạng thái
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    Versions
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-900" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
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
                    <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                      <Typography>Đang tải...</Typography>
                    </TableCell>
                  </TableRow>
                ) : quizzes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                      <IconBook size={48} className="text-gray-400 mx-auto mb-2" />
                      <Typography className="text-gray-500">Không có quiz nào</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  quizzes.map((row) => {
                    const isItemSelected = isSelected(row.quiz_id);
                    return (
                      <TableRow key={row.quiz_id} hover onClick={() => handleClick(row.quiz_id)} role="checkbox" aria-checked={isItemSelected} selected={isItemSelected} sx={{ cursor: 'pointer' }} className="dark:hover:bg-gray-700">
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
                            size="small"
                          />
                        </TableCell>
                        <TableCell className="dark:text-gray-200 font-medium">
                          <Box>
                            <Typography variant="body2" fontWeight="medium" sx={{ wordBreak: 'break-word' }}>
                              {row.title}
                            </Typography>
                            {row.del_flg && <Chip label="Đã xóa" size="small" color="error" sx={{ mt: 0.5 }} />}
                            {row.lesson && (
                              <Typography variant="caption" display="block" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                Bài học: {row.lesson.lesson_title}
                              </Typography>
                            )}
                            {row.course && (
                              <Typography variant="caption" display="block" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                Khóa học: {row.course.course_name}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                          <Chip label={QUIZ_TYPES[row.quiz_type as keyof typeof QUIZ_TYPES]?.label || 'N/A'} color={(QUIZ_TYPES[row.quiz_type as keyof typeof QUIZ_TYPES]?.color as any) || 'default'} size="small" />
                        </TableCell>
                        <TableCell className="dark:text-gray-200">
                          <Typography variant="body2">{row.question_count} câu</Typography>
                          <Typography className="dark:text-gray-400" variant="caption" color="text.secondary">
                            {row.total_points} điểm
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                          <Chip label={DIFFICULTY_LEVELS[row.difficulty_level as keyof typeof DIFFICULTY_LEVELS]?.label || 'N/A'} color={(DIFFICULTY_LEVELS[row.difficulty_level as keyof typeof DIFFICULTY_LEVELS]?.color as any) || 'default'} size="small" />
                        </TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                          <Chip label={STATUS[row.status as keyof typeof STATUS]?.label || 'N/A'} color={(STATUS[row.status as keyof typeof STATUS]?.color as any) || 'default'} size="small" />
                        </TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                          {!row.del_flg && (
                            <QuizVersionBadge
                              quiz={row}
                              onClick={() => {
                                setSelectedQuizForVersions(row.quiz_id);
                                setVersionsDialogOpen(true);
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }} className="dark:text-gray-200">
                          {formatDateTime(row.updated_at)}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {!row.del_flg ? (
                              <>
                                <Tooltip title="Chỉnh sửa">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      refQuizForm.current.show(row);
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                  >
                                    <IconEdit size={18} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteDialogOpen(row.quiz_id, 'soft');
                                    }}
                                    className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                  >
                                    <IconTrash size={18} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            ) : (
                              <>
                                <Tooltip title="Khôi phục">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRestore(row.quiz_id);
                                    }}
                                    className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                                  >
                                    <IconRestore size={18} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa vĩnh viễn">
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteDialogOpen(row.quiz_id, 'hard');
                                    }}
                                    className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                  >
                                    <IconTrashX size={18} />
                                  </IconButton>
                                </Tooltip>
                              </>
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
            count={totalQuizzes}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
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
                  'Bạn có chắc chắn muốn xóa quiz này? Bạn có thể khôi phục sau.'
                ) : (
                  `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} quiz đã chọn? Bạn có thể khôi phục sau.`
                )
              ) : (
                <>
                  <Typography color="error" fontWeight="bold" gutterBottom>
                    ⚠️ CẢNH BÁO: HÀNH ĐỘNG NÀY KHÔNG THỂ HOÀN TÁC!
                  </Typography>
                  {deleteTargetId ? 'Quiz sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.' : `${selectedRowKeys.length} quiz sẽ bị xóa vĩnh viễn khỏi hệ thống và KHÔNG THỂ khôi phục.`}
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button onClick={handleDeleteDialogClose} color="inherit" size="small">
              Hủy
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={deleting} size="small" startIcon={deleting ? <CircularProgress size={16} /> : undefined}>
              {deleting ? 'Đang xóa...' : deleteType === 'soft' ? 'Xóa' : 'Xóa vĩnh viễn'}
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

        <QuizFormDialog ref={refQuizForm} saved={handleSaved} />
      </Box>
      {versionsDialogOpen && selectedQuizForVersions && (
        <QuizVersionsDialog
          quiz_id={selectedQuizForVersions}
          onClose={() => {
            setVersionsDialogOpen(false);
            setSelectedQuizForVersions(null);
          }}
          onVersionSelect={(version) => {
            refQuizForm.current.show({ quiz_id: version.quiz_id });
            setVersionsDialogOpen(false);
          }}
          onRestoreVersion={() => {
            loadData();
          }}
        />
      )}
    </AdminLayout>
  );
}
