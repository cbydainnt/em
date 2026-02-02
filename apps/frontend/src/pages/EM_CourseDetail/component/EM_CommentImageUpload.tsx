import { useRef } from 'react';
import { IconPhoto, IconX } from '@tabler/icons-react';

interface CommentImageUploadProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  onChange: (files: File[]) => void;
}

export function CommentImageUpload({ images, onChange }: CommentImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectFiles = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chỉ chọn file ảnh!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ảnh không được vượt quá 5MB!');
      return;
    }

    onChange([file]);
  };

  const handleRemoveImage = () => {
    onChange([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button type="button" className="hover:text-purple-600 transition flex items-center justify-center" title="Thêm ảnh" onClick={handleClickUpload} style={{ width: 28, height: 28 }}>
        <IconPhoto size={18} className="text-gray-400" />
        <input type="file" accept="image/*" ref={inputRef} className="hidden" onChange={(e) => e.target.files && handleSelectFiles(e.target.files)} />
      </button>

      {images.length > 0 && (
        <div className="flex items-center gap-2">
          {images.map((file, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 group">
              <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
              <button type="button" onClick={handleRemoveImage} className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-90 group-hover:opacity-100" title="Xóa ảnh">
                <IconX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
