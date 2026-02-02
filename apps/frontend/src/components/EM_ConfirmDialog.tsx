import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ConfirmDialog({ title = 'Thông báo', message, onConfirm, onCancel, open, setOpen }: ConfirmDialogProps) {
  const handleClose = () => setOpen(false);

  const handleDialogClose = (event: Event, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      event.stopPropagation();
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} disableEscapeKeyDown>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            onConfirm?.();
          }}
          sx={{
            background: 'green',
            color: 'white',
            '&:hover': {
              background: 'rgb(44, 49, 207)',
              color: 'white',
            },
          }}
        >
          Có
        </Button>
        <Button
          onClick={() => {
            handleClose();
            onCancel?.();
          }}
          sx={{
            background: 'red',
            color: 'white',
            '&:hover': {
              background: 'rgb(44, 49, 207)',
              color: 'white',
            },
          }}
        >
          Không
        </Button>
      </DialogActions>
    </Dialog>
  );
}
