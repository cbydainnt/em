import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TextField, Stack, Typography, Alert, Snackbar, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleCloseAlert = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setAlertMessage('Vui lòng nhập đầy đủ thông tin.');
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }
    if (!token) {
      setAlertMessage('Token không hợp lệ.');
      setAlertSeverity('error');
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/regist/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMessage(data.message || 'Đổi mật khẩu thành công!');
        setAlertSeverity('success');
        setAlertOpen(true);
        setTimeout(() => navigate('/'), 1500); // quay về login
      } else {
        setAlertMessage(data.message || 'Đổi mật khẩu thất bại.');
        setAlertSeverity('error');
        setAlertOpen(true);
      }
    } catch (error) {
      console.error(error);
      setAlertMessage('Có lỗi xảy ra. Vui lòng thử lại.');
      setAlertSeverity('error');
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" textAlign="center">
        Đặt lại mật khẩu
      </Typography>

      <TextField
        type={showPassword ? 'text' : 'password'}
        label="Mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment:
            password.length > 0 ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end" tabIndex={-1}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
      <TextField
        type={showConfirmPassword ? 'text' : 'password'}
        label="Xác nhận mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment:
            confirmPassword.length > 0 ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end" tabIndex={-1}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />

      <LoadingButton variant="contained" onClick={handleResetPassword} loading={loading} fullWidth>
        Đặt lại mật khẩu
      </LoadingButton>

      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={alertSeverity} variant="filled" onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
