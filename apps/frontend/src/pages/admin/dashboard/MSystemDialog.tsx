import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface MSystemItem {
  id: number;
  param_key: string;
  param_name: string;
  param_value: string;
}

export default function MSystemDialog({ open, onClose, onSuccess, editing }: { open: boolean; onClose: () => void; onSuccess: () => void; editing: MSystemItem | null; paramKey: string }) {
  const [form, setForm] = useState({
    param_name: '',
    param_value: '',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        param_name: editing.param_name,
        param_value: editing.param_value,
      });
    } else {
      setForm({ param_name: '', param_value: '' });
    }
  }, [editing]);

  const handleSubmit = async () => {
    if (editing) {
      // UPDATE
      await axios.put(`/api/msystem/${editing.id}`, form);
    }
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editing ? 'Chỉnh sửa' : 'Thêm mới'}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Tên" value={form.param_name} onChange={(e) => setForm({ ...form, param_name: e.target.value })} fullWidth />
          <TextField label="Nội dung" value={form.param_value} onChange={(e) => setForm({ ...form, param_value: e.target.value })} fullWidth />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
