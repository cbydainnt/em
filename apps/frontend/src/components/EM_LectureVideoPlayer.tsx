
interface LectureVideoPlayerProps {
  videoUrl: string;
  title: string;
}

export const LectureVideoPlayer = ({ videoUrl, title }: LectureVideoPlayerProps) => {
  const getEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const embedUrl = videoUrl.includes('youtube') || videoUrl.includes('youtu.be') ? getEmbedUrl(videoUrl) : videoUrl;

  return <iframe src={embedUrl} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={title} />;
};