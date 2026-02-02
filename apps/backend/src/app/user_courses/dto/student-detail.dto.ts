// dto/student-detail.dto.ts
export interface StudentDetailResponse {
  student: {
    user_id: string;
    name: string;
    email: string;
    avatar?: string;
    enrolledDate: Date;
    status: 'Active' | 'Completed' | 'Expired';
    progress: number;
    finalExam: 'Passed' | 'Failed' | 'Not attempted' | 'Not required'; // N/A tức là khóa học này không yêu cầu Final Exam
  };

  statistics: {
    estimatedHours: number;
    avgProgressPerDay: number;
    daysSinceEnrollment: number;
  };

  modules: {
    section_id: string;
    name: string;
    completedLessons: number;
    totalLessons: number;
    progress: number;
    status: 'Not started' | 'In progress' | 'Completed';
  }[];

  activities: {
    date: Date;
    type: 'LESSON' | 'QUIZ' | 'ASSIGNMENT';
    title: string;
    score?: string;
  }[];
}
