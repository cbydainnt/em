import { Alert, DialogActions, IconButton, Link, Portal, Snackbar, TextField, Divider, Stack, Typography, useMediaQuery, InputAdornment } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EM_RegisterDialog from './EM_RegisterDialog';
import EM_ForgotPasswordDialog from './EM_ForgotPasswordDialog';

import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import { IconLogin2, IconX, IconLock, IconEye, IconEyeOff, IconMail } from '@tabler/icons-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Logo Google
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.94 0 6.6 1.7 8.12 3.12l5.94-5.94C34.38 3.24 29.73 1 24 1 14.94 1 7.19 6.58 3.69 14.23l6.91 5.37C12.1 13.34 17.55 9.5 24 9.5z" />
    <path fill="#34A853" d="M46.14 24.5c0-1.52-.14-2.95-.4-4.36H24v8.25h12.44c-.56 2.95-2.26 5.46-4.75 7.16l7.3 5.68C43.41 37.4 46.14 31.46 46.14 24.5z" />
    <path fill="#4A90E2" d="M10.6 28.86c-.66-1.96-1.03-4.06-1.03-6.36s.37-4.4 1.03-6.36l-6.91-5.37C1.96 14.07 0 18.84 0 24s1.96 9.93 5.69 13.23l6.91-5.37z" />
    <path fill="#FBBC05" d="M24 47c6.48 0 11.9-2.15 15.87-5.91l-7.3-5.68c-2.05 1.39-4.7 2.19-8.57 2.19-6.45 0-11.9-3.84-13.4-9.1l-6.91 5.37C7.19 41.42 14.94 47 24 47z" />
  </svg>
);

const EM_Login = forwardRef(function Login(_p: any, ref) {
  const { loginUser, fetchUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const show = () => setOpen(true);
  const [alertMessage, setAlertMessage] = useState('');
  const em_registerRef = useRef<any>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const LAST_LOGIN_KEY = 'em_last_login';
  const [email, setEmail] = useState('');
  useEffect(() => {
    const lastLogin = localStorage.getItem('em_last_login');
    if (lastLogin) {
      try {
        const parsed = JSON.parse(lastLogin);
        setEmail(parsed.email || '');
        setPassword(parsed.password || '');
      } catch {}
    }
  }, []);

  // Hàm mở dialog quên mật khẩu và đóng dialog login
  const handleOpenForgotPassword = () => {
    setOpen(false); // Đóng dialog login
    setTimeout(() => {
      setForgotOpen(true); // Mở dialog quên mật khẩu
    }, 50);
  };
  // Hàm quay lại từ dialog quên mật khẩu
  const handleBackToLogin = () => {
    setForgotOpen(false); // Đóng dialog quên mật khẩu
    setTimeout(() => {
      setOpen(true); // Mở lại dialog login
    }, 50);
  };
  useImperativeHandle(ref, () => ({ show }));
  //Hàm gửi email forgot password

  const handleSubmit = async (formJson: any) => {
    setLoading(true);
    try {
      const result = await loginUser({
        email: formJson.email,
        password: formJson.password,
        autoLogin: true,
      });
      if (result.status === 'error') {
        let message = 'Đăng nhập thất bại. Vui lòng thử lại.';
        if (result.error === 'NOT_VERIFIED') message = 'Tài khoản chưa xác thực email. Vui lòng kiểm tra hộp thư.';
        setAlertMessage(message);
        setAlertSeverity('error');
        setOpenAlert(true);
      } else {
        // Lưu thông tin đăng nhập gần nhất
        localStorage.setItem(LAST_LOGIN_KEY, JSON.stringify({ email: formJson.email, password: formJson.password, timestamp: Date.now() }));
        handleClose();
        const userType = result.user.type?.toLowerCase();
        switch (
          userType
          // case 'admin':
          //   navigate('/admin/manage/users'); // hoặc '/admin/dashboard'
          //   break;
          // case 'user':
          //   navigate('/'); // hoặc '/courses', '/home'
          //   break;
          // default:
          //   navigate('/'); // Fallback
          //   break;
        ) {
        }
      }
    } catch {
      return null;
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    // const redirectUri = window.location.href;
    // URL backend bắt đầu login Google (dành riêng cho popup)
    // const googleLoginUrl = `${window.location.origin}/api/google/popup?redirect_uri=${encodeURIComponent(redirectUri)}`;
    const googleLoginUrl = `${window.location.origin}/api/google`;

    // Mở cửa sổ popup (kích thước 500x600)
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5; // hơi cao 1 chút để nhìn đẹp

    const popup = window.open(googleLoginUrl, 'google-login', `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`);

    // Hàm nhận message từ popup
    const receiveMessage = async (event: MessageEvent) => {
      // Chỉ chấp nhận từ backend domain
      //  if (event.origin !== api) return;

      if (event.data?.access_token) {
        const { needUpdateProfile } = event.data;
        // console.log('✅ Google Login thành công:', event.data);
        // 👉 Lưu token vào localStorage hoặc gọi API lưu session
        // localStorage.setItem('access_token', event.data.access_token);

        // Đóng popup
        popup?.close();

        // Đóng listener để tránh rò rỉ bộ nhớ
        window.removeEventListener('message', receiveMessage);

        // Đóng modal login, cập nhật UI
        await fetchUser();
        handleClose();
        if (needUpdateProfile == true) {
          navigate('/cap-nhat-thong-tin-ca-nhan');
        }
        // window.location.reload(); // hoặc gọi hàm `refreshUser()` tuỳ bạn
      }
    };

    // Lắng nghe message
    window.addEventListener('message', receiveMessage);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <div>
      <Portal>
        <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseAlert} severity={alertSeverity} variant="filled" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Portal>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
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
              height: 650,
            },
            [theme.breakpoints.down('sm')]: {
              width: '95%',
              p: 0.5,
            },
          },
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleSubmit(formJson);
          },
        }}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center',
          },
        }}
      >
        <DialogTitle sx={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', padding: 3, color: 'rgb(156, 39, 176)' }}>Đăng nhập</DialogTitle>

        {/* Nút thoát */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
            <Stack direction="column" alignItems="center" spacing={1} mb={2}>
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
                id="email"
                name="email"
                autoComplete="email"
                // label="Nhập email của bạn"
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

            <Stack direction="column" alignItems="center" spacing={1}>
              {/* <IconLock color="#9c27b0" size={24} /> */}
              <Typography
                sx={{
                  fontSize: '14px',
                  ml: 0,
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                Mật khẩu
              </Typography>
              <TextField
                required
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Nhập mật khẩu của bạn"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="standard"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  sx: {
                    ml: 0.5,
                    '&.Mui-focused': { color: '#7b1fa2' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconLock color="gray" size={18} />
                    </InputAdornment>
                  ),
                  endAdornment:
                    password.length > 0 ? ( // 👈 chỉ hiển thị khi có ký tự
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{
                          color: '#9c27b0',
                          '&:hover': { color: '#7b1fa2' },
                        }}
                        tabIndex={-1}
                      >
                        {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                      </IconButton>
                    ) : null,
                }}
                sx={{
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
                    WebkitTextFillColor: '#000 !important',
                    transition: 'background-color 9999s ease-in-out 0s',
                  },
                }}
              />
            </Stack>

            {/* Quên mật khẩu */}
            <Typography
              variant="body2"
              sx={{
                textAlign: 'right',
                mt: 1,
                color: '#9c27b0',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              onClick={handleOpenForgotPassword}
            >
              Quên mật khẩu?
            </Typography>
          </Stack>

          {/* Nút đăng nhập */}
          <DialogActions
            sx={{
              mt: 2.5,
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.2,
              width: '100%',
              '& > :not(style) ~ :not(style)': { marginLeft: 0 }, // 👈 fix lệch icon
            }}
          >
            {/* Nút chính */}
            <LoadingButton
              className="btn-hover-gradient"
              variant="contained"
              type="submit"
              loading={loading}
              size={isSmall ? 'small' : 'medium'}
              {...(!isSmall && {
                startIcon: <IconLogin2 size={18} />,
                loadingPosition: 'start',
              })}
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
              Đăng nhập
            </LoadingButton>

            <Divider
              sx={{
                my: 1.8,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                '&::before, &::after': {
                  borderColor: '#ddd',
                },
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                hoặc
              </Typography>
            </Divider>

            {/* Nút Google */}
            <LoadingButton
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={!isSmall && <GoogleIcon />}
              sx={{
                width: '100%',
                textTransform: 'none',
                borderRadius: 2,
                py: isSmall ? 0.4 : 0.7,
                fontWeight: 500,
                fontSize: isSmall ? '0.8rem' : '0.9rem',
                color: '#444',
                borderColor: '#ddd',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                '& .MuiButton-startIcon': {
                  marginRight: isSmall ? 0.5 : 1,
                  marginLeft: 0,
                },
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                  borderColor: '#ccc',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {isSmall ? <GoogleIcon /> : 'Đăng nhập bằng Google'}
            </LoadingButton>
          </DialogActions>

          {/* Đăng ký */}
          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Bạn chưa có tài khoản?{' '}
            <Link
              component="button"
              type="button"
              underline="hover"
              fontWeight={600}
              color="#9c27b0"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                setTimeout(() => {
                  em_registerRef.current?.show();
                }, 50);
              }}
            >
              Đăng ký ngay
            </Link>
          </Typography>
        </DialogContent>
      </Dialog>

      <EM_RegisterDialog ref={em_registerRef} em_loginRef={ref as any} />
      {/* Dialog Quên mật khẩu - Component tách riêng */}
      <EM_ForgotPasswordDialog open={forgotOpen} onClose={() => setForgotOpen(false)} onBackToLogin={handleBackToLogin} />
    </div>
  );
});

export default EM_Login;
