import { useNotificationStore } from '@/hooks/useAuthStore';
import { NotificationType } from '@/utils/enums';
export * from './onnx';

export const roundTo = (val: number, step: number) => {
  return Math.round(val / step) * step;
};

export const roundToStr = (val: number, decimals: number) => {
  const frac = 10 ** -decimals;
  const newVal = roundTo(val, frac) + frac * 0.001 * Math.sign(val);
  if (newVal < frac && newVal > -frac) {
    return '0';
  }
  const valStr = `${newVal}`;
  const dot = valStr.indexOf('.');
  if (dot < 0 || valStr.includes('e')) {
    return valStr;
  }
  let subStr = valStr.substring(0, dot + 1 + 2);
  while (subStr.endsWith('0')) {
    subStr = subStr.substring(0, subStr.length - 1);
  }
  if (subStr.endsWith('.')) {
    subStr = subStr.substring(0, subStr.length - 1);
  }
  return subStr;
};

export const describeAspectRatio = (width: number, height: number) => {
  const wh = width / height;
  const hw = height / width;
  if (roundTo(wh, 0.01) == 1) {
    return '1:1';
  } else if (roundTo(wh, 0.01) % 1 == 0) {
    return `${Math.round(wh)}:1`;
  } else if (roundTo(hw, 0.01) % 1 == 0) {
    return `1:${Math.round(hw)}`;
  }
  for (let i = 2; i < 50; i++) {
    if (roundTo(wh * i, 0.01) % 1 == 0) {
      return `${Math.round(wh * i)}:${i}`;
    }
    if (roundTo(hw * i, 0.01) % 1 == 0) {
      return `${i}:${Math.round(hw * i)}`;
    }
  }
  if (wh > 1) {
    return `${roundToStr(wh, 2)}:1`;
  }
  return `1:${roundToStr(hw, 2)}`;
};

export const randomId = () => {
  if (!sessionStorage.getItem('tabId')) {
    sessionStorage.setItem('tabId', 'task(' + Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7) + ')');
  }
  // return "" + sessionStorage.getItem("tabId");
  return 'task(' + Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7) + Math.random().toString(36).slice(2, 7) + ')';
};

export const pad2 = (x: number) => {
  return x < 10 ? '0' + x : x;
};

export const formatTime = (secs: number) => {
  if (secs > 3600) {
    return pad2(Math.floor(secs / 60 / 60)) + ':' + pad2(Math.floor(secs / 60) % 60) + ':' + pad2(Math.floor(secs) % 60);
  } else if (secs > 60) {
    return pad2(Math.floor(secs / 60)) + ':' + pad2(Math.floor(secs) % 60);
  } else {
    return Math.floor(secs) + 's';
  }
};

export function formatVND(value: number | string | null | undefined): string {
  if (value === null || value === undefined || isNaN(Number(value))) return '0₫';
  return Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function hash(x: number) {
  x = x ^ 61 ^ (x >> 16);
  x = x + (x << 3);
  x = x ^ (x >> 4);
  x = x * 0x27d4eb2d;
  x = x ^ (x >> 15);
  return x;
}

export function getRGB(idx: number) {
  const r = hash(idx) & 0xff;
  const g = hash(idx >> 8) & 0xff;
  const b = hash(idx >> 16) & 0xff;
  return [r, g, b];
}

export function decompress(compressed_mask: string, width: number, height: number) {
  const pairs: [number, number][] = [];
  let count_str = '';
  for (const char of compressed_mask) {
    if (/\d/.test(char)) {
      count_str += char;
    } else {
      pairs.push([parseInt(count_str), char === 'T' ? 1 : 0]);
      count_str = '';
    }
  }
  const mask = new Array(height).fill(0).map(() => new Array(width).fill(0));
  let x = 0,
    y = 0;
  for (const [count, value] of pairs) {
    for (let i = 0; i < count; i++) {
      mask[y][x] = value;
      x++;
      if (x === width) {
        x = 0;
        y++;
      }
    }
  }
  // above mask is a 2d mask, convert it to index mask for better performance
  for (let i = 0; i < height; i++) {
    const sum = mask[i].reduce((a, b) => a + b, 0);
    if (sum === 0) {
      mask[i] = [];
    } else {
      const indexs = mask[i].map((v, i) => (v === 1 ? i : -1)).filter((v) => v !== -1);
      mask[i] = indexs;
    }
  }
  return mask;
}

export async function fetchImageAsDataUrl(imageUrl: string) {
  // Gọi API để lấy file dưới dạng stream
  const response = await await fetch(`${imageUrl}`, {
    method: 'GET',
  });
  // Kiểm tra nếu response không thành công
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  // Chuyển đổi phản hồi thành Blob
  const blob = await response.blob();

  // Sử dụng FileReader để chuyển Blob thành chuỗi Base64 (Data URL)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      resolve(reader.result); // Chuỗi Data URL
    };

    reader.onerror = reject; // Xử lý lỗi
    reader.readAsDataURL(blob); // Đọc Blob dưới dạng Data URL
  });
}

// ===== IMPLEMENTATION =====
export function logClientMessage(title: string, message: string, userid: string | null, userType: string | null, lesson_id_or_notificationType: string | NotificationType, course_id?: string | null, notificationType?: NotificationType) {
  // Nếu không có lesson → gọi dạng rút gọn
  if (typeof lesson_id_or_notificationType !== 'string') {
    return logClientMessage(title, message, userid, userType, '', '', lesson_id_or_notificationType);
  }

  const lesson_id = lesson_id_or_notificationType || null;
  const finalType = notificationType!;

  fetch('/api/notifications/consolelog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      message,
      userid,
      userType,
      lesson_id,
      course_id: course_id || null,
      notificationType: finalType,
      context: {
        userAgent: navigator.userAgent,
        time: new Date().toISOString(),
      },
    }),
  });
  useNotificationStore.getState().notify();
}
