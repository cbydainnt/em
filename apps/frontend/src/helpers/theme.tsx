export const courseDetailRightImage = {
  default: {
    src: '/static/theme/default/hero.png',
  },
  newyear: {
    src: '/api/file/view/englishmaster/system_banner/theme/new_year/be-trai-be-gai.png',
  },
  independence: {
    src: '/static/theme/halloween/hero.png',
  },
  christmas: {
    src: '',
  },
};

export const courseDetailGif = {
  default: {
    src: '/static/theme/default/hero.png',
  },
  newyear: {
    src: '/api/file/view/englishmaster/system_banner/theme/new_year/den-long-multi.gif',
  },
  independence: {
    src: '/api/file/view/englishmaster/system_banner/theme/independence/garland.png',
  },
  christmas: {
    src: '/api/file/view/englishmaster/system_banner/theme/christ_mast/noel-decoration.png',
  },
};

export const courseItemBackground = {
  default: { src: '/static/theme/default/hero.png' },
  newyear: { src: 'api/file/view/englishmaster/system_banner/theme/new_year/background-tet-60.jpeg' },
  christmas: { src: 'api/file/view/englishmaster/system_banner/theme/christ_mast/bg-giang-sinh.jpg' },
  independence: { src: 'api/file/view/englishmaster/system_banner/theme/independence/bg-chim-bo-cau.jpg' },
};

export const bannerImage = {
  default: {
    topLeftImg: '',
    topRightImg: '',
    bottomLeftImg: '',
    bottomRightImg: '',
  },
  newyear: {
    topLeftImg: 'api/file/view/englishmaster/system_banner/theme/new_year/den-long.gif',
    topRightImg: 'api/file/view/englishmaster/system_banner/theme/new_year/cau-doi-2.gif',
    bottomLeftImg: '',
    bottomRightImg: 'api/file/view/englishmaster/system_banner/theme/new_year/mam-ngu-qua.png',
  },
  christmas: {
    topLeftImg: 'api/file/view/englishmaster/system_banner/theme/christ_mast/star-bell.png',
    topRightImg: 'api/file/view/englishmaster/system_banner/theme/christ_mast/festive-garland.png',
    bottomLeftImg: '',
    bottomRightImg: 'api/file/view/englishmaster/system_banner/theme/christ_mast/hop-qua.png',
  },
  independence: {
    topLeftImg: '',
    topRightImg: 'api/file/view/englishmaster/system_banner/theme/independence/garland-quoc-khanh.png',
    bottomLeftImg: 'api/file/view/englishmaster/system_banner/theme/independence/bluefirework.gif',
    bottomRightImg: '',
  },
};
export function applyThemeAndMode(theme: string) {
  const root = document.documentElement;

  // Remove old theme-* classes
  root.classList.forEach((c) => {
    if (c.startsWith('theme-')) root.classList.remove(c);
  });

  // Apply theme (if not default)
  if (theme !== 'default') {
    root.classList.add(`theme-${theme}`);
  }

  const mode = localStorage.getItem('theme');

  // Apply dark/light
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
