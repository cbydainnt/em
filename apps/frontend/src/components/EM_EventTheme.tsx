import { useEffect, useState } from 'react';
import { EventTheme } from '@/helpers/types';

export function useEventTheme() {
  const [event, setEvent] = useState<EventTheme>('default');

  useEffect(() => {
    const root = document.documentElement;

    // clear old events
    root.classList.remove('event-christmas', 'event-new-year', 'event-holiday-30-4', 'event-holiday-2-9', 'event-summer', 'event-rainy');

    if (event !== 'default') {
      root.classList.add(`event-${event}`);
    }
  }, [event]);

  return {
    event,
    setEvent,
    clearEvent: () => setEvent('default'),
  };
}
