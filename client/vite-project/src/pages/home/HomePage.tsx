import { useEffect, useState } from 'react';
import { getHabits } from '../../api/habit';
import HomeEmpty from './components/HomeEmpty';
import HomeList from './components/HomeList';
import type { Habit } from '../../types/habitType';

const HomePage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabits();
        setHabits(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="px-4">
      {habits.length === 0 ? <HomeEmpty /> : <HomeList habits={habits} />}
    </div>
  );
};

export default HomePage;
