import { create } from 'zustand';
import axios from 'axios';

interface CartState {
  cartCount: number;
  fetchCartCount: (userId: string) => Promise<void>;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,

  fetchCartCount: async (userId) => {
    try {
      const res = await axios.get(`/api/cart_item/count/${userId}`);
      set({ cartCount: res.data.count });
    } catch (err) {
      console.error('Lỗi khi lấy số lượng giỏ hàng:', err);
      set({ cartCount: 0 });
    }
  },

  incrementCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCartCount: () => set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),

  resetCart: () => set({ cartCount: 0 }),
}));
