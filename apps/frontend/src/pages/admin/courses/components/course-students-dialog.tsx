import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, LinearProgress } from '@mui/material';
import { IconX, IconUsers } from '@tabler/icons-react';

interface CourseType {
  course_id: string;
  course_name: string;
  total_course_user: number;
}

interface CourseStudentsDialogProps {
  open: boolean;
  course: CourseType | null;
  onClose: () => void;
}

// Mock student data
const mockStudents = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    avatar: '',
    progress: 75,
    startDate: '2024-01-15',
    lastAccess: '2024-11-05',
    status: 'active',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    avatar: '',
    progress: 45,
    startDate: '2024-02-20',
    lastAccess: '2024-11-04',
    status: 'active',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    avatar: '',
    progress: 100,
    startDate: '2024-01-10',
    lastAccess: '2024-10-28',
    status: 'completed',
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    avatar: '',
    progress: 20,
    startDate: '2024-03-05',
    lastAccess: '2024-11-01',
    status: 'active',
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    avatar: '',
    progress: 90,
    startDate: '2024-01-25',
    lastAccess: '2024-11-06',
    status: 'active',
  },
];

export default function CourseStudentsDialog({ open, course, onClose }: CourseStudentsDialogProps) {
  if (!course) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'inactive':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'active':
        return 'Đang học';
      case 'inactive':
        return 'Tạm dừng';
      default:
        return status;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
        className: 'dark:bg-gray-800',
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
          borderBottom: '1px solid #bfdbfe',
          position: 'relative',
          pr: 6,
        }}
        className="dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconUsers size={28} className="text-blue-600 dark:text-blue-400" />
          <Box>
            <Typography variant="h6" className="text-blue-600 dark:text-blue-400 font-semibold">
              Danh sách học viên
            </Typography>
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
              {course.course_name} • {course.total_course_user} học viên
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }} size="small">
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }} className="dark:bg-gray-800">
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="bg-gray-50 dark:bg-gray-700 font-semibold dark:text-gray-200">Học viên</TableCell>
                <TableCell className="bg-gray-50 dark:bg-gray-700 font-semibold dark:text-gray-200">Tiến trình</TableCell>
                <TableCell className="bg-gray-50 dark:bg-gray-700 font-semibold dark:text-gray-200">Ngày bắt đầu</TableCell>
                <TableCell className="bg-gray-50 dark:bg-gray-700 font-semibold dark:text-gray-200">Truy cập cuối</TableCell>
                <TableCell className="bg-gray-50 dark:bg-gray-700 font-semibold dark:text-gray-200">Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockStudents.map((student) => (
                <TableRow key={student.id} hover className="dark:hover:bg-gray-700">
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={student.avatar} sx={{ width: 40, height: 40 }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium" className="dark:text-gray-200">
                          {student.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" className="dark:text-gray-400">
                          {student.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
                      <LinearProgress
                        variant="determinate"
                        value={student.progress}
                        sx={{
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(0,0,0,0.1)',
                        }}
                        className="dark:bg-gray-600"
                      />
                      <Typography variant="caption" className="dark:text-gray-200" sx={{ minWidth: 40 }}>
                        {student.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="dark:text-gray-200">
                      {new Date(student.startDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="dark:text-gray-200">
                      {new Date(student.lastAccess).toLocaleDateString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={getStatusLabel(student.status)} color={getStatusColor(student.status)} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}
