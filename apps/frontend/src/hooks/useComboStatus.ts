// hooks/useComboStatus.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

export const useComboStatus = (comboId: string | null) => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const { authData } = useAuthStore();

  useEffect(() => {
    const checkComboPurchase = async () => {
      if (!comboId || !authData?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post('/api/order/check-order', {
          keys: [comboId],
          type: 1, // 1 = Combo
          user_id: authData.id,
        });
        
        // Nếu có order trả về => đã mua
        setHasPurchased(res.data.length > 0);
      } catch (error) {
        console.error('Error checking combo purchase:', error);
        setHasPurchased(false);
      } finally {
        setLoading(false);
      }
    };

    checkComboPurchase();
  }, [comboId, authData?.id]);

  return { hasPurchased, loading };
};