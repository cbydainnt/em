import { forwardRef, useEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Chip, CircularProgress, Snackbar, Alert } from '@mui/material';
import { IconX, IconPhoto, IconVideo, IconFileText, IconUpload } from '@tabler/icons-react';

interface MediaUploadProps {
  value: string | File;
  onChange: (data: string | File) => void;
  onDelete: () => void;
  accept: string;
  type?: 'thumbnail' | 'video' | 'document' | 'file';
  label: string;
  isVideoOrDoc?: boolean;
  onDurationDetected?: (duration: number) => void;
}

const MediaUpload = forwardRef<HTMLInputElement, MediaUploadProps>(({ value, onChange, onDelete, accept, type = 'file', label, isVideoOrDoc = false, onDurationDetected }, _ref) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoadingDuration, setIsLoadingDuration] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentFileRef = useRef<string | File>(value);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });
  const showError = (message: string) => {
    setSnackbar({
      open: true,
      message,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const VIDEO_EXTENSIONS = ['mp4', 'mov', 'webm', 'mkv', 'avi', 'flv'];
  const VIDEO_MIME_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-matroska', 'video/x-msvideo', 'video/x-flv'];
  const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
  const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  useEffect(() => {
    currentFileRef.current = value;
  }, [value]);

  const validateVideoFile = (file: File): boolean => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !VIDEO_EXTENSIONS.includes(ext)) {
      showError(`Chỉ cho phép video có định dạng ${VIDEO_EXTENSIONS.join(', ')}`);
      return false;
    }

    if (!VIDEO_MIME_TYPES.includes(file.type)) {
      showError(`File không phải video hợp lệ`);
      return false;
    }

    return true;
  };

  const validateImageFile = (file: File): boolean => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !IMAGE_EXTENSIONS.includes(ext)) {
      showError(`Thumbnail chỉ cho phép: ${IMAGE_EXTENSIONS.join(', ')}`);
      return false;
    }

    if (!IMAGE_MIME_TYPES.includes(file.type)) {
      showError('File không phải hình ảnh hợp lệ');
      return false;
    }

    return true;
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        const durationInMinutes = Math.ceil(video.duration / 60);
        resolve(durationInMinutes);
      };

      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Không thể đọc thời lượng video'));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (file: File) => {
    if (type === 'video' && !validateVideoFile(file)) {
      return;
    }

    if (type === 'thumbnail' && !validateImageFile(file)) {
      return;
    }

    onChange(file);

    if (type === 'thumbnail') {
      setPreviewUrl(URL.createObjectURL(file));
    } else if (isVideoOrDoc) {
      currentFileRef.current = file;

      if (type === 'video' && onDurationDetected) {
        setIsLoadingDuration(true);
        try {
          const duration = await getVideoDuration(file);
          if (currentFileRef.current === file) {
            onDurationDetected(duration);
          }
        } catch (error) {
          console.error('Không thể lấy thời lượng video:', error);
        } finally {
          setIsLoadingDuration(false);
        }
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (currentFileRef.current === file) {
          onChange(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getIcon = () => {
    switch (type) {
      case 'thumbnail':
        return <IconPhoto size={24} className="text-purple-500" />;
      case 'video':
        return <IconVideo size={24} className="text-red-500" />;
      case 'document':
        return <IconFileText size={24} className="text-green-500" />;
      default:
        return <IconUpload size={24} />;
    }
  };

  const renderPreview = () => {
    if (!value || value === '') {
      return null;
    }

    if (type === 'thumbnail') {
      let imgSrc = previewUrl || '';
      if (value instanceof File && !imgSrc) imgSrc = URL.createObjectURL(value);
      else if (typeof value === 'string') imgSrc = value.startsWith('http') ? value : `/api/admin/courses/file/${value}`;

      return (
        <div className="relative">
          <img src={imgSrc} alt="Preview" className="max-w-[200px] max-h-[120px] object-contain rounded-md border border-gray-300 dark:border-gray-600" />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
            sx={{ width: 32, height: 32 }}
          >
            <IconX size={16} />
          </IconButton>
        </div>
      );
    }

    let fileInfo = '';
    let isExisting = false;

    if (value instanceof File) {
      fileInfo = `${(value.size / 1024 / 1024).toFixed(2)} MB`;
      isExisting = false;
    } else if (typeof value === 'string' && value.length > 0) {
      isExisting = true;
      fileInfo = 'Đã tải lên';
    } else {
      return null;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          bgcolor: 'action.hover',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            bgcolor: 'primary.light',
            borderRadius: 1,
            flexShrink: 0,
          }}
        >
          {getIcon()}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography className=" dark:text-gray-400" variant="body2" fontWeight="600" noWrap title="Video File" sx={{ maxWidth: '100%' }}>
              {type === 'video' ? 'Video File' : 'File'}
            </Typography>
            {isExisting && <Chip label="Đã lưu" size="small" color="primary" />}
            {!isExisting && <Chip label="Mới" size="small" color="primary" />}
            {isLoadingDuration && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CircularProgress size={14} />
                <Typography variant="caption" color="text.secondary">
                  Đang lấy thời lượng...
                </Typography>
              </Box>
            )}
          </Box>
          <Typography className=" dark:text-gray-400" variant="caption" color="text.secondary">
            {fileInfo}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': { bgcolor: 'error.dark' },
            flexShrink: 0,
          }}
        >
          <IconX size={16} />
        </IconButton>
      </Box>
    );
  };

  const preview = renderPreview();

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileChange(file);
          }
          e.currentTarget.value = '';
        }}
        accept={accept}
        className="hidden"
      />

      {preview !== null ? (
        preview
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${dragOver ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center gap-2">
            <IconUpload size={32} className="text-gray-400" />
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
              {label}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              Kéo thả file vào đây hoặc click để chọn
            </Typography>
            {type === 'video' && (
              <Typography variant="caption" className="text-blue-500">
                Thời lượng video sẽ được tự động nhận
              </Typography>
            )}
          </div>
        </div>
      )}
      <Snackbar key={snackbar.message} open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={handleCloseSnackbar} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
});

MediaUpload.displayName = 'MediaUpload';

export default MediaUpload;
