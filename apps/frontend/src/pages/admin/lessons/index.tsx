// src/pages/admin/lessons/index.tsx
import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, Snackbar, Alert, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import LessonFormDialog from './lesson-form';
import apolloClient from '@/utils/apollo';
import { gql } from '@apollo/client';
import { useSearchParams, useParams } from 'react-router-dom';
import { IconEdit, IconPlus, IconTrash, IconBook, IconAlertCircle } from '@tabler/icons-react';

interface LessonType {
  lesson_id: string;
  lesson_title: string;
  lesson_type: number;
  lesson_video?: string;
  lesson_document?: string;
  lesson_thumbnail?: string;
  lesson_order: number;
  minutes: number;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  del_flg: boolean;
  section_id: string;
}

export default function LessonManagementPage() {
  const { section_id } = useParams<{ section_id: string }>();
  const [params] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalLessons, setTotalLessons] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const refLessonForm = useRef<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = lessons.map((n) => n.lesson_id);
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
    if (page > 0 && section_id) {
      setTimeout(async () => {
        await loadData();
      }, 0);
    }
  }, [page, rowsPerPage, section_id]);

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
            removeLesson(ids: $ids)
          }
        `,
        variables: { ids },
      });

      if (res && res.data && res.data.removeLesson) {
        setSnackbar({ open: true, message: 'Xóa bài học thành công', severity: 'success' });
        setSelectedRowKeys([]);
        await loadData();
      } else {
        setSnackbar({ open: true, message: 'Xóa bài học thất bại', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Đã xảy ra lỗi', severity: 'error' });
    }
    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await apolloClient.query({
        query: gql`
          query ($sectionId: String!) {
            section(sectionId: $sectionId) {
              lessons {
                lesson_id
                lesson_title
                lesson_type
                lesson_video
                lesson_document
                lesson_thumbnail
                lesson_order
                minutes
                created_at
                updated_at
                created_by
                updated_by
                del_flg
              }
            }
          }
        `,
        variables: { sectionId: section_id },
        fetchPolicy: 'no-cache',
      });

      if (response.data && response.data.section && response.data.section.lessons) {
        setLessons(response.data.section.lessons);
        setTotalLessons(response.data.section.lessons.length);
      } else {
        setLessons([]);
        setTotalLessons(0);
      }
    } catch (error: any) {
      console.log(error.message);
      setSnackbar({ open: true, message: 'Không thể tải dữ liệu', severity: 'error' });
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

  const getTypeLabel = (type: number) => {
    switch (type) {
      case 0:
        return 'Video';
      case 1:
        return 'Document';
      case 2:
        return 'Quiz';
      default:
        return 'Unknown';
    }
  };

  const getTypeColor = (type: number) => {
    switch (type) {
      case 0:
        return 'primary';
      case 1:
        return 'secondary';
      case 2:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" className="text-gray-800 dark:text-gray-100 font-semibold">
            Quản lý bài học cho chương {section_id}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            {selectedRowKeys.length > 0 && (
              <>
                <Chip label={`Đã chọn ${selectedRowKeys.length} bài học`} color="primary" size="small" />
                <Button variant="outlined" color="error" startIcon={<IconTrash size={20} />} onClick={() => handleDeleteDialogOpen()} disabled={loading}>
                  Xóa
                </Button>
              </>
            )}
            <Button variant="contained" className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300" startIcon={<IconPlus size={20} />} onClick={() => refLessonForm.current.show(null)}>
              Tạo bài học mới
            </Button>
          </Box>
        </Box>

        {/* Table */}
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
                      indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < lessons.length}
                      checked={lessons.length > 0 && selectedRowKeys.length === lessons.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Tiêu đề bài học</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Loại</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Video</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Tài liệu</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Thumbnail</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Thứ tự</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Phút</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Tạo lúc</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Cập nhật lúc</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Tạo bởi</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Cập nhật bởi</TableCell>
                  <TableCell className="font-semibold dark:text-gray-200">Ẩn/Hiện</TableCell>
                  <TableCell align="center" className="font-semibold dark:text-gray-200">
                    Thao tác
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={14} align="center" sx={{ py: 10 }}>
                      <Typography>Đang tải...</Typography>
                    </TableCell>
                  </TableRow>
                ) : lessons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={14} align="center" sx={{ py: 10 }}>
                      <IconBook size={48} className="text-gray-400 mx-auto mb-2" />
                      <Typography className="text-gray-500">Không có bài học nào</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  lessons.map((row) => {
                    const isItemSelected = isSelected(row.lesson_id);
                    return (
                      <TableRow key={row.lesson_id} hover onClick={() => handleClick(row.lesson_id)} role="checkbox" aria-checked={isItemSelected} selected={isItemSelected} sx={{ cursor: 'pointer' }} className="dark:hover:bg-gray-700">
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
                        <TableCell className="dark:text-gray-200 font-medium">{row.lesson_title}</TableCell>
                        <TableCell>
                          <Chip label={getTypeLabel(row.lesson_type)} color={getTypeColor(row.lesson_type)} size="small" />
                        </TableCell>
                        <TableCell className="dark:text-gray-200">{row.lesson_video || 'N/A'}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.lesson_document || 'N/A'}</TableCell>
                        <TableCell>{row.lesson_thumbnail ? <img src={row.lesson_thumbnail} alt="thumbnail" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : 'N/A'}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.lesson_order}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.minutes}</TableCell>
                        <TableCell className="dark:text-gray-200">{new Date(row.created_at).toLocaleString()}</TableCell>
                        <TableCell className="dark:text-gray-200">{new Date(row.updated_at).toLocaleString()}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.created_by || 'N/A'}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.updated_by || 'N/A'}</TableCell>
                        <TableCell className="dark:text-gray-200">{row.del_flg ? 'Có' : 'Không'}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                refLessonForm.current.show(row);
                              }}
                              className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                              <IconEdit size={20} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDialogOpen(row.lesson_id);
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
            count={totalLessons}
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
            <DialogContentText className="dark:text-gray-300">{deleteTargetId ? 'Bạn có chắc chắn muốn xóa bài học này?' : `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} bài học đã chọn?`}</DialogContentText>
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
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>

        <LessonFormDialog ref={refLessonForm} saved={handleSaved} section_id={section_id!} />
      </Box>
    </AdminLayout>
  );
}
