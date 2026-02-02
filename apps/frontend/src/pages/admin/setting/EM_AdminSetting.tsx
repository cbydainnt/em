import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { CardGiftcard, AutoAwesome, Flag, Check } from '@mui/icons-material';
import AdminLayout from '../layout/AdminLayout';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

const THEMES = [
  {
    id: 'default',
    name: 'Mặc Định',
    icon: AutoAwesome,
    gradient: 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
    preview: '⚪',
  },
  {
    id: 'newyear',
    name: 'Tết Nguyên Đán',
    icon: AutoAwesome,
    gradient: 'linear-gradient(135deg, #991B1B 0%, #DC2626 60%, #FACC15 100%)',
    preview: '🧧',
  },
  {
    id: 'independence',
    name: 'Quốc Khánh 2/9',
    icon: Flag,
    gradient: 'linear-gradient(135deg, #38BDF8 0%, #60A5FA 50%, #E0F2FE 100%)',
    preview: '🕊️',
  },
  {
    id: 'christmas',
    name: 'Giáng Sinh',
    icon: CardGiftcard,
    gradient: 'linear-gradient(135deg, #064E3B 0%, #7F1D1D 100%)',
    preview: '🎄',
  },
];

export default function SettingsPanel() {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [currentTheme, setCurrentTheme] = useState('default');
  const authData = useAuthStore((state) => state.authData);

  useEffect(() => {
    const fetchTheme = async () => {
      const res = await axios.get('/api/msystem/theme-event');
      const value = res.data.value ?? 'default';
      setSelectedTheme(value);
      setCurrentTheme(value);
    };
    fetchTheme();
  }, []);

  const handleApplyTheme = async () => {
    if (selectedTheme === 'default') {
      // Logic reset
      await axios.post('/api/msystem/theme-event', { value: 'default' });
      setCurrentTheme('default');
      await axios.put('/api/admin/banner/update-background', {
        userId: authData.id,
        isReset: true,
      });
    } else {
      // Logic theme khác
      await axios.post('/api/msystem/theme-event', { value: selectedTheme });
      setCurrentTheme(selectedTheme);

      let background_css = '';
      let main_image_src = '';
      switch (selectedTheme) {
        case 'newyear':
          background_css = 'rgba(177, 31, 36)';
          main_image_src = 'englishmaster/system_banner/theme/new_year/be-trai-1.png';
          break;

        case 'christmas':
          background_css = 'linear-gradient(135deg, #0F4C3A 0%, #1C2841 100%)';
          main_image_src = 'englishmaster/system_banner/theme/christ_mast/men-model.png';
          break;

        case 'independence':
          background_css = 'linear-gradient(135deg, rgb(135, 206, 235) 0%, rgb(70, 130, 180) 100%)';
          main_image_src = 'englishmaster/system_banner/theme/independence/lang-bac.png';
          break;

        default:
          background_css = 'rgba(255, 255, 255)';
          break;
      }

      await axios.put('/api/admin/banner/update-background', {
        background_css,
        main_image_src,
        userId: authData.id,
        isReset: false,
      });
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'rgb(var(--bg-primary))', p: 3 }}>
        <Card sx={{ mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              p: 3,
              color: 'white',
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoAwesome />
              Cài Đặt Giao Diện
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Chọn theme theo mùa yêu thích
            </Typography>
          </Box>

          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {THEMES.map((theme) => {
                const Icon = theme.icon;
                return (
                  <Grid item xs={12} sm={6} md={3} key={theme.id}>
                    <Paper
                      onClick={() => setSelectedTheme(theme.id)}
                      elevation={selectedTheme === theme.id ? 4 : 1}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderRadius: 2,
                        border: selectedTheme === theme.id ? '3px solid #667eea' : '2px solid transparent',
                        transition: 'all 0.3s',
                        position: 'relative',
                        background: theme.gradient,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        },
                      }}
                    >
                      {selectedTheme === theme.id && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'white',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 2,
                          }}
                        >
                          <Check sx={{ fontSize: 16, color: '#667eea' }} />
                        </Box>
                      )}
                      <Box sx={{ textAlign: 'center', color: theme.id === 'default' ? '#374151' : 'white' }}>
                        <Typography sx={{ fontSize: 40, mb: 1 }}>{theme.preview}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                          <Icon sx={{ fontSize: 16 }} />
                          <Typography variant="body2" fontWeight="600">
                            {theme.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                startIcon={<Check />}
                onClick={handleApplyTheme}
                disabled={selectedTheme === currentTheme}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                  },
                }}
              >
                Cập Nhật
              </Button>
            </Box>

            {currentTheme !== 'default' && (
              <Paper
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" color="primary.main">
                  Theme hiện tại: <strong>{THEMES.find((t) => t.id === currentTheme)?.name}</strong>
                </Typography>
              </Paper>
            )}
          </CardContent>
        </Card>
      </Box>
    </AdminLayout>
  );
}
