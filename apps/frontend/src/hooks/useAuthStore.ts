import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  authData: any;
  setAuthData: (data: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authData: null,
      setAuthData: (data) => set({ authData: data }),
    }),
    {
      name: 'auth-storage', // tên key lưu trong localStorage
      partialize: (state) => ({
        // chỉ lưu ví dụ: token hoặc user id
        authData: {
          id: state.authData?.id,
        },
      }),
    },
  ),
);
interface NotificationStore {
  triggerUpdate: number;
  notify: () => void;
  // Thêm state để chia sẻ dữ liệu
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  lastUpdate: Date;
  setLastUpdate: (date: Date) => void;
  updateNotification: () => void;
}
export const useNotificationStore = create<NotificationStore>((set) => ({
  triggerUpdate: 0,
  unreadCount: 0,
  lastUpdate: new Date(),

  notify: () =>
    set((state) => ({
      triggerUpdate: state.triggerUpdate + 1,
      lastUpdate: new Date(),
    })),

  setUnreadCount: (count: number) => set({ unreadCount: count }),

  setLastUpdate: (date: Date) => set({ lastUpdate: date }),

  // THÊM HÀM NÀY - Có thể dùng notify hoặc tạo hàm riêng
  updateNotification: () =>
    set((state) => ({
      triggerUpdate: state.triggerUpdate + 1,
      lastUpdate: new Date(),
    })),
}));
