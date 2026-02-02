import { Box, Chip, IconButton, Typography } from '@mui/material';
import { IconFileText, IconPhoto, IconUpload, IconVideo, IconX } from '@tabler/icons-react';
import { useRef, useState } from 'react';

export interface FileUploadProps {
  value: string | File | File[];
  onChange: (data: string | File | File[]) => void;
  onDelete: () => void;
  accept: string;
  type?: 'thumbnail' | 'video' | 'document' | 'file';
  label: string;
  isVideoOrDoc?: boolean;
  multiple?: boolean;
}

const FileUpload = ({ value, onChange, onDelete, accept, type = 'file', label, isVideoOrDoc = false, multiple = false }: FileUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList) => {
    if (type === 'thumbnail') {
      // Thumbnail chỉ cho 1 file
      const file = files[0];
      onChange(file); // 🔥 CHỈ TRẢ VỀ File
      setPreviewUrl(URL.createObjectURL(file));
    } else if (isVideoOrDoc) {
      if (multiple) {
        // MULTIPLE: Chuyển FileList thành Array
        const fileArray = Array.from(files);
        onChange(fileArray); // 🔥 TRẢ VỀ File[]
      } else {
        // Single file
        onChange(files[0]); // 🔥 TRẢ VỀ File
      }
    } else {
      // Base64 handling - KHÔNG DÙNG CHO UPLOAD MULTIPLE
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (_e) => {
        // 🔥 VẪN TRẢ VỀ File, không phải string
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.multiple = multiple;
      fileInputRef.current.click();
    }
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

  // 🔥 UPDATE RENDER PREVIEW CHO MULTIPLE FILES
  const renderPreview = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
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

    // 🔥 HIỂN THỊ MULTIPLE FILES
    if (Array.isArray(value)) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {value.map((file, index) => (
            <Box
              key={index}
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
                  <Typography variant="body2" fontWeight="600" noWrap sx={{ maxWidth: '100%' }}>
                    {file.name}
                  </Typography>
                  <Chip label="Mới" size="small" color="primary" />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  // 🔥 FIX: Xử lý đúng kiểu dữ liệu
                  const currentFiles = value as File[];
                  const newFiles = currentFiles.filter((_, i) => i !== index);

                  if (newFiles.length > 0) {
                    onChange(newFiles);
                  } else {
                    // Nếu không còn file nào, gọi onDelete để reset component
                    onDelete();
                  }
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
          ))}
        </Box>
      );
    }

    // Single file handling
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
            <Typography className=" dark:text-white" variant="body2" fontWeight="600" noWrap sx={{ maxWidth: '100%' }}>
              {type === 'video' ? 'Video Filegg' : 'File'}
            </Typography>
            {isExisting && <Chip label="Đã lưu" size="small" color="primary" />}
            {!isExisting && <Chip label="Mới" size="small" color="primary" />}
          </Box>
          <Typography variant="caption" color="text.secondary">
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
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileChange(files);
          }
        }}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      {preview !== null ? (
        preview
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragOver ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center gap-3">
            <IconUpload size={40} className="text-gray-400" />
            <Typography variant="body1" className="text-gray-700 dark:text-gray-300 font-medium">
              {label}
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
              {multiple ? 'Kéo thả nhiều file vào đây hoặc click để chọn' : 'Kéo thả file vào đây hoặc click để chọn'}
            </Typography>
            {multiple && (
              <Typography variant="caption" className="text-gray-500">
                Có thể chọn nhiều file cùng lúc
              </Typography>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
