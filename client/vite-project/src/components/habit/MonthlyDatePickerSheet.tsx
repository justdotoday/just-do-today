// 월간 반복 날짜 선택 바텀시트
import { useState } from 'react';
import { motion } from 'framer-motion';
import DragHandle from '../DragHandle';
import { COLORS } from '../../constants/colors';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (day: number) => void;
  initialDay?: number;
};

const WEEK_HEADERS = ['일', '월', '화', '수', '목', '금', '토'];

const MonthlyDatePickerSheet = ({
  open,
  onClose,
  onSelect,
  initialDay,
}: Props) => {
  const today = new Date();
  const todayDate = today.getDate();

  const [selectedDay, setSelectedDay] = useState<number>(
    initialDay ?? todayDate
  );
  const [startFromToday, setStartFromToday] = useState(true);

  if (!open) return null;

  // 이번 달 1일의 요일(0=일, 6=토)과 마지막 날짜
  const firstDayOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).getDay();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  // 달력 셀 배열 (앞에 빈칸 + 날짜)
  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: lastDay }, (_, i) => i + 1),
  ];

  const handleConfirm = () => {
    onSelect(selectedDay);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 left-1/2 z-50 w-full max-w-[320px] -translate-x-1/2">
      <button
        type="button"
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white px-5 pb-8 pt-3"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />

        {/* 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-zinc-900">
            반복 날짜 선택
          </h2>
          <span className="text-[14px] text-zinc-500">
            매월{' '}
            <span className="font-bold" style={{ color: COLORS.primary }}>
              {selectedDay}
            </span>
            일에 반복
          </span>
        </div>

        {/* 오늘부터 시작하기 */}
        <button
          type="button"
          onClick={() => setStartFromToday((v) => !v)}
          className="mb-5 flex items-center gap-2"
        >
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full transition"
            style={
              startFromToday ? { backgroundColor: COLORS.primary } : undefined
            }
            {...(!startFromToday && {
              className:
                'flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-300 bg-white transition',
            })}
          >
            {startFromToday && (
              <svg width="9" height="9" viewBox="0 0 12 9" fill="none">
                <path
                  d="M1 4L4.5 7.5L11 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-zinc-700">
            오늘부터 시작하기
          </span>
        </button>

        {/* 요일 헤더 */}
        <div className="mb-1 grid grid-cols-7">
          {WEEK_HEADERS.map((d) => (
            <div
              key={d}
              className="py-1 text-center text-[12px] font-medium text-zinc-400"
            >
              {d}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => (
            <div key={idx} className="flex items-center justify-center py-1">
              {day !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-medium transition"
                  style={
                    selectedDay === day
                      ? { backgroundColor: '#EFF6FF', color: COLORS.primary }
                      : { color: '#27272a' }
                  }
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 선택하기 버튼 */}
        <button
          type="button"
          onClick={handleConfirm}
          className="mt-5 h-12 w-full rounded-full text-[16px] font-semibold text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          선택하기
        </button>
      </motion.div>
    </div>
  );
};

export default MonthlyDatePickerSheet;
