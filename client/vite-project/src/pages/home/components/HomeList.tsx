import { useMemo, useState } from 'react';
import HeaderDate from './HeaderDate';
import HabitSection from './HabitSection';
import plusButton from '../../../assets/buttons/plus-button.png';

type HabitItem = {
  id: string;
  title: string;
  status?: 'done' | 'rest' | 'snoozed' | 'pending';
  isSelected?: boolean;
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
      { id: '1', title: '하루 1리터 물 마시기', status: 'done' },
      { id: '2', title: '30분 러닝하기', status: 'snoozed', isSelected: true },
    ],
  },
  {
    icon: '📚',
    title: '마음의 양식',
    items: [
      { id: '3', title: '일주일 한 번 독서감상문', status: 'rest' },
      { id: '4', title: '출근길 책 읽기', status: 'pending' },
      { id: '5', title: '인사이트 팟캐스트 듣기', status: 'pending' },
    ],
  },
  {
    icon: '📚',
    title: '공부',
    items: [
      { id: '6', title: '아이엘츠 단어 외우기', status: 'done' },
      { id: '7', title: '영어단어 10개 암기', status: 'pending' },
    ],
  },
];

const HomeList = () => {
  const [sections, setSections] = useState(SECTIONS);

  const handleToggleDone = (id: string) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.id === id
            ? { ...item, status: item.status === 'done' ? 'pending' : 'done' }
            : item
        ),
      }))
    );
  };

  // 진행중 / 완료 습관 상태 설정 모달 열기
  const openStatusSheet = (id: string) => {
    console.log('open status modal for', id);
  };

  const { inProgressCount, doneCount, progressPercent } = useMemo(() => {
    const flat = sections.flatMap((s) => s.items);
    const done = flat.filter(
      (i) => i.status === 'done' || i.status === 'rest'
    ).length;
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
            onToggleDone={handleToggleDone}
            onOpenModal={openStatusSheet}
          />
        ))}
      </div>

      <button type="button" className="fixed bottom-24 right-6">
        <img src={plusButton} alt="습관 추가" className="h-14 w-14" />
      </button>
    </div>
  );
};

export default HomeList;
