import DefaultLayout from '@/layouts/default-layout';

import EM_Payment from './EM_Payment';

export default function EM_Checkout() {
  return (
    <DefaultLayout hideSidebarToggle={true}>
      <EM_Payment />
    </DefaultLayout>
  );
}
