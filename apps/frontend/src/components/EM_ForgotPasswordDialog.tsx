// EM_ForgotPasswordDialog.tsx
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Stack, Typography, InputAdornment, IconButton, useMediaQuery, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconX, IconMail } from '@tabler/icons-react';
import { LoadingButton } from '@mui/lab';

interface EM_ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const EM_ForgotPasswordDialog = ({ open, onClose, onBackToLogin }: EM_ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleForgotPassword = async () => {
    if (!email) {
      setAlert({
        message: 'Vui lòng nhập email',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch(`/api/regist/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.status === 'ok') {
        setAlert({
          message: 'Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra hộp thư của bạn.',
          severity: 'success',
        });
        setEmail('');
      } else {
        setAlert({
          message: data.message || 'Email không tồn tại trong hệ thống',
          severity: 'error',
        });
      }
    } catch (error) {
      setAlert({
        message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setEmail('');
    setAlert(null);
    setLoading(false);
    onClose();
  };

  const handleBackToLogin = () => {
    handleClose();
    onBackToLogin();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={false}
      PaperProps={{
        sx: {
          borderRadius: 4,
          width: '90%',
          maxWidth: 480,
          p: 1,
          backgroundColor: '#fff',
          mx: 'auto',
          transition: 'max-width 0.3s ease',
          [theme.breakpoints.up('md')]: {
            maxWidth: 430,
          },
          [theme.breakpoints.down('sm')]: {
            width: '95%',
            p: 0.5,
          },
        },
      }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
        },
      }}
    >
      <DialogTitle sx={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', padding: 3, color: 'rgb(156, 39, 176)' }}>Quên mật khẩu</DialogTitle>

      {/* Nút thoát */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          color: (theme) => theme.palette.grey[600],
          transition: 'transform 0.3s ease, color 0.3s ease',
          '&:hover': {
            transform: 'rotate(90deg)',
            color: '#7b1fa2',
          },
        }}
      >
        <IconX size={22} />
      </IconButton>

      <DialogContent
        sx={{
          pt: 1.5,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 0.5,
        }}
      >
        <Stack sx={{ width: '92%', alignItems: 'stretch', mx: 'auto' }}>
          {/* Alert thông báo */}
          {alert && (
            <Alert
              severity={alert.severity}
              sx={{
                mb: 2,
                '& .MuiAlert-message': {
                  fontSize: '14px',
                },
              }}
            >
              {alert.message}
            </Alert>
          )}

          <Stack direction="column" alignItems="center" spacing={1} mb={3}>
            <Typography
              sx={{
                fontSize: '14px',
                ml: 0,
                textAlign: 'left',
                width: '100%',
              }}
            >
              Email
            </Typography>
            <TextField
              required
              id="forgotEmail"
              placeholder="Nhập email của bạn"
              type="email"
              fullWidth
              variant="standard"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                sx: {
                  ml: 0.5,
                  '&.Mui-focused': { color: '#7b1fa2' },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconMail color="gray" size={18} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </Typography>
        </Stack>

        <DialogActions
          sx={{
            mt: 2,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.2,
            width: '100%',
          }}
        >
          <LoadingButton
            variant="contained"
            onClick={handleForgotPassword}
            loading={loading}
            size={isSmall ? 'small' : 'medium'}
            sx={{
              width: '100%',
              textTransform: 'none',
              borderRadius: 4,
              py: isSmall ? 0.5 : 0.8,
              fontWeight: 600,
              fontSize: isSmall ? '0.8rem' : '0.9rem',
              backgroundColor: '#9c27b0',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: '#7b1fa2',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Gửi email đặt lại mật khẩu
          </LoadingButton>

          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Quay lại đăng nhập? {' '}
            <Link
              component="button"
              type="button"
              underline="hover"
              fontWeight={600}
              color="#9c27b0"
              onClick={handleBackToLogin}
            >
              Đăng nhập
            </Link>
          </Typography>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EM_ForgotPasswordDialog;
