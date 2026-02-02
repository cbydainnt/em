import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages';
import CourseDetailPage from './pages/EM_CourseDetail/EM_CourseDetailPage';
import SectionPage from './pages/EM_CourseDetail/EM_SectionPage';
import LearnCoursePage from './pages/EM_LearnCourse/EM_LearnCoursePage';
import MyCoursesPage from './pages/EM_courses/EM_MyCoursePage';
import HistoryOrderPage from './pages/EM_historyorder/EM_HistoryOrder';
import DocumentsPage from './pages/EM_documents';
import DictionaryPage from './pages/EM_dictionary';
import CalendarPage from './pages/EM_dictionary';
import { AuthProvider } from '@/hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';
import VerifyEmail from './components/EM_VerifyEmail';
import ResetPasswordPage from './components/EM_ResetPassword';
import EM_Checkout from './pages/EM_Checkout/EM_Checkout';
import EM_Courses from './pages/EM_courses/EM_Courses';
import AllNotificationsPage from './pages/EM_Notifications/EM_NotificationPage';
import AdminNotificationsPage from './pages/EM_Notifications/EM_AdminNotificationPage';
import EM_Hotcombo from './pages/EM_hotcombo';
import Profile from './pages/EM_ProfilePage';
import UserManagementPage from './pages/admin/users';
import CourseManagementPage from './pages/admin/courses';
import CategoryManagementPage from './pages/admin/categories';
import ComboManagementPage from './pages/admin/combos';
import SectionManagementPage from './pages/admin/sections';
import LessonManagementPage from './pages/admin/lessons';

import EM_AddToCart from './pages/EM_AddToCart/EM_AddToCart';
import OrderManagementPage from './pages/admin/orders';
import QuizManagementPage from './pages/admin/quizzes';
import DiscountVoucherManagementPage from './pages/admin/discount-vouchers';
import ReserveCourse from './components/EM_ReserveCourse';
import ReportManagementPage from './pages/admin/reports/ReportManagementPage';
import QuestionBankPage from './pages/admin/quizzes/question-bank/question-bank-page';
import UpdateProfile from './pages/EM_UpdateProfile';
import QuizFullPage from './pages/quiz/QuizFullPage';
import SettingsPanel from './pages/admin/setting/EM_AdminSetting';
import OrderReportPage from './pages/admin/orders/OrderReportPage';
import AdminTeacherProfile from './pages/admin/profile-teacher';
import StudentsCourseTab from './pages/admin/courses/components/course-students-tab';
import MSystemDashboard from './pages/admin/dashboard';
import { useThemeStore } from './hooks/useThemeEventStore';
import { useEffect } from 'react';
import { applyThemeAndMode } from './helpers/theme';
// import { useAuthStore } from './hooks/useAuthStore';
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function PageReload() {
  window.location.reload();
  return <div></div>;
}

export default function App() {
  const { theme, fetchTheme } = useThemeStore();
  useEffect(() => {
    fetchTheme();
  }, []);
  applyThemeAndMode(theme);

  function GoToAdminPage() {
    const ADMIN_URL = 'https://' + import.meta.env.VITE_APP_HOST + ':' + import.meta.env.VITE_ADMIN_PORT;
    window.location.href = `${import.meta.env.DEV ? ADMIN_URL : ''}/admin/manage/users`;
    return <div></div>;
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/khoa-hoc/:course_id" element={<CourseDetailPage />} />
        <Route path="/chuong-hoc/:course_id" element={<SectionPage />} />
        <Route path="/thanh-toan" element={<EM_Checkout />} />
        <Route path="/gio-hang" element={<EM_AddToCart />} />
        <Route path="/tat-ca-khoa-hoc" element={<EM_Courses />} />
        <Route path="/combo" element={<EM_Hotcombo />} />
        <Route path="/xac-thuc-email" element={<VerifyEmail />} />
        <Route path="/tat-ca-thong-bao" element={<AllNotificationsPage />} />
        <Route path="/adminNotifications" element={<AdminNotificationsPage />} />
        <Route path="/dat-lai-mat-khau" element={<ResetPasswordPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/bai-hoc/:lesson_slug" element={<LearnCoursePage />} />
          <Route path="/thong-tin-ca-nhan" element={<Profile />} />
          <Route path="/cap-nhat-thong-tin-ca-nhan" element={<UpdateProfile />} />
          <Route path="/khoa-hoc-cua-toi" element={<MyCoursesPage />} />
          <Route path="/lich-su-don-hang" element={<HistoryOrderPage />} />
          <Route path="/bao-luu" element={<ReserveCourse />} />
          <Route path="/quiz/:quizId/full" element={<QuizFullPage />} />
          <Route path="/admin">
            <Route path="manage">
              <Route path="users" element={<UserManagementPage />} />
              <Route path="courses" element={<CourseManagementPage />} />
              <Route path=":courseId/students" element={<StudentsCourseTab />} />
              <Route path="categories" element={<CategoryManagementPage />} />
              <Route path="combos" element={<ComboManagementPage />} />
              <Route path="transactions">
                <Route index element={<OrderManagementPage />} />
                <Route path="report" element={<OrderReportPage />} />
              </Route>
              <Route path="quizzes" element={<QuizManagementPage />} />
              <Route path="quizzes/questions" element={<QuestionBankPage />} />
              <Route path="discount-vouchers" element={<DiscountVoucherManagementPage />} />
              <Route path="sections" element={<SectionManagementPage />} />
              <Route path="lessons" element={<LessonManagementPage />} />
              <Route path="reports" element={<ReportManagementPage />} />
              <Route path="adminNotify" element={<AdminNotificationsPage />} />
              <Route path="style-prompt" element={<PageReload />} />
              <Route path="settings" element={<SettingsPanel />} />
              <Route path="profile-teacher" element={<AdminTeacherProfile />} />
              <Route path="dashboard" element={<MSystemDashboard />} />
            </Route>
          </Route>
        </Route>
        <Route path="/settings" element={<GoToAdminPage />} />
        <Route path="/tai-lieu" element={<DocumentsPage />} />
        <Route path="/tat-ca-sach" element={<DocumentsPage />} />
        <Route path="/tra-tu" element={<DictionaryPage />} />
        <Route path="/lich-hoc" element={<CalendarPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}
