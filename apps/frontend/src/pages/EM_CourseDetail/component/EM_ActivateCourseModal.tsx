import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import { Snackbar, Alert } from '@mui/material';
import { logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';
interface Props {
  showModal: boolean;
  onClose: () => void;
  courseId: string;
  onSuccess?: () => void;
}

export function ActivateCourseModal({ showModal, onClose, courseId, onSuccess }: Props) {
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const currentUserId = authData?.id || null;
  const [activeCode, setActiveCode] = useState('');
  const [autoFilled, setAutoFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnack = () => setSnack({ ...snack, open: false });

  // 🔹 Auto-fill mã kích hoạt chưa dùng của user
  useEffect(() => {
    if (showModal && currentUserId) {
      axios
        .get(`/api/active-code/unused`, { params: { user_id: currentUserId, course_id: courseId } })
        .then((res) => {
          const codes = res.data; // [{ code: 'abc123' }]
          if (codes.length > 0) {
            setActiveCode(codes[0].code);
            setAutoFilled(true); // 🔹 đánh dấu đã auto-fill
          } else {
            setActiveCode('');
            setAutoFilled(false);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [showModal, currentUserId, courseId]);

  const handleSubmitCode = async () => {
    if (!activeCode.trim()) {
      alert('⚠️ Vui lòng nhập mã kích hoạt!');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`/api/active-code/activate`, { code: activeCode, course_id: courseId, user_id: currentUserId });
      const data = res.data;
      console.log('✅ API Responsesdsdsd:', data);
      if (data?.success) {
        setSnack({ open: true, message: ' Kích hoạt khóa học thành công!', severity: 'success' });
        // ✅ FETCH COURSE NAME RIÊNG
        let courseNameToLog = 'Khóa học';
        try {
          const courseRes = await axios.get(`/api/course/${courseId}`);
          courseNameToLog = courseRes.data.course_name || 'Khóa học';
          console.log('✅ Course Name:', courseNameToLog); // Kiểm tra course name
        } catch (error) {
          console.error('❌ Failed to fetch course name:', error);
        }

        // ✅ LOG KHI KÍCH HOẠT THÀNH CÔNG
        if (authData) {
          logClientMessage('Kích hoạt Khóa học', `Bạn vừa kích hoạt khóa học thành công: ${courseNameToLog}`, authData.id, UserType.USER, NotificationType.USER_ACTION);
          logClientMessage('Kích hoạt Khóa học', `${authData.name} vừa kích hoạt  thành công khóa học : ${courseNameToLog}`, null, UserType.ADMIN, NotificationType.USER_ACTION);
        }
        onClose();
        if (onSuccess) onSuccess();
        navigate(`/khoa-hoc/${data.course_id}`);
      } else {
        setSnack({ open: true, message: data?.message || ' Kích hoạt thất bại!', severity: 'error' });
      }
    } catch (err: any) {
      setSnack({ open: true, message: err.response?.data?.message || ' Mã kích hoạt không hợp lệ!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md shadow-xl animate-slide-down">
            <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">🔑 Nhập mã kích hoạt khóa học</h2>
            <input value={activeCode} onChange={(e) => setActiveCode(e.target.value)} placeholder="Nhập mã code..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-white" disabled={loading || !!autoFilled} />
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400" disabled={loading}>
                Hủy
              </button>
              <button onClick={handleSubmitCode} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50" disabled={loading}>
                {loading ? 'Đang kích hoạt...' : 'Kích hoạt'}
              </button>
            </div>
          </div>
        </div>
      )}
      <Snackbar open={snack.open} autoHideDuration={4000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
