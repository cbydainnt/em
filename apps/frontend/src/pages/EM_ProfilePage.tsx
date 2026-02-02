import DefaultLayout from '@/layouts/default-layout';
import { useAuthStore } from '@/hooks/useAuthStore';
import { Avatar, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import EditProfile from './EM_EditProfile';
import axios from 'axios';
import RecentActivities from './EM_ProfileRecentActivities';
import { Link } from 'react-router-dom';
import DynamicBreadcrumb from '@/components/EM_BreadCrumb';
import SchoolIcon from '@mui/icons-material/School';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { toSlug } from '@/helpers/SeoHelper';

export default function ProfilePage() {
  const { authData } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);
  const [userCoursesStats, setUserCoursesStats] = useState<any>(null);
  const [userLastActivities, setUserLastActivities] = useState<any[]>([]);
  const [quizesHistory, setQuizesHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: rgb(147, 51, 234);

    &:hover {
      text-decoration: underline;
      color: red;
    }
  `;

  // Tách riêng việc fetch stats (chỉ load 1 lần)
  useEffect(() => {
    if (!authData?.id) return;

    const fetchUserStats = async () => {
      try {
        const [statusRes, anotherRes] = await Promise.all([
          axios.get(`/api/lesson/getStatus/${authData.id}`),
          axios.get(`/api/notifications/profile/${authData.id}`, {
            params: {
              unreadOnly: false,
            },
          }),
        ]);

        setUserStats(statusRes.data.summary);
        setUserCoursesStats(statusRes.data.courses);

        // Filter activity include "hết" in title
        const filtered = anotherRes.data.data.filter((item: any) => !item.title.includes('hết'));
        setUserLastActivities(filtered);
      } catch (err) {
        console.error('Failed to load user stats', err);
      }
    };

    fetchUserStats();
  }, [authData?.id]);

  // Fetch quiz history riêng biệt khi page thay đổi
  useEffect(() => {
    if (!authData?.id) return;

    const fetchQuizHistory = async () => {
      setIsLoading(true);
      try {
        const quizesRes = await axios.get(`/api/quiz/${authData.id}/get-all-result`, {
          params: {
            page,
            pageSize,
          },
        });

        // Đảm bảo reset hoàn toàn dữ liệu cũ
        setQuizesHistory(quizesRes.data.data || []);
        setTotalPages(quizesRes.data.totalPages || 0);
      } catch (err) {
        console.error('Failed to load quiz history', err);
        setQuizesHistory([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizHistory();
  }, [authData?.id, page]);

  return (
    <DefaultLayout hideSidebarToggle={true}>
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: 'rgb(var(--bg-primary))' }}>
        <Box px={4} display="flex" justifyContent="center">
          <Box width="100%" maxWidth="1400px">
            <DynamicBreadcrumb isProfile={true} />
          </Box>
        </Box>

        <main className="flex justify-center p-4">
          <Grid container spacing={4} maxWidth="1400px" width="100%">
            {/* Left sidebar */}
            <Grid item xs={12} md={4}>
              <Paper className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar src={authData.avatar && authData.avatar.includes('http') ? `${authData.avatar}` : authData.avatar ? `/api/user/image/${authData.avatar}` : ''} alt={authData?.name || 'Avatar'} sx={{ width: 64, height: 64, bgcolor: 'purple', fontWeight: 600 }}>
                    {!authData?.avatar && (authData?.name?.[0]?.toUpperCase() || 'U')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" className="text-purple-600 dark:text-purple-500">
                      {authData?.name || 'admin'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">
                      {authData?.email || 'administrator@gmail.com'}
                    </Typography>
                  </Box>
                </Box>
                {authData && (
                  <Button fullWidth sx={{ borderRadius: 2 }} className="btn-hover-gradient md:inline-flex text-white px-2 py-2 text-sm hover:bg-violet-500 hover:text-white transition" onClick={() => setOpenDialog(true)}>
                    Sửa thông tin
                  </Button>
                )}
              </Paper>

              {/* Thời lượng online */}
              <Paper className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-4 mt-2">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ScheduleIcon className="dark:text-white" sx={{ mr: 1 }} />
                  <Typography variant="h6" className="dark:text-purple-500">
                    Thời lượng online
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h4" className="text-purple-600 dark:text-purple-500">
                    {userStats?.totalWatchedSeconds ? `${Math.floor(userStats.totalWatchedSeconds / 3600)}h ${Math.floor((userStats.totalWatchedSeconds % 3600) / 60)}m` : '0h'}
                  </Typography>
                  <CircularProgress variant="determinate" value={userStats?.percentCompleted ?? 0} size={60} color="secondary" />
                </Box>
                <Typography className="dark:text-gray-300" variant="body2" color="text.secondary" mt={1}>
                  Tổng thời gian đã học
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <RecentActivities userLastActivities={userLastActivities} />

              <Paper className="bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-4">
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon className="dark:text-white" sx={{ mr: 1 }} />
                    <Typography variant="h6" className="dark:text-purple-500">
                      Bài kiểm tra gần đây
                    </Typography>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                      <TableRow>
                        <TableCell className="dark:text-gray-200">STT</TableCell>
                        <TableCell className="dark:text-gray-200">Tên</TableCell>
                        <TableCell className="dark:text-gray-200">Thời gian thi</TableCell>
                        <TableCell className="dark:text-gray-200">Điểm</TableCell>
                        <TableCell className="dark:text-gray-200">Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <CircularProgress size={24} />
                          </TableCell>
                        </TableRow>
                      ) : quizesHistory.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center" className="dark:text-gray-300">
                            Không có dữ liệu
                          </TableCell>
                        </TableRow>
                      ) : (
                        quizesHistory.map((quiz, index) => (
                          <TableRow key={`${quiz.lesson.lesson_id}-${page}-${index}`}>
                            <TableCell className="dark:text-gray-200">{(page - 1) * pageSize + index + 1}</TableCell>
                            <TableCell>
                              <StyledLink className="hover:underline" to={`/bai-hoc/${toSlug(quiz.lesson.lesson_title)}-${quiz.lesson.lesson_id}`}>
                                {quiz.lesson.lesson_title}
                              </StyledLink>
                            </TableCell>
                            <TableCell className="dark:text-gray-200">{new Date(quiz.completed_at).toISOString().replace('T', ' ').slice(0, 19)}</TableCell>
                            <TableCell className="dark:text-gray-200">{quiz.score}</TableCell>
                            <TableCell className="dark:text-gray-200">
                              <span className={quiz.passed ? 'text-green-600' : 'text-red-600'}>{quiz.passed ? 'Đạt' : 'Không đạt'}</span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box display="flex" alignItems="center" justifyContent="center" gap={2} p={2}>
                  <Button disabled={page <= 1 || isLoading} onClick={() => setPage(page - 1)}>
                    Trước
                  </Button>

                  <Typography sx={{ minWidth: 60, textAlign: 'center' }}>
                    {page} / {totalPages || 1}
                  </Typography>

                  <Button disabled={page >= totalPages || isLoading} onClick={() => setPage(page + 1)}>
                    Sau
                  </Button>
                </Box>
              </Paper>

              {/* Tiến độ khóa học */}
              <Paper className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon className="dark:text-white" sx={{ mr: 1 }} />
                    <Typography variant="h6" className="dark:text-purple-500" gutterBottom>
                      Tiến độ khóa học
                    </Typography>
                  </Box>
                  <TableContainer>
                    <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
                      <TableHead className="bg-gray-50 dark:bg-gray-700">
                        <TableRow>
                          <TableCell className="dark:text-gray-200 uppercase font-medium border border-gray-300 dark:border-gray-600" sx={{ width: '40%' }}>
                            Tên khóa học
                          </TableCell>
                          <TableCell className="dark:text-gray-200 uppercase font-medium border border-gray-300 dark:border-gray-600" sx={{ width: '30%' }}>
                            Thời lượng online
                          </TableCell>
                          <TableCell className="dark:text-gray-200 uppercase font-medium border border-gray-300 dark:border-gray-600" sx={{ width: '30%' }}>
                            Bài hoàn thành
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userCoursesStats?.map((row: any, index: number) => (
                          <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <TableCell className="dark:text-gray-200 uppercase border border-gray-300 dark:border-gray-600">
                              <StyledLink className="hover:underline" to={`/khoa-hoc/${row.courseId}`}>
                                {row.courseName}
                              </StyledLink>
                            </TableCell>
                            <TableCell className="dark:text-gray-200 border border-gray-300 dark:border-gray-600">{`${Math.floor(row.totalWatchedSeconds / 3600)}h ${Math.floor((row.totalWatchedSeconds % 3600) / 60)}p`}</TableCell>
                            <TableCell className="dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                              <Box display="flex" alignItems="center" gap={1}>
                                <CircularProgress variant="determinate" value={(row.completedLessons / row.totalLessons) * 100} size={24} color="secondary" />
                                <Typography variant="body2">{`${row.completedLessons}/${row.totalLessons}`}</Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </main>

        <EditProfile open={openDialog} onClose={() => setOpenDialog(false)} />
      </div>
    </DefaultLayout>
  );
}
