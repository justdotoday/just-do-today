/** 완료 체크 후 오늘의 기록을 남기는 바텀시트. */
import { useState } from 'react';
import { motion } from 'framer-motion';
import DragHandle from '../../../../ui/DragHandle';
import { COLORS } from '../../../../../constants/colors';

const FEELING_OPTIONS = [
  '시도한 것에 의미를 둬요 🥲',
  '계획했던 흐름을 잘 이어갔어요 👍',
  '아주 뿌듯해요! 완벽하게 해냈어요 🔥',
];

type Props = {
  open: boolean;
  onClose: () => void;
  onFinish: (data: { mood: string; note: string }) => void;
};

const DailyLogBottomSheet = ({ open, onClose, onFinish }: Props) => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-999 w-full max-w-[420px] -translate-x-1/2">
      <button
        type="button"
        aria-label="close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 w-full rounded-t-3xl bg-white px-5 pt-3 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />

        {/* 감정 선택 */}
        <div className="mt-5">
          <p className="my-5 text-[16px] font-semibold text-zinc-800">
            오늘 습관 수행은 어땠나요?
          </p>
          <div className="flex flex-col gap-2">
            {FEELING_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMood(option)}
                className="rounded-full border px-4 py-2.5 text-left text-[13px] transition"
                style={{
                  borderColor: mood === option ? COLORS.primary : '#e4e4e7',
                  color: mood === option ? COLORS.primary : '#a1a1aa',
                  backgroundColor: mood === option ? '#eff1ff' : 'white',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* 메모 입력 */}
        <div className="mt-6">
          <p className="my-5 text-[16px] font-semibold text-zinc-800">
            남기고 싶은 내용이 있나요?
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="운동하는 습관을 들여서 건강해지고 싶어요!"
            rows={4}
            className="w-full h-30 rounded-2xl border border-zinc-200 bg-white p-3 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-none"
            style={{
              borderColor: note.length > 0 ? COLORS.primary : undefined,
            }}
          />
        </div>

        {/* 기록 저장 버튼 */}
        <button
          type="button"
          onClick={() => onFinish({ mood, note })}
          className="mt-4 h-13 w-full rounded-full text-[16px]  text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          기록하기
        </button>
      </motion.div>
    </div>
  );
};

export default DailyLogBottomSheet;
