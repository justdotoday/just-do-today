import { IoChevronForward, IoLockClosedOutline } from 'react-icons/io5';
import { colorToHex } from '../../../constants/colors';
import type { Habit } from '../../../types/habit.type';

const FREQUENCY_LABEL: Record<string, string> = {
  DAILY: '매일',
  WEEKLY: '매주',
  MONTHLY: '매달',
  CUSTOM: '맞춤',
};

type Props = {
  habit: Habit;
  /** 히트맵 기준으로 현재 선택된 습관 여부 */
  isSelected?: boolean;
  /** 히트맵 기준 습관으로 선택 */
  onSelect?: () => void;
  /** 수정 페이지로 이동 */
  onClick?: () => void;
};

const HabitListItem = ({ habit, isSelected, onSelect, onClick }: Props) => {
  const accentHex = colorToHex(habit.color);

  return (
    <div
      className={`p-3 mb-2 border rounded-xl cursor-pointer active:opacity-70 transition-colors ${
        isSelected ? 'border-transparent' : 'border-zinc-100'
      }`}
      style={isSelected ? { borderColor: `${accentHex}66` } : undefined}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-2">
        {/* 색상 인디케이터 + 정보 */}
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* 습관 색상 도트 */}
          <div
            className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: accentHex }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-zinc-900 truncate">{habit.name}</p>
            {habit.startDate && (
              <p className="text-xs text-zinc-400">{habit.startDate}~</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-zinc-400 bg-zinc-100 px-2 py-1 rounded-sm">
                {FREQUENCY_LABEL[habit.frequency] ?? habit.frequency}
              </span>
              {habit.status === 'FREEZE' && (
                <span className="text-xs text-blue-500 bg-blue-50 px-2.5 py-1 rounded-sm">
                  🧊 프리즈 중
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 우측 버튼: 수정 이동 */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="flex items-center gap-1 text-zinc-400 pt-0.5 flex-shrink-0 p-1 -mr-1"
          aria-label="수정"
        >
          {Number(habit.isPublic) === 0 && (
            <IoLockClosedOutline className="text-base h-3" />
          )}
          <IoChevronForward className="text-base" />
        </button>
      </div>
    </div>
  );
};

export default HabitListItem;
