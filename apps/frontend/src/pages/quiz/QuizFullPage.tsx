// pages/quiz/QuizFullPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import DefaultLayout from '@/layouts/default-layout';
import LessonQuizTaker from '@/pages/quiz/component/LessonQuizTaker';
import QuizResultSummary from '@/pages/quiz/component/QuizResultSummary';
import QuizResultDetail from '@/pages/quiz/component/QuizResultDetail';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function QuizFullPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const authData = useAuthStore((state) => state.authData);

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quizMode, setQuizMode] = useState<'taking' | 'result' | 'detail'>('taking');
  const [quizResult, setQuizResult] = useState<any>(null);
  const [lessonInfo, setLessonInfo] = useState<{
    courseId: string;
    courseName: string;
    sectionName: string;
    lessonTitle: string;
    initialMode?: string;
    progressId?: string;
    resultData?: any;
  } | null>(null);

  // ẨN HEADER CHÍNH CỦA TRANG KHI VÀO QUIZ FULL PAGE
  useEffect(() => {
    // Tìm và ẩn header
    const header = document.querySelector('header') || document.querySelector('nav') || document.querySelector('.main-header') || document.querySelector('[role="banner"]') || document.querySelector('.MuiAppBar-root'); // Material UI AppBar

    if (header) {
      (header as HTMLElement).style.display = 'none';
    }

    // Cleanup: Hiện lại header khi unmount (thoát khỏi quiz)
    return () => {
      if (header) {
        (header as HTMLElement).style.display = '';
      }
    };
  }, []);

  // Lấy thông tin lesson từ state (khi navigate từ LessonDetail)
  useEffect(() => {
    if (location.state) {
      setLessonInfo(location.state);

      // KIỂM TRA: Nếu có initialMode là 'detail' và có resultData
      if (location.state.initialMode === 'detail' && location.state.resultData) {
        // Đặt ngay vào chế độ detail với resultData đã có
        setQuizResult(location.state.resultData);
        setQuizMode('detail');
      }
    }
  }, [location]);

  useEffect(() => {
    console.log('QuizFullPage params:', quizId, 'authData:', authData);
    if (!quizId || !authData) {
      navigate('/');
      return;
    }

    const loadQuiz = async () => {
      try {
        setLoading(true);

        // Load quiz data
        const quizRes = await axios.get(`/api/quiz/${quizId}/take`);
        setQuiz(quizRes.data);

        // Nếu không có lessonInfo từ state, try to get from API
        if (!lessonInfo) {
          try {
            const lessonRes = await axios.get(`/api/quiz/${quizId}/lesson-info`);
            if (lessonRes.data) {
              setLessonInfo(lessonRes.data);
            }
          } catch (error) {
            console.log('Không có thông tin bài học đi kèm');
          }
        }

        // NẾU CÓ progressId NHƯNG KHÔNG CÓ resultData: Load result từ API
        if (lessonInfo?.progressId && !lessonInfo?.resultData) {
          try {
            const resultRes = await axios.get(`/api/quiz/${quizId}/result/${lessonInfo.progressId}`);
            setQuizResult(resultRes.data);
            if (lessonInfo.initialMode === 'detail') {
              setQuizMode('detail');
            }
          } catch (error) {
            console.error('Lỗi khi tải kết quả:', error);
            // Nếu không tải được, vẫn để chế độ taking
          }
        }
      } catch (error) {
        console.error('Lỗi khi tải bài kiểm tra:', error);
        alert('Không thể tải bài kiểm tra. Vui lòng thử lại.');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, authData, navigate, lessonInfo]);

  const handleQuizComplete = (result: any) => {
    setQuizResult(result);
    setQuizMode('result');
  };

  if (loading) {
    return (
      <DefaultLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </DefaultLayout>
    );
  }

  if (!quiz) {
    return (
      <DefaultLayout>
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Không tìm thấy bài kiểm tra
          </Typography>
          <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
            Quay lại
          </Button>
        </Container>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Nội dung chính */}
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            mb: 1,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          {quizMode === 'taking' && (
            <LessonQuizTaker
              quizId={quizId!}
              onClose={() => navigate(-1)}
              onComplete={handleQuizComplete}
              questionsPerPage={5}
              enableSaveProgress={true}
              isInLayout={false}
              onFullscreenChange={(isFullscreen) => {
                if (isFullscreen) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'auto';
                }
              }}
            />
          )}

          {quizMode === 'result' && quizResult && (
            <Box sx={{ p: 0 }}>
              <QuizResultSummary
                result={quizResult}
                quiz={quiz}
                onRetake={() => {
                  setQuizMode('taking');
                  setQuizResult(null);
                }}
                onViewDetail={() => {
                  setQuizMode('detail');
                }}
                onClose={() => {
                  navigate(-1);
                }}
              />
            </Box>
          )}

          {quizMode === 'detail' && quizResult && (
            <Box sx={{ p: 0 }}>
              <QuizResultDetail
                quizId={quizResult.quiz_id || quizId!}
                progressId={quizResult.progress_id}
                onClose={() => {
                  // Nếu đến từ xem chi tiết trực tiếp, quay lại trang trước
                  if (lessonInfo?.initialMode === 'detail') {
                    navigate(-1);
                  } else {
                    // Nếu từ result summary, quay lại result
                    setQuizMode('result');
                  }
                }}
                questionsPerPage={5}
              />
            </Box>
          )}
        </Box>
      </Container>
    </DefaultLayout>
  );
}
