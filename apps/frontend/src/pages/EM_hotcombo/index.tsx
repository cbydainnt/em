import DefaultLayout from '@/layouts/default-layout';
import HotComboSidebar from '@/components/EM_HotComboSidebar';
import EM_Payment from '../EM_Checkout/EM_Payment';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type ComboType = { combo_id: string; combo_name: string; combo_price: number };

export default function EM_Hotcombo() {
  const [searchParams] = useSearchParams();
  const comboID = searchParams.get('comboID');
  const [selectedCombo, setSelectedCombo] = useState<ComboType | 'all' | null>(null);
  useEffect(() => {
    if (!comboID) {
      setSelectedCombo(null);
      return;
    }

    setSelectedCombo({
      combo_id: comboID,
      combo_name: '',
      combo_price: 0,
    });
  }, [comboID]);

  return (
    <DefaultLayout>
      {({ collapsed, isSmallScreen, headerHeight }) => (
        <div className="flex w-full relative flex-col md:flex-row">
          <HotComboSidebar headerHeight={headerHeight} collapsed={collapsed} isSmallScreen={isSmallScreen} isSidebarOpen={true} onSidebarClose={() => {}} selectedCombo={selectedCombo} onComboSelect={setSelectedCombo} />

          <div
            className="flex-1 px md:px-[30px]"
            style={{
              paddingLeft: isSmallScreen ? 0 : collapsed ? 90 : 385,
              backgroundColor: 'rgb(var(--bg-primary))',
            }}
          >
            <div className="w-full max-w-[1200px] mx-auto">{comboID ? <EM_Payment /> : <div className="mt-20 text-center text-gray-400">Vui lòng chọn một Hot Combo</div>}</div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
