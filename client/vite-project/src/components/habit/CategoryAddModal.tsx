import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DragHandle from '../DragHandle';

const EMOJI_LIST = [
  '🧘', '💊', '🥗', '💧', '😴', '✍️',
  '🙏', '📵', '🍳', '🎵', '💰', '🧹',
  '🌿', '🐾', '📷', '🚗', '🌍', '🤖',
  '🎧', '✏️', '🎯', '📌', '💙', '❤️',
];

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string, emoji: string | null) => void;
};

const CategoryAddModal = ({ open, onClose, onSubmit }: Props) => {
  const [value, setValue] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(EMOJI_LIST[0]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') onClose();
  };

  const trimmed = value.trim();
  const canSubmit = trimmed.length > 0;

  if (!open) return null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(trimmed, selectedEmoji);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-1/2 z-999 w-full max-w-[414px] -translate-x-1/2">
      <button
        type="button"
        aria-label="close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[414px] rounded-t-3xl bg-white px-4 pb-6 pt-3"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />
        <h2 className="mb-4 text-center text-[18px] font-semibold">
          카테고리 직접 추가
        </h2>

        {/* 이모지 + 텍스트 입력 */}
        <div className="mb-4 flex h-12 items-center gap-2 rounded-full border border-zinc-200 px-4 focus-within:border-[#2563EB]">
          <span className="text-[20px] leading-none">{selectedEmoji ?? '🏷️'}</span>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="카테고리명을 입력해 주세요"
            className="flex-1 text-[14px] outline-none"
          />
        </div>

        {/* 이모지 그리드 */}
        <div className="mb-4 grid grid-cols-6 gap-3 justify-items-center">
          {EMOJI_LIST.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-[22px] transition ${
                selectedEmoji === emoji
                  ? 'bg-blue-50 ring-2 ring-[#A5B4FC]'
                  : 'bg-white border border-zinc-200'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={[
            'h-14 w-full rounded-full text-[16px] font-medium',
            canSubmit ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500',
          ].join(' ')}
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          완료
        </button>
      </motion.div>
    </div>
  );
};

export default CategoryAddModal;
