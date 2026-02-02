import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup, LinearProgress, Chip, IconButton, Paper, Tooltip, Dialog, DialogContent, Alert, Fade, Modal, Portal, Snackbar, Avatar, Divider } from '@mui/material';
import { IconClock, IconArrowLeft, IconArrowRight, IconDeviceFloppy, IconFlagFilled, IconMaximize, IconMinimize, IconPennantFilled, IconPennant } from '@tabler/icons-react';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';

interface Answer {
  answer_id: string;
  answer_text: string;
}

interface Question {
  question_id: string;
  question_text: string;
  question_type: number;
  points: number;
  answers: Answer[];
}

interface Quiz {
  quiz_id: string;
  title: string;
  duration_minutes?: number;
  passing_score: number;
  questions: Question[];
}

interface LessonQuizTakerProps {
  quizId: string;
  onClose: () => void;
  onComplete: (result: any) => void;
  questionsPerPage?: number;
  enableSaveProgress?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  isFullscreenControlled?: boolean;
  isInLayout?: boolean;
}

export default function LessonQuizTaker({ quizId, onClose, onComplete, questionsPerPage = 1, enableSaveProgress = false, onFullscreenChange, isFullscreenControlled = false, isInLayout = true }: LessonQuizTakerProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [savingProgress, setSavingProgress] = useState(false);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const { authData } = useAuthStore();

  // refs
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  // snackbar
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // COMPACT MODE: Điều kiện hiển thị gọn (khi ở trong layout và không fullscreen)
  const isCompactMode = isInLayout && !fullscreen;

  // Load initial flagged questions
  useEffect(() => {
    const savedFlags = localStorage.getItem(`quiz_${quizId}_flags`);
    if (savedFlags) {
      setFlaggedQuestions(JSON.parse(savedFlags));
    }
  }, [quizId]);

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          setShowSubmitDialog(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle fullscreen change callback
  useEffect(() => {
    if (onFullscreenChange) {
      onFullscreenChange(fullscreen);
    }

    if (isInLayout && fullscreen) {
      document.body.classList.add('quiz-fullscreen-active');
    } else {
      document.body.classList.remove('quiz-fullscreen-active');
    }

    return () => {
      document.body.classList.remove('quiz-fullscreen-active');
    };
  }, [fullscreen, onFullscreenChange, isInLayout]);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
  };

  const loadQuiz = async () => {
    try {
      const res = await axios.get(`/api/quiz/${quizId}/take`);
      setQuiz(res.data);
      if (res.data.duration_minutes) {
        setTimeLeft(res.data.duration_minutes * 60);
      }

      // Reset flagged questions khi bắt đầu quiz mới
      localStorage.removeItem(`quiz_${quizId}_flags`);
      setFlaggedQuestions([]);

      if (enableSaveProgress) {
        await loadProgress(res.data);
      } else {
        setUserAnswers({});
        setCurrentPage(1);
        setProgressId(null);
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      showSnackbar('Không thể tải quiz', 'error');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const loadProgress = async (quizData: Quiz) => {
    try {
      const response = await axios.get(`/api/quiz/${quizId}/progress`);
      if (response.data && response.data.progress_id) {
        setProgressId(response.data.progress_id);

        if (response.data.answers && response.data.answers.length > 0) {
          const loadedAnswers = response.data.answers.reduce((acc: Record<string, string[]>, answer: any) => {
            acc[answer.question_id] = answer.selected_answer_ids || [];
            return acc;
          }, {});
          setUserAnswers(loadedAnswers);
          showSnackbar('Đã tải tiến trình đã lưu trước đó', 'info');
        } else {
          setUserAnswers({});
        }

        if (response.data.time_spent) {
          setTimeLeft(quizData.duration_minutes ? quizData.duration_minutes * 60 - response.data.time_spent : null);
        }
        if (response.data.current_question !== undefined) {
          const savedPage = Math.floor(response.data.current_question / questionsPerPage) + 1;
          setCurrentPage(savedPage);
        }
      } else {
        await startQuiz();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      await startQuiz();
    }
  };

  const startQuiz = async () => {
    try {
      const response = await axios.post(`/api/quiz/${quizId}/start`);
      if (response.data.progress_id) {
        setProgressId(response.data.progress_id);
        setUserAnswers({});
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      showSnackbar('Lỗi khi bắt đầu làm quiz', 'error');
    }
  };

  const saveProgress = async () => {
    if (!quiz || !progressId || savingProgress) return;

    setSavingProgress(true);
    try {
      const answersArray = Object.entries(userAnswers).map(([question_id, selected_answer_ids]) => ({
        question_id,
        selected_answer_ids,
      }));

      const currentQuestionIndex = (currentPage - 1) * questionsPerPage;

      await axios.post(`/api/quiz/${quizId}/save-progress`, {
        progress_id: progressId,
        current_question: currentQuestionIndex,
        answers: answersArray,
        time_spent: quiz.duration_minutes ? quiz.duration_minutes * 60 - (timeLeft || 0) : 0,
      });

      return true;
    } catch (error: any) {
      console.error('Error saving progress:', error.response?.data || error.message);
      return false;
    } finally {
      setSavingProgress(false);
    }
  };

  const handleSaveConfirmOpen = () => {
    setShowSaveConfirmDialog(true);
  };

  const handleSaveConfirmClose = () => {
    setShowSaveConfirmDialog(false);
  };

  const handleSaveConfirm = (closeAfterSave = false) => {
    handleSaveConfirmClose();
    saveProgress().then(() => {
      showSnackbar('Đã lưu tiến trình thành công!', 'success');

      if (closeAfterSave) {
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    });
  };

  const handleAnswerChange = (questionId: string, answerId: string, isMultiple: boolean) => {
    if (isTimeUp) return;

    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      if (isMultiple) {
        const current = newAnswers[questionId] || [];
        newAnswers[questionId] = current.includes(answerId) ? current.filter((id) => id !== answerId) : [...current, answerId];
      } else {
        newAnswers[questionId] = [answerId];
      }
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    if (submitting || !quiz) return;
    setSubmitting(true);
    setShowSubmitDialog(false);

    try {
      const answersArray = Object.entries(userAnswers).map(([question_id, selected_answer_ids]) => ({
        question_id,
        selected_answer_ids,
      }));

      const res = await axios.post(`/api/quiz/${quizId}/submit`, {
        progress_id: progressId,
        answers: answersArray,
        time_spent: quiz.duration_minutes ? quiz.duration_minutes * 60 - (timeLeft || 0) : 0,
      });

      onComplete(res.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      showSnackbar('Lỗi khi nộp bài', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!reportContent.trim() || !currentQuestionId) return;

    setSubmittingReport(true);
    try {
      await axios.post(`/api/quiz/questions/${currentQuestionId}/report`, {
        content: reportContent,
        type: 'content_issue',
        quiz_id: quizId,
      });
      showSnackbar('Báo cáo đã được gửi thành công!', 'success');
      setReportContent('');
      setShowReportDialog(false);
      setCurrentQuestionId(null);
    } catch (error) {
      console.error('Error reporting question:', error);
      showSnackbar('Lỗi khi gửi báo cáo', 'error');
    } finally {
      setSubmittingReport(false);
    }
  };

  const scrollToQuestion = (questionId: string) => {
    if (isTimeUp) return;

    const questionElement = questionRefs.current[questionId];
    if (!questionElement) return;

    const container = fullscreen ? fullscreenContainerRef.current : containerRef.current;

    if (container) {
      const questionRect = questionElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollTop = questionRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: scrollTop - 50,
        behavior: 'smooth',
      });
    } else {
      questionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnswerLabel = (index: number) => String.fromCharCode(65 + index);

  const getCurrentPageQuestions = () => {
    if (!quiz) return [];

    if (questionsPerPage === 1) {
      return quiz.questions;
    }

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return quiz.questions.slice(startIndex, endIndex);
  };

  const totalPages = quiz ? Math.ceil(quiz.questions.length / (questionsPerPage === 1 ? quiz.questions.length : questionsPerPage)) : 1;

  const handleFlagQuestion = (questionId: string) => {
    if (isTimeUp) return;

    setFlaggedQuestions((prev) => {
      const newFlags = prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId];
      localStorage.setItem(`quiz_${quizId}_flags`, JSON.stringify(newFlags));
      return newFlags;
    });
  };

  const getStats = useCallback(() => {
    if (!quiz) return { answered: 0, flagged: 0, total: 0 };

    const answeredCount = Object.keys(userAnswers).length;
    const flaggedCount = flaggedQuestions.length;

    return {
      answered: answeredCount,
      flagged: flaggedCount,
      total: quiz.questions.length,
    };
  }, [quiz, userAnswers, flaggedQuestions]);

  const handleToggleFullscreen = () => {
    if (isTimeUp) return;

    if (isFullscreenControlled && onFullscreenChange) {
      onFullscreenChange(!fullscreen);
    } else {
      setFullscreen(!fullscreen);
    }
  };

  if (loading || !quiz) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Đang tải quiz...</Typography>
      </Box>
    );
  }

  const handleExitWithoutSave = () => {
    setShowExitConfirm(false);
    onClose();
  };

  const handleExitAndSave = async () => {
    setShowExitConfirm(false);
    setSavingProgress(true);
    try {
      await saveProgress();
      onClose();
    } catch (error) {
      showSnackbar('Lỗi khi lưu tiến trình', 'error');
      setSavingProgress(false);
    }
  };

  const currentQuestions = getCurrentPageQuestions();
  const showPageNavigation = questionsPerPage > 1;
  const stats = getStats();
  const unansweredCount = stats.total - stats.answered;

  // Render câu hỏi với điều chỉnh cho compact mode
  const renderQuestion = (question: Question, globalIndex: number, isFullscreenMode: boolean) => {
    const isFlagged = flaggedQuestions.includes(question.question_id);

    return (
      <Box
        key={question.question_id}
        ref={(el) => {
          questionRefs.current[question.question_id] = el as HTMLDivElement | null;
        }}
        sx={{
          mb: isFullscreenMode ? 3 : isCompactMode ? 1.5 : 2,
          opacity: isTimeUp ? 0.6 : 1,
          pointerEvents: isTimeUp ? 'none' : 'auto',
        }}
      >
        <Paper
          sx={{
            p: isFullscreenMode ? 2 : isCompactMode ? 1 : 2,
            borderRadius: 2,
            borderLeft: isFlagged ? '4px solid #ff4444' : '4px solid #667eea',
            position: 'relative',
            mx: isCompactMode ? 0 : 1,
          }}
        >
          {/* Header câu hỏi - điều chỉnh cho compact mode */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: isCompactMode ? 0.75 : 1,
              ml: isFullscreenMode ? 1 : 0,
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={`Câu ${globalIndex + 1}`}
                size="small"
                color="primary"
                sx={{
                  height: isCompactMode ? 20 : 22,
                  fontSize: isCompactMode ? '0.7rem' : '0.75rem',
                  fontWeight: 500,
                }}
              />
              {question.question_type === 2 && (
                <Chip
                  label="Nhiều đáp án"
                  size="small"
                  color="warning"
                  sx={{
                    height: isCompactMode ? 20 : 22,
                    fontSize: isCompactMode ? '0.7rem' : '0.75rem',
                  }}
                />
              )}
              {isFlagged && (
                <Chip
                  icon={<IconPennantFilled size={10} />}
                  label="Đã đánh dấu"
                  size="small"
                  color="error"
                  sx={{
                    height: isCompactMode ? 20 : 22,
                    fontSize: isCompactMode ? '0.7rem' : '0.75rem',
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title={isFlagged ? 'Bỏ đánh dấu' : 'Đánh dấu câu hỏi'}>
                <IconButton
                  size="small"
                  onClick={() => handleFlagQuestion(question.question_id)}
                  sx={{
                    color: isFlagged ? '#ff4444' : 'inherit',
                    padding: isCompactMode ? '4px' : '8px',
                  }}
                  disabled={isTimeUp}
                >
                  {isFlagged ? <IconPennantFilled size={14} /> : <IconPennant size={14} />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Báo cáo câu hỏi">
                <IconButton
                  size="small"
                  onClick={() => {
                    setCurrentQuestionId(question.question_id);
                    setShowReportDialog(true);
                  }}
                  sx={{ color: 'warning.main', padding: isCompactMode ? '4px' : '8px' }}
                  disabled={isTimeUp}
                >
                  <IconFlagFilled size={12} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Nội dung câu hỏi - Font size vừa đủ đọc trong compact mode */}
          <Typography
            variant="body1"
            sx={{
              mb: isCompactMode ? 1.25 : 2,
              ml: isFullscreenMode ? 2 : 0,
              fontSize: isFullscreenMode ? '1rem' : isCompactMode ? '0.9rem' : '0.95rem',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {question.question_text}
          </Typography>

          {/* Đáp án - Giữ padding đủ để dễ chọn */}
          {question.question_type === 2 ? (
            <FormGroup>
              {question.answers.map((answer, idx) => (
                <FormControlLabel
                  key={answer.answer_id}
                  control={<Checkbox sx={{ ml: isFullscreenMode ? 4 : 0 }} checked={userAnswers[question.question_id]?.includes(answer.answer_id) || false} onChange={() => handleAnswerChange(question.question_id, answer.answer_id, true)} size="small" disabled={isTimeUp} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          mr: 0.5,
                          color: 'primary.main',
                          minWidth: 20,
                          fontSize: isFullscreenMode ? '0.95rem' : isCompactMode ? '0.85rem' : '0.9rem',
                        }}
                      >
                        {getAnswerLabel(idx)}.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: isFullscreenMode ? '0.95rem' : isCompactMode ? '0.85rem' : '0.9rem',
                        }}
                      >
                        {answer.answer_text}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    p: isCompactMode ? 0.75 : 1,
                    mb: isCompactMode ? 0.5 : 1,
                    border: '1px solid',
                    borderColor: userAnswers[question.question_id]?.includes(answer.answer_id) ? 'primary.main' : '#e0e0e0',
                    borderRadius: 1,
                    bgcolor: userAnswers[question.question_id]?.includes(answer.answer_id) ? 'primary.50' : 'white',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: isTimeUp ? '' : userAnswers[question.question_id]?.includes(answer.answer_id) ? 'primary.100' : 'grey.50',
                      borderColor: isTimeUp ? '' : 'primary.main',
                    },
                  }}
                />
              ))}
            </FormGroup>
          ) : (
            <RadioGroup value={userAnswers[question.question_id]?.[0] || ''} onChange={(e) => handleAnswerChange(question.question_id, e.target.value, false)}>
              {question.answers.map((answer, idx) => (
                <FormControlLabel
                  key={answer.answer_id}
                  value={answer.answer_id}
                  control={<Radio size="small" sx={{ ml: isFullscreenMode ? 4 : 0 }} disabled={isTimeUp} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          mr: 0.5,
                          color: 'primary.main',
                          minWidth: 20,
                          fontSize: isFullscreenMode ? '0.95rem' : isCompactMode ? '0.85rem' : '0.9rem',
                        }}
                      >
                        {getAnswerLabel(idx)}.
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: isFullscreenMode ? '0.95rem' : isCompactMode ? '0.85rem' : '0.9rem',
                        }}
                      >
                        {answer.answer_text}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    p: isCompactMode ? 0.75 : 1,
                    mb: isCompactMode ? 0.5 : 1,
                    border: '1px solid',
                    borderColor: userAnswers[question.question_id]?.[0] === answer.answer_id ? 'primary.main' : '#e0e0e0',
                    borderRadius: 1,
                    bgcolor: userAnswers[question.question_id]?.[0] === answer.answer_id ? 'primary.50' : 'white',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: isTimeUp ? '' : userAnswers[question.question_id]?.[0] === answer.answer_id ? 'primary.100' : 'grey.50',
                      borderColor: isTimeUp ? '' : 'primary.main',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          )}
        </Paper>
      </Box>
    );
  };

  // Render navigation cho questionsPerPage = 1 (bình thường) - nhỏ gọn hơn
  const renderSinglePageNavigation = () => {
    if (questionsPerPage !== 1 || !quiz) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 0.5,
          mt: isCompactMode ? 0.5 : 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: isCompactMode ? 0.25 : 0.5,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {quiz.questions.map((q, idx) => {
            const isAnswered = !!userAnswers[q.question_id];
            const isFlagged = flaggedQuestions.includes(q.question_id);

            return (
              <Tooltip key={q.question_id} title={`Câu ${idx + 1}`}>
                <Box
                  onClick={() => !isTimeUp && scrollToQuestion(q.question_id)}
                  sx={{
                    width: isCompactMode ? 24 : 26,
                    height: isCompactMode ? 24 : 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: isFlagged ? '#ff4444' : isAnswered ? '#4CAF50' : 'rgba(255,255,255,0.5)',
                    bgcolor: isAnswered ? '#4CAF50' : isFlagged ? 'rgba(244, 67, 54, 0.3)' : 'transparent',
                    color: isAnswered || isFlagged ? 'white' : 'rgb(var(--text-primary))',
                    fontSize: isCompactMode ? '0.7rem' : '0.7rem',
                    fontWeight: isFlagged ? 'bold' : 'normal',
                    cursor: isTimeUp ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    opacity: isTimeUp ? 0.6 : 1,
                    '&:hover': {
                      bgcolor: isTimeUp ? '' : isAnswered ? '#45a049' : isFlagged ? 'rgba(244, 67, 54, 0.5)' : 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  {idx + 1}
                  {isFlagged && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#ff4444',
                        border: '1px solid white',
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Render dialogs (giữ nguyên)
  const renderDialogs = () => {
    return (
      <>
        {/* Dialog xác nhận nộp bài */}
        <Modal
          open={showSubmitDialog}
          onClose={isTimeUp ? undefined : () => setShowSubmitDialog(false)}
          closeAfterTransition
          disableEscapeKeyDown={isTimeUp}
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0,0,0,0.7)' },
            onClick: isTimeUp ? undefined : () => setShowSubmitDialog(false),
          }}
        >
          <Fade in={showSubmitDialog}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 500 },
                maxHeight: '90vh',
                overflow: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                {isTimeUp ? 'Hết giờ làm bài!' : 'Xác nhận nộp bài?'}
              </Typography>
              <Typography sx={{ mb: 3 }}>{isTimeUp ? 'Thời gian làm bài đã kết thúc. Vui lòng nộp bài ngay.' : 'Bài làm của bạn sẽ được nộp ngay lập tức và không thể chỉnh sửa sau khi nộp.'}</Typography>

              <Box sx={{ mb: 3 }}>
                <Typography fontWeight="bold">Thống kê:</Typography>
                <Typography>
                  ✅ Đã trả lời: {stats.answered}/{stats.total} câu
                </Typography>
                <Typography>🚩 Câu đánh dấu: {stats.flagged} câu</Typography>
                {timeLeft !== null && <Typography>⏱️ Thời gian còn lại: {formatTime(timeLeft)}</Typography>}
              </Box>

              {unansweredCount > 0 && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Bạn còn {unansweredCount} câu chưa trả lời!
                </Alert>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {!isTimeUp && (
                  <Button onClick={() => setShowSubmitDialog(false)} variant="outlined">
                    Tiếp tục làm bài
                  </Button>
                )}
                <Button onClick={handleSubmit} variant="contained" color="success" disabled={submitting}>
                  {submitting ? 'Đang nộp...' : 'Xác nhận nộp'}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        {/* Report Modal */}
        <Modal
          open={showReportDialog}
          onClose={() => {
            if (isTimeUp) return;
            setShowReportDialog(false);
            setCurrentQuestionId(null);
          }}
          closeAfterTransition
          disableEscapeKeyDown={isTimeUp}
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0,0,0,0.7)' },
            onClick: isTimeUp
              ? undefined
              : () => {
                  setShowReportDialog(false);
                  setCurrentQuestionId(null);
                },
          }}
        >
          <Fade in={showReportDialog}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 500 },
                maxHeight: '90vh',
                overflow: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Báo cáo câu hỏi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Mô tả vấn đề với câu hỏi này:
              </Typography>

              <textarea
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                placeholder="Nhập nội dung báo cáo..."
                disabled={isTimeUp}
                style={{
                  width: '100%',
                  minHeight: 120,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  marginBottom: '20px',
                  opacity: isTimeUp ? 0.6 : 1,
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  onClick={() => {
                    setShowReportDialog(false);
                    setCurrentQuestionId(null);
                    setReportContent('');
                  }}
                  variant="outlined"
                  disabled={isTimeUp}
                >
                  Hủy
                </Button>
                <Button onClick={handleSubmitReport} variant="contained" color="warning" disabled={submittingReport || !reportContent.trim() || isTimeUp}>
                  {submittingReport ? 'Đang gửi...' : 'Gửi báo cáo'}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <Modal
          open={showSaveConfirmDialog}
          onClose={handleSaveConfirmClose}
          closeAfterTransition
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0,0,0,0.7)' },
            onClick: handleSaveConfirmClose,
          }}
        >
          <Fade in={showSaveConfirmDialog}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 500 },
                maxHeight: '90vh',
                overflow: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Xác nhận lưu tiến trình
              </Typography>

              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                  whiteSpace: 'pre-line',
                }}
              >
                {`Bạn có chắc muốn lưu tiến trình hiện tại?\n` + `✅ Đã trả lời: ${stats.answered}/${stats.total} câu\n` + `🚩 Câu đánh dấu: ${stats.flagged} câu\n` + `⏱️ Thời gian còn lại: ${timeLeft ? formatTime(timeLeft) : 'Không giới hạn'}\n` + `📄 Trang hiện tại: ${currentPage}/${totalPages}`}
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                Bạn có thể lưu tiến trình để tiếp tục làm bài sau hoặc lưu và đóng quiz ngay.
              </Alert>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleSaveConfirmClose} variant="outlined" disabled={savingProgress}>
                  Hủy
                </Button>
                <Button onClick={() => handleSaveConfirm(false)} variant="contained" color="primary" disabled={savingProgress} startIcon={<IconDeviceFloppy size={16} />}>
                  {savingProgress ? 'Đang lưu...' : 'Lưu tiến trình'}
                </Button>
                <Button onClick={() => handleSaveConfirm(true)} variant="contained" color="success" disabled={savingProgress} startIcon={<IconDeviceFloppy size={16} />}>
                  {savingProgress ? 'Đang lưu...' : 'Lưu và đóng'}
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <Modal
          open={showExitConfirm}
          onClose={() => setShowExitConfirm(false)}
          closeAfterTransition
          BackdropProps={{
            sx: { backgroundColor: 'rgba(0,0,0,0.7)' },
            onClick: () => setShowExitConfirm(false),
          }}
        >
          <Fade in={showExitConfirm}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 500 },
                maxHeight: '90vh',
                overflow: 'auto',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Bạn có thay đổi chưa lưu
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography>Bạn có {stats.answered} câu đã trả lời chưa được lưu.</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Nếu bạn thoát bây giờ, các thay đổi có thể bị mất.
                </Typography>
              </Box>

              <Alert severity="warning" sx={{ mb: 3 }}>
                Bạn có muốn lưu tiến trình trước khi thoát không?
              </Alert>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleExitWithoutSave} variant="outlined" color="error" disabled={savingProgress}>
                  Thoát không lưu
                </Button>
                <Button onClick={handleExitAndSave} variant="contained" color="primary" disabled={savingProgress} startIcon={<IconDeviceFloppy size={16} />}>
                  {savingProgress ? 'Đang lưu...' : 'Lưu và thoát'}
                </Button>
                <Button onClick={() => setShowExitConfirm(false)} variant="outlined" disabled={savingProgress}>
                  Hủy
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
        <Portal>
          <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} sx={{ zIndex: 1500 }}>
            <Alert severity={snackbar.severity} onClose={handleSnackbarClose} sx={{ zIndex: 1501 }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Portal>
      </>
    );
  };

  // Giao diện fullscreen (giữ nguyên)
  if (fullscreen) {
    return (
      <>
        <Dialog
          open={fullscreen}
          onClose={() => {}}
          maxWidth="xl"
          fullWidth
          fullScreen
          disableEscapeKeyDown={isTimeUp}
          PaperProps={{
            sx: {
              height: '100vh',
              maxHeight: '100vh',
              m: 0,
              borderRadius: 0,
              bgcolor: '#f5f5f5',
            },
          }}
        >
          <DialogContent sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'white',
                mx: 30,
              }}
            >
              {/* Header cho fullscreen */}
              <Paper
                sx={{
                  p: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 0,
                  borderBottom: '2px solid rgba(255,255,255,0.2)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      fontSize: '1.5rem',
                      flex: 1,
                      minWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {quiz.title}
                  </Typography>
                  {enableSaveProgress && !isTimeUp && (
                    <Tooltip title="Lưu tiến trình">
                      <Button size="small" variant="contained" onClick={handleSaveConfirmOpen} disabled={savingProgress} sx={{ color: 'white', height: 28, minWidth: 70, '&:hover': { bgcolor: '#447fc2ff' }, alignItems: 'center' }}>
                        <Typography sx={{ mr: 0.5, fontSize: '0.75rem', mt: 0.1 }}>Lưu tiến trình</Typography>
                        <IconDeviceFloppy size={14} />
                      </Button>
                    </Tooltip>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      flexShrink: 0,
                    }}
                  >
                    {' '}
                    <Chip
                      label={`✅ ${stats.answered}/${stats.total} đã làm`}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(126, 241, 130, 0.2)',
                        color: 'white',
                        height: 22,
                        fontSize: '0.8rem',
                      }}
                    />
                    <Chip
                      label={`❓ ${stats.total - stats.answered} chưa làm`}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 152, 0, 0.2)',
                        color: 'white',
                        height: 22,
                        fontSize: '0.8rem',
                      }}
                    />
                    {stats.flagged > 0 && (
                      <Chip
                        label={`🚩 ${stats.flagged} đánh dấu`}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(244, 67, 54, 0.2)',
                          color: 'white',
                          height: 22,
                          fontSize: '0.8rem',
                          '& .MuiChip-icon': {
                            marginLeft: '4px',
                          },
                        }}
                      />
                    )}
                    {timeLeft !== null && (
                      <Chip
                        icon={<IconClock size={20} />}
                        label={formatTime(timeLeft)}
                        size="medium"
                        sx={{
                          bgcolor: timeLeft < 300 ? '#ff4444' : 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          height: 30,
                          fontSize: '1.1rem',
                          '& .MuiChip-icon': {
                            marginLeft: '4px',
                          },
                        }}
                      />
                    )}
                    {!isTimeUp && (
                      <Tooltip title="Thu nhỏ">
                        <IconButton size="small" onClick={handleToggleFullscreen} sx={{ color: 'white' }}>
                          <IconMinimize size={20} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setShowSubmitDialog(true)}
                      size="small"
                      sx={{
                        bgcolor: '#4CAF50',
                        fontSize: '0.8rem',
                        height: 28,
                        minWidth: 70,
                        '&:hover': { bgcolor: '#45a049' },
                      }}
                    >
                      Nộp bài
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 100 }}>
                    <LinearProgress
                      variant="determinate"
                      value={(stats.answered / stats.total) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'rgba(255,255,255,0.3)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#4CAF50',
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Paper>

              <Box
                ref={fullscreenContainerRef}
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: 2,
                  scrollBehavior: 'smooth',
                }}
              >
                {currentQuestions.map((question, qIdx) => {
                  const globalIndex = showPageNavigation ? (currentPage - 1) * questionsPerPage + qIdx : qIdx;
                  return renderQuestion(question, globalIndex, true);
                })}
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

        {renderDialogs()}
      </>
    );
  }

  // Giao diện bình thường - COMPACT MODE (chỉ giảm kích thước, không thay đổi bố cục)
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          gap: isCompactMode ? 1 : 2,
          flexDirection: { xs: 'column', md: 'row' },
          position: 'relative',
          p: isCompactMode ? 0.5 : 2,
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            flex: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'white',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto',
          }}
        >
          {/* Header compact - nhỏ hơn trong compact mode */}
          <Paper
            sx={{
              p: isCompactMode ? 1 : 1.5,
              color: 'rgb(var(--text-primary))',
              borderRadius: 0,
              position: 'sticky',
              top: 0,
              zIndex: 10,
              flexShrink: 0,
              boxShadow: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 0.5,
                minHeight: isCompactMode ? 35 : 40,
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  fontSize: isCompactMode ? '0.85rem' : { xs: '0.9rem', sm: '1.5rem' },
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                }}
              >
                {quiz.title}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  flexShrink: 0,
                }}
              >
                {!isTimeUp && (
                  <Tooltip title="Phóng to">
                    <IconButton size="small" onClick={handleToggleFullscreen} sx={{ color: 'rgb(var(--text-primary:))', padding: isCompactMode ? '4px' : '8px' }}>
                      <IconMaximize size={isCompactMode ? 20 : 32} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>

            {renderSinglePageNavigation()}
          </Paper>

          {/* Questions area - giữ nguyên padding nhưng nhỏ hơn */}
          <Box
            sx={{
              flex: 1,
              p: isCompactMode ? 1 : { xs: 1, sm: 2 },
            }}
          >
            {currentQuestions.map((question, qIdx) => {
              const globalIndex = showPageNavigation ? (currentPage - 1) * questionsPerPage + qIdx : qIdx;
              return renderQuestion(question, globalIndex, false);
            })}
          </Box>
        </Box>

        {/* Sidebar - CHỈ HIỆN KHI KHÔNG PHẢI COMPACT MODE */}
        {!isCompactMode && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'white',
              boxShadow: 3,
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Avatar
                sx={{
                  width: 66,
                  height: 66,
                  bgcolor: '#E8F0FE',
                  color: '#4285F4',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                }}
              >
                {getInitials(authData?.name || '')}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    lineHeight: 1.2,
                    mb: 1,
                    color: '#000',
                  }}
                >
                  {authData?.name || 'User'}
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    rowGap: 0.5,
                    columnGap: 1,
                    fontSize: '0.875rem',
                  }}
                >
                  <Typography sx={{ color: '#666', fontWeight: 400 }}>Hoàn thành</Typography>
                  <Typography sx={{ color: '#4285F4', fontWeight: 600 }}>
                    {stats.answered}/{stats.total}
                  </Typography>

                  <Typography sx={{ color: '#666', fontWeight: 400 }}>Còn lại</Typography>
                  <Typography sx={{ color: '#4285F4', fontWeight: 600 }}>{stats.total - stats.answered}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1rem', color: '#333' }}>
                Câu hỏi
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 2,
                  justifyItems: 'center',
                  mb: 3,
                }}
              >
                {quiz.questions.map((q: any, index: number) => {
                  const hasAnswered = !!userAnswers[q.question_id];

                  return (
                    <Box
                      key={q.question_id}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        bgcolor: hasAnswered ? '#4CAF50' : '#f0f0f0',
                        color: hasAnswered ? 'white' : '#bbb',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      {index + 1}
                    </Box>
                  );
                })}
              </Box>
              <Divider />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                mb: 5,
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                    <Typography sx={{ fontSize: '0.875rem', color: '#666' }}>Đã trả lời</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#f44336' }} />
                    <Typography sx={{ fontSize: '0.875rem', color: '#666' }}>Đánh dấu</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#d0d0d0' }} />
                <Typography sx={{ fontSize: '0.875rem', color: '#999' }}>Chưa trả lời</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* Trong compact mode, hiển thị sidebar đơn giản chỉ có thời gian và nút nộp bài */}
        {isCompactMode && (
          <Box
            sx={{
              flex: 0.5, // Chiếm ít không gian hơn
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'white',
              boxShadow: 3,
              overflow: 'hidden',
              borderRadius: 2,
              p: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Hiển thị thời gian nổi bật */}
            {timeLeft !== null && (
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {formatTime(timeLeft)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thời gian còn lại
                </Typography>
              </Box>
            )}

            {/* Nút nộp bài nổi bật */}
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowSubmitDialog(true)}
              sx={{
                width: '100%',
                mb: 1.5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Nộp bài
            </Button>

            {/* Nút thoát */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleExitWithoutSave()}
              sx={{
                width: '100%',
                py: 1,
              }}
            >
              Thoát
            </Button>

            {/* Nút lưu tiến trình (nếu được bật) */}
            {enableSaveProgress && (
              <Button sx={{ width: '100%', mt: 1.5 }} onClick={() => handleSaveConfirm(false)} variant="contained" color="primary" disabled={savingProgress} startIcon={<IconDeviceFloppy size={16} />}>
                {savingProgress ? 'Đang lưu...' : 'Lưu tiến trình'}
              </Button>
            )}
          </Box>
        )}

        {/* Footer - chỉ hiện khi KHÔNG PHẢI compact mode */}
        {!isCompactMode && (
          <Box
            sx={{
              width: '100%',
              bgcolor: '#f4f4f4',
              boxShadow: 3,
              borderRadius: 2,
              py: 1,
              position: { xs: 'sticky', md: 'absolute' },
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              mt: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                  Thời gian:
                </Typography>

                <Box>
                  {timeLeft !== null && (
                    <Chip
                      variant="outlined"
                      label={formatTime(timeLeft)}
                      size="medium"
                      sx={{
                        bgcolor: 'none',
                        color: '#ff9800',
                        height: 38,
                        fontSize: '3rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        border: 'none',
                        '& .MuiChip-icon': {
                          color: 'white',
                          marginLeft: '6px',
                        },
                        '& .MuiChip-label': {
                          paddingRight: '6px',
                        },
                      }}
                    />
                  )}
                </Box>

                <Button sx={{ borderRadius: '40px', padding: '14px' }} onClick={() => handleSaveConfirm(false)} variant="contained" color="primary" disabled={savingProgress} startIcon={<IconDeviceFloppy size={16} />}>
                  {savingProgress ? 'Đang lưu...' : 'Lưu tiến trình'}
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setShowSubmitDialog(true)}
                  sx={{
                    bgcolor: 'rgba(53, 115, 104)',
                    color: 'white',
                    py: 1.5,
                    borderRadius: 25,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
                    '&:hover': {
                      bgcolor: '#3367D6',
                      boxShadow: '0 4px 12px rgba(66, 133, 244, 0.4)',
                    },
                  }}
                >
                  Nộp bài
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleExitWithoutSave()}
                  sx={{
                    padding: '14px 40px',
                    borderRadius: 20,
                  }}
                >
                  Thoát
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {renderDialogs()}
    </>
  );
}
