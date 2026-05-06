import { IoChevronForward, IoLockClosedOutline } from 'react-icons/io5';
import type { Habit } from '../../../types/habit.type';

const FREQUENCY_LABEL: Record<string, string> = {
  DAILY: '매일',
  WEEKLY: '매주',
  MONTHLY: '매달',
  CUSTOM: '맞춤',
};

type Props = {
  habit: Habit;
  onClick?: () => void;
};

const HabitListItem = ({ habit, onClick }: Props) => {
  return (
    <div
      className="p-3 mb-2 border rounded-xl border-zinc-100 cursor-pointer active:opacity-70"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-zinc-900 truncate">{habit.name}</p>
          <p className='text-xs text-zinc-400'>startDate</p>
          <div className="flex flex-wrap gap-2 mt-3">
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
        <div className="flex items-center gap-1.5 text-zinc-400 pt-0.5 flex-shrink-0">
          <IoLockClosedOutline className="text-base h-3" />
          <IoChevronForward className="text-base" />
        </div>
      </div>
    </div>
  );
};

export default HabitListItem;
