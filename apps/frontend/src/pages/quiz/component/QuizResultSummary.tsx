import { Box, Typography, Button, IconButton, Paper, CircularProgress, Divider, Chip, Popover, Stack } from '@mui/material';
import { IconClock } from '@tabler/icons-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AccessTime, Cancel, CheckCircle } from '@mui/icons-material';
import { useThemeStore } from '@/hooks/useThemeEventStore';

interface ScoreCircleProps {
  score?: number;
  text?: string;
  maxScore?: number;
  size?: number;
  thickness?: number;
  color?: string;
  defaultPercentage?: number;
}

interface QuizResultSummaryProps {
  result: {
    progress_id: string;
    percentage: number;
    passed: boolean;
    score: number;
    correct_answers: number;
    total_questions: number;
    completed_at: string;
    attempts: number;
    attemptNumber: number;
    time_spent?: number;
    answers?: Array<{
      question_id: string;
      is_correct: boolean;
      selected_answer_ids: string[];
    }>;
  };
  quiz: {
    quiz_id: string;
    title: string;
    question_count: number;
    duration_minutes?: number;
    passing_score: number;
    total_points: number;
  };
  onRetake: () => void;
  onViewDetail: (attemptNumber: number) => void;
  onClose: () => void;
}

export default function QuizResultSummary({ result, quiz, onRetake, onViewDetail }: QuizResultSummaryProps) {
  const getType = (score: number) => {
    if (score >= 8) return 'Giỏi';
    if (score >= 6.5) return 'Khá';
    if (score >= 5) return 'Trung bình';
    return 'Yếu';
  };

  const { authData } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const open = Boolean(anchorEl);
  const { fetchTheme } = useThemeStore();

  const answeredCount = result.answers?.length || 0;
  const correctCount = result.correct_answers;
  const incorrectCount = result.answers?.filter((a) => !a.is_correct).length || 0;
  const unansweredCount = result.total_questions - answeredCount;

  useEffect(() => {
    fetchTheme();
  }, []);

  function formatISOString(input: string): string {
    const d = new Date(input);
    const pad = (n: number) => String(n).padStart(2, '0');
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return `${time} ${date}`;
  }

  const handleOpenAttempts = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    try {
      const res = await axios.get(`/api/quiz/${quiz.quiz_id}/results`);
      const sortedAttempts = [...(res.data || [])].sort((a, b) => b.attemptNumber - a.attemptNumber);
      setAttempts(sortedAttempts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseAttempts = () => {
    setAnchorEl(null);
  };

  function ScoreCircle({ score, text, maxScore = 10, size = 150, thickness = 4, color = '#3f51b5', defaultPercentage = 75 }: ScoreCircleProps) {
    const percentage = score !== undefined ? (score / maxScore) * 100 : defaultPercentage;

    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          width: size,
          height: size,
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={thickness}
          sx={{
            color: 'rgba(63, 81, 181, 0.15)',
            position: 'absolute',
          }}
        />

        <CircularProgress
          variant="determinate"
          value={percentage}
          size={size}
          thickness={thickness}
          sx={{
            color: color,
            position: 'absolute',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />

        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {text ? (
            <Typography
              sx={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 700,
                fontSize: size / 6,
                color: color,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                px: 2,
                lineHeight: 1.2,
              }}
            >
              {text}
            </Typography>
          ) : score !== undefined ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: 0.3,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontWeight: 700,
                  fontSize: size / 2.5,
                  color: color,
                  letterSpacing: '-0.06em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {Math.floor(score)}
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontWeight: 600,
                  fontSize: size / 5,
                  color: color,
                  opacity: 0.7,
                  mb: 0.5,
                }}
              >
                .
              </Typography>

              <Typography
                component="span"
                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontWeight: 600,
                  fontSize: size / 4,
                  color: color,
                  opacity: 0.85,
                  letterSpacing: '-0.02em',
                }}
              >
                {Math.round((score % 1) * 10)}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        bgcolor: 'rgb(var(--bg-primary))',
        borderRadius: 2,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '95%', md: 900, lg: 1000 },
          margin: 'auto',
          p: { xs: 1, sm: 1.5, md: 2 },
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
          <Typography
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              lineHeight: 1.4,
            }}
          >
            Chúc mừng,{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.3rem', md: '1.6rem' },
              }}
            >
              {authData?.name || 'admin'}
            </Typography>{' '}
            đã hoàn thành bài thi
          </Typography>
        </Box>

        <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />

        {/* Score display */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={{ xs: 2, sm: 4, md: 8 }}
          sx={{
            padding: { xs: 1, sm: 1.5, md: 2 },
            borderRadius: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: 'center',
          }}
        >
          {/* Điểm chính */}
          <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
              }}
            >
              Điểm
            </Typography>
            <ScoreCircle score={result.score} size={window.innerWidth < 600 ? 140 : window.innerWidth < 960 ? 160 : 200} color="#3f51b5" />
          </Box>

          {/* Loại & Đúng */}
          <Box display="flex" flexDirection={{ xs: 'row', sm: 'column' }} gap={{ xs: 3, sm: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                }}
              >
                Loại
              </Typography>
              <ScoreCircle text={getType(result.score)} size={window.innerWidth < 600 ? 65 : 80} defaultPercentage={75} color="#3f51b5" thickness={4} />
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: '0.75rem', sm: '0.85rem', md: '1rem' },
                }}
              >
                Đúng
              </Typography>
              <ScoreCircle text={`${Math.round(result.percentage)}%`} size={window.innerWidth < 600 ? 65 : 80} defaultPercentage={result.percentage} color="#3f51b5" thickness={4} />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />

        {/* Lượt thi */}
        <Box sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={{ xs: 0.5, sm: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                color: 'text.primary',
                letterSpacing: '0.05em',
              }}
            >
              LƯỢT THI
            </Typography>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                p: { xs: 0.5, sm: 1 },
              }}
              onClick={handleOpenAttempts}
            >
              <IconClock size={window.innerWidth < 600 ? 16 : 20} />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                minWidth: { xs: 50, sm: 60, md: 80 },
              }}
            >
              Lần thứ
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              }}
            >
              {result.attempts}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: { xs: 1, sm: 1.5, md: 2 } }} />

        {/* Thời gian */}
        <Box sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
              color: 'text.primary',
              letterSpacing: '0.05em',
              mb: { xs: 0.5, sm: 1 },
            }}
          >
            THỜI GIAN
          </Typography>

          <Stack spacing={{ xs: 0.5, sm: 0.75, md: 1 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  minWidth: { xs: 50, sm: 60, md: 80 },
                }}
              >
                Bắt đầu
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' },
                }}
              >
                {formatISOString(result.completed_at)}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  minWidth: { xs: 50, sm: 60, md: 80 },
                }}
              >
                Nộp bài
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: 'text.primary',
                  fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' },
                }}
              >
                {formatISOString(result.completed_at)}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: { xs: 1, sm: 1.5, md: 2 } }} />

        {/* Câu trả lời */}
        <Box sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
              color: 'text.primary',
              letterSpacing: '0.05em',
              mb: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            CÂU TRẢ LỜI
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={{
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            }}
            gap={{ xs: 1, sm: 1.5, md: 2 }}
          >
            {/* Số câu đúng */}
            <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                Số câu đúng
              </Typography>
              <Chip
                label={correctCount}
                size="small"
                sx={{
                  bgcolor: '#4caf50',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  height: { xs: 22, sm: 24, md: 28 },
                  minWidth: { xs: 28, sm: 32, md: 36 },
                }}
              />
            </Box>

            {/* Số câu sai */}
            <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                Số câu sai
              </Typography>
              <Chip
                label={incorrectCount}
                size="small"
                sx={{
                  bgcolor: '#f44336',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  height: { xs: 22, sm: 24, md: 28 },
                  minWidth: { xs: 28, sm: 32, md: 36 },
                }}
              />
            </Box>

            {/* Câu chưa làm */}
            <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                Câu chưa làm
              </Typography>
              <Chip
                label={unansweredCount}
                size="small"
                sx={{
                  bgcolor: '#424242',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                  height: { xs: 22, sm: 24, md: 28 },
                  minWidth: { xs: 28, sm: 32, md: 36 },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: { xs: 1, sm: 1.5, md: 2 } }} />

        {/* Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={{ xs: 1, sm: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
            <Button
              onClick={() => onViewDetail(result.attempts)}
              variant="contained"
              fullWidth={window.innerWidth < 600}
              sx={{
                borderRadius: 999,
                backgroundColor: '#2f7567',
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.875rem' },
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 0.75, sm: 1 },
                minWidth: { sm: 100 },
              }}
            >
              Chi tiết
            </Button>
            <Button
              onClick={onRetake}
              variant="contained"
              fullWidth={window.innerWidth < 600}
              sx={{
                borderRadius: 999,
                backgroundColor: '#2f7567',
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.875rem' },
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 0.75, sm: 1 },
                minWidth: { sm: 100 },
              }}
            >
              Làm lại
            </Button>
          </Stack>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            variant="contained"
            fullWidth={window.innerWidth < 600}
            sx={{
              borderRadius: 999,
              backgroundColor: '#3f51b5',
              fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.875rem' },
              px: { xs: 2, sm: 2.5, md: 3 },
              py: { xs: 0.75, sm: 1 },
              minWidth: { sm: 120 },
            }}
          >
            Về trang chủ
          </Button>
        </Stack>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseAttempts}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: { xs: '90vw', sm: 400, md: 450 },
            maxWidth: '100%',
            maxHeight: '70vh',
          },
        }}
      >
        <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>Lịch sử làm bài</Typography>

          <Stack spacing={1}>
            {attempts.map((a) => (
              <Paper
                key={a.progress_id}
                variant="outlined"
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f5f7fa' },
                }}
                onClick={() => {
                  handleCloseAttempts();
                  onViewDetail(a.attemptNumber);
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={600} sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
                    Lần {a.attemptNumber}
                  </Typography>
                  <Chip size="small" icon={a.passed ? <CheckCircle /> : <Cancel />} label={a.passed ? 'Đậu' : 'Rớt'} color={a.passed ? 'success' : 'error'} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }} />
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18 }, mt: 0.5 }}>
                  {a.score} điểm • {a.percentage}%
                </Typography>

                <Stack direction="row" spacing={1} mt={0.5} alignItems="center" flexWrap="wrap">
                  <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Đúng {a.correct_answers}/{a.total_questions}
                  </Typography>

                  {a.time_spent && (
                    <>
                      <Typography variant="caption">•</Typography>
                      <AccessTime sx={{ fontSize: { xs: 12, sm: 14 } }} />
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        {Math.floor(a.time_spent / 60)}p
                      </Typography>
                    </>
                  )}
                </Stack>

                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                  {formatISOString(a.completed_at)}
                </Typography>
              </Paper>
            ))}

            {attempts.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                Chưa có lịch sử làm bài
              </Typography>
            )}
          </Stack>
        </Box>
      </Popover>
    </Paper>
  );
}
