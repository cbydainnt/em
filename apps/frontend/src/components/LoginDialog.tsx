import { Alert, DialogActions, DialogContentText, IconButton, Portal, Snackbar, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconLogin2, IconX } from '@tabler/icons-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingButton } from '@mui/lab';


const LoginDialog = forwardRef(function Login(_p: any, ref) {
  const { loginUser } = useAuth(); 
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const show = () => {
    setOpen(true);
  }

  const handleSubmit = async (formJson: any) => {
    setLoading(true)
    try {
      const result = await loginUser({
        email: formJson.email,
        password: formJson.password,
        autoLogin: true,
      })
      if(result.status === 'error'){
        setOpenAlert(true)
      }
      else{
        handleClose();
      }
    } catch (error) {
        return null;
    }
    setLoading(false)
  };
  
  useImperativeHandle(ref, () => ({
    show,
  }));
  
  return (
    <div>
      <Portal>
        <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Your sign in request failed. Please try again.
          </Alert>
        </Snackbar>
      </Portal>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleSubmit(formJson)
          },
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size='small'
          sx={{
            position: 'absolute',
            right: 18,
            top: 18,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <IconX height={18} width={18} />
        </IconButton>
        <DialogContent dividers>
          <DialogContentText>
            To login to this website, please enter your email and password here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions className='px-5 py-3'>
          <LoadingButton variant="contained" type="submit" loadingPosition="start" loading={loading} size="medium" startIcon={<IconLogin2 height={16} width={16} />}>Login</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default LoginDialog;