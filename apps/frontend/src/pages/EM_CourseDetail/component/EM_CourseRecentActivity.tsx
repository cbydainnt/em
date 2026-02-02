import { useState, useEffect } from 'react';
import { IconSchool, IconActivity, IconVideo, IconRefresh } from '@tabler/icons-react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '@/utils/enums';
import { timeAgo } from '@/utils/timeAgo';
import { toSlug } from '@/helpers/SeoHelper';

interface Activity {
  _id: string;
  user_id: string;
  user_name?: string;
  user_avatar?: string;
  title: string;
  message: string;
  type: number;
  context?: string;
  status: number;
  created_at: string;
  updated_at?: string;
  lesson_id?: string;
  course_name?: string;
  lesson_name?: string;
}

interface CourseRecentActivityProps {
  courseId: string;
  courseName?: string;
}

export function CourseRecentActivity({ courseId, courseName }: CourseRecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { authData } = useAuthStore();
  const currentUserId = authData?.id || null;
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
      return imageUrl;
    }
    return `/api/file/view/${imageUrl}`;
  };

  const fetchActivities = async () => {
    if (!currentUserId) {
      setActivities([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);

      const apiUrl = `/api/notifications/course/${courseId}/recent-activities?limit=20`;
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      if (data.success) {
        setActivities(data.data);
      } else {
        throw new Error(data.message || 'API returned unsuccessful response');
      }
    } catch (err: any) {
      console.error('❌ Lỗi khi tải hoạt động:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActivities([]);

    if (courseId && currentUserId) {
      fetchActivities();
      // Chỉ refresh nếu đã đăng nhập
      const interval = setInterval(fetchActivities, 60000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
      setActivities([]);
    }
  }, [courseId, currentUserId]);

  useEffect(() => {
    if (!currentUserId) {
      setActivities([]);
      setLoading(false);

      return () => {};
    }
  }, [currentUserId]);

  if (!currentUserId) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <IconActivity size={20} className="text-purple-500" />
            Hoạt động gần đây
            {courseName && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">- {courseName}</span>}
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <IconActivity size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
        </div>
      </div>
    );
  }

  // Map type từ notification sang activity type
  const getActivityType = (notification: Activity): string => {
    switch (notification.type) {
      case 1:
        return 'view_lesson';
      // case 4: // "Kích hoạt Khóa học"
      //   return 'activate_course';
      default:
        return 'other';
    }
  };

  const getActivityIcon = (notification: Activity) => {
    const activityType = getActivityType(notification);

    switch (activityType) {
      case 'view_lesson':
        return <IconVideo size={16} className="text-blue-500" />;
      // case 'activate_course':
      //   return <IconSchool size={16} className="text-green-500" />;
      // default:
      //   return <IconActivity size={16} className="text-purple-500" />;
    }
  };

  const getActivityDetails = (notification: Activity) => {
    // Sử dụng course_name và lesson_name từ relations
    if (notification.type === 1) {
      // Hoạt động xem video
      return {
        lessonName: notification.lesson_name,
        courseName: notification.course_name,
      };
    }
    // else if (notification.type === 4) {
    //   // Hoạt động kích hoạt khóa học
    //   return {
    //     courseName: notification.course_name,
    //   };
    // }

    return {
      rawMessage: notification.message,
    };
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  if (loading && activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <IconActivity size={20} className="text-purple-500" />
            Hoạt động gần đây
            {courseName && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">- {courseName}</span>}
          </h3>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <IconActivity size={20} className="text-purple-500" />
          Hoạt động gần đây
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={fetchActivities} disabled={loading} className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50">
            <IconRefresh size={16} />
            {loading ? 'Đang tải...' : 'Làm mới'}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">{courseName && <span className="text-sm font-bold text-gray-500 dark:text-gray-400">- {courseName} -</span>}</div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <IconActivity size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>Chưa có hoạt động nào gần đây</p>
          <p className="text-sm mt-1">Các hoạt động sẽ xuất hiện ở đây khi có người dùng tương tác với khóa học</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const details = getActivityDetails(activity);

            return (
              <div
                key={activity._id}
                onClick={() => {
                  if (activity.type === NotificationType.SYSTEM && activity.lesson_id) {
                    const slug = `${toSlug(activity?.lesson_name || '')}-${activity.lesson_id}`;
                    navigate(`/bai-hoc/${slug}`);
                  }
                }}
                className={`flex flex-col p-4 rounded-lg border 
                  border-gray-200 dark:border-gray-700 
                  bg-gray-50 dark:bg-gray-900 
                  transition-colors
                  ${activity.lesson_id ? 'cursor-pointer hover:bg-white dark:hover:bg-gray-800' : 'cursor-default'}
                `}
              >
                {/* Header với avatar và thông tin user */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0">{activity.user_avatar ? <img src={getImageUrl(activity.user_avatar)} alt={activity.user_name || 'User'} className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm">{getInitials(activity.user_name || 'User')}</div>}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity)}
                      <p className="text-sm font-medium text-gray-900 dark:text-white ">{activity.user_name || 'Người dùng'}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{timeAgo(activity.created_at)}</p>
                  </div>
                  {/* {activity.status === 1 && <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">Mới</span>} */}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">{activity.message}</p>

                  {/* Hiển thị chi tiết bài học/khóa học nếu có */}
                  {details.lessonName && (
                    <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 mb-1">
                      <IconVideo size={14} />
                      <span>{details.lessonName}</span>
                    </div>
                  )}

                  {details.courseName && (
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                      <IconSchool size={14} />
                      <span>{details.courseName}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
