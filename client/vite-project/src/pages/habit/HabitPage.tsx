import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IoCalendarOutline, IoAddOutline } from 'react-icons/io5';
import { getHabits } from '../../api/habit';
import { getHabitHeatmap } from '../../api/habit';
import HomeEmpty from '../../components/shared/home/HomeEmpty';
import HabitHeatmap from '../../components/shared/habit/HabitHeatmap';
import HabitCategoryFilter from '../../components/shared/habit/HabitCategoryFilter';
import HabitListItem from '../../components/shared/habit/HabitListItem';
import CalendarBottomSheet from '../../components/shared/habit/CalendarBottomSheet';
import plusButton from '../../assets/buttons/plus-button.png';
import type { Habit } from '../../types/habit.type';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const CONTENT_MAX_WIDTH_PX = 414;

const HabitPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // 히트맵 기준 습관 (탭으로 변경 가능)
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

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

  // 필터 변경 시 → 첫 번째 습관으로 자동 선택
  useEffect(() => {
    setSelectedHabit(filteredHabits[0] ?? null);
  }, [filteredHabits]);

  // 히트맵에 쓸 monthly logs 조회
  const { data: heatmapData } = useQuery({
    queryKey: ['heatmap', viewYear, viewMonth],
    queryFn: () => getHabitHeatmap(viewYear, viewMonth + 1), // API는 1-indexed
  });

  // HeatmapDay[] → { 'YYYY-MM-DD': count } 맵으로 변환
  const logMap = useMemo<Record<string, number>>(() => {
    if (!heatmapData?.days) return {};
    return Object.fromEntries(
      heatmapData.days
        .filter((d) => d.count > 0)
        .map((d) => [d.date, d.count])
    );
  }, [heatmapData]);

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
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
            {viewMonth + 1}월
          </h1>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center"
          onClick={() => setIsCalendarOpen(true)}
        >
          <IoCalendarOutline className="text-zinc-600 text-xl" />
        </button>
      </div>

      {/* 잔디 히트맵 (선택된 습관 기준) */}
      <HabitHeatmap
        year={viewYear}
        month={viewMonth}
        logs={logMap}
      />

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
            onSelect={() => navigate('/habitDetail', { state: { habit } })}
            onClick={() => navigate('/habitDetail', { state: { habit } })}
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

      <CalendarBottomSheet
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedYear={viewYear}
        selectedMonth={viewMonth}
        onSelect={(year, month) => {
          setViewYear(year);
          setViewMonth(month);
        }}
      />
    </>
  );
};

export default HabitPage;
