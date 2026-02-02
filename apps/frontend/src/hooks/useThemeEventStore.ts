import { create } from 'zustand';
import axios from 'axios';
const allowedThemes = ['default', 'newyear', 'christmas', 'independence'] as const;
type Theme = (typeof allowedThemes)[number];
type ThemeState = {
  theme: Theme;
  fetchTheme: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'default',
  fetchTheme: async () => {
    const res = await axios.get('/api/msystem/theme-event');
    const value = res.data?.value;
    const isValid = allowedThemes.includes(value as Theme);

    set({ theme: isValid ? (value as Theme) : 'default' });
  },
}));
