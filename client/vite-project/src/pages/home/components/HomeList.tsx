import { useEffect, useMemo, useState } from 'react';
import HeaderDate from './HeaderDate';
import HabitSection from './HabitSection';
import StatusBottomSheet from './StatusBottomSheet';
import plusButton from '../../../assets/buttons/plus-button.png';
import type { Habit } from '../../../types/habitType';

type HabitItem = {
  id: string;
  title: string;
  status?: 'done' | 'heart' | 'freeze' | 'notDone';
  isSelected?: boolean;
};
type HabitStatus = 'done' | 'heart' | 'freeze' | 'notDone';

type Section = {
  icon: string;
  title: string;
  items: HabitItem[];
};

type HomeListProps = {
  habits: Habit[];
};

function habitsToSections(habits: Habit[]): Section[] {
  if (habits.length === 0) return [];
  const items: HabitItem[] = habits.map((h) => ({
    id: String(h.id),
    title: h.name,
    status: 'notDone',
  }));
  return [{ icon: '📌', title: '내 습관', items }];
}

const HomeList = ({ habits }: HomeListProps) => {
  const [sections, setSections] = useState<Section[]>(() =>
    habitsToSections(habits)
  );
  useEffect(() => {
    setSections(habitsToSections(habits));
  }, [habits]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);

  const updateItem = (id: string, updater: (item: HabitItem) => HabitItem) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.id === id ? updater(item) : item
        ),
      }))
    );
  };

  const handleToggleDone = (id: string) => {
    updateItem(id, (item) => ({
      ...item,
      status: item.status === 'done' ? 'notDone' : 'done',
    }));
  };

  // 한 개만 선택 가능: 클릭한 아이템만 선택, 나머지는 해제
  const handleToggleSelect = (id: string) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.id === id
            ? { ...item, isSelected: !item.isSelected }
            : { ...item, isSelected: false }
        ),
      }))
    );
  };

  // 진행중 / 완료 습관 상태 설정 모달 열기
  const openStatusSheet = (id: string) => {
    setActiveItemId(id);
    setIsStatusSheetOpen(true);
  };

  const closeStatusSheet = () => {
    setIsStatusSheetOpen(false);
  };

  const handleSelectStatus = (status: HabitStatus) => {
    if (!activeItemId) return;
    updateItem(activeItemId, (item) => ({ ...item, status }));
    setIsStatusSheetOpen(false);
  };

  const activeItem = useMemo(() => {
    if (!activeItemId) return null;
    return sections
      .flatMap((section) => section.items)
      .find((item) => item.id === activeItemId);
  }, [activeItemId, sections]);

  const { inProgressCount, doneCount, progressPercent } = useMemo(() => {
    const flat = sections.flatMap((s) => s.items);
    const done = flat.filter(
      (i) => i.status === 'done' || i.status === 'heart'
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
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>

      <button
        type="button"
        className="fixed bottom-24 right-[max(1.5rem,calc((100vw-414px)/2+1.5rem))]"
      >
        <img src={plusButton} alt="더보기" className="h-14 w-14" />
      </button>

      <StatusBottomSheet
        open={isStatusSheetOpen}
        title={activeItem?.title}
        onClose={closeStatusSheet}
        onSelectStatus={handleSelectStatus}
      />
    </div>
  );
};

export default HomeList;
