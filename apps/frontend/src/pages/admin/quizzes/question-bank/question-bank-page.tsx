import AdminLayout from '@/pages/admin/layout/AdminLayout';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination, Snackbar, Alert, TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, Select, MenuItem, Grid, Card, CardContent, Badge, Tooltip, Fab, Zoom, Fade, CircularProgress, Breadcrumbs, Divider, ToggleButton, ToggleButtonGroup, Menu, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { IconEdit, IconTrash, IconAlertCircle, IconSearch, IconCheck, IconBook, IconArrowLeft, IconFilter, IconArticle, IconHeadphones, IconFileText, IconArrowsShuffle, IconListNumbers, IconForms, IconCheckbox, IconAbc, IconBrain, IconEye, IconPlus, IconDotsVertical, IconRefresh, IconFilterOff, IconCopy, IconExternalLink, IconSortAscending, IconSortDescending, IconQuestionMark, IconDatabase } from '@tabler/icons-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import QuestionFormDialog from './question-form';
import axios from 'axios';
import { debounce } from 'lodash';

// Types
interface QuestionType {
  question_id: string;
  question_text: string;
  question_type: number;
  points: number;
  difficulty: number;
  explanation?: string;
  order: number;
  created_at: string;
  updated_at: string;
  quiz?: {
    quiz_id: string;
    title: string;
    quiz_type: number;
    status: number;
  };
  answers: AnswerType[];
  audio?: {
    audio_id: string;
    title?: string;
    duration_seconds: number;
  };
  reading_passage?: {
    reading_passage_id: string;
    title?: string;
    content: string;
    difficulty: number;
  };
}

interface AnswerType {
  answer_id?: string;
  answer_text: string;
  is_correct: boolean;
  order: number;
  match_key?: string;
  blank_position?: number;
}

interface QuestionStats {
  total: number;
  withAudio: number;
  withReading: number;
  withAnswers: number;
  withoutAnswers: number;
  averageDifficulty: number;
  totalPoints: number;
  byType: Record<number, number>;
  byDifficulty: Record<number, number>;
}

interface LessonQuiz {
  quiz_id: string;
  title: string;
  quiz_type: number;
}

// Constants
const QUESTION_TYPES: Record<
  number,
  {
    label: string;
    icon: JSX.Element;
    color: string;
    description: string;
    shortLabel: string;
  }
> = {
  1: {
    label: 'Một đáp án',
    shortLabel: 'Single',
    icon: <IconCheckbox className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'primary',
    description: 'Chọn một đáp án đúng',
  },
  2: {
    label: 'Nhiều đáp án',
    shortLabel: 'Multi',
    icon: <IconListNumbers className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'secondary',
    description: 'Chọn nhiều đáp án đúng',
  },
  3: {
    label: 'Điền vào chỗ trống',
    shortLabel: 'Fill',
    icon: <IconAbc className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'info',
    description: 'Điền từ vào chỗ trống',
  },
  4: {
    label: 'Đúng/Sai',
    shortLabel: 'T/F',
    icon: <IconCheck className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'warning',
    description: 'Câu hỏi đúng/sai',
  },
  5: {
    label: 'Nối',
    shortLabel: 'Match',
    icon: <IconArrowsShuffle className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'error',
    description: 'Nối cặp phù hợp',
  },
  6: {
    label: 'Sắp xếp',
    shortLabel: 'Sort',
    icon: <IconForms className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'success',
    description: 'Sắp xếp theo thứ tự',
  },
  7: {
    label: 'Tự luận',
    shortLabel: 'Essay',
    icon: <IconFileText className="text-gray-400 mx-auto mb-2" size={16} />,
    color: 'default',
    description: 'Câu hỏi tự luận',
  },
};

const QUIZ_TYPES = {
  1: { label: 'Bài kiểm tra', color: 'primary', icon: <IconBook className="text-gray-400 mx-auto mb-2" size={14} /> },
  2: { label: 'Bài thi khóa học', color: 'secondary', icon: <IconBrain className="text-gray-400 mx-auto mb-2" size={14} /> },
  3: { label: 'Thi cuối kỳ', color: 'error', icon: <IconAlertCircle className="text-gray-400 mx-auto mb-2" size={14} /> },
  4: { label: 'IELTS', color: 'success', icon: <IconEye className="text-gray-400 mx-auto mb-2" size={14} /> },
  5: { label: 'TOEIC', color: 'info', icon: <IconHeadphones className="text-gray-400 mx-auto mb-2" size={14} /> },
};

const DIFFICULTY_LEVELS: Record<
  number,
  {
    label: string;
    color: string;
    score: number;
    description: string;
  }
> = {
  1: { label: 'Rất dễ', color: 'success', score: 1, description: 'Mức độ cơ bản' },
  2: { label: 'Dễ', color: 'info', score: 2, description: 'Mức độ nhận biết' },
  3: { label: 'Trung bình', color: 'warning', score: 3, description: 'Mức độ thông hiểu' },
  4: { label: 'Khó', color: 'error', score: 4, description: 'Mức độ vận dụng' },
  5: { label: 'Rất khó', color: 'error', score: 5, description: 'Mức độ phân tích' },
};

const SORT_OPTIONS = [
  { value: 'created_at_desc', label: 'Mới nhất', icon: <IconSortDescending size={16} /> },
  { value: 'created_at_asc', label: 'Cũ nhất', icon: <IconSortAscending size={16} /> },
  { value: 'difficulty_desc', label: 'Khó nhất', icon: <IconSortDescending size={16} /> },
  { value: 'difficulty_asc', label: 'Dễ nhất', icon: <IconSortAscending size={16} /> },
  { value: 'points_desc', label: 'Điểm cao nhất', icon: <IconSortDescending size={16} /> },
  { value: 'points_asc', label: 'Điểm thấp nhất', icon: <IconSortAscending size={16} /> },
  { value: 'question_text_asc', label: 'A → Z', icon: <IconSortAscending size={16} /> },
  { value: 'question_text_desc', label: 'Z → A', icon: <IconSortDescending size={16} /> },
];

export default function QuestionBankManagementPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const quizIdParam = params.get('quiz_id');

  // State management
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [page, setPage] = useState<number>(Number(params.get('page') || '1'));
  const [rowsPerPage, setRowsPerPage] = useState(Number(params.get('pageSize') || '20'));
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteBulk, setDeleteBulk] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [searchText, setSearchText] = useState(params.get('search') || '');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [stats, setStats] = useState<QuestionStats>({
    total: 0,
    withAudio: 0,
    withReading: 0,
    withAnswers: 0,
    withoutAnswers: 0,
    averageDifficulty: 0,
    totalPoints: 0,
    byType: {},
    byDifficulty: {},
  });

  // Filter states
  const [filters, setFilters] = useState({
    questionType: params.get('question_type') || '',
    difficulty: params.get('difficulty') || '',
    quizType: params.get('quiz_type') || '',
    hasAudio: params.get('has_audio') || '',
    hasReading: params.get('has_reading') || '',
    hasAnswers: params.get('has_answers') || '',
    minPoints: params.get('min_points') || '',
    maxPoints: params.get('max_points') || '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState(params.get('sort') || 'created_at_desc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [loadingStats, setLoadingStats] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null);
  // const [exportLoading, setExportLoading] = useState(false);

  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionType | null>(null);
  const [_lessonQuizzes, setLessonQuizzes] = useState<LessonQuiz[]>([]);
  const [_loadingQuizzes, setLoadingQuizzes] = useState(false);
  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setPage(1);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      setParams(params);
    }, 500),
    [],
  );

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  // Load lesson quizzes for dropdown
  const loadLessonQuizzes = useCallback(async (search?: string) => {
    setLoadingQuizzes(true);
    try {
      const response = await axios.get(`/api/admin/questions/lesson-quizzes`, {
        params: { search },
      });
      if (response.data) {
        setLessonQuizzes(response.data);
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
    setLoadingQuizzes(false);
  }, []);

  // Load questions data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Đảm bảo các tham số đúng kiểu
      const params: any = {
        page,
        pageSize: rowsPerPage,
        search: searchText || undefined,
        sort: sortBy,
      };

      // Chỉ thêm tham số nếu có giá trị
      if (quizIdParam) params.quiz_id = quizIdParam;
      if (filters.questionType) params.question_type = parseInt(filters.questionType);
      if (filters.difficulty) params.difficulty = parseInt(filters.difficulty);
      if (filters.quizType) params.quiz_type = parseInt(filters.quizType);
      if (filters.hasAudio) params.has_audio = filters.hasAudio;
      if (filters.hasReading) params.has_reading = filters.hasReading;
      if (filters.hasAnswers) params.has_answers = filters.hasAnswers;
      if (filters.minPoints) params.min_points = parseFloat(filters.minPoints);
      if (filters.maxPoints) params.max_points = parseFloat(filters.maxPoints);

      const response = await axios.get(`/api/admin/questions`, { params });

      if (response.data) {
        setQuestions(response.data.data);
        setTotalQuestions(response.data.total);

        if (quizIdParam && response.data.data.length > 0 && response.data.data[0].quiz) {
          setQuizTitle(response.data.data[0].quiz.title);
        }
      }
    } catch (error: any) {
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Không thể tải dữ liệu',
        severity: 'error',
      });
    }
    setLoading(false);
  }, [page, rowsPerPage, searchText, quizIdParam, filters, sortBy]);

  // Load statistics
  const loadStatistics = useCallback(async () => {
    setLoadingStats(true);
    try {
      const response = await axios.get(`/api/admin/questions/stats`, {
        params: {
          quiz_id: quizIdParam || undefined,
          question_type: filters.questionType || undefined,
          difficulty: filters.difficulty || undefined,
          has_audio: filters.hasAudio || undefined,
          has_reading: filters.hasReading || undefined,
        },
      });

      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
    setLoadingStats(false);
  }, [quizIdParam, filters]);

  // Initial load
  useEffect(() => {
    loadData();
    loadStatistics();
    loadLessonQuizzes();
  }, [loadData, loadStatistics]);

  // Handle select all
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = questions.map((n) => n.question_id);
      setSelectedRowKeys(newSelected);
      return;
    }
    setSelectedRowKeys([]);
  };

  // Handle single selection
  const handleClick = (id: string, event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.closest('.question-actions') || event.target.closest('.MuiAccordionSummary-expandIconWrapper')) {
        return;
      }
    }

    const selectedIndex = selectedRowKeys.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRowKeys, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRowKeys.slice(1));
    } else if (selectedIndex === selectedRowKeys.length - 1) {
      newSelected = newSelected.concat(selectedRowKeys.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRowKeys.slice(0, selectedIndex), selectedRowKeys.slice(selectedIndex + 1));
    }

    setSelectedRowKeys(newSelected);
  };

  const isSelected = (id: string) => selectedRowKeys.indexOf(id) !== -1;

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setPage(1);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setParams(params);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      questionType: '',
      difficulty: '',
      quizType: '',
      hasAudio: '',
      hasReading: '',
      hasAnswers: '',
      minPoints: '',
      maxPoints: '',
    });
    setPage(1);
    setSearchText('');

    const newParams = new URLSearchParams();
    if (quizIdParam) newParams.set('quiz_id', quizIdParam);
    setParams(newParams);
  };

  // Handle pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1);
    params.set('page', String(newPage + 1));
    setParams(params);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    params.set('pageSize', String(newRowsPerPage));
    params.set('page', '1');
    setParams(params);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    params.set('sort', value);
    setParams(params);
  };

  // Delete handlers
  const handleDeleteDialogOpen = (id?: string) => {
    if (id) {
      setDeleteTargetId(id);
      setDeleteBulk(false);
    } else {
      setDeleteTargetId(null);
      setDeleteBulk(true);
    }
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteTargetId(null);
    setDeleteBulk(false);
  };

  const handleConfirmDelete = async () => {
    const ids = deleteTargetId ? [deleteTargetId] : selectedRowKeys;
    await deleteItems(ids);
    handleDeleteDialogClose();
  };

  const deleteItems = async (ids: string[]) => {
    setLoading(true);
    try {
      if (ids.length === 1) {
        await axios.delete(`/api/admin/questions/${ids[0]}`);
        setSnackbar({
          open: true,
          message: 'Xóa câu hỏi thành công',
          severity: 'success',
        });
      } else {
        await axios.post(`/api/admin/questions/bulk-delete`, { ids });
        setSnackbar({
          open: true,
          message: `Xóa ${ids.length} câu hỏi thành công`,
          severity: 'success',
        });
      }
      setSelectedRowKeys([]);
      await loadData();
      await loadStatistics();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, question: QuestionType) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedQuestion(question);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedQuestion(null);
  };

  // Navigation
  const handleBackToQuiz = () => {
    navigate('/admin/manage/quizzes');
  };

  // Open create question dialog
  const handleOpenCreateDialog = () => {
    setEditingQuestion(null);
    setOpenQuestionDialog(true);
  };

  // Open edit question dialog
  const handleEditQuestion = (question: QuestionType) => {
    setEditingQuestion(question);
    setOpenQuestionDialog(true);
  };

  // Close question dialog
  const handleCloseQuestionDialog = () => {
    setOpenQuestionDialog(false);
    setEditingQuestion(null);
  };

  // Save question (create or update)
  const handleSaveQuestion = async (formData: any) => {
    setLoading(true);
    try {
      const apiData = {
        ...formData,
        audio_id: formData.audio_id || null,
        reading_passage_id: formData.reading_passage_id || null,
        quiz_id: formData.quiz_id || null,
      };

      if (editingQuestion) {
        await axios.put(`/api/admin/questions/${editingQuestion.question_id}`, apiData);
        setSnackbar({
          open: true,
          message: 'Cập nhật câu hỏi thành công',
          severity: 'success',
        });
      } else {
        await axios.post(`/api/admin/questions`, apiData);
        setSnackbar({
          open: true,
          message: 'Tạo câu hỏi thành công',
          severity: 'success',
        });
      }

      handleCloseQuestionDialog();
      await loadData();
      await loadStatistics();
    } catch (error: any) {
      console.error('Error saving question:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  // Duplicate question
  const handleDuplicateQuestion = async (questionId: string) => {
    try {
      await axios.post(`/api/admin/questions/${questionId}/duplicate`);
      setSnackbar({
        open: true,
        message: 'Nhân bản câu hỏi thành công',
        severity: 'success',
      });
      await loadData();
      await loadStatistics();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể nhân bản câu hỏi',
        severity: 'error',
      });
    }
  };

  // Bulk duplicate
  const handleBulkDuplicate = async () => {
    if (selectedRowKeys.length === 0) return;

    try {
      await axios.post('/api/admin/questions/bulk-duplicate', { ids: selectedRowKeys });
      setSnackbar({
        open: true,
        message: `Nhân bản ${selectedRowKeys.length} câu hỏi thành công`,
        severity: 'success',
      });
      await loadData();
      await loadStatistics();
      setSelectedRowKeys([]);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Không thể nhân bản',
        severity: 'error',
      });
    }
  };

  // Render question content in accordion
  const renderQuestionContent = (question: QuestionType) => {
    const hasNoAnswers = !question.answers || question.answers.length === 0;
    return (
      <Box>
        {/* Answers section */}
        {!hasNoAnswers ? (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: 'text.secondary',
                '.dark &': { color: '#9ca3af' },
              }}
            >
              Đáp án ({question.answers.length}):
            </Typography>
            <Grid container spacing={1}>
              {question.answers
                .sort((a, b) => a.order - b.order)
                .map((answer, idx) => (
                  <Grid item xs={12} key={answer.answer_id || idx}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: answer.is_correct ? 'success.light' : 'grey.50',
                        border: `2px solid ${answer.is_correct ? 'success.main' : 'grey.300'}`,
                        borderRadius: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        // Dark mode
                        '.dark &': {
                          bgcolor: answer.is_correct ? 'rgba(34, 197, 94, 0.2)' : '#1f2937',
                          borderColor: answer.is_correct ? '#22c55e' : '#4b5563',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: answer.is_correct ? 'success.main' : 'grey.400',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            flexShrink: 0,
                            // Dark mode
                            '.dark &': {
                              bgcolor: answer.is_correct ? '#22c55e' : '#6b7280',
                            },
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              wordBreak: 'break-word',
                              '.dark &': { color: '#f3f4f6' },
                            }}
                          >
                            {answer.answer_text}
                          </Typography>

                          {question.question_type === 3 && answer.blank_position && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 0.5,
                                color: 'text.secondary',
                                '.dark &': { color: '#9ca3af' },
                              }}
                            >
                              Vị trí chỗ trống: {answer.blank_position}
                            </Typography>
                          )}

                          {question.question_type === 5 && answer.match_key && (
                            <Typography
                              variant="caption"
                              sx={{
                                display: 'block',
                                mt: 0.5,
                                color: 'text.secondary',
                                '.dark &': { color: '#9ca3af' },
                              }}
                            >
                              Khớp với: {answer.match_key}
                            </Typography>
                          )}
                        </Box>

                        {answer.is_correct && (
                          <Box sx={{ flexShrink: 0 }}>
                            <IconCheck
                              size={20}
                              style={{
                                color: 'green',
                              }}
                            />
                          </Box>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: 'warning.light',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'warning.main',
              // Dark mode
              '.dark &': {
                bgcolor: 'rgba(234, 179, 8, 0.2)',
                borderColor: '#eab308',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconAlertCircle
                size={20}
                style={{
                  color: 'orange',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'warning.dark',
                  '.dark &': { color: '#fbbf24' },
                }}
              >
                Câu hỏi này chưa có đáp án
              </Typography>
            </Box>
          </Box>
        )}

        {/* Explanation */}
        {question.explanation && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: 'info.light',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'info.main',
              // Dark mode
              '.dark &': {
                bgcolor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
              },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: 'info.dark',
                '.dark &': { color: '#93c5fd' },
              }}
            >
              Giải thích:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                '.dark &': { color: '#d1d5db' },
              }}
            >
              {question.explanation}
            </Typography>
          </Box>
        )}

        {/* Timestamps */}
        {/* <Box sx={{ 
    display: 'flex', 
    gap: 3, 
    mt: 2, 
    pt: 2, 
    borderTop: '1px solid', 
    borderColor: 'divider',
    '.dark &': {
      borderColor: '#4b5563',
    }
  }}>
    <Typography 
      variant="caption" 
      sx={{
        color: 'text.secondary',
        '.dark &': { color: '#9ca3af' }
      }}
    >
      Tạo: {new Date(question.created_at).toLocaleString('vi-VN')}
    </Typography>
    <Typography 
      variant="caption" 
      sx={{
        color: 'text.secondary',
        '.dark &': { color: '#9ca3af' }
      }}
    >
      Cập nhật: {new Date(question.updated_at).toLocaleString('vi-VN')}
    </Typography>
  </Box> */}
      </Box>
    );
  };

  // Render question in grid view
  const renderQuestionCard = (question: QuestionType) => {
    const isItemSelected = isSelected(question.question_id);
    const hasNoAnswers = !question.answers || question.answers.length === 0;
    const questionType = QUESTION_TYPES[question.question_type];
    const difficulty = DIFFICULTY_LEVELS[question.difficulty];

    return (
      <Grid item xs={12} sm={6} md={4} key={question.question_id}>
        <Paper
          elevation={isItemSelected ? 8 : 2}
          onClick={(e) => handleClick(question.question_id, e)}
          sx={{
            cursor: 'pointer',
            height: '100%',
            border: isItemSelected ? '2px solid' : '1px solid',
            borderColor: isItemSelected ? 'primary.main' : 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 8,
            },
            // Dark mode
            '.dark &': {
              bgcolor: '#374151',
              borderColor: isItemSelected ? '#8b5cf6' : '#4b5563',
              '&:hover': {
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              },
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: isItemSelected ? 'primary.light' : 'grey.50',
              borderBottom: '1px solid',
              borderColor: 'divider',
              // Dark mode
              '.dark &': {
                bgcolor: isItemSelected ? 'rgba(139, 92, 246, 0.2)' : '#1f2937',
                borderColor: '#4b5563',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  size="small"
                  checked={isItemSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(question.question_id, e);
                  }}
                  sx={{
                    '.dark &': {
                      color: '#d1d5db',
                      '&.Mui-checked': {
                        color: '#8b5cf6',
                      },
                    },
                  }}
                />
                {questionType?.icon}
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  sx={{
                    color: '#6b7280',
                    '.dark &': { color: '#9ca3af' },
                  }}
                >
                  {questionType?.shortLabel}
                </Typography>
              </Box>

              <Box className="question-actions">
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, question)}
                  sx={{
                    ml: 1,
                    '.dark &': {
                      color: '#d1d5db',
                      '&:hover': {
                        bgcolor: '#4b5563',
                      },
                    },
                  }}
                >
                  <IconDotsVertical size={16} />
                </IconButton>
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{
                mb: 1,
                height: 60,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                wordBreak: 'break-word',
                color: '#111827',
                '.dark &': { color: '#f3f4f6' },
              }}
            >
              {question.question_text}
            </Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Chip
                  label={difficulty?.label}
                  size="small"
                  color={difficulty?.color as any}
                  sx={{
                    height: 20,
                    '.dark &': {
                      color: '#d1d5db',
                      borderColor: '#6b7280',
                      bgcolor: 'transparent',
                    },
                  }}
                />
                <Chip
                  label={`${question.points}đ`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    '.dark &': {
                      color: '#d1d5db',
                      borderColor: '#6b7280',
                    },
                  }}
                />
              </Box>

              <Badge
                badgeContent={question.answers?.length || 0}
                color={hasNoAnswers ? 'error' : 'primary'}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.6rem',
                    height: 16,
                    minWidth: 16,
                    // Dark mode
                    '.dark &': {
                      bgcolor: hasNoAnswers ? '#ef4444' : '#8b5cf6',
                      color: 'white',
                    },
                  },
                }}
              >
                <IconCheck className="text-gray-400 mx-auto mb-2" size={16} />
              </Badge>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
              {question.audio && (
                <Chip
                  icon={<IconHeadphones size={12} />}
                  label="L"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{
                    height: 20,
                    '.dark &': {
                      color: '#a78bfa',
                      borderColor: '#8b5cf6',
                    },
                  }}
                />
              )}

              {question.reading_passage && (
                <Chip
                  icon={<IconArticle size={12} />}
                  label="R"
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{
                    height: 20,
                    '.dark &': {
                      color: '#34d399',
                      borderColor: '#10b981',
                    },
                  }}
                />
              )}

              {question.quiz && (
                <Tooltip title={question.quiz.title}>
                  <Chip
                    label={QUIZ_TYPES[question.quiz.quiz_type as keyof typeof QUIZ_TYPES]?.label.charAt(0)}
                    size="small"
                    color={QUIZ_TYPES[question.quiz.quiz_type as keyof typeof QUIZ_TYPES]?.color as any}
                    variant="outlined"
                    sx={{
                      height: 20,
                      '.dark &': {
                        color: '#d1d5db',
                        borderColor: '#6b7280',
                      },
                    }}
                  />
                </Tooltip>
              )}
            </Box>

            {question.quiz && (
              <Box
                sx={{
                  p: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  mb: 1,
                  // Dark mode
                  '.dark &': {
                    bgcolor: '#4b5563',
                  },
                }}
              >
                <Typography className="text-gray-400 mx-auto mb-2" variant="caption">
                  {question.quiz.title}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
    );
  };

  // Calculate selected questions stats
  const selectedStats = {
    totalPoints: questions.filter((q) => selectedRowKeys.includes(q.question_id)).reduce((sum, q) => sum + q.points, 0),
    averageDifficulty: selectedRowKeys.length > 0 ? questions.filter((q) => selectedRowKeys.includes(q.question_id)).reduce((sum, q) => sum + q.difficulty, 0) / selectedRowKeys.length : 0,
  };

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1, '.dark &': { color: '#9ca3af' } }}>
          <Button
            variant="contained"
            onClick={() => navigate('/admin/manage/quizzes')}
            color="primary"
            sx={{
              '.dark &': {
                bgcolor: '#8b5cf6',
                '&:hover': { bgcolor: '#7c3aed' },
              },
            }}
          >
            Quay lại
          </Button>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 0 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                {quizIdParam && (
                  <Tooltip title="Quay lại quiz">
                    <IconButton
                      onClick={handleBackToQuiz}
                      size="small"
                      sx={{
                        bgcolor: 'primary.light',
                        '&:hover': { bgcolor: 'primary.main', color: 'white' },
                        '.dark &': {
                          bgcolor: '#374151',
                          color: '#d1d5db',
                          '&:hover': {
                            bgcolor: '#8b5cf6',
                            color: 'white',
                          },
                        },
                      }}
                    >
                      <IconArrowLeft size={20} />
                    </IconButton>
                  </Tooltip>
                )}
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                      '.dark &': { color: '#f3f4f6' },
                    }}
                  >
                    {quizIdParam ? 'Câu hỏi trong quiz' : 'Ngân hàng câu hỏi'}
                  </Typography>
                  {quizIdParam && quizTitle && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Quiz: <strong style={{ color: '#111827' }}>{quizTitle}</strong>
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#6b7280',
                      '.dark &': { color: '#9ca3af' },
                    }}
                  >
                    Quản lý tất cả câu hỏi trong hệ thống
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {/* <Button size="small" variant="outlined" startIcon={<IconDownload size={16} />} onClick={handleExportQuestions} disabled={exportLoading || questions.length === 0}>
          {exportLoading ? <CircularProgress size={16} /> : 'Xuất'}
        </Button> */}
              <Button
                size="small"
                variant="contained"
                startIcon={<IconPlus size={16} />}
                onClick={handleOpenCreateDialog}
                sx={{
                  '.dark &': {
                    bgcolor: '#8b5cf6',
                    '&:hover': { bgcolor: '#7c3aed' },
                  },
                }}
              >
                Thêm mới
              </Button>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_e, value) => value && setViewMode(value)}
                size="small"
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  '.dark & .MuiToggleButton-root': {
                    color: '#d1d5db',
                    borderColor: '#4b5563',
                    '&.Mui-selected': {
                      bgcolor: '#374151',
                      color: '#f3f4f6',
                      '&:hover': { bgcolor: '#4b5563' },
                    },
                    '&:hover': { bgcolor: '#4b5563' },
                  },
                }}
              >
                <Tooltip title="Xem dạng bảng">
                  <ToggleButton value="table">
                    <IconListNumbers size={16} />
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Xem dạng lưới">
                  <ToggleButton value="grid">
                    <IconForms size={16} />
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Statistics Cards */}
          <Fade in={!loadingStats}>
            <Grid container spacing={2} sx={{ mb: 2, pl: 1 }}>
              <Grid item xs={6} sm={4} md={2.5}>
                <Card
                  sx={{
                    height: '100%',
                    '.dark &': {
                      bgcolor: '#374151',
                      border: '1px solid #4b5563',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        '.dark &': { color: '#f3f4f6' },
                      }}
                    >
                      {stats.total}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Tổng câu hỏi
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={4} md={2.35}>
                <Card
                  sx={{
                    height: '100%',
                    '.dark &': {
                      bgcolor: '#374151',
                      border: '1px solid #4b5563',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'success.main',
                        '.dark &': { color: '#34d399' },
                      }}
                    >
                      {stats.withAnswers}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Có đáp án
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={4} md={2.35}>
                <Card
                  sx={{
                    height: '100%',
                    '.dark &': {
                      bgcolor: '#374151',
                      border: '1px solid #4b5563',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      {/* <IconHeadphones size={16} color="primary" /> */}
                      <Typography
                        variant="h4"
                        sx={{
                          '.dark &': { color: '#f3f4f6' },
                        }}
                      >
                        {stats.withAudio}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Listening
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={4} md={2.35}>
                <Card
                  sx={{
                    height: '100%',
                    '.dark &': {
                      bgcolor: '#374151',
                      border: '1px solid #4b5563',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          '.dark &': { color: '#f3f4f6' },
                        }}
                      >
                        {stats.withReading}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Reading
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} sm={4} md={2.35}>
                <Card
                  sx={{
                    height: '100%',
                    '.dark &': {
                      bgcolor: '#374151',
                      border: '1px solid #4b5563',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="h4"
                      sx={{
                        '.dark &': { color: '#f3f4f6' },
                      }}
                    >
                      {stats.averageDifficulty.toFixed(1)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Độ khó TB
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Fade>
        </Box>

        {/* Toolbar */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            '.dark &': {
              bgcolor: '#374151',
              border: '1px solid #4b5563',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { xs: 'stretch', md: 'center' } }}>
            <Box sx={{ display: 'flex', gap: 2, flex: 1, flexWrap: 'wrap' }}>
              <TextField
                size="small"
                placeholder="Tìm kiếm câu hỏi..."
                value={searchText}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} className="dark:text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: searchText && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSearchText('');
                          params.delete('search');
                          setParams(params);
                        }}
                        sx={{
                          '.dark &': {
                            color: '#9ca3af',
                            '&:hover': { color: '#d1d5db' },
                          },
                        }}
                      >
                        <IconFilterOff size={16} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    '.dark &': {
                      bgcolor: '#1f2937',
                      color: '#f3f4f6',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4b5563',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8b5cf6',
                      },
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  },
                }}
                sx={{
                  flex: 1,
                  minWidth: 200,
                  '& .MuiOutlinedInput-notchedOutline': {
                    '.dark &': {
                      borderColor: '#4b5563',
                    },
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    '.dark &': {
                      borderColor: '#8b5cf6',
                    },
                  },
                }}
              />

              <FormControl
                size="small"
                sx={{
                  minWidth: 120,
                  '.dark & .MuiInputLabel-root': {
                    color: '#9ca3af',
                  },
                  '.dark & .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4b5563',
                  },
                  '.dark & .MuiSelect-select': {
                    color: '#f3f4f6',
                  },
                }}
              >
                <InputLabel>Sắp xếp</InputLabel>
                <Select
                  value={sortBy}
                  label="Sắp xếp"
                  onChange={(e) => handleSortChange(e.target.value)}
                  sx={{
                    '.dark &': {
                      bgcolor: '#1f2937',
                      color: '#f3f4f6',

                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#374151',
                      },

                      '& .MuiSelect-icon': {
                        color: '#9ca3af',
                      },
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',
                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },
                      },
                    },
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                          '&:hover': {
                            bgcolor: '#374151',
                          },
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.icon}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                size="small"
                variant={showFilters ? 'contained' : 'outlined'}
                startIcon={<IconFilter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  whiteSpace: 'nowrap',
                  '.dark &': {
                    borderColor: '#4b5563',
                    color: '#d1d5db',
                    '&:hover': {
                      borderColor: '#6b7280',
                    },
                    '&.MuiButton-contained': {
                      bgcolor: '#8b5cf6',
                      '&:hover': { bgcolor: '#7c3aed' },
                    },
                  },
                }}
              >
                Bộ lọc {showFilters ? '▲' : '▼'}
              </Button>
            </Box>

            {selectedRowKeys.length > 0 && (
              <Fade in={selectedRowKeys.length > 0}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    p: 1,
                    bgcolor: 'primary.light',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '.dark &': {
                      bgcolor: 'rgba(139, 92, 246, 0.15)',
                      borderColor: '#8b5cf6',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={`${selectedRowKeys.length} câu hỏi`}
                      color="primary"
                      size="small"
                      onDelete={() => setSelectedRowKeys([])}
                      sx={{
                        '.dark &': {
                          bgcolor: '#8b5cf6',
                          color: 'white',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#6b7280',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      {selectedStats.totalPoints} điểm • Độ khó TB: {selectedStats.averageDifficulty.toFixed(1)}
                    </Typography>
                  </Box>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      '.dark &': { borderColor: '#4b5563' },
                    }}
                  />

                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Xóa đã chọn">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteDialogOpen()}
                        disabled={loading}
                        sx={{
                          '.dark &': {
                            color: '#fca5a5',
                            '&:hover': { bgcolor: 'rgba(248, 113, 113, 0.1)' },
                          },
                        }}
                      >
                        <IconTrash size={18} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Nhân bản">
                      <IconButton
                        size="small"
                        color="info"
                        onClick={handleBulkDuplicate}
                        disabled={loading}
                        sx={{
                          '.dark &': {
                            color: '#93c5fd',
                            '&:hover': { bgcolor: 'rgba(147, 197, 253, 0.1)' },
                          },
                        }}
                      >
                        <IconCopy size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Fade>
            )}
          </Box>

          {/* Advanced Filters */}
          {showFilters && (
            <Fade in={showFilters}>
              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  '.dark &': {
                    borderColor: '#4b5563',
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{
                        '.dark & .MuiInputLabel-root': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#4b5563',
                        },
                        '.dark & .MuiSelect-select': {
                          color: '#f3f4f6',
                        },
                      }}
                    >
                      <InputLabel>Loại câu hỏi</InputLabel>
                      <Select
                        value={filters.questionType}
                        label="Loại câu hỏi"
                        onChange={(e) => handleFilterChange('questionType', e.target.value)}
                        sx={{
                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#374151',
                            },

                            '& .MuiSelect-icon': {
                              color: '#9ca3af',
                            },
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#fff',
                              color: '#111827',
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value=""
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Tất cả
                        </MenuItem>
                        {Object.entries(QUESTION_TYPES).map(([key, type]) => (
                          <MenuItem
                            key={key}
                            value={key}
                            sx={{
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                                '&:hover': {
                                  bgcolor: '#374151',
                                },
                              },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {type.icon}
                              {type.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{
                        '.dark & .MuiInputLabel-root': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#4b5563',
                        },
                        '.dark & .MuiSelect-select': {
                          color: '#f3f4f6',
                        },
                      }}
                    >
                      <InputLabel>Độ khó</InputLabel>
                      <Select
                        value={filters.difficulty}
                        label="Độ khó"
                        onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                        sx={{
                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#374151',
                            },

                            '& .MuiSelect-icon': {
                              color: '#9ca3af',
                            },
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#fff',
                              color: '#111827',
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value=""
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Tất cả
                        </MenuItem>
                        {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                          <MenuItem
                            key={key}
                            value={key}
                            sx={{
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                                '&:hover': {
                                  bgcolor: '#374151',
                                },
                              },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: `${level.color}.main`,
                                }}
                              />
                              {level.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{
                        '.dark & .MuiInputLabel-root': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#4b5563',
                        },
                        '.dark & .MuiSelect-select': {
                          color: '#f3f4f6',
                        },
                      }}
                    >
                      <InputLabel>Có audio</InputLabel>
                      <Select
                        value={filters.hasAudio}
                        label="Có audio"
                        onChange={(e) => handleFilterChange('hasAudio', e.target.value)}
                        sx={{
                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#374151',
                            },

                            '& .MuiSelect-icon': {
                              color: '#9ca3af',
                            },
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#fff',
                              color: '#111827',
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value=""
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Tất cả
                        </MenuItem>
                        <MenuItem
                          value="yes"
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Có
                        </MenuItem>
                        <MenuItem
                          value="no"
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Không
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{
                        '.dark & .MuiInputLabel-root': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#4b5563',
                        },
                        '.dark & .MuiSelect-select': {
                          color: '#f3f4f6',
                        },
                      }}
                    >
                      <InputLabel>Có reading</InputLabel>
                      <Select
                        value={filters.hasReading}
                        label="Có reading"
                        onChange={(e) => handleFilterChange('hasReading', e.target.value)}
                        sx={{
                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#374151',
                            },

                            '& .MuiSelect-icon': {
                              color: '#9ca3af',
                            },
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#fff',
                              color: '#111827',
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value=""
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Tất cả
                        </MenuItem>
                        <MenuItem
                          value="yes"
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Có
                        </MenuItem>
                        <MenuItem
                          value="no"
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Không
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{
                        '.dark & .MuiInputLabel-root': {
                          color: '#9ca3af',
                        },
                        '.dark & .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#4b5563',
                        },
                        '.dark & .MuiSelect-select': {
                          color: '#f3f4f6',
                        },
                      }}
                    >
                      <InputLabel>Trạng thái đáp án</InputLabel>
                      <Select
                        value={filters.hasAnswers}
                        label="Trạng thái đáp án"
                        onChange={(e) => handleFilterChange('hasAnswers', e.target.value)}
                        sx={{
                          '.dark &': {
                            bgcolor: '#1f2937',
                            color: '#f3f4f6',

                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#374151',
                            },

                            '& .MuiSelect-icon': {
                              color: '#9ca3af',
                            },
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#fff',
                              color: '#111827',
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem
                          value=""
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Tất cả
                        </MenuItem>
                        <MenuItem
                          value="yes"
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Có đáp án
                        </MenuItem>
                        <MenuItem
                          value="no"
                          sx={{
                            '.dark &': {
                              bgcolor: '#1f2937',
                              color: '#f3f4f6',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          Chưa có đáp án
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Button
                        size="small"
                        startIcon={<IconRefresh size={16} />}
                        onClick={() => {
                          loadData();
                          loadStatistics();
                        }}
                        disabled={loading}
                        sx={{
                          '.dark &': {
                            color: '#d1d5db',
                            borderColor: '#4b5563',
                            '&:hover': {
                              borderColor: '#6b7280',
                            },
                          },
                        }}
                      >
                        Làm mới
                      </Button>

                      <Button
                        size="small"
                        onClick={clearFilters}
                        startIcon={<IconFilterOff size={16} />}
                        sx={{
                          '.dark &': {
                            color: '#d1d5db',
                            borderColor: '#4b5563',
                            '&:hover': {
                              borderColor: '#6b7280',
                            },
                          },
                        }}
                      >
                        Xóa bộ lọc
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={loadData}
                        disabled={loading}
                        sx={{
                          '.dark &': {
                            bgcolor: '#8b5cf6',
                            '&:hover': { bgcolor: '#7c3aed' },
                          },
                        }}
                      >
                        Áp dụng
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}
        </Paper>

        {/* Questions Table/Grid */}
        {viewMode === 'table' ? (
          <Paper
            sx={{
              overflowX: 'auto',
              mb: 3,
              '.dark &': {
                bgcolor: '#374151',
                border: '1px solid #4b5563',
              },
            }}
          >
            <TableContainer sx={{ maxHeight: isMobile ? 400 : 600 }}>
              <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead
                  style={{
                    backgroundImage: 'linear-gradient(to right, #ede9fe, #fae8ff)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                  }}
                  className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
                >
                  <TableRow>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        width: 60,
                        '.dark &': { borderColor: '#4b5563' },
                      }}
                    >
                      <Checkbox
                        color="primary"
                        indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < questions.length}
                        checked={questions.length > 0 && selectedRowKeys.length === questions.length}
                        onChange={handleSelectAllClick}
                        size="small"
                        sx={{
                          '.dark &': {
                            color: '#d1d5db',
                            '&.Mui-checked': {
                              color: '#8b5cf6',
                            },
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        width: '40%',
                        fontWeight: 600,
                        '.dark &': {
                          color: '#f3f4f6',
                          borderColor: '#4b5563',
                        },
                      }}
                    >
                      Câu hỏi
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: 'none', md: 'table-cell' },
                        fontWeight: 600,
                        '.dark &': {
                          color: '#f3f4f6',
                          borderColor: '#4b5563',
                        },
                      }}
                    >
                      Loại
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: 'none', lg: 'table-cell' },
                        fontWeight: 600,
                        '.dark &': {
                          color: '#f3f4f6',
                          borderColor: '#4b5563',
                        },
                      }}
                    >
                      Độ khó
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: 'none', lg: 'table-cell' },
                        fontWeight: 600,
                        '.dark &': {
                          color: '#f3f4f6',
                          borderColor: '#4b5563',
                        },
                      }}
                    >
                      Ngày tạo
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        '.dark &': {
                          color: '#f3f4f6',
                          borderColor: '#4b5563',
                        },
                      }}
                    >
                      Điểm
                    </TableCell>
                    {!quizIdParam && (
                      <TableCell
                        sx={{
                          display: { xs: 'none', sm: 'table-cell' },
                          fontWeight: 600,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#4b5563',
                          },
                        }}
                      >
                        Quiz
                      </TableCell>
                    )}
                    <TableCell
                      align="center"
                      sx={{
                        width: 100,
                        fontWeight: 600,
                        '.dark &': {
                          color: '#f3f4f6',
                          borderColor: '#4b5563',
                        },
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={quizIdParam ? 6 : 7}
                        align="center"
                        sx={{
                          py: 10,
                          '.dark &': { borderColor: '#4b5563' },
                        }}
                      >
                        <CircularProgress size={40} sx={{ mb: 2 }} />
                        <Typography
                          sx={{
                            '.dark &': { color: '#d1d5db' },
                          }}
                        >
                          Đang tải câu hỏi...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : questions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={quizIdParam ? 6 : 7}
                        align="center"
                        sx={{
                          py: 10,
                          '.dark &': { borderColor: '#4b5563' },
                        }}
                      >
                        <IconQuestionMark
                          size={64}
                          style={{
                            color: '#999',
                            margin: '0 auto 16px',
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#6b7280',
                            '.dark &': { color: '#9ca3af' },
                          }}
                        >
                          Không tìm thấy câu hỏi nào
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 3,
                            color: '#6b7280',
                            '.dark &': { color: '#9ca3af' },
                          }}
                        >
                          {searchText || Object.values(filters).some((v) => v) ? 'Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc' : 'Chưa có câu hỏi nào trong hệ thống'}
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<IconPlus size={16} />}
                          onClick={handleOpenCreateDialog}
                          sx={{
                            '.dark &': {
                              color: '#d1d5db',
                              borderColor: '#4b5563',
                              '&:hover': {
                                borderColor: '#6b7280',
                              },
                            },
                          }}
                        >
                          Thêm câu hỏi đầu tiên
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    questions.map((row) => {
                      const isItemSelected = isSelected(row.question_id);
                      const questionType = QUESTION_TYPES[row.question_type];

                      return (
                        <TableRow
                          key={row.question_id}
                          hover
                          onClick={(e) => handleClick(row.question_id, e)}
                          selected={isItemSelected}
                          sx={{
                            cursor: 'pointer',
                            '.dark &': {
                              bgcolor: isItemSelected ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                              '&:hover': {
                                bgcolor: 'rgba(139, 92, 246, 0.05)',
                              },
                              '&.Mui-selected': {
                                bgcolor: 'rgba(139, 92, 246, 0.15)',
                              },
                              '& .MuiTableCell-root': {
                                borderColor: '#4b5563',
                              },
                            },
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClick(row.question_id, e);
                              }}
                              sx={{
                                '.dark &': {
                                  color: '#d1d5db',
                                  '&.Mui-checked': {
                                    color: '#8b5cf6',
                                  },
                                },
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Accordion
                              expanded={expandedQuestion === row.question_id}
                              onChange={() => setExpandedQuestion(expandedQuestion === row.question_id ? null : row.question_id)}
                              sx={{
                                bgcolor: 'transparent',
                                boxShadow: 'none',
                                '&:before': { display: 'none' },
                                '.dark &': {
                                  '& .MuiAccordionSummary-root': {
                                    color: '#f3f4f6',
                                  },
                                  '& .MuiAccordionDetails-root': {
                                    color: '#d1d5db',
                                  },
                                },
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                  px: 0,
                                  minHeight: 'auto',
                                  '& .MuiAccordionSummary-expandIconWrapper': {
                                    '.dark &': { color: '#d1d5db' },
                                  },
                                }}
                              >
                                <Box sx={{ width: '100%' }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      mb: 1,
                                      wordBreak: 'break-word',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      color: '#111827',
                                      '.dark &': { color: '#f3f4f6' },
                                    }}
                                  >
                                    {row.question_text}
                                  </Typography>

                                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    <Badge
                                      badgeContent={row.audio ? 'L' : row.reading_passage ? 'R' : null}
                                      color={row.audio ? 'primary' : row.reading_passage ? 'success' : 'default'}
                                      sx={{
                                        '& .MuiBadge-badge': {
                                          fontSize: '0.5rem',
                                          height: 16,
                                          minWidth: 16,
                                          right: -3,
                                          top: 3,
                                          '.dark &': {
                                            color: 'white',
                                            bgcolor: row.audio ? '#8b5cf6' : row.reading_passage ? '#10b981' : '#6b7280',
                                          },
                                        },
                                      }}
                                    >
                                      <Chip
                                        label={questionType?.shortLabel}
                                        size="small"
                                        color={questionType?.color as any}
                                        variant="outlined"
                                        sx={{
                                          height: 20,
                                          '.dark &': {
                                            color: '#d1d5db',
                                            borderColor: '#6b7280',
                                          },
                                        }}
                                      />
                                    </Badge>
                                    {(!row.answers || row.answers.length === 0) && (
                                      <Chip
                                        icon={<IconAlertCircle size={12} className="dark:text-yellow-400" />}
                                        label="Chưa có đáp án"
                                        size="small"
                                        color="warning"
                                        sx={{
                                          height: 20,
                                          '.dark &': {
                                            bgcolor: 'rgba(245, 158, 11, 0.2)',
                                            color: '#fbbf24',
                                            borderColor: '#f59e0b',
                                          },
                                        }}
                                      />
                                    )}
                                  </Box>
                                </Box>
                              </AccordionSummary>

                              <AccordionDetails sx={{ px: 0, pb: 0 }}>{renderQuestionContent(row)}</AccordionDetails>
                            </Accordion>
                          </TableCell>

                          <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                            <Tooltip title={questionType?.description}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {questionType?.icon}
                                <Typography
                                  variant="body2"
                                  sx={{
                                    '.dark &': { color: '#d1d5db' },
                                  }}
                                >
                                  {questionType?.shortLabel}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </TableCell>

                          <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                            <Chip
                              label={DIFFICULTY_LEVELS[row.difficulty]?.label}
                              size="small"
                              color={DIFFICULTY_LEVELS[row.difficulty]?.color as any}
                              sx={{
                                minWidth: 80,
                                '.dark &': {
                                  color: '#d1d5db',
                                  borderColor: '#6b7280',
                                  bgcolor: 'transparent',
                                },
                              }}
                            />
                          </TableCell>

                          <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  '.dark &': { color: '#d1d5db' },
                                }}
                              >
                                {new Date(row.created_at).toLocaleString('vi-VN')}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              sx={{
                                color: '#111827',
                                '.dark &': { color: '#f3f4f6' },
                              }}
                            >
                              {row.points}
                            </Typography>
                          </TableCell>

                          {!quizIdParam && (
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                              {row.quiz ? (
                                <Tooltip title={row.quiz.title}>
                                  <Chip
                                    label={QUIZ_TYPES[row.quiz.quiz_type as keyof typeof QUIZ_TYPES]?.label}
                                    size="small"
                                    color={QUIZ_TYPES[row.quiz.quiz_type as keyof typeof QUIZ_TYPES]?.color as any}
                                    icon={QUIZ_TYPES[row.quiz.quiz_type as keyof typeof QUIZ_TYPES]?.icon}
                                    onClick={() => handleBackToQuiz()}
                                    clickable
                                    sx={{
                                      maxWidth: 120,
                                      '.dark &': {
                                        color: '#d1d5db',
                                        borderColor: '#6b7280',
                                        '&:hover': {
                                          bgcolor: '#374151',
                                        },
                                      },
                                    }}
                                  />
                                </Tooltip>
                              ) : (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: '#6b7280',
                                    fontStyle: 'italic',
                                    '.dark &': { color: '#9ca3af' },
                                  }}
                                >
                                  Chưa gán
                                </Typography>
                              )}
                            </TableCell>
                          )}

                          <TableCell align="center" className="question-actions">
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditQuestion(row);
                                  }}
                                  sx={{
                                    '.dark &': {
                                      color: '#d1d5db',
                                      '&:hover': {
                                        bgcolor: '#374151',
                                      },
                                    },
                                  }}
                                >
                                  <IconEdit size={18} />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Xóa">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteDialogOpen(row.question_id);
                                  }}
                                  sx={{
                                    '.dark &': {
                                      color: '#fca5a5',
                                      '&:hover': {
                                        bgcolor: 'rgba(248, 113, 113, 0.1)',
                                      },
                                    },
                                  }}
                                >
                                  <IconTrash size={18} />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Thao tác khác">
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleMenuOpen(e, row)}
                                  sx={{
                                    '.dark &': {
                                      color: '#d1d5db',
                                      '&:hover': {
                                        bgcolor: '#374151',
                                      },
                                    },
                                  }}
                                >
                                  <IconDotsVertical size={18} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {questions.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={totalQuestions}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số dòng:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
                className="dark:text-gray-200 dark:bg-gray-800"
                sx={{
                  '.dark &': {
                    color: '#d1d5db',
                    bgcolor: '#1f2937',
                    borderTop: '1px solid #374151',
                    '& .MuiTablePagination-selectIcon': {
                      color: '#9ca3af',
                    },
                    '& .MuiTablePagination-actions button': {
                      color: '#d1d5db',
                      '&:disabled': {
                        color: '#6b7280',
                      },
                    },
                    '& .MuiTablePagination-select': {
                      color: '#d1d5db',
                    },
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: '#ffffff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // hover item
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // selected item
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  },
                }}
              />
            )}
          </Paper>
        ) : (
          <Box sx={{ mb: 3 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10, flexDirection: 'column' }}>
                <CircularProgress size={40} sx={{ mb: 2 }} />
                <Typography
                  sx={{
                    '.dark &': { color: '#d1d5db' },
                  }}
                >
                  Đang tải câu hỏi...
                </Typography>
              </Box>
            ) : questions.length === 0 ? (
              <Paper
                sx={{
                  p: 10,
                  textAlign: 'center',
                  '.dark &': {
                    bgcolor: '#374151',
                    border: '1px solid #4b5563',
                  },
                }}
              >
                <IconDatabase
                  size={64}
                  style={{
                    color: '#999',
                    margin: '0 auto 16px',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: '#6b7280',
                    '.dark &': { color: '#9ca3af' },
                  }}
                >
                  Không tìm thấy câu hỏi nào
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    color: '#6b7280',
                    '.dark &': { color: '#9ca3af' },
                  }}
                >
                  {searchText || Object.values(filters).some((v) => v) ? 'Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc' : 'Chưa có câu hỏi nào trong hệ thống'}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<IconPlus size={16} />}
                  onClick={handleOpenCreateDialog}
                  sx={{
                    '.dark &': {
                      color: '#d1d5db',
                      borderColor: '#4b5563',
                      '&:hover': {
                        borderColor: '#6b7280',
                      },
                    },
                  }}
                >
                  Thêm câu hỏi đầu tiên
                </Button>
              </Paper>
            ) : (
              <>
                <Grid container spacing={2}>
                  {questions.map((question) => renderQuestionCard(question))}
                </Grid>
                {questions.length > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 50, 100]}
                      component="div"
                      count={totalQuestions}
                      rowsPerPage={rowsPerPage}
                      page={page - 1}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage="Số dòng:"
                      labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
                      className="dark:text-gray-200 dark:bg-gray-800"
                      sx={{
                        '.dark &': {
                          color: '#d1d5db',
                          bgcolor: '#1f2937',
                          borderTop: '1px solid #374151',
                          '& .MuiTablePagination-selectIcon': {
                            color: '#9ca3af',
                          },
                          '& .MuiTablePagination-actions button': {
                            color: '#d1d5db',
                            '&:disabled': {
                              color: '#6b7280',
                            },
                          },
                          '& .MuiTablePagination-select': {
                            color: '#d1d5db',
                          },
                        },
                      }}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              bgcolor: '#ffffff',
                              color: '#111827',

                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                              },

                              // hover item
                              '& .MuiMenuItem-root:hover': {
                                bgcolor: '#e5e7eb',
                              },
                              '.dark & .MuiMenuItem-root:hover': {
                                bgcolor: '#374151',
                              },

                              // selected item
                              '& .MuiMenuItem-root.Mui-selected': {
                                bgcolor: '#e0e7ff',
                              },
                              '.dark & .MuiMenuItem-root.Mui-selected': {
                                bgcolor: '#312e81',
                              },
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        )}

        {/* Create/Edit Question Dialog */}
        <QuestionFormDialog open={openQuestionDialog} editingQuestion={editingQuestion} quizIdParam={quizIdParam} onClose={handleCloseQuestionDialog} onSave={handleSaveQuestion} loading={loading} />

        {/* Action Menu */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: 200,
              maxWidth: '100%',
              '.dark &': {
                bgcolor: '#374151',
                border: '1px solid #4b5563',
                '& .MuiMenuItem-root': {
                  color: '#d1d5db',
                  '&:hover': {
                    bgcolor: '#4b5563',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#9ca3af',
                  },
                },
              },
            },
          }}
        >
          {selectedQuestion && (
            <>
              <MenuItem
                onClick={() => {
                  handleEditQuestion(selectedQuestion);
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <IconEdit size={18} />
                </ListItemIcon>
                <ListItemText>Chỉnh sửa</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleDuplicateQuestion(selectedQuestion.question_id);
                  handleMenuClose();
                }}
              >
                <ListItemIcon>
                  <IconCopy size={18} />
                </ListItemIcon>
                <ListItemText>Nhân bản</ListItemText>
              </MenuItem>

              {selectedQuestion.quiz && (
                <MenuItem
                  onClick={() => {
                    handleBackToQuiz();
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <IconExternalLink size={18} />
                  </ListItemIcon>
                  <ListItemText>Xem quiz</ListItemText>
                </MenuItem>
              )}

              <Divider
                sx={{
                  '.dark &': { borderColor: '#4b5563' },
                }}
              />

              <MenuItem
                onClick={() => {
                  handleDeleteDialogOpen(selectedQuestion.question_id);
                  handleMenuClose();
                }}
                sx={{
                  color: 'error.main',
                  '.dark &': { color: '#fca5a5' },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'error.main',
                    '.dark &': { color: '#fca5a5' },
                  }}
                >
                  <IconTrash size={18} />
                </ListItemIcon>
                <ListItemText>Xóa</ListItemText>
              </MenuItem>
            </>
          )}
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              '.dark &': {
                bgcolor: '#374151',
                border: '1px solid #4b5563',
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '.dark &': { color: '#f3f4f6' },
            }}
          >
            <IconAlertCircle size={24} color="red" className="dark:text-red-400" />
            Xác nhận xóa
          </DialogTitle>

          <DialogContent>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                '.dark &': { color: '#d1d5db' },
              }}
            >
              {deleteBulk ? `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} câu hỏi đã chọn?` : 'Bạn có chắc chắn muốn xóa câu hỏi này?'}
            </Typography>

            {deleteBulk && selectedRowKeys.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 1,
                  '.dark &': {
                    bgcolor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #ef4444',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#dc2626',
                    '.dark &': { color: '#fca5a5' },
                  }}
                >
                  ⚠️ Hành động này sẽ xóa vĩnh viễn {selectedRowKeys.length} câu hỏi và không thể hoàn tác.
                </Typography>
              </Box>
            )}

            {!deleteBulk && selectedQuestion && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: '#f3f4f6',
                  borderRadius: 1,
                  '.dark &': {
                    bgcolor: '#4b5563',
                    border: '1px solid #6b7280',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#374151',
                    '.dark &': { color: '#d1d5db' },
                  }}
                >
                  Câu hỏi: {selectedQuestion.question_text.substring(0, 100)}...
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 1,
                    color: '#6b7280',
                    '.dark &': { color: '#9ca3af' },
                  }}
                >
                  {selectedQuestion.quiz ? `Thuộc quiz: ${selectedQuestion.quiz.title}` : 'Không thuộc quiz nào'}
                </Typography>
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleDeleteDialogClose}
              color="inherit"
              sx={{
                '.dark &': {
                  color: '#d1d5db',
                },
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              disabled={loading}
              sx={{
                '.dark &': {
                  bgcolor: '#ef4444',
                  '&:hover': { bgcolor: '#dc2626' },
                },
              }}
            >
              {loading ? <CircularProgress size={20} /> : 'Xóa'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button for Mobile */}
        <Zoom in={!loading}>
          <Fab
            color="primary"
            aria-label="add question"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              display: { xs: 'flex', md: 'none' },
              '.dark &': {
                bgcolor: '#8b5cf6',
                '&:hover': { bgcolor: '#7c3aed' },
              },
            }}
            onClick={handleOpenCreateDialog}
          >
            <IconPlus />
          </Fab>
        </Zoom>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            iconMapping={{
              success: <CheckCircleIcon fontSize="small" />,
              error: <ErrorIcon fontSize="small" />,
              warning: <WarningIcon fontSize="small" />,
              info: <InfoIcon fontSize="small" />,
            }}
            sx={{
              alignItems: 'center',
              '& .MuiAlert-icon': {
                alignItems: 'center',
              },
              '.dark &': {
                bgcolor: snackbar.severity === 'success' ? '#059669' : snackbar.severity === 'error' ? '#dc2626' : snackbar.severity === 'warning' ? '#d97706' : '#2563eb',
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
}
