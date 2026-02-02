import { useEffect, useRef, useState } from 'react';
import { IconClock, IconStar, IconStarFilled, IconStarHalfFilled, IconShoppingCartFilled } from '@tabler/icons-react';
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ActivateCourseModal } from './component/EM_ActivateCourseModal';
import { useCartStore } from '@/hooks/useCartStore';
import { Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from '@mui/material';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useAuth } from '@/hooks/useAuth';
import { useCourseStatus } from '@/hooks/useCourseStatus';
import { useThemeStore } from '@/hooks/useThemeEventStore';
import { courseDetailRightImage } from '@/helpers/theme';
import { toSlug } from '@/helpers/SeoHelper';
interface ReviewSummary {
  average: number;
  total_reviews: number;
}

interface Course {
  course_price: number;
  course_original_price?: number;
  total_course_duration: number; // phút
  sections?: {
    section_title: string;
    lessons: { lesson_id: string; minutes: number; lesson_title: string }[];
  }[];
}

export default function CourseOverview({ courseId, reloadFlag, onActivated }: { courseId: string; reloadFlag: number; onActivated?: () => void }) {
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const { fetchUser } = useAuth();
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCancelReserveDialog, setShowCancelReserveDialog] = useState(false);
  const { theme, fetchTheme } = useThemeStore();
  // Sử dụng useCourseStatus để lấy trạng thái khóa học
  const { refresh, expired_date, userCourseStatus, hasPurchased, loading: statusLoading } = useCourseStatus(courseId);

  const loginRef = useRef<any>(null);

  // Tách riêng snackbar cho từng hành động
  const [openAddToCartSnackbar, setOpenAddToCartSnackbar] = useState(false);
  const [openCancelReserveSnackbar, setOpenCancelReserveSnackbar] = useState(false);

  const { incrementCartCount } = useCartStore();
  const [isInCart, setIsInCart] = useState(false);

  // Tính toán trạng thái thực tế
  const isCourseActivated = userCourseStatus === 1 || userCourseStatus === 3; // Status 1: ACTIVE, 3: RESERVED
  const isReserved = userCourseStatus === 3; // Status 3: RESERVED

  useEffect(() => {
    if (courseId) {
      fetchSummary();
      refresh();
      fetchCourse();
      countTotalDurationCourse();
      fetchTheme();
    }
    const bInCart = authData?.cartItems?.some((item: any) => item.course_id === courseId);
    setIsInCart(bInCart);
  }, [courseId, authData, reloadFlag]);

  async function fetchSummary() {
    try {
      const res = await axios.get(`/api/review/course/${courseId}`);
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCourse() {
    try {
      const res = await axios.get(`/api/course/${courseId}`);
      setCourse(res.data);
    } catch (err) {
      console.error('Error fetching course:', err);
    } finally {
      setLoading(false);
    }
  }

  async function countTotalDurationCourse() {
    try {
      if (courseId) {
        const lessonRes = await axios.get(`/api/lesson/get-all-lesson-by-courseId/${courseId}`);
        let total = 0;
        lessonRes.data.forEach((section: any) => {
          if (Array.isArray(section.lessons)) {
            section.lessons.forEach((lesson: any) => {
              total += lesson.minutes || 0;
            });
          }
        });

        setTotalMinutes(total);
      }
    } catch (err) {
      console.error('Call api get error:', err);
    }
  }

  // Mở confirm dialog hủy bảo lưu
  const openCancelReserveDialog = () => {
    setShowCancelReserveDialog(true);
  };

  // Đóng confirm dialog
  const closeCancelReserveDialog = () => {
    setShowCancelReserveDialog(false);
  };

  // Hàm xử lý hủy bảo lưu
  const handleCancelReserve = async () => {
    closeCancelReserveDialog(); // Đóng dialog

    if (!authData?.id) {
      alert('Vui lòng đăng nhập để thực hiện thao tác này');
      return;
    }

    try {
      // Lấy userCourseId trước
      const userCoursesRes = await axios.get(`/api/course/get-reserve-courses/${authData.id}`);
      const userCourse = userCoursesRes.data.find((item: any) => item.course?.course_id === courseId && item.status === 3);

      if (!userCourse) {
        alert('Không tìm thấy thông tin khóa học bảo lưu');
        return;
      }

      // Gọi API hủy bảo lưu
      const response = await axios.post(`/api/course/cancel-reserve-course`, {
        userCourseId: userCourse.id,
      });

      if (response.data) {
        // Hiển thị thông báo thành công cho HỦY BẢO LƯU
        setOpenCancelReserveSnackbar(true);

        // Refresh trạng thái khóa học
        refresh();
        onActivated?.();
      }
    } catch (error: any) {
      console.error('Hủy bảo lưu thất bại:', error);
      alert(error.response?.data?.message || 'Hủy bảo lưu thất bại');
    }
  };

  // 👉 Nếu user đã kích hoạt, đi vào học
  const handleGoToLearn = () => {
    if (course && course.sections?.length && course.sections[0].lessons?.length) {
      const firstSection = course.sections[0];
      const firstLesson = firstSection.lessons[0];
      const slug = `${toSlug(firstLesson.lesson_title)}-${firstLesson.lesson_id}`;
      navigate(`/bai-hoc/${slug}`, {
        state: {
          lessonId: firstLesson.lesson_id,
          courseId,
          courseName: '', // có thể truyền course_name nếu cần
          sectionName: firstSection.section_title,
        },
      });
    } else {
      alert('Chưa có bài học nào trong khóa này!');
    }
  };

  const handleBuyNow = () => {
    navigate(`/thanh-toan?courseID=${courseId}`);
  };

  const handleViewCard = () => {
    navigate(`/gio-hang`);
  };

  const handleWishlist = async () => {
    if (!authData) {
      loginRef.current?.show();
      return;
    }
    try {
      const cartData = {
        user_id: authData.id,
        course_id: courseId,
      };
      await axios.post('/api/cart_item/add', cartData);
      await fetchUser();

      // Hiển thị thông báo thành công cho THÊM VÀO GIỎ HÀNG
      setOpenAddToCartSnackbar(true);

      incrementCartCount();
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert('⚠️ Khóa học đã có trong giỏ hàng');
      } else {
        console.error('Lỗi thêm giỏ hàng:', error);
        alert('❌ Không thể thêm vào giỏ hàng');
      }
    }
  };

  function formatExpiredDate(expired_date?: string | null) {
    if (!expired_date) return 'Hạn sử dụng: Vĩnh viễn';

    const expDate = new Date(expired_date);
    const now = new Date();

    if (expDate < now) return `Đã Hết hạn: ${expDate.toLocaleDateString('vi-VN')}`;
    return `Hạn sử dụng: ${expDate.toLocaleDateString('vi-VN')}`;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < Math.floor(rating)) return <IconStarFilled key={i} size={18} className="text-yellow-400" />;
          else if (i < rating && rating % 1 >= 0.25 && rating % 1 <= 0.75) return <IconStarHalfFilled key={i} size={18} className="text-yellow-400" />;
          else return <IconStar key={i} size={18} className="text-gray-300" />;
        })}
      </div>
    );
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} giờ ${mins > 0 ? `${mins} phút` : ''}` : `${mins} phút`;
  };

  const getThemeCardClass = () => {
    switch (theme) {
      case 'christmas':
        return 'snow-card';
      case 'newyear':
        return 'newyear-card';
      case 'independence':
        return 'independence-card';
      default:
        return '';
    }
  };

  const image = (courseDetailRightImage as any)[theme]?.src ?? courseDetailRightImage.default.src;

  // Hiển thị loading khi đang kiểm tra trạng thái
  if (statusLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <Box className="relative">
      <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col gap-4 z-10 ${getThemeCardClass()}`}>
        <h4>
          <b>Tổng quan đánh giá</b>
        </h4>
        {/* ⭐ Rating */}
        {loading ? (
          <div className="text-gray-400 animate-pulse">Đang tải đánh giá...</div>
        ) : summary ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 text-gray-800 dark:text-gray-100">
              <span className="text-4xl sm:text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-fuchsia-500 text-transparent bg-clip-text">{(summary.total_reviews === 0 ? 5 : summary.average).toFixed(1)}</span>
              {renderStars(summary.total_reviews === 0 ? 5 : summary.average)}
            </div>
            {summary.total_reviews > 0 && <span className="text-gray-600 text-sm">({summary.total_reviews} đánh giá)</span>}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">Chưa có đánh giá</div>
        )}

        <div>
          <p className="text-3xl font-bold text-red-600">{course?.course_price ? course.course_price.toLocaleString('vi-VN') + '₫' : 'Đang cập nhật'}</p>
          {course?.course_original_price && course.course_original_price > course.course_price && <p className="text-sm text-gray-500 line-through">{course.course_original_price.toLocaleString('vi-VN')}₫</p>}
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <IconClock size={18} />
          <span>Thời lượng: {course ? formatDuration(totalMinutes) : 'Đang cập nhật'}</span>
        </div>

        {/* 🔹 Hiển thị nút theo trạng thái khóa học */}
        {isCourseActivated ? (
          // ĐÃ KÍCH HOẠT (bao gồm cả trạng thái bảo lưu)
          <div className="flex flex-col items-center">
            {/* Nếu đang bảo lưu (status = 3) thì hiển thị nút Hủy Bảo Lưu */}
            {isReserved ? (
              <>
                <button onClick={openCancelReserveDialog} className="w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition bg-black text-white hover:bg-gray-800 dark:bg-black dark:text-gray-100 dark:hover:bg-blue-500">
                  <RestoreIcon className="text-white dark:text-gray-100" />
                  Hủy Bảo Lưu
                </button>
                <p className="text-sm text-gray-500 text-center mt-2">Khóa học đang trong thời gian bảo lưu. Hủy bảo lưu để tiếp tục học.</p>
                <p className="text-sm text-red-500 text-center mt-1">{formatExpiredDate(expired_date)}</p>
              </>
            ) : (
              // Nếu không bảo lưu thì hiển thị nút Vào Học
              <>
                <button onClick={handleGoToLearn} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium">
                  VÀO HỌC
                </button>
                <p className="text-sm text-gray-500 text-center mt-2">{formatExpiredDate(expired_date)}</p>
              </>
            )}
          </div>
        ) : hasPurchased ? (
          // ĐÃ MUA NHƯNG CHƯA KÍCH HOẠT → chỉ hiển thị nút kích hoạt
          <div className="flex flex-col items-center">
            <button onClick={() => setShowModal(true)} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium">
              Kích hoạt khóa học
            </button>
            <p className="text-sm text-gray-500 text-center mt-2">Bạn đã mua khóa học này. Hãy kích hoạt để bắt đầu học.</p>
          </div>
        ) : (
          // 👉 CHƯA MUA → MUA NGAY / GIỎ HÀNG
          <>
            <div className="flex gap-3">
              <button onClick={handleBuyNow} className="flex-1 bg-[#7c4dff] text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                Mua Ngay
              </button>

              {isInCart ? (
                <button onClick={handleViewCard} className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-1 font-medium">
                  Xem giỏ hàng <IconShoppingCartFilled size={15} />
                </button>
              ) : (
                <button onClick={handleWishlist} className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-1 font-medium">
                  Thêm vào <IconShoppingCartFilled size={15} />
                </button>
              )}
            </div>
            <div className="flex flex-col items-center">
              <button onClick={() => setShowModal(true)} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium">
                Kích hoạt khóa học
              </button>
            </div>
          </>
        )}

        <ActivateCourseModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          courseId={courseId}
          onSuccess={() => {
            refresh();
            onActivated?.();
          }}
        />

        {/* Confirm Dialog for Cancel Reserve */}
        <Dialog open={showCancelReserveDialog} onClose={closeCancelReserveDialog} aria-labelledby="cancel-reserve-dialog-title" aria-describedby="cancel-reserve-dialog-description">
          <DialogTitle id="cancel-reserve-dialog-title" className="dark:bg-gray-800 dark:text-white">
            Xác nhận hủy bảo lưu
          </DialogTitle>
          <DialogContent className="dark:bg-gray-800">
            <DialogContentText id="cancel-reserve-dialog-description" className="dark:text-gray-300">
              Bạn có chắc chắn muốn hủy trạng thái bảo lưu của khóa học này ?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dark:bg-gray-800">
            <Button
              onClick={closeCancelReserveDialog}
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
            <Button
              onClick={handleCancelReserve}
              variant="contained"
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
          </DialogActions>
        </Dialog>

        {/* Snackbar cho Thêm vào giỏ hàng */}
        <Snackbar open={openAddToCartSnackbar} autoHideDuration={2500} onClose={() => setOpenAddToCartSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            severity="success"
            variant="filled"
            sx={{
              width: '100%',
              background: 'linear-gradient(90deg, #81c784, #4caf50, #388e3c)',
              color: 'white',
            }}
            onClose={() => setOpenAddToCartSnackbar(false)}
          >
            Đã thêm vào giỏ hàng
          </Alert>
        </Snackbar>

        {/* Snackbar cho Hủy bảo lưu */}
        <Snackbar open={openCancelReserveSnackbar} autoHideDuration={3000} onClose={() => setOpenCancelReserveSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            severity="success"
            variant="filled"
            sx={{
              width: '100%',
              background: 'linear-gradient(90deg, #4CAF50, #45a049)',
              color: 'white',
            }}
            onClose={() => setOpenCancelReserveSnackbar(false)}
          >
            Hủy bảo lưu thành công! Bạn có thể tiếp tục học ngay.
          </Alert>
        </Snackbar>
      </div>
      <div
        className="w-full mt-4 rounded-md"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '250px',
        }}
      />
    </Box>
  );
}
