import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

interface DynamicBreadcrumbProps {
  courseId?: string;
  lessonId?: string;
  sectionId?: string;
  isAddToCart?: boolean;
  isOrderHistory?: boolean;
  isProfile?: boolean;
  isNotifications?: boolean;
  isReserveCourse?: boolean;
}

export default function DynamicBreadcrumb({ courseId, lessonId, isAddToCart, isOrderHistory, isProfile, isNotifications, isReserveCourse, sectionId }: DynamicBreadcrumbProps) {
  const pageConfig: Record<string, { label: string; href: string }> = {
    addToCart: { label: 'Giỏ hàng', href: '/' },
    orderHistory: { label: 'Lịch sử đơn hàng', href: '/' },
    profile: { label: 'Trang cá nhân', href: '/' },
    notifications: { label: 'Thông báo', href: '/' },
    reserveCourse: { label: 'Bảo lưu khóa học', href: '/' },
  };
  const [crumbs, setCrumbs] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    const fetchBreadcrumbs = async () => {
      const newCrumbs: any[] = [
        { label: <HomeIcon sx={{ fontSize: 24 }} />, href: '/' },
        { label: 'Khóa học', href: '/tat-ca-khoa-hoc' },
      ];

      if (courseId) {
        const res = await axios.get(`/api/course/${courseId}`);
        newCrumbs.push({
          label: res.data.course_name,
          href: `/course/${courseId}`,
        });
      } else if (lessonId) {
        const res = await axios.get(`/api/lesson/LessonById/${lessonId}`);
        newCrumbs.push(
          ...[
            { label: res.data.section.course.course_name, href: `/khoa-hoc/${res.data.section.course_id}` },
            { label: res.data.section.section_title, href: `/chuong-hoc/${res.data.section.course_id} ` },
            { label: res.data.lesson_title, href: '' },
          ],
        );
      } else if (sectionId) {
        const res = await axios.get(`/api/section/${sectionId}`);
        newCrumbs.push(
          ...[
            { label: res.data.course.course_name, href: `/khoa-hoc/${res.data.course.course_id}` },
            { label: res.data.section_title, href: '' },
          ],
        );
      } else {
        const activePage = (isAddToCart && 'addToCart') || (isOrderHistory && 'orderHistory') || (isProfile && 'profile') || (isNotifications && 'notifications') || (isReserveCourse && 'reserveCourse') || null;

        if (activePage && pageConfig[activePage]) {
          newCrumbs.splice(1, 1);
          newCrumbs.push(pageConfig[activePage]);
        }
      }

      setCrumbs(newCrumbs);
    };

    fetchBreadcrumbs();
  }, [courseId, lessonId, sectionId]);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" className="text-gray-500 dark:text-white" />}
      aria-label="breadcrumb"
      sx={{
        '& .MuiBreadcrumbs-li': {
          display: 'flex',
          alignItems: 'center',
          height: 'auto',
        },
      }}
      className="p-3 text-gray-600"
    >
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return isLast ? (
          <Typography key={crumb.href} sx={{ fontWeight: 'bold', color: 'rgb(147, 51, 234)' }}>
            {crumb.label}
          </Typography>
        ) : (
          <Link key={crumb.href} underline="hover" className="text-[#4a5260] dark:text-white" component={RouterLink} to={crumb.href} sx={{ fontWeight: 600 }}>
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
