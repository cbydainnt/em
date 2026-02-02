import { useEffect, useRef } from 'react';

export default function useVideoAnalytics(videoRef: React.RefObject<HTMLVideoElement>, hasVideo: boolean, videoUrl: string, userId?: string, courseId?: string, lessonId?: string, initialWatched: number = 0, initialCompleted: number = 1, serverSegments: number[] = []) {
  const seekHistoryRef = useRef<number[]>([]);

  const watchedRef = useRef<Set<number>>(new Set());
  const lastSegmentRef = useRef<number | null>(null);
  const segmentSize = 1; // 5-second chunks
  useEffect(() => {
    serverSegments.forEach((s) => watchedRef.current.add(s));
  }, [serverSegments]);

  useEffect(() => {
    const video = videoRef.current;
    if (!hasVideo || !video || !videoUrl) return;

    const onTimeUpdate = () => {
      const currentTime = Math.floor(video.currentTime);
      const segment = Math.floor(currentTime / segmentSize);
      if (!watchedRef.current.has(segment)) {
        watchedRef.current.add(segment);
      }
    };

    const onSeeked = () => {
      const currentTime = Math.floor(video.currentTime);
      const currentSegment = Math.floor(currentTime / segmentSize);

      if (lastSegmentRef.current !== null && Math.abs(currentSegment - lastSegmentRef.current) > 1) {
        seekHistoryRef.current.push(currentTime);
      }
      lastSegmentRef.current = currentSegment;
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('seeked', onSeeked);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('seeked', onSeeked);
    };
  }, [hasVideo, videoUrl, videoRef.current]);

  const getSummary = () => {
    const totalDuration = videoRef.current?.duration || 0;
    const watchedSeconds = watchedRef.current.size * segmentSize;
    const percent = (watchedSeconds / totalDuration) * 100;

    return {
      watchedSeconds,
      percent,
      segments: Array.from(watchedRef.current).sort((a, b) => a - b),
    };
  };

  // const mergeSegments = (oldSegs: [number, number][], newSegs: number[]): [number, number][] => {
  //   const toRange = (segs: number[]): [number, number][] => {
  //     const sorted = [...segs].sort((a, b) => a - b);
  //     const result: [number, number][] = [];
  //     let start = sorted[0];
  //     let prev = sorted[0];
  //     for (let i = 1; i < sorted.length; i++) {
  //       if (sorted[i] > prev + 1) {
  //         result.push([start, prev + 1]);
  //         start = sorted[i];
  //       }
  //       prev = sorted[i];
  //     }
  //     result.push([start, prev + 1]);
  //     return result;
  //   };

  //   const flatNew = toRange(newSegs);
  //   return [...oldSegs, ...flatNew].sort(([a], [b]) => a - b);
  // };

  const saveFinalProgress = () => {
    if (!userId || !courseId || !lessonId) return;
    const { watchedSeconds, segments } = getSummary();
    const totalWatched = initialWatched + watchedSeconds;
    const totalDuration = videoRef.current?.duration || 0;
    const percent = (totalWatched / totalDuration) * 100;
    const isCompleted = percent >= 90 ? 2 : initialCompleted;
    const payload = {
      user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      watched_seconds: totalWatched,
      completed: isCompleted,
      segments: segments,
      last_accessed: new Date().toISOString(),
    };
    navigator.sendBeacon('/api/lesson/user-lesson-progress', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  };

  return {
    watchedChunks: watchedRef.current,
    seekHistory: seekHistoryRef.current,
    getSummary,
    saveProgress: saveFinalProgress,
  };
}
