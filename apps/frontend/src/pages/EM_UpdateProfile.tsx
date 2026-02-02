import DefaultLayout from '@/layouts/default-layout';
import EditProfile from './EM_EditProfile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function EM_UpdateProfile() {
  const [openDialog, setOpenDialog] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <DefaultLayout>
      <EditProfile open={openDialog} onClose={handleClose} />
    </DefaultLayout>
  );
}
