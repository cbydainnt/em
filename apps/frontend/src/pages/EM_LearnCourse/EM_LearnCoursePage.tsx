import DefaultLayout from '@/layouts/default-layout';
import LessonDetail from '@/components/EM_LessonDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Box } from '@mui/material';
import { toSlug } from '@/helpers/SeoHelper';

export default function LearnCoursePage() {
  const { lesson_slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState<string>('');

  useEffect(() => {
    if (!lesson_slug) return;

    const fetchAndValidateLesson = async () => {
      try {
        setLoading(true);

        const parts = lesson_slug.split('-');
        const extractedLessonId = parts.pop() || '';

        const res = await axios.get(`/api/lesson/LessonById/${extractedLessonId}`);
        const lesson = res.data;
        if (!lesson) {
          navigate('/404');
          return;
        }

        const correctSlug = `${toSlug(lesson.lesson_title)}-${extractedLessonId}`;

        if (lesson_slug !== correctSlug) {
          navigate(`/bai-hoc/${correctSlug}`, { replace: true });
          return;
        }

        setLessonId(extractedLessonId);
      } catch (err) {
        console.error('Failed to fetch lesson', err);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchAndValidateLesson();
  }, [lesson_slug, navigate]);

  if (loading) {
    return (
      <DefaultLayout hideSidebarToggle={true}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout hideSidebarToggle={true}>
      <LessonDetail lessonId={lessonId} />
    </DefaultLayout>
  );
}
