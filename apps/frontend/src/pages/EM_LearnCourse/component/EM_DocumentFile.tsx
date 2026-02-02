import { useAuthStore } from '@/hooks/useAuthStore';
import { logClientMessage } from '@/utils';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { IconDownload, IconFile, IconFileTypeDoc, IconFileTypePdf, IconFileTypePpt, IconFileTypeTxt, IconFileTypeXls } from '@tabler/icons-react';
import { useState } from 'react';
import { NotificationType, UserType } from '@/utils/enums';

interface Document {
  created_at: string;
  document_id: string;
  document_name: string;
  document_url: string;
  extension: string;
  lesson_id: string;
  updated_at: string;
  size: number;
  isDownloadable: boolean;
}

interface DocumentFileProps {
  documents: Document[];
  onSelectDocument?: (doc: Document) => void;
}
export const DocumentFile = ({ documents, onSelectDocument }: DocumentFileProps) => {
  const { authData } = useAuthStore();
  const [visibleCount, setVisibleCount] = useState(10);
  const visibleDocuments = documents.slice(0, visibleCount);
  const getFileIcon = (ext: string) => {
    const lower = ext.toLowerCase();

    switch (lower) {
      case 'pdf':
        return <IconFileTypePdf size={30} color="#e53935" />;

      case 'doc':
      case 'docx':
        return <IconFileTypeDoc size={30} color="#2962ff" />;

      case 'xls':
      case 'xlsx':
        return <IconFileTypeXls size={30} color="#2e7d32" />;

      case 'ppt':
      case 'pptx':
        return <IconFileTypePpt size={30} color="#ef6c00" />;

      case 'txt':
        return <IconFileTypeTxt size={30} color="#616161" />;

      default:
        return <IconFile size={30} color="#757575" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const handleDownload = (doc: Document) => {
    const url = doc.document_url;
    if (!url.includes('englishmaster/lesson_documents/')) {
      return;
    }
    const downloadUrl = `/api/file/download/${url}`;
    window.open(downloadUrl, '_blank');
    logClientMessage('DOWNLOAD', `document_id=${doc.document_id}`, authData.id,UserType.USER, NotificationType.USER_ACTION);
  };

  if (!documents || documents.length === 0) {
    return <Typography sx={{ color: 'gray', p: 1 }}>Chưa có tài liệu cho bài học này.</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        sx={{
          color: 'rgb(55, 65, 81)',
          fontWeight: '600',
          fontSize: '18px',
        }}
        className="dark:text-gray-200"
      >
        Tài liệu bài học
      </Typography>
      {visibleDocuments.map((doc, key) => (
        <Box
          key={doc.document_id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
            px: 1,
            borderBottom: '1px solid #eee',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {getFileIcon(doc.extension)}
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 18,
                }}
                onClick={doc.extension?.toLowerCase() === 'pdf' ? () => onSelectDocument?.(doc) : undefined}
              >
                {key + 1}.{doc.document_name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, mt: 0.3 }}>
                {doc.size && <Typography sx={{ fontSize: 14, color: 'gray' }}>{formatFileSize(doc.size)}</Typography>}
                <Typography sx={{ fontSize: 14, color: 'gray' }}>{doc.extension}</Typography>
              </Box>
            </Box>
          </Box>

          {doc.isDownloadable && (
            <Tooltip title="Tải xuống tài liệu" arrow>
              <Button
                sx={{
                  color: 'rgb(13, 110, 253)',
                  minWidth: 0,
                  '&:hover': {
                    background: 'gray',
                    color: 'white',
                  },
                }}
                className="dark:text-gray-200"
                onClick={() => handleDownload(doc)}
              >
                <IconDownload />
              </Button>
            </Tooltip>
          )}
        </Box>
      ))}
      {documents.length > 10 && visibleCount < documents.length && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            sx={{
              background: 'rgb(25, 118, 210)',
              border: 'none',
              color: 'white',
              '&:hover': {
                background: 'gray',
                color: 'white',
                border: 'none',
              },
            }}
            variant="outlined"
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            Xem thêm
          </Button>
        </Box>
      )}
    </Box>
  );
};
