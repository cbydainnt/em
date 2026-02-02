// components/ReportDialog.tsx
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Chip, Alert, Stepper, Step, StepLabel, CircularProgress, Checkbox, FormControlLabel, IconButton, Collapse, Snackbar } from '@mui/material';
import { IconBug, IconPhoto, IconSend, IconX } from '@tabler/icons-react';
import axios from 'axios';

const REPORT_TYPES = [
  {
    value: 1,
    label: 'Video',
    categories: [
      { value: 1, label: 'Video không tải được' },
      { value: 2, label: 'Video bị giật/lag' },
      { value: 3, label: 'Âm thanh không đồng bộ' },
      { value: 4, label: 'Chất lượng video kém' },
      { value: 5, label: 'Video sai nội dung' },
    ],
  },
  {
    value: 2,
    label: 'Bài học',
    categories: [
      { value: 6, label: 'Nội dung sai' },
      { value: 7, label: 'Lỗi ngữ pháp/chính tả' },
      { value: 8, label: 'Tài liệu đính kèm lỗi' },
      { value: 9, label: 'Bài tập không hoạt động' },
      { value: 10, label: 'Link hỏng' },
    ],
  },
  {
    value: 3,
    label: 'Kỹ thuật',
    categories: [
      { value: 11, label: 'Trang web load chậm' },
      { value: 12, label: 'Tính năng không hoạt động' },
      { value: 13, label: 'Lỗi trên điện thoại' },
      { value: 14, label: 'Lỗi đăng nhập' },
    ],
  },
  { value: 5, label: 'Khác', categories: [{ value: 15, label: 'Vấn đề khác' }] },
];

const ReportDialog = ({ open, onClose, onSuccess, courseId, lessonId, lessonTitle, sectionName }: any) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    report_type: 1,
    category: 1,
    title: '',
    description: '',
    is_anonymous: false,
    allow_contact: true,
    priority: 2,
  });

  type ScreenshotItem = {
    file: File;
    preview: string;
  };

  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([]);

  const [uploading, setUploading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Kiểm tra xem có phải loại "Khác" không
  const isOtherType = form.report_type === 5;

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Close snackbar
  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Show confirmation dialog
  const showConfirmDialog = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setConfirmDialog((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Upload screenshots first
      const uploadedUrls = [];
      if (screenshots.length > 0) {
        setUploading(true);
        const formData = new FormData();

        screenshots.forEach((item) => {
          formData.append('screenshots', item.file);
        });

        const uploadRes = await axios.post('/api/report/upload-screenshot', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        uploadedUrls.push(...uploadRes.data.urls);
        setUploading(false);
      }

      // Submit report
      await axios.post(
        '/api/report/create',
        {
          ...form,
          screenshot_urls: uploadedUrls,
          course_id: courseId,
          lesson_id: lessonId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      // Show success snackbar
      showSnackbar('Báo cáo đã được gửi thành công! Cảm ơn bạn đã đóng góp.', 'success');

      // Reset and close
      resetForm();
      onClose();

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error submitting report:', error);
      showSnackbar(error.response?.data?.message || 'Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.', 'error');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const resetForm = () => {
    setStep(0);
    setShowValidation(false);
    setForm({
      report_type: 1,
      category: 1,
      title: '',
      description: '',
      is_anonymous: false,
      allow_contact: true,
      priority: 2,
    });
    setScreenshots([]);
  };

  const processFiles = (files: File[]) => {
    const remain = 5 - screenshots.length;
    if (remain <= 0) {
      showSnackbar('Chỉ được tải tối đa 5 ảnh', 'warning');
      return;
    }

    const validFiles = files.filter((f) => f.type.startsWith('image/')).slice(0, remain);

    const newItems: ScreenshotItem[] = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setScreenshots((prev) => [...prev, ...newItems]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    e.target.value = '';
  };

  const removeScreenshot = (preview: string) => {
    setScreenshots((prev) => {
      const item = prev.find((x) => x.preview === preview);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((x) => x.preview !== preview);
    });
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    processFiles(files);
  };

  const handleClose = () => {
    if (loading || uploading) return;

    if (step > 0 || form.title || form.description || screenshots.length > 0) {
      showConfirmDialog('Xác nhận đóng', 'Bạn có chắc muốn đóng? Thông tin chưa lưu sẽ bị mất.', () => {
        resetForm();
        onClose();
      });
    } else if (step == 0) {
      onClose();
    } else {
      resetForm();
    }
  };

  const currentType = REPORT_TYPES.find((t) => t.value === form.report_type);
  const currentCategory = currentType?.categories.find((c) => c.value === form.category);

  // Khi chọn loại báo cáo thay đổi
  const handleReportTypeChange = (value: number) => {
    const selectedType = REPORT_TYPES.find((t) => t.value === value);
    const newCategory = selectedType?.categories[0]?.value || 15;
    const isNewTypeOther = value === 5;

    setForm((prev) => ({
      ...prev,
      report_type: value,
      category: newCategory,
      // Reset title chỉ khi chuyển từ "Khác" sang loại khác
      // Nếu đang từ loại khác sang "Khác", giữ title hiện tại
      title: isNewTypeOther ? prev.title : selectedType?.categories[0]?.label || '',
    }));
  };

  // Khi chọn category thay đổi
  const handleCategoryChange = (value: number) => {
    const selectedCategory = currentType?.categories.find((c) => c.value === value);
    const isCurrentlyOtherType = form.report_type === 5;

    setForm((prev) => ({
      ...prev,
      category: value,
      // Tự động đặt tiêu đề nếu không phải loại "Khác"
      // Nếu là loại "Khác", giữ nguyên title người dùng đã nhập
      title: isCurrentlyOtherType ? prev.title : selectedCategory?.label || '',
    }));
  };

  // Hàm kiểm tra validation
  const getValidationError = () => {
    if (!form.description.trim()) {
      return 'Vui lòng nhập mô tả chi tiết';
    }

    if (isOtherType && !form.title.trim()) {
      return 'Vui lòng nhập tiêu đề cho báo cáo';
    }

    return null;
  };

  const validationError = getValidationError();
  useEffect(() => {
    return () => {
      screenshots.forEach((s) => URL.revokeObjectURL(s.preview));
    };
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (step === 0 && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
            return;
          }

          handleClose();
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <IconBug size={24} color="#f59e0b" />
              <Typography variant="h6" className="dark:text-gray-100">
                Báo cáo sự cố
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                color: 'text.secondary',
                '.dark &': {
                  color: '#9ca3af',
                },
              }}
            >
              <IconX size={20} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ py: 3, overflow: 'auto' }}>
          <Stepper
            activeStep={step}
            sx={{
              mb: 4,
              '.MuiStepLabel-label': {
                '.dark &': {
                  color: '#9ca3af',
                  '&.Mui-active': {
                    color: '#f9fafb',
                  },
                  '&.Mui-completed': {
                    color: '#9ca3af',
                  },
                },
              },
            }}
          >
            <Step>
              <StepLabel>Chọn loại</StepLabel>
            </Step>
            <Step>
              <StepLabel>Mô tả chi tiết</StepLabel>
            </Step>
            <Step>
              <StepLabel>Xác nhận</StepLabel>
            </Step>
          </Stepper>

          {step === 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom className="dark:text-gray-100">
                Loại sự cố bạn gặp phải là gì?
              </Typography>

              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mt={2}>
                {REPORT_TYPES.map((type) => (
                  <Button
                    key={type.value}
                    variant={form.report_type === type.value ? 'contained' : 'outlined'}
                    onClick={() => {
                      handleReportTypeChange(type.value);
                      setStep(1);
                    }}
                    sx={{
                      height: 80,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      textTransform: 'none',
                      borderColor: '#d1d5db',
                      color: form.report_type === type.value ? 'white' : '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                      '.dark &': {
                        borderColor: '#4b5563',
                        color: form.report_type === type.value ? 'white' : '#d1d5db',
                        backgroundColor: form.report_type === type.value ? '#8b5cf6' : 'transparent',
                        '&:hover': {
                          borderColor: '#6b7280',
                          backgroundColor: form.report_type === type.value ? '#7c3aed' : 'rgba(255, 255, 255, 0.05)',
                        },
                      },
                    }}
                  >
                    <Typography fontWeight={600}>{type.label}</Typography>
                    <Typography variant="caption" className="dark:text-gray-400">
                      {type.categories.length} loại
                    </Typography>
                  </Button>
                ))}
              </Box>

              {(lessonTitle || sectionName) && (
                <Alert
                  severity="info"
                  sx={{
                    mt: 3,
                    '.dark &': {
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: '#93c5fd',
                      '& .MuiAlert-icon': {
                        color: '#60a5fa',
                      },
                    },
                  }}
                >
                  <Typography variant="body2" className="dark:text-gray-300">
                    Báo cáo này sẽ được liên kết với:
                    {lessonTitle && <strong className="dark:text-gray-100"> {lessonTitle}</strong>}
                    {sectionName && (
                      <span>
                        {' '}
                        trong chương <strong className="dark:text-gray-100">{sectionName}</strong>
                      </span>
                    )}
                  </Typography>
                </Alert>
              )}
            </Box>
          )}

          {step === 1 && (
            <Box>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel className="dark:text-gray-300">Chi tiết sự cố</InputLabel>
                <Select
                  value={form.category}
                  label="Chi tiết sự cố"
                  onChange={(e) => handleCategoryChange(e.target.value as number)}
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
                  sx={{
                    '& .MuiSelect-select': {
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
                        borderColor: '#374151',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8b5cf6',
                      '.dark &': {
                        borderColor: '#8b5cf6',
                      },
                    },
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
                >
                  {currentType?.categories.map((cat) => (
                    <MenuItem
                      key={cat.value}
                      value={cat.value}
                      sx={{
                        '.dark &': {
                          backgroundColor: '#1f2937',
                          color: '#f3f4f6',
                          '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(139, 92, 246, 0.2)',
                          },
                        },
                      }}
                    >
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Chỉ hiển thị trường nhập tiêu đề khi chọn loại "Khác" */}
              <Collapse in={isOtherType}>
                <TextField
                  fullWidth
                  label="Tiêu đề báo cáo"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  sx={{
                    mb: 2,
                    '& .MuiSelect-select': {
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
                        borderColor: '#374151',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8b5cf6',
                      '.dark &': {
                        borderColor: '#8b5cf6',
                      },
                    },
                  }}
                  placeholder="Nhập tiêu đề cho vấn đề khác của bạn"
                  required={isOtherType}
                  error={showValidation && isOtherType && !form.title.trim()}
                  helperText={showValidation && isOtherType && !form.title.trim() ? 'Tiêu đề không được để trống' : ''}
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
                />
              </Collapse>

              {/* Hiển thị tiêu đề tự động cho các loại khác */}
              {!isOtherType && (
                <Box
                  sx={{
                    mb: 2,
                    p: 1.5,
                    bgcolor: 'background.default',
                    borderRadius: 1,
                    '.dark &': {
                      bgcolor: '#111827',
                      border: '1px solid #374151',
                    },
                  }}
                >
                  <Typography variant="subtitle2" className="dark:text-gray-400">
                    Tiêu đề tự động:
                  </Typography>
                  <Typography variant="body1" className="dark:text-gray-100">
                    {form.title || currentCategory?.label || ''}
                  </Typography>
                </Box>
              )}

              <TextField
                fullWidth
                label="Mô tả chi tiết"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                multiline
                rows={4}
                placeholder="Mô tả chi tiết sự cố bạn gặp phải. Càng chi tiết càng tốt để chúng tôi có thể giải quyết nhanh chóng."
                required
                error={showValidation && !form.description.trim()}
                helperText={showValidation && !form.description.trim() ? 'Mô tả không được để trống' : ''}
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
                  mb: 2,
                  '& .MuiSelect-select': {
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
                      borderColor: '#374151',
                    },
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8b5cf6',
                    '.dark &': {
                      borderColor: '#8b5cf6',
                    },
                  },
                }}
              />

              <Box
                mb={2}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragging ? '#8b5cf6' : '#d1d5db',
                  borderRadius: 2,
                  p: 2,
                  transition: 'all 0.2s ease',
                  backgroundColor: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                  '.dark &': {
                    borderColor: isDragging ? '#a78bfa' : '#374151',
                    backgroundColor: isDragging ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                  },
                }}
              >
                <Typography variant="subtitle2" gutterBottom className="dark:text-gray-300">
                  Ảnh chụp màn hình (tối đa 5 ảnh, mỗi ảnh ≤ 5MB)
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  {screenshots.map((item) => (
                    <Box key={item.preview} position="relative">
                      <img
                        src={item.preview}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          bgcolor: 'white',
                          boxShadow: 1,
                          '&:hover': {
                            bgcolor: '#f5f5f5',
                          },
                          '.dark &': {
                            bgcolor: '#374151',
                            color: '#f3f4f6',
                            '&:hover': {
                              bgcolor: '#4b5563',
                            },
                          },
                        }}
                        onClick={() => removeScreenshot(item.preview)}
                      >
                        <IconX size={16} />
                      </IconButton>
                    </Box>
                  ))}

                  {screenshots.length < 5 && (
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        width: 100,
                        height: 100,
                        borderStyle: 'dashed',
                        borderColor: '#bdbdbd',
                        '&:hover': {
                          borderColor: '#9e9e9e',
                          bgcolor: 'rgba(0, 0, 0, 0.02)',
                        },
                        '.dark &': {
                          borderColor: '#4b5563',
                          color: '#9ca3af',
                          '&:hover': {
                            borderColor: '#6b7280',
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                          },
                        },
                      }}
                    >
                      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                        <IconPhoto size={24} className="dark:text-gray-400" />
                        <Typography variant="caption" className="dark:text-gray-400">
                          Thêm ảnh
                        </Typography>
                      </Box>
                      <input type="file" hidden accept="image/jpeg,image/png,image/gif,image/webp" multiple onChange={handleFileChange} />
                    </Button>
                  )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.allow_contact}
                        onChange={(e) => setForm((prev) => ({ ...prev, allow_contact: e.target.checked }))}
                        sx={{
                          color: '#6b7280',
                          '&.Mui-checked': {
                            color: '#8b5cf6',
                          },
                          '.dark &': {
                            color: '#9ca3af',
                            '&.Mui-checked': {
                              color: '#8b5cf6',
                            },
                          },
                        }}
                      />
                    }
                    label={<span className="dark:text-gray-300">Cho phép liên hệ lại nếu cần thêm thông tin</span>}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.is_anonymous}
                        onChange={(e) => setForm((prev) => ({ ...prev, is_anonymous: e.target.checked }))}
                        sx={{
                          color: '#6b7280',
                          '&.Mui-checked': {
                            color: '#f59e0b',
                          },
                          '.dark &': {
                            color: '#9ca3af',
                            '&.Mui-checked': {
                              color: '#f59e0b',
                            },
                          },
                        }}
                      />
                    }
                    label={<span className="dark:text-gray-300">Gửi ẩn danh</span>}
                  />
                </Box>
              </Box>

              {showValidation && validationError && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2,
                    '.dark &': {
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#fca5a5',
                      '& .MuiAlert-icon': {
                        color: '#f87171',
                      },
                    },
                  }}
                >
                  {validationError}
                </Alert>
              )}

              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  onClick={() => {
                    setShowValidation(false);
                    setStep(0);
                  }}
                  sx={{
                    color: '#374151',
                    '.dark &': {
                      color: '#d1d5db',
                    },
                  }}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowValidation(true);
                    if (!getValidationError()) {
                      setStep(2);
                    }
                  }}
                  sx={{
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#7c3aed',
                    },
                    '&:disabled': {
                      backgroundColor: '#d1d5db',
                      '.dark &': {
                        backgroundColor: '#374151',
                        color: '#6b7280',
                      },
                    },
                  }}
                >
                  Tiếp tục
                </Button>
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Alert
                severity="info"
                sx={{
                  mb: 3,
                  '.dark &': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#93c5fd',
                    '& .MuiAlert-icon': {
                      color: '#60a5fa',
                    },
                  },
                }}
              >
                Vui lòng kiểm tra lại thông tin trước khi gửi báo cáo
              </Alert>

              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  mb: 3,
                  '.dark &': {
                    bgcolor: '#111827',
                    border: '1px solid #374151',
                  },
                }}
              >
                <Typography variant="subtitle2" className="dark:text-gray-400">
                  Loại báo cáo
                </Typography>
                <Typography gutterBottom className="dark:text-gray-100">
                  {currentType?.label || 'Khác'}
                </Typography>

                <Typography variant="subtitle2" className="dark:text-gray-400" mt={2}>
                  Chi tiết
                </Typography>
                <Typography gutterBottom className="dark:text-gray-100">
                  {currentCategory?.label || 'Vấn đề khác'}
                </Typography>

                <Typography variant="subtitle2" className="dark:text-gray-400" mt={2}>
                  Tiêu đề
                </Typography>
                <Typography gutterBottom className="dark:text-gray-100">
                  {isOtherType ? form.title : currentCategory?.label || form.title}
                </Typography>

                <Typography variant="subtitle2" className="dark:text-gray-400" mt={2}>
                  Mô tả
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-wrap' }} className="dark:text-gray-300">
                  {form.description}
                </Typography>

                {screenshots.length > 0 && (
                  <>
                    <Typography variant="subtitle2" className="dark:text-gray-400" mt={2}>
                      Ảnh đính kèm ({screenshots.length} ảnh)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {screenshots.map((item) => (
                        <img
                          key={item.preview}
                          src={item.preview}
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #e5e7eb',
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}

                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={form.allow_contact ? 'Cho phép liên hệ' : 'Không liên hệ'}
                    color={form.allow_contact ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                    sx={{
                      maxWidth: '100%', // 👈 không vượt màn hình
                      height: 'auto',
                      '.MuiChip-label': {
                        whiteSpace: 'normal', // 👈 cho xuống dòng
                        textAlign: 'center',
                        lineHeight: 1.2,
                      },
                      '.dark &': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: form.allow_contact ? '#86efac' : '#9ca3af',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  />
                  <Chip
                    label={form.is_anonymous ? 'Ẩn danh' : 'Hiển thị tên'}
                    color={form.is_anonymous ? 'warning' : 'default'}
                    size="small"
                    variant="outlined"
                    sx={{
                      maxWidth: '100%', // 👈 không vượt màn hình
                      height: 'auto',
                      '.MuiChip-label': {
                        whiteSpace: 'normal', // 👈 cho xuống dòng
                        textAlign: 'center',
                        lineHeight: 1.2,
                      },
                      '.dark &': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: form.is_anonymous ? '#fcd34d' : '#9ca3af',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  />
                </Box>
              </Box>

              {lessonTitle && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2,
                    '.dark &': {
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      color: '#86efac',
                      '& .MuiAlert-icon': {
                        color: '#4ade80',
                      },
                    },
                  }}
                >
                  <Typography variant="body2" className="dark:text-gray-300">
                    Báo cáo này sẽ được gửi cho bài học: <strong className="dark:text-gray-100">{lessonTitle}</strong>
                    {sectionName && <span className="dark:text-gray-300"> (Chương: {sectionName})</span>}
                  </Typography>
                </Alert>
              )}

              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  onClick={() => setStep(1)}
                  sx={{
                    color: '#374151',
                    '.dark &': {
                      color: '#d1d5db',
                    },
                  }}
                >
                  Quay lại
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={loading || uploading ? <CircularProgress size={20} /> : <IconSend />}
                  onClick={handleSubmit}
                  disabled={loading || uploading || !!getValidationError()}
                  sx={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    },
                    '&:disabled': {
                      background: '#d1d5db',
                      '.dark &': {
                        background: '#374151',
                        color: '#6b7280',
                      },
                    },
                  }}
                >
                  {loading ? 'Đang gửi...' : uploading ? 'Đang tải ảnh...' : 'Gửi'}
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            px: 3,
            py: 2,
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          <Typography variant="caption" className="dark:text-gray-400">
            Báo cáo của bạn sẽ được xử lý trong vòng 24-48 giờ
          </Typography>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeConfirmDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            borderRadius: '8px',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'text.primary',
            '.dark &': {
              color: '#f9fafb',
            },
          }}
        >
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <Typography className="dark:text-gray-300">{confirmDialog.message}</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            '.dark &': {
              borderTop: '1px solid #374151',
              padding: '16px 24px 20px',
            },
          }}
        >
          <Button
            onClick={closeConfirmDialog}
            sx={{
              color: 'text.secondary',
              '.dark &': {
                color: '#9ca3af',
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              confirmDialog.onConfirm();
              closeConfirmDialog();
            }}
            variant="contained"
            sx={{
              backgroundColor: '#ef4444',
              color: 'white',
              '&:hover': {
                backgroundColor: '#dc2626',
              },
              '.dark &': {
                backgroundColor: '#dc2626',
                '&:hover': {
                  backgroundColor: '#b91c1c',
                },
              },
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportDialog;
