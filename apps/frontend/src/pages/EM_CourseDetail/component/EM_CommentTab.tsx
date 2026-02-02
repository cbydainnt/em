import { useState, useEffect, useRef } from 'react';
import { IconThumbUp, IconThumbUpFilled, IconCornerDownRight, IconBold, IconSend, IconEdit, IconTrash, IconX, IconChevronDown, IconChevronUp, IconFlag } from '@tabler/icons-react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { timeAgo } from '@/utils/timeAgo';
import { useAuthStore } from '@/hooks/useAuthStore';
import { CommentImageUpload } from './EM_CommentImageUpload';
import { EmojiPickerWrapper } from './EM_EmojiPicker';
import { logClientMessage } from '@/utils';
import { NotificationType } from '@/utils/enums';
import EM_Login from '@/components/EM_Login';
import { ReportCommentDialog } from './EM_ReportCommentDialog';

interface Comment {
  user_id: string;
  comment_id: string;
  course_id: string;
  lesson_id: string;
  parent_id?: string | null;
  image_url?: string | null;
  user?: {
    name?: string;
    avatar?: string;
  };
  content: string;
  created_at: string;
  replies?: Comment[];
}

const getImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http') || imageUrl.startsWith('/api') || imageUrl.startsWith('https')) {
    return imageUrl;
  }
  return `/api/file/view/${imageUrl}`;
};

const getInitials = (name: string) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0][0].toUpperCase();
};

// 🔥 COMPONENT TEXTAREA AUTO-RESIZE
interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  className?: string;
  // Thêm prop ref
  innerRef?: React.RefObject<HTMLTextAreaElement>;
}

function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
  minRows = 2,
  maxRows = 15,
  className = '',
  innerRef, // Nhận ref từ bên ngoài
}: AutoResizeTextareaProps) {
  const localTextareaRef = useRef<HTMLTextAreaElement>(null);
  // Ưu tiên dùng ref từ bên ngoài, nếu không có thì dùng ref local
  const textareaRef = innerRef || localTextareaRef;

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height
    textarea.style.height = 'auto';

    // Tính toán chiều cao mới
    const lineHeight = 20;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef} // Gán ref đúng cách
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full bg-transparent resize-none focus:outline-none text-sm text-gray-800 dark:text-gray-200 ${className}`}
      rows={minRows}
      style={{ minHeight: `${minRows * 20}px` }}
    />
  );
}
const toggleBold = (textareaRef: React.RefObject<HTMLTextAreaElement>, value: string, setValue: (val: string) => void) => {
  const textarea = textareaRef.current;
  if (!textarea) {
    console.error('Textarea ref is null');
    return;
  }

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = value.substring(start, end);

  // Đảm bảo textarea đang focus
  textarea.focus();

  if (selectedText) {
    const isBold = selectedText.startsWith('**') && selectedText.endsWith('**');
    let newText: string;
    let newCursorPos: number;

    if (isBold) {
      // Remove bold
      const unboldText = selectedText.slice(2, -2);
      newText = value.substring(0, start) + unboldText + value.substring(end);
      newCursorPos = start + unboldText.length;
    } else {
      // Add bold
      newText = value.substring(0, start) + '**' + selectedText + '**' + value.substring(end);
      newCursorPos = end + 4;
    }

    setValue(newText);

    // Đợi render xong rồi set selection
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  } else {
    // No text selected - insert bold markers
    const boldPlaceholder = '****';
    const newText = value.substring(0, start) + boldPlaceholder + value.substring(end);
    setValue(newText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + 2, start + 2);
      }
    }, 10);
  }
};

interface CommentContentProps {
  content: string;
  maxLines?: number;
}

function CommentContent({ content, maxLines = 10 }: CommentContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(getComputedStyle(contentRef.current).lineHeight);
      const maxHeight = lineHeight * maxLines;
      const contentHeight = contentRef.current.scrollHeight;
      setNeedsTruncation(contentHeight > maxHeight);
    }
  }, [content, maxLines]);

  const renderContent = (text: string) => {
    if (!text) return null;

    const parts: { type: string; content: string }[] = [];
    let lastIndex = 0;
    const regex = /(\*\*[^*]+\*\*)|(@\[[^\]]+\])/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }

      if (match[0].startsWith('**')) {
        parts.push({ type: 'bold', content: match[0].slice(2, -2) });
      } else if (match[0].startsWith('@[')) {
        parts.push({ type: 'mention', content: match[0].slice(2, -1) });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.map((part, index) => {
      if (part.type === 'bold') {
        return (
          <strong key={index} className="font-bold text-gray-900 dark:text-white">
            {part.content}
          </strong>
        );
      }
      if (part.type === 'mention') {
        return (
          <span key={index} className="text-purple-600 font-semibold bg-purple-100 dark:bg-purple-900 px-1.5 py-0.5 rounded">
            @{part.content}
          </span>
        );
      }
      return <span key={index}>{part.content}</span>;
    });
  };

  return (
    <div>
      <p
        ref={contentRef}
        className={`text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words ${!isExpanded && needsTruncation ? 'line-clamp-10' : ''}`}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: !isExpanded && needsTruncation ? maxLines : 'unset',
        }}
      >
        {renderContent(content)}
      </p>

      {needsTruncation && (
        <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium transition-colors">
          {isExpanded ? (
            <>
              <IconChevronUp size={14} />
              Thu gọn
            </>
          ) : (
            <>
              <IconChevronDown size={14} />
              Xem thêm
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function CommentTab({ courseId, lessonId }: { courseId?: string; lessonId?: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [reportDialog, setReportDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const { authData } = useAuthStore();
  const refEM_Login = useRef<any>(null);
  const mainTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Hàm xử lý mở dialog báo cáo
  const handleOpenReportDialog = (comment: any) => {
    setSelectedComment({
      id: comment.comment_id,
      content: comment.content,
      user: {
        id: comment.user_id,
        name: comment.user?.name,
      },
      course_id: comment.course_id,
      lesson_id: comment.lesson_id,
    });
    setReportDialog(true);
  };

  // Hàm khi báo cáo thành công
  const handleReportSuccess = () => {
    console.log('Comment reported successfully');
    // Có thể show snackbar/thông báo thành công
  };

  const fetchComments = async () => {
    if (!courseId && !lessonId) return;

    try {
      const url = lessonId ? `/api/comment/lesson/${lessonId}` : `/api/comment/course/${courseId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('❌ Lỗi khi tải comment:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [courseId, lessonId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() && images.length === 0) return;
    if (!authData || !authData.id) {
      refEM_Login.current.show();
      return;
    }

    try {
      let imageUrl = null;

      if (images.length > 0) {
        const formData = new FormData();
        formData.append('file', images[0]);

        const res = await fetch('/api/comment/upload-image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to upload image');
        }

        const data = await res.json();
        imageUrl = data.image_url;
      }

      const payload: any = {
        content: newComment,
        image_url: imageUrl,
      };

      if (lessonId) payload.lesson_id = lessonId;
      else if (courseId) payload.course_id = courseId;

      const commentRes = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!commentRes.ok) throw new Error('Failed to create comment');

      setNewComment('');
      setImages([]);
      fetchComments();
    } catch (err) {
      console.error('❌ Lỗi gửi bình luận:', err);
      alert('Lỗi khi gửi bình luận: ' + (err as Error).message);
    }
  };

  if (loading) return <p className="text-gray-500">Đang tải bình luận...</p>;

  return (
    <div className="text-gray-700 dark:text-gray-200 space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">💬 Bình luận của học viên</h2>

      {/* Form bình luận chính */}
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-start gap-3 p-3">
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-xs">{authData?.avatar ? <img src={getImageUrl(authData.avatar)} alt="Avatar" className="w-10 h-10 rounded-full" /> : <span>{getInitials(authData?.name || 'User')}</span>}</div>
          <AutoResizeTextarea innerRef={mainTextareaRef} value={newComment} onChange={setNewComment} placeholder="Viết bình luận của bạn..." minRows={2} maxRows={10} className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-200" />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-3 py-2">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <button onClick={() => toggleBold(mainTextareaRef, newComment, setNewComment)} className="hover:text-purple-600 transition p-1 rounded hover:bg-purple-100 dark:hover:bg-purple-900" title="In đậm">
              <IconBold size={18} />
            </button>

            <EmojiPickerWrapper onEmojiSelect={(emoji) => setNewComment((prev) => prev + emoji)} position="top" />

            <CommentImageUpload images={images} setImages={setImages} onChange={setImages} />
          </div>

          <button onClick={handleSubmitComment} className="flex items-center gap-1 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition">
            <IconSend size={16} />
            Gửi
          </button>
        </div>
      </div>

      {/* Danh sách bình luận */}
      <div className="mt-6 space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">Chưa có bình luận nào.</p>
        ) : (
          comments
            .filter((cmt) => !cmt.parent_id)
            .map((cmt, index) => (
              <div key={cmt.comment_id} className={`pb-6 ${index < comments.length - 1 ? 'border-b border-gray-300 dark:border-gray-700' : ''}`}>
                <CommentItem comment={cmt} replyingTo={replyingTo} setReplyingTo={setReplyingTo} onReplied={fetchComments} refEM_Login={refEM_Login} onReportComment={() => handleOpenReportDialog(cmt)} />
              </div>
            ))
        )}
      </div>
      {/* Report Dialog */}
      {selectedComment && (
        <ReportCommentDialog
          open={reportDialog}
          onClose={() => {
            setReportDialog(false);
            setSelectedComment(null);
          }}
          comment={selectedComment}
          onSuccess={handleReportSuccess}
        />
      )}
      <EM_Login ref={refEM_Login} />
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  replyingTo: string | null;
  setReplyingTo: (id: string | null) => void;
  isChild?: boolean;
  onReplied: () => void;
  refEM_Login: any;
  onReportComment?:  () => void;
}

function CommentItem({ comment, replyingTo, setReplyingTo, isChild = false, onReplied, refEM_Login, onReportComment }: CommentItemProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [replyContent, setReplyContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [replyImages, setReplyImages] = useState<File[]>([]);
  const [editImages, setEditImages] = useState<File[]>([]);
  const [editContent, setEditContent] = useState(comment.content);
  const [editImageUrl, setEditImageUrl] = useState(comment.image_url || null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  const { authData } = useAuthStore();

  useEffect(() => {
    if (isEditing && editTextareaRef.current) {
      const textarea = editTextareaRef.current;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isEditing]);

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim() && replyImages.length === 0) return;

    if (!authData || !authData.id) {
      refEM_Login.current?.show();
      return;
    }

    try {
      let imageUrl: string | null = null;

      if (replyImages.length > 0) {
        const formData = new FormData();
        formData.append('file', replyImages[0]);

        const res = await fetch('/api/comment/upload-image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error('Failed to upload reply image');
        const data = await res.json();
        imageUrl = data.image_url;
      }

      const mentionText = `@[${comment.user?.name || 'người dùng'}] `;
      const finalContent = mentionText + replyContent;

      const payload: Record<string, any> = {
        content: finalContent,
        image_url: imageUrl,
      };

      if (comment.course_id) payload.course_id = comment.course_id;
      if (comment.lesson_id) payload.lesson_id = comment.lesson_id;

      const res = await fetch(`/api/comment/reply/${comment.comment_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to reply');

      // ✅ CHỈ LOG KHI REPLY COMMENT CỦA NGƯỜI KHÁC
      if (authData?.id && comment.user_id && comment.user_id.toString() !== authData.id.toString()) {
        try {
          logClientMessage(
            'Phản hồi bình luận',
            `${authData.name} vừa Phản hồi bình luận của bạn`,
            comment.user_id,
            'user',
            NotificationType.SOCIAL, // SOCIAL
          );
        } catch (logError) {
          console.error('Failed to log reply action:', logError);
        }
      }
      setReplyContent('');
      setReplyImages([]);
      setReplyingTo(null);
      onReplied();
    } catch (err) {
      console.error('❌ Lỗi gửi phản hồi:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      let newImageUrl = editImageUrl;

      if (editImages.length > 0) {
        const formData = new FormData();
        formData.append('file', editImages[0]);

        const res = await fetch('/api/comment/upload-image', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        if (!res.ok) throw new Error('Failed to upload image');
        const data = await res.json();
        newImageUrl = data.image_url;
      }

      const res = await fetch(`/api/comment/${comment.comment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          content: editContent,
          image_url: newImageUrl,
        }),
      });

      if (!res.ok) throw new Error('Failed to update comment');

      setIsEditing(false);
      setEditImages([]);
      onReplied();
    } catch (err) {
      console.error('❌ Lỗi khi sửa comment:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/${comment.comment_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete comment');
      setOpenConfirm(false);
      onReplied();
    } catch (err) {
      console.error('❌ Lỗi khi xóa comment:', err);
    }
  };

  return (
    <div className={`${isChild ? 'pl-10 relative' : ''}`}>
      {isChild && <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />}

      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm relative z-10 flex-shrink-0">{comment.user?.avatar ? <img src={getImageUrl(comment.user.avatar)} alt="Avatar" className="w-10 h-10 rounded-full object-cover" /> : <span>{getInitials(comment.user?.name || 'User')}</span>}</div>

        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{comment.user?.name || 'Người dùng'}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(comment.created_at)}</span>
            </div>

            {isEditing ? (
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm mt-2">
                <div className="flex items-start gap-3 p-3">
                  <AutoResizeTextarea innerRef={editTextareaRef} value={editContent} onChange={setEditContent} placeholder="Chỉnh sửa bình luận..." minRows={2} maxRows={10} className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-200" />{' '}
                </div>

                {editImageUrl && editImages.length === 0 && (
                  <div className="px-3 pb-2">
                    <div className="relative inline-block">
                      <img src={getImageUrl(editImageUrl)} alt="current" className="w-32 h-32 object-cover rounded-md border" />
                      <button type="button" onClick={() => setEditImageUrl(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600">
                        <IconX size={14} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <button onClick={() => toggleBold(editTextareaRef, editContent, setEditContent)} className="hover:text-purple-600 transition p-1 rounded hover:bg-purple-100 dark:hover:bg-purple-900" title="In đậm">
                      <IconBold size={18} />
                    </button>

                    <EmojiPickerWrapper onEmojiSelect={(emoji) => setEditContent((prev) => prev + emoji)} position="top" />

                    <CommentImageUpload images={editImages} setImages={setEditImages} onChange={setEditImages} />
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition">
                      Hủy
                    </button>
                    <button onClick={handleUpdate} className="flex items-center gap-1 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition">
                      <IconSend size={16} />
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {comment.content && <CommentContent content={comment.content} maxLines={10} />}

                {comment.image_url && (
                  <div className="mt-3">
                    <a href={getImageUrl(comment.image_url)} target="_blank" rel="noreferrer">
                      <img src={getImageUrl(comment.image_url)} alt="comment-image" className="w-32 h-32 object-cover rounded-md border" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-2 items-center">
            <button onClick={handleLike} className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-500 transition">
              {liked ? <IconThumbUpFilled size={14} className="text-purple-500" /> : <IconThumbUp size={14} />}
              <span>{likes}</span>
            </button>

            <button
              onClick={() => {
                if (replyingTo === comment.comment_id) {
                  setReplyingTo(null);
                  setReplyContent('');
                } else {
                  setReplyingTo(comment.comment_id);
                  setReplyContent('');
                }
              }}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-500 transition"
            >
              <IconCornerDownRight size={14} /> Trả lời
            </button>

            {comment.user_id?.toString() === authData?.id?.toString() && (
              <>
                <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-yellow-500 transition">
                  <IconEdit size={14} /> Sửa
                </button>
                <button onClick={() => setOpenConfirm(true)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition">
                  <IconTrash size={14} /> Xóa
                </button>

                <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                  <DialogTitle>Xác nhận xóa bình luận</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Bạn có chắc chắn muốn xóa bình luận này không?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Hủy</Button>
                    <Button onClick={handleDelete} color="error">
                      Xóa
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
            {authData?.id?.toString() !== comment.user_id?.toString() && (
              <button
                onClick={onReportComment} // Sử dụng prop
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition"
                title="Báo cáo bình luận"
              >
                <IconFlag size={14} />
                Báo cáo
              </button>
            )}
          </div>

          

          {replyingTo === comment.comment_id && (
            <div className="mt-3 ml-0 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <div className="px-3 pt-3 pb-1">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Đang trả lời: <span className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">{comment.user?.name || 'người dùng'}</span>
                </span>
              </div>

              <div className="flex items-start gap-3 p-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">{authData?.avatar ? <img src={getImageUrl(authData.avatar)} alt="Avatar" className="w-9 h-8 rounded-full object-cover" /> : <span>{getInitials(authData?.name || 'User')}</span>}</div>
                <AutoResizeTextarea innerRef={replyTextareaRef} value={replyContent} onChange={setReplyContent} placeholder={`Phản hồi ${comment.user?.name || 'người dùng'}...`} minRows={2} maxRows={10} className="w-full bg-transparent focus:outline-none text-sm" />{' '}
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-3 py-2">
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                  <button onClick={() => toggleBold(replyTextareaRef, replyContent, setReplyContent)} className="hover:text-purple-600 transition p-1 rounded hover:bg-purple-100 dark:hover:bg-purple-900" title="In đậm">
                    <IconBold size={18} />
                  </button>
                  <EmojiPickerWrapper onEmojiSelect={(emoji) => setReplyContent((prev) => prev + emoji)} position="top" />
                  <CommentImageUpload images={replyImages} setImages={setReplyImages} onChange={setReplyImages} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                      setReplyImages([]);
                    }}
                    className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition"
                  >
                    Hủy
                  </button>
                  <button onClick={handleReplySubmit} className="flex items-center gap-1 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition">
                    <IconSend size={16} />
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.comment_id} comment={reply} replyingTo={replyingTo} setReplyingTo={setReplyingTo} isChild={true} onReplied={onReplied} refEM_Login={refEM_Login} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
