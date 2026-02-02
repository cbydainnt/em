export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // giây

  if (diff < 60) return `vừa xong`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 172800) return `hôm qua`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  if (diff < 31104000) return `${Math.floor(diff / 2592000)} tháng trước`;
  return `${Math.floor(diff / 31104000)} năm trước`;
}