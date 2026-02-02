import { Box, Card, CardContent, Chip, Typography, LinearProgress, Tooltip } from '@mui/material';
import { IconClock, IconHelpCircle, IconTrophy, IconCheck } from '@tabler/icons-react';

interface LessonQuizCardProps {
  quiz: {
    quiz_id: string;
    title: string;
    question_count: number;
    duration_minutes?: number;
    passing_score: number;
  };
  result?: {
    progress_id: string;
    percentage: number;
    passed: boolean;
    correct_answers: number;
    total_questions: number;
    completed_at: string;
  };
  onClick: () => void;
}

export default function LessonQuizCard({ quiz, result, onClick }: LessonQuizCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        border: '1px solid',
        borderColor: result ? (result.passed ? 'success.light' : 'warning.light') : 'primary.light',
        bgcolor: result ? (result.passed ? 'success.50' : 'warning.50') : 'white',
        '&:hover': {
          boxShadow: 3,
          borderColor: result ? (result.passed ? 'success.main' : 'warning.main') : 'primary.main',
        },
        transition: 'all 0.2s',
      }}
    >
      <CardContent sx={{ p: { xs: 0.5, sm: 1 }, '&:last-child': { pb: { xs: 0.5, sm: 0.5 } } }}>
        {result ? (
          // Hiển thị kết quả
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, width: '100%', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  borderRadius: '50%',
                  bgcolor: result.passed ? 'success.main' : 'warning.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'white',
                  position: 'relative',
                  top: -11, // 👈 kéo lên
                }}
              >
                {result.passed ? <IconTrophy size={15} /> : <IconCheck size={15} />}
              </Box>
              <Box sx={{ gap: 1, flex: 1, alignItems: 'center' }}>
                <Tooltip title={quiz.title} arrow placement="top-start">
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      maxWidth: 260,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      cursor: 'help',
                    }}
                  >
                    {quiz.title}

                    <Chip
                      component="span"
                      icon={<IconCheck size={12} />}
                      label={`${result.correct_answers}/${result.total_questions}`}
                      size="small"
                      sx={{
                        ml: 0.75, // 👈 KHOẢNG CÁCH NHẸ
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: 'transparent',
                        border: '1px solid',
                        borderColor: result.passed ? 'success.main' : 'warning.main',
                        verticalAlign: 'middle',
                      }}
                    />
                  </Typography>
                </Tooltip>

                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  Lần làm gần nhất
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end', // 👈 SÁT PHẢI
                  gap: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Typography variant="caption" fontWeight="bold" color="primary" sx={{ fontSize: '0.75rem' }}>
                    Xem kết quả →
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: result.passed ? 'success.main' : 'warning.main',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                    }}
                  >
                    {result.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
                  </Typography>
                  <Chip label={`${Math.round(result.percentage)}%`} size="small" color={result.passed ? 'success' : 'warning'} sx={{ height: 24, fontSize: '0.75rem', minWidth: 42, fontWeight: 'bold' }} />
                </Box>
              </Box>
            </Box>
            <LinearProgress variant="determinate" value={result.percentage} sx={{ height: 3, borderRadius: 3, mb: 0.5, '& .MuiLinearProgress-bar': { bgcolor: result.passed ? 'success.main' : 'warning.main' } }} />
          </>
        ) : (
          // Hiển thị thông tin quiz chưa làm
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, width: '100%', justifyContent: 'space-between' }}>
            <Box
              sx={{
                width: 25,
                height: 25,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'white',
                position: 'relative',
                top: -10, // 👈 kéo lên
              }}
            >
              <IconHelpCircle size={25} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }} noWrap>
                {quiz.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                <Chip label={`${quiz.question_count} câu`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                {quiz.duration_minutes && <Chip icon={<IconClock size={12} />} label={`${quiz.duration_minutes}p`} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />}
              </Box>
            </Box>

            <Typography variant="caption" fontWeight="bold" color="primary" sx={{ fontSize: '0.75rem' }}>
              Làm bài →
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
