import { Dialog, DialogTitle, DialogContent, IconButton, TextField, Snackbar, Alert, Box, Typography, Link, Stack, InputAdornment, Portal } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { IconUserPlus, IconX, IconUser, IconMail, IconLock, IconPhone, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import EM_Login from './EM_Login';
import { useTheme } from '@mui/material/styles';
// import { useAuth } from "@/hooks/useAuth"; // có hàm registerUser

const EM_RegisterDialog = forwardRef(function RegisterDialog({ em_loginRef }: { em_loginRef?: React.RefObject<any> }, ref) {
  // const { registerUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', type: 'error' as 'error' | 'success' });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const internalLoginRef = useRef<any>(null);
  const loginRefToUse = em_loginRef || internalLoginRef;
  const theme = useTheme();
  const handleClose = () => {
    setOpen(false);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
  };
  const show = () => setOpen(true);
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  useImperativeHandle(ref, () => ({ show }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setAlert({ open: true, message: 'Mật khẩu không trùng khớp.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/regist/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.status === 'error') {
        setAlert({ open: true, message: result.message || 'Đăng ký thất bại.', type: 'error' });
      } else {
        localStorage.setItem('pendingVerifyEmail', data.email as string);
        setTimeout(() => handleClose(), 600);
        setAlert({ open: true, message: 'Đăng ký thành công! Vui lòng truy cập gmail để xác thực tài khoản', type: 'success' });
        // Nếu muốn tự động mở dialog login:
        // loginRefToUse?.current?.show();
      }
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: 'Có lỗi xảy ra. Vui lòng thử lại.', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <>
      <Portal>
        <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ zIndex: 1500 }}>
          <Alert severity={alert.type} variant="filled" onClose={handleCloseAlert} sx={{ zIndex: 1501 }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Portal>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
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
        }}
      >
        <DialogTitle sx={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', padding: 3, color: 'rgb(156, 39, 176)' }}>Đăng ký</DialogTitle>
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

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 1, display: 'flex', flexDirection: 'column', width: '100%', gap: 0.5 }}>
            <Box display="flex" alignItems="center" mb={1}>
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
                    Họ và tên
                  </Typography>
                  <TextField
                    required
                    id="fullName"
                    name="fullName"
                    placeholder="Nhập họ và tên"
                    type="text"
                    fullWidth
                    variant="standard"
                    size="small"
                    InputLabelProps={{
                      sx: {
                        ml: 0.5,
                        '&.Mui-focused': { color: '#7b1fa2' },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconUser color="gray" size={18} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

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
                    placeholder="Nhập email"
                    type="email"
                    fullWidth
                    variant="standard"
                    size="small"
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

                <Stack direction="column" alignItems="center" spacing={1} mb={2}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      ml: 0,
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    Số điện thoại
                  </Typography>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    type="text"
                    fullWidth
                    variant="standard"
                    size="small"
                    InputLabelProps={{
                      sx: {
                        ml: 0.5,
                        '&.Mui-focused': { color: '#7b1fa2' },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconPhone color="gray" size={18} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack direction="column" alignItems="center" spacing={1} mb={2}>
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
                    placeholder="Nhập mật khẩu "
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
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
                      endAdornment: password && (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{
                            color: showPassword ? '#7b1fa2' : '#9c27b0',
                            '&:hover': { color: '#7b1fa2' },
                          }}
                          tabIndex={-1}
                        >
                          {showPassword ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                        </IconButton>
                      ),
                    }}
                  />
                </Stack>

                <Stack direction="column" alignItems="center" spacing={1} mb={2}>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      ml: 0,
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    Xác nhận mật khẩu
                  </Typography>
                  <TextField
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    type={showConfirm ? 'text' : 'password'}
                    fullWidth
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconLock color="gray" size={18} />
                        </InputAdornment>
                      ),
                      endAdornment: confirmPassword && (
                        <IconButton
                          onClick={() => setShowConfirm(!showConfirm)}
                          edge="end"
                          size="small"
                          sx={{
                            color: showConfirm ? '#7b1fa2' : '#9c27b0',
                            '&:hover': { color: '#7b1fa2' },
                          }}
                          tabIndex={-1}
                        >
                          {showConfirm ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                        </IconButton>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
            </Box>
          </DialogContent>

          <Box textAlign="center" pb={2}>
            <LoadingButton
              className="btn-hover-gradient"
              variant="contained"
              type="submit"
              loading={loading}
              loadingPosition="start"
              startIcon={<IconUserPlus size={18} />}
              sx={{
                backgroundColor: '#9c27b0',
                '&:hover': { backgroundColor: '#7b1fa2' },
                borderRadius: '18px',
                fontWeight: 600,
                width: '88%',
              }}
            >
              Đăng ký
            </LoadingButton>

            <Typography variant="body2" mt={2} textAlign="center">
              Đã có tài khoản?{' '}
              <Link
                component="button"
                type="button"
                underline="hover"
                fontWeight={600}
                color="#9c27b0"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose(); // đóng dialog đăng ký
                  loginRefToUse?.current?.show(); // mở lại dialog đăng nhập
                }}
              >
                Đăng nhập ngay
              </Link>
            </Typography>
          </Box>
        </Box>
      </Dialog>
      {!em_loginRef && <EM_Login ref={internalLoginRef} />}
    </>
  );
});

export default EM_RegisterDialog;
