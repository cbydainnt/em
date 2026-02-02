import { useEffect, useState, useRef, useMemo } from 'react';
import DefaultLayout from '@/layouts/default-layout';
import { TextField, InputAdornment, CircularProgress, LinearProgress, Snackbar, Alert, IconButton } from '@mui/material';
import { IconSearch, IconX, IconChevronDown, IconChevronRight, IconBrandYoutube, IconFileText, IconHelpCircle, IconClockFilled, IconCheck } from '@tabler/icons-react';
import { useParams, useNavigate } from 'react-router-dom';
import DynamicBreadcrumb from '@/components/EM_BreadCrumb';
import { ActivateCourseModal } from './component/EM_ActivateCourseModal';
import { useAuthStore } from '@/hooks/useAuthStore';
import EM_Login from '@/components/EM_Login';
import { useCourseStatus } from '@/hooks/useCourseStatus';
import { CommentTab } from './component/EM_CommentTab';
import { toSlug } from '@/helpers/SeoHelper';

interface Lesson {
  lesson_id: string;
  lesson_title: string;
  access_type: number;
  lesson_type: number;
  minutes: number;
}

interface Section {
  course_id: string;
  section_id: string;
  section_title: string;
  lessons: Lesson[];
}

interface ProgressData {
  success: boolean;
  overall: {
    total_lessons: number;
    completed_lessons: number;
    overall_completion_percentage: number;
  };
  sections: Array<{
    section_id: string;
    stats: {
      total_lessons: number;
      completed_lessons: number;
      completion_percentage: number;
    };
    lessons: Array<{
      lesson_id: string;
      completed: number | boolean;
      watched_seconds: number;
    }>;
  }>;
}

export default function SectionPage() {
  const { course_id } = useParams();
  const courseId = course_id ?? '';
  const navigate = useNavigate();

  const [sections, setSections] = useState<Section[]>([]);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [searchText, setSearchText] = useState('');
  const [openUnits, setOpenUnits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [expiredSnackbarOpen, setExpiredSnackbarOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState<ProgressData | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [userCourseStatus, setUserCourseStatus] = useState<number>();

  const { expired_date } = useCourseStatus(courseId);
  const { authData } = useAuthStore();
  const currentUserId = authData?.id || null;
  const refEM_Login = useRef<any>(null);

  useEffect(() => {
    if (!courseId) return;
    loadData();
  }, [courseId, currentUserId]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadSections(), loadProgress(), loadUserCourseStatus()]);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSections = async () => {
    try {
      const res = await fetch(`/api/course/sections/${courseId}`);
      const data = await res.json();

      const formatted = data.map((s: Section) => ({
        ...s,
        lessons: Array.isArray(s.lessons) ? s.lessons : [],
      }));

      setSections(formatted);

      if (formatted.length > 0) {
        const firstSection = formatted[0];
        setSelectedSection(firstSection);
        setOpenUnits([firstSection.section_id]);
      } else {
        setSelectedSection(null);
        setOpenUnits([]);
      }
    } catch (err) {
      console.error('Error loading sections:', err);
    }
  };

  const loadProgress = async () => {
    if (!authData?.id) return;

    try {
      setLoadingProgress(true);
      const res = await fetch(`/api/lesson/detailed-progress/${courseId}/${authData.id}`);
      const data = await res.json();
      if (data.success) {
        setCourseProgress(data);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const loadUserCourseStatus = async () => {
    try {
      const userId = currentUserId;
      if (!userId) return;

      const res = await fetch(`/api/active-code/check-status?user_id=${userId}&course_id=${courseId}`);
      const data = await res.json();

      if (data.success) {
        setUserCourseStatus(data.userCourseStatus);
      }
    } catch (err) {
      console.error('Error fetching course status:', err);
    }
  };

  const getLessonProgress = (lessonId: string, sectionId: string) => {
    if (!courseProgress) return null;

    const section = courseProgress.sections.find((s: any) => s.section_id === sectionId || s.section_id.toString() === sectionId);
    if (!section) return null;

    return section.lessons.find((l: any) => l.lesson_id === lessonId || l.lesson_id.toString() === lessonId);
  };

  const getSectionProgress = (sectionId: string) => {
    if (!courseProgress) return null;
    return courseProgress.sections.find((s: any) => s.section_id === sectionId || s.section_id.toString() === sectionId);
  };

  const formatWatchedTime = (progress: any, totalMinutes: number) => {
    if (!progress) return null;

    const watchedSeconds = progress.watched_seconds || 0;
    const watchedMinutes = Math.floor(watchedSeconds / 60);
    const completed = progress.completed === 2 || progress.completed === true;

    if (completed) {
      return {
        status: 'completed' as const,
        text: 'Đã hoàn thành',
        watchedMinutes,
        totalMinutes,
        progressPercentage: 100,
      };
    } else if (watchedMinutes > 0) {
      const progressPercentage = totalMinutes > 0 ? Math.min(100, (watchedMinutes / totalMinutes) * 100) : 0;

      return {
        status: 'in_progress' as const,
        text: `${watchedMinutes} phút / ${totalMinutes} phút`,
        watchedMinutes,
        totalMinutes,
        progressPercentage,
      };
    } else {
      return {
        status: 'not_started' as const,
        text: `Chưa học • ${totalMinutes} phút`,
        watchedMinutes: 0,
        totalMinutes,
        progressPercentage: 0,
      };
    }
  };

  const toggleUnit = (id: string) => {
    setOpenUnits((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleClickLesson = (lesson: Lesson, section: Section) => {
    if (!authData && lesson.access_type !== 1) {
      refEM_Login.current?.show();
      return;
    }

    const slug = `${toSlug(lesson.lesson_title)}-${lesson.lesson_id}`;
    if (lesson.access_type === 1) {
      navigate(`/bai-hoc/${slug}`);
      return;
    }

    const expired = expired_date && new Date(expired_date) < new Date();
    if (expired) {
      setExpiredSnackbarOpen(true);
      return;
    }

    if (userCourseStatus !== 1 && userCourseStatus !== 2) {
      setShowModal(true);
      return;
    }
    navigate(`/bai-hoc/${slug}`, {
      state: {
        lessonId: lesson.lesson_id,
        courseId,
        sectionId: section.section_id,
        sectionName: section.section_title,
      },
    });
  };

  const getLessonIcon = (lessonType: number) => {
    switch (lessonType) {
      case 0:
        return <IconBrandYoutube className="h-4 w-4 text-red-500" />;
      case 1:
        return <IconFileText className="h-4 w-4 text-blue-500" />;
      case 2:
        return <IconHelpCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  // ---------------------------
  // SEARCH: compute filteredSections when searchText exists
  // ---------------------------
  const filteredSections = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return null;

    return sections
      .map((s) => {
        const matchedLessons = s.lessons.filter((l) => l.lesson_title.toLowerCase().includes(q));
        if (matchedLessons.length === 0) return null;
        return { ...s, lessons: matchedLessons };
      })
      .filter(Boolean) as Section[];
  }, [sections, searchText]);

  // When user types a search, open all units and clear selectedSection for the right pane view
  useEffect(() => {
    if (searchText.trim()) {
      setOpenUnits(sections.map((s) => s.section_id));
      setSelectedSection(null);
    } else {
      // if search cleared, restore to first section if none selected
      if (sections.length > 0 && !selectedSection) {
        setSelectedSection(sections[0]);
        setOpenUnits([sections[0].section_id]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, sections]);

  const clearSearch = () => {
    setSearchText('');
    // restore selection
    if (sections.length > 0) {
      setSelectedSection(sections[0]);
      setOpenUnits([sections[0].section_id]);
    } else {
      setSelectedSection(null);
      setOpenUnits([]);
    }
  };

  const isSearching = Boolean(searchText.trim());

  if (loading) {
    return (
      <DefaultLayout hideSidebarToggle={true}>
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      </DefaultLayout>
    );
  }

  if (sections.length === 0) {
    return (
      <DefaultLayout hideSidebarToggle={true}>
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">Chưa có bài học nào trong khóa học này.</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout hideSidebarToggle={true}>
      <div className="flex flex-col min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300" style={{ backgroundColor: 'rgb(var(--bg-primary))' }}>
        {/* ===== Breadcrumb ===== */}
        <div className="w-full flex justify-center px-6 pt-4">
          <div className="w-full max-w-6xl">
            <DynamicBreadcrumb sectionId={selectedSection?.section_id} />
          </div>
        </div>

        {/* ===== Main Content ===== */}
        <main className="flex justify-center flex-1 p-6">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
            {/* ================= LEFT: SECTION LIST ================= */}
            <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow p-6 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Chương học</h3>

                {/* Progress Summary */}
                {authData && courseProgress && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {courseProgress.overall.completed_lessons}/{courseProgress.overall.total_lessons}
                    </span>
                    <div className="w-16">
                      <LinearProgress
                        variant="determinate"
                        value={courseProgress.overall.overall_completion_percentage}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 3,
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {sections.map((section) => {
                  const sectionProgress = getSectionProgress(section.section_id);
                  const totalMinutes = section.lessons.reduce((sum, l) => sum + (l.minutes || 0), 0);

                  return (
                    <button
                      key={section.section_id}
                      onClick={() => {
                        setSelectedSection(section);
                        setSearchText('');
                        if (!openUnits.includes(section.section_id)) {
                          setOpenUnits([...openUnits, section.section_id]);
                        }
                      }}
                      className={`p-4 rounded-xl border text-left transition cursor-pointer ${selectedSection?.section_id === section.section_id ? 'border-purple-500 bg-purple-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white text-lg">
                            <span className="break-words">{section.section_title}</span>
                            {sectionProgress && sectionProgress.stats.completion_percentage === 100 && (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                                {/* <IconCheck size={12} className="inline mr-1" /> */}
                                Hoàn thành
                              </span>
                            )}
                          </div>
                          {sectionProgress && (
                            <div className="flex items-center gap-2">
                              {sectionProgress.stats.completion_percentage < 100 && (
                                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                  <div className={`w-2 h-2 rounded-full ${sectionProgress.stats.completed_lessons > 0 ? 'bg-blue-500' : 'bg-gray-400'}`} />
                                  <span className="text-xs font-medium">
                                    Hoàn thành {sectionProgress.stats.completed_lessons}/{section.lessons.length}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span>{section.lessons.length} bài học</span>
                          <span>•</span>
                          <span>{totalMinutes} phút</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= RIGHT: LESSON LIST ================= */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              {/* LESSON LIST */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                {/* Search */}
                <TextField
                  size="small"
                  placeholder="Tìm kiếm bài học..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  sx={{
                    width: { xs: '100%', sm: 300 },
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(229, 231, 235)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgb(229, 231, 235)',
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
                    endAdornment: searchText && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                          <IconX size={18} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 mt-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{isSearching ? 'Kết quả tìm kiếm' : (selectedSection?.section_title ?? 'Danh sách bài học')}</h3>
                    {!isSearching && selectedSection && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {selectedSection.lessons.length} bài học • {selectedSection.lessons.reduce((sum, l) => sum + (l.minutes || 0), 0)} phút
                      </p>
                    )}
                    {isSearching && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Tìm thấy {filteredSections ? filteredSections.reduce((acc, s) => acc + s.lessons.length, 0) : 0} kết quả trong {filteredSections ? filteredSections.length : 0} chương
                      </p>
                    )}
                  </div>
                </div>

                {/* Toggle Button for Mobile */}
                <button onClick={() => selectedSection && toggleUnit(selectedSection.section_id)} className="sm:hidden w-full flex items-center justify-between p-3 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="font-medium">{openUnits.includes(selectedSection?.section_id || '') ? 'Ẩn bài học' : 'Hiện bài học'}</span>
                  {openUnits.includes(selectedSection?.section_id || '') ? <IconChevronDown size={20} /> : <IconChevronRight size={20} />}
                </button>

                {/* Lesson list with progress indicators */}
                {isSearching ? (
                  // --- SEARCH MODE: show matched lessons across all sections ---
                  !filteredSections || filteredSections.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <IconSearch size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                      <p className="text-lg font-medium">Không tìm thấy bài học nào phù hợp</p>
                      <p className="text-sm mt-1">Hãy thử từ khóa tìm kiếm khác</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredSections.map((section) => (
                        <div key={section.section_id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{section.section_title}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{section.lessons.length} kết quả</div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{section.lessons.reduce((sum, l) => sum + (l.minutes || 0), 0)} phút</div>
                          </div>

                          <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {section.lessons.map((lesson) => {
                              const progress = authData ? getLessonProgress(lesson.lesson_id, section.section_id) : null;
                              const timeInfo = progress ? formatWatchedTime(progress, lesson.minutes) : null;
                              const isSearchMatch = searchText && lesson.lesson_title.toLowerCase().includes(searchText.toLowerCase());

                              return (
                                <div key={lesson.lesson_id} onClick={() => handleClickLesson(lesson, section)} className="grid grid-cols-1 sm:grid-cols-10 items-start sm:items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors gap-3 sm:gap-0">
                                  <div className="col-span-1 sm:col-span-9 flex items-start sm:items-center gap-3 sm:gap-4 w-full">
                                    <div className="relative flex-shrink-0">
                                      {loadingProgress ? (
                                        <div className="w-8 h-8 flex items-center justify-center">
                                          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                                        </div>
                                      ) : (
                                        <>
                                          {timeInfo?.status === 'in_progress' && timeInfo.progressPercentage > 0 && (
                                            <div className="absolute inset-0">
                                              <svg className="w-8 h-8 transform -rotate-90">
                                                <circle cx="16" cy="16" r="14" fill="none" stroke="#e5e7eb" strokeWidth="2" className="dark:stroke-gray-700" />
                                                <circle cx="16" cy="16" r="14" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="88" strokeDashoffset={88 - (88 * timeInfo.progressPercentage) / 100} />
                                              </svg>
                                            </div>
                                          )}

                                          <div
                                            className={`
                                              p-2 rounded-lg relative z-10 
                                              ${timeInfo?.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : timeInfo?.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}
                                              flex items-center justify-center w-8 h-8
                                            `}
                                          >
                                            {getLessonIcon(lesson.lesson_type)}
                                          </div>

                                          {timeInfo?.status === 'completed' && (
                                            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 z-20">
                                              <IconCheck size={10} className="text-white" />
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                        <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate">{lesson.lesson_title}</h5>

                                        <div className="flex flex-wrap gap-1">
                                          {lesson.access_type === 1 && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shrink-0">FREE</span>}
                                          {isSearchMatch && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 shrink-0">Khớp</span>}
                                        </div>
                                      </div>

                                      {authData && (
                                        <div className="flex items-center gap-2 mt-1">
                                          {loadingProgress ? (
                                            <span className="text-xs text-gray-500">Đang tải...</span>
                                          ) : timeInfo ? (
                                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                              <span
                                                className={`
                                                  text-xs font-medium 
                                                  ${timeInfo.status === 'completed' ? 'text-green-600 dark:text-green-400' : timeInfo.status === 'in_progress' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}
                                                `}
                                              >
                                                {timeInfo.text}
                                              </span>

                                              {timeInfo.status === 'in_progress' && timeInfo.progressPercentage > 0 && <span className="text-xs text-gray-500">({Math.round(timeInfo.progressPercentage)}%)</span>}
                                            </div>
                                          ) : (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Chưa học • {lesson.minutes} phút</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-span-1 flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 shrink-0 text-sm">
                                      <IconClockFilled size={14} className="sm:size-4" />
                                      <span className="font-medium whitespace-nowrap">{lesson.minutes} phút</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : // --- NORMAL MODE: show selectedSection's lessons ---
                !selectedSection || selectedSection.lessons.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <IconSearch size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-lg font-medium">Không có bài học trong chương này</p>
                  </div>
                ) : (
                  <div className={`${openUnits.includes(selectedSection.section_id) ? 'block' : 'hidden sm:block'}`}>
                    <div className="space-y-3">
                      {selectedSection.lessons
                        .filter((lesson) => !searchText.trim() || lesson.lesson_title.toLowerCase().includes(searchText.toLowerCase()))
                        .map((lesson) => {
                          const progress = authData ? getLessonProgress(lesson.lesson_id, selectedSection.section_id) : null;
                          const timeInfo = progress ? formatWatchedTime(progress, lesson.minutes) : null;
                          const isSearchMatch = searchText && lesson.lesson_title.toLowerCase().includes(searchText.toLowerCase());

                          return (
                            <div key={lesson.lesson_id} onClick={() => handleClickLesson(lesson, selectedSection)} className="grid grid-cols-1 sm:grid-cols-10 items-start sm:items-center px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors gap-3 sm:gap-0 border border-gray-200 dark:border-gray-700 rounded-lg">
                              {/* Lesson Content */}
                              <div className="col-span-1 sm:col-span-9 flex items-start sm:items-center gap-3 sm:gap-4 w-full">
                                {/* Progress Icon */}
                                <div className="relative flex-shrink-0">
                                  {loadingProgress ? (
                                    <div className="w-8 h-8 flex items-center justify-center">
                                      <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                                    </div>
                                  ) : (
                                    <>
                                      {timeInfo?.status === 'in_progress' && timeInfo.progressPercentage > 0 && (
                                        <div className="absolute inset-0">
                                          <svg className="w-8 h-8 transform -rotate-90">
                                            <circle cx="16" cy="16" r="14" fill="none" stroke="#e5e7eb" strokeWidth="2" className="dark:stroke-gray-700" />
                                            <circle cx="16" cy="16" r="14" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray="88" strokeDashoffset={88 - (88 * timeInfo.progressPercentage) / 100} />
                                          </svg>
                                        </div>
                                      )}

                                      <div
                                        className={`
                                            p-2 rounded-lg relative z-10 
                                            ${timeInfo?.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : timeInfo?.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700'}
                                            flex items-center justify-center w-8 h-8
                                          `}
                                      >
                                        {getLessonIcon(lesson.lesson_type)}
                                      </div>

                                      {timeInfo?.status === 'completed' && (
                                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 z-20">
                                          <IconCheck size={10} className="text-white" />
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>

                                {/* Lesson Info */}
                                <div className="flex-1 min-w-0">
                                  {/* Title + Badges */}
                                  <div className="flex flex-wrap items-center gap-1 mb-1">
                                    <h5 className="text-sm font-medium text-gray-900 dark:text-white break-words">{lesson.lesson_title}</h5>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-1">
                                      {lesson.access_type === 1 && <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shrink-0">FREE</span>}

                                      {isSearchMatch && <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 shrink-0">Khớp</span>}
                                    </div>
                                  </div>

                                  {/* Progress Info */}
                                  {authData && (
                                    <div className="flex items-center gap-2 mt-1">
                                      {loadingProgress ? (
                                        <span className="text-xs text-gray-500">Đang tải...</span>
                                      ) : timeInfo ? (
                                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                          <span
                                            className={`
                                                text-xs font-medium 
                                                ${timeInfo.status === 'completed' ? 'text-green-600 dark:text-green-400' : timeInfo.status === 'in_progress' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}
                                              `}
                                          >
                                            {timeInfo.text}
                                          </span>

                                          {timeInfo.status === 'in_progress' && timeInfo.progressPercentage > 0 && <span className="text-xs text-gray-500">({Math.round(timeInfo.progressPercentage)}%)</span>}
                                        </div>
                                      ) : (
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Chưa học • {lesson.minutes} phút</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Duration */}
                              <div className="col-span-1 flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 shrink-0 text-sm">
                                  <IconClockFilled size={14} className="sm:size-4" />
                                  <span className="font-medium whitespace-nowrap">{lesson.minutes} phút</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <CommentTab courseId={courseId} />
              </div>
            </div>
          </div>
        </main>

        {/* Snackbar thông báo hết hạn */}
        <Snackbar open={expiredSnackbarOpen} autoHideDuration={3000} onClose={() => setExpiredSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="warning" variant="filled">
            Khóa học đã hết hạn vào {expired_date ? new Date(expired_date).toLocaleDateString('vi-VN') : 'Vĩnh viễn'}
          </Alert>
        </Snackbar>

        {/* Modals */}
        <ActivateCourseModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          courseId={courseId}
          onSuccess={() => {
            loadData(); // Refresh data after activation
          }}
        />

        <EM_Login ref={refEM_Login} />
      </div>
    </DefaultLayout>
  );
}
