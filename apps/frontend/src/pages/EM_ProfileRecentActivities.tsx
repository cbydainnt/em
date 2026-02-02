import { List, Paper, Typography, Grid, Box, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import { toSlug } from '@/helpers/SeoHelper';

interface Lesson {
  lesson_id: string;
  lesson_title: string;
  lesson_type: number;
  lesson_video: string;
}

interface Course {
  course_id: string;
  course_name: string;
  course_description: string;
}

interface Activity {
  notification_id: string;
  message: string;
  lesson_id: string;
  course_id: string;
  lesson?: Lesson;
  course?: Course;
  created_at: string;
}

interface Props {
  userLastActivities: Activity[];
}

export default function RecentActivities({ userLastActivities }: Props) {
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
      color: red;
    }
  `;

  // 1. Lọc activity thỏa điều kiện
  const filteredActivities = userLastActivities.filter((act) => act.lesson_id && act.course_id && (act.lesson?.lesson_type === 0 || act.lesson?.lesson_type === 2)).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const activitiesByMonth = filteredActivities.reduce((months: { [key: string]: Activity[] }, act) => {
    const date = new Date(act.created_at);
    const month = `${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
    if (!months[month]) months[month] = [];
    months[month].push(act);
    return months;
  }, {});

  return (
    <Grid item xs={12} md={12}>
      <Paper className="dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-4">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon className="dark:text-white" sx={{ color: '', mr: 1 }} />
          <Typography variant="h6" className="dark:text-purple-500">
            Hoạt động gần đây
          </Typography>
        </Box>

        <Box sx={{ maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
          <List>
            {Object.entries(activitiesByMonth).map(([month, activities]) => (
              <Box sx={{ mb: '1em' }} key={month}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: '2rem',
                    color: 'rgb(147, 51, 234)',
                    dark: { color: 'purple.500' },
                    letterSpacing: '0.05em',
                    fontFamily: "'ui-monospace', serif",
                  }}
                >
                  {month}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: 0 }}>
                  {activities.map((act, index) => {
                    let message = '';
                    if (act.lesson?.lesson_type === 0) message = 'Bạn đã xem video';
                    else if (act.lesson?.lesson_type === 2) message = 'Bạn đã làm bài thi';

                    message += `: ${act.lesson?.lesson_title ?? ''}`;
                    message += ` - ${act.course?.course_name ?? ''}`;

                    return (
                      <Box
                        key={act.notification_id}
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '40px 1fr',
                          columnGap: 2,
                        }}
                      >
                        {/* TIMELINE */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          {/* LINE TRÊN */}
                          {index !== 0 && (
                            <Box
                              sx={{
                                width: '2px',
                                backgroundColor: 'divider',
                                flex: 1,
                              }}
                              className="dark:bg-white"
                            />
                          )}

                          {/* DOT */}
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <AccessTimeIcon sx={{ fontSize: 14, color: '#fff' }} />
                          </Box>

                          {/* LINE DƯỚI */}
                          {index !== activities.length - 1 && (
                            <Box
                              sx={{
                                width: '2px',
                                backgroundColor: 'divider',
                                flex: 1,
                              }}
                              className="dark:bg-white"
                            />
                          )}
                        </Box>

                        {/* CONTENT */}
                        <Box sx={{ pt: '2px' }}>
                          <Typography variant="body1" className="dark:text-white">
                            <StyledLink to={`/bai-hoc/${toSlug(act.lesson?.lesson_title ?? '')}-${act.lesson?.lesson_id ?? ''}`}>{message}</StyledLink>
                          </Typography>

                          <Typography variant="body2" className="text-gray-500 dark:text-gray-500 ">
                            {new Date(act.created_at).toLocaleString()}
                          </Typography>

                          {index < activities.length - 1 && (
                            <Box
                              className="dark:bg-white"
                              sx={{
                                mt: 1.5,
                                mb: 0.4,
                                height: '1px',
                                backgroundImage: (theme) => (theme.palette.mode === 'dark' ? 'linear-gradient(to right, rgba(255,255,255,0.25) 33%, transparent 0%)' : 'linear-gradient(to right, rgba(0,0,0,0.25) 33%, transparent 0%)'),
                                backgroundSize: '6px 1px',
                                backgroundRepeat: 'repeat-x',
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}
