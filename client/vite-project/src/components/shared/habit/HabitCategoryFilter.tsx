import { IoSettingsOutline } from 'react-icons/io5';
import type { Habit } from '../../../types/habit.type';
import { COLORS } from '../../../constants/colors';

type Props = {
  habits: Habit[];
  selected: string | null; // null = 전체
  onSelect: (category: string | null) => void;
  onManage: () => void;
};

const HabitCategoryFilter = ({ habits, selected, onSelect, onManage }: Props) => {
  const categoryMap = habits.reduce<Record<string, { count: number; emoji: string | null }>>(
    (acc, h) => {
      const key = h.category ?? '미분류';
      if (!acc[key]) acc[key] = { count: 0, emoji: h.emoji ?? null };
      acc[key].count++;
      return acc;
    },
    {}
  );

  const categories = Object.entries(categoryMap);

  return (
    <div className="flex items-center gap-2 px-4 mt-5 overflow-x-auto scrollbar-hide pb-1">
      <button
        onClick={onManage}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200"
      >
        <IoSettingsOutline className="text-zinc-500 text-lg" />
      </button>

      <button
        onClick={() => onSelect(null)}
        className="flex-shrink-0 px-3 h-9 rounded-full border text-sm transition-colors"
        style={
          selected === null
            ? {
                borderColor: '#C0D2FA',
                color: COLORS.primary,
                backgroundColor: '#EEF3FE',
              }
            : { borderColor: '#E4E4E7', color: '#52525B' }
        }
      >
        전체
      </button>

      {categories.map(([name, { count, emoji }]) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className="flex-shrink-0 flex items-center gap-1 px-3 h-9 rounded-full border text-sm font-medium transition-colors"
          style={
            selected === name
              ? {
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.primary,
                  color: '#fff',
                }
              : { borderColor: '#E4E4E7', color: '#52525B' }
          }
        >
          {emoji && <span>{emoji}</span>}
          <span>
            {name} ({count})
          </span>
        </button>
      ))}
    </div>
  );
};

export default HabitCategoryFilter;
