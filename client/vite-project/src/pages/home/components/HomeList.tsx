import { useMemo } from 'react';
import HeaderDate from './HeaderDate';
import HabitSection from './HabitSection';

type HabitItem = {
  id: string;
  title: string;
  isDone?: boolean;
};

type Section = {
  icon: string;
  title: string;
  items: HabitItem[];
};

const SECTIONS: Section[] = [
  {
    icon: '💊',
    title: '건강',
    items: [
      { id: '1', title: '하루 1리터 물 마시기', isDone: true },
      { id: '2', title: '30분 러닝하기' },
    ],
  },
  {
    icon: '📚',
    title: '마음의 양식',
    items: [
      { id: '3', title: '일주일 한 번 독서감상문' },
      { id: '4', title: '출근길 책 읽기' },
    ],
  },
];

const HomeList = () => {
  const sections = SECTIONS;

  const { inProgressCount, doneCount, progressPercent } = useMemo(() => {
    const flat = sections.flatMap((s) => s.items);
    const done = flat.filter((i) => i.isDone).length;
    const total = flat.length;
    const inProgress = total - done;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    return {
      inProgressCount: inProgress,
      doneCount: done,
      progressPercent: percent,
    };
  }, [sections]);

  return (
    <div className="px-4 pt-6 pb-28">
      <HeaderDate
        dateLabel="1월 17일"
        inProgressCount={inProgressCount}
        doneCount={doneCount}
        progressPercent={progressPercent}
      />

      <div className="mt-8 space-y-10">
        {sections.map((s) => (
          <HabitSection
            key={s.title}
            icon={s.icon}
            title={s.title}
            items={s.items}
          />
        ))}
      </div>

      <button className="fixed bottom-24 right-6 grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-3xl text-white shadow">
        +
      </button>
    </div>
  );
};

export default HomeList;
