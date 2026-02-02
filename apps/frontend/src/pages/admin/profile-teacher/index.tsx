import { useEffect, useState } from 'react';
import { Box, Typography, Button, Tabs, Tab, Card, CardContent, Grid, TextField, IconButton, Stack, CardActions, useMediaQuery, useTheme, InputAdornment } from '@mui/material';
import AdminLayout from '../layout/AdminLayout';
import axios from 'axios';
import SkillFormDialog from './components/skill-form';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { IconEdit, IconMail, IconMapPin, IconPhone, IconPlus, IconTrash, IconUser, IconUserPin } from '@tabler/icons-react';
import { Snackbar, Alert } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface TeacherProfileForm {
  teacherName?: string;
  position?: string;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
  achievements?: string;

  // ===== SKILLS =====
  ielts?: string;
  toeic?: string;
  toeic_writing?: string;

  [key: `skill_${string}`]: string | undefined;
}

export default function AdminTeacherProfile() {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [form, setForm] = useState<TeacherProfileForm>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    teacherName?: string;
    email?: string;
    phone?: string;
    bio?: string;
    achievements?: string;
  }>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSkillKey, setDeletingSkillKey] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  const DEFAULT_SKILLS = {
    ielts: 'IELTS',
    toeic: 'TOEIC',
    toeic_writing: 'TOEIC Writing',
  };

  const skills = Object.entries(form)
    .filter(([key, value]) => {
      if (!value) return false;
      return key in DEFAULT_SKILLS || key.startsWith('skill_');
    })
    .map(([key, value]) => ({
      key,
      label: DEFAULT_SKILLS[key as keyof typeof DEFAULT_SKILLS] ?? key.replace('skill_', '').replace(/_/g, ' ').toUpperCase(),
      value,
    }));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/teacher-profile');
      console.log('Profile data', res.data);
      setForm(res.data || {});
    } catch (err) {
      console.error('Load profile failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof TeacherProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const normalizeText = (text?: string) => {
    if (!text) return text;

    return text
      .split('\n')
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .filter((line) => line !== '')
      .join('\n');
  };

  const validateForm = () => {
    const newErrors: { teacherName?: string; email?: string; phone?: string } = {};

    if (!form.teacherName || form.teacherName.trim() === '') {
      newErrors.teacherName = 'Vui lòng nhập họ và tên';
    }

    if (!form.email || form.email.trim() === '') {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!form.phone || form.phone.trim() === '') {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(form.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      const payload = {
        ...form,
        bio: normalizeText(form.bio),
        achievements: normalizeText(form.achievements),
      };
      await axios.put('/api/admin/teacher-profile', payload);
      await fetchProfile();
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Save failed', err);
      alert('Lưu thất bại');
    }
  };

  const handleDeleteSkill = (key: string) => {
    setDeletingSkillKey(key);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSkill = async () => {
    if (!deletingSkillKey) return;

    try {
      await axios.delete(`/api/admin/teacher-profile/skill/${deletingSkillKey}`);
      await fetchProfile();
    } catch (err) {
      console.error('Delete skill failed', err);
      alert('Xoá kỹ năng thất bại');
    } finally {
      setDeleteDialogOpen(false);
      setDeletingSkillKey(null);
    }
  };

  return (
    <AdminLayout>
      <Box p={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant={isMobile ? 'h5' : 'h4'} className="text-gray-800 dark:text-gray-100 font-semibold">
              Quản lý thông tin giảng viên
            </Typography>
          </Box>
        </Stack>

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab
            sx={{
              color: '#1b1d20',
              '.dark &': {
                color: '#e5e7eb',
              },
              '&.Mui-selected': {
                color: '#60a5fa',
              },
            }}
            label="Thông tin cá nhân"
          />
          <Tab
            sx={{
              color: '#1b1d20',
              '.dark &': {
                color: '#e5e7eb',
              },
              '&.Mui-selected': {
                color: '#60a5fa',
              },
            }}
            label="Kỹ năng"
          />
        </Tabs>

        {/* Thông tin cá nhân */}
        {tab === 0 && (
          <Card>
            <CardContent
              sx={{
                bgcolor: '#ffffff',
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <Typography variant="h6" mb={2} className="text-gray-800 dark:text-gray-100 font-semibold">
                Thông Tin Cá Nhân
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    value={form.teacherName || ''}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, teacherName: e.target.value }));
                      setErrors((prev) => ({ ...prev, teacherName: undefined }));
                    }}
                    error={!!errors.teacherName}
                    helperText={errors.teacherName}
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Vị trí / Chức danh"
                    value={form.position || ''}
                    onChange={handleChange('position')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconUserPin size={20} className="dark:text-gray-400" />
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email || ''}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, email: e.target.value }));
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    error={!!errors.email}
                    helperText={errors.email}
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={form.phone || ''}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, phone: e.target.value }));
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    error={!!errors.phone}
                    helperText={errors.phone}
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    value={form.address || ''}
                    onChange={handleChange('address')}
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Giới thiệu bản thân"
                    value={form.bio || ''}
                    onChange={handleChange('bio')}
                    error={!!errors.bio}
                    helperText={errors.bio}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Thành tựu nổi bật"
                    value={form.achievements || ''}
                    onChange={handleChange('achievements')}
                    error={!!errors.achievements}
                    helperText={errors.achievements}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 20 }} />
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
                </Grid>
              </Grid>
              <CardActions sx={{ pb: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={loading}
                  sx={{
                    transition: 'transform 0.1s ease',
                    '&:active': {
                      transform: 'scale(0.97)',
                    },
                  }}
                >
                  Lưu thay đổi
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        )}

        {/* Kỹ năng */}
        {tab === 1 && (
          <Card>
            <CardContent
              sx={{
                bgcolor: '#ffffff',
                '.dark &': {
                  bgcolor: '#1f2937',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h6" mb={2} className="text-gray-800 dark:text-gray-100 font-semibold">
                  Kỹ Năng & Chứng Chỉ
                </Typography>
                <Button
                  variant="contained"
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300"
                  startIcon={<IconPlus size={20} />}
                  onClick={() => {
                    setEditingSkill(null);
                    setSkillDialogOpen(true);
                  }}
                >
                  Thêm kỹ năng
                </Button>
              </Box>

              <Grid container spacing={2}>
                {skills.map((skill) => (
                  <Grid item xs={12} md={6} key={skill.key}>
                    <Box border={1} borderColor="divider" borderRadius={2} p={2} display="flex" justifyContent="space-between" alignItems="center">
                      <Box
                        sx={{
                          backgroundColor: '#fff',
                          color: '#111827',
                          '.dark &': {
                            backgroundColor: '#1f2937',
                            color: '#f3f4f6',
                          },
                        }}
                      >
                        <Typography fontWeight={500} className="dark:text-gray-200">
                          {skill.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="dark:text-gray-200">
                          {skill.value}
                        </Typography>
                      </Box>

                      <Stack direction="row">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditingSkill(skill);
                            setSkillDialogOpen(true);
                          }}
                          className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          <IconEdit size={20} />
                        </IconButton>

                        <IconButton color="error" onClick={() => handleDeleteSkill(skill.key)} className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                          <IconTrash size={20} />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Lưu thay đổi thành công
        </Alert>
      </Snackbar>

      <SkillFormDialog
        open={skillDialogOpen}
        initialData={editingSkill}
        onClose={() => setSkillDialogOpen(false)}
        onSubmit={async ({ label, value }) => {
          try {
            const key = editingSkill?.key || `skill_${label.toLowerCase().replace(/ /g, '_')}`;

            const normalizedValue = normalizeText(value);

            const payload = {
              ...form,
              [key]: normalizedValue,
            };

            await axios.put('/api/admin/teacher-profile', payload);
            await fetchProfile();

            setSkillDialogOpen(false);
          } catch (err) {
            alert('Lưu kỹ năng thất bại');
          }
        }}
      />
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={600}>Xác nhận xoá</DialogTitle>

        <DialogContent>
          <Typography>Bạn chắc chắn muốn xoá kỹ năng này?</Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Huỷ
          </Button>

          <Button onClick={confirmDeleteSkill} color="error" variant="contained">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
