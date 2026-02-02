// src/pages/admin/lessons/lesson-form.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button, Box, Grid, Snackbar, Alert, InputAdornment, MenuItem, Select, FormControl, InputLabel, FormHelperText, FormControlLabel, Switch } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconDeviceFloppy, IconX, IconBook, IconVideo, IconFileText, Icon3dRotate, IconSortAscending, IconClock, IconCalendar, IconUser } from '@tabler/icons-react';
import { gql } from '@apollo/client';
import apolloClient from '@/utils/apollo';
import { useForm, Controller } from 'react-hook-form';

interface IFormInput {
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
}

interface LessonFormDialogProps {
  saved: () => void;
  section_id: string;
}

const LessonFormDialog = forwardRef(function LessonForm({ saved, section_id }: LessonFormDialogProps, ref) {
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
      lesson_title: '',
      lesson_type: 0,
      lesson_video: '',
      lesson_document: '',
      lesson_thumbnail: '',
      lesson_order: 0,
      minutes: 0,
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
            mutation ($payload: UpdateLessonInput!) {
              updateLesson(payload: $payload) {
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
          `,
          variables: {
            payload: {
              lesson_id: id,
              ...data,
              lesson_type: Number(data.lesson_type),
              lesson_order: Number(data.lesson_order),
              minutes: Number(data.minutes),
            },
          },
        });
      } else {
        res = await apolloClient.mutate({
          mutation: gql`
            mutation ($payload: CreateLessonInput!) {
              createLesson(payload: $payload) {
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
          `,
          variables: {
            payload: {
              ...data,
              lesson_type: Number(data.lesson_type),
              lesson_order: Number(data.lesson_order),
              minutes: Number(data.minutes),
              section_id,
            },
          },
        });
      }

      if (res && res.data && (res.data.createLesson || res.data.updateLesson)) {
        setSnackbar({
          open: true,
          message: id ? 'Cập nhật bài học thành công' : 'Tạo bài học thành công',
          severity: 'success',
        });
        saved();
        handleClose();
      } else {
        setSnackbar({
          open: true,
          message: 'Lưu bài học thất bại',
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
      setId(data.lesson_id);
      reset({
        lesson_title: data.lesson_title,
        lesson_type: data.lesson_type,
        lesson_video: data.lesson_video || '',
        lesson_document: data.lesson_document || '',
        lesson_thumbnail: data.lesson_thumbnail || '',
        lesson_order: data.lesson_order,
        minutes: data.minutes,
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
          {id ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
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
              {/* lesson_title */}
              <Grid item xs={12}>
                <Controller
                  name="lesson_title"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập tiêu đề bài học',
                    minLength: {
                      value: 3,
                      message: 'Tiêu đề phải có ít nhất 3 ký tự',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tiêu đề bài học"
                      placeholder="Nhập tiêu đề bài học"
                      error={!!errors.lesson_title}
                      helperText={errors.lesson_title?.message}
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

              {/* lesson_type */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lesson_type"
                  control={control}
                  rules={{ required: 'Vui lòng chọn loại bài học' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.lesson_type}>
                      <InputLabel>Loại bài học</InputLabel>
                      <Select {...field} label="Loại bài học" className="dark:text-gray-200">
                        <MenuItem value={0}>Video</MenuItem>
                        <MenuItem value={1}>Document</MenuItem>
                        <MenuItem value={2}>Quiz</MenuItem>
                      </Select>
                      {errors.lesson_type && <FormHelperText>{errors.lesson_type.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* lesson_order */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lesson_order"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập thứ tự',
                    min: { value: 0, message: 'Thứ tự phải >= 0' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Thứ tự"
                      placeholder="Nhập thứ tự"
                      error={!!errors.lesson_order}
                      helperText={errors.lesson_order?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconSortAscending size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* minutes */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="minutes"
                  control={control}
                  rules={{
                    required: 'Vui lòng nhập số phút',
                    min: { value: 1, message: 'Số phút phải > 0' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      label="Số phút"
                      placeholder="Nhập số phút"
                      error={!!errors.minutes}
                      helperText={errors.minutes?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconClock size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* lesson_video */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lesson_video"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Video URL"
                      placeholder="Nhập URL video"
                      error={!!errors.lesson_video}
                      helperText={errors.lesson_video?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconVideo size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* lesson_document */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lesson_document"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tài liệu URL"
                      placeholder="Nhập URL tài liệu"
                      error={!!errors.lesson_document}
                      helperText={errors.lesson_document?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconFileText size={20} className="text-gray-500 dark:text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                      className="dark:text-gray-200"
                    />
                  )}
                />
              </Grid>

              {/* lesson_thumbnail */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lesson_thumbnail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Thumbnail URL"
                      placeholder="Nhập URL thumbnail"
                      error={!!errors.lesson_thumbnail}
                      helperText={errors.lesson_thumbnail?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon3dRotate size={20} className="text-gray-500 dark:text-gray-400" />
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

export default LessonFormDialog;
