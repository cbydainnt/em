import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

interface SkillFormDialogProps {
  open: boolean;
  initialData?: {
    key: string;
    label: string;
    value: string;
  } | null;
  onClose: () => void;
  onSubmit: (data: { label: string; value: string }) => void;
}

export default function SkillFormDialog({ open, initialData, onClose, onSubmit }: SkillFormDialogProps) {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const isValidValue = (value: string) => {
    // Không cho số âm: -1, -10, -0.5
    return !/^-\d+(\.\d+)?/.test(value.trim());
  };

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setValue(initialData.value);
    } else {
      setLabel('');
      setValue('');
    }
  }, [initialData, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Chỉnh sửa kỹ năng' : 'Thêm kỹ năng'}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Tên kỹ năng" fullWidth value={label} disabled={!!initialData} onChange={(e) => setLabel(e.target.value)} />

          <TextField
            label="Trình độ / Điểm số"
            fullWidth
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              if (isValidValue(newValue)) {
                setValue(newValue);
              }
            }}
            error={!isValidValue(value)}
            helperText={!isValidValue(value) ? 'Giá trị không hợp lệ. Vui lòng không nhập số âm.' : ''}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={() => onSubmit({ label, value })} disabled={!label || !value || !isValidValue(value)}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
