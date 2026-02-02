import { useState, useRef, useEffect } from 'react';
import { Box, Grid, Tabs, Tab, Typography, IconButton, ThemeProvider, Button, CircularProgress, TextField, Dialog, Tooltip } from '@mui/material';
import { IconColumns2, IconFlag, IconLayoutSidebar } from '@tabler/icons-react';
import { createTheme } from '@mui/material/styles';
import { CommentTab } from '../pages/EM_CourseDetail/component/EM_CommentTab';
import { ContentTab } from '@/pages/EM_CourseDetail/component/EM_ContentTab';
import { NoteTab } from '@/pages/EM_LearnCourse/component/EM_NoteTab';
import axios from 'axios';
import { ReviewTab } from '@/pages/EM_CourseDetail/component/EM_ReviewTab';
import { DocumentFile } from '@/pages/EM_LearnCourse/component/EM_DocumentFile';
import useVideoAnalytics from '@/hooks/useVideoAnalytics';
import { Document, Page, pdfjs } from 'react-pdf';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logClientMessage } from '@/utils';
import { NotificationType, UserType } from '@/utils/enums';
import { useAuthStore } from '@/hooks/useAuthStore';
import EM_Login from './EM_Login';
import PdfViewerPage from '@/components/EM_PdfViewerPage';
import DynamicBreadcrumb from './EM_BreadCrumb';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LessonQuizCard from '@/pages/quiz/component/LessonQuizCard';
import LessonQuizTaker from '@/pages/quiz/component/LessonQuizTaker';
import LessonQuizPlaceholder from '@/pages/quiz/component/LessonQuizPlaceholder';
import QuizResultSummary from '@/pages/quiz/component/QuizResultSummary';
import QuizResultDetail from '@/pages/quiz/component/QuizResultDetail';
import ReportDialog from './EM_ReportDialog';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface LessonDetailProps {
  lessonId: string;
}

export default function LessonDetail({ lessonId }: LessonDetailProps) {
  interface Document {
    created_at: string;
    document_id: string;
    document_name: string;
    document_url: string;
    extension: string;
    lesson_id: string;
    updated_at: string;
    size: number;
    isDownloadable: boolean;
  }
  const authData = useAuthStore((state) => state.authData);
  const [tab, setTab] = useState(0);
  const [viewMode, setViewMode] = useState('large');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showPdf, setShowPdf] = useState(false);
  const [lessonDetail, setLessonDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [documentContainer, setDocumentContainer] = useState<Document[]>([]);
  // const keyColor = 'oklch(0.5844 0.2596 306.65)';
  const [selectedPdf, setSelectedPdf] = useState<Document | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isPlayVideo, setIsPlayVideo] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [sectionId, setSectionId] = useState('');
  const refEM_Login = useRef<any>(null);
  const buttons = [
    { id: 'small', icon: <IconLayoutSidebar />, title: 'Video nhỏ (4/6)' },
    { id: 'large', icon: <IconColumns2 />, title: 'Video lớn (6/4)' },
  ];
  const [openReport, setOpenReport] = useState(false);
  const navigate = useNavigate();
  const [lessonQuizzes, setLessonQuizzes] = useState<any[]>([]);
  const [quizResults, setQuizResults] = useState<Record<string, any>>({});
  const [quizInProgress, setQuizInProgress] = useState<any>(null);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [quizMode, setQuizMode] = useState<'none' | 'taking' | 'result' | 'detail'>('none');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (!refEM_Login.current) return;

    if (!authData) {
      refEM_Login.current.show();
    }
  }, [authData, refEM_Login.current]);
  useEffect(() => {
    if (!lessonId) return;
    setSelectedPdf(null);
    setShowPdf(false);
    const fetchLesson = async () => {
      try {
        const res = await axios.get(`/api/lesson/LessonById/${lessonId}`);
        setLessonDetail(res.data);
        setCourseId(res.data.section.course_id);
        setCourseName(res.data.section.course.course_name);
        setSectionName(res.data.section.section_title);
        setSectionId(res.data.section.section_id);
        if (Array.isArray(res.data.documents) && res.data.documents.length > 0) {
          setDocumentContainer(res.data.documents);
        } else {
          setDocumentContainer([]);
        }
      } catch (err) {
        console.error('Call api get error :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  useEffect(() => {
    if (documentContainer.length > 0) {
      const pdf = documentContainer.find((d) => d.extension.toLowerCase() === 'pdf') || null;
      if (pdf) {
        let documentUrl = pdf.document_url;

        if (documentUrl.includes('englishmaster')) {
          documentUrl = 'api/file/view/' + documentUrl;
        }
        setSelectedPdf({ ...pdf, document_url: documentUrl });
      } else {
        setSelectedPdf(null);
      }
    }
  }, [documentContainer]);

  useEffect(() => {
    if (!lessonId || !authData) return;

    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`/api/quiz/lesson/${lessonId}`);
        if (res.data && res.data.length > 0) {
          setLessonQuizzes(res.data);
          const results: Record<string, any> = {};

          for (const quiz of res.data) {
            try {
              // Lấy tiến trình đang làm (nếu có)
              const progressRes = await axios.get(`/api/quiz/${quiz.quiz_id}/progress`);
              if (progressRes.data && progressRes.data.status === 1) {
                setQuizInProgress(progressRes.data);
              }
            } catch (err) {
              console.log('Không có tiến trình đang làm cho quiz', quiz.quiz_id);
            }
            try {
              // Lấy kết quả hoàn thành mới nhất
              const resultRes = await axios.get(`/api/quiz/${quiz.quiz_id}/results/latest`);
              if (resultRes.data && resultRes.data.status === 2) {
                // Completed
                results[quiz.quiz_id] = resultRes.data;
                setQuizResults(results);
              }
            } catch (err) {
              console.log('Chưa có kết quả hoàn thành cho quiz', quiz.quiz_id);
            }
          }
        }
      } catch (err) {
        console.error('Lỗi khi lấy danh sách quiz:', err);
      }
    };

    fetchQuizzes();
  }, [lessonId, authData, refreshKey]);

  useEffect(() => {
    setQuizMode('none');
    setActiveQuiz(null);
    setQuizResult(null);
    setQuizInProgress(null);
  }, [lessonId]);

  const getVideoUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('api/file/view')) {
      return url;
    }
    return `/api/file/view/${url}`;
  };

  const [initialWatched, setInitialWatched] = useState(0);
  const [initialCompleted, setInitialCompleted] = useState(1);
  const [initialSegments, setInitialSegments] = useState<number[]>([]); // ex: [[0,10], [20,25]]

  const videoUrl = lessonDetail ? getVideoUrl(lessonDetail.lesson_video) : '';
  const hasVideo = !!videoUrl && !videoError;
  const { saveProgress, getSummary } = useVideoAnalytics(videoRef, hasVideo, videoUrl, authData?.id, courseId, lessonId, initialWatched, initialCompleted, initialSegments);

  const localTabTheme = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            color: '#444',
          },
        },
      },
    },
  });

  const handleChange = (_: any, newValue: number) => setTab(newValue);
  const { left, right } = viewMode === 'small' ? { left: 5, right: 7 } : { left: 7, right: 5 };
  const togglePdf = () => setShowPdf((prev) => !prev);

  // const handleFullScreen = () => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   if (!document.fullscreenElement) {
  //     video.requestFullscreen().catch((err) => {
  //       console.error('Không thể bật full screen:', err);
  //     });
  //   } else {
  //     document.exitFullscreen();
  //   }
  // };

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.2);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      // if (e.key === 'F12') {
      //   e.preventDefault();
      //   return false;
      // }

      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'J') {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (view source)
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (save as)
      if (e.ctrlKey && e.key.toUpperCase() === 'S') {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveProgress(); // gọi API cập nhật progress
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log('Before unload event', e);
      saveProgress(); // gọi API cập nhật progress
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!authData || !lessonId || !courseId) return;
      try {
        const res = await axios.get('/api/lesson/user-lesson-progress', {
          params: {
            user_id: authData?.id,
            lesson_id: lessonId,
            course_id: courseId,
          },
        });

        const progress = res.data;
        if (Array.isArray(progress.segments)) {
          //  const flat = progress.segments.flatMap(([start , end]) => Array.from({ length: Math.floor(end - start) }, (_, i) => Math.floor(start + i)));
          setIsPlayVideo(progress.watched_seconds > 0);
          setInitialWatched(progress.watched_seconds || 0);
          setInitialCompleted(progress.completed || 1);
          setInitialSegments(progress.segments);
        } else {
          setIsPlayVideo(false);
          setInitialWatched(0);
          setInitialCompleted(1);
          setInitialSegments([]);
        }
      } catch (err) {
        console.error('Không thể tải tiến độ:', err);
      }
    };

    fetchProgress();
  }, [authData, lessonId, courseId]);

  if (!authData || !authData.id) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="api/file/view/englishmaster/Images/pexels-njeromin-19196727.jpg"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <EM_Login ref={refEM_Login} />
      </Box>
    );
  }

  // Early return phải ở CUỐI cùng, sau tất cả hook
  if (loading || !lessonDetail) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'white',
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'rgb(var(--bg-primary))', minHeight: '100vh', p: 2 }}>
      <EM_Login ref={refEM_Login} />
      <DynamicBreadcrumb lessonId={lessonId} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            width: {
              xs: '100%',
              md: viewMode === 'small' ? '40%' : '60%',
            },
          }}
        >
          {/* <Typography variant="h5" sx={{ fontWeight: 600 }} className="uppercase">
            {sectionName} <PlayArrowIcon style={{ fontSize: '1.4rem' }} /> <span style={{ fontWeight: 300, textTransform: 'none' }}>{lessonDetail.lesson_title}</span>
          </Typography> */}
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, alignItems: 'center', height: 40, border: '1px solid rgba(83, 87, 94, 1)', borderRadius: '8px', overflow: 'hidden' }}>
          <Box
            sx={{
              px: 2,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: 'nowrap',
            }}
          >
            Chế độ xem
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: 90,
              height: 40,
              // border: '1px solid rgba(81, 86, 94, 1)',
              overflow: 'hidden',
            }}
            className="dark:border-white-600"
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 1,
                width: 45,
                height: 'calc(100% )',
                borderRadius: '6px',
                backgroundImage: 'linear-gradient(to right, rgb(139, 92, 246), rgb(124, 58, 237))',
                zIndex: 0,
                transition: 'all 0.3s ease',
                transform: `translateX(${buttons.findIndex((b) => b.id === viewMode) * 45}px)`,
              }}
            />

            {buttons.map((btn) => (
              <IconButton
                key={btn.id}
                onClick={() => {
                  setViewMode(btn.id);
                }}
                title={btn.title}
                sx={{
                  zIndex: 1,
                  color: viewMode === btn.id ? 'white' : '#444',
                  transition: 'all 0.3s ease',
                }}
                className="dark:text-white"
              >
                {btn.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={left}>
          {hasVideo ? (
            <>
              <Box sx={{ width: '100%', bgcolor: 'black', aspectRatio: '16/9' }}>
                {videoError ? (
                  <Box sx={{ color: 'white', textAlign: 'center', p: 3 }}>
                    <Typography>Không thể tải video. Vui lòng thử lại sau.</Typography>
                    <Button variant="contained" onClick={() => setVideoError(false)} sx={{ mt: 2 }}>
                      Thử lại
                    </Button>
                  </Box>
                ) : (
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onPlay={() => {
                      if (authData && !isPlayVideo) {
                        logClientMessage(`Bạn xem video`, `Bạn ${authData?.name} vừa mở video (${lessonDetail.lesson_title} - ${sectionName}) trong khóa học ${courseName}`, authData?.id, UserType.USER, lessonId, courseId, NotificationType.SYSTEM);
                      }
                      setIsPlayVideo(true);
                    }}
                    onPause={() => {
                      saveProgress();
                    }}
                    onEnded={() => {
                      if (!authData) return;
                      const summary = getSummary();
                      if (summary.percent > 90) {
                        authData && initialCompleted == 1 && logClientMessage(`Bạn xem hết video`, `Bạn ${authData?.name} xem hết video (${lessonDetail.lesson_title} - ${sectionName}) trong khóa học ${courseName}`, authData?.id, UserType.USER, lessonId, courseId, NotificationType.SYSTEM);
                      } else {
                        console.log('Không đủ 90% → có tua');
                      }
                      saveProgress();
                    }}
                    onError={(e) => {
                      console.log('Video error event:', e);
                      // logClientMessage(e.currentTarget.error, 'info');
                      setVideoError(true);
                    }}
                  />
                )}
              </Box>

              {lessonQuizzes.length > 0 && (
                <Box sx={{ px: 3, py: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5 }}>
                    Bài kiểm tra
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {lessonQuizzes.map((quiz) => (
                      <LessonQuizCard
                        key={quiz.quiz_id}
                        quiz={quiz}
                        result={quizResults[quiz.quiz_id]}
                        onClick={() => {
                          if (quizResults[quiz.quiz_id]) {
                            setActiveQuiz(quiz);
                            setQuizResult(quizResults[quiz.quiz_id]);
                            setQuizMode('result');
                          } else {
                            setActiveQuiz(quiz);
                            setQuizMode('taking');
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </>
          ) : (
            !hasVideo &&
            lessonQuizzes.length > 0 && (
              <LessonQuizPlaceholder
                quiz={lessonQuizzes[0]}
                latestResult={quizResults[lessonQuizzes[0].quiz_id]}
                inProgress={quizInProgress}
                onStart={() => {
                  if (lessonQuizzes[0]?.quiz_id) {
                    navigate(`/quiz/${lessonQuizzes[0].quiz_id}/full`, {
                      state: {
                        courseId,
                        courseName,
                        sectionName,
                        lessonTitle: lessonDetail.lesson_title,
                        sectionId,
                      },
                    });
                  }
                }}
                onContinue={() => {
                  navigate(`/quiz/${lessonQuizzes[0].quiz_id}/full`, {
                    state: {
                      courseId,
                      courseName,
                      sectionName,
                      lessonTitle: lessonDetail.lesson_title,
                      sectionId,
                    },
                  });
                }}
                onViewResult={() => {
                  const result = quizResults[lessonQuizzes[0].quiz_id];
                  if (result) {
                    navigate(`/quiz/${lessonQuizzes[0].quiz_id}/full`, {
                      state: {
                        courseId,
                        courseName,
                        sectionName,
                        lessonTitle: lessonDetail.lesson_title,
                        sectionId,
                        initialMode: 'detail',
                        progressId: result.progress_id,
                        resultData: result,
                      },
                    });
                  }
                }}
              />
            )
          )}

          <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 2 }}>
            <ThemeProvider theme={localTabTheme}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                {/* LEFT: Tabs */}
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="inherit"
                  sx={{
                    flex: 1,
                    '& .MuiTab-root': {
                      minWidth: 'auto',
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                    },
                    '@media (max-width: 480px)': {
                      '& .MuiTab-root': {
                        padding: '6px 8px',
                        fontSize: '0.75rem',
                      },
                    },
                  }}
                >
                  <Tab className="dark:text-white" label="Ghi chú" />
                  <Tab className="dark:text-white" label="Thảo luận" />
                  <Tab className="dark:text-white" label="Đánh giá" />
                  <Tab className="dark:text-white" label="Tài liệu" />
                </Tabs>

                {/* RIGHT: Report Button */}
                <Tooltip title="Báo cáo bài học" arrow placement="bottom">
                  <Button
                    variant="outlined"
                    disabled={!authData}
                    color="error"
                    onClick={() => {
                      videoRef.current?.pause();
                      setOpenReport(true);
                    }}
                    sx={{
                      fontWeight: 600,
                      textTransform: 'none',
                      minWidth: 40,
                      height: 36,
                    }}
                  >
                    <IconFlag />
                  </Button>
                </Tooltip>
              </Box>
            </ThemeProvider>

            <Box sx={{ mt: 3 }}>
              {tab === 0 && <NoteTab videoRef={videoRef} lesson_id={lessonId} />}
              {tab === 1 && <CommentTab lessonId={lessonId} />}
              {tab === 2 && <ReviewTab courseId={courseId} />}
              {tab === 3 && (
                <DocumentFile
                  documents={documentContainer}
                  onSelectDocument={(doc) => {
                    let url = doc.document_url;
                    if (url.includes('englishmaster')) url = 'api/file/view/' + url;

                    setSelectedPdf({ ...doc, document_url: url });
                    setShowPdf(true);
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={right}>
          {/* Làm quiz */}
          {quizMode === 'taking' && activeQuiz && (
            <Box sx={{ height: { xs: 'auto', md: 'calc(100vh - 180px)' }, position: 'sticky', top: 0 }}>
              <LessonQuizTaker
                quizId={activeQuiz.quiz_id}
                onClose={() => {
                  setQuizMode('none');
                  setActiveQuiz(null);
                }}
                onComplete={(result) => {
                  setQuizResult(result);
                  setQuizMode('result');
                }}
                questionsPerPage={1}
              />
            </Box>
          )}

          {/* Tổng quan kết quả */}
          {quizMode === 'result' && quizResult && activeQuiz && (
            <Box sx={{ mb: 2 }}>
              <QuizResultSummary
                result={quizResult}
                quiz={activeQuiz}
                onRetake={() => {
                  setQuizMode('taking');
                }}
                onViewDetail={() => {
                  setQuizMode('detail');
                }}
                onClose={() => {
                  setQuizMode('none');
                  setActiveQuiz(null);
                  setQuizResult(null);
                }}
              />
            </Box>
          )}

          {/* Đáp án chi tiết */}
          {quizMode === 'detail' && quizResult && (
            <Box sx={{ height: { xs: 'auto', md: 'calc(100vh - 180px)' }, position: 'sticky', top: 16, overflow: 'hidden' }}>
              <QuizResultDetail
                quizId={quizResult.quiz_id}
                progressId={quizResult.progress_id}
                onClose={() => {
                  setQuizMode('none');
                  setActiveQuiz(null);
                  setQuizResult(null);
                }}
                questionsPerPage={1}
              />
            </Box>
          )}

          {quizMode !== 'taking' && quizMode !== 'detail' && (
            <Box
              className="dark:bg-gray-800"
              sx={{
                // height: '100%',
                borderRadius: 2,
              }}
            >
              {/* Nút hiện/ẩn tài liệu PDF */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  gap: '1rem',
                }}
              >
                {selectedPdf && (
                  <Button
                    onClick={togglePdf}
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgb(244, 12, 68)',
                      textTransform: 'none',
                      minWidth: '110px',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: '#45A049',
                      },
                    }}
                  >
                    {showPdf ? 'Ẩn tài liệu' : 'Hiện tài liệu'}
                  </Button>
                )}

                {selectedPdf && showPdf && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    className="dark:text-white"
                  >
                    {selectedPdf?.document_name}
                  </Typography>
                )}
              </Box>

              {showPdf && selectedPdf && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mb: '0.5em',
                  }}
                >
                  <Tooltip title="Toàn màn hình">
                    <IconButton className="border dark:border-purple-600 dark:text-white" onClick={() => setOpenDialog(true)}>
                      <FullscreenIcon />
                    </IconButton>
                  </Tooltip>

                  <Typography sx={{ color: 'gray', fontWeight: 200 }}> | </Typography>

                  <Tooltip title={showSidebar ? 'Ẩn danh sách trang' : 'Hiện danh sách trang'}>
                    <IconButton className="border dark:border-purple-600 dark:text-white" onClick={() => setShowSidebar((prev) => !prev)}>
                      {showSidebar ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                  </Tooltip>

                  <Typography sx={{ color: 'gray', fontWeight: 200 }}> | </Typography>

                  <Tooltip title="Thu nhỏ">
                    <IconButton className="border dark:border-purple-600 dark:text-white" onClick={() => setScale((z) => Math.max(0.6, z - 0.2))}>
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>

                  <Typography
                    sx={{
                      color: 'black',
                      bgcolor: 'white',
                      border: '1px solid white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '6px',
                      fontWeight: 600,
                      minWidth: '60px',
                      textAlign: 'center',
                    }}
                  >
                    {Math.round(scale * 100)}%
                  </Typography>

                  <Tooltip title="Phóng to">
                    <IconButton className="border dark:border-purple-600 dark:text-white" onClick={() => setScale((z) => Math.min(3, z + 0.2))}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>

                  <Typography sx={{ color: 'gray', fontWeight: 200 }}> | </Typography>
                  {/* JUMP TO PAGE */}
                  <Box sx={{ ml: '1em', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography className="dark:text-white">Đi tới trang:</Typography>
                    <TextField
                      size="small"
                      type="number"
                      sx={{
                        width: 80,
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                          WebkitAppearance: 'auto',
                          opacity: 1,
                          display: 'block',
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                          border: '1px solid white',
                          borderRadius: '0.5rem',
                        },

                        '.dark & .MuiInputBase-input': {
                          color: 'white',
                          borderColor: 'white',
                        },
                      }}
                      value={pageNumber}
                      onChange={(e) => {
                        let page = Number(e.target.value);
                        if (page >= 1 && page <= numPages) setPageNumber(page);
                      }}
                    />
                    <Typography className="dark:text-white">/ {numPages}</Typography>
                  </Box>
                </Box>
              )}
              {showPdf && selectedPdf && (
                <Box
                  sx={{
                    width: '100%',
                    height: '75vh',
                    bgcolor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    p: 2,
                    display: 'flex',
                    mb: '1em',
                  }}
                >
                  {showSidebar && (
                    <Box
                      sx={{
                        width: 120,
                        overflowY: 'auto',
                        borderRight: '1px solid #ddd',
                        p: 1,
                      }}
                    >
                      <Document file={selectedPdf.document_url}>
                        {Array.from(new Array(numPages), (_, i) => (
                          <Box
                            key={i + 1}
                            sx={{
                              mb: '1.5em',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                            onClick={() => setPageNumber(i + 1)}
                          >
                            <Page pageNumber={i + 1} width={120} renderTextLayer={false} renderAnnotationLayer={false} />
                            <Typography className="dark:text-black"> {i + 1}</Typography>
                          </Box>
                        ))}
                      </Document>
                    </Box>
                  )}
                  {/* ------------------ RIGHT SIDE: PDF Content ------------------ */}
                  <Box
                    sx={{
                      flex: 1,
                      overflow: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                    }}
                  >
                    {/* PDF */}
                    <Document file={selectedPdf.document_url} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
                    </Document>
                  </Box>
                </Box>
              )}

              {/* CONTENT TAB */}
              <ContentTab courseId={courseId} courseName={courseName} showSectionFilter defaultSectionId={sectionId} showSearch={false} refreshKey={refreshKey} onActivated={() => setRefreshKey((prev) => prev + 1)} />
            </Box>
          )}
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { bgcolor: 'black' },
        }}
      >
        {selectedPdf && <PdfViewerPage document={selectedPdf} closeDialog={() => setOpenDialog(false)} />}
      </Dialog>
      <ReportDialog open={openReport} onClose={() => setOpenReport(false)} courseId={courseId} lessonId={lessonId} lessonTitle={lessonDetail?.lesson_title} sectionName={sectionName} />
    </Box>
  );
}
