import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button, Alert, Stack, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSearchParams } from 'react-router-dom';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');

  const [countdown, setCountdown] = useState<number | null>(null); // giây còn hạn
  const [redirectSeconds, setRedirectSeconds] = useState(3); // redirect sau 3 giây khi success

  const email = localStorage.getItem('pendingVerifyEmail');

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus('error');
        setMessage('Token không hợp lệ.');
        return;
      }

      try {
        const res = await fetch(`/api/regist/verify?token=${token}`);
        const data = await res.json();

        // Backend gửi expire timestamp → bạn cần trả thêm ở API verify
        if (data.expiresIn !== undefined) {
          setCountdown(data.expiresIn);
        }
        if (data.status === 'ok') {
          setStatus('success');
          setMessage('Xác thực email thành công!');

          // Tự redirect
          const interval = setInterval(() => {
            setRedirectSeconds((s) => {
              if (s <= 1) {
                clearInterval(interval);
                window.location.href = '/';
              }
              return s - 1;
            });
          }, 1000);
        } else {
          if (data.message?.includes('hết hạn')) {
            setStatus('expired');
            setMessage('Link xác thực đã hết hạn.');
          } else {
            setStatus('error');
            setMessage(data.message || 'Xác thực thất bại.');
          }
        }
      } catch {
        setStatus('error');
        setMessage('Lỗi kết nối.');
      }
    }

    verify();
  }, [token]);

  // Countdown token còn hạn
  useEffect(() => {
    if (!countdown) return;
    const interval = setInterval(() => {
      setCountdown((s) => (s !== null && s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  async function resendVerify() {
    if (!email) {
      alert('Không tìm thấy email để gửi lại link xác thực.');
      return;
    }

    const res = await fetch(`/api/regist/resend-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  const minutes = countdown ? Math.floor(countdown / 60) : 0;
  const seconds = countdown ? countdown % 60 : 0;

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5'),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 450,
          textAlign: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        {/* Google Style Logo */}
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(45deg, #673ab7, #9c27b0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 34,
            fontWeight: 'bold',
          }}
        >
          EM
        </Box>

        {status === 'loading' && (
          <Stack spacing={2} alignItems="center">
            <CircularProgress />
            <Typography>Đang xác thực email...</Typography>

            {countdown !== null && status === 'loading' && (
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon color="primary" />
                <Typography>
                  Token còn hiệu lực: {minutes}:{seconds.toString().padStart(2, '0')}
                </Typography>
              </Stack>
            )}
          </Stack>
        )}

        {status === 'success' && (
          <Stack spacing={2} alignItems="center">
            <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 60 }} />
            <Alert severity="success" variant="filled">
              {message}
            </Alert>

            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Tự chuyển hướng sau {redirectSeconds} giây...
            </Typography>

            <Button variant="contained" onClick={() => (window.location.href = '/')}>
              Về trang đăng nhập
            </Button>
          </Stack>
        )}

        {status === 'error' && (
          <Stack spacing={2} alignItems="center">
            <ErrorIcon sx={{ color: 'red', fontSize: 60 }} />
            <Alert severity="error" variant="filled">
              {message}
            </Alert>

            <Button variant="contained" onClick={() => (window.location.href = '/')}>
              Về trang chủ
            </Button>
          </Stack>
        )}

        {status === 'expired' && (
          <Stack spacing={2} alignItems="center">
            <ErrorIcon sx={{ color: 'orange', fontSize: 60 }} />
            <Alert severity="warning" variant="filled">
              {message}
            </Alert>

            <Button variant="contained" onClick={resendVerify}>
              Gửi lại email xác thực
            </Button>

            <Button onClick={() => (window.location.href = '/')}>Về trang chủ</Button>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
