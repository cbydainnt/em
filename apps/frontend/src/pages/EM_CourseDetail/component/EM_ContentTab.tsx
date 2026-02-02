import { useState, useEffect, useRef, useMemo } from 'react';
import { IconChevronDown, IconChevronRight, IconBrandYoutube, IconClockFilled, IconFileText, IconHelpCircle, IconSearch, IconX, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Snackbar, Alert, TextField, InputAdornment, CircularProgress, LinearProgress, Tooltip } from '@mui/material';
import { ActivateCourseModal } from './EM_ActivateCourseModal';
import { useAuthStore } from '@/hooks/useAuthStore';
import EM_Login from '@/components/EM_Login';
import { useCourseStatus } from '@/hooks/useCourseStatus';
import { toSlug } from '@/helpers/SeoHelper';

interface Lesson {
  lesson_id: string;
  lesson_title: string;
  access_type: number;
  lesson_type: number;
  minutes: number;
}

interface Section {
  section_id: string;
  section_title: string;
  lessons: Lesson[];
}

interface ContentTabProps {
  courseId: string;
  courseName: string;
  showSectionFilter?: boolean;
  defaultSectionId?: string;
  refreshKey: number;
  onActivated?: () => void;
  showSearch?: boolean;
  showProgress?: boolean;
}

export function ContentTab({ courseId, courseName, showSectionFilter = false, defaultSectionId, onActivated, refreshKey, showSearch = true, showProgress = true }: ContentTabProps) {
  const navigate = useNavigate();
  const [expiredSnackbarOpen, setExpiredSnackbarOpen] = useState(false);
  const [reservedRSnackbarOpen, setReservedRSnackbarOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [openUnits, setOpenUnits] = useState<string[]>(defaultSectionId ? [defaultSectionId] : []);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [userCourseStatus, setUserCourseStatus] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [courseProgress, setCourseProgress] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(false);

  const { expired_date } = useCourseStatus(courseId);
  const { authData } = useAuthStore();
  const currentUserId = authData?.id || null;
  const refEM_Login = useRef<any>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`/api/course/sections/${courseId}`);
        const data = await res.json();
        setSections(data);
      } catch (err) {
        console.error('Error fetching sections:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProgress = async () => {
      if (!showProgress || !authData?.id) return;

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

    const fetchUserCourseStatus = async () => {
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

    fetchSections();
    fetchProgress();
    fetchUserCourseStatus();
  }, [courseId, refreshKey, currentUserId, showProgress]);

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

    // Trường hợp 1: Đã hoàn thành (completed = 2 hoặc true)
    if (completed) {
      return {
        status: 'completed',
        text: 'Đã hoàn thành',
        watchedMinutes,
        totalMinutes,
        progressPercentage: 100,
      };
    }
    // Trường hợp 2: Đang học (đã xem nhưng chưa hoàn thành)
    else if (watchedMinutes > 0) {
      const progressPercentage = totalMinutes > 0 ? Math.min(100, (watchedMinutes / totalMinutes) * 100) : 0;

      return {
        status: 'in_progress',
        text: `${watchedMinutes} phút / ${totalMinutes} phút`,
        watchedMinutes,
        totalMinutes,
        progressPercentage,
      };
    }
    // Trường hợp 3: Chưa học
    else {
      return {
        status: 'not_started',
        text: `Chưa học • ${totalMinutes} phút`,
        watchedMinutes: 0,
        totalMinutes,
        progressPercentage: 0,
      };
    }
  };

  useEffect(() => {
    if (sections.length > 0) {
      // Lấy tất cả section có bài học > 0
      const sectionsWithLessons = sections.filter((s) => s.lessons && s.lessons.length > 0).map((s) => s.section_id);

      setOpenUnits(sectionsWithLessons);

      // Nếu có defaultSectionId thì vẫn ưu tiên highlight selectedSection
      if (defaultSectionId && sections.some((s) => s.section_id === defaultSectionId)) {
        setSelectedSection(defaultSectionId);
      }
    }
  }, [sections, defaultSectionId]);

  const toggleUnit = (id: string) => {
    setOpenUnits((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleClickLesson = (lesson: Lesson, section: Section) => {
    if (!authData && lesson.access_type !== 1) {
      refEM_Login.current.show();
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
      if (userCourseStatus === 3) {
        setReservedRSnackbarOpen(true);
        return;
      }
      setShowModal(true);
      return;
    }

    navigate(`/bai-hoc/${slug}`, {
      state: {
        lessonId: lesson.lesson_id,
        courseId,
        courseName,
        sectionId: section.section_id,
        sectionName: section.section_title,
      },
    });
  };

  const handleSectionChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedSection(value);
    if (value !== 'all') {
      setOpenUnits([value]);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setIsSearching(value.trim().length > 0);

    if (value.trim().length > 0) {
      const allSectionIds = sections.map((s) => s.section_id);
      setOpenUnits(allSectionIds);
    } else if (defaultSectionId) {
      setOpenUnits([defaultSectionId]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    if (defaultSectionId) {
      setOpenUnits([defaultSectionId]);
    }
  };

  const filteredSections = useMemo(() => {
    let filtered = selectedSection === 'all' ? sections : sections.filter((s) => s.section_id === selectedSection);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered
        .map((section) => {
          const filteredLessons = section.lessons.filter((lesson) => lesson.lesson_title.toLowerCase().includes(query) || section.section_title.toLowerCase().includes(query));

          if (filteredLessons.length > 0 || section.section_title.toLowerCase().includes(query)) {
            return { ...section, lessons: filteredLessons };
          }
          return null;
        })
        .filter(Boolean) as Section[];
    }

    return filtered;
  }, [sections, selectedSection, searchQuery]);

  const getLessonIcon = (lessonType: number) => {
    switch (lessonType) {
      case 0:
        return <IconBrandYoutube className="h-4 w-4 text-red-500" />;
      case 1:
        return <IconFileText className="h-4 w-4 text-blue-500" />;
      case 2:
        return <IconHelpCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );

  if (sections.length === 0) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Chưa có bài học nào trong khóa học này.</div>;
  }

  return (
    <div className="">
      {/* Header với tìm kiếm */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
        <Typography variant="h6" className="text-xl font-bold text-gray-900 dark:text-white">
          Nội dung khóa học
        </Typography>

        <div className="flex flex-wrap gap-3 dark:text-white">
          {showSearch && (
            <TextField
              size="small"
              placeholder="Tìm kiếm bài học..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="dark:text-white"
              sx={{
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
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconX className="cursor-pointer text-gray-400 hover:text-gray-600" size={18} onClick={clearSearch} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {showSectionFilter && (
            <FormControl size="small" sx={{ minWidth: 300, maxWidth: 300 }}>
              <InputLabel className="dark:text-white" id="section-select-label">
                Lọc theo chương
              </InputLabel>

              <Select
                labelId="section-select-label"
                value={selectedSection}
                onChange={handleSectionChange}
                label="Lọc theo chương"
                sx={{
                  width: 300, // 👈 Cố định độ rộng
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
              >
                <MenuItem value="all">Tất cả chương</MenuItem>

                {sections.map((s) => (
                  <MenuItem
                    key={s.section_id}
                    value={s.section_id}
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
                    <Tooltip
                      title={s.section_title}
                      placement="right"
                      slotProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: 'white',
                            color: 'black',
                            fontSize: '0.85rem',
                            border: '1px solid #ddd',
                            boxShadow: 2,
                          },
                        },
                        arrow: {
                          sx: {
                            color: 'white',
                          },
                        },
                      }}
                      arrow
                    >
                      <span className="truncate max-w-[300px] block">{s.section_title}</span>
                    </Tooltip>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
      </div>

      {/* Course Progress Summary */}
      {showProgress && authData && userCourseStatus === 1 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 border border-blue-100 dark:border-gray-700 mt-6">
          {loadingProgress ? (
            <div className="flex items-center justify-center py-4">
              <CircularProgress size={24} />
              <span className="ml-3 text-gray-600 dark:text-gray-300">Đang tải tiến độ...</span>
            </div>
          ) : courseProgress ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Tiến độ của bạn</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {courseProgress.overall.completed_lessons}/{courseProgress.overall.total_lessons} bài học đã hoàn thành
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{Math.round(courseProgress.overall.overall_completion_percentage)}%</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hoàn thành</p>
                  </div>
                </div>
              </div>

              <LinearProgress
                variant="determinate"
                value={courseProgress.overall.overall_completion_percentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mt: 2,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 4,
                  },
                }}
              />
            </>
          ) : (
            <div className="text-center py-3 text-gray-500 dark:text-gray-400">Chưa có dữ liệu tiến độ</div>
          )}
        </div>
      )}

      {/* Danh sách sections */}
      <div className="space-y-3">
        {filteredSections.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 ">
            <IconSearch size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">{isSearching ? 'Không tìm thấy bài học nào phù hợp' : 'Không có nội dung để hiển thị'}</p>
            {isSearching && <p className="text-sm mt-1">Hãy thử từ khóa tìm kiếm khác</p>}
          </div>
        ) : (
          filteredSections.map((section) => (
            <div key={section.section_id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow mt-6">
              {/* Section Header */}
              <button onClick={() => toggleUnit(section.section_id)} className="w-full px-5 py-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-1 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {section.section_title}
                        {section.section_title.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery && <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">Khớp</span>}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {section.lessons.length} bài học • {section.lessons.reduce((sum, l) => sum + (l.minutes || 0), 0)} phút
                      </p>
                    </div>

                    {/* Progress bên phải SectionName */}
                    {showProgress && getSectionProgress(section.section_id) && (
                      <div className="flex items-center gap-3">
                        {getSectionProgress(section.section_id)?.stats.completion_percentage === 100 && (
                          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-sm">
                            <IconCheck size={14} className="inline mr-1" />
                            Hoàn thành
                          </div>
                        )}
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                          <div className={`w-2 h-2 rounded-full ${getSectionProgress(section.section_id)?.stats.completion_percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`} />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {getSectionProgress(section.section_id)?.stats.completed_lessons}/{section.lessons.length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-4">{openUnits.includes(section.section_id) ? <IconChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : <IconChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />}</div>
              </button>

              {/* Lessons List */}
              {openUnits.includes(section.section_id) && section.lessons.length > 0 && (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {section.lessons.map((lesson, idx) => {
                    const isLessonMatch = searchQuery && lesson.lesson_title.toLowerCase().includes(searchQuery.toLowerCase());
                    const progress = showProgress ? getLessonProgress(lesson.lesson_id, section.section_id) : null;
                    const timeInfo = progress ? formatWatchedTime(progress, lesson.minutes) : null;

                    return (
                      <div
                        key={`${lesson.lesson_id}-${idx}`}
                        onClick={() => handleClickLesson(lesson, section)}
                        className="
            grid grid-cols-1 sm:grid-cols-10 
            items-start sm:items-center 
            px-4 sm:px-5 py-3 sm:py-4 
            hover:bg-gray-50 dark:hover:bg-gray-700/50 
            cursor-pointer transition-colors 
            gap-3 sm:gap-0
          "
                      >
                        {/* Main Content - Takes full width on mobile, 9 columns on desktop */}
                        <div className="col-span-1 sm:col-span-9 flex items-start sm:items-center gap-3 sm:gap-4 w-full">
                          {/* Lesson Icon với progress circle */}
                          <div className="relative flex-shrink-0">
                            {loadingProgress ? (
                              <div className="w-8 h-8 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                              </div>
                            ) : (
                              <>
                                {/* Progress circle chỉ hiển thị khi đang học */}
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

                          {/* Lesson Info - Flex column on mobile, row on desktop */}
                          <div className="flex-1 min-w-0">
                            {/* Title + Badges */}
                            <div className="flex flex-wrap items-center gap-1 mb-1">
                              <h5 className="text-sm font-medium text-gray-900 dark:text-white break-words">{lesson.lesson_title}</h5>

                              {/* Badges - Wrap on mobile */}
                              <div className="flex flex-wrap gap-1">
                                {lesson.access_type === 1 && <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 shrink-0">FREE</span>}
                                {lesson.lesson_type === 2 && <span className="px-2 py-0.5 text-xs rounded-yellow bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 shrink-0">QUIZ</span>}

                                {isLessonMatch && <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 shrink-0">Khớp</span>}
                              </div>
                            </div>

                            {/* Progress info với tiến độ chi tiết */}
                            {showProgress && (
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

                                    {/* Hiển thị % tiến độ khi đang học */}
                                    {timeInfo.status === 'in_progress' && timeInfo.progressPercentage > 0 && <span className="text-xs text-gray-500">({Math.round(timeInfo.progressPercentage)}%)</span>}
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Chưa học • {lesson.minutes} phút</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Duration và progress indicator - Takes full width on mobile, 1 column on desktop */}
                        <div
                          className="
            col-span-1 
            flex items-center justify-between sm:justify-end 
            gap-2 sm:gap-3 
            w-full sm:w-auto
            pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-700
          "
                        >
                          {/* Hiển thị tỷ lệ phút đã học khi đang học (uncomment nếu cần)
            {showProgress && !loadingProgress && timeInfo?.status === 'in_progress' && timeInfo.watchedMinutes > 0 && (
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {timeInfo.watchedMinutes}/{timeInfo.totalMinutes}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">phút</div>
              </div>
            )} */}

                          {/* Tổng thời gian bài học - luôn hiển thị */}
                          <div
                            className="
              flex items-center gap-1 sm:gap-2 
              text-gray-600 dark:text-gray-400 
              shrink-0
              text-sm
            "
                          >
                            <IconClockFilled size={14} className="sm:size-4" />
                            <span className="font-medium whitespace-nowrap">{lesson.minutes} phút</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {openUnits.includes(section.section_id) && section.lessons.length === 0 && (
                <div className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                  <IconHelpCircle size={32} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm">{isSearching ? 'Không có bài học nào khớp với tìm kiếm' : 'Không có bài học nào trong chương này'}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Snackbar thông báo hết hạn */}
      <Snackbar open={expiredSnackbarOpen} autoHideDuration={3000} onClose={() => setExpiredSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="warning" variant="filled">
          Khóa học đã hết hạn vào {expired_date ? new Date(expired_date).toLocaleDateString('vi-VN') : 'Vĩnh viễn'}
        </Alert>
      </Snackbar>
      <Snackbar open={reservedRSnackbarOpen} autoHideDuration={3000} onClose={() => setReservedRSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="warning" variant="filled">
          Khóa học đang trong thời gian bảo lưu. Hủy bảo lưu để tiếp tục học.
        </Alert>
      </Snackbar>

      <ActivateCourseModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        courseId={courseId}
        onSuccess={() => {
          onActivated?.();
        }}
      />

      <EM_Login ref={refEM_Login} />
    </div>
  );
}
