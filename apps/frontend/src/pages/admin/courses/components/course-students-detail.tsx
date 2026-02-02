import { Drawer, Box, Typography, Avatar, Chip, LinearProgress, Stack, IconButton, Divider, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Alert } from '@mui/material';
import { IconX, IconMail, IconCalendar, IconBook, IconCheck, IconAlertCircle, IconClock, IconChartBar, IconFileText, IconTrendingUp, IconChecklist } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Student } from './course-students-tab';
import { useParams } from 'react-router-dom';

interface Props {
  student: Student | null;
  onClose: () => void;
}

interface ModuleProgress {
  section_id: string;
  name: string;
  completedLessons: number;
  totalLessons: number;
  progress: number;
  status: 'Not started' | 'In progress' | 'Completed';
}

interface Activity {
  date: Date;
  type: 'LESSON' | 'QUIZ';
  title: string;
  score?: string;
}

interface StudentDetailData {
  student: {
    user_id: string;
    name: string;
    email: string;
    avatar: string;
    enrolledDate: Date;
    status: 'Active' | 'Completed' | 'Expired';
    progress: number;
    finalExam: 'Passed' | 'Failed' | 'Not attempted' | 'Not required' | 'In progress';
  };
  statistics: {
    estimatedHours: number;
    avgProgressPerDay: number;
    daysSinceEnrollment: number;
  };
  modules: ModuleProgress[];
  activities: Activity[];
}

export default function StudentDetails({ student, onClose }: Props) {
  const { courseId } = useParams<{ courseId: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StudentDetailData | null>(null);

  useEffect(() => {
    if (student && courseId) {
      fetchStudentDetail();
    }
  }, [student, courseId]);

  const fetchStudentDetail = async () => {
    if (!student || !courseId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/usercourses/${courseId}/students/${student.id}`);
      setData(response.data);
    } catch (err: any) {
      console.error('Error fetching student details:', err);
      setError(err.response?.data?.message || 'Không thể tải thông tin học viên');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return '#ef4444';
    if (progress < 50) return '#f97316';
    if (progress < 75) return '#eab308';
    if (progress < 100) return '#3b82f6';
    return '#10b981';
  };

  // Chỉnh sửa hàm getStatusColor để dùng màu từ component cha
  const getStatusColor = (status: 'Active' | 'Completed' | 'Expired') => {
    switch (status) {
      case 'Active':
        return 'primary'; // Sẽ hiển thị màu chủ đạo (#8b5cf6)
      case 'Completed':
        return 'success'; // Sẽ hiển thị màu xanh (#10b981)
      case 'Expired':
        return 'error'; // Sẽ hiển thị màu đỏ (#ef4444)
      default:
        return 'default';
    }
  };

  // Chỉnh sửa hàm getExamColor để dùng màu từ component cha
  const getExamColor = (exam: 'Passed' | 'Failed' | 'Not attempted' | 'Not required' | 'In progress') => {
    switch (exam) {
      case 'Passed':
        return 'success'; // Màu xanh (#10b981)
      case 'Failed':
        return 'error'; // Màu đỏ (#ef4444)
      case 'Not attempted':
        return 'warning'; // Màu vàng (#f59e0b)
      case 'Not required':
        return 'info'; // Màu xanh dương (#3b82f6)
      case 'In progress':
        return 'primary'; // Màu chủ đạo (#8b5cf6)
      default:
        return 'default';
    }
  };

  // Hàm chuyển đổi trạng thái sang tiếng Việt
  const getStatusLabel = (status: 'Active' | 'Completed' | 'Expired') => {
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

  // Hàm chuyển đổi trạng thái thi sang tiếng Việt
  const getExamLabel = (exam: 'Passed' | 'Failed' | 'Not attempted' | 'Not required' | 'In progress') => {
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

  const getModuleIcon = (status: ModuleProgress['status']) => {
    switch (status) {
      case 'Completed':
        return <IconCheck size={20} color="#10b981" className="dark:text-green-400" />;
      case 'In progress':
        return <IconTrendingUp size={20} color="#3b82f6" className="dark:text-blue-400" />;
      case 'Not started':
        return <IconAlertCircle size={20} color="#9ca3af" className="dark:text-gray-400" />;
      default:
        return <IconBook size={20} className="dark:text-gray-300" />;
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'LESSON':
        return <IconBook size={20} className="dark:text-gray-300" />;
      case 'QUIZ':
        return <IconChecklist size={20} className="dark:text-gray-300" />;
      default:
        return <IconFileText size={20} className="dark:text-gray-300" />;
    }
  };

  const getProgressLabel = (progress: number) => {
    if (progress < 25) return 'Mới bắt đầu';
    if (progress < 50) return 'Đang học';
    if (progress < 75) return 'Tiến triển tốt';
    if (progress < 100) return 'Gần hoàn thành';
    return 'Đã hoàn thành';
  };

  if (!student) return null;

  return (
    <Drawer
      anchor="right"
      open={!!student}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          bgcolor: 'background.default',
          '.dark &': {
            bgcolor: '#1f2937',
            borderLeft: '1px solid #374151',
          },
        },
      }}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
            '.dark &': {
              bgcolor: '#111827',
              borderColor: '#374151',
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                '.dark &': {
                  color: '#f3f4f6',
                },
              }}
            >
              Chi tiết học viên
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                '.dark &': {
                  color: '#9ca3af',
                  '&:hover': {
                    bgcolor: '#374151',
                  },
                },
              }}
            >
              <IconX size={20} />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={student.avatar && student.avatar.includes('http') ? `${student.avatar}` : student.avatar ? `/api/user/image/${student.avatar}` : undefined}
              sx={{
                width: 64,
                height: 64,
                bgcolor: getProgressColor(student.progress),
                fontSize: '1.5rem',
                fontWeight: 600,
                '.dark &': {
                  color: 'white',
                },
              }}
            >
              {student.name[0]}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  '.dark &': {
                    color: '#f3f4f6',
                  },
                }}
              >
                {student.name}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconMail size={16} className="text-gray-500 dark:text-gray-400" />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  }}
                >
                  {student.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
                <IconCalendar size={16} className="text-gray-500 dark:text-gray-400" />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    '.dark &': {
                      color: '#9ca3af',
                    },
                  }}
                >
                  Đăng ký: {formatDate(student.enrolledDate)}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            '.dark &': {
              bgcolor: '#1f2937',
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                '.dark &': {
                  bgcolor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                },
              }}
            >
              {error}
              <Button
                size="small"
                onClick={fetchStudentDetail}
                sx={{
                  ml: 1,
                  '.dark &': {
                    color: '#fca5a5',
                    borderColor: '#ef4444',
                    '&:hover': {
                      bgcolor: 'rgba(239, 68, 68, 0.1)',
                    },
                  },
                }}
              >
                Thử lại
              </Button>
            </Alert>
          ) : data ? (
            <>
              {/* Progress Section */}
              <Card
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '.dark &': {
                    bgcolor: '#374151',
                    border: '1px solid #4b5563',
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        '.dark &': {
                          color: '#f3f4f6',
                        },
                      }}
                    >
                      Tiến độ học tập
                    </Typography>
                    <Chip
                      label={getProgressLabel(data.student.progress)}
                      size="small"
                      sx={{
                        bgcolor: `${getProgressColor(data.student.progress)}15`,
                        color: getProgressColor(data.student.progress),
                        fontWeight: 500,
                        '.dark &': {
                          bgcolor: `${getProgressColor(data.student.progress)}25`,
                          color: getProgressColor(data.student.progress),
                        },
                      }}
                    />
                  </Stack>

                  <Stack spacing={2}>
                    <Box>
                      <Stack direction="row" justifyContent="space-between" mb={0.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            '.dark &': {
                              color: '#9ca3af',
                            },
                          }}
                        >
                          Tổng tiến độ
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{
                            '.dark &': {
                              color: '#f3f4f6',
                            },
                          }}
                        >
                          {data.student.progress}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={data.student.progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '.dark &': {
                            bgcolor: '#4b5563',
                          },
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(data.student.progress),
                            borderRadius: 5,
                          },
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Stack spacing={0.5}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconClock size={16} className="text-gray-500 dark:text-gray-400" />
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              }}
                            >
                              Thời gian ước tính
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            {data.statistics.estimatedHours} giờ
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={0.5}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconChartBar size={16} className="text-gray-500 dark:text-gray-400" />
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                '.dark &': {
                                  color: '#9ca3af',
                                },
                              }}
                            >
                              Tốc độ học
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{
                              '.dark &': {
                                color: '#f3f4f6',
                              },
                            }}
                          >
                            {data.statistics.avgProgressPerDay.toFixed(1)}%/ngày
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>

              {/* Status & Stats */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      height: '100%',
                      '.dark &': {
                        bgcolor: '#374151',
                        border: '1px solid #4b5563',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                        Trạng thái khóa học
                      </Typography>
                      <Chip
                        label={getStatusLabel(data.student.status)}
                        color={getStatusColor(data.student.status)}
                        sx={{
                          fontWeight: 600,
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
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      height: '100%',
                      '.dark &': {
                        bgcolor: '#374151',
                        border: '1px solid #4b5563',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                        Kết quả thi cuối kỳ
                      </Typography>
                      <Chip
                        label={getExamLabel(data.student.finalExam)}
                        color={getExamColor(data.student.finalExam)}
                        sx={{
                          fontWeight: 600,
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
                            '&.MuiChip-colorPrimary': {
                              bgcolor: '#8b5cf6',
                              color: 'white',
                            },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Course Modules */}
              <Card
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '.dark &': {
                    bgcolor: '#374151',
                    border: '1px solid #4b5563',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      '.dark &': {
                        color: '#f3f4f6',
                      },
                    }}
                  >
                    Tiến độ từng chương ({data.modules.length})
                  </Typography>
                  <List disablePadding>
                    {data.modules.map((module, index) => (
                      <Box key={module.section_id}>
                        <ListItem disableGutters sx={{ py: 1.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>{getModuleIcon(module.status)}</ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                fontWeight={500}
                                sx={{
                                  '.dark &': {
                                    color: '#d1d5db',
                                  },
                                }}
                              >
                                {module.name}
                              </Typography>
                            }
                            secondary={
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: 'text.secondary',
                                    '.dark &': {
                                      color: '#9ca3af',
                                    },
                                  }}
                                >
                                  {module.status === 'Not started' ? 'Chưa bắt đầu' : module.status === 'In progress' ? 'Đang học' : 'Hoàn thành'}
                                </Typography>
                                <Box sx={{ flex: 1, maxWidth: 100 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={module.progress}
                                    sx={{
                                      height: 4,
                                      borderRadius: 2,
                                      bgcolor: 'grey.200',
                                      '.dark &': {
                                        bgcolor: '#4b5563',
                                      },
                                      '& .MuiLinearProgress-bar': {
                                        bgcolor: module.progress === 100 ? '#10b981' : '#3b82f6',
                                      },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  variant="caption"
                                  fontWeight={500}
                                  sx={{
                                    '.dark &': {
                                      color: '#d1d5db',
                                    },
                                  }}
                                >
                                  {module.progress}%
                                </Typography>
                              </Stack>
                            }
                          />
                        </ListItem>
                        {index < data.modules.length - 1 && (
                          <Divider
                            sx={{
                              '.dark &': {
                                borderColor: '#4b5563',
                              },
                            }}
                          />
                        )}
                      </Box>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card
                sx={{
                  borderRadius: 2,
                  '.dark &': {
                    bgcolor: '#374151',
                    border: '1px solid #4b5563',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      '.dark &': {
                        color: '#f3f4f6',
                      },
                    }}
                  >
                    Hoạt động gần đây
                  </Typography>
                  {data.activities.length === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        align: 'center',
                        py: 3,
                        '.dark &': {
                          color: '#9ca3af',
                        },
                      }}
                    >
                      Chưa có hoạt động nào
                    </Typography>
                  ) : (
                    <List disablePadding>
                      {data.activities.map((activity, index) => (
                        <Box key={index}>
                          <ListItem disableGutters sx={{ py: 1.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>{getActivityIcon(activity.type)}</ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  fontWeight={500}
                                  sx={{
                                    '.dark &': {
                                      color: '#d1d5db',
                                    },
                                  }}
                                >
                                  {activity.title}
                                </Typography>
                              }
                              secondary={
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: 'text.secondary',
                                      '.dark &': {
                                        color: '#9ca3af',
                                      },
                                    }}
                                  >
                                    {formatDate(activity.date)}
                                  </Typography>
                                  {activity.score && (
                                    <Typography
                                      variant="caption"
                                      fontWeight={500}
                                      sx={{
                                        color: 'primary',
                                        '.dark &': {
                                          color: '#8b5cf6',
                                        },
                                      }}
                                    >
                                      {activity.score}
                                    </Typography>
                                  )}
                                </Stack>
                              }
                            />
                          </ListItem>
                          {index < data.activities.length - 1 && (
                            <Divider
                              sx={{
                                '.dark &': {
                                  borderColor: '#4b5563',
                                },
                              }}
                            />
                          )}
                        </Box>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </>
          ) : null}
        </Box>
      </Box>
    </Drawer>
  );
}
