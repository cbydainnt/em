import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, Box, Grid, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Chip, Switch, FormControlLabel, Divider, Paper, Snackbar, Alert, Checkbox, LinearProgress, RadioGroup, Radio, List, ListItem, DialogTitle, ListItemButton, ListItemText } from '@mui/material';
import { IconX, IconDeviceFloppy, IconPlus, IconTrash, IconBook, IconFileText, IconCurrencyDong, IconChevronDown, IconVideo, IconFileDescription, IconClock, IconGripVertical, IconListCheck, IconCalendar, IconTargetArrow, IconSearch } from '@tabler/icons-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FileUpload from './components/file-upload';
import MediaUpload from './components/media-upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';

interface Document {
  document_id?: string;
  document_name: string;
  document_url: string | File;
  extension?: string;
  size?: number;
  isDownloadable?: boolean;
  _deleted?: boolean;
}

interface Lesson {
  id: string;
  lesson_title: string;
  lesson_video?: string | File;
  lesson_order?: number;
  minutes: number;
  video_duration?: number;
  lesson_type: number;
  content_types: string[];
  access_type: number;
  documents: Document[];
  quizzes: LessonQuiz[];
  _deleted_video?: boolean;
}

interface LessonQuiz {
  quiz_id: string;
  quiz_title?: string;
  duration_minutes?: number;
  total_questions?: number;
  difficulty_level?: number;
  passing_score?: number;
}

interface Section {
  id: string;
  section_title: string;
  lessons: Lesson[];
}

interface CourseFormDialogProps {
  saved: () => void;
}

const CourseFormDialog = forwardRef((props: CourseFormDialogProps, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState<string | undefined>();

  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [courseTarget, setTarget] = useState('');
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [state, setState] = useState('Normal');
  const [thumbnail, setThumbnail] = useState<string | File>('');
  const [delFlg, setDelFlg] = useState(false);

  const [accessType, setAccessType] = useState<number>(1);
  const [accessDurationMonths, setAccessDurationMonths] = useState<number>(6);

  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const [errors, setErrors] = useState<any>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [expireAt, setExpireAt] = useState<string>('');

  const [availableQuizzes, setAvailableQuizzes] = useState<any[]>([]);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [selectedLessonForQuiz, setSelectedLessonForQuiz] = useState<{
    sectionId: string;
    lessonId: string;
    lessonType: number;
  } | null>(null);
  const [quizSearchTerm, setQuizSearchTerm] = useState('');
  const [selectedQuizIds, setSelectedQuizIds] = useState<string[]>([]);
  const [quizTypeFilter, setQuizTypeFilter] = useState<number | 'all'>('all');

  useImperativeHandle(ref, () => ({
    show: async (data: any) => {
      if (data?.course_id) {
        setCourseId(data.course_id);
        setCourseName(data.course_name || '');
        setDescription(data.course_description || '');
        setTarget(data.target || '');
        setPrice(data.course_price || 0);
        setOriginalPrice(data.course_original_price || 0);
        setState(data.state || 'Normal');
        setThumbnail(data.thumbnail || '');
        setDelFlg(data.del_flg || false);
        setAccessType(data.access_type || 1);
        setAccessDurationMonths(data.access_duration_months || 6);
        setExpireAt(data.access_expire_at ? new Date(data.access_expire_at).toISOString().split('T')[0] : '');

        try {
          const response = await axios.get(`/api/admin/courses/${data.course_id}/full-details`);
          const courseData = response.data;

          const mappedSections = courseData.sections.map((section: any) => ({
            id: section.section_id,
            section_title: section.section_title,
            lessons: section.lessons.map((lesson: any) => {
              const content_types: string[] = [];
              if (lesson.lesson_video) content_types.push('video');
              if (lesson.documents && lesson.documents.length > 0) content_types.push('document');
              if (lesson.lesson_quizzes && lesson.lesson_quizzes.length > 0) content_types.push('quiz');

              return {
                id: lesson.lesson_id,
                lesson_title: lesson.lesson_title,
                lesson_order: lesson.lesson_order,
                lesson_video: lesson.lesson_video || '',
                lesson_type: lesson.lesson_type ?? 0,
                minutes: lesson.minutes || 0,
                video_duration: lesson.video_duration || 0,
                content_types: content_types.length > 0 ? content_types : ['video'],
                access_type: lesson.access_type || 3,
                documents: (lesson.documents || []).map((doc: any) => ({
                  document_id: doc.document_id,
                  document_name: doc.document_name,
                  document_url: doc.document_url,
                  extension: doc.extension,
                  size: doc.size || 0,
                  isDownloadable: doc.isDownloadable ?? true,
                  _deleted: false,
                })),
                quizzes: (lesson.lesson_quizzes || []).map((lq: any) => ({
                  quiz_id: lq.quiz_id,
                  quiz_title: lq.quiz?.title,
                  duration_minutes: lq.quiz?.duration_minutes,
                  total_questions: lq.quiz?.total_questions,
                  difficulty_level: lq.quiz?.difficulty_level,
                  passing_score: lq.quiz?.passing_score,
                })),
                _deleted_video: false,
              };
            }),
          }));

          setSections(mappedSections);
        } catch (error) {
          console.error('Error loading course details:', error);
          setSnackbar({ open: true, message: 'Không thể tải thông tin khóa học', severity: 'error' });
        }
      } else {
        resetForm();
      }
      setOpen(true);
    },
  }));

  useEffect(() => {
    if (open) {
      loadAvailableQuizzes();
    }
  }, [open]);

  const resetForm = () => {
    setCourseId(undefined);
    setCourseName('');
    setDescription('');
    setTarget('');
    setPrice(0);
    setOriginalPrice(0);
    setState('Normal');
    setThumbnail('');
    setDelFlg(false);
    setAccessType(1);
    setAccessDurationMonths(6);
    setSections([]);
    setErrors({});
    setExpandedSection(null);
    setExpandedLesson(null);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const loadAvailableQuizzes = async () => {
    try {
      const response = await axios.get('/api/admin/quizzes/active');
      setAvailableQuizzes(response.data || []);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setSnackbar({
        open: true,
        message: 'Không thể tải danh sách quiz',
        severity: 'error',
      });
    }
  };

  const getVideoDuration = (lesson: Lesson): number => {
    if (lesson.lesson_video && lesson.content_types.includes('video')) {
      return lesson.video_duration || 0;
    }
    return 0;
  };

  const getQuizDuration = (lesson: Lesson): number => {
    let quizMinutes = 0;
    lesson.quizzes?.forEach((quiz) => {
      const quizData = availableQuizzes.find((q) => q.quiz_id === quiz.quiz_id);
      if (quizData?.duration_minutes) {
        quizMinutes += quizData.duration_minutes;
      }
    });
    return quizMinutes;
  };

  const calculateLessonDuration = (lesson: Lesson): number => {
    const videoDuration = getVideoDuration(lesson);
    // const quizDuration = getQuizDuration(lesson);
    return videoDuration ;
  };

  const handleOpenQuizDialog = (sectionId: string, lessonId: string, lessonType: number) => {
    const currentLesson = sections.find((s) => s.id === sectionId)?.lessons.find((l) => l.id === lessonId);
    const existingQuizIds = currentLesson?.quizzes?.map((q) => q.quiz_id) || [];

    setSelectedLessonForQuiz({ sectionId, lessonId, lessonType });
    setQuizDialogOpen(true);
    setQuizSearchTerm('');
    setSelectedQuizIds(existingQuizIds);
  };

  const handleUpdateQuizzesForLesson = () => {
    if (!selectedLessonForQuiz || selectedQuizIds.length === 0) {
      setSnackbar({
        open: true,
        message: selectedLessonForQuiz?.lessonType === 2 ? 'Bài thi online phải có ít nhất 1 quiz' : 'Chưa chọn quiz nào',
        severity: 'warning',
      });
      return;
    }

    const { sectionId, lessonId, lessonType } = selectedLessonForQuiz;
    const isSingleSelectMode = lessonType === 2;

    // Kiểm tra với bài thi online chỉ được chọn 1 quiz
    if (isSingleSelectMode && selectedQuizIds.length > 1) {
      setSnackbar({
        open: true,
        message: 'Bài thi online chỉ được chọn 1 quiz',
        severity: 'warning',
      });
      return;
    }

    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => {
                if (l.id === lessonId) {
                  const currentQuizIds = l.quizzes.map((q) => q.quiz_id);

                  // Kiểm tra xem có thay đổi gì không
                  const hasChanged = selectedQuizIds.length !== currentQuizIds.length || !selectedQuizIds.every((id) => currentQuizIds.includes(id));

                  if (!hasChanged) {
                    setSnackbar({
                      open: true,
                      message: 'Không có thay đổi nào',
                      severity: 'info',
                    });
                    return l;
                  }

                  // Tạo danh sách quiz mới từ selectedQuizIds
                  const newQuizzes = selectedQuizIds.map((quizId) => {
                    // Kiểm tra xem quiz đã tồn tại chưa
                    const existingQuiz = l.quizzes.find((q) => q.quiz_id === quizId);
                    if (existingQuiz) {
                      return existingQuiz;
                    }

                    // Nếu chưa tồn tại, tạo quiz mới
                    const quizData = availableQuizzes.find((q) => q.quiz_id === quizId);
                    return {
                      quiz_id: quizId,
                      quiz_title: quizData?.title,
                      duration_minutes: quizData?.duration_minutes || 0,
                      total_questions: quizData?.total_questions || quizData?.question_count,
                      difficulty_level: quizData?.difficulty_level,
                      passing_score: quizData?.passing_score,
                    };
                  });

                  const updatedLesson = {
                    ...l,
                    quizzes: newQuizzes,
                  };

                  // Đảm bảo content_types có 'quiz'
                  if (!updatedLesson.content_types.includes('quiz')) {
                    updatedLesson.content_types = [...updatedLesson.content_types, 'quiz'];
                  }

                  // Cập nhật thời lượng
                  const newDuration = calculateLessonDuration(updatedLesson);
                  updatedLesson.minutes = newDuration;

                  const message = isSingleSelectMode ? 'Đã cập nhật quiz cho bài thi' : `Đã cập nhật ${selectedQuizIds.length} quiz`;

                  setSnackbar({
                    open: true,
                    message: `${message} - Thời lượng: ${newDuration} phút`,
                    severity: 'success',
                  });

                  return updatedLesson;
                }
                return l;
              }),
            }
          : s,
      ),
    );

    setQuizDialogOpen(false);
  };

  const handleRemoveQuizFromLesson = (sectionId: string, lessonId: string, quizIndex: number) => {
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => {
                if (l.id === lessonId) {
                  const updatedLesson = {
                    ...l,
                    quizzes: l.quizzes.filter((_, idx) => idx !== quizIndex),
                  };

                  // Nếu đã xóa hết quiz, tự động xóa 'quiz' khỏi content_types
                  if (updatedLesson.quizzes.length === 0) {
                    updatedLesson.content_types = updatedLesson.content_types.filter((type) => type !== 'quiz');
                  }

                  // 🔥 Tự động cập nhật thời lượng
                  const newDuration = calculateLessonDuration(updatedLesson);
                  updatedLesson.minutes = newDuration;

                  setSnackbar({
                    open: true,
                    message: `Đã xóa quiz - Thời lượng bài học: ${newDuration} phút`,
                    severity: 'info',
                  });

                  return updatedLesson;
                }
                return l;
              }),
            }
          : s,
      ),
    );
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: `temp-section-${Date.now()}`,
      section_title: '',
      lessons: [],
    };
    setSections([...sections, newSection]);
    setExpandedSection(newSection.id);
  };

  const handleRemoveSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId));
  };

  const handleUpdateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map((s) => (s.id === sectionId ? { ...s, section_title: title } : s)));
  };

  const handleAddLesson = (sectionId: string) => {
    const newLesson: Lesson = {
      id: `temp-lesson-${Date.now()}`,
      lesson_title: '',
      lesson_video: '',
      minutes: 0,
      lesson_type: 0,
      video_duration: 0,
      content_types: [],
      access_type: 3,
      documents: [],
      quizzes: [],
      _deleted_video: false,
    };

    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [...s.lessons, newLesson],
            }
          : s,
      ),
    );
    setExpandedLesson(newLesson.id);
  };

  const handleLessonExpand = (lessonId: string) => {
    if (expandedLesson === lessonId) {
      setExpandedLesson(null);
    } else {
      setExpandedLesson(lessonId);
    }
  };

  const handleRemoveLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.filter((l) => l.id !== lessonId),
            }
          : s,
      ),
    );
  };

  const handleUpdateLesson = (sectionId: string, lessonId: string, field: string, value: any) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => (l.id === lessonId ? { ...l, [field]: value } : l)),
            }
          : s,
      ),
    );
  };

  const handleAddMultipleDocuments = (sectionId: string, lessonId: string, files?: File | File[]) => {
    if (!files) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx,.txt,.ppt,.pptx,.xlsx,.xls,.zip,.rar';
      fileInput.multiple = true;
      fileInput.onchange = (e: any) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
          processMultipleFiles(sectionId, lessonId, selectedFiles);
        }
      };
      fileInput.click();
      return;
    }

    if (Array.isArray(files)) {
      processMultipleFiles(sectionId, lessonId, files);
    } else if (files instanceof File) {
      processMultipleFiles(sectionId, lessonId, [files]);
    }
  };

  const processMultipleFiles = (sectionId: string, lessonId: string, fileList: FileList | File[]) => {
    const files = Array.isArray(fileList) ? fileList : Array.from(fileList);

    const newDocs: Document[] = files.map((file) => {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
      const extension = file.name.split('.').pop()?.toLowerCase() || '';

      return {
        document_name: fileNameWithoutExtension,
        document_url: file,
        extension: extension,
        size: file.size,
        isDownloadable: true,
        _deleted: false,
      };
    });

    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) =>
                l.id === lessonId
                  ? {
                      ...l,
                      documents: [...newDocs, ...l.documents],
                    }
                  : l,
              ),
            }
          : s,
      ),
    );
  };

  const handleDeleteDocument = (sectionId: string, lessonId: string, docIndex: number) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => {
                if (l.id === lessonId) {
                  const updatedDocuments = l.documents
                    .map((doc, idx) => {
                      if (idx === docIndex) {
                        // 🔧 Nếu có document_id -> đánh dấu _deleted, nếu không -> xóa khỏi array
                        if (doc.document_id && !doc.document_id.startsWith('temp-')) {
                          return { ...doc, _deleted: true };
                        }
                        return null; // Sẽ bị filter sau
                      }
                      return doc;
                    })
                    .filter(Boolean) as Document[]; // Loại bỏ null

                  return {
                    ...l,
                    documents: updatedDocuments,
                  };
                }
                return l;
              }),
            }
          : s,
      ),
    );
  };

  const handleContentTypesChange = (sectionId: string, lessonId: string, newTypes: string[]) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => {
                if (l.id === lessonId) {
                  const updatedLesson = { ...l, content_types: newTypes };
                  if (!newTypes.includes('video')) {
                    updatedLesson.lesson_video = '';
                    updatedLesson._deleted_video = true;
                  }
                  if (!newTypes.includes('document')) {
                    updatedLesson.documents = [];
                  }
                  if (!newTypes.includes('quiz')) {
                    updatedLesson.quizzes = [];
                  }
                  return updatedLesson;
                }
                return l;
              }),
            }
          : s,
      ),
    );
  };

  const handleDeleteLessonVideo = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => {
                if (l.id === lessonId) {
                  const wasExistingVideo = typeof l.lesson_video === 'string' && l.lesson_video.length > 0;
                  const quizDuration = getQuizDuration(l);
                  return {
                    ...l,
                    lesson_video: '',
                    video_duration: 0,
                    minutes: quizDuration,
                    _deleted_video: wasExistingVideo,
                    content_types: l.content_types.filter((type) => type !== 'video'),
                  };
                }
                return l;
              }),
            }
          : s,
      ),
    );
  };

  const handleRemoveAllQuizzes = (sectionId: string, lessonId: string) => {
    setSections((prevSections) =>
      prevSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) => {
                if (l.id === lessonId) {
                  const updatedLesson = {
                    ...l,
                    quizzes: [],
                    content_types: l.content_types.filter((type) => type !== 'quiz'),
                  };

                  // Cập nhật thời lượng
                  const newDuration = calculateLessonDuration(updatedLesson);
                  updatedLesson.minutes = newDuration;

                  setSnackbar({
                    open: true,
                    message: `Đã xóa toàn bộ quiz!`,
                    severity: 'info',
                  });

                  return updatedLesson;
                }
                return l;
              }),
            }
          : s,
      ),
    );
  };

  const handleSectionDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const handleLessonDragEnd = (result: any) => {
    if (!result.destination) return;

    const sectionId = result.source.droppableId;
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const items = Array.from(section.lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(sections.map((s) => (s.id === sectionId ? { ...s, lessons: items } : s)));
  };

  // const hasSpecialChars = (text: string) => {
  //   const regex = /^[\p{L}\p{N}\s.,!?()'"\-:;/…""''–—]+$/u;
  //   return !regex.test(text.trim());
  // };

  const validateForm = () => {
    const newErrors: any = {};

    if (!courseName.trim()) {
      newErrors.courseName = 'Vui lòng nhập tên khóa học';
    }
    // else if (hasSpecialChars(courseName)) {
    //   newErrors.courseName = 'Tên khóa học chứa ký tự không hợp lệ';
    // }

    if (!description.trim()) {
      newErrors.description = 'Vui lòng nhập mô tả';
    }
    // else if (hasSpecialChars(description)) {
    //   newErrors.description = 'Mô tả chứa ký tự không hợp lệ';
    // }

    if (!courseTarget.trim()) {
      newErrors.courseTarget = 'Vui lòng nhập mục tiêu khóa học';
    }

    if (price <= 0) {
      newErrors.price = 'Giá phải lớn hơn 0';
    }

    if (originalPrice <= 0) {
      newErrors.originalPrice = 'Giá gốc phải lớn hơn 0';
    }

    if (accessType === 1 && (!accessDurationMonths || accessDurationMonths <= 0)) {
      newErrors.accessDurationMonths = 'Thời gian truy cập phải lớn hơn 0';
    }

    sections.forEach((section, sectionIndex) => {
      const sectionKey = `section_${sectionIndex}`;

      if (!section.section_title.trim()) {
        newErrors[sectionKey] = `Chương ${sectionIndex + 1}: Chưa có tiêu đề`;
      }
      //  else if (hasSpecialChars(section.section_title)) {
      //   newErrors[sectionKey] = `Chương ${sectionIndex + 1}: Tiêu đề chứa ký tự không hợp lệ`;
      // }

      section.lessons.forEach((lesson, lessonIndex) => {
        const lessonKey = `lesson_${sectionIndex}_${lessonIndex}`;

        if (!lesson.lesson_title.trim()) {
          newErrors[lessonKey] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Chưa có tiêu đề`;
        }

        // Validation theo lesson_type
        if (lesson.lesson_type === 2) {
          // Bài thi online - Bắt buộc có đúng 1 quiz
          if (!lesson.quizzes || lesson.quizzes.length === 0) {
            newErrors[`${lessonKey}_quiz`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Bài thi online phải có 1 quiz`;
          } else if (lesson.quizzes.length > 1) {
            newErrors[`${lessonKey}_quiz`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Bài thi online chỉ được có 1 quiz`;
          }

          if (lesson.minutes <= 0) {
            newErrors[`${lessonKey}_minutes`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Thời lượng phải lớn hơn 0`;
          }
        } else {
          // Bài giảng - Cần ít nhất 1 loại nội dung
          if (lesson.content_types.length === 0) {
            newErrors[`${lessonKey}_content_types`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Phải chọn ít nhất 1 loại nội dung`;
          }

          if (lesson.content_types.includes('video') && !lesson.lesson_video) {
            newErrors[`${lessonKey}_video`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Cần upload video`;
          }

          if (lesson.content_types.includes('document') && lesson.documents.filter((d) => !d._deleted).length === 0) {
            newErrors[`${lessonKey}_document`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Cần upload ít nhất 1 tài liệu`;
          }

          if (lesson.content_types.includes('quiz') && lesson.quizzes.length === 0) {
            newErrors[`${lessonKey}_quiz`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Cần thêm ít nhất 1 quiz`;
          }

          if ((lesson.content_types.includes('video') || lesson.content_types.includes('quiz')) && lesson.minutes <= 0) {
            newErrors[`${lessonKey}_minutes`] = `Chương ${sectionIndex + 1}, Bài ${lessonIndex + 1}: Thời lượng phải lớn hơn 0`;
          }
        }
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0] as string;
      setSnackbar({ open: true, message: firstError, severity: 'error' });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    let fileCount = 0;
    if (thumbnail instanceof File) fileCount++;
    sections.forEach((section) => {
      section.lessons.forEach((lesson) => {
        if (lesson.lesson_video instanceof File) fileCount++;
        lesson.documents.forEach((doc) => {
          if (doc.document_url instanceof File && !doc._deleted) fileCount++;
        });
      });
    });

    setTotalFiles(fileCount);
    setUploadStatus(`Đang chuẩn bị upload ${fileCount} files...`);

    try {
      const formData = new FormData();

      formData.append('course_name', courseName.trim());
      formData.append('course_description', description.trim());
      formData.append('course_target', courseTarget.trim());
      formData.append('course_price', String(price));
      formData.append('course_original_price', String(originalPrice));
      formData.append('state', state);
      formData.append('del_flg', String(delFlg));
      formData.append('access_type', String(accessType));
      formData.append('access_duration_months', accessType === 1 ? String(accessDurationMonths) : '');
      formData.append('access_expire_at', accessType === 3 && expireAt ? new Date(expireAt).toISOString() : '');

      if (thumbnail) {
        if (thumbnail instanceof File) {
          formData.append('thumbnail', thumbnail, thumbnail.name); // Append as file
        } else {
          formData.append('thumbnail', thumbnail); // Existing URL
        }
      }

      const processedSections = sections.map((section, sectionIndex) => {
        const processedLessons = section.lessons.map((lesson, lessonIndex) => {
          const lessonData: any = {
            lesson_id: lesson.id.startsWith('temp-') ? undefined : lesson.id,
            lesson_title: lesson.lesson_title.trim(),
            lesson_type: lesson.lesson_type,
            minutes: Number(lesson.minutes) || 0,
            video_duration: Number(lesson.video_duration) || 0,
            lesson_order: lessonIndex,
            access_type: lesson.access_type,
            documents: [],
          };

          if (lesson.content_types.includes('video')) {
            if (lesson.lesson_video instanceof File) {
              const videoKey = `lesson_video_${sectionIndex}_${lessonIndex}`;
              formData.append(videoKey, lesson.lesson_video);
              lessonData.lesson_video_key = videoKey;
              lessonData._replaced_video = true;
            } else if (lesson.lesson_video) {
              lessonData.lesson_video = lesson.lesson_video;
            }

            if (!lesson.lesson_video && lesson._deleted_video) {
              lessonData._deleted_video = true;
              lessonData.lesson_video = '';
            }
          } else {
            lessonData.lesson_video = '';
            if (lesson.id && !lesson.id.startsWith('temp-')) {
              lessonData._deleted_video = true;
            }
          }
          // Xử lý quizzes
          lessonData.quizzes = (lesson.quizzes || []).map((quiz) => ({
            quiz_id: quiz.quiz_id,
            duration_minutes: quiz.duration_minutes || 0,
          }));

          // Xử lý documents
          if (lesson.content_types.includes('document')) {
            lesson.documents.forEach((doc, docIndex) => {
              if (doc._deleted) {
                if (doc.document_id) {
                  lessonData.documents.push({
                    document_id: doc.document_id,
                    _deleted: true,
                  });
                }
              } else if (doc.document_url instanceof File) {
                const docKey = `lesson_doc_${sectionIndex}_${lessonIndex}_${docIndex}`;
                formData.append(docKey, doc.document_url);
                lessonData.documents.push({
                  document_id: doc.document_id,
                  document_name: doc.document_name,
                  extension: doc.extension,
                  size: doc.size,
                  document_url_key: docKey,
                  isDownloadable: doc.isDownloadable ?? true,
                });
              } else if (doc.document_url) {
                lessonData.documents.push({
                  document_id: doc.document_id,
                  document_name: doc.document_name,
                  document_url: doc.document_url,
                  extension: doc.extension,
                  size: doc.size || 0,
                  isDownloadable: doc.isDownloadable ?? true,
                });
              }
            });
          }

          return lessonData;
        });

        return {
          section_id: section.id.startsWith('temp-') ? undefined : section.id,
          section_title: section.section_title.trim(),
          section_order: sectionIndex,
          lessons: processedLessons,
        };
      });

      formData.append('sections', JSON.stringify(processedSections));

      setUploadStatus(`Đang upload files...`);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + 2;
        });
      }, 300);

      const startTime = Date.now();

      if (courseId) {
        await axios.put(`/api/admin/courses/${courseId}/full`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`/api/admin/courses`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      clearInterval(progressInterval);

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      setUploadProgress(100);
      setUploadStatus(`Upload hoàn tất trong ${duration}s!`);

      setSnackbar({
        open: true,
        message: `${courseId ? 'Cập nhật' : 'Tạo'} khóa học thành công!`,
        severity: 'success',
      });

      setTimeout(() => {
        props.saved();
        handleClose();
      }, 500);
    } catch (error: any) {
      console.error('Error saving course:', error);
      setUploadProgress(0);
      setUploadStatus('');
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Đã xảy ra lỗi khi lưu khóa học',
        severity: 'error',
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '16px', maxHeight: '90vh' },
          className: 'dark:bg-gray-800',
        }}
      >
        {loading && uploadProgress > 0 && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              color: 'white',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="600">
                {uploadStatus}
              </Typography>
              <Typography variant="body2" fontWeight="600">
                {Math.round(uploadProgress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white',
                  borderRadius: 4,
                },
              }}
            />
            {totalFiles > 0 && (
              <Typography variant="caption" sx={{ mt: 0.5, display: 'block', opacity: 0.9 }}>
                Đang xử lý {totalFiles} files
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%)',
            borderBottom: '1px solid #e9d5ff',
          }}
          className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
        >
          <Typography variant="h5" className="text-purple-600 dark:text-purple-400 font-semibold">
            {courseId ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: 'rgb(var(--text-secondary))',
              position: 'absolute',
              right: 12,
              top: 12,
            }}
            size="small"
          >
            <IconX size={20} />
          </IconButton>
        </Box>

        <DialogContent
          dividers
          className="dark:bg-gray-800"
          sx={{
            p: 3,
            bgcolor: 'background.paper',
            '.dark &': {
              bgcolor: '#1f2937',
            },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" className="dark:text-gray-200 mb-2">
                Thông tin cơ bản
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên khóa học"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                error={!!errors.courseName}
                helperText={errors.courseName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconBook size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#fff',
                    '.dark &': {
                      backgroundColor: '#1f2937',
                      color: '#f3f4f6',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: 'rgb(var(--text-secondary))',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-default))',
                  },

                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },

                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <IconFileText size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#fff',
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
                    borderColor: 'rgb(var(--border-default))',
                  },

                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },

                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                }}
              />
            </Grid>

            {/* Target */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mục tiêu khóa học"
                value={courseTarget}
                onChange={(e) => setTarget(e.target.value)}
                error={!!errors.target}
                helperText={errors.target}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <IconTargetArrow size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#fff',
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
                    borderColor: 'rgb(var(--border-default))',
                  },

                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },

                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Giá (VNĐ)"
                value={price === 0 ? '' : price.toLocaleString('vi-VN')}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 1 && value.startsWith('0')) {
                    value = value.replace(/^0+/, '');
                  }
                  const numValue = value === '' ? 0 : parseInt(value, 10) || 0;
                  setPrice(numValue);
                }}
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconCurrencyDong size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#fff',
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
                    borderColor: 'rgb(var(--border-default))',
                  },

                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },

                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                }}
                placeholder="Nhập giá..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Giá gốc (VNĐ)"
                value={originalPrice === 0 ? '' : originalPrice.toLocaleString('vi-VN')}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length > 1 && value.startsWith('0')) {
                    value = value.replace(/^0+/, '');
                  }
                  const numValue = value === '' ? 0 : parseInt(value, 10) || 0;
                  setOriginalPrice(numValue);
                }}
                error={!!errors.originalPrice}
                helperText={errors.originalPrice}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-default))',
                  },

                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },

                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgb(var(--border-focus))',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconCurrencyDong size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: '#fff',
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
                placeholder="Nhập giá gốc..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="state-label"
                  sx={{
                    color: 'rgb(var(--text-secondary))',

                    '&.Mui-focused': {
                      color: 'rgb(var(--text-secondary))',
                    },

                    '&.MuiFormLabel-filled': {
                      color: 'rgb(var(--text-secondary))',
                    },
                  }}
                >
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="state-label"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="Trạng thái"
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
                    borderRadius: '4px',
                    fontSize: 16,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'divider',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8b5cf6',
                    },
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
                      '.dark &': {
                        color: '#9ca3af',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                      borderWidth: 1,
                      '.dark &': {
                        borderColor: '#b3bcccff',
                      },
                    },
                    '.MuiSelect-select': {
                      backgroundColor: '#fff',
                      color: '#111827',
                      '.dark &': {
                        backgroundColor: '#48525fff',
                        color: '#f3f4f6',
                        borderColor: '#b3bcccff',
                      },
                    },
                  }}
                >
                  <MenuItem
                    value="New"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Mới
                  </MenuItem>
                  <MenuItem
                    value="Highest Rated"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Đánh giá cao nhất
                  </MenuItem>
                  <MenuItem
                    value="Best Seller"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Bán chạy nhất
                  </MenuItem>
                  <MenuItem
                    value="Normal"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Bình thường
                  </MenuItem>
                  <MenuItem
                    value="Sale"
                    sx={{
                      '.dark &': {
                        backgroundColor: '#1f2937',
                        color: '#f3f4f6',
                        '&:hover': {
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        },
                      },
                    }}
                  >
                    Giảm giá
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!delFlg}
                    onChange={(e) => setDelFlg(!e.target.checked)}
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
                label={<span className="dark:text-gray-300">Hiển thị khóa học</span>}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider
                sx={{
                  my: 1,
                  '.dark &': {
                    borderColor: '#374151',
                  },
                }}
              />
              <Typography variant="h6" className="dark:text-gray-200 mb-3">
                Thời hạn truy cập
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  value={accessType}
                  onChange={(e) => setAccessType(Number(e.target.value))}
                  sx={{
                    flexDirection: 'row',
                    gap: 5,
                    '& .MuiRadio-root': {
                      color: '#6b7280',
                      '.dark &': {
                        color: '#9ca3af',
                        '&.Mui-checked': {
                          color: '#8b5cf6',
                        },
                      },
                    },
                  }}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconCalendar size={18} className="text-orange-500 dark:text-orange-400" />
                        <Typography className="dark:text-gray-300">Có thời hạn</Typography>
                        <Chip
                          label="Giới hạn thời gian"
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{
                            '.dark &': {
                              borderColor: 'rgba(251, 191, 36, 0.5)',
                              color: '#fbbf24',
                            },
                          }}
                        />
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconCalendar size={18} className="text-green-500 dark:text-green-400" />
                        <Typography className="dark:text-gray-300">Trọn đời</Typography>
                        <Chip
                          label="Không giới hạn"
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{
                            '.dark &': {
                              borderColor: 'rgba(34, 197, 94, 0.5)',
                              color: '#34d399',
                            },
                          }}
                        />
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconCalendar size={18} className="text-orange-500 dark:text-orange-400" />
                        <Typography className="dark:text-gray-300">Ngày hết hạn cố định</Typography>
                        <Chip
                          label="Giới hạn thời gian"
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{
                            '.dark &': {
                              borderColor: 'rgba(251, 191, 36, 0.5)',
                              color: '#fbbf24',
                            },
                          }}
                        />
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {accessType === 1 && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Thời gian truy cập (tháng)"
                  value={accessDurationMonths}
                  onChange={(e) => setAccessDurationMonths(Number(e.target.value))}
                  error={!!errors.accessDurationMonths}
                  helperText={errors.accessDurationMonths || 'Số tháng học viên có thể truy cập khóa học'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconClock size={20} style={{ color: 'rgb(var(--icon-muted))' }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1 },
                    sx: {
                      color: 'rgb(var(--icon-muted))',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'rgb(var(--text-secondary))',
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
                    color: 'rgb(var(--icon-muted))',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(var(--border-default))',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(var(--border-focus))',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(var(--border-focus))',
                    },
                  }}
                />
              </Grid>
            )}

            {accessType === 3 && (
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  label="Ngày kết thúc khoá học"
                  value={expireAt ? expireAt.split('T')[0] : ''}
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: 'rgb(var(--text-secondary))',
                    },
                  }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(var(--border-default))',
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(var(--border-focus))',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(var(--border-focus))',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'rgb(var(--input-text))',
                    },
                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                      filter: 'var(--calendar-icon-filter)',
                    },
                  }}
                  onChange={(e) => setExpireAt(e.target.value)}
                />
              </Grid>
            )}

            {/* THUMBNAIL */}
            <Grid item xs={12}>
              <Divider
                sx={{
                  my: 1,
                  '.dark &': {
                    borderColor: '#374151',
                  },
                }}
              />
              <Typography variant="subtitle1" className="dark:text-gray-300 mb-2 font-medium">
                Thumbnail
              </Typography>
              <MediaUpload value={thumbnail} onChange={(data) => setThumbnail(data)} onDelete={() => setThumbnail('')} accept="image/*" type="thumbnail" label="Upload thumbnail khóa học" />
            </Grid>

            {/* CHƯƠNG HỌC */}
            <Grid item xs={12}>
              <Divider
                sx={{
                  my: 2,
                  '.dark &': {
                    borderColor: '#374151',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" className="dark:text-gray-200">
                  Chương học ({sections.length})
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<IconPlus size={18} />}
                  onClick={handleAddSection}
                  size="small"
                  sx={{
                    borderWidth: 2,
                    borderRadius: 2,
                    px: 2,
                    bgcolor: 'background.paper',
                    borderColor: '#d1d5db',
                    color: '#374151',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: '#9ca3af',
                    },
                    '.dark &': {
                      bgcolor: '#1f2937',
                      borderColor: '#4b5563',
                      color: '#d1d5db',
                      '&:hover': {
                        borderColor: '#6b7280',
                      },
                    },
                  }}
                >
                  Thêm chương
                </Button>
              </Box>
            </Grid>

            {/* SECTIONS LIST */}
            <Grid item xs={12}>
              <DragDropContext onDragEnd={handleSectionDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {sections.map((section, sectionIndex) => (
                        <Draggable key={section.id} draggableId={section.id} index={sectionIndex}>
                          {(provided, snapshot) => (
                            <Paper
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              sx={{
                                mb: 2,
                                border: snapshot.isDragging ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
                                borderRadius: 2,
                                '.dark &': {
                                  borderColor: snapshot.isDragging ? '#8b5cf6' : '#374151',
                                  bgcolor: '#1f2937',
                                },
                              }}
                            >
                              <Accordion
                                expanded={expandedSection === section.id}
                                onChange={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                                sx={{
                                  bgcolor: 'transparent',
                                  '.dark &': {
                                    bgcolor: 'transparent',
                                  },
                                }}
                              >
                                <AccordionSummary expandIcon={<IconChevronDown className="dark:text-gray-400" />}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                                    <div {...provided.dragHandleProps}>
                                      <IconGripVertical size={20} className="text-gray-400 cursor-move dark:text-gray-500" />
                                    </div>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      placeholder={`Chương ${sectionIndex + 1}`}
                                      value={section.section_title}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        handleUpdateSectionTitle(section.id, e.target.value);
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      error={!!errors[`section_${sectionIndex}`]}
                                      helperText={errors[`section_${sectionIndex}`]}
                                      InputProps={{
                                        sx: {
                                          border: expandedLesson === section.id ? '2px solid #8b5cf6' : '1px solid #e5e7eb',

                                          backgroundColor: 'transparent',
                                          '.dark &': {
                                            backgroundColor: 'transparent',
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
                                    <Chip
                                      label={`${section.lessons.length} bài`}
                                      size="small"
                                      sx={{
                                        '.dark &': {
                                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                          color: '#d1d5db',
                                        },
                                      }}
                                    />
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveSection(section.id);
                                      }}
                                      sx={{
                                        '.dark &': {
                                          color: '#f87171',
                                        },
                                      }}
                                    >
                                      <IconTrash size={18} />
                                    </IconButton>
                                  </Box>
                                </AccordionSummary>

                                {/* LESSONS INSIDE SECTION */}
                                <AccordionDetails>
                                  <Box sx={{ pl: 2 }}>
                                    <DragDropContext onDragEnd={handleLessonDragEnd}>
                                      <Droppable droppableId={section.id}>
                                        {(provided) => (
                                          <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {section.lessons.map((lesson, lessonIndex) => (
                                              <Draggable key={lesson.id} draggableId={lesson.id} index={lessonIndex}>
                                                {(provided) => (
                                                  <Paper
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    sx={{
                                                      mb: 1.5,
                                                      border: expandedLesson === lesson.id ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
                                                      borderRadius: 2,
                                                      '.dark &': {
                                                        borderColor: expandedLesson === lesson.id ? '#8b5cf6' : '#374151',
                                                        bgcolor: '#111827',
                                                      },
                                                    }}
                                                  >
                                                    {/* ACCORDION CHO BÀI HỌC */}
                                                    <Accordion
                                                      expanded={expandedLesson === lesson.id}
                                                      onChange={() => handleLessonExpand(lesson.id)}
                                                      sx={{
                                                        '&:before': { display: 'none' },
                                                        boxShadow: 'none',
                                                        background: 'transparent',
                                                        '.dark &': {
                                                          bgcolor: 'transparent',
                                                        },
                                                      }}
                                                    >
                                                      <AccordionSummary
                                                        expandIcon={<IconChevronDown className="dark:text-gray-400" />}
                                                        sx={{
                                                          minHeight: '56px',
                                                          '& .MuiAccordionSummary-content': {
                                                            margin: '12px 0',
                                                          },
                                                        }}
                                                      >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                                                          {/* DRAG HANDLE */}
                                                          <div {...provided.dragHandleProps}>
                                                            <IconGripVertical size={20} className="text-gray-400 cursor-move dark:text-gray-500" />
                                                          </div>

                                                          {/* LESSON TITLE */}
                                                          <TextField
                                                            fullWidth
                                                            size="small"
                                                            placeholder={`Bài ${lessonIndex + 1}`}
                                                            value={lesson.lesson_title}
                                                            onChange={(e) => handleUpdateLesson(section.id, lesson.id, 'lesson_title', e.target.value)}
                                                            error={!!errors[`lesson_${sectionIndex}_${lessonIndex}`]}
                                                            helperText={errors[`lesson_${sectionIndex}_${lessonIndex}`]}
                                                            onClick={(e) => e.stopPropagation()}
                                                            sx={{
                                                              border: expandedLesson === lesson.id ? '2px solid #8b5cf6' : '1px solid #e5e7eb',

                                                              flex: 1,
                                                              minWidth: 0,
                                                              '& .MuiInputBase-root': {
                                                                backgroundColor: 'transparent',
                                                                '.dark &': {
                                                                  backgroundColor: 'transparent',
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

                                                          {/* MINUTES */}
                                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '120px', flexShrink: 0 }}>
                                                            <IconClock size={16} className="text-gray-500 dark:text-gray-400" />
                                                            <TextField
                                                              size="small"
                                                              type="number"
                                                              placeholder="Phút"
                                                              value={lesson.minutes}
                                                              onChange={(e) => handleUpdateLesson(section.id, lesson.id, 'minutes', e.target.value)}
                                                              error={!!errors[`lesson_${sectionIndex}_${lessonIndex}_minutes`]}
                                                              sx={{
                                                                border: expandedLesson === lesson.id ? '2px solid #8b5cf6' : '1px solid #e5e7eb',

                                                                width: '80px',
                                                                '& .MuiInputBase-root': {
                                                                  backgroundColor: 'transparent',
                                                                  '.dark &': {
                                                                    backgroundColor: 'transparent',
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
                                                              onClick={(e) => e.stopPropagation()}
                                                            />
                                                          </Box>

                                                          {/* DELETE BUTTON */}
                                                          <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              handleRemoveLesson(section.id, lesson.id);
                                                            }}
                                                            sx={{
                                                              flexShrink: 0,
                                                              '.dark &': {
                                                                color: '#f87171',
                                                              },
                                                            }}
                                                          >
                                                            <IconTrash size={18} />
                                                          </IconButton>
                                                        </Box>
                                                      </AccordionSummary>

                                                      <AccordionDetails sx={{ pt: 2, px: 2, pb: 2 }}>
                                                        {/* PHẦN NỘI DUNG BÀI HỌC */}
                                                        <Grid item xs={12}>
                                                          <Box className="flex flex-row items-center gap-2 mb-2">
                                                            <Typography variant="subtitle2" className="dark:text-gray-200 mb-2 font-bold text-base w-80">
                                                              Nội dung bài học
                                                            </Typography>
                                                            <Grid item xs={12} md={6} alignItems="flex-end">
                                                              <FormControl className="w-40">
                                                                <InputLabel className="dark:text-gray-300">Loại bài học</InputLabel>
                                                                <Select
                                                                  value={lesson.lesson_type}
                                                                  onChange={(e) => {
                                                                    const newType = Number(e.target.value);

                                                                    setSections((prevSections) =>
                                                                      prevSections.map((s) =>
                                                                        s.id === section.id
                                                                          ? {
                                                                              ...s,
                                                                              lessons: s.lessons.map((l) => {
                                                                                if (l.id === lesson.id) {
                                                                                  let updatedLesson = { ...l, lesson_type: newType };

                                                                                  if (newType === 2) {
                                                                                    updatedLesson = {
                                                                                      ...updatedLesson,
                                                                                      lesson_video: '',
                                                                                      video_duration: 0,
                                                                                      documents: [],
                                                                                      _deleted_video: true,
                                                                                      content_types: ['quiz'],
                                                                                      quizzes: updatedLesson.quizzes && updatedLesson.quizzes.length > 1 ? [updatedLesson.quizzes[0]] : updatedLesson.quizzes,
                                                                                    };
                                                                                  } else {
                                                                                    updatedLesson = {
                                                                                      ...updatedLesson,
                                                                                      content_types: [],
                                                                                    };
                                                                                  }

                                                                                  return updatedLesson;
                                                                                }
                                                                                return l;
                                                                              }),
                                                                            }
                                                                          : s,
                                                                      ),
                                                                    );
                                                                  }}
                                                                  size="medium"
                                                                  label="Loại bài học"
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
                                                                    borderRadius: '4px',
                                                                    fontSize: 16,
                                                                    bgcolor: 'background.paper',
                                                                    color: 'text.primary',
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                      borderColor: 'divider',
                                                                    },
                                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                      borderColor: '#8b5cf6',
                                                                    },
                                                                    '& .MuiSelect-icon': {
                                                                      color: '#6b7280',
                                                                      '.dark &': {
                                                                        color: '#9ca3af',
                                                                      },
                                                                    },
                                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                      borderColor: '#d1d5db',
                                                                      borderWidth: 1,
                                                                      '.dark &': {
                                                                        borderColor: '#b3bcccff',
                                                                      },
                                                                    },
                                                                    '.MuiSelect-select': {
                                                                      py: '6px',
                                                                      px: '12px',
                                                                      backgroundColor: '#fff',
                                                                      color: '#111827',
                                                                      '.dark &': {
                                                                        backgroundColor: '#48525fff',
                                                                        color: '#f3f4f6',
                                                                        borderColor: '#b3bcccff',
                                                                      },
                                                                    },
                                                                  }}
                                                                >
                                                                  <MenuItem
                                                                    value={0}
                                                                    sx={{
                                                                      '&:hover': {
                                                                        backgroundColor: '#ede9fe',
                                                                        color: '#030008ff',
                                                                      },
                                                                      '&.Mui-selected': {
                                                                        backgroundColor: '#ddd6fe',
                                                                        color: '#000000ff',
                                                                      },
                                                                      '&.Mui-selected:hover': {
                                                                        backgroundColor: '#ddd6fe',
                                                                        color: '#000000ff',
                                                                      },
                                                                    }}
                                                                  >
                                                                    Bài giảng
                                                                  </MenuItem>
                                                                  <MenuItem
                                                                    value={2}
                                                                    sx={{
                                                                      '&:hover': {
                                                                        backgroundColor: '#ede9fe',
                                                                        color: '#030008ff',
                                                                      },
                                                                      '&.Mui-selected': {
                                                                        backgroundColor: '#ddd6fe',
                                                                        color: '#000000ff',
                                                                      },
                                                                      '&.Mui-selected:hover': {
                                                                        backgroundColor: '#ddd6fe',
                                                                        color: '#000000ff',
                                                                      },
                                                                    }}
                                                                  >
                                                                    Bài thi online
                                                                  </MenuItem>
                                                                </Select>
                                                              </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12} className="flex justify-end w-50">
                                                              <FormControlLabel
                                                                control={
                                                                  <Checkbox
                                                                    checked={lesson.access_type === 1}
                                                                    onChange={(e) => handleUpdateLesson(section.id, lesson.id, 'access_type', e.target.checked ? 1 : 3)}
                                                                    sx={{
                                                                      '& .MuiSvgIcon-root': {
                                                                        '.dark &': {
                                                                          color: '#9ca3af',
                                                                        },
                                                                      },
                                                                      '&.Mui-checked': {
                                                                        '.dark &': {
                                                                          color: '#8b5cf6',
                                                                        },
                                                                      },
                                                                    }}
                                                                  />
                                                                }
                                                                label={
                                                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Typography variant="body2" className="dark:text-gray-300">
                                                                      Miễn phí
                                                                    </Typography>
                                                                    <Chip
                                                                      label={lesson.access_type === 1 ? 'Free' : 'Paid'}
                                                                      size="small"
                                                                      color={lesson.access_type === 1 ? 'success' : 'primary'}
                                                                      sx={{
                                                                        '.dark &': {
                                                                          backgroundColor: lesson.access_type === 1 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                                                          color: lesson.access_type === 1 ? '#34d399' : '#60a5fa',
                                                                        },
                                                                      }}
                                                                    />
                                                                  </Box>
                                                                }
                                                              />
                                                            </Grid>
                                                          </Box>

                                                          {lesson.lesson_type === 0 && (
                                                            <Box sx={{ mb: 2 }}>
                                                              {!lesson.content_types.includes('video') ? (
                                                                <Button
                                                                  fullWidth
                                                                  variant="outlined"
                                                                  startIcon={<IconVideo size={20} />}
                                                                  onClick={() => {
                                                                    const newTypes = [...lesson.content_types, 'video'];
                                                                    handleContentTypesChange(section.id, lesson.id, newTypes);
                                                                  }}
                                                                  sx={{
                                                                    justifyContent: 'flex-start',
                                                                    py: 1.5,
                                                                    borderWidth: 2,
                                                                    textTransform: 'none',
                                                                    fontSize: '0.95rem',
                                                                    fontWeight: 600,
                                                                    opacity: 0.9,
                                                                    borderColor: '#d1d5db',
                                                                    color: '#374151',
                                                                    '&:hover': {
                                                                      borderWidth: 2,
                                                                      borderColor: '#8b5cf6',
                                                                      bgcolor: 'rgba(139, 92, 246, 0.05)',
                                                                    },
                                                                    '.dark &': {
                                                                      borderColor: '#4b5563',
                                                                      color: '#d1d5db',
                                                                      '&:hover': {
                                                                        borderColor: '#8b5cf6',
                                                                        bgcolor: 'rgba(139, 92, 246, 0.1)',
                                                                      },
                                                                    },
                                                                  }}
                                                                >
                                                                  Thêm Video
                                                                </Button>
                                                              ) : (
                                                                <Box
                                                                  sx={{
                                                                    p: 2,
                                                                    border: '2px solid',
                                                                    borderColor: 'primary.main',
                                                                    borderRadius: 2,
                                                                    bgcolor: 'rgba(139, 92, 246, 0.05)',
                                                                    '.dark &': {
                                                                      bgcolor: 'rgba(139, 92, 246, 0.1)',
                                                                      borderColor: '#7c3aed',
                                                                    },
                                                                  }}
                                                                >
                                                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                                    <Typography variant="subtitle2" className="dark:text-gray-300 flex items-center gap-1" sx={{ fontWeight: 600 }}>
                                                                      <IconVideo size={18} className="text-red-500 dark:text-red-400" />
                                                                      Video
                                                                    </Typography>
                                                                    <IconButton
                                                                      size="small"
                                                                      color="error"
                                                                      onClick={() => {
                                                                        if (!lesson.lesson_video) {
                                                                          handleContentTypesChange(
                                                                            section.id,
                                                                            lesson.id,
                                                                            lesson.content_types.filter((t) => t !== 'video'),
                                                                          );
                                                                        } else {
                                                                          setConfirmDialog({
                                                                            open: true,
                                                                            title: 'Xác nhận xóa video',
                                                                            message: 'Bạn có chắc chắn muốn xóa video này không?',
                                                                            onConfirm: () => {
                                                                              handleDeleteLessonVideo(section.id, lesson.id);
                                                                              setSnackbar({
                                                                                open: true,
                                                                                message: 'Đã xóa video khỏi giao diện',
                                                                                severity: 'info',
                                                                              });
                                                                              setConfirmDialog({ ...confirmDialog, open: false });
                                                                            },
                                                                          });
                                                                        }
                                                                      }}
                                                                      sx={{
                                                                        '&:hover': {
                                                                          bgcolor: 'error.light',
                                                                          color: 'white',
                                                                        },
                                                                        '.dark &': {
                                                                          color: '#f87171',
                                                                        },
                                                                      }}
                                                                    >
                                                                      <IconTrash size={16} />
                                                                    </IconButton>
                                                                  </Box>

                                                                  {/* MediaUpload component should handle its own dark mode */}
                                                                  <MediaUpload
                                                                    value={lesson.lesson_video || ''}
                                                                    onChange={(file) => {
                                                                      setSections((prevSections) =>
                                                                        prevSections.map((s) =>
                                                                          s.id === section.id
                                                                            ? {
                                                                                ...s,
                                                                                lessons: s.lessons.map((l) =>
                                                                                  l.id === lesson.id
                                                                                    ? {
                                                                                        ...l,
                                                                                        lesson_video: file,
                                                                                        _deleted_video: false,
                                                                                      }
                                                                                    : l,
                                                                                ),
                                                                              }
                                                                            : s,
                                                                        ),
                                                                      );
                                                                    }}
                                                                    onDurationDetected={(duration) => {
                                                                      setSections((prevSections) =>
                                                                        prevSections.map((s) =>
                                                                          s.id === section.id
                                                                            ? {
                                                                                ...s,
                                                                                lessons: s.lessons.map((l) => {
                                                                                  if (l.id === lesson.id) {
                                                                                    const quizDuration = getQuizDuration(l);
                                                                                    return {
                                                                                      ...l,
                                                                                      video_duration: duration,
                                                                                      minutes: duration + quizDuration,
                                                                                    };
                                                                                  }
                                                                                  return l;
                                                                                }),
                                                                              }
                                                                            : s,
                                                                        ),
                                                                      );
                                                                    }}
                                                                    onDelete={() => handleDeleteLessonVideo(section.id, lesson.id)}
                                                                    accept="video/*"
                                                                    type="video"
                                                                    label="Upload video bài học"
                                                                    isVideoOrDoc={true}
                                                                  />

                                                                  {errors[`lesson_${sectionIndex}_${lessonIndex}_video`] && (
                                                                    <Alert
                                                                      severity="error"
                                                                      sx={{
                                                                        mt: 1,
                                                                        py: 0.5,
                                                                        '.dark &': {
                                                                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                          color: '#fca5a5',
                                                                        },
                                                                      }}
                                                                    >
                                                                      {errors[`lesson_${sectionIndex}_${lessonIndex}_video`]}
                                                                    </Alert>
                                                                  )}
                                                                </Box>
                                                              )}
                                                            </Box>
                                                          )}

                                                          {/* DOCUMENT SECTION */}
                                                          {lesson.lesson_type === 0 && (
                                                            <Box sx={{ mb: 2 }}>
                                                              {!lesson.content_types.includes('document') ? (
                                                                <Button
                                                                  fullWidth
                                                                  variant="outlined"
                                                                  startIcon={<IconFileDescription size={20} />}
                                                                  onClick={() => {
                                                                    const newTypes = [...lesson.content_types, 'document'];
                                                                    handleContentTypesChange(section.id, lesson.id, newTypes);
                                                                  }}
                                                                  sx={{
                                                                    justifyContent: 'flex-start',
                                                                    py: 1.5,
                                                                    borderWidth: 2,
                                                                    textTransform: 'none',
                                                                    fontSize: '0.95rem',
                                                                    fontWeight: 600,
                                                                    opacity: 0.8,
                                                                    borderColor: '#d1d5db',
                                                                    color: '#374151',
                                                                    '&:hover': {
                                                                      borderWidth: 2,
                                                                      borderColor: 'success.main',
                                                                      bgcolor: 'rgba(34, 197, 94, 0.05)',
                                                                      color: 'success.main',
                                                                    },
                                                                    '.dark &': {
                                                                      borderColor: '#4b5563',
                                                                      color: '#d1d5db',
                                                                      '&:hover': {
                                                                        borderColor: '#10b981',
                                                                        bgcolor: 'rgba(34, 197, 94, 0.1)',
                                                                      },
                                                                    },
                                                                  }}
                                                                >
                                                                  Thêm Tài liệu
                                                                </Button>
                                                              ) : (
                                                                <Box
                                                                  sx={{
                                                                    p: 3,
                                                                    border: '2px solid',
                                                                    borderColor: 'success.main',
                                                                    borderRadius: 2,
                                                                    bgcolor: 'rgba(34, 197, 94, 0.05)',
                                                                    '.dark &': {
                                                                      bgcolor: 'rgba(34, 197, 94, 0.1)',
                                                                      borderColor: '#10b981',
                                                                    },
                                                                  }}
                                                                >
                                                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                                    <Typography variant="subtitle2" className="dark:text-gray-300 flex items-center gap-2" sx={{ fontWeight: 600 }}>
                                                                      <IconFileDescription size={20} className="text-green-500 dark:text-green-400" />
                                                                      Tài liệu bài học
                                                                      <Typography variant="body2" className="dark:text-gray-400">
                                                                        ({lesson.documents.filter((d) => !d._deleted).length} tài liệu)
                                                                      </Typography>
                                                                    </Typography>

                                                                    <IconButton
                                                                      size="small"
                                                                      color="error"
                                                                      onClick={() => {
                                                                        const activeDocsCount = lesson.documents.filter((d) => !d._deleted).length;

                                                                        if (activeDocsCount === 0) {
                                                                          handleContentTypesChange(
                                                                            section.id,
                                                                            lesson.id,
                                                                            lesson.content_types.filter((t) => t !== 'document'),
                                                                          );
                                                                        } else {
                                                                          setConfirmDialog({
                                                                            open: true,
                                                                            title: 'Xác nhận xóa tài liệu',
                                                                            message: `Hành động này sẽ xóa toàn bộ ${activeDocsCount} tài liệu của bài học. Bạn có chắc chắn?`,
                                                                            onConfirm: () => {
                                                                              handleContentTypesChange(
                                                                                section.id,
                                                                                lesson.id,
                                                                                lesson.content_types.filter((t) => t !== 'document'),
                                                                              );

                                                                              setSnackbar({
                                                                                open: true,
                                                                                message: 'Đã xóa tất cả tài liệu khỏi giao diện',
                                                                                severity: 'success',
                                                                              });

                                                                              setConfirmDialog({ ...confirmDialog, open: false });
                                                                            },
                                                                          });
                                                                        }
                                                                      }}
                                                                      sx={{
                                                                        '&:hover': {
                                                                          bgcolor: 'error.light',
                                                                          color: 'white',
                                                                        },
                                                                        '.dark &': {
                                                                          color: '#f87171',
                                                                        },
                                                                      }}
                                                                    >
                                                                      <IconTrash size={16} />
                                                                    </IconButton>
                                                                  </Box>

                                                                  {/* DANH SÁCH TÀI LIỆU */}
                                                                  {lesson.documents.filter((d) => !d._deleted).length > 0 && (
                                                                    <Box>
                                                                      <List sx={{ p: 0, maxHeight: 300, overflow: 'auto' }}>
                                                                        {lesson.documents
                                                                          .filter((d) => !d._deleted)
                                                                          .map((doc, index, array) => {
                                                                            const displayIndex = array.length - index;

                                                                            return (
                                                                              <Draggable key={doc.document_id || `temp-${index}`} draggableId={doc.document_id || `temp-${index}`} index={index}>
                                                                                {(provided) => (
                                                                                  <ListItem
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    sx={{
                                                                                      bgcolor: 'background.paper',
                                                                                      borderRadius: 1,
                                                                                      mb: 1,
                                                                                      border: '1px solid',
                                                                                      borderColor: 'divider',
                                                                                      cursor: 'grab',
                                                                                      '&:hover': {
                                                                                        bgcolor: 'action.hover',
                                                                                      },
                                                                                      '.dark &': {
                                                                                        bgcolor: '#1f2937',
                                                                                        borderColor: '#374151',
                                                                                      },
                                                                                    }}
                                                                                    secondaryAction={
                                                                                      <IconButton
                                                                                        edge="end"
                                                                                        size="small"
                                                                                        color="error"
                                                                                        onClick={() => handleDeleteDocument(section.id, lesson.id, index)}
                                                                                        sx={{
                                                                                          '.dark &': {
                                                                                            color: '#f87171',
                                                                                          },
                                                                                        }}
                                                                                      >
                                                                                        <IconTrash size={16} />
                                                                                      </IconButton>
                                                                                    }
                                                                                  >
                                                                                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                                        <Typography variant="caption" className="dark:text-gray-400">
                                                                                          #{displayIndex}
                                                                                        </Typography>
                                                                                        <div {...provided.dragHandleProps}>
                                                                                          <IconGripVertical size={18} className="text-gray-400 cursor-grab dark:text-gray-500" />
                                                                                        </div>
                                                                                      </Box>

                                                                                      {/* Icon và Checkbox - xếp dọc */}
                                                                                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
                                                                                        <IconFileDescription size={20} className="text-blue-500 dark:text-blue-400" />
                                                                                        <FormControlLabel
                                                                                          control={
                                                                                            <Checkbox
                                                                                              size="small"
                                                                                              checked={doc.isDownloadable ?? true}
                                                                                              onChange={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setSections(
                                                                                                  sections.map((s) =>
                                                                                                    s.id === section.id
                                                                                                      ? {
                                                                                                          ...s,
                                                                                                          lessons: s.lessons.map((l) =>
                                                                                                            l.id === lesson.id
                                                                                                              ? {
                                                                                                                  ...l,
                                                                                                                  documents: l.documents.map((d, idx) => (idx === index ? { ...d, isDownloadable: e.target.checked } : d)),
                                                                                                                }
                                                                                                              : l,
                                                                                                          ),
                                                                                                        }
                                                                                                      : s,
                                                                                                  ),
                                                                                                );
                                                                                              }}
                                                                                              onClick={(e) => e.stopPropagation()}
                                                                                              sx={{
                                                                                                '& .MuiSvgIcon-root': {
                                                                                                  '.dark &': {
                                                                                                    color: '#9ca3af',
                                                                                                  },
                                                                                                },
                                                                                                '&.Mui-checked': {
                                                                                                  '.dark &': {
                                                                                                    color: '#8b5cf6',
                                                                                                  },
                                                                                                },
                                                                                              }}
                                                                                            />
                                                                                          }
                                                                                          label=""
                                                                                          sx={{ m: 0 }}
                                                                                        />
                                                                                      </Box>

                                                                                      {/* Tên tài liệu và Label checkbox - xếp dọc */}
                                                                                      <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                                        <Typography variant="body2" fontWeight="500" noWrap className="dark:text-gray-200" sx={{ mb: 0.5 }}>
                                                                                          {doc.document_name}
                                                                                        </Typography>
                                                                                        <Typography variant="caption" className="pb-1 mb-1 dark:text-gray-400" sx={{ mt: -1 }}>
                                                                                          Cho phép tải xuống
                                                                                        </Typography>
                                                                                      </Box>

                                                                                      {/* Thông tin file - xếp ngang như cũ để thẳng hàng */}
                                                                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '140px', justifyContent: 'flex-end' }}>
                                                                                        {doc.size && doc.size > 0 ? (
                                                                                          <Chip
                                                                                            label={`${(doc.size / 1024 / 1024).toFixed(2)} MB`}
                                                                                            size="small"
                                                                                            color="secondary"
                                                                                            sx={{
                                                                                              '.dark &': {
                                                                                                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                                                                                color: '#d8b4fe',
                                                                                              },
                                                                                            }}
                                                                                          />
                                                                                        ) : doc.document_url instanceof File ? (
                                                                                          <Chip
                                                                                            label={`${(doc.document_url.size / 1024 / 1024).toFixed(2)} MB`}
                                                                                            size="small"
                                                                                            color="secondary"
                                                                                            sx={{
                                                                                              '.dark &': {
                                                                                                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                                                                                color: '#d8b4fe',
                                                                                              },
                                                                                            }}
                                                                                          />
                                                                                        ) : null}
                                                                                        <Chip
                                                                                          label={doc.extension?.toUpperCase() || 'FILE'}
                                                                                          size="small"
                                                                                          color="primary"
                                                                                          variant="outlined"
                                                                                          sx={{
                                                                                            '.dark &': {
                                                                                              borderColor: 'rgba(59, 130, 246, 0.5)',
                                                                                              color: '#60a5fa',
                                                                                            },
                                                                                          }}
                                                                                        />
                                                                                      </Box>
                                                                                    </Box>
                                                                                  </ListItem>
                                                                                )}
                                                                              </Draggable>
                                                                            );
                                                                          })}
                                                                      </List>
                                                                    </Box>
                                                                  )}

                                                                  {lesson.documents.filter((d) => !d._deleted).length === 0 && (
                                                                    <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary', mb: 2 }}>
                                                                      <IconFileDescription size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                                                                      <Typography variant="body2" className="dark:text-gray-400">
                                                                        Chưa có tài liệu nào
                                                                      </Typography>
                                                                      <Typography variant="caption" sx={{ mt: 1, display: 'block' }} className="dark:text-gray-500">
                                                                        Thêm tài liệu PDF, Word, Excel, PowerPoint...
                                                                      </Typography>
                                                                    </Box>
                                                                  )}

                                                                  {/* FILE UPLOAD */}
                                                                  <FileUpload
                                                                    value={[]}
                                                                    onChange={(files) => {
                                                                      if (Array.isArray(files)) {
                                                                        handleAddMultipleDocuments(section.id, lesson.id, files);
                                                                      } else if (files instanceof File) {
                                                                        handleAddMultipleDocuments(section.id, lesson.id, [files]);
                                                                      }
                                                                    }}
                                                                    onDelete={() => {}}
                                                                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xlsx,.xls,.zip,.rar"
                                                                    type="document"
                                                                    label="Kéo thả nhiều tài liệu vào đây hoặc click để chọn"
                                                                    isVideoOrDoc={true}
                                                                    multiple={true}
                                                                  />

                                                                  {errors[`lesson_${sectionIndex}_${lessonIndex}_document`] && (
                                                                    <Alert
                                                                      severity="error"
                                                                      sx={{
                                                                        mt: 2,
                                                                        '.dark &': {
                                                                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                          color: '#fca5a5',
                                                                        },
                                                                      }}
                                                                    >
                                                                      {errors[`lesson_${sectionIndex}_${lessonIndex}_document`]}
                                                                    </Alert>
                                                                  )}
                                                                </Box>
                                                              )}
                                                            </Box>
                                                          )}

                                                          {/* QUIZ SECTION */}
                                                          <Box sx={{ mb: 2 }}>
                                                            {!lesson.content_types.includes('quiz') ? (
                                                              <Button
                                                                fullWidth
                                                                variant="outlined"
                                                                startIcon={<IconListCheck size={20} />}
                                                                onClick={() => {
                                                                  const newTypes = [...lesson.content_types, 'quiz'];
                                                                  handleContentTypesChange(section.id, lesson.id, newTypes);
                                                                }}
                                                                sx={{
                                                                  justifyContent: 'flex-start',
                                                                  py: 1.5,
                                                                  borderWidth: 2,
                                                                  textTransform: 'none',
                                                                  fontSize: '0.95rem',
                                                                  fontWeight: 600,
                                                                  opacity: 0.8,
                                                                  borderColor: '#d1d5db',
                                                                  color: '#374151',
                                                                  '&:hover': {
                                                                    borderWidth: 2,
                                                                    borderColor: 'warning.main',
                                                                    bgcolor: 'rgba(251, 191, 36, 0.05)',
                                                                    color: 'warning.main',
                                                                  },
                                                                  '.dark &': {
                                                                    borderColor: '#4b5563',
                                                                    color: '#d1d5db',
                                                                    '&:hover': {
                                                                      borderColor: '#f59e0b',
                                                                      bgcolor: 'rgba(251, 191, 36, 0.1)',
                                                                    },
                                                                  },
                                                                }}
                                                              >
                                                                Thêm Quiz
                                                              </Button>
                                                            ) : (
                                                              <Box
                                                                sx={{
                                                                  p: 2,
                                                                  border: '2px solid',
                                                                  borderColor: 'warning.main',
                                                                  borderRadius: 2,
                                                                  bgcolor: 'rgba(251, 191, 36, 0.05)',
                                                                  '.dark &': {
                                                                    bgcolor: 'rgba(251, 191, 36, 0.1)',
                                                                    borderColor: '#f59e0b',
                                                                  },
                                                                }}
                                                              >
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                                  <Typography variant="subtitle2" className="dark:text-gray-300 flex items-center gap-2" sx={{ fontWeight: 600 }}>
                                                                    <IconListCheck size={20} className="text-yellow-500 dark:text-yellow-400" />
                                                                    Quiz ({lesson.quizzes?.length || 0})
                                                                  </Typography>

                                                                  <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                    onClick={() => {
                                                                      const activeQuizzesCount = lesson.quizzes?.length;
                                                                      if (!activeQuizzesCount || activeQuizzesCount === 0) {
                                                                        handleContentTypesChange(
                                                                          section.id,
                                                                          lesson.id,
                                                                          lesson.content_types.filter((t) => t !== 'quiz'),
                                                                        );
                                                                      } else {
                                                                        setConfirmDialog({
                                                                          open: true,
                                                                          title: 'Xóa toàn bộ quiz',
                                                                          message: 'Bạn có chắc chắn muốn xóa toàn bộ quiz khỏi bài học này?',
                                                                          onConfirm: () => {
                                                                            handleContentTypesChange(
                                                                              section.id,
                                                                              lesson.id,
                                                                              lesson.content_types.filter((t) => t !== 'quiz'),
                                                                            );
                                                                            handleRemoveAllQuizzes(section.id, lesson.id);
                                                                            setConfirmDialog({ ...confirmDialog, open: false });
                                                                          },
                                                                        });
                                                                      }
                                                                    }}
                                                                    sx={{
                                                                      '&:hover': {
                                                                        bgcolor: 'error.light',
                                                                        color: 'white',
                                                                      },
                                                                      '.dark &': {
                                                                        color: '#f87171',
                                                                      },
                                                                    }}
                                                                  >
                                                                    <IconTrash size={16} />
                                                                  </IconButton>
                                                                </Box>

                                                                {/* Danh sách quiz */}
                                                                {lesson.quizzes && lesson.quizzes.length > 0 ? (
                                                                  <List sx={{ p: 0, mb: 2 }}>
                                                                    {lesson.quizzes.map((quiz, quizIdx) => (
                                                                      <ListItem
                                                                        key={quizIdx}
                                                                        sx={{
                                                                          bgcolor: 'background.paper',
                                                                          borderRadius: 1,
                                                                          mb: 1,
                                                                          border: '1px solid',
                                                                          borderColor: 'divider',
                                                                          '.dark &': {
                                                                            bgcolor: '#1f2937',
                                                                            borderColor: '#374151',
                                                                          },
                                                                        }}
                                                                        secondaryAction={
                                                                          <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            onClick={() => handleRemoveQuizFromLesson(section.id, lesson.id, quizIdx)}
                                                                            sx={{
                                                                              '.dark &': {
                                                                                color: '#f87171',
                                                                              },
                                                                            }}
                                                                          >
                                                                            <IconTrash size={16} />
                                                                          </IconButton>
                                                                        }
                                                                      >
                                                                        <ListItemText
                                                                          primary={
                                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                              <Typography variant="body2" fontWeight="500" className="dark:text-gray-200">
                                                                                {quiz.quiz_title}
                                                                              </Typography>
                                                                            </Box>
                                                                          }
                                                                          secondary={
                                                                            <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                                                              <Chip
                                                                                label={`${quiz.total_questions} câu`}
                                                                                size="small"
                                                                                sx={{
                                                                                  '.dark &': {
                                                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                                                    color: '#d1d5db',
                                                                                  },
                                                                                }}
                                                                              />
                                                                              <Chip
                                                                                label={`${quiz.duration_minutes} phút`}
                                                                                size="small"
                                                                                color="primary"
                                                                                sx={{
                                                                                  '.dark &': {
                                                                                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                                                                    color: '#60a5fa',
                                                                                  },
                                                                                }}
                                                                              />
                                                                              <Chip
                                                                                label={`Độ khó: ${quiz.difficulty_level}/5`}
                                                                                size="small"
                                                                                color={quiz.difficulty_level && quiz.difficulty_level >= 4 ? 'error' : 'default'}
                                                                                sx={{
                                                                                  '.dark &': {
                                                                                    backgroundColor: quiz.difficulty_level && quiz.difficulty_level >= 4 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                                                                    color: quiz.difficulty_level && quiz.difficulty_level >= 4 ? '#fca5a5' : '#d1d5db',
                                                                                  },
                                                                                }}
                                                                              />
                                                                              <Chip
                                                                                label={`Pass: ${quiz.passing_score}%`}
                                                                                size="small"
                                                                                color="success"
                                                                                sx={{
                                                                                  '.dark &': {
                                                                                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                                                                    color: '#34d399',
                                                                                  },
                                                                                }}
                                                                              />
                                                                            </Box>
                                                                          }
                                                                        />
                                                                      </ListItem>
                                                                    ))}
                                                                  </List>
                                                                ) : (
                                                                  <Box sx={{ textAlign: 'center', py: 2, color: 'text.secondary', mb: 2 }}>
                                                                    <IconListCheck size={32} className="text-yellow-400 dark:text-yellow-500 mx-auto mb-2" />
                                                                    <Typography variant="body2" className="dark:text-gray-400">
                                                                      Chưa có quiz nào
                                                                    </Typography>
                                                                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }} className="dark:text-gray-500">
                                                                      Thêm quiz để kiểm tra kiến thức học viên
                                                                    </Typography>
                                                                  </Box>
                                                                )}

                                                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                                                  <Button
                                                                    size="small"
                                                                    variant="contained"
                                                                    startIcon={<IconPlus size={16} />}
                                                                    onClick={() => handleOpenQuizDialog(section.id, lesson.id, lesson.lesson_type)}
                                                                    sx={{
                                                                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                                      '&:hover': {
                                                                        background: 'linear-gradient(135deg, #e59007 0%, #b66205 100%)',
                                                                      },
                                                                    }}
                                                                  >
                                                                    Thêm Quiz
                                                                  </Button>
                                                                </Box>

                                                                {errors[`lesson_${sectionIndex}_${lessonIndex}_quiz`] && (
                                                                  <Alert
                                                                    severity="error"
                                                                    sx={{
                                                                      mt: 2,
                                                                      '.dark &': {
                                                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                        color: '#fca5a5',
                                                                      },
                                                                    }}
                                                                  >
                                                                    {errors[`lesson_${sectionIndex}_${lessonIndex}_quiz`]}
                                                                  </Alert>
                                                                )}
                                                              </Box>
                                                            )}
                                                          </Box>

                                                          {/* ERROR MESSAGE */}
                                                          {errors[`lesson_${sectionIndex}_${lessonIndex}_content_types`] && (
                                                            <Alert
                                                              severity="error"
                                                              sx={{
                                                                mt: 1,
                                                                '.dark &': {
                                                                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                                  color: '#fca5a5',
                                                                },
                                                              }}
                                                            >
                                                              {errors[`lesson_${sectionIndex}_${lessonIndex}_content_types`]}
                                                            </Alert>
                                                          )}
                                                        </Grid>
                                                      </AccordionDetails>
                                                    </Accordion>
                                                  </Paper>
                                                )}
                                              </Draggable>
                                            ))}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </DragDropContext>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<IconPlus size={16} />}
                                        onClick={() => handleAddLesson(section.id)}
                                        sx={{
                                          borderRadius: 2,
                                          px: 3,
                                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                          '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                          },
                                        }}
                                      >
                                        Thêm bài học
                                      </Button>
                                    </Box>

                                    {section.lessons.length === 0 && (
                                      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                                        <Typography variant="body2" className="dark:text-gray-400">
                                          Chưa có bài học nào
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {sections.length === 0 && (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    border: '2px dashed #e5e7eb',
                    borderRadius: 2,
                    '.dark &': {
                      borderColor: '#4b5563',
                    },
                  }}
                >
                  <IconBook size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                    Chưa có chương học nào. Nhấn "Thêm chương" để bắt đầu.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        {/* DIALOG ACTIONS */}
        <DialogActions
          sx={{
            p: 2,
            gap: 1,
            borderTop: '1px solid #e9d5ff',
            background: '#faf5ff',
          }}
          className="dark:bg-gray-900 dark:border-gray-700"
        >
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            sx={{
              borderWidth: 2,
              borderRadius: 2,
              px: 3,
              '&:hover': { borderWidth: 2 },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-400 text-white hover:from-violet-500 hover:to-fuchsia-300"
            startIcon={<IconDeviceFloppy size={18} />}
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            {loading ? 'Đang lưu...' : courseId ? 'Cập nhật' : 'Tạo khóa học'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {confirmDialog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {confirmDialog.message}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => setConfirmDialog({ ...confirmDialog, open: false })} sx={{ borderRadius: 1.5 }}>
              Hủy
            </Button>
            <Button variant="contained" color="error" onClick={confirmDialog.onConfirm} sx={{ borderRadius: 1.5 }}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={quizDialogOpen}
        onClose={() => {
          setQuizDialogOpen(false);
          setSelectedQuizIds([]);
        }}
        maxWidth="md"
        fullWidth
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            borderRadius: { xs: 0, sm: '8px' },
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            m: { xs: 0, sm: 2 },
            maxHeight: { xs: '100vh', sm: '90vh' },
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
            fontWeight: 600,
            borderBottom: '1px solid',
            borderColor: 'divider',
            padding: { xs: '16px 12px 12px', sm: '20px 24px 16px' },
            '.dark &': {
              color: '#f9fafb',
              borderColor: '#374151',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} className="dark:text-gray-100">
              {selectedLessonForQuiz?.lessonType === 2 ? 'Chọn Quiz cho Bài thi' : 'Chọn Quiz'}
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                setQuizDialogOpen(false);
                setSelectedQuizIds([]);
              }}
              sx={{
                color: 'text.secondary',
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
            >
              <IconX size={20} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 2 },
              mt: 2,
              alignItems: { xs: 'stretch', sm: 'center' },
            }}
          >
            <TextField
              size="small"
              placeholder="Tìm kiếm quiz..."
              value={quizSearchTerm}
              onChange={(e) => setQuizSearchTerm(e.target.value)}
              className="dark:text-white"
              sx={{
                flex: { xs: 1, sm: 'auto' },
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#555',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#888',
                },
                '.dark & .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.dark &:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.dark &.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                color: 'black',
                '.dark &': {
                  color: 'white',
                },
                '& .MuiSvgIcon-root': {
                  color: 'black',
                },
                '.dark & .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
              InputProps={{
                inputProps: {
                  className: 'placeholder:text-gray-800 dark:placeholder:text-white',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={18} className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: { xs: 120, sm: 140 }, flex: { xs: 1, sm: 'auto' } }}>
                <InputLabel className="dark:text-gray-300" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Loại quiz
                </InputLabel>
                <Select
                  value={quizTypeFilter}
                  onChange={(e) => setQuizTypeFilter(e.target.value as number | 'all')}
                  label="Loại quiz"
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
                    borderRadius: '4px',
                    fontSize: 16,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'divider',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#8b5cf6',
                    },
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
                      '.dark &': {
                        color: '#9ca3af',
                      },
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                      borderWidth: 1,
                      '.dark &': {
                        borderColor: '#b3bcccff',
                      },
                    },
                    '.MuiSelect-select': {
                      py: '6px',
                      px: '12px',
                      backgroundColor: '#fff',
                      color: '#111827',
                      '.dark &': {
                        backgroundColor: '#48525fff',
                        color: '#f3f4f6',
                        borderColor: '#b3bcccff',
                      },
                    },
                  }}
                >
                  <MenuItem
                    value="all"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Tất cả
                  </MenuItem>
                  <MenuItem
                    value={1}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Quiz nhỏ
                  </MenuItem>
                  <MenuItem
                    value={2}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ede9fe',
                        color: '#030008ff',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#ddd6fe',
                        color: '#000000ff',
                      },
                    }}
                  >
                    Thi online
                  </MenuItem>
                </Select>
              </FormControl>
              <Chip
                label={`${selectedQuizIds.length}`}
                color="primary"
                size="small"
                variant={selectedQuizIds.length > 0 ? 'filled' : 'outlined'}
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                  height: { xs: 28, sm: 32 },
                  minWidth: { xs: 40, sm: 50 },
                  '.dark &': {
                    backgroundColor: selectedQuizIds.length > 0 ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    color: selectedQuizIds.length > 0 ? '#60a5fa' : '#9ca3af',
                    borderColor: selectedQuizIds.length > 0 ? '#3b82f6' : '#4b5563',
                  },
                }}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            p: { xs: 1.5, sm: 2 },
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          {(() => {
            const currentLesson = selectedLessonForQuiz ? sections.find((s) => s.id === selectedLessonForQuiz.sectionId)?.lessons.find((l) => l.id === selectedLessonForQuiz.lessonId) : null;

            const existingQuizIds = currentLesson?.quizzes?.map((q) => q.quiz_id) || [];
            const isSingleSelectMode = selectedLessonForQuiz?.lessonType === 2;

            const filteredQuizzes = availableQuizzes.filter((quiz) => {
              const matchSearch = quiz.title.toLowerCase().includes(quizSearchTerm.toLowerCase());
              const matchType = quizTypeFilter === 'all' || quiz.quiz_type === quizTypeFilter;
              return matchSearch && matchType;
            });

            return (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    mb: 2,
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }} className="dark:text-gray-400">
                    Tổng: {filteredQuizzes.length} quiz
                  </Typography>
                  {!isSingleSelectMode && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        const allSelectableIds = filteredQuizzes.map((q) => q.quiz_id);
                        const newSelectedIds = [...new Set([...selectedQuizIds, ...allSelectableIds])];
                        setSelectedQuizIds(newSelectedIds);
                      }}
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        py: { xs: 0.5, sm: 0.75 },
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
                      Chọn tất cả
                    </Button>
                  )}
                </Box>

                <List sx={{ p: 0 }}>
                  {filteredQuizzes.map((quiz) => {
                    const isSelected = selectedQuizIds.includes(quiz.quiz_id);
                    const wasPreviouslySelected = existingQuizIds.includes(quiz.quiz_id);

                    return (
                      <ListItem
                        key={quiz.quiz_id}
                        sx={{
                          borderRadius: 1,
                          mb: 1,
                          border: '1px solid',
                          borderColor: isSelected ? 'primary.main' : 'divider',
                          bgcolor: isSelected ? 'action.selected' : 'background.paper',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                          p: { xs: 1, sm: 1.5 },
                          '.dark &': {
                            borderColor: isSelected ? '#8b5cf6' : '#374151',
                            bgcolor: isSelected ? 'rgba(139, 92, 246, 0.1)' : '#111827',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.03)',
                            },
                          },
                        }}
                        secondaryAction={
                          isSingleSelectMode ? (
                            <Radio
                              edge="end"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedQuizIds([quiz.quiz_id]);
                              }}
                              sx={{
                                p: { xs: 0.5, sm: 1 },
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
                          ) : (
                            <Checkbox
                              edge="end"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedQuizIds((prev) => (prev.includes(quiz.quiz_id) ? prev.filter((id) => id !== quiz.quiz_id) : [...prev, quiz.quiz_id]));
                              }}
                              sx={{
                                p: { xs: 0.5, sm: 1 },
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
                          )
                        }
                      >
                        <ListItemButton
                          onClick={() => {
                            if (isSingleSelectMode) {
                              setSelectedQuizIds([quiz.quiz_id]);
                            } else {
                              setSelectedQuizIds((prev) => (prev.includes(quiz.quiz_id) ? prev.filter((id) => id !== quiz.quiz_id) : [...prev, quiz.quiz_id]));
                            }
                          }}
                          dense
                          sx={{
                            p: 0,
                            pr: { xs: 4, sm: 5 },
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                            '.dark &': {
                              color: '#f3f4f6',
                            },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
                                <Typography variant="body2" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} className="dark:text-gray-200">
                                  {quiz.title}
                                </Typography>
                                <Chip
                                  label={['', 'Quiz nhỏ', 'Thi online', 'Assessment', 'Final'][quiz.quiz_type] || 'Quiz'}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 },
                                    '.dark &': {
                                      borderColor: 'rgba(59, 130, 246, 0.5)',
                                      color: '#60a5fa',
                                    },
                                  }}
                                />
                                {wasPreviouslySelected && (
                                  <Chip
                                    label="Đã chọn"
                                    size="small"
                                    color="success"
                                    sx={{
                                      fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                      height: { xs: 20, sm: 24 },
                                      '.dark &': {
                                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                        color: '#34d399',
                                      },
                                    }}
                                  />
                                )}
                              </Box>
                            }
                            secondary={
                              <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, mt: 0.5, flexWrap: 'wrap' }}>
                                <Chip
                                  label={`${quiz.question_count || quiz.total_questions || 0} câu`}
                                  size="small"
                                  sx={{
                                    fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 },
                                    '.dark &': {
                                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                      color: '#d1d5db',
                                    },
                                  }}
                                />
                                <Chip
                                  label={`${quiz.duration_minutes || 0}p`}
                                  size="small"
                                  color="primary"
                                  sx={{
                                    fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 },
                                    '.dark &': {
                                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                      color: '#60a5fa',
                                    },
                                  }}
                                />
                                <Chip
                                  label={`Độ khó: ${quiz.difficulty_level}/5`}
                                  size="small"
                                  color={quiz.difficulty_level >= 4 ? 'error' : 'default'}
                                  sx={{
                                    fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 },
                                    '.dark &': {
                                      backgroundColor: quiz.difficulty_level >= 4 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                      color: quiz.difficulty_level >= 4 ? '#fca5a5' : '#d1d5db',
                                    },
                                  }}
                                />
                                <Chip
                                  label={`Pass: ${quiz.passing_score}%`}
                                  size="small"
                                  color="success"
                                  sx={{
                                    fontSize: { xs: '0.625rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 },
                                    '.dark &': {
                                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                                      color: '#34d399',
                                    },
                                  }}
                                />
                              </Box>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

                {filteredQuizzes.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} className="dark:text-gray-400">
                      Không tìm thấy quiz phù hợp
                    </Typography>
                  </Box>
                )}
              </>
            );
          })()}
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: 1.5, sm: 3 },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 1 },
            py: 1,
            justifyContent: 'space-between',
            borderTop: '1px solid',
            borderColor: 'divider',
            '.dark &': {
              borderColor: '#374151',
            },
          }}
        >
          {selectedLessonForQuiz?.lessonType !== 2 && (
            <Box sx={{ order: { xs: 2, sm: 1 }, width: { xs: '100%', sm: 'auto' } }}>
              <Button
                fullWidth={window.innerWidth < 600}
                variant="outlined"
                size="small"
                onClick={() => setSelectedQuizIds([])}
                disabled={selectedQuizIds.length === 0}
                sx={{
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  borderColor: '#d1d5db',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#9ca3af',
                  },
                  '&:disabled': {
                    borderColor: '#e5e7eb',
                    color: '#9ca3af',
                  },
                  '.dark &': {
                    borderColor: '#4b5563',
                    color: '#d1d5db',
                    '&:hover': {
                      borderColor: '#6b7280',
                    },
                    '&:disabled': {
                      borderColor: '#374151',
                      color: '#6b7280',
                    },
                  },
                }}
              >
                Bỏ chọn tất cả
              </Button>
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1, order: { xs: 1, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setQuizDialogOpen(false);
                setSelectedQuizIds([]);
              }}
              sx={{
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
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
              variant="contained"
              onClick={handleUpdateQuizzesForLesson}
              startIcon={<IconPlus size={18} />}
              sx={{
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                backgroundColor: '#8b5cf6',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7c3aed',
                },
                minWidth: 130,
              }}
            >
              {selectedLessonForQuiz?.lessonType === 2 ? 'Thêm' : `Thêm (${selectedQuizIds.length})`}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            '& .MuiAlert-message': {
              padding: '6px 0',
            },
          }}
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

export default CourseFormDialog;
