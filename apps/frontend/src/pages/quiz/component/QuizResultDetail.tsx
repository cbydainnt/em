import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, FormGroup, LinearProgress, Chip, IconButton, Paper, Tooltip, Dialog, DialogContent, Alert } from '@mui/material';
import { IconX, IconArrowLeft, IconArrowRight, IconMaximize, IconMinimize } from '@tabler/icons-react';
import axios from 'axios';

interface QuizResultDetailProps {
  quizId: string;
  progressId: string;
  onClose: () => void;
  questionsPerPage?: number;
}

interface Question {
  question_id: string;
  question_text: string;
  question_type: number;
  points: number;
  explanation?: string;
  answers: Answer[];
}

interface Answer {
  answer_id: string;
  answer_text: string;
  is_correct: boolean;
}

interface UserAnswer {
  question_id: string;
  selected_answer_ids: string[];
  is_correct: boolean;
  points_earned: number;
}

export default function QuizResultDetail({ quizId, progressId, onClose, questionsPerPage = 1 }: QuizResultDetailProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    loadResult();
  }, [quizId, progressId]);

  const loadResult = async () => {
    try {
      const res = await axios.get(`/api/quiz/${quizId}/result/${progressId}`);
      setResult(res.data);
    } catch (error) {
      console.error('Error loading quiz result:', error);
      alert('Không thể tải kết quả quiz');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const scrollToQuestion = (questionId: string) => {
    const questionElement = questionRefs.current[questionId];
    if (!questionElement) return;

    // Xác định container dựa trên chế độ
    const container = fullscreen ? fullscreenContainerRef.current : containerRef.current;

    if (container) {
      // Sử dụng scrollTo trên container chính xác
      const questionRect = questionElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollTop = questionRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: scrollTop - 50, // Trừ đi một khoảng padding
        behavior: 'smooth',
      });
    } else {
      // Fallback
      questionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const getAnswerLabel = (index: number) => String.fromCharCode(65 + index);

  const getCurrentPageQuestions = () => {
    if (!result?.quiz) return [];

    if (questionsPerPage === 1) {
      return result.quiz.questions || [];
    }

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return (result.quiz.questions || []).slice(startIndex, endIndex);
  };

  const totalPages = result?.quiz?.questions ? Math.ceil(result.quiz.questions.length / (questionsPerPage === 1 ? result.quiz.questions.length : questionsPerPage)) : 1;

  const getUserAnswerForQuestion = (questionId: string): UserAnswer | undefined => {
    return result?.answers?.find((a: any) => a.question_id === questionId);
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: Question, globalIndex: number, isFullscreenMode: boolean) => {
    const userAnswer = getUserAnswerForQuestion(question.question_id);
    const isAnswered = !!userAnswer;
    const isCorrect = userAnswer?.is_correct || false;

    return (
      <Box
        key={question.question_id}
        ref={(el) => {
          questionRefs.current[question.question_id] = el as HTMLDivElement | null;
        }}
        sx={{ mb: isFullscreenMode ? 3 : 2 }}
      >
        <Paper
          sx={{
            p: isFullscreenMode ? 3 : 2,
            borderRadius: 2,
            borderLeft: '4px solid',
            borderLeftColor: !isAnswered ? '#FFA726' : isCorrect ? '#4CAF50' : '#F44336',
            position: 'relative',
            bgcolor: !isAnswered ? '#FFF3E0' : isCorrect ? '#E8F5E9' : '#FFEBEE',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip label={`Câu ${globalIndex + 1}`} size="small" color="primary" sx={{ height: 24, fontSize: '0.8rem', fontWeight: 600 }} />
              <Chip label={`${question.points} điểm`} size="small" variant="outlined" sx={{ height: 24, fontSize: '0.8rem' }} />
              {question.question_type === 2 && <Chip label="Nhiều đáp án" size="small" color="warning" sx={{ height: 24, fontSize: '0.8rem' }} />}
              {!isAnswered && <Chip label="⚠️ Chưa làm" size="small" color="warning" sx={{ height: 24, fontSize: '0.8rem', fontWeight: 600 }} />}
              {isAnswered && <Chip label={isCorrect ? '✓ Đúng' : '✗ Sai'} size="small" color={isCorrect ? 'success' : 'error'} sx={{ height: 24, fontSize: '0.8rem', fontWeight: 600 }} />}
            </Box>

            {isAnswered && <Chip label={`${userAnswer.points_earned}/${question.points} điểm`} color={isCorrect ? 'success' : 'error'} sx={{ fontWeight: 700 }} />}
          </Box>

          {/* Question Text */}
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontSize: isFullscreenMode ? '1.1rem' : '1rem',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            {question.question_text}
          </Typography>

          {/* Answers */}
          {question.question_type === 2 ? (
            <FormGroup>
              {question.answers.map((answer, idx) => {
                const isSelected = userAnswer?.selected_answer_ids?.includes(answer.answer_id);
                const isCorrectAnswer = answer.is_correct;

                let borderColor = '#e0e0e0';
                let bgcolor = 'white';

                if (isSelected && isCorrectAnswer) {
                  borderColor = '#4CAF50';
                  bgcolor = '#E8F5E9';
                } else if (isSelected && !isCorrectAnswer) {
                  borderColor = '#F44336';
                  bgcolor = '#FFEBEE';
                } else if (!isSelected && isCorrectAnswer) {
                  borderColor = '#4CAF50';
                  bgcolor = '#F1F8F4';
                }

                return (
                  <FormControlLabel
                    key={answer.answer_id}
                    control={<Checkbox checked={isSelected || false} disabled size="small" sx={{ ml: isFullscreenMode ? 4 : 0 }} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            minWidth: 28,
                            fontSize: isFullscreenMode ? '1rem' : '0.95rem',
                          }}
                        >
                          {getAnswerLabel(idx)}.
                        </Typography>
                        <Typography sx={{ fontSize: isFullscreenMode ? '1rem' : '0.95rem', flex: 1, color: 'black' }}>{answer.answer_text}</Typography>
                        {isCorrectAnswer && <Chip label="✓ Đáp án đúng" size="small" color="success" sx={{ height: 22 }} />}
                        {isSelected && !isCorrectAnswer && <Chip label="✗ Bạn đã chọn" size="small" color="error" sx={{ height: 22 }} />}
                      </Box>
                    }
                    sx={{
                      p: 1.5,
                      mb: 1,
                      border: '2px solid',
                      borderColor,
                      borderRadius: 1,
                      bgcolor,
                      transition: 'all 0.2s',
                    }}
                  />
                );
              })}
            </FormGroup>
          ) : (
            <RadioGroup value={userAnswer?.selected_answer_ids?.[0] || ''}>
              {question.answers.map((answer, idx) => {
                const isSelected = userAnswer?.selected_answer_ids?.[0] === answer.answer_id;
                const isCorrectAnswer = answer.is_correct;

                let borderColor = '#e0e0e0';
                let bgcolor = 'white';

                if (isSelected && isCorrectAnswer) {
                  borderColor = '#4CAF50';
                  bgcolor = '#E8F5E9';
                } else if (isSelected && !isCorrectAnswer) {
                  borderColor = '#F44336';
                  bgcolor = '#FFEBEE';
                } else if (!isSelected && isCorrectAnswer) {
                  borderColor = '#4CAF50';
                  bgcolor = '#F1F8F4';
                }

                return (
                  <FormControlLabel
                    key={answer.answer_id}
                    value={answer.answer_id}
                    control={<Radio size="small" disabled sx={{ ml: isFullscreenMode ? 4 : 0 }} />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                            minWidth: 28,
                            fontSize: isFullscreenMode ? '1rem' : '0.95rem',
                          }}
                        >
                          {getAnswerLabel(idx)}.
                        </Typography>
                        <Typography sx={{ fontSize: isFullscreenMode ? '1rem' : '0.95rem', flex: 1, color: 'black' }}>{answer.answer_text}</Typography>
                        {isCorrectAnswer && <Chip label="✓ Đáp án đúng" size="small" color="success" sx={{ height: 22 }} />}
                        {isSelected && !isCorrectAnswer && <Chip label="✗ Bạn đã chọn" size="small" color="error" sx={{ height: 22 }} />}
                      </Box>
                    }
                    sx={{
                      p: 1.5,
                      mb: 1,
                      border: '2px solid',
                      borderColor,
                      borderRadius: 1,
                      bgcolor,
                      transition: 'all 0.2s',
                    }}
                  />
                );
              })}
            </RadioGroup>
          )}

          {/* Explanation */}
          {question.explanation && (
            <Alert severity="info" sx={{ mt: 2 }} icon={<span style={{ fontSize: '1.2rem' }}>💡</span>}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
                Giải thích:
              </Typography>
              <Typography variant="body2">{question.explanation}</Typography>
            </Alert>
          )}
        </Paper>
      </Box>
    );
  };

  // Render navigation cho questionsPerPage = 1 (bình thường)
  const renderSinglePageNavigation = () => {
    if (questionsPerPage !== 1 || !result?.quiz) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {result.quiz.questions.map((q: any, idx: number) => {
            const userAnswer = getUserAnswerForQuestion(q.question.question_id);
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer?.is_correct || false;

            return (
              <Tooltip key={q.question.question_id} title={`Câu ${idx + 1}`}>
                <Box
                  onClick={() => scrollToQuestion(q.question.question_id)}
                  sx={{
                    width: 26,
                    height: 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: !isAnswered ? '#FFA726' : isCorrect ? '#4CAF50' : '#F44336',
                    bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.3)' : isCorrect ? 'rgba(81, 228, 86, 0.3)' : 'rgba(244, 67, 54, 0.3)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  {idx + 1}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Render navigation cho questionsPerPage = 1 (fullscreen)
  const renderSinglePageNavigationFullscreen = () => {
    if (questionsPerPage !== 1 || !result?.quiz) return null;

    return (
      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            mx: 2,
          }}
        >
          {result.quiz.questions.map((q: any, idx: number) => {
            const userAnswer = getUserAnswerForQuestion(q.question.question_id);
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer?.is_correct || false;

            return (
              <Tooltip key={q.question.question_id} title={`Câu ${idx + 1}`}>
                <Box
                  onClick={() => scrollToQuestion(q.question.question_id)}
                  sx={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: !isAnswered ? '#FFA726' : isCorrect ? '#4CAF50' : '#F44336',
                    bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.3)' : isCorrect ? '#4CAF50' : 'rgba(244, 67, 54, 0.3)',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.5)' : isCorrect ? '#45a049' : 'rgba(244, 67, 54, 0.5)',
                    },
                  }}
                >
                  {idx + 1}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Render navigation cho questionsPerPage > 1 (bình thường)
  const renderMultiPageNavigationNormal = () => {
    if (questionsPerPage <= 1 || !result?.quiz) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mt: 1,
        }}
      >
        {/* Bên trái: Các nhóm trang và mũi tên */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', flex: 1 }}>
          {/* Các nhóm trang */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flexWrap: 'wrap',
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const pageStart = (page - 1) * questionsPerPage + 1;
              const pageEnd = Math.min(page * questionsPerPage, result.quiz.questions.length);
              const isCurrent = page === currentPage;

              const questionsInPage = result.quiz.questions.slice(pageStart - 1, pageEnd);
              const hasCorrect = questionsInPage.some((q: any) => {
                const userAnswer = getUserAnswerForQuestion(q.question.question_id);
                return userAnswer?.is_correct;
              });
              const hasIncorrect = questionsInPage.some((q: any) => {
                const userAnswer = getUserAnswerForQuestion(q.question.question_id);
                return userAnswer && !userAnswer.is_correct;
              });
              const hasUnanswered = questionsInPage.some((q: any) => !getUserAnswerForQuestion(q.question.question_id));

              let bgcolor = 'transparent';
              let borderColor = 'rgba(255,255,255,0.3)';

              if (isCurrent) {
                bgcolor = 'rgba(255,255,255,0.3)';
                borderColor = 'white';
              } else if (hasUnanswered) {
                bgcolor = 'rgba(255, 167, 38, 0.2)';
                borderColor = 'rgba(255, 167, 38, 0.5)';
              } else if (hasIncorrect) {
                bgcolor = 'rgba(244, 67, 54, 0.2)';
                borderColor = 'rgba(244, 67, 54, 0.5)';
              } else if (hasCorrect) {
                bgcolor = 'rgba(76, 175, 80, 0.2)';
                borderColor = 'rgba(76, 175, 80, 0.5)';
              }

              return (
                <Tooltip key={page} title={`Câu ${pageStart}-${pageEnd}`}>
                  <Box
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                      fontWeight: isCurrent ? 600 : 400,
                      bgcolor,
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: '1px solid',
                      borderColor,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.2)',
                      },
                      position: 'relative',
                    }}
                  >
                    {pageStart}-{pageEnd}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>

          {/* Hai mũi tên chuyển trang */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
            <IconButton
              size="small"
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
              sx={{
                color: 'white',
                width: 24,
                height: 24,
              }}
            >
              <IconArrowLeft size={14} />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              sx={{
                color: 'white',
                width: 24,
                height: 24,
              }}
            >
              <IconArrowRight size={14} />
            </IconButton>
          </Box>
        </Box>

        {/* Bên phải: Danh sách câu hỏi trong nhóm hiện tại */}
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {currentQuestions.map((question: any, idx: number) => {
            const globalIndex = (currentPage - 1) * questionsPerPage + idx;
            const userAnswer = getUserAnswerForQuestion(question.question.question_id);
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer?.is_correct || false;

            return (
              <Tooltip key={question.question.question_id} title={`Câu ${globalIndex + 1}`}>
                <Box
                  onClick={() => scrollToQuestion(question.question.question_id)}
                  sx={{
                    width: 26,
                    height: 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: !isAnswered ? '#FFA726' : isCorrect ? '#4CAF50' : '#F44336',
                    bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.3)' : isCorrect ? '#4CAF50' : 'rgba(244, 67, 54, 0.3)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'normal',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    '&:hover': {
                      bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.5)' : isCorrect ? '#45a049' : 'rgba(244, 67, 54, 0.5)',
                    },
                  }}
                >
                  {globalIndex + 1}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    );
  };

  // Render navigation cho questionsPerPage > 1 (fullscreen)
  const renderMultiPageNavigationFullscreen = () => {
    if (questionsPerPage <= 1 || !result?.quiz) return null;

    return (
      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {/* Bên trái: Các nhóm trang */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flexWrap: 'wrap',
              flex: 1,
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const pageStart = (page - 1) * questionsPerPage + 1;
              const pageEnd = Math.min(page * questionsPerPage, result.quiz.questions.length);
              const isCurrent = page === currentPage;

              const questionsInPage = result.quiz.questions.slice(pageStart - 1, pageEnd);
              const hasCorrect = questionsInPage.some((q: any) => {
                const userAnswer = getUserAnswerForQuestion(q.question.question_id);
                return userAnswer?.is_correct;
              });
              const hasIncorrect = questionsInPage.some((q: any) => {
                const userAnswer = getUserAnswerForQuestion(q.question.question_id);
                return userAnswer && !userAnswer.is_correct;
              });
              const hasUnanswered = questionsInPage.some((q: any) => !getUserAnswerForQuestion(q.question.question_id));

              let bgcolor = 'transparent';
              let borderColor = 'rgba(255,255,255,0.3)';

              if (isCurrent) {
                bgcolor = 'rgba(255,255,255,0.3)';
                borderColor = 'white';
              } else if (hasUnanswered) {
                bgcolor = 'rgba(255, 167, 38, 0.2)';
                borderColor = 'rgba(255, 167, 38, 0.5)';
              } else if (hasIncorrect) {
                bgcolor = 'rgba(244, 67, 54, 0.2)';
                borderColor = 'rgba(244, 67, 54, 0.5)';
              } else if (hasCorrect) {
                bgcolor = 'rgba(76, 175, 80, 0.2)';
                borderColor = 'rgba(76, 175, 80, 0.5)';
              }

              return (
                <Tooltip key={page} title={`Câu ${pageStart}-${pageEnd}`}>
                  <Box
                    onClick={() => setCurrentPage(page)}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.85rem',
                      fontWeight: isCurrent ? 600 : 400,
                      bgcolor,
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      border: '1px solid',
                      borderColor,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.2)',
                      },
                      position: 'relative',
                    }}
                  >
                    {pageStart}-{pageEnd}
                  </Box>
                </Tooltip>
              );
            })}

            {/* Các nút điều hướng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
              <Tooltip title="Quay lại">
                <IconButton
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  sx={{
                    color: 'white',
                    width: 90,
                    height: 30,
                    borderRadius: 5,
                    border: 1,
                    p: 1,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  <IconArrowLeft size={14} />
                  <Typography sx={{ fontSize: '0.85rem', ml: 0.5, alignItems: 'center' }}>Quay lại</Typography>
                </IconButton>
              </Tooltip>

              <Tooltip title="Tiếp tục">
                <IconButton
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  sx={{
                    color: 'white',
                    width: 90,
                    height: 30,
                    borderRadius: 5,
                    border: 1,
                    p: 1,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.85rem', mr: 0.5, alignItems: 'center' }}>Tiếp tục</Typography>
                  <IconArrowRight size={14} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Bên phải: Danh sách câu hỏi trong nhóm hiện tại */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {currentQuestions.map((question: any, idx: number) => {
              const globalIndex = (currentPage - 1) * questionsPerPage + idx;
              const userAnswer = getUserAnswerForQuestion(question.question.question_id);
              const isAnswered = !!userAnswer;
              const isCorrect = userAnswer?.is_correct || false;

              return (
                <Tooltip key={question.question.question_id} title={`Câu ${globalIndex + 1}`}>
                  <Box
                    onClick={() => scrollToQuestion(question.question.question_id)}
                    sx={{
                      width: 30,
                      height: 30,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '1px solid',
                      borderColor: !isAnswered ? '#FFA726' : isCorrect ? '#4CAF50' : '#F44336',
                      bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.3)' : isCorrect ? '#4CAF50' : 'rgba(244, 67, 54, 0.3)',
                      color: 'white',
                      fontSize: '0.9rem',
                      fontWeight: 'normal',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                      '&:hover': {
                        bgcolor: !isAnswered ? 'rgba(255, 167, 38, 0.5)' : isCorrect ? '#45a049' : 'rgba(244, 67, 54, 0.5)',
                      },
                    }}
                  >
                    {globalIndex + 1}
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  if (loading || !result) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Đang tải kết quả...</Typography>
      </Box>
    );
  }

  const currentQuestions = getCurrentPageQuestions();

  // Fullscreen mode
  if (fullscreen) {
    return (
      <Dialog
        open={fullscreen}
        onClose={() => {}}
        maxWidth="xl"
        fullWidth
        fullScreen
        disableEscapeKeyDown
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
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white', mx: 30 }}>
            {/* Header */}
            <Paper
              sx={{
                p: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 0,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mx: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  📊 Chi tiết kết quả: {result.quiz.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip label={`${formatTime(result.time_spent)}`} sx={{ bgcolor: 'rgba(245, 240, 240, 0.2)', color: 'yellow', fontWeight: 600 }} />
                  <Chip label={`${result.score}/${result.quiz.total_points} điểm`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />
                  <Chip label={`${result.correct_answers}/${result.total_questions} đúng`} color={result.passed ? 'success' : 'error'} />
                  <Tooltip title="Thu nhỏ">
                    <IconButton size="small" onClick={() => setFullscreen(false)} sx={{ color: 'white' }}>
                      <IconMinimize size={20} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <LinearProgress
                variant="determinate"
                value={(result.correct_answers / result.total_questions) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: result.passed ? '#4CAF50' : '#FF9800',
                    borderRadius: 3,
                  },
                  mx: 2,
                }}
              />

              {questionsPerPage === 1 ? renderSinglePageNavigationFullscreen() : renderMultiPageNavigationFullscreen()}
            </Paper>

            {/* Content */}
            <Box ref={fullscreenContainerRef} sx={{ flex: 1, overflow: 'auto', p: 3, scrollBehavior: 'smooth' }}>
              {currentQuestions.map((question: any, qIdx: number) => {
                const globalIndex = questionsPerPage > 1 ? (currentPage - 1) * questionsPerPage + qIdx : qIdx;
                return renderQuestion(question.question, globalIndex, true);
              })}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  // Normal mode
  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          p: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem' }}>
            📊 Chi tiết kết quả
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Chip label={`${formatTime(result.time_spent)}`} size="small" sx={{ bgcolor: 'rgba(245, 240, 240, 0.2)', color: 'yellow', fontWeight: 600 }} />
            <Chip label={`${result.score}/${result.quiz.total_points} điểm`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }} />
            <Chip label={`${result.correct_answers}/${result.total_questions} đúng`} size="small" color={result.passed ? 'success' : 'error'} />
            <Tooltip title="Phóng to">
              <IconButton size="small" onClick={() => setFullscreen(true)} sx={{ color: 'white' }}>
                <IconMaximize size={16} />
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
              <IconX size={18} />
            </IconButton>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={(result.correct_answers / result.total_questions) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': {
              bgcolor: result.passed ? '#4CAF50' : '#FF9800',
              borderRadius: 3,
            },
          }}
        />

        {questionsPerPage === 1 ? renderSinglePageNavigation() : renderMultiPageNavigationNormal()}
      </Paper>

      {/* Questions */}
      <Box sx={{ flex: 1, p: 2 }}>
        {currentQuestions.map((question: any, qIdx: number) => {
          const globalIndex = questionsPerPage > 1 ? (currentPage - 1) * questionsPerPage + qIdx : qIdx;
          return renderQuestion(question.question, globalIndex, false);
        })}
      </Box>
    </Box>
  );
}
