import { useEffect, useState } from 'react';
import { Box, Typography, TextField, IconButton, List, ListItem, Tooltip, Menu, MenuItem } from '@mui/material';
import { IconSend, IconTrash, IconEdit, IconCheck, IconX, IconDotsVertical } from '@tabler/icons-react';
import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore';
import { IconPalette } from '@tabler/icons-react';

interface NoteTabProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  lesson_id: string;
}

interface Note {
  note_id: string;
  time: number;
  text: string;
  background_color?: string | null;
}

export const NoteTab = ({ videoRef, lesson_id }: NoteTabProps) => {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [timeCaptured, setTimeCaptured] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const { authData } = useAuthStore();
  const COLORS = [
    'rgb(238, 74, 98)', // đỏ hồng
    'rgb(70, 100, 228)', // xanh dương
    'rgb(248, 148, 31)', // cam
    'rgb(26, 182, 157)', // xanh ngọc
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [colorMenuNoteId, setColorMenuNoteId] = useState<string | null>(null);
  const [colorMenuAnchor, setColorMenuAnchor] = useState<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionAnchorEl, setActionAnchorEl] = useState<HTMLElement | null>(null);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);

  const handleOpenColorMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseColorMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setActionAnchorEl(event.currentTarget);
    setActiveNoteIndex(index);
  };

  const handleCloseActionMenu = () => {
    setActionAnchorEl(null);
    setActiveNoteIndex(null);
  };

  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!lesson_id || !authData?.id) return; // không có lessonId thì không fetch

    const fetchNotes = async () => {
      try {
        const res = await axios.get(`api/note/lesson/${lesson_id}/${authData.id}`);

        const rawNotes = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.data) ? res.data.data : [];

        const formatted = rawNotes.map((note: any) => ({
          note_id: note.note_id,
          time: note.timestamp,
          text: note.content,
          background_color: note.background_color,
        }));

        setNotes(formatted);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [lesson_id, authData]);

  const handleInputFocus = () => {
    if (!videoRef.current) return;
    setTimeCaptured(videoRef.current.currentTime);
  };

  const handleAddNote = async () => {
    const cleanedText = noteText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '')
      .join('\n');

    if (!cleanedText) return;

    const noteTime = timeCaptured ?? videoRef.current?.currentTime ?? 0;

    try {
      const res = await axios.post('/api/note/create', {
        content: cleanedText,
        timestamp: Math.floor(noteTime),
        lesson_id: lesson_id,
        user_id: authData.id,
        background_color: selectedColor,
      });

      const newNote = {
        note_id: res.data.note_id,
        time: res.data.timestamp,
        text: res.data.content,
        background_color: res.data.background_color,
      };

      setNotes((prev) => {
        const existsIndex = prev.findIndex((n) => n.time === newNote.time);

        if (existsIndex !== -1) {
          // Update
          const updated = [...prev];
          updated[existsIndex] = {
            ...updated[existsIndex],
            text: updated[existsIndex].text + ' ' + cleanedText,
            background_color: newNote.background_color,
          };
          return updated;
        }

        // Add mới
        return [...prev, newNote].sort((a, b) => a.time - b.time);
      });
      setNoteText('');
      setTimeCaptured(null);
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const toggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleJumpTo = (time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    videoRef.current.focus();

    if (videoRef.current.ended) {
      videoRef.current.play().catch(() => {});
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleDeleteNote = async (note_id: string) => {
    try {
      await axios.delete(`/api/note/${note_id}`);
      setNotes((prev) => prev.filter((note) => note.note_id !== note_id));
    } catch (err) {
      console.error('error', err);
    }
  };

  const handleEditNote = (index: number) => {
    setEditingIndex(index);
    setEditText(notes[index].text);
  };

  const handleSaveEdit = async (index: number) => {
    const note = notes[index];

    try {
      await axios.patch(`api/note/${note.note_id}`, {
        content: editText,
      });

      setNotes((prev) => prev.map((n, i) => (i === index ? { ...n, text: editText } : n)));

      setEditingIndex(null);
      setEditText('');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  const handleOpenColorPicker = (event: React.MouseEvent<HTMLButtonElement>, note_id: string) => {
    setColorMenuNoteId(note_id);
    setColorMenuAnchor(event.currentTarget);
  };

  const handleChangeColor = async (color: string, note: Note) => {
    try {
      await axios.patch(`/api/note/${note.note_id}`, {
        background_color: color,
        content: note.text,
      });

      setNotes((prev) => prev.map((n) => (n.note_id === note.note_id ? { ...n, background_color: color } : n)));
    } catch (err) {
      console.error('Error updating color:', err);
    }

    setColorMenuNoteId(null);
    setColorMenuAnchor(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // chặn xuống dòng
      if (!noteText.trim()) return;
      handleAddNote();
    }
  };

  return (
    <Box
      className="dark:text-gray-200"
      sx={{
        mr: {
          xs: '8px',
          md: 0,
        },
      }}
    >
      {/* Ô nhập ghi chú */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0, sm: 1 },
          mb: 1,
          p: 0,
        }}
      >
        <Box
          sx={{
            width: 60,
            minWidth: 60,
            height: '100%',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 1,
            cursor: 'pointer',
          }}
        >
          <Typography sx={{ fontWeight: 700, mr: { xs: 2, sm: 0 } }}>{formatTime(timeCaptured)}</Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            borderRadius: '4px',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={6}
            placeholder="Nhập ghi chú..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onFocus={handleInputFocus}
            onClick={handleInputFocus}
            onKeyDown={handleKeyDown}
            className="dark:[&_.MuiInputBase-input]:text-gray-200 dark:[&_.MuiInputBase-input::placeholder]:text-gray-400
                     dark:[&_.MuiOutlinedInput-notchedOutline]:border-gray-500/40
                     dark:hover:[&_.MuiOutlinedInput-notchedOutline]:border-gray-300/60
                     dark:focus-within:[&_.MuiOutlinedInput-notchedOutline]:border-gray-200
                     [&_.MuiInputBase-input]:text-black"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#888' },
                '&.Mui-focused fieldset': { borderColor: '#6b1fad' },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 }, flexShrink: 0, width: '15%' }}>
          <Tooltip title="Chọn màu ghi chú">
            <IconButton onClick={handleOpenColorMenu} sx={{ mt: 0.5 }}>
              <IconPalette
                size={22}
                style={{
                  color: selectedColor,
                  strokeWidth: 2.2,
                }}
              />
            </IconButton>
          </Tooltip>

          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseColorMenu} sx={{ mt: 1 }}>
            {COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  handleCloseColorMenu();
                }}
                sx={{
                  width: 120,
                  height: 28,
                  backgroundColor: color,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  mx: 1.5,
                  mb: 1,
                  border: selectedColor === color ? '2px solid black' : '2px solid transparent',
                }}
              />
            ))}
          </Menu>

          <Menu anchorEl={colorMenuAnchor} open={Boolean(colorMenuAnchor)} onClose={() => setColorMenuAnchor(null)} sx={{ mt: 1 }}>
            {COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => handleChangeColor(color, notes.find((n) => n.note_id === colorMenuNoteId)!)}
                sx={{
                  width: 120,
                  height: 28,
                  backgroundColor: color,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  mx: 1.5,
                  mb: 1,
                  border: '2px solid #00000055',
                }}
              />
            ))}
          </Menu>

          <Tooltip title="Thêm ghi chú">
            <IconButton onClick={handleAddNote} sx={{ mt: 0.5 }}>
              <IconSend size={22} className="text-black dark:text-gray-200" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Danh sách ghi chú */}
      <List sx={{ mt: 2 }}>
        {notes.length === 0 && (
          <Typography variant="body2" className="dark:text-gray-400 mt-2 text-center text-[rgba(102, 11, 182, 0.6)]">
            Chưa có ghi chú nào.
          </Typography>
        )}

        {notes.map((note, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0, sm: 1 },
              mb: 1,
            }}
          >
            <Box
              onClick={() => handleJumpTo(note.time)}
              sx={{
                width: 60,
                minWidth: 60,
                height: '100%',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 1,
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontWeight: 700, color: note.background_color, mr: { xs: 2, sm: 0 } }}>{formatTime(note.time)}</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                backgroundColor: note.background_color,
                borderRadius: '4px',
                padding: '8px 12px',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }}
            >
              {editingIndex === index ? (
                <TextField
                  fullWidth
                  multiline
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none', // tắt border
                      },
                      '&:hover fieldset': {
                        border: 'none', // tắt border khi hover
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none', // tắt border khi focus
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                  }}
                />
              ) : (
                <Box onClick={() => handleJumpTo(note.time)} sx={{ cursor: 'pointer' }}>
                  <Typography className="text-white dark:text-gray-200">{expanded === note.note_id ? note.text : note.text.length > 450 ? note.text.slice(0, 450) + '...' : note.text}</Typography>

                  {note.text.length > 450 && (
                    <Typography sx={{ color: '#801a99ff', width: 'fit-content', cursor: 'pointer', textDecoration: 'underline', mt: 0.5 }} onClick={() => toggle(note.note_id)}>
                      {expanded === note.note_id ? 'Thu gọn' : 'Xem thêm'}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 1 }, flexShrink: 0, width: '15%' }}>
              {editingIndex === index ? (
                <>
                  <Tooltip title="Lưu">
                    <IconButton onClick={() => handleSaveEdit(index)} size="small">
                      <IconCheck className="text-green-600" size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Hủy">
                    <IconButton onClick={handleCancelEdit} size="small">
                      <IconX className="text-red-600" size={18} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  {/* <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEditNote(index)} size="small">
                      <IconEdit size={18} style={{ color: note.background_color ?? '#444242ff', strokeWidth: 2 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Đổi màu">
                    <IconButton size="small" onClick={(e) => handleOpenColorPicker(e, note.note_id)}>
                      <IconPalette size={18} style={{ color: note.background_color ?? '#444242ff', strokeWidth: 2 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <IconButton onClick={() => handleDeleteNote(note.note_id)} size="small">
                      <IconTrash size={18} style={{ color: note.background_color ?? '#444242ff', strokeWidth: 2 }} />
                    </IconButton>
                  </Tooltip> */}
                  <Tooltip title="Tùy chọn">
                    <IconButton size="small" onClick={(e) => handleOpenActionMenu(e, index)}>
                      <IconDotsVertical size={18} />
                    </IconButton>
                  </Tooltip>
                  <Menu anchorEl={actionAnchorEl} open={activeNoteIndex === index} onClose={handleCloseActionMenu} sx={{ mt: 1, ml: 1 }}>
                    <MenuItem
                      onClick={() => {
                        handleEditNote(index);
                        handleCloseActionMenu();
                      }}
                      style={{ color: note.background_color ?? '#444242ff' }}
                    >
                      <IconEdit size={16} style={{ marginRight: 8 }} />
                      Chỉnh sửa
                    </MenuItem>

                    <MenuItem
                      onClick={(e) => {
                        handleOpenColorPicker(e as any, note.note_id);
                        handleCloseActionMenu();
                      }}
                      style={{ color: note.background_color ?? '#444242ff' }}
                    >
                      <IconPalette size={16} style={{ marginRight: 8 }} />
                      Đổi màu
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleDeleteNote(note.note_id);
                        handleCloseActionMenu();
                      }}
                      sx={{ color: note.background_color ?? 'error.main' }}
                    >
                      <IconTrash size={16} style={{ marginRight: 8 }} />
                      Xóa
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
