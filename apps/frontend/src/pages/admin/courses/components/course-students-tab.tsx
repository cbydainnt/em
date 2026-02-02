import { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, TextField, Select, MenuItem, Button, Chip, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Stack, Breadcrumbs, Grid, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { IconUsers, IconCheck, IconAward, IconTrendingUp, IconEye, IconSearch, IconFilter, IconX, IconRefresh, IconChevronLeft, IconInfoCircle,  } from '@tabler/icons-react';
import StudentDetails from './course-students-detail';
import AdminLayout from '../../layout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ROWS_PER_PAGE = 20;

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledDate: string;
  progress: number;
  completedLessons?: number;
  totalLessons?: number;
  finalExam: 'Passed' | 'Failed' | 'Not attempted' | 'Not required' | 'In progress';
  status: 'Active' | 'Completed' | 'Expired';
}
export default function StudentsCourseTab() {
  const [students, setStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const { courseId } = useParams<{ courseId: string }>();

  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    progressRange: '',
    examStatus: '',
  });

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Student | null>(null);

  const fetchStudents = async () => {
    if (!courseId) return;

    setLoading(true);
    try {
      const res = await axios.get(`/api/usercourses/${courseId}/students`, {
        params: {
          page,
          pageSize: ROWS_PER_PAGE,
          search: filters.search || undefined,
          status: filters.status || undefined,
        },
      });

      const studentData = res.data.data.map((s: any) => ({
        id: s.user_id,
        name: s.name,
        email: s.email,
        avatar: s.avatar,
        enrolledDate: s.enrolledDate,
        progress: s.progress,
        completedLessons: s.completedLessons, 
        totalLessons: s.totalLessons, 
        finalExam: s.finalExam || 'Not attempted',
        status: s.status,
      }));

      setAllStudents(studentData);
      setStudents(studentData);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Lỗi khi tải danh sách học viên:', err);
    } finally {
      setLoading(false);
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [courseId, page]);

  // Thêm debounce cho filter để tránh gọi API liên tục
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search || filters.status) {
        setFilterLoading(true);
        fetchStudents();
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [filters.search, filters.status]);

  // Filter students khi filters thay đổi (local filtering)
  useEffect(() => {
    if (allStudents.length === 0) return;

    setFilterLoading(true);

    let filtered = [...allStudents];

    // 1. Filter by search (name or email) 
    if (filters.search && !(filters.search || filters.status)) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((student) => student.name.toLowerCase().includes(searchLower) || student.email.toLowerCase().includes(searchLower));
    }

    // 2. Filter by status
    if (filters.status && !(filters.search || filters.status)) {
      filtered = filtered.filter((student) => student.status === filters.status);
    }

    // 3. Filter by exam status (local filter)
    if (filters.examStatus) {
      filtered = filtered.filter((student) => student.finalExam === filters.examStatus);
    }

    // 4. Filter by progress range (local filter)
    if (filters.progressRange) {
      filtered = filtered.filter((student) => {
        const progress = student.progress;
        switch (filters.progressRange) {
          case '0-25':
            return progress >= 0 && progress <= 25;
          case '25-50':
            return progress > 25 && progress <= 50;
          case '50-75':
            return progress > 50 && progress <= 75;
          case '75-100':
            return progress > 75 && progress <= 100;
          case '100':
            return progress === 100;
          default:
            return true;
        }
      });
    }

    setStudents(filtered);
    setPage(0);
    setFilterLoading(false);
  }, [filters.examStatus, filters.progressRange, allStudents, filters.search, filters.status]);

  /* ================= FILTER FUNCTIONS ================= */
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      progressRange: '',
      examStatus: '',
    });
    // Gọi lại API để lấy tất cả dữ liệu
    setFilterLoading(true);
    fetchStudents();
  };

  const isFilterActive = useMemo(() => {
    return filters.search !== '' || filters.status !== '' || filters.progressRange !== '' || filters.examStatus !== '';
  }, [filters]);

  /* ================= PAGINATION ================= */
  const pagedStudents = useMemo(() => {
    const startIndex = page * ROWS_PER_PAGE;
    return students.slice(startIndex, startIndex + ROWS_PER_PAGE);
  }, [students, page]);

  const totalFilteredCount = students.length;

  /* ================= STATS ================= */
  const stats = useMemo(() => {
    const totalStudents = allStudents.length;
    const completed = allStudents.filter((s) => s.status === 'Completed').length;
    const passed = allStudents.filter((s) => s.finalExam === 'Passed').length;
    const active = allStudents.filter((s) => s.status === 'Active').length;
    const notRequired = allStudents.filter((s) => s.finalExam === 'Not required').length;
    const expired = allStudents.filter((s) => s.status === 'Expired').length;

    // Tính tổng số lesson hoàn thành
    const totalCompletedLessons = allStudents.reduce((sum, student) => sum + (student.completedLessons || 0), 0);

    // Tính tổng số lesson (lấy từ học viên đầu tiên hoặc tính trung bình)
    const avgTotalLessons = allStudents.length > 0 ? allStudents[0].totalLessons || 0 : 0;

    return {
      total: totalStudents,
      completed,
      passed,
      active,
      expired,
      notRequired,
      completionRate: totalStudents > 0 ? Math.round((completed / totalStudents) * 100) : 0,
      totalCompletedLessons,
      avgTotalLessons,
      avgProgress: totalStudents > 0 ? Math.round(allStudents.reduce((sum, s) => sum + s.progress, 0) / totalStudents) : 0,
    };
  }, [allStudents]);

  /* ================= PROGRESS COLOR ================= */
  const getProgressColor = (progress: number) => {
    if (progress < 25) return '#ef4444';
    if (progress < 50) return '#f97316';
    if (progress < 75) return '#eab308';
    if (progress < 100) return '#3b82f6';
    return '#10b981';
  };

  /* ================= STATUS COLOR ================= */
  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'Active':
        return 'primary';
      case 'Completed':
        return 'success';
      case 'Expired':
        return 'error';
      default:
        return 'default';
    }
  };

  /* ================= EXAM COLOR & LABEL ================= */
  const getExamColor = (exam: Student['finalExam']) => {
    switch (exam) {
      case 'Passed':
        return 'success';
      case 'Failed':
        return 'error';
      case 'Not attempted':
        return 'warning';
      case 'Not required':
        return 'info';
      case 'In progress':
        return 'primary'; 
      default:
        return 'default';
    }
  };

  const getExamLabel = (exam: Student['finalExam']) => {
    switch (exam) {
      case 'Passed':
        return 'Đã đậu';
      case 'Failed':
        return 'Đã rớt';
      case 'Not attempted':
        return 'Chưa làm';
      case 'Not required':
        return 'Không yêu cầu';
      case 'In progress':
        return 'Đang làm'; 
      default:
        return exam;
    }
  };
  /* ================= PROGRESS LABEL ================= */
  const getProgressLabel = (progress: number, completedLessons?: number, totalLessons?: number) => {
    if (progress === 0) return 'Chưa bắt đầu';
    if (progress < 25) return 'Mới bắt đầu';
    if (progress < 50) return 'Đang học';
    if (progress < 75) return 'Tiến triển tốt';
    if (progress < 100) return 'Gần hoàn thành';

    // Nếu có thông tin số lesson
    if (completedLessons !== undefined && totalLessons !== undefined) {
      return `Hoàn thành ${completedLessons}/${totalLessons} bài học`;
    }

    return 'Đã hoàn thành';
  };

  /* ================= STATUS LABEL ================= */
  const getStatusLabel = (status: Student['status']) => {
    switch (status) {
      case 'Active':
        return 'Đang học';
      case 'Completed':
        return 'Đã hoàn thành';
      case 'Expired':
        return 'Hết hạn';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {/* Breadcrumb */}
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            mb: 3,
            '.MuiBreadcrumbs-li': {
              display: 'flex',
              alignItems: 'center',
            },
            '.dark &': {
              '& .MuiTypography-root': {
                color: '#9ca3af',
              },
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/manage/courses')}
            color="primary"
            startIcon={<IconChevronLeft size={20} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 2,
              py: 0.5,
              '&:hover': {
                backgroundColor: 'primary.light',
                borderColor: 'primary.main',
              },
              '.dark &': {
                borderColor: '#6b7280',
                color: '#e5e7eb',
                '&:hover': {
                  backgroundColor: '#374151',
                  borderColor: '#9ca3af',
                },
              },
            }}
          >
            Quay lại danh sách khóa học
          </Button>
          <Typography
            color="text.primary"
            sx={{
              fontWeight: 500,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '.dark &': {
                color: '#d1d5db',
              },
            }}
          >
            <IconUsers size={16} />
            Quản lý học viên
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
            sx={{
              '.dark &': {
                color: '#f3f4f6',
              },
            }}
          >
            Quản lý học viên
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              '.dark &': {
                color: '#9ca3af',
              },
            }}
          >
            Tổng quan và quản lý học viên trong khóa học
          </Typography>
        </Box>

        {/* ===== STAT CARDS ===== */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Tổng số học viên" value={stats.total} icon={<IconUsers size={24} />} bgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" iconColor="#ffffff" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Đã hoàn thành" value={stats.completed} total={stats.total} icon={<IconCheck size={24} />} bgColor="linear-gradient(135deg, #10b981 0%, #059669 100%)" iconColor="#ffffff" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Vượt qua kỳ thi" value={stats.passed} total={stats.total - stats.notRequired} icon={<IconAward size={24} />} bgColor="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" iconColor="#ffffff" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Đang học" value={stats.active} total={stats.total} icon={<IconTrendingUp size={24} />} bgColor="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" iconColor="#ffffff" />
          </Grid>
        </Grid>

        {/* ===== FILTERS ===== */}
        <Card
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
            },
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconFilter className="text-gray-500 dark:text-gray-400" size={20} />
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  sx={{
                    '.dark &': {
                      color: '#f3f4f6',
                    },
                  }}
                >
                  Bộ lọc
                </Typography>
                {isFilterActive && (
                  <Chip
                    label={`${totalFilteredCount} kết quả`}
                    size="small"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      '.dark &': {
                        bgcolor: '#8b5cf6',
                        color: 'white',
                      },
                    }}
                  />
                )}
                {(loading || filterLoading) && <CircularProgress size={16} sx={{ ml: 1 }} />}
              </Box>
              {isFilterActive && (
                <Button
                  size="small"
                  onClick={handleResetFilters}
                  startIcon={<IconRefresh size={16} />}
                  sx={{
                    textTransform: 'none',
                    '.dark &': {
                      color: '#d1d5db',
                      borderColor: '#4b5563',
                      '&:hover': {
                        borderColor: '#6b7280',
                      },
                    },
                  }}
                >
                  Đặt lại
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  placeholder="Tìm theo tên hoặc email"
                  size="small"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size={20} className="text-gray-500 dark:text-gray-400" />
                      </InputAdornment>
                    ),
                    endAdornment: filters.search && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => handleFilterChange('search', '')}
                          edge="end"
                          sx={{
                            '.dark &': {
                              color: '#9ca3af',
                              '&:hover': {
                                bgcolor: '#374151',
                              },
                            },
                          }}
                        >
                          <IconX size={16} />
                        </IconButton>
                      </InputAdornment>
                    ),
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.status}
                  displayEmpty
                  disabled={loading}
                  onChange={(e) => handleFilterChange('status', e.target.value as string)}
                  sx={{
                    bgcolor: '#fff',
                    color: '#111827',
                    borderRadius: 1,

                    // border
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },

                    // icon mũi tên
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
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
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // MenuItem hover
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // MenuItem selected
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem
                    value=""
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Tất cả trạng thái
                  </MenuItem>
                  <MenuItem
                    value="Active"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Đang học
                  </MenuItem>
                  <MenuItem
                    value="Completed"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Đã hoàn thành
                  </MenuItem>
                  <MenuItem
                    value="Expired"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Hết hạn
                  </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.progressRange}
                  displayEmpty
                  disabled={loading}
                  onChange={(e) => handleFilterChange('progressRange', e.target.value as string)}
                  sx={{
                    bgcolor: '#fff',
                    color: '#111827',
                    borderRadius: 1,

                    // border
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },

                    // icon mũi tên
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
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
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // MenuItem hover
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // MenuItem selected
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem
                    value=""
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Mọi tiến độ
                  </MenuItem>
                  <MenuItem
                    value="0-25"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    0–25% (Mới bắt đầu)
                  </MenuItem>
                  <MenuItem
                    value="25-50"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    25–50% (Đang học)
                  </MenuItem>
                  <MenuItem
                    value="50-75"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    50–75% (Tiến triển)
                  </MenuItem>
                  <MenuItem
                    value="75-100"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    75–100% (Gần hoàn thành)
                  </MenuItem>
                  <MenuItem
                    value="100"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    100% (Đã hoàn thành)
                  </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Select
                  fullWidth
                  size="small"
                  value={filters.examStatus}
                  displayEmpty
                  disabled={loading}
                  onChange={(e) => handleFilterChange('examStatus', e.target.value as string)}
                  sx={{
                    bgcolor: '#fff',
                    color: '#111827',
                    borderRadius: 1,

                    // border
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },

                    // icon mũi tên
                    '& .MuiSelect-icon': {
                      color: '#6b7280',
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
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#fff',
                        color: '#111827',

                        '.dark &': {
                          bgcolor: '#1f2937',
                          color: '#f3f4f6',
                        },

                        // MenuItem hover
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: '#e5e7eb',
                        },
                        '.dark & .MuiMenuItem-root:hover': {
                          bgcolor: '#374151',
                        },

                        // MenuItem selected
                        '& .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#e0e7ff',
                        },
                        '.dark & .MuiMenuItem-root.Mui-selected': {
                          bgcolor: '#312e81',
                        },
                      },
                    },
                  }}
                >
                  <MenuItem
                    value=""
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Tất cả kỳ thi
                  </MenuItem>
                  <MenuItem
                    value="Passed"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Đã đậu
                  </MenuItem>
                  <MenuItem
                    value="Failed"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Đã rớt
                  </MenuItem>
                  <MenuItem
                    value="Not attempted"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Chưa làm
                  </MenuItem>
                  <MenuItem
                    value="Not required"
                    sx={{
                      '.dark &': {
                        bgcolor: '#1f2937',
                        color: '#d1d5db',
                        '&:hover': {
                          bgcolor: '#374151',
                        },
                      },
                    }}
                  >
                    Không yêu cầu
                  </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleResetFilters}
                  disabled={loading}
                  startIcon={<IconRefresh size={16} />}
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'none',
                    height: '40px',
                    '.dark &': {
                      color: '#d1d5db',
                      borderColor: '#4b5563',
                      '&:hover': {
                        borderColor: '#6b7280',
                      },
                      '&.Mui-disabled': {
                        color: '#6b7280',
                        borderColor: '#374151',
                      },
                    },
                  }}
                >
                  Đặt lại bộ lọc
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ===== TABLE ===== */}
        <Card
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            '.dark &': {
              bgcolor: '#1f2937',
              border: '1px solid #374151',
            },
          }}
        >
          <Box sx={{ overflowX: 'auto' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <CircularProgress />
              </Box>
            ) : pagedStudents.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {filterLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      }}
                    >
                      {isFilterActive ? 'Không tìm thấy học viên nào phù hợp với bộ lọc' : 'Chưa có học viên nào trong khóa học này'}
                    </Typography>
                    {isFilterActive && (
                      <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        startIcon={<IconRefresh size={16} />}
                        sx={{
                          textTransform: 'none',
                          '.dark &': {
                            color: '#d1d5db',
                            borderColor: '#4b5563',
                            '&:hover': {
                              borderColor: '#6b7280',
                            },
                          },
                        }}
                      >
                        Đặt lại bộ lọc
                      </Button>
                    )}
                  </>
                )}
              </Box>
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        '.dark &': {
                          backgroundColor: '#111827',
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          py: 2,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#374151',
                          },
                        }}
                      >
                        Học viên
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          py: 2,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#374151',
                          },
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          py: 2,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#374151',
                          },
                        }}
                      >
                        Tiến độ khóa học
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          py: 2,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#374151',
                          },
                        }}
                      >
                        Thi cuối kỳ
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          py: 2,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#374151',
                          },
                        }}
                      >
                        Trạng thái
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          py: 2,
                          '.dark &': {
                            color: '#f3f4f6',
                            borderColor: '#374151',
                          },
                        }}
                        align="center"
                      >
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {pagedStudents.map((s) => (
                      <TableRow
                        key={s.id}
                        hover
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                          '&:last-child td': {
                            borderBottom: 0,
                          },
                          '.dark &': {
                            borderColor: '#374151',
                            '&:hover': {
                              backgroundColor: '#374151',
                            },
                          },
                        }}
                        onClick={() => setSelected(s)}
                      >
                        <TableCell sx={{ py: 2 }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                              src={s.avatar && s.avatar.includes('http') ? `${s.avatar}` : s.avatar ? `/api/user/image/${s.avatar}` : undefined}
                              sx={{
                                bgcolor: getProgressColor(s.progress),
                                fontWeight: 500,
                                '.dark &': {
                                  color: 'white',
                                },
                              }}
                            >
                              {s.name[0]}
                            </Avatar>
                            <Box>
                              <Typography
                                fontWeight={500}
                                sx={{
                                  '.dark &': {
                                    color: '#f3f4f6',
                                  },
                                }}
                              >
                                {s.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'text.secondary',
                                  '.dark &': {
                                    color: '#9ca3af',
                                  },
                                }}
                              >
                                Đăng ký: {s.enrolledDate}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              '.dark &': {
                                color: '#d1d5db',
                              },
                            }}
                          >
                            {s.email}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ py: 2, minWidth: 200 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              variant="body2"
                              fontWeight={500}
                              sx={{
                                '.dark &': {
                                  color: '#f3f4f6',
                                },
                              }}
                            >
                              {s.progress}%
                            </Typography>
                            <Box sx={{ flex: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={s.progress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: 'grey.200',
                                  '.dark &': {
                                    backgroundColor: '#374151',
                                  },
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: getProgressColor(s.progress),
                                    borderRadius: 4,
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              '.dark &': {
                                color: '#9ca3af',
                              },
                            }}
                          >
                            {getProgressLabel(s.progress, s.completedLessons, s.totalLessons)}
                          </Typography>
                          {/* Hiển thị số lesson hoàn thành nếu có */}
                          {/* {s.completedLessons !== undefined && s.totalLessons !== undefined && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.secondary',
                                display: 'block',
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              }}
                            >
                              {s.completedLessons}/{s.totalLessons} bài học
                            </Typography>
                          )} */}
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Chip
                            label={getExamLabel(s.finalExam)}
                            color={getExamColor(s.finalExam)}
                            size="small"
                            sx={{
                              fontWeight: 500,
                              borderRadius: 1,
                              minWidth: 100,
                              '.dark &': {
                                '&.MuiChip-colorSuccess': {
                                  bgcolor: '#10b981',
                                  color: 'white',
                                },
                                '&.MuiChip-colorError': {
                                  bgcolor: '#ef4444',
                                  color: 'white',
                                },
                                '&.MuiChip-colorWarning': {
                                  bgcolor: '#f59e0b',
                                  color: 'white',
                                },
                                '&.MuiChip-colorInfo': {
                                  bgcolor: '#3b82f6',
                                  color: 'white',
                                },
                              },
                            }}
                            icon={s.finalExam === 'Not required' ? <IconInfoCircle size={14} /> : undefined}
                          />
                        </TableCell>

                        <TableCell sx={{ py: 2 }}>
                          <Chip
                            label={getStatusLabel(s.status)}
                            color={getStatusColor(s.status)}
                            size="small"
                            sx={{
                              fontWeight: 500,
                              borderRadius: 1,
                              minWidth: 100,
                              '.dark &': {
                                '&.MuiChip-colorPrimary': {
                                  bgcolor: '#8b5cf6',
                                  color: 'white',
                                },
                                '&.MuiChip-colorSuccess': {
                                  bgcolor: '#10b981',
                                  color: 'white',
                                },
                                '&.MuiChip-colorError': {
                                  bgcolor: '#ef4444',
                                  color: 'white',
                                },
                              },
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ py: 2 }} align="center">
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<IconEye size={16} />}
                            sx={{
                              borderRadius: 1.5,
                              textTransform: 'none',
                              minWidth: 100,
                              '.dark &': {
                                color: '#d1d5db',
                                borderColor: '#4b5563',
                                '&:hover': {
                                  borderColor: '#6b7280',
                                  backgroundColor: '#374151',
                                },
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(s);
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <TablePagination
                  component="div"
                  count={totalFilteredCount}
                  page={page}
                  onPageChange={(_, p) => setPage(p)}
                  rowsPerPage={ROWS_PER_PAGE}
                  rowsPerPageOptions={[ROWS_PER_PAGE]}
                  labelRowsPerPage="Số dòng mỗi trang:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count} học viên`}
                  sx={{
                    '.dark &': {
                      color: '#d1d5db',
                      borderTop: '1px solid #374151',
                      '& .MuiTablePagination-selectIcon': {
                        color: '#d1d5db',
                      },
                      '& .MuiTablePagination-actions .MuiIconButton-root': {
                        color: '#d1d5db',
                        '&.Mui-disabled': {
                          color: '#6b7280',
                        },
                      },
                    },
                  }}
                />
              </>
            )}
          </Box>
        </Card>

        <StudentDetails student={selected} onClose={() => setSelected(null)} />
      </Box>
    </AdminLayout>
  );
}

/* ===== STAT CARD COMPONENT ===== */
interface StatCardProps {
  label: string;
  value: number;
  total?: number;
  icon: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  progressValue?: number;
  progressLabel?: string;
}

function StatCard({ label, value, total, icon, bgColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', iconColor = '#ffffff', progressValue, progressLabel }: StatCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        background: bgColor,
        color: '#ffffff',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                mb: 0.5,
                fontSize: '0.875rem',
              }}
            >
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {value}
              {total !== undefined && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: '1rem',
                    opacity: 0.8,
                    ml: 0.5,
                  }}
                >
                  / {total}
                </Typography>
              )}
            </Typography>
            {progressValue !== undefined && (
              <Box sx={{ mt: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressValue}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ffffff',
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    display: 'block',
                    opacity: 0.9,
                  }}
                >
                  {progressLabel || `${progressValue}%`}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 2,
            }}
          >
            <Box sx={{ color: iconColor }}>{icon}</Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
