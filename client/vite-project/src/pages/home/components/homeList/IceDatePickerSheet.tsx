/** 얼음(프리즈) 날짜 선택 바텀시트: 미룰 날짜를 달력에서 선택. */
import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import DragHandle from '../../../../components/DragHandle';

type CalendarValue = Date | null | [Date | null, Date | null];

type Props = {
  open: boolean;
  habitTitle?: string;
  onClose: () => void;
  /** 선택한 날짜 확정 시 호출 */
  onSelectDate: (date: Date) => void;
};

const IceDatePickerSheet = ({
  open,
  habitTitle,
  onClose,
  onSelectDate,
}: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (value: CalendarValue) => {
    if (value instanceof Date) setSelectedDate(value);
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    onSelectDate(selectedDate);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-999 w-full max-w-[414px] -translate-x-1/2">
      <button
        type="button"
        aria-label="close overlay"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 w-full rounded-t-[34px] bg-white px-3 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 80 || info.velocity.y > 300) onClose();
        }}
      >
        <DragHandle />

        <h2 className="mt-1 text-[17px] font-bold text-zinc-900">
          {habitTitle ?? '습관'}
        </h2>
        <p className="mt-1 mb-4 text-[14px] font-medium text-zinc-400">
          이 얼음을 땡! 할 날짜를 선택해 주세요.
        </p>

        {/* 달력 */}
        <div className="ice-calendar mt-2 rounded-2xl px-1">
          <Calendar
            onChange={handleChange}
            value={selectedDate}
            locale="ko-KR"
            calendarType="gregory"
            minDate={new Date(today.getTime() + 24 * 60 * 60 * 1000)}
            formatDay={(_, date) => String(date.getDate())}
            formatShortWeekday={(_, date) =>
              ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
            }
            showNeighboringMonth={false}
            showNavigation={false}
          />
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!selectedDate}
          className="mt-7 h-[68px] w-full rounded-full bg-[#3569E8] text-[16px] font-semibold text-white transition disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          선택하기
        </button>
      </motion.div>
    </div>
  );
};

export default IceDatePickerSheet;
