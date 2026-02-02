import { useState, useEffect } from 'react';
import { ContentTab } from './component/EM_ContentTab';
import { CommentTab } from './component/EM_CommentTab';
import { ReviewTab } from './component/EM_ReviewTab';
import { InformationTab } from './component/EM_InformationTab';

interface CourseContentProps {
  courseId: string;
  courseName: string;
  onActivated?: () => void;
  reloadFlag?: number; // 👈 mới thêm
}

export default function CourseContent({ courseId, courseName, onActivated, reloadFlag }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'comment' | 'review'| 'information'>('content');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActivated = () => {
    onActivated?.();
    setRefreshKey((k) => k + 1);
  };

  // 🔥 Khi reloadFlag thay đổi → refresh tab nội dung
  useEffect(() => {
    setRefreshKey((k) => k + 1);
  }, [reloadFlag]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{courseName}</h1>

      <div className="flex gap-6 border-b border-gray-300 dark:border-gray-700 mb-4">
        <button className={`pb-2 ${activeTab === 'content' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`} onClick={() => setActiveTab('content')}>
          Nội dung
        </button>
        <button className={`pb-2 ${activeTab === 'comment' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`} onClick={() => setActiveTab('comment')}>
          Bình luận
        </button>
        <button className={`pb-2 ${activeTab === 'review' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`} onClick={() => setActiveTab('review')}>
          Đánh giá
        </button>
        <button className={`pb-2 ${activeTab === 'information' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`} onClick={() => setActiveTab('information')}>
          Thông tin
        </button>
      </div>

      {activeTab === 'content' && (
        <ContentTab 
          courseId={courseId} 
          courseName={courseName} 
          refreshKey={refreshKey} 
          onActivated={handleActivated} 
        />
      )}

      {activeTab === 'comment' && <CommentTab courseId={courseId} />}
      {activeTab === 'review' && <ReviewTab courseId={courseId} onReviewUpdate={handleActivated} />}
      {activeTab === 'information' && <InformationTab courseId={courseId}  />}
    </div>
  );
}
