/** 홈 습관 리스트 화면. 날짜·진행률 헤더, 카테고리별 섹션, 완료 스낵바·상태 바텀시트를 담당. */
import { useEffect, useMemo, useState } from 'react';
import { showToast } from '../../../../components/ui/toast/Toast';
import CompletionSnackbar from '../../../../components/ui/toast/CompletionSnackbar';
import HeaderDate from './HeaderDate';
import HabitSection from './HabitSection';
import StatusBottomSheet from './StatusBottomSheet';
import plusButton from '../../../../assets/buttons/plus-button.png';
import type { Habit } from '../../../../types/habitType';
import { DEFAULT_CATEGORIES } from '../../../../constants/categories';
import { deleteHabit } from '../../../../api/habit';

const CONTENT_MAX_WIDTH_PX = 414;
const FALLBACK_CATEGORY_ICON = '📌';
const UNCATEGORIZED_LABEL = '미분류';
const DONE_STATUSES: ReadonlySet<string> = new Set(['done', 'heart']);

type HabitItem = {
  id: string;
  title: string;
  color?: string | null;
  status?: 'done' | 'heart' | 'freeze' | 'notDone';
  isSelected?: boolean;
};

type Section = {
  icon: string;
  title: string;
  items: HabitItem[];
};

type HomeListProps = {
  habits: Habit[];
  onHabitsRefetch?: () => void | Promise<void>;
};

type HabitStatus = 'done' | 'heart' | 'freeze' | 'notDone';

function formatDateLabel(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function getCategoryKey(category: string | null | undefined): string {
  const value =
    category == null ? '' : typeof category === 'string' ? category.trim() : '';
  return value === '' || value === 'null' ? UNCATEGORIZED_LABEL : value;
}

function habitsToSections(habits: Habit[]): Section[] {
  if (habits.length === 0) return [];

  const byCategory = habits.reduce<Record<string, Habit[]>>((acc, h) => {
    const key = getCategoryKey(h.category);
    (acc[key] ??= []).push(h);
    return acc;
  }, {});

  const knownOrder = DEFAULT_CATEGORIES.map((c) => c.name).filter(
    (name) => (byCategory[name]?.length ?? 0) > 0
  );
  const rest = Object.keys(byCategory).filter((name) => !knownOrder.includes(name));
  const order = [...knownOrder, ...rest];

  return order.map((categoryName) => ({
    icon:
      DEFAULT_CATEGORIES.find((c) => c.name === categoryName)?.icon ?? FALLBACK_CATEGORY_ICON,
    title: categoryName,
    items: (byCategory[categoryName] ?? []).map((h) => ({
      id: String(h.id),
      title: h.name,
      color: h.color ?? null,
      status: 'notDone' as const,
    })),
  }));
}

function isCountedAsDone(item: HabitItem): boolean {
  return item.status !== undefined && DONE_STATUSES.has(item.status);
}

function useHabitSections(habits: Habit[]) {
  const [sections, setSections] = useState<Section[]>(() => habitsToSections(habits));

  useEffect(() => {
    setSections(habitsToSections(habits));
  }, [habits]);

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

  const selectOnly = (id: string) => {
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

  return { sections, updateItem, selectOnly };
}

const HomeList = ({ habits, onHabitsRefetch }: HomeListProps) => {
  const { sections, updateItem, selectOnly } = useHabitSections(habits);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);
  const [completionSnackbarVisible, setCompletionSnackbarVisible] = useState(false);

  const handleToggleDone = (id: string) => {
    updateItem(id, (item) => {
      if (item.status !== 'done') setCompletionSnackbarVisible(true);
      return { ...item, status: item.status === 'done' ? 'notDone' : 'done' };
    });
  };

  const handleSelectStatus = (status: HabitStatus) => {
    if (!activeItemId) return;
    updateItem(activeItemId, (item) => ({ ...item, status }));
    setIsStatusSheetOpen(false);
  };

  const handleDelete = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      showToast.success('습관이 삭제되었어요');
    } catch {
      showToast.error('삭제에 실패했어요');
      throw new Error('delete failed');
    }
  };

  const activeItem = useMemo(
    () => sections.flatMap((s) => s.items).find((i) => i.id === activeItemId) ?? null,
    [activeItemId, sections]
  );

  const { inProgressCount, doneCount, progressPercent } = useMemo(() => {
    const items = sections.flatMap((s) => s.items);
    const total = items.length;
    const doneCount = items.filter(isCountedAsDone).length;
    return {
      inProgressCount: total - doneCount,
      doneCount,
      progressPercent: total === 0 ? 0 : Math.round((doneCount / total) * 100),
    };
  }, [sections]);

  return (
    <div className="px-4 pt-6 pb-28">
      <HeaderDate
        dateLabel={formatDateLabel(new Date())}
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
            onOpenModal={(id) => {
              setActiveItemId(id);
              setIsStatusSheetOpen(true);
            }}
            onToggleSelect={selectOnly}
          />
        ))}
      </div>

      <button
        type="button"
        className="fixed bottom-24"
        style={{
          right: `max(1.5rem, calc((100vw - ${CONTENT_MAX_WIDTH_PX}px) / 2 + 1.5rem))`,
        }}
      >
        <img src={plusButton} alt="더보기" className="h-14 w-14" />
      </button>

      <StatusBottomSheet
        open={isStatusSheetOpen}
        title={activeItem?.title}
        habitId={activeItemId}
        onClose={() => setIsStatusSheetOpen(false)}
        onSelectStatus={handleSelectStatus}
        onEdit={() => {
          setIsStatusSheetOpen(false);
          showToast.default('수정 기능 준비 중이에요');
        }}
        onDelete={handleDelete}
        onHabitsRefetch={onHabitsRefetch}
      />

      <CompletionSnackbar
        visible={completionSnackbarVisible}
        onDismiss={() => setCompletionSnackbarVisible(false)}
        onRecordClick={() => {}}
      />
    </div>
  );
};

export default HomeList;
