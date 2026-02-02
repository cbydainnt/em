import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

interface CourseStatus {
  hasPurchased: boolean;
  hasUnusedCode: boolean;
  userCourseStatus: number | null;
  isActivated: boolean;
  isExpired: boolean;
  canPurchase: boolean;
  expired_date?: string | null;
  loading: boolean;
}

// Cache storage
const courseStatusCache = new Map<string, { data: CourseStatus; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

/**
 * Hook để check trạng thái mua/kích hoạt khóa học
 * Có cache 5 phút để giảm số lần gọi API
 */
export function useCourseStatus(courseId: string | null) {
  const { authData } = useAuthStore();
  const [status, setStatus] = useState<CourseStatus>({
    hasPurchased: false,
    hasUnusedCode: false,
    userCourseStatus: null,
    isActivated: false,
    isExpired: false,
    expired_date: null,
    canPurchase: true,
    loading: false,
  });

  const checkStatus = useCallback(
    async (forceRefresh = false) => {
      if (!authData?.id || !courseId) {
        setStatus({
          hasPurchased: false,
          hasUnusedCode: false,
          userCourseStatus: null,
          isActivated: false,
          isExpired: false,
          canPurchase: true,
          loading: false,
        });
        return;
      }

      const cacheKey = `${authData.id}_${courseId}`;

      // Check cache nếu không force refresh
      if (!forceRefresh) {
        const cached = courseStatusCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setStatus(cached.data);
          return;
        }
      }

      setStatus((prev) => ({ ...prev, loading: true }));

      try {
        const response = await axios.get(`/api/active-code/check-status`, {
          params: {
            user_id: authData.id,
            course_id: courseId,
          },
        });

        if (response.data.success) {
          const newStatus: CourseStatus = {
            hasPurchased: response.data.hasPurchased,
            hasUnusedCode: response.data.hasUnusedCode,
            userCourseStatus: response.data.userCourseStatus,
            isActivated: response.data.isActivated,
            expired_date: response.data?.expired_date ?? null, 
            isExpired: response.data.isExpired || false,
            canPurchase: response.data.canPurchase || false,
            loading: false,
          };

          // Update cache
          courseStatusCache.set(cacheKey, {
            data: newStatus,
            timestamp: Date.now(),
          });

          setStatus(newStatus);
        } else {
          setStatus({
            hasPurchased: false,
            hasUnusedCode: false,
            userCourseStatus: null,
            isActivated: false,
            isExpired: false,
            canPurchase: true,
            loading: false,
          });
        }
      } catch (error) {
        console.error('❌ Lỗi kiểm tra course status:', error);
        setStatus({
          hasPurchased: false,
          hasUnusedCode: false,
          userCourseStatus: null,
          isActivated: false,
          isExpired: false,
          canPurchase: true,
          loading: false,
        });
      }
    },
    [authData, courseId],
  );

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // Return status và hàm refresh
  return {
    ...status,
    refresh: () => checkStatus(true),
  };
}

/**
 * Clear cache của một hoặc tất cả khóa học
 */
export function clearCourseStatusCache(courseId?: string, userId?: string) {
  if (courseId && userId) {
    const cacheKey = `${userId}_${courseId}`;
    courseStatusCache.delete(cacheKey);
  } else {
    courseStatusCache.clear();
  }
}
