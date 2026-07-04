import { useState } from 'react';
import { motion } from 'framer-motion';
import DragHandle from '../../../../ui/DragHandle';
import { COLORS } from '../../../../../constants/colors';

const MOOD_LABEL: Record<string, string> = {
  ATTEMPT: '시도😗',
  MAINTAIN: '유지👍',
  PERFECT: '완벽🔥',
};

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
}

type Props = {
  open: boolean;
  date: string; // 'YYYY-MM-DD'
  mood: string;
  note: string;
  habitColor: string; // hex
  onClose: () => void;
  onSave: (note: string) => void;
};

const DailyLogViewBottomSheet = ({ open, date, mood, note: initialNote, habitColor, onClose, onSave }: Props) => {
  const [note, setNote] = useState(initialNote);
  const isDirty = note !== initialNote;

  if (!open) return null;

  const handleAction = () => {
    if (isDirty) {
      onSave(note);
    } else {
      onClose();
    }
  };

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

        {/* 날짜 + 기분칩 + 색상칩 */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[17px] font-bold text-zinc-900">
            {formatDateLabel(date)}
          </span>
          <div className="flex items-center gap-2">
            {MOOD_LABEL[mood] && (
              <span
                className="text-[13px] font-medium px-3 py-1 rounded-full"
                style={{ backgroundColor: `${habitColor}22`, color: habitColor }}
              >
                {MOOD_LABEL[mood]}
              </span>
            )}
          </div>
        </div>

        {/* 메모 */}
        <div className="mt-5">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full h-30 rounded-2xl border bg-white p-3 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-none transition-colors"
            style={{
              borderColor: isDirty ? COLORS.primary : '#e4e4e7',
            }}
          />
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-13 rounded-full border border-zinc-200 text-[16px] text-zinc-600"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => onSave(note)}
            disabled={!isDirty}
            className="flex-1 h-13 rounded-full text-[16px] text-white transition-colors disabled:opacity-40"
            style={{ backgroundColor: COLORS.primary }}
          >
            {isDirty ? '저장' : '수정'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyLogViewBottomSheet;
