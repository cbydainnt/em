import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField, Button, Box, Grid, Snackbar, Alert, InputAdornment, FormControlLabel, Switch, Autocomplete, Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, Chip, Tooltip, LinearProgress, Tabs, Tab, Radio, Card, CardContent } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { IconDeviceFloppy, IconX, IconPlus, IconTrash, IconGripVertical, IconFileImport, IconAlertTriangle, IconSettings, IconList, IconInfoCircle, IconUpload, IconHistory, IconAlertCircle, IconUsers, IconPercentage } from '@tabler/icons-react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

interface IAnswer {
  answer_id?: string;
  answer_text: string;
  is_correct: boolean;
  order?: number;
  match_key?: string;
}

interface IQuestion {
  question_id?: string;
  question_text: string;
  question_type: number;
  points: number;
  difficulty: number;
  explanation?: string;
  answers: IAnswer[];
  has_answers?: boolean;
}

interface IFormInput {
  title: string;
  quiz_type: number;
  difficulty_level: number;
  duration_minutes?: number;
  passing_score: number;
  status: number;
  has_audio: boolean;
  show_explanation: boolean;
  randomize_questions: boolean;
  randomize_answers: boolean;
  allow_review: boolean;
  allow_retake: boolean;
  show_results: boolean;
  max_attempts?: number;
  questions: IQuestion[];
}

const QUIZ_TYPES = [
  { value: 1, label: 'Bài kiểm tra' },
  { value: 2, label: 'Bài thi khóa học' },
  { value: 3, label: 'Thi cuối kỳ' },
  { value: 4, label: 'IELTS' },
  { value: 5, label: 'TOEIC' },
];

const QUESTION_TYPES = [
  { value: 1, label: 'Một đáp án đúng' },
  { value: 2, label: 'Nhiều đáp án đúng' },
  { value: 3, label: 'Điền vào chỗ trống' },
  { value: 4, label: 'Đúng/Sai' },
  { value: 5, label: 'Nối' },
  { value: 6, label: 'Sắp xếp' },
  { value: 7, label: 'Tự luận' },
];

const DIFFICULTY_LEVELS = [
  { value: 1, label: 'Rất dễ' },
  { value: 2, label: 'Dễ' },
  { value: 3, label: 'Trung bình' },
  { value: 4, label: 'Khó' },
  { value: 5, label: 'Rất khó' },
];

const STATUS_OPTIONS = [
  { value: 1, label: 'Hoạt động' },
  { value: 2, label: 'Nháp' },
  { value: 3, label: 'Lưu trữ' },
];

interface QuizFormDialogProps {
  saved: () => void;
}

const QuizFormDialog = forwardRef(function QuizForm({ saved }: QuizFormDialogProps, ref) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [importing, setImporting] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [activeTab, setActiveTab] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState<number | false>(false);
  const [hasUserProgress, setHasUserProgress] = useState(false);
  const [versionNotes, setVersionNotes] = useState('');
  const [willCreateNewVersion, setWillCreateNewVersion] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<IFormInput>({
    defaultValues: {
      title: '',
      quiz_type: 1,
      difficulty_level: 3,
      duration_minutes: undefined,
      passing_score: 70,
      status: 2,
      has_audio: false,
      show_explanation: true,
      randomize_questions: false,
      randomize_answers: false,
      allow_review: true,
      allow_retake: true,
      show_results: true,
      max_attempts: undefined,
      questions: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'questions',
  });

  const questions = watch('questions');

  const handleClose = () => {
    setOpen(false);
    setId(undefined);
    setActiveTab(0);
    setExpandedQuestion(false);
    reset();
  };

  const checkUserProgress = async (quiz_id: string) => {
    try {
      const response = await axios.get(`/api/admin/quizzes/${quiz_id}/has-progress`);
      setHasUserProgress(response.data.has_progress);
      setWillCreateNewVersion(response.data.has_progress);
    } catch (error) {
      console.error('Error checking user progress:', error);
    }
  };

  const onSubmit = async (data: IFormInput) => {
    // Validate đáp án cho từng loại câu hỏi
    const invalidQuestions = data.questions.filter((q) => {
      // Essay không cần đáp án
      if (q.question_type === 7) return false;

      // Fill in the blank cần ít nhất 1 đáp án đúng
      if (q.question_type === 3) {
        return !q.answers || q.answers.length === 0 || !q.answers.some((a) => a.is_correct);
      }

      // True/False cần đúng 2 đáp án
      if (q.question_type === 4) {
        return !q.answers || q.answers.length !== 2 || !q.answers.some((a) => a.is_correct);
      }

      // Matching và Rearrangement cần ít nhất 2 đáp án
      if (q.question_type === 5 || q.question_type === 6) {
        return !q.answers || q.answers.length < 2;
      }

      // MCQ cần đáp án đúng
      const hasAnswers = q.answers && q.answers.length > 0;
      const hasCorrectAnswer = q.answers?.some((a) => a.is_correct);
      return !hasAnswers || !hasCorrectAnswer;
    });

    if (invalidQuestions.length > 0) {
      setSnackbar({
        open: true,
        message: `Có ${invalidQuestions.length} câu hỏi chưa hợp lệ. Vui lòng kiểm tra lại.`,
        severity: 'error',
      });
      setActiveTab(1);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: data.title,
        quiz_type: Number(data.quiz_type),
        difficulty_level: Number(data.difficulty_level),
        duration_minutes: data.duration_minutes ? Number(data.duration_minutes) : null,
        passing_score: Number(data.passing_score),
        status: Number(data.status),
        total_questions: data.questions.length,
        has_audio: data.has_audio,
        show_explanation: data.show_explanation,
        randomize_questions: data.randomize_questions,
        randomize_answers: data.randomize_answers,
        allow_review: data.allow_review,
        allow_retake: data.allow_retake,
        show_results: data.show_results,
        max_attempts: data.max_attempts ? Number(data.max_attempts) : null,
        version_notes: willCreateNewVersion ? versionNotes : undefined,
        questions: data.questions.map((q, idx) => ({
          question_text: q.question_text,
          question_type: q.question_type,
          points: Number(q.points),
          difficulty: Number(q.difficulty),
          explanation: q.explanation || '',
          order: idx,
          answers: q.answers.map((a, ansIdx) => ({
            answer_text: a.answer_text,
            is_correct: a.is_correct,
            match_key: a.match_key || null,
            order: ansIdx,
          })),
        })),
      };

      let response;
      if (id) {
        response = await axios.put(`/api/admin/quizzes/${id}`, payload);
      } else {
        response = await axios.post(`/api/admin/quizzes`, payload);
      }

      if (response.data) {
        const result = response.data;

        if (result.action === 'created_new_version') {
          setSnackbar({
            open: true,
            message: `Đã tạo version mới (v${result.data.version}) thành công. Quiz cũ đã được lưu trữ.`,
            severity: 'success',
          });
        } else if (result.action === 'updated_directly') {
          setSnackbar({
            open: true,
            message: 'Cập nhật quiz thành công',
            severity: 'success',
          });
        } else {
          setSnackbar({
            open: true,
            message: id ? 'Cập nhật quiz thành công' : 'Tạo quiz thành công',
            severity: 'success',
          });
        }

        saved();
        handleClose();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const show = async (data: any) => {
    reset({
      title: '',
      quiz_type: 1,
      difficulty_level: 3,
      duration_minutes: undefined,
      passing_score: 70,
      status: 2,
      has_audio: false,
      show_explanation: true,
      randomize_questions: false,
      randomize_answers: false,
      allow_review: true,
      allow_retake: true,
      show_results: true,
      max_attempts: undefined,
      questions: [],
    });
    setId(undefined);
    setActiveTab(0);
    setExpandedQuestion(false);
    setHasUserProgress(false);
    setWillCreateNewVersion(false);
    setVersionNotes('');

    if (data && data.quiz_id) {
      setId(data.quiz_id);
      try {
        const response = await axios.get(`/api/admin/quizzes/${data.quiz_id}`);
        const fullData = response.data;

        await checkUserProgress(data.quiz_id);

        reset({
          title: fullData.title,
          quiz_type: fullData.quiz_type,
          difficulty_level: fullData.difficulty_level,
          duration_minutes: fullData.duration_minutes,
          passing_score: fullData.passing_score,
          status: fullData.status,
          has_audio: fullData.has_audio,
          show_explanation: fullData.show_explanation,
          randomize_questions: fullData.randomize_questions,
          randomize_answers: fullData.randomize_answers,
          allow_review: fullData.allow_review,
          allow_retake: fullData.allow_retake ?? true,
          show_results: fullData.show_results ?? true,
          max_attempts: fullData.max_attempts,
          questions:
            fullData.questions?.map((q: any) => ({
              ...q,
              answers: q.answers || [],
            })) || [],
        });
      } catch (error) {
        console.error('Error loading quiz details', error);
        setSnackbar({
          open: true,
          message: 'Không thể tải thông tin quiz',
          severity: 'error',
        });
      }
    }
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  const handleAddQuestion = () => {
    append({
      question_text: '',
      question_type: 1,
      points: 1,
      difficulty: 3,
      explanation: '',
      answers: [
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
        { answer_text: '', is_correct: false },
      ],
      has_answers: false,
    });
    setExpandedQuestion(fields.length);
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/admin/quizzes/parse-word', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.questions) {
        const importedQuestions = response.data.questions;

        importedQuestions.forEach((q: IQuestion) => {
          append({
            question_text: q.question_text,
            question_type: q.question_type,
            points: q.points || 1,
            difficulty: q.difficulty || 3,
            explanation: q.explanation || '',
            answers: q.answers || [],
            has_answers: q.has_answers,
          });
        });

        setSnackbar({
          open: true,
          message: `Import thành công ${importedQuestions.length} câu hỏi!`,
          severity: 'success',
        });

        setActiveTab(1);
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Không thể import file',
        severity: 'error',
      });
    }
    setImporting(false);
    event.target.value = '';
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const getQuestionWarnings = (index: number) => {
    const question = questions[index];
    if (!question) return null;

    // Essay không cần warning
    if (question.question_type === 7) return null;

    // Fill in the blank
    if (question.question_type === 3) {
      const hasNoAnswers = !question.answers || question.answers.length === 0;
      const hasNoCorrectAnswer = question.answers && question.answers.length > 0 && !question.answers.some((a) => a.is_correct);
      if (hasNoAnswers) return 'Chưa có đáp án đúng';
      if (hasNoCorrectAnswer) return 'Chưa đánh dấu đáp án đúng';
      return null;
    }

    // True/False
    if (question.question_type === 4) {
      if (!question.answers || question.answers.length !== 2) return 'Cần đúng 2 đáp án (Đúng/Sai)';
      if (!question.answers.some((a) => a.is_correct)) return 'Chưa đánh dấu đáp án đúng';
      return null;
    }

    // Matching và Rearrangement
    if (question.question_type === 5 || question.question_type === 6) {
      if (!question.answers || question.answers.length < 2) return 'Cần ít nhất 2 đáp án';
      return null;
    }

    // MCQ
    const hasNoAnswers = !question.answers || question.answers.length === 0;
    const hasNoCorrectAnswer = question.answers && question.answers.length > 0 && !question.answers.some((a) => a.is_correct);

    if (hasNoAnswers) return 'Chưa có đáp án';
    if (hasNoCorrectAnswer) return 'Chưa đánh dấu đáp án đúng';
    return null;
  };

  const handleQuestionTypeChange = (index: number, newType: number) => {
    const question = questions[index];
    if (!question) return;

    setValue(`questions.${index}.question_type`, newType);

    // Reset answers based on question type
    if (newType === 4) {
      // True/False
      setValue(`questions.${index}.answers`, [
        { answer_text: 'Đúng', is_correct: false },
        { answer_text: 'Sai', is_correct: false },
      ]);
    } else if (newType === 7) {
      // Essay - no answers needed
      setValue(`questions.${index}.answers`, []);
    } else if (newType === 1 && question.question_type === 2) {
      // Single choice from multiple choice
      const answers = [...question.answers];
      let foundFirstCorrect = false;
      const newAnswers = answers.map((answer) => {
        if (answer.is_correct) {
          if (!foundFirstCorrect) {
            foundFirstCorrect = true;
            return { ...answer, is_correct: true };
          } else {
            return { ...answer, is_correct: false };
          }
        }
        return answer;
      });
      setValue(`questions.${index}.answers`, newAnswers);
    }
  };

  const handleSingleChoiceSelect = (questionIndex: number, answerIndex: number) => {
    const currentAnswers = watch(`questions.${questionIndex}.answers`);
    const newAnswers = currentAnswers.map((answer, idx) => ({
      ...answer,
      is_correct: idx === answerIndex,
    }));
    setValue(`questions.${questionIndex}.answers`, newAnswers);
  };

  const renderAnswerInput = (questionIndex: number, questionType: number) => {
    const answers = watch(`questions.${questionIndex}.answers`) || [];
    const isSingleChoice = questionType === 1;
    const isMultipleChoice = questionType === 2;
    const isTrueFalse = questionType === 4;
    const isMatching = questionType === 5;
    const isRearrange = questionType === 6;
    const isEssay = questionType === 7;
    const isFillBlank = questionType === 3;

    // Essay type - no answers needed
    if (isEssay) {
      return (
        <Alert severity="info" sx={{ mt: 2 }}>
          Câu hỏi tự luận không cần đáp án trước. Học viên sẽ nhập câu trả lời của mình.
        </Alert>
      );
    }

    // Fill in the blank
    if (isFillBlank) {
      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2">Đáp án đúng ({answers.length})</Typography>
          </Box>
          {answers.map((answer: IAnswer, ansIdx: number) => (
            <Box key={ansIdx} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Nhập đáp án đúng"
                {...register(`questions.${questionIndex}.answers.${ansIdx}.answer_text`, {
                  required: 'Vui lòng nhập đáp án',
                })}
                error={!!errors.questions?.[questionIndex]?.answers?.[ansIdx]?.answer_text}
                helperText={errors.questions?.[questionIndex]?.answers?.[ansIdx]?.answer_text?.message}
                size="small"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.is_correct}
                    sx={{
                      '.dark &': {
                        color: '#fff',
                      },
                      '&.Mui-checked': {
                        color: '#2e78e7ff',
                      },
                    }}
                    onChange={(e) => {
                      const currentAnswers = watch(`questions.${questionIndex}.answers`);
                      const newAnswers = [...currentAnswers];
                      newAnswers[ansIdx] = { ...newAnswers[ansIdx], is_correct: e.target.checked };
                      setValue(`questions.${questionIndex}.answers`, newAnswers);
                    }}
                    size="small"
                  />
                }
                label="Đúng"
                sx={{ minWidth: 80 }}
              />
              <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex' }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
                    const newAnswers = currentAnswers.filter((_, i: number) => i !== ansIdx);
                    setValue(`questions.${questionIndex}.answers`, newAnswers);
                  }}
                >
                  <IconTrash size={18} />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
                setValue(`questions.${questionIndex}.answers`, [...currentAnswers, { answer_text: '', is_correct: true }]);
              }}
              fullWidth
              sx={{ maxWidth: 120 }}
            >
              Thêm đáp án
            </Button>
          </Box>
        </Box>
      );
    }

    // Matching type
    if (isMatching) {
      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2">Cặp nối ({answers.length})</Typography>
          </Box>
          {answers.map((_answer: IAnswer, ansIdx: number) => (
            <Box key={ansIdx} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'flex-start' }}>
              <TextField
                label={`Phần A ${ansIdx + 1}`}
                placeholder="Câu hỏi/Từ"
                {...register(`questions.${questionIndex}.answers.${ansIdx}.answer_text`, {
                  required: 'Vui lòng nhập nội dung',
                })}
                error={!!errors.questions?.[questionIndex]?.answers?.[ansIdx]?.answer_text}
                size="small"
                sx={{ flex: 1 }}
              />
              <TextField
                label={`Phần B ${ansIdx + 1}`}
                placeholder="Đáp án/Nghĩa"
                {...register(`questions.${questionIndex}.answers.${ansIdx}.match_key`, {
                  required: 'Vui lòng nhập đáp án',
                })}
                size="small"
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
                  const newAnswers = currentAnswers.filter((_, i: number) => i !== ansIdx);
                  setValue(`questions.${questionIndex}.answers`, newAnswers);
                }}
              >
                <IconTrash size={18} />
              </IconButton>
            </Box>
          ))}
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
              setValue(`questions.${questionIndex}.answers`, [...currentAnswers, { answer_text: '', match_key: '', is_correct: false }]);
            }}
            fullWidth
            sx={{ mt: 1 }}
          >
            Thêm cặp nối
          </Button>
        </Box>
      );
    }

    // Rearrangement type
    if (isRearrange) {
      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2">Thứ tự đúng ({answers.length})</Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            Sắp xếp các mục theo thứ tự đúng từ trên xuống dưới
          </Alert>
          {answers.map((_answer: IAnswer, ansIdx: number) => (
            <Box key={ansIdx} sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
              <Chip label={ansIdx + 1} size="small" color="primary" />
              <TextField
                fullWidth
                placeholder="Nhập nội dung"
                {...register(`questions.${questionIndex}.answers.${ansIdx}.answer_text`, {
                  required: 'Vui lòng nhập nội dung',
                })}
                error={!!errors.questions?.[questionIndex]?.answers?.[ansIdx]?.answer_text}
                size="small"
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
                  const newAnswers = currentAnswers.filter((_, i: number) => i !== ansIdx);
                  setValue(`questions.${questionIndex}.answers`, newAnswers);
                }}
              >
                <IconTrash size={18} />
              </IconButton>
            </Box>
          ))}
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
              setValue(`questions.${questionIndex}.answers`, [...currentAnswers, { answer_text: '', is_correct: false }]);
            }}
            fullWidth
            sx={{ mt: 1 }}
          >
            Thêm mục
          </Button>
        </Box>
      );
    }

    // MCQ types (Single/Multiple choice and True/False)
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" className="dark:text-gray-300">
            Đáp án ({answers.length}){isSingleChoice && ' - Chọn một đáp án đúng'}
            {isMultipleChoice && ' - Có thể chọn nhiều đáp án đúng'}
            {isTrueFalse && ' - Chọn đáp án đúng'}
          </Typography>
        </Box>

        {answers.map((answer: IAnswer, ansIdx: number) => (
          <Box
            key={ansIdx}
            sx={{
              display: 'flex',
              gap: 1,
              mb: 2,
              alignItems: 'flex-start',
              p: 1,
              borderRadius: 1,
              bgcolor: answer.is_correct ? 'success.50' : 'transparent',
              border: answer.is_correct ? '1px solid' : '1px dashed',
              borderColor: answer.is_correct ? 'success.main' : 'grey.300',
              '.dark &': {
                bgcolor: answer.is_correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: answer.is_correct ? '#10b981' : '#4b5563',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: answer.is_correct ? 'success.main' : 'grey.300',
                color: answer.is_correct ? 'white' : 'text.primary',
                fontWeight: 'bold',
                fontSize: '0.75rem',
                '.dark &': {
                  bgcolor: answer.is_correct ? '#10b981' : '#4b5563',
                  color: answer.is_correct ? 'white' : '#d1d5db',
                },
              }}
            >
              {String.fromCharCode(65 + ansIdx)}
            </Box>

            <TextField
              fullWidth
              placeholder="Nhập nội dung đáp án"
              {...register(`questions.${questionIndex}.answers.${ansIdx}.answer_text`, {
                required: 'Vui lòng nhập đáp án',
              })}
              error={!!errors.questions?.[questionIndex]?.answers?.[ansIdx]?.answer_text}
              helperText={errors.questions?.[questionIndex]?.answers?.[ansIdx]?.answer_text?.message}
              size="small"
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  backgroundColor: '#fff',
                  color: '#111827',
                  '.dark &': {
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d1d5db',
                  '.dark &': {
                    borderColor: '#4b5563',
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
              disabled={isTrueFalse}
            />

            {isSingleChoice || isTrueFalse ? (
              <FormControlLabel
                control={
                  <Radio
                    checked={answer.is_correct}
                    onChange={() => handleSingleChoiceSelect(questionIndex, ansIdx)}
                    size="small"
                    sx={{
                      color: '#6b7280',
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                      '.dark &': {
                        color: '#9ca3af',
                        '&.Mui-checked': {
                          color: '#10b981',
                        },
                      },
                    }}
                  />
                }
                label={<span className="dark:text-gray-300">Đúng</span>}
                sx={{
                  minWidth: 80,
                  '.dark & .MuiFormControlLabel-label': {
                    color: '#d1d5db',
                  },
                }}
              />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.is_correct}
                    onChange={(e) => {
                      const currentAnswers = watch(`questions.${questionIndex}.answers`);
                      const newAnswers = [...currentAnswers];
                      newAnswers[ansIdx] = {
                        ...newAnswers[ansIdx],
                        is_correct: e.target.checked,
                      };
                      setValue(`questions.${questionIndex}.answers`, newAnswers);
                    }}
                    size="small"
                    sx={{
                      color: '#6b7280',
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                      '.dark &': {
                        color: '#9ca3af',
                        '&.Mui-checked': {
                          color: '#10b981',
                        },
                      },
                    }}
                  />
                }
                label={<span className="dark:text-gray-300">Đúng</span>}
                sx={{
                  minWidth: 80,
                  '.dark & .MuiFormControlLabel-label': {
                    color: '#d1d5db',
                  },
                }}
              />
            )}

            {!isTrueFalse && (
              <IconButton
                size="small"
                onClick={() => {
                  const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
                  const newAnswers = currentAnswers.filter((_, i: number) => i !== ansIdx);
                  setValue(`questions.${questionIndex}.answers`, newAnswers);
                }}
                sx={{
                  color: '#6b7280',
                  '&:hover': {
                    color: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  },
                  '.dark &': {
                    color: '#9ca3af',
                    '&:hover': {
                      color: '#f87171',
                      backgroundColor: 'rgba(248, 113, 113, 0.1)',
                    },
                  },
                }}
              >
                <IconTrash size={18} />
              </IconButton>
            )}
          </Box>
        ))}

        {!isTrueFalse && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
                setValue(`questions.${questionIndex}.answers`, [...currentAnswers, { answer_text: '', is_correct: false }]);
              }}
              fullWidth
              sx={{
                maxWidth: 120,
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': {
                  borderColor: '#9ca3af',
                },
                '.dark &': {
                  borderColor: '#4b5563',
                  color: '#d1d5db',
                  '&:hover': {
                    borderColor: '#6b7280',
                  },
                },
              }}
            >
              Thêm đáp án
            </Button>
          </Box>
        )}

        {answers.length === 0 && (
          <Alert
            severity="warning"
            sx={{
              mt: 1,
              '.dark &': {
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
                color: '#fbbf24',
                '& .MuiAlert-icon': {
                  color: '#fbbf24',
                },
              },
            }}
          >
            Chưa có đáp án. Nhấn "Thêm đáp án" để thêm.
          </Alert>
        )}
      </Box>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <DialogTitle
          className="dark:text-blue-400 font-semibold"
          sx={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)',
            borderBottom: '1px solid #bfdbfe',
            p: 2,
            '.dark &': {
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              borderBottom: '1px solid #1d4ed8',
              color: '#dbeafe',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {id ? <IconSettings size={20} className="dark:text-blue-300" /> : <IconPlus size={20} className="dark:text-blue-300" />}
            <Typography variant="h6">{id ? 'Chỉnh sửa quiz' : 'Tạo quiz mới'}</Typography>
            {id && hasUserProgress && (
              <Chip
                icon={<IconHistory size={14} />}
                label="Sẽ tạo version mới"
                size="small"
                color="warning"
                sx={{
                  ml: 1,
                  '.dark &': {
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                    color: '#fbbf24',
                    borderColor: '#fbbf24',
                  },
                }}
              />
            )}
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: (theme) => theme.palette.grey[500],
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              '.dark &': {
                color: '#9ca3af',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
            size="small"
          >
            <IconX height={18} width={18} />
          </IconButton>
        </DialogTitle>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: '#6b7280',
                '&.Mui-selected': {
                  color: '#3b82f6',
                },
                '.dark &': {
                  color: '#9ca3af',
                  '&.Mui-selected': {
                    color: '#60a5fa',
                  },
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#3b82f6',
                '.dark &': {
                  backgroundColor: '#60a5fa',
                },
              },
            }}
          >
            <Tab icon={<IconInfoCircle size={18} className="dark:text-gray-400" />} iconPosition="start" label="Thông tin" sx={{ minHeight: 48 }} />
            <Tab icon={<IconList size={18} className="dark:text-gray-400" />} iconPosition="start" label={`Câu hỏi (${fields.length})`} sx={{ minHeight: 48 }} />
          </Tabs>
        </Box>

        <DialogContent
          dividers
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: 'background.paper',
            '.dark &': {
              bgcolor: '#1f2937',
              borderColor: '#374151',
            },
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {id && hasUserProgress && (
              <Alert
                severity="warning"
                icon={<IconAlertCircle />}
                sx={{
                  m: 2,
                  '.dark &': {
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    color: '#fbbf24',
                    borderColor: '#fbbf24',
                    '& .MuiAlert-icon': {
                      color: '#fbbf24',
                    },
                  },
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }} className="dark:text-yellow-400">
                    <IconUsers size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    Quiz này đã có người làm bài
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }} className="dark:text-yellow-300">
                    Khi bạn lưu, hệ thống sẽ <strong>tạo version mới</strong> và giữ nguyên version cũ để bảo toàn dữ liệu của học viên.
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    label="Ghi chú về version mới (tùy chọn)"
                    value={versionNotes}
                    onChange={(e) => setVersionNotes(e.target.value)}
                    placeholder="VD: Cập nhật câu hỏi số 5, thêm 2 câu mới..."
                    sx={{
                      mt: 1,
                      '& .MuiInputBase-root': {
                        backgroundColor: '#fff',
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#f3f4f6',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                        '.dark &': {
                          borderColor: '#374151',
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
                  />
                </Box>
              </Alert>
            )}
            {activeTab === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    variant="outlined"
                    sx={{
                      mb: 2,
                      '.dark &': {
                        borderColor: '#374151',
                        bgcolor: '#111827',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="dark:text-gray-200">
                        <IconInfoCircle size={18} className="dark:text-gray-400" />
                        Thông tin cơ bản
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Tiêu đề quiz *"
                            {...register('title', {
                              required: 'Vui lòng nhập tiêu đề',
                              minLength: { value: 5, message: 'Tiêu đề phải có ít nhất 5 ký tự' },
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            size="small"
                            InputProps={{
                              sx: {
                                backgroundColor: '#fff',
                                color: '#111827',
                                '.dark &': {
                                  backgroundColor: '#1f2937',
                                  color: '#f3f4f6',
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
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                '.dark &': {
                                  borderColor: '#374151',
                                },
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#3b82f6',
                                '.dark &': {
                                  borderColor: '#3b82f6',
                                },
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="quiz_type"
                            control={control}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                options={QUIZ_TYPES}
                                getOptionLabel={(option) => option.label}
                                value={QUIZ_TYPES.find((t) => t.value === field.value) || QUIZ_TYPES[0]}
                                onChange={(_, data) => field.onChange(data?.value || 1)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Loại quiz"
                                    size="small"
                                    InputProps={{
                                      ...params.InputProps,
                                      sx: {
                                        backgroundColor: '#fff',
                                        color: '#111827',
                                        '.dark &': {
                                          backgroundColor: '#1f2937',
                                          color: '#f3f4f6',
                                          '& .MuiAutocomplete-popupIndicator': {
                                            color: '#9ca3af', // dark mode
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
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d1d5db',
                                        '.dark &': {
                                          borderColor: '#374151',
                                        },
                                      },
                                    }}
                                  />
                                )}
                                slotProps={{
                                  paper: {
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
                                size="small"
                                sx={{
                                  '& .MuiAutocomplete-popper': {
                                    '.dark &': {
                                      backgroundColor: '#1f2937',
                                    },
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="difficulty_level"
                            control={control}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                options={DIFFICULTY_LEVELS}
                                getOptionLabel={(option) => option.label}
                                value={DIFFICULTY_LEVELS.find((d) => d.value === field.value) || DIFFICULTY_LEVELS[2]}
                                onChange={(_, data) => field.onChange(data?.value || 3)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Độ khó"
                                    size="small"
                                    InputProps={{
                                      ...params.InputProps,
                                      sx: {
                                        backgroundColor: '#fff',
                                        color: '#111827',
                                        '.dark &': {
                                          backgroundColor: '#1f2937',
                                          color: '#f3f4f6',
                                          '& .MuiAutocomplete-popupIndicator': {
                                            color: '#9ca3af', // dark mode
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
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d1d5db',
                                        '.dark &': {
                                          borderColor: '#374151',
                                        },
                                      },
                                    }}
                                  />
                                )}
                                slotProps={{
                                  paper: {
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
                                size="small"
                                sx={{
                                  '& .MuiAutocomplete-popper': {
                                    '.dark &': {
                                      backgroundColor: '#1f2937',
                                    },
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                options={STATUS_OPTIONS}
                                getOptionLabel={(option) => option.label}
                                value={STATUS_OPTIONS.find((s) => s.value === field.value) || STATUS_OPTIONS[1]}
                                onChange={(_, data) => field.onChange(data?.value || 2)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Trạng thái"
                                    size="small"
                                    InputProps={{
                                      ...params.InputProps,
                                      sx: {
                                        backgroundColor: '#fff',
                                        color: '#111827',
                                        '.dark &': {
                                          backgroundColor: '#1f2937',
                                          color: '#f3f4f6',
                                          '& .MuiAutocomplete-popupIndicator': {
                                            color: '#9ca3af', // dark mode
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
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d1d5db',
                                        '.dark &': {
                                          borderColor: '#374151',
                                        },
                                      },
                                    }}
                                  />
                                )}
                                slotProps={{
                                  paper: {
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
                                size="small"
                                sx={{
                                  '& .MuiAutocomplete-popper': {
                                    '.dark &': {
                                      backgroundColor: '#1f2937',
                                    },
                                  },
                                }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Thời gian (phút)"
                            {...register('duration_minutes')}
                            helperText="Để trống nếu không giới hạn"
                            size="small"
                            InputProps={{
                              sx: {
                                backgroundColor: '#fff',
                                color: '#111827',
                                '.dark &': {
                                  backgroundColor: '#1f2937',
                                  color: '#f3f4f6',
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
                            FormHelperTextProps={{
                              sx: {
                                color: '#6b7280', // text-gray-500
                                '.dark &': {
                                  color: '#d1d5db', // dark:text-gray-300
                                },
                              },
                            }}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                '.dark &': {
                                  borderColor: '#374151',
                                },
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Điểm đạt (%) *"
                            {...register('passing_score', {
                              required: 'Vui lòng nhập điểm đạt',
                              min: { value: 0, message: 'Điểm đạt phải từ 0-100' },
                              max: { value: 100, message: 'Điểm đạt phải từ 0-100' },
                            })}
                            error={!!errors.passing_score}
                            helperText={errors.passing_score?.message}
                            size="small"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" className="dark:text-white">
                                  <IconPercentage size={20} className="dark:text-gray-400" />
                                </InputAdornment>
                              ),
                              sx: {
                                backgroundColor: '#fff',
                                color: '#111827',
                                '.dark &': {
                                  backgroundColor: '#1f2937',
                                  color: '#f3f4f6',
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
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                '.dark &': {
                                  borderColor: '#374151',
                                },
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0061fdff',
                                '.dark &': {
                                  borderColor: '#0057e4ff',
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{
                      '.dark &': {
                        borderColor: '#374151',
                        bgcolor: '#111827',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }} className="dark:text-gray-200">
                        <IconSettings size={18} className="dark:text-gray-400" />
                        Cài đặt
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                          <Controller
                            name="randomize_questions"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    size="small"
                                    sx={{
                                      '& .MuiSwitch-track': {
                                        backgroundColor: '#d1d5db',
                                        '.dark &': {
                                          backgroundColor: '#4b5563',
                                        },
                                      },
                                    }}
                                  />
                                }
                                label={<span className="dark:text-gray-300">Trộn câu hỏi</span>}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Controller
                            name="randomize_answers"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    size="small"
                                    sx={{
                                      '& .MuiSwitch-track': {
                                        backgroundColor: '#d1d5db',
                                        '.dark &': {
                                          backgroundColor: '#4b5563',
                                        },
                                      },
                                    }}
                                  />
                                }
                                label={<span className="dark:text-gray-300">Trộn đáp án</span>}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Controller
                            name="show_explanation"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    size="small"
                                    sx={{
                                      '& .MuiSwitch-track': {
                                        backgroundColor: '#d1d5db',
                                        '.dark &': {
                                          backgroundColor: '#4b5563',
                                        },
                                      },
                                    }}
                                  />
                                }
                                label={<span className="dark:text-gray-300">Hiển thị giải thích</span>}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Controller
                            name="allow_review"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    size="small"
                                    sx={{
                                      '& .MuiSwitch-track': {
                                        backgroundColor: '#d1d5db',
                                        '.dark &': {
                                          backgroundColor: '#4b5563',
                                        },
                                      },
                                    }}
                                  />
                                }
                                label={<span className="dark:text-gray-300">Cho phép xem lại</span>}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Controller
                            name="allow_retake"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    size="small"
                                    sx={{
                                      '& .MuiSwitch-track': {
                                        backgroundColor: '#d1d5db',
                                        '.dark &': {
                                          backgroundColor: '#4b5563',
                                        },
                                      },
                                    }}
                                  />
                                }
                                label={<span className="dark:text-gray-300">Cho phép làm lại</span>}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <Controller
                            name="show_results"
                            control={control}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    size="small"
                                    sx={{
                                      '& .MuiSwitch-track': {
                                        backgroundColor: '#d1d5db',
                                        '.dark &': {
                                          backgroundColor: '#4b5563',
                                        },
                                      },
                                    }}
                                  />
                                }
                                label={<span className="dark:text-gray-300">Hiển thị kết quả</span>}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Số lần làm tối đa"
                            {...register('max_attempts')}
                            helperText="Để trống nếu không giới hạn"
                            size="small"
                            InputProps={{
                              sx: {
                                backgroundColor: '#fff',
                                color: '#111827',
                                '.dark &': {
                                  backgroundColor: '#1f2937',
                                  color: '#f3f4f6',
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
                            FormHelperTextProps={{
                              sx: {
                                color: '#6b7280', // text-gray-500
                                '.dark &': {
                                  color: '#d1d5db', // dark:text-gray-300
                                },
                              },
                            }}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#d1d5db',
                                '.dark &': {
                                  borderColor: '#374151',
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="subtitle1" className="dark:text-gray-200">
                      Danh sách câu hỏi: {fields.length}
                    </Typography>
                  </Box>

                  {importing && (
                    <Box sx={{ mb: 2 }}>
                      <LinearProgress />
                      <Typography variant="caption" className="dark:text-gray-400">
                        Đang import câu hỏi...
                      </Typography>
                    </Box>
                  )}

                  {fields.length === 0 ? (
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 4,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        '.dark &': {
                          borderColor: '#374151',
                          bgcolor: '#111827',
                        },
                      }}
                    >
                      <Typography className="dark:text-gray-400" sx={{ mb: 2 }}>
                        Chưa có câu hỏi nào. Bắt đầu bằng cách thêm câu hỏi mới hoặc import từ file Word.
                      </Typography>
                      <Button variant="outlined" component="label" startIcon={<IconUpload size={16} className="dark:text-gray-400" />} sx={{ mr: 2 }} disabled={importing} className="dark:border-gray-600 dark:text-gray-300">
                        Import từ file Word
                        <input type="file" accept=".doc,.docx" hidden onChange={handleImportFile} />
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconPlus size={16} />}
                        onClick={handleAddQuestion}
                        sx={{
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#7c3aed',
                          },
                        }}
                      >
                        Thêm câu hỏi thủ công
                      </Button>
                    </Box>
                  ) : (
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="questions">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields.map((field, index) => {
                              const warning = getQuestionWarnings(index);
                              const questionType = watch(`questions.${index}.question_type`);

                              return (
                                <Draggable key={field.id} draggableId={field.id} index={index}>
                                  {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                      <Accordion
                                        expanded={expandedQuestion === index}
                                        onChange={(_, isExpanded) => {
                                          setExpandedQuestion(isExpanded ? index : false);
                                        }}
                                        sx={{
                                          mb: 2,
                                          border: warning ? '2px solid #fbbf24' : '1px solid #e0e0e0',
                                          '&.Mui-expanded': {
                                            margin: '16px 0',
                                          },
                                          '.dark &': {
                                            borderColor: warning ? '#fbbf24' : '#374151',
                                            bgcolor: '#111827',
                                          },
                                        }}
                                      >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon className="dark:text-gray-400" />}>
                                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1, flexWrap: 'wrap' }}>
                                            <div {...provided.dragHandleProps} style={{ cursor: 'grab' }}>
                                              <IconGripVertical size={20} className="text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <Chip
                                              label={`Câu ${index + 1}`}
                                              size="small"
                                              color="primary"
                                              variant="outlined"
                                              sx={{
                                                '.dark &': {
                                                  borderColor: '#4b5563',
                                                  color: '#d1d5db',
                                                },
                                              }}
                                            />
                                            <Chip
                                              label={QUESTION_TYPES.find((t) => t.value === questionType)?.label || 'MCQ'}
                                              size="small"
                                              sx={{
                                                '.dark &': {
                                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                  color: '#d1d5db',
                                                },
                                              }}
                                            />
                                            <Typography
                                              sx={{
                                                flex: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                maxWidth: { xs: '150px', sm: '300px', md: '400px' },
                                                '.dark &': {
                                                  color: '#f3f4f6',
                                                },
                                              }}
                                            >
                                              {watch(`questions.${index}.question_text`) || 'Chưa nhập câu hỏi'}
                                            </Typography>
                                            {warning && (
                                              <Tooltip title={warning}>
                                                <Chip
                                                  icon={<IconAlertTriangle size={16} />}
                                                  label={warning}
                                                  size="small"
                                                  color="warning"
                                                  sx={{
                                                    '.dark &': {
                                                      backgroundColor: 'rgba(251, 191, 36, 0.2)',
                                                      color: '#fbbf24',
                                                    },
                                                  }}
                                                />
                                              </Tooltip>
                                            )}
                                            <IconButton
                                              size="small"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                remove(index);
                                              }}
                                              sx={{
                                                ml: 'auto',
                                                '.dark &': {
                                                  color: '#9ca3af',
                                                  '&:hover': {
                                                    color: '#f87171',
                                                    backgroundColor: 'rgba(248, 113, 113, 0.1)',
                                                  },
                                                },
                                              }}
                                            >
                                              <IconTrash size={18} />
                                            </IconButton>
                                          </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                              <TextField
                                                fullWidth
                                                label="Nội dung câu hỏi *"
                                                {...register(`questions.${index}.question_text`, {
                                                  required: 'Vui lòng nhập câu hỏi',
                                                })}
                                                error={!!errors.questions?.[index]?.question_text}
                                                helperText={errors.questions?.[index]?.question_text?.message}
                                                multiline
                                                rows={2}
                                                size="small"
                                                InputProps={{
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#111827',
                                                    '.dark &': {
                                                      backgroundColor: '#1f2937',
                                                      color: '#f3f4f6',
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
                                                  '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#d1d5db',
                                                    '.dark &': {
                                                      borderColor: '#374151',
                                                    },
                                                  },
                                                }}
                                              />
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                              <Controller
                                                name={`questions.${index}.question_type`}
                                                control={control}
                                                render={({ field }) => (
                                                  <Autocomplete
                                                    {...field}
                                                    options={QUESTION_TYPES}
                                                    getOptionLabel={(option) => option.label}
                                                    value={QUESTION_TYPES.find((t) => t.value === field.value) || QUESTION_TYPES[0]}
                                                    onChange={(_, data) => handleQuestionTypeChange(index, data?.value || 1)}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="Loại câu hỏi"
                                                        size="small"
                                                        InputProps={{
                                                          ...params.InputProps,
                                                          sx: {
                                                            backgroundColor: '#fff',
                                                            color: '#111827',
                                                            '.dark &': {
                                                              backgroundColor: '#1f2937',
                                                              color: '#f3f4f6',
                                                              '& .MuiAutocomplete-popupIndicator': {
                                                                color: '#9ca3af', // dark mode
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
                                                          '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#d1d5db',
                                                            '.dark &': {
                                                              borderColor: '#374151',
                                                            },
                                                          },
                                                        }}
                                                      />
                                                    )}
                                                    slotProps={{
                                                      paper: {
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
                                                    size="small"
                                                    sx={{
                                                      '& .MuiAutocomplete-popper': {
                                                        '.dark &': {
                                                          backgroundColor: '#1f2937',
                                                        },
                                                      },
                                                    }}
                                                  />
                                                )}
                                              />
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                              <TextField
                                                fullWidth
                                                type="number"
                                                label="Điểm"
                                                {...register(`questions.${index}.points`)}
                                                size="small"
                                                InputProps={{
                                                  inputProps: { min: 0, step: 0.5 },
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#111827',
                                                    '.dark &': {
                                                      backgroundColor: '#1f2937',
                                                      color: '#f3f4f6',
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
                                                  '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#d1d5db',
                                                    '.dark &': {
                                                      borderColor: '#374151',
                                                    },
                                                  },
                                                }}
                                              />
                                            </Grid>

                                            <Grid item xs={12} sm={6} md={4}>
                                              <Controller
                                                name={`questions.${index}.difficulty`}
                                                control={control}
                                                render={({ field }) => (
                                                  <Autocomplete
                                                    {...field}
                                                    options={DIFFICULTY_LEVELS}
                                                    getOptionLabel={(option) => option.label}
                                                    value={DIFFICULTY_LEVELS.find((d) => d.value === field.value) || DIFFICULTY_LEVELS[2]}
                                                    onChange={(_, data) => field.onChange(data?.value || 3)}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="Độ khó"
                                                        size="small"
                                                        InputProps={{
                                                          ...params.InputProps,
                                                          sx: {
                                                            backgroundColor: '#fff',
                                                            color: '#111827',
                                                            '.dark &': {
                                                              backgroundColor: '#1f2937',
                                                              color: '#f3f4f6',
                                                              '& .MuiAutocomplete-popupIndicator': {
                                                                color: '#9ca3af', // dark mode
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
                                                          '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#d1d5db',
                                                            '.dark &': {
                                                              borderColor: '#374151',
                                                            },
                                                          },
                                                        }}
                                                      />
                                                    )}
                                                    slotProps={{
                                                      paper: {
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
                                                    size="small"
                                                    sx={{
                                                      '& .MuiAutocomplete-popper': {
                                                        '.dark &': {
                                                          backgroundColor: '#1f2937',
                                                        },
                                                      },
                                                    }}
                                                  />
                                                )}
                                              />
                                            </Grid>

                                            <Grid item xs={12}>
                                              <TextField
                                                fullWidth
                                                label="Giải thích (tùy chọn)"
                                                {...register(`questions.${index}.explanation`)}
                                                multiline
                                                rows={2}
                                                size="small"
                                                InputProps={{
                                                  sx: {
                                                    backgroundColor: '#fff',
                                                    color: '#111827',
                                                    '.dark &': {
                                                      backgroundColor: '#1f2937',
                                                      color: '#f3f4f6',
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
                                                  '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#d1d5db',
                                                    '.dark &': {
                                                      borderColor: '#374151',
                                                    },
                                                  },
                                                }}
                                              />
                                            </Grid>

                                            <Grid item xs={12}>
                                              {renderAnswerInput(index, questionType)}
                                            </Grid>
                                          </Grid>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}

                  {/* Nút thêm câu hỏi và import ở dưới */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <input accept=".doc,.docx,.txt" style={{ display: 'none' }} id="import-word-file-bottom" type="file" onChange={handleImportFile} disabled={importing} />
                    <label htmlFor="import-word-file-bottom">
                      <Button variant="outlined" component="span" startIcon={<IconFileImport size={18} className="dark:text-gray-400" />} disabled={importing} size="small" className="dark:border-gray-600 dark:text-gray-300">
                        Import từ file
                      </Button>
                    </label>
                    <Button
                      variant="contained"
                      startIcon={<IconPlus size={18} />}
                      onClick={handleAddQuestion}
                      size="small"
                      sx={{
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#7c3aed',
                        },
                      }}
                    >
                      Thêm câu hỏi
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
            gap: 1,
            borderTop: '1px solid #e0e0e0',
            flexWrap: 'wrap',
            '.dark &': {
              borderTop: '1px solid #374151',
              bgcolor: '#111827',
            },
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            disabled={loading}
            sx={{
              borderColor: '#d1d5db',
              color: '#374151',
              '&:hover': {
                borderColor: '#9ca3af',
              },
              '.dark &': {
                borderColor: '#4b5563',
                color: '#d1d5db',
                '&:hover': {
                  borderColor: '#6b7280',
                },
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={<IconDeviceFloppy size={18} />}
            disabled={loading}
            sx={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              '&:hover': {
                backgroundColor: '#7c3aed',
              },
              '&:disabled': {
                backgroundColor: '#d1d5db',
                color: '#9ca3af',
                '.dark &': {
                  backgroundColor: '#374151',
                  color: '#6b7280',
                },
              },
            }}
          >
            {loading ? 'Đang lưu...' : id ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
          iconMapping={{
            success: <CheckCircleIcon sx={{ fontSize: 18, color: 'white' }} />,
            error: <ErrorIcon sx={{ fontSize: 18, color: 'white' }} />,
            warning: <WarningIcon sx={{ fontSize: 18, color: 'white' }} />,
            info: <InfoIcon sx={{ fontSize: 18, color: 'white' }} />,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
});

export default QuizFormDialog;
