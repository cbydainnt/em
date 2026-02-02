import { useState, useRef, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import {IconMoodSmile}from '@tabler/icons-react';

interface EmojiPickerWrapperProps {
  onEmojiSelect: (emoji: string) => void;
  position?: 'top' | 'bottom';
}

export function EmojiPickerWrapper({ onEmojiSelect, position = 'bottom' }: EmojiPickerWrapperProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Đóng picker khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="hover:text-purple-600 transition p-1 rounded hover:bg-purple-100 dark:hover:bg-purple-900 w-8 h-8 flex items-center justify-center"
        title="Thêm emoji"
      >
        <IconMoodSmile size={18} />
      </button>

      {showPicker && (
        <div className={`absolute ${position === 'top' ? 'top-full mb-2' : 'bottom-full mt-2'} left-0 z-50`}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
            previewConfig={{
              showPreview: false
            }}
            
          />
        </div>
      )}
    </div>
  );
}