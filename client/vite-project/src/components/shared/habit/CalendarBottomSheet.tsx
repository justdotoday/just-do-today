import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import DragHandle from '../../ui/DragHandle';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedYear: number;
  selectedMonth: number; // 0-indexed
  onSelect: (year: number, month: number) => void;
};

const today = new Date();

const CalendarBottomSheet = ({
  open,
  onClose,
  selectedYear,
  selectedMonth,
  onSelect,
}: Props) => {
  const [viewYear, setViewYear] = useState(selectedYear);

  const isPastOrCurrent = (month: number) => {
    if (viewYear < today.getFullYear()) return true;
    if (viewYear === today.getFullYear()) return month <= today.getMonth();
    return false;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-999 w-full max-w-[420px] -translate-x-1/2">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white px-4 pb-10 pt-2"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />

        {/* 연도 네비게이션 */}
        <div className="flex items-center justify-center gap-6 my-5">
          <button
            type="button"
            onClick={() => setViewYear((y) => y - 1)}
            className="p-1 text-zinc-400"
          >
            <IoChevronBack className="text-xl" />
          </button>
          <span className="text-[16px] font-medium text-zinc-800 w-20 text-center">
            {viewYear}년
          </span>
          <button
            type="button"
            onClick={() => setViewYear((y) => y + 1)}
            disabled={viewYear >= today.getFullYear()}
            className="p-1 text-zinc-400 disabled:opacity-30"
          >
            <IoChevronForward className="text-xl" />
          </button>
        </div>

        {/* 월 그리드 */}
        <div className="grid grid-cols-4 gap-2 px-1 pb-2">
          {Array.from({ length: 12 }, (_, i) => {
            const active = isPastOrCurrent(i);
            const isSelected = viewYear === selectedYear && i === selectedMonth;
            return (
              <button
                key={i}
                type="button"
                disabled={!active}
                onClick={() => {
                  onSelect(viewYear, i);
                  onClose();
                }}
                className={`h-20 rounded-lg text-[15px] font-medium transition-colors ${
                  isSelected
                    ? 'border bg-blue-50 text-blue-600 font-semibold'
                    : active
                      ? 'border border-zinc-200 text-zinc-800'
                      : 'border border-zinc-200 text-zinc-300'
                }`}
              >
                {i + 1}월
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CalendarBottomSheet;
