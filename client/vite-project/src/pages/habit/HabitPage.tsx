import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IoCalendarOutline, IoAddOutline } from 'react-icons/io5';
import { getHabits } from '../../api/habit';
import HomeEmpty from '../../components/shared/home/HomeEmpty';
import HabitHeatmap from '../../components/shared/habit/HabitHeatmap';
import HabitCategoryFilter from '../../components/shared/habit/HabitCategoryFilter';
import HabitListItem from '../../components/shared/habit/HabitListItem';
import plusButton from '../../assets/buttons/plus-button.png';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const CONTENT_MAX_WIDTH_PX = 414;

const HabitPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: habits, isLoading } = useQuery({
    queryKey: ['habits', todayStr],
    queryFn: () => getHabits({ date: todayStr }),
    refetchOnMount: 'always',
  });

  const filteredHabits = useMemo(() => {
    if (!habits) return [];
    if (selectedCategory === null) return habits;
    return habits.filter((h) => (h.category ?? '미분류') === selectedCategory);
  }, [habits, selectedCategory]);

  if (isLoading) return null;

  if (!habits?.length) {
    return (
      <>
        <div className="flex items-start justify-between px-4 pt-6 pb-2">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
            {today.getMonth() + 1}월
          </h1>
          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate('/createHabit')}
          >
            <IoAddOutline className="text-zinc-600 text-2xl" />
          </button>
        </div>
        <HomeEmpty hideDate />
      </>
    );
  }

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-start justify-between px-4 pt-6 pb-2">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
          {today.getMonth() + 1}월
        </h1>
        <button className="w-8 h-8 flex items-center justify-center">
          <IoCalendarOutline className="text-zinc-600 text-xl" />
        </button>
      </div>

      {/* 잔디 히트맵 */}
      <HabitHeatmap year={today.getFullYear()} month={today.getMonth()} />

      {/* 카테고리 필터 */}
      <HabitCategoryFilter
        habits={habits}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        onManage={() => navigate('/manageCategory')}
      />

      {/* 습관 리스트 */}
      <div className="px-4 mt-4">
        {filteredHabits.map((habit) => (
          <HabitListItem
            key={habit.id}
            habit={habit}
            onClick={() => navigate('/editHabit', { state: { habit } })}
          />
        ))}
      </div>

      {/* 습관 생성 버튼 */}
      <button
        type="button"
        onClick={() => navigate('/createHabit')}
        className="fixed bottom-24"
        style={{
          right: `max(1.5rem, calc((100vw - ${CONTENT_MAX_WIDTH_PX}px) / 2 + 1.5rem))`,
        }}
      >
        <img src={plusButton} alt="습관 생성" className="h-14 w-14" />
      </button>
    </>
  );
};

export default HabitPage;
