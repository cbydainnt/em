import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { IconClock, IconHelp } from '@tabler/icons-react';
import { ArcProgress } from './ui/ArcProgress';

interface Quiz {
  quiz_id: string;
  title: string;
  question_count: number;
  duration_minutes?: number;
  passing_score: number;
  total_points: number;
}

interface LatestResult {
  progress_id: string;
  percentage: number;
  passed: boolean;
  attempts: number;
  score: number;
  correct_answers: number;
  total_questions: number;
  completed_at: string;
}

interface InProgressData {
  progress_id: string;
  time_spent: number;
  updated_at: string;
  answers: any[];
  status: number;
}

interface LessonQuizPlaceholderProps {
  quiz: Quiz;
  latestResult?: LatestResult;
  inProgress?: InProgressData;
  onStart: () => void;
  onContinue?: () => void;
  onViewResult: () => void;
}

export default function LessonQuizPlaceholder({ quiz, latestResult, inProgress, onStart, onContinue, onViewResult }: LessonQuizPlaceholderProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Chưa có dữ liệu';

    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Ngày không hợp lệ';
    }
  };

  // ========== ĐANG LÀM DỞ ==========
  if (inProgress && inProgress.status === 1) {
    const answeredCount = inProgress.answers?.length || 0;

    return (
      <Box sx={{ bgcolor: '#FAF8F3', borderRadius: 2, p: 2, justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          {quiz.title}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0 }}>
          (Đang làm dở - Lần cuối truy cập: {formatDate(inProgress.updated_at || new Date().toISOString())})
        </Typography>

        <Box sx={{ bgcolor: '#2196F3', color: 'white', borderRadius: 1, p: 1, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Tiếp tục làm bài chưa hoàn thành
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          {/* Circular Progress */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <ArcProgress achievedPercent={(0 / quiz.question_count) * 100} requiredPercent={quiz.passing_score} label="Điểm của bạn" valueText={`0`} />
          </Box>

          {/* Stats Grid */}
          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <IconHelp size={16} color="#2196F3" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {quiz.question_count}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Tổng số câu
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <IconClock size={16} color="#FF9800" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {quiz.duration_minutes ? `${quiz.duration_minutes}:00` : '30:00'}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Thời gian (Tối đa)
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <span style={{ fontSize: '1rem' }}>✅</span>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {answeredCount}/{quiz.question_count}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Đã trả lời
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <span style={{ fontSize: '1rem' }}>⏱️</span>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {Math.floor((inProgress.time_spent || 0) / 60)}:{(inProgress.time_spent || 0) % 60 < 10 ? '0' : ''}
                    {(inProgress.time_spent || 0) % 60}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Thời gian đã làm
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={onContinue}
            size="small"
            sx={{
              bgcolor: '#2196F3',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#1976D2' },
            }}
          >
            Tiếp tục làm bài
          </Button>
          <Button
            variant="outlined"
            onClick={onStart}
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderColor: '#2196F3',
              color: '#2196F3',
              '&:hover': { bgcolor: '#E3F2FD', borderColor: '#1976D2' },
            }}
          >
            Làm lại từ đầu
          </Button>
        </Box>
      </Box>
    );
  }

  if (latestResult) {
    const isPassed = latestResult.passed;
    const percentage = Math.round(latestResult.percentage);
    const score = latestResult.score;
    return (
      <Box sx={{ bgcolor: '#FAF8F3', borderRadius: 2, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0 }}>
          {quiz.title}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0 }}>
          (Ghi nhận lần cuối lúc: {formatDate(latestResult.completed_at)})
        </Typography>

        <Box sx={{ bgcolor: isPassed ? '#4CAF50' : '#FF9800', color: 'white', borderRadius: 1, p: 1, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Điều kiện qua: {quiz.passing_score}% đúng
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <ArcProgress achievedPercent={(percentage / quiz.question_count) * 100} requiredPercent={quiz.passing_score} label="Điểm của bạn" valueText={`${score}`} />

          {/* Stats Grid */}
          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <IconHelp size={16} color="#2196F3" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {quiz.question_count}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Số câu hỏi
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <IconClock size={16} color="#FF9800" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {quiz.duration_minutes ? `${quiz.duration_minutes}:00` : '30:00'}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Thời gian (Tối đa)
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <span style={{ fontSize: '1rem' }}>ℹ️</span>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Lần {latestResult.attempts}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Số lần làm bài
                </Typography>
              </CardContent>
            </Card>

            {/* <Card sx={{ bgcolor: 'white' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <IconCheck size={16} color="#4CAF50" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {latestResult.correct_answers}/{latestResult.total_questions}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Số lần làm bài
                </Typography>
              </CardContent>
            </Card> */}
          </Box>
        </Box>

        {/* Message */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <span style={{ fontSize: '1.5rem' }}>{isPassed ? '🤩' : '😥'}</span>
          <Box
            sx={{
              flex: 1,
              bgcolor: isPassed ? '#2E7D32' : '#E65100',
              color: 'white',
              borderRadius: 1,
              p: 1,
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {isPassed ? 'Em đã tiến bộ rõ rệt rồi, hãy tự tin lên nhé!' : 'Quan trọng là em đã cố gắng, đừng bỏ cuộc!'}
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={onViewResult} size="small" sx={{ textTransform: 'none', fontWeight: 600 }}>
            Xem giải chi tiết
          </Button>
          <Button
            variant="contained"
            onClick={onStart}
            size="small"
            sx={{
              bgcolor: '#C62828',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#B71C1C' },
            }}
          >
            Làm lại
          </Button>
        </Box>
      </Box>
    );
  }

  // ========== CHƯA LÀM ==========
  return (
    <Box sx={{ bgcolor: '#FAF8F3', borderRadius: 2, p: 2, alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {quiz.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <ArcProgress achievedPercent={(0 / quiz.question_count) * 100} requiredPercent={quiz.passing_score} label="Điểm của bạn" valueText={`0`} />

        {/* Stats Grid */}
        <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
          <Card sx={{ bgcolor: 'white' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <IconHelp size={16} color="#2196F3" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {quiz.question_count}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Số câu hỏi
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: 'white' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <IconClock size={16} color="#FF9800" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {quiz.duration_minutes ? `${quiz.duration_minutes}:00` : '30:00'}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Thời gian (Tối đa)
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: 'white' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <span style={{ fontSize: '1rem' }}>ℹ️</span>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  0/3
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Số lần tạm dừng
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: 'white' }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                <span style={{ fontSize: '1rem' }}>▶️</span>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  0/{quiz.question_count}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Số lần làm bài
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={onStart}
        size="small"
        sx={{
          bgcolor: '#C62828',
          textTransform: 'none',
          fontWeight: 600,
          mb: 1,
          alignItems: 'center',
          textAlign: 'center',
          '&:hover': { bgcolor: '#B71C1C' },
        }}
      >
        Làm bài
      </Button>
    </Box>
  );
}
