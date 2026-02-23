import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getHabits } from '../../api/habit';
import HomeEmpty from './components/HomeEmpty';
import HomeList from './components/homeList';
import type { Habit } from '../../types/habitType';

type HomeViewState = { view?: 'list' | 'empty' };

const HomePage = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as HomeViewState;
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const data = await getHabits({ date: today });
      setHabits(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  if (loading) return <div>로딩중...</div>;

  /** 습관이 0개면 항상 HomeEmpty (마지막 습관 삭제 시에도 빈 화면으로 전환) */
  if (habits.length === 0) {
    return (
      <div className="px-4">
        <HomeEmpty />
      </div>
    );
  }

  if (state.view === 'empty') {
    return (
      <div className="px-4">
        <HomeEmpty />
      </div>
    );
  }

  return (
    <div className="px-4">
      <HomeList habits={habits} onHabitsRefetch={fetchHabits} />
    </div>
  );
};

export default HomePage;
