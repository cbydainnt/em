import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, FormLabel, Button, IconButton, Switch, Box, Typography, Paper, Stack, Grid, CircularProgress, Autocomplete } from '@mui/material';
import { IconTrash, IconPlus, IconX, IconDeviceFloppy } from '@tabler/icons-react';
import axios from 'axios';

// Types
interface AnswerType {
  answer_text: string;
  is_correct: boolean;
  order: number;
  match_key?: string;
  blank_position?: number;
}

interface QuestionFormData {
  quiz_id: string;
  question_text: string;
  question_type: number;
  points: number;
  difficulty: number;
  explanation: string;
  order: number;
  audio_id: string | null;
  reading_passage_id: string | null;
  answers: AnswerType[];
}

interface LessonQuiz {
  quiz_id: string;
  title: string;
  quiz_type: number;
}

interface QuestionFormDialogProps {
  open: boolean;
  editingQuestion: any | null;
  quizIdParam: string | null;
  onClose: () => void;
  onSave: (data: QuestionFormData) => Promise<void>;
  loading: boolean;
}

// Constants (có thể import từ file constants riêng)
const QUESTION_TYPES = {
  1: { label: 'Một đáp án', shortLabel: 'Single', color: 'primary' },
  2: { label: 'Nhiều đáp án', shortLabel: 'Multi', color: 'secondary' },
  3: { label: 'Điền vào chỗ trống', shortLabel: 'Fill', color: 'info' },
  4: { label: 'Đúng/Sai', shortLabel: 'T/F', color: 'warning' },
  5: { label: 'Nối', shortLabel: 'Match', color: 'error' },
  6: { label: 'Sắp xếp', shortLabel: 'Sort', color: 'success' },
  7: { label: 'Tự luận', shortLabel: 'Essay', color: 'default' },
};

const DIFFICULTY_LEVELS = {
  1: { label: 'Rất dễ', color: 'success' },
  2: { label: 'Dễ', color: 'info' },
  3: { label: 'Trung bình', color: 'warning' },
  4: { label: 'Khó', color: 'error' },
  5: { label: 'Rất khó', color: 'error' },
};

export default function QuestionFormDialog({ open, editingQuestion, quizIdParam, onClose, onSave, loading }: QuestionFormDialogProps) {
  const [lessonQuizzes, setLessonQuizzes] = useState<LessonQuiz[]>([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [formData, setFormData] = useState<QuestionFormData>({
    quiz_id: quizIdParam || '',
    question_text: '',
    question_type: 1,
    points: 1,
    difficulty: 1,
    explanation: '',
    order: 0,
    audio_id: null,
    reading_passage_id: null,
    answers: [],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load lesson quizzes
  const loadLessonQuizzes = useCallback(async () => {
    setLoadingQuizzes(true);
    try {
      const response = await axios.get(`/api/admin/questions/lesson-quizzes`);
      if (response.data) {
        setLessonQuizzes(response.data);
      }
    } catch (error) {
      console.error('Error loading quizzes:', error);
    } finally {
      setLoadingQuizzes(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      loadLessonQuizzes();
    }
  }, [open, loadLessonQuizzes]);

  // Set form data when editing or creating
  useEffect(() => {
    if (editingQuestion && open) {
      setFormData({
        quiz_id: editingQuestion.quiz?.quiz_id || '',
        question_text: editingQuestion.question_text,
        question_type: editingQuestion.question_type,
        points: editingQuestion.points,
        difficulty: editingQuestion.difficulty,
        explanation: editingQuestion.explanation || '',
        order: editingQuestion.order,
        audio_id: editingQuestion.audio?.audio_id || null,
        reading_passage_id: editingQuestion.reading_passage?.reading_passage_id || null,
        answers: editingQuestion.answers.map((a: any) => ({
          answer_text: a.answer_text,
          is_correct: a.is_correct,
          order: a.order,
          match_key: a.match_key,
          blank_position: a.blank_position,
        })),
      });
    } else if (open) {
      setFormData({
        quiz_id: quizIdParam || '',
        question_text: '',
        question_type: 1,
        points: 1,
        difficulty: 1,
        explanation: '',
        order: 0,
        audio_id: null,
        reading_passage_id: null,
        answers: [],
      });
    }
    setFormErrors({});
  }, [editingQuestion, open, quizIdParam]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.question_text.trim()) {
      errors.question_text = 'Vui lòng nhập nội dung câu hỏi';
    }
    if (formData.points < 1) {
      errors.points = 'Điểm phải lớn hơn 0';
    }
    if (formData.answers.length === 0 && formData.question_type !== 7) {
      errors.answers = 'Vui lòng thêm ít nhất một đáp án';
    }

    // Validate based on question type
    if (formData.question_type === 1 || formData.question_type === 4) {
      const correctAnswers = formData.answers.filter((a) => a.is_correct);
      if (correctAnswers.length !== 1) {
        errors.answers = 'Câu hỏi một đáp án phải có đúng 1 đáp án đúng';
      }
    }

    if (formData.question_type === 2) {
      const correctAnswers = formData.answers.filter((a) => a.is_correct);
      if (correctAnswers.length < 1) {
        errors.answers = 'Câu hỏi nhiều đáp án phải có ít nhất 1 đáp án đúng';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    await onSave(formData);
  };

  const handleAddAnswer = () => {
    setFormData({
      ...formData,
      answers: [
        ...formData.answers,
        {
          answer_text: '',
          is_correct: false,
          order: formData.answers.length,
        },
      ],
    });
  };

  const handleUpdateAnswer = (index: number, field: keyof AnswerType, value: any) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };

    // For single choice questions, ensure only one correct answer
    if (field === 'is_correct' && value === true && (formData.question_type === 1 || formData.question_type === 4)) {
      newAnswers.forEach((a, i) => {
        if (i !== index) {
          a.is_correct = false;
        }
      });
    }

    setFormData({ ...formData, answers: newAnswers });
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = formData.answers.filter((_, i) => i !== index);
    newAnswers.forEach((a, i) => {
      a.order = i;
    });
    setFormData({ ...formData, answers: newAnswers });
  };

  const handleFieldChange = (field: keyof QuestionFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          '.dark &': {
            bgcolor: '#1f2937',
            border: '1px solid #374151',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          '.dark &': {
            bgcolor: '#111827',
            borderBottom: '1px solid #374151',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              '.dark &': { color: '#f3f4f6' },
            }}
          >
            {editingQuestion ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              '.dark &': {
                color: '#9ca3af',
                '&:hover': {
                  bgcolor: '#374151',
                },
              },
            }}
          >
            <IconX size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          '.dark &': {
            bgcolor: '#1f2937',
            borderColor: '#374151',
          },
        }}
      >
        <Stack spacing={3}>
          {/* Quiz Selection */}
          <Autocomplete
            options={lessonQuizzes}
            getOptionLabel={(option) => option.title}
            value={lessonQuizzes.find((q) => q.quiz_id === formData.quiz_id) || null}
            onChange={(_, newValue) => {
              handleFieldChange('quiz_id', newValue?.quiz_id || '');
            }}
            loading={loadingQuizzes}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn Quiz *"
                error={!!formErrors.quiz_id}
                helperText={formErrors.quiz_id}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    '.dark &': {
                      bgcolor: '#374151',
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
                  '.dark & .MuiAutocomplete-popupIndicator': {
                    color: '#9ca3af',
                  },
                  '.dark & .MuiAutocomplete-clearIndicator': {
                    color: '#9ca3af',
                  },
                }}
              />
            )}
            PaperComponent={(props) => (
              <Paper
                {...props}
                sx={{
                  '.dark &': {
                    bgcolor: '#374151',
                    border: '1px solid #4b5563',
                    '& .MuiAutocomplete-option': {
                      color: '#d1d5db',
                      '&:hover': {
                        bgcolor: '#4b5563',
                      },
                      '&[aria-selected="true"]': {
                        bgcolor: '#1f2937',
                      },
                    },
                  },
                }}
              />
            )}
          />

          {/* Question Text */}
          <TextField
            label="Nội dung câu hỏi *"
            multiline
            rows={4}
            value={formData.question_text}
            onChange={(e) => handleFieldChange('question_text', e.target.value)}
            error={!!formErrors.question_text}
            helperText={formErrors.question_text}
            fullWidth
            InputProps={{
              sx: {
                '.dark &': {
                  bgcolor: '#374151',
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
          />

          {/* Question Type */}
          <FormControl fullWidth>
            <FormLabel
              sx={{
                '.dark &': {
                  color: '#d1d5db',
                },
              }}
            >
              Loại câu hỏi
            </FormLabel>
            <RadioGroup row value={formData.question_type} onChange={(e) => handleFieldChange('question_type', parseInt(e.target.value))}>
              {Object.entries(QUESTION_TYPES).map(([key, type]) => (
                <FormControlLabel
                  key={key}
                  value={parseInt(key)}
                  control={
                    <Radio
                      sx={{
                        '.dark &': {
                          color: '#9ca3af',
                          '&.Mui-checked': {
                            color: '#8b5cf6',
                          },
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        sx={{
                          '.dark &': { color: '#d1d5db' },
                        }}
                      >
                        {type.shortLabel}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          '.dark &': { color: '#9ca3af' },
                        }}
                      >
                        ({type.label})
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Points and Difficulty */}
          <Grid container spacing={0} className="gap-5">
            <Grid item xs={3}>
              <TextField
                type="number"
                label="Điểm *"
                value={formData.points}
                onChange={(e) => handleFieldChange('points', parseInt(e.target.value))}
                error={!!formErrors.points}
                helperText={formErrors.points}
                inputProps={{ min: 1 }}
                fullWidth
                InputProps={{
                  sx: {
                    '.dark &': {
                      bgcolor: '#374151',
                      color: '#f3f4f6',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4b5563',
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
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  }}
                >
                  Độ khó
                </InputLabel>
                <Select
                  value={formData.difficulty}
                  label="Độ khó"
                  onChange={(e) => handleFieldChange('difficulty', parseInt(e.target.value as string))}
                  sx={{
                    '.dark &': {
                      bgcolor: '#374151',
                      color: '#f3f4f6',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4b5563',
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
                  {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
                    <MenuItem
                      key={key}
                      value={parseInt(key)}
                      sx={{
                        '.dark &': {
                          bgcolor: '#374151',
                          color: '#d1d5db',
                          '&:hover': {
                            bgcolor: '#4b5563',
                          },
                        },
                      }}
                    >
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                label="Thứ tự"
                value={formData.order}
                onChange={(e) => handleFieldChange('order', parseInt(e.target.value))}
                inputProps={{ min: 0 }}
                fullWidth
                InputProps={{
                  sx: {
                    '.dark &': {
                      bgcolor: '#374151',
                      color: '#f3f4f6',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4b5563',
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
              />
            </Grid>
          </Grid>

          {/* Explanation */}
          <TextField
            label="Giải thích"
            multiline
            rows={3}
            value={formData.explanation}
            onChange={(e) => handleFieldChange('explanation', e.target.value)}
            fullWidth
            InputProps={{
              sx: {
                '.dark &': {
                  bgcolor: '#374151',
                  color: '#f3f4f6',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4b5563',
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
          />

          {/* Answers Section */}
          {formData.question_type !== 7 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    '.dark &': { color: '#f3f4f6' },
                  }}
                >
                  Đáp án{' '}
                  {formErrors.answers && (
                    <Typography
                      component="span"
                      color="error"
                      variant="caption"
                      sx={{
                        '.dark &': { color: '#fca5a5' },
                      }}
                    >
                      ({formErrors.answers})
                    </Typography>
                  )}
                </Typography>
                <Button
                  size="small"
                  startIcon={<IconPlus size={16} />}
                  onClick={handleAddAnswer}
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
                  Thêm đáp án
                </Button>
              </Box>

              <Stack spacing={2}>
                {formData.answers.map((answer, index) => (
                  <Paper
                    key={index}
                    elevation={2}
                    sx={{
                      p: 2,
                      '.dark &': {
                        bgcolor: '#374151',
                        border: '1px solid #4b5563',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: answer.is_correct ? 'success.main' : 'grey.400',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          flexShrink: 0,
                          '.dark &': {
                            bgcolor: answer.is_correct ? '#22c55e' : '#6b7280',
                          },
                        }}
                      >
                        {String.fromCharCode(65 + index)}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Nội dung đáp án"
                          value={answer.answer_text}
                          onChange={(e) => handleUpdateAnswer(index, 'answer_text', e.target.value)}
                          sx={{ mb: 1 }}
                          InputProps={{
                            sx: {
                              '.dark &': {
                                bgcolor: '#1f2937',
                                color: '#f3f4f6',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#4b5563',
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
                        />

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={answer.is_correct}
                                onChange={(e) => handleUpdateAnswer(index, 'is_correct', e.target.checked)}
                                sx={{
                                  '.dark &': {
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                      color: '#22c55e',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                      bgcolor: '#22c55e',
                                    },
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                sx={{
                                  '.dark &': { color: '#d1d5db' },
                                }}
                              >
                                Đáp án đúng
                              </Typography>
                            }
                          />

                          {formData.question_type === 3 && (
                            <TextField
                              size="small"
                              type="number"
                              label="Vị trí chỗ trống"
                              value={answer.blank_position || ''}
                              onChange={(e) => handleUpdateAnswer(index, 'blank_position', parseInt(e.target.value))}
                              sx={{ width: 150 }}
                              InputProps={{
                                sx: {
                                  '.dark &': {
                                    bgcolor: '#1f2937',
                                    color: '#f3f4f6',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#4b5563',
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
                            />
                          )}

                          {formData.question_type === 5 && (
                            <TextField
                              size="small"
                              label="Match Key"
                              value={answer.match_key || ''}
                              onChange={(e) => handleUpdateAnswer(index, 'match_key', e.target.value)}
                              sx={{ width: 150 }}
                              InputProps={{
                                sx: {
                                  '.dark &': {
                                    bgcolor: '#1f2937',
                                    color: '#f3f4f6',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                      borderColor: '#4b5563',
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
                            />
                          )}
                        </Box>
                      </Box>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveAnswer(index)}
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
                    </Box>
                  </Paper>
                ))}

                {formData.answers.length === 0 && (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 3,
                      bgcolor: 'grey.50',
                      borderRadius: 1,
                      '.dark &': {
                        bgcolor: '#374151',
                        border: '1px dashed #4b5563',
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        '.dark &': { color: '#9ca3af' },
                      }}
                    >
                      Chưa có đáp án nào. Nhấn "Thêm đáp án" để bắt đầu.
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          '.dark &': {
            bgcolor: '#111827',
            borderTop: '1px solid #374151',
          },
        }}
      >
        <Button
          onClick={onClose}
          color="inherit"
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
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<IconDeviceFloppy size={18} />}
          disabled={loading}
          sx={{
            '.dark &': {
              bgcolor: '#8b5cf6',
              '&:hover': {
                bgcolor: '#7c3aed',
              },
              '&.Mui-disabled': {
                bgcolor: '#4b5563',
                color: '#6b7280',
              },
            },
          }}
        >
          {loading ? <CircularProgress size={20} /> : editingQuestion ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
