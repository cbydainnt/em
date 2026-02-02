// src/pages/admin/sections/section-form.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button, Box, Grid, Snackbar, Alert, InputAdornment, FormControlLabel, Switch } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconDeviceFloppy, IconX, IconBook, IconCalendar, IconUser } from '@tabler/icons-react';
import { gql } from '@apollo/client';
import apolloClient from '@/utils/apollo';
import { useForm, Controller } from 'react-hook-form';

interface IFormInput {
  section_title: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  del_flg: boolean;
}

interface SectionFormDialogProps {
  saved: () => void;
  course_id: string;
}

const SectionFormDialog = forwardRef(function SectionForm({ saved, course_id }: SectionFormDialogProps, ref) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      section_title: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: '',
      updated_by: '',
      del_flg: false,
    },
  });

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
    reset();
  };

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      let res: any = null;

      if (id) {
        res = await apolloClient.mutate({
          mutation: gql`
            mutation ($payload: UpdateSectionInput!) {
              updateSection(payload: $payload) {
                section_id
                section_title
                created_at
                updated_at
                created_by
                updated_by
                del_flg
              }
            }
          `,
          variables: {
            payload: {
              section_id: id,
              ...data,
            },
          },
        });
      } else {
        res = await apolloClient.mutate({
          mutation: gql`
            mutation ($payload: CreateSectionInput!) {
              createSection(payload: $payload) {
                section_id
                section_title
                created_at
                updated_at
                created_by
                updated_by
                del_flg
              }
            }
          `,
          variables: {
            payload: {
              ...data,
              course_id,
            },
          },
        });
      }

      if (res && res.data && (res.data.createSection || res.data.updateSection)) {
        setSnackbar({
          open: true,
          message: id ? 'Cập nhật chương thành công' : 'Tạo chương thành công',
          severity: 'success',
        });
        saved();
        handleClose();
      } else {
        setSnackbar({
          open: true,
          message: 'Lưu chương thất bại',
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

  const show = (data: any) => {
    if (data) {
      setId(data.section_id);
      reset({
        section_title: data.section_title,
        created_at: data.created_at,
        updated_at: data.updated_at,
        created_by: data.created_by || '',
        updated_by: data.updated_by || '',
        del_flg: data.del_flg,
      });
    } else {
      reset();
    }
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

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
          },
          className: 'dark:bg-gray-800',
        }}
      >
        <DialogTitle
          className="text-purple-600 dark:text-purple-400 font-semibold"
          sx={{
            background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
            borderBottom: '1px solid #e9d5ff',
          }}
        >
          {id ? 'Chỉnh sửa chương' : 'Tạo chương mới'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
            }}
            size="small"
          >
            <IconX height={18} width={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers className="dark:bg-gray-800" sx={{ pt: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* section_title */}
              <Grid item xs={12}>
                <Controller
                  name="section_title"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập tiêu đề chương',
                    minLength: {
                      value: 3,
                      message: 'Tiêu đề phải có ít nhất 3 ký tự',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tiêu đề chương"
                      placeholder="Nhập tiêu đề chương"
                      error={!!errors.section_title}
                      helperText={errors.section_title?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconBook size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* created_at */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="created_at"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tạo lúc"
                      placeholder="Nhập thời gian tạo"
                      error={!!errors.created_at}
                      helperText={errors.created_at?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconCalendar size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* updated_at */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="updated_at"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Cập nhật lúc"
                      placeholder="Nhập thời gian cập nhật"
                      error={!!errors.updated_at}
                      helperText={errors.updated_at?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconCalendar size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* created_by */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="created_by"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tạo bởi"
                      placeholder="Nhập ID người tạo"
                      error={!!errors.created_by}
                      helperText={errors.created_by?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconUser size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* updated_by */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="updated_by"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Cập nhật bởi"
                      placeholder="Nhập ID người cập nhật"
                      error={!!errors.updated_by}
                      helperText={errors.updated_by?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconUser size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* del_flg */}
              <Grid item xs={12}>
                <Controller name="del_flg" control={control} render={({ field }) => <FormControlLabel control={<Switch checked={field.value} {...field} />} label="Del flg" />} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions
          className="dark:bg-gray-900"
          sx={{
            p: 2,
            gap: 1,
            borderTop: '1px solid #e9d5ff',
            background: '#faf5ff',
          }}
        >
          <Button onClick={handleClose} variant="outlined" color="secondary" disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained" className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300" startIcon={<IconDeviceFloppy size={18} />} disabled={loading}>
            {loading ? 'Đang lưu...' : id ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
});

export default SectionFormDialog;
