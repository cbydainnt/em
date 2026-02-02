import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Button, IconButton, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAuthStore } from '@/hooks/useAuthStore';
import { NotificationType, UserType } from '@/utils/enums';
import { logClientMessage } from '@/utils';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface PdfDocument {
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

interface PdfViewerPageProps {
  document: PdfDocument;
  closeDialog: () => void;
}

export default function PdfViewerPage({ document, closeDialog }: PdfViewerPageProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [showSidebar, setShowSidebar] = useState(true);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [thumbWidth, setThumbWidth] = useState(120);
  const { authData } = useAuthStore();
  useEffect(() => {
    if (!sidebarRef.current) return;

    const observer = new ResizeObserver(() => {
      const w = sidebarRef.current?.clientWidth || 200;
      setThumbWidth(Math.max(60, w - 40));
    });

    observer.observe(sidebarRef.current);
    return () => observer.disconnect();
  }, []);

  const isSmallScreen = useMediaQuery('(max-width:900px)');
  useEffect(() => {
    if (isSmallScreen) setShowSidebar(false);
  }, [isSmallScreen]);

  if (!document.document_url) return <h2 style={{ padding: 20 }}> Không tìm thấy file</h2>;

  const onLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);

  const handleDownload = () => {
    const url = document.document_url;
    const key = 'englishmaster/lesson_documents/';
    const index = url.indexOf(key);
    if (index === -1) return;

    const path = url.substring(index);
    const downloadUrl = `/api/file/download/${path}`;
    window.open(downloadUrl, '_blank');
    logClientMessage('DOWNLOAD', `document_id=${document.document_id}`, authData.id, UserType.USER, NotificationType.USER_ACTION);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'black', color: 'text.primary', mt: '50px' }}>
      {/* ---------- TOP BAR ---------- */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          bgcolor: 'rgba(60, 60, 60)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          gap: 2,
        }}
      >
        {!isSmallScreen && (
          <Tooltip title={showSidebar ? 'Ẩn danh sách trang' : 'Hiện danh sách trang'}>
            <IconButton onClick={() => setShowSidebar((prev) => !prev)} sx={{ color: 'white' }}>
              {showSidebar ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>
        )}

        {!isSmallScreen && <Typography sx={{ color: 'gray', fontWeight: 200 }}> | </Typography>}

        {!isSmallScreen && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            {' '}
            <TextField
              value={pageNumber}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!isNaN(val)) setPageNumber(val);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  let target = pageNumber;

                  if (target < 1) target = 1;
                  if (target > numPages) target = numPages;

                  setPageNumber(target);

                  // Scroll tới trang tương ứng
                  setTimeout(() => {
                    pageRefs.current[target - 1]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }, 10);
                }
              }}
              size="small"
              sx={{
                width: 80,
                input: {
                  textAlign: 'center',
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                },
                '& .MuiOutlinedInput-root fieldset': { borderColor: 'white' },
                '& .MuiOutlinedInput-root:hover fieldset': { borderColor: 'white' },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'white' },
              }}
            />
            <Typography sx={{ color: 'white', fontWeight: 500 }}> / {numPages} </Typography>
            <Typography sx={{ color: 'gray', fontWeight: 200 }}> | </Typography>
          </Box>
        )}

        <Tooltip title="Thu nhỏ">
          <IconButton onClick={() => setScale((z) => Math.max(0.6, z - 0.2))} sx={{ color: 'white' }}>
            <RemoveIcon />
          </IconButton>
        </Tooltip>

        <Typography
          sx={{
            color: 'black',
            bgcolor: 'white',
            border: '1px solid white',
            px: 1.5,
            py: 0.5,
            borderRadius: '6px',
            fontWeight: 600,
            minWidth: '60px',
            textAlign: 'center',
          }}
        >
          {Math.round(scale * 100)}%
        </Typography>

        <Tooltip title="Phóng to">
          <IconButton onClick={() => setScale((z) => Math.min(3, z + 0.2))} sx={{ color: 'white' }}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        {document.isDownloadable && (
          <>
            <Typography sx={{ color: 'gray', fontWeight: 200 }}> | </Typography>
            <Tooltip title="Tải về">
              <IconButton onClick={handleDownload} sx={{ color: 'white' }}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        <Tooltip title="Tắt chế độ hiển thị toàn màn hình">
          <Button onClick={closeDialog} variant="contained" color="inherit" sx={{ color: 'black' }}>
            Đóng
          </Button>
        </Tooltip>
      </Box>

      {/* ---------- SIDEBAR: Thumbnails ---------- */}
      {showSidebar && (
        <Box sx={{ width: { xs: '35%', sm: '28%', md: '20%', lg: '15%' }, overflowY: 'auto', borderRight: '1px solid gray', p: 5 }} ref={sidebarRef}>
          <Document file={document.document_url}>
            {Array.from(new Array(numPages), (_, i) => (
              <Box
                key={i + 1}
                sx={{
                  mt: 4,
                  mb: 5,
                  outline: pageNumber === i + 1 ? '4px solid rgb(156, 39, 176)' : 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textAlign: 'center',
                  color: 'white',
                  py: 2,
                }}
                onClick={() => {
                  setPageNumber(i + 1);
                  pageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <Page pageNumber={i + 1} width={thumbWidth} renderTextLayer={false} renderAnnotationLayer={false} />
                <div style={{ fontSize: 12, marginTop: 4 }}>{i + 1}</div>
              </Box>
            ))}
          </Document>
        </Box>
      )}

      {/* ---------- MAIN VIEWER ---------- */}
      <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Document file={document.document_url} onLoadSuccess={onLoadSuccess}>
          {Array.from(new Array(numPages), (_, i) => (
            <div key={i + 1} ref={(el) => (pageRefs.current[i] = el)} style={{ marginBottom: 16 }}>
              <Page pageNumber={i + 1} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
            </div>
          ))}
        </Document>
      </Box>
    </Box>
  );
}
