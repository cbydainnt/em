import { Alert, DialogActions, IconButton, Portal, Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { LoadingButton } from '@mui/lab';
import { gql } from '@apollo/client';
import apolloClient from '@/utils/apollo';
import { FormInputText } from './FormInputText';
import { useForm } from 'react-hook-form';


interface IFormInput {
  password: string;
  newPassword: string;
  confirm: string;
}


const ChangePasswordDialog = forwardRef(function ChangePassword(_p: any, ref) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [typeSnackbar, setTypeSnackbar] = useState<any>('error');
  const [textSnackbar, setTextSnackbar] = useState('');
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, watch } = useForm<IFormInput>({
    defaultValues:  {
      password:'',
      newPassword: '',
      confirm: '',
    },
  });
  const password = watch("newPassword", "");
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

  const onSubmit = async(data: any) => {
    setLoading(true)
        const { password, newPassword } = data

        const variables = { currentPassword: password, newPassword }

          try {
            const res = await apolloClient
            .mutate({
                mutation: gql`
                    mutation($currentPassword: String!, $newPassword: String!) {
                      changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
                        id
                      }
                    }
                `,
                variables
            });
           
            if(res && res.data && res.data.changePassword){
                setTextSnackbar("Changed password successfully.")
                setTypeSnackbar('success')
                setOpenAlert(true)
                handleClose();
            }
            else{
              setTextSnackbar("Current password is incorrect. Please try again.")
              setTypeSnackbar('error')
              setOpenAlert(true)
            }
          } catch (error) {
            setTextSnackbar("Current password is incorrect. Please try again.")
            setTypeSnackbar('error')
            setOpenAlert(true)
          }

    setLoading(false)
  };
  
  useImperativeHandle(ref, () => ({
    show,
  }));
  
  return (
    <div>
      <Portal>
        <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={handleCloseAlert}
            severity={typeSnackbar}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {textSnackbar}
          </Alert>
        </Snackbar>
      </Portal>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Change password</DialogTitle>
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
          <FormInputText
            autoFocus
            rules={{ required: 'Current password is required!' }}
            control={control}
            margin="dense"
            id="password"
            name="password"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <FormInputText
            autoFocus
            rules={{ required: 'New password is required!' }}
            control={control}
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <FormInputText
            autoFocus
            rules={{ 
              required: 'Confirm is required!',
              validate: (value: any) => value === password || "The passwords do not match"
              }
            }
            control={control}
            margin="dense"
            id="confirm"
            name="confirm"
            label="Confirm"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions className='px-5 py-3'>
          <LoadingButton variant="contained" onClick={handleSubmit(onSubmit)} loadingPosition="start" loading={loading} size="medium" startIcon={<IconDeviceFloppy height={16} width={16} />}>Change</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default ChangePasswordDialog;