// stats.config.ts
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Paper, Typography } from '@mui/material';
import CountUp from 'react-countup';

const Stats = () => {
  const STATS_DATA = [
    {
      id: 'students',
      numericValue: 29300,
      suffix: 'K',
      label: 'Học viên',
      icon: SchoolIcon,
      bgColor: 'rgba(46, 204, 113, 0.12)',
      iconColor: '#2ecc71',
    },
    {
      id: 'classes',
      numericValue: 32400,
      suffix: 'K',
      label: 'Khóa học hoàn thành',
      icon: MenuBookIcon,
      bgColor: 'rgba(255, 99, 132, 0.12)',
      iconColor: '#ff6384',
    },
    {
      id: 'satisfaction',
      numericValue: 100,
      suffix: '%',
      label: 'Hài lòng',
      icon: ThumbUpAltOutlinedIcon,
      bgColor: 'rgba(100, 149, 237, 0.12)',
      iconColor: '#6495ed',
    },
    {
      id: 'instructors',
      numericValue: 1000,
      suffix: '+',
      label: 'Bài học',
      icon: PersonOutlineIcon,
      bgColor: 'rgba(255, 159, 64, 0.12)',
      iconColor: '#ff9f40',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'rgb(var(--bg-primary))',
        py: { xs: 6, md: 8 },
        px: { xs: 4, md: 6 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 4,
      }}
    >
      {STATS_DATA.map((item) => {
        const Icon = item.icon;

        return (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              backgroundColor: '#fff',
              boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
              transition: 'transform .25s ease, box-shadow .25s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 18px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 2,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item.bgColor,
              }}
            >
              <Icon sx={{ fontSize: 32, color: item.iconColor }} />
            </Box>

            {/* Value */}
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 700,
                color: '#111',
                mb: 1,
              }}
            >
              <CountUp start={0} end={item.numericValue} duration={2} />
              {item.suffix}
            </Typography>

            {/* Label */}
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '1px',
                color: '#666',
              }}
            >
              {item.label}
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default Stats;
