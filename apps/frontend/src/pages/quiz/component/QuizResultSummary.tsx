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
  // const formatTime = (seconds?: number) => {
  //   if (!seconds) return '--:--';
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins}:${secs.toString().padStart(2, '0')}`;
  // };

  const getType = (score: number) => {
    if (score >= 8) return 'Giỏi';
    if (score >= 6.5) return 'Khá';
    if (score >= 5) return 'Trung bình';
    return 'Yếu';
  };

  // const isPassed = result.passed;
  // const percentage = Math.round(result.percentage);
  const { authData } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const open = Boolean(anchorEl);
  const { fetchTheme } = useThemeStore();

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
    // Tính percentage: nếu có score thì tính theo score, không thì dùng defaultPercentage
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
              {/* Số nguyên */}
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

              {/* Dấu chấm */}
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

              {/* Số thập phân */}
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
        overflow: 'hidden',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          width: 1000,
          margin: 'auto',
          p: 2,
          flex: 1,
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            Chúc mừng,{' '}
            <Typography component="span" sx={{ fontWeight: 700, fontSize: 26 }}>
              {authData?.name || 'admin'}
            </Typography>
            đã hoàn thành bài thi
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={10}
          sx={{
            padding: 2,
            borderRadius: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Typography variant="body1" sx={{ minWidth: 60, fontWeight: 500 }}>
              Điểm
            </Typography>
            <ScoreCircle score={result.score} size={200} color="#3f51b5" />
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="body1" sx={{ minWidth: 60, fontWeight: 500 }}>
                Loại
              </Typography>
              <ScoreCircle text={getType(result.score)} size={80} defaultPercentage={75} color="#3f51b5" thickness={4} />
            </Box>

            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="body1" sx={{ minWidth: 60, fontWeight: 500 }}>
                Đúng
              </Typography>
              <ScoreCircle text={`${result.percentage}%`} size={80} defaultPercentage={80.45} color="#3f51b5" thickness={4} />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'text.primary',
                letterSpacing: '0.05em',
              }}
            >
              LƯỢT THI
            </Typography>
            <IconButton size="small" sx={{ color: 'text.secondary' }} onClick={handleOpenAttempts}>
              <IconClock fontSize="small" />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                minWidth: 80,
              }}
            >
              Lần thứ
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {result.attempts}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'text.primary',
              letterSpacing: '0.05em',
              mb: 1.5,
            }}
          >
            THỜI GIAN
          </Typography>

          {/* Bắt đầu */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                minWidth: 80,
              }}
            >
              Bắt đầu
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              {formatISOString(result.completed_at)}
            </Typography>
          </Box>

          {/* Nộp bài */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                minWidth: 80,
              }}
            >
              Nộp bài
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              {formatISOString(result.completed_at)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'text.primary',
              letterSpacing: '0.05em',
              mb: 2,
            }}
          >
            CÂU TRẢ LỜI
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            {/* Số câu đúng */}
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Số câu đúng
              </Typography>
              <Chip
                label={result.correct_answers}
                size="small"
                sx={{
                  bgcolor: '#4caf50',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  height: 28,
                  minWidth: 36,
                }}
              />
            </Box>

            {/* Số câu sai */}
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Số câu sai
              </Typography>
              <Chip
                label={result.total_questions - result.correct_answers}
                size="small"
                sx={{
                  bgcolor: '#f44336',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  height: 28,
                  minWidth: 36,
                }}
              />
            </Box>

            {/* Câu chưa làm */}
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Câu chưa làm
              </Typography>
              <Chip
                label={0}
                size="small"
                sx={{
                  bgcolor: '#424242',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  height: 28,
                  minWidth: 36,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box display="flex" gap={2}>
            <Button onClick={() => onViewDetail(result.attempts)} variant="contained" sx={{ borderRadius: 999, backgroundColor: '#2f7567' }}>
              Chi tiết
            </Button>
            <Button onClick={onRetake} variant="contained" sx={{ borderRadius: 999, backgroundColor: '#2f7567' }}>
              Làm lại
            </Button>
          </Box>

          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} variant="contained" sx={{ borderRadius: 999, backgroundColor: '#3f51b5' }}>
            Về trang chủ
          </Button>
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseAttempts}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: { xs: '90vw', sm: 360 },
            maxHeight: '70vh',
          },
        }}
      >
        <Box sx={{ p: 2, width: 360 }}>
          <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Lịch sử làm bài</Typography>

          <Stack spacing={1}>
            {attempts.map((a) => (
              <Paper
                key={a.progress_id}
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f5f7fa' },
                }}
                onClick={() => {
                  handleCloseAttempts();
                  onViewDetail(a.attemptNumber);
                }}
              >
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={600}>Lần {a.attemptNumber}</Typography>

                  <Chip size="small" icon={a.passed ? <CheckCircle /> : <Cancel />} label={a.passed ? 'Đậu' : 'Rớt'} color={a.passed ? 'success' : 'error'} />
                </Box>

                {/* Score */}
                <Typography sx={{ fontWeight: 700, fontSize: 18, mt: 0.5 }}>
                  {a.score} điểm • {a.percentage}%
                </Typography>

                {/* Details */}
                <Stack direction="row" spacing={1} mt={0.5} alignItems="center">
                  <Typography variant="caption">
                    Đúng {a.correct_answers}/{a.total_questions}
                  </Typography>

                  {a.time_spent && (
                    <>
                      <Typography variant="caption">•</Typography>
                      <AccessTime sx={{ fontSize: 14 }} />
                      <Typography variant="caption">{Math.floor(a.time_spent / 60)}p</Typography>
                    </>
                  )}
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  {formatISOString(a.completed_at)}
                </Typography>
              </Paper>
            ))}

            {attempts.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Chưa có lịch sử làm bài
              </Typography>
            )}
          </Stack>
        </Box>
      </Popover>
    </Paper>
  );
}
