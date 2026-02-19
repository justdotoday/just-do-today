import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import HeaderDate from './HeaderDate';
import HabitSection from './HabitSection';
import StatusBottomSheet from './StatusBottomSheet';
import plusButton from '../../../assets/buttons/plus-button.png';
import type { Habit } from '../../../types/habitType';
import { DEFAULT_CATEGORIES } from '../../../constants/categories';
import { deleteHabit } from '../../../api/habit';

// ---------------------------------------------------------------------------
// 상수
// ---------------------------------------------------------------------------
const FALLBACK_CATEGORY_ICON = '📌';
const UNCATEGORIZED_LABEL = '미분류';
const CONTENT_MAX_WIDTH_PX = 414;
const HEADER_DATE_LABEL = '1월 17일';

/** 완료로 집계되는 상태 (진행률·완료 수 계산용) */
const DONE_STATUSES: ReadonlySet<HabitItem['status']> = new Set([
  'done',
  'heart',
]);

// ---------------------------------------------------------------------------
// 타입
// ---------------------------------------------------------------------------
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
  /** 습관 삭제 등으로 목록이 바뀐 뒤 호출. 호출 시 HomePage가 다시 조회해 habits.length === 0이면 HomeEmpty로 전환 */
  onHabitsRefetch?: () => void | Promise<void>;
};

// ---------------------------------------------------------------------------
// 순수 함수: 습관 → 카테고리별 섹션
// ---------------------------------------------------------------------------
/**
 * 카테고리 표시 키. 직접 추가한 카테고리 등 API에서 내려준 이름은 그대로 사용하고,
 * null/빈 값/문자열 "null"일 때만 '미분류'로 표시한다.
 */
function getCategoryKey(category: string | null | undefined): string {
  const value =
    category == null ? '' : typeof category === 'string' ? category.trim() : '';
  if (value === '' || value === 'null') return UNCATEGORIZED_LABEL;
  return value;
}

/** 습관을 카테고리별 섹션으로 묶음. DEFAULT_CATEGORIES 순서 유지. */
function habitsToSections(habits: Habit[]): Section[] {
  if (habits.length === 0) return [];

  // 카테고리명 → 해당 습관 배열 (그룹핑)
  const byCategory = habits.reduce<Record<string, Habit[]>>((acc, h) => {
    const key = getCategoryKey(h.category);
    (acc[key] ??= []).push(h);
    return acc;
  }, {});

  // 기본 카테고리 순서 중, 실제로 습관이 있는 것만 (순서 유지)
  const knownOrder = DEFAULT_CATEGORIES.map((c) => c.name).filter(
    (name) => (byCategory[name]?.length ?? 0) > 0
  );
  // 직접 추가한 카테고리 등 기본 목록에 없는 이름들
  const rest = Object.keys(byCategory).filter(
    (name) => !knownOrder.includes(name)
  );
  // 최종 섹션 순서: 기본 순서 먼저, 그 다음 나머지
  const order = [...knownOrder, ...rest];

  return order.map((categoryName) => ({
    icon:
      DEFAULT_CATEGORIES.find((c) => c.name === categoryName)?.icon ??
      FALLBACK_CATEGORY_ICON,
    title: categoryName,
    items: (byCategory[categoryName] ?? []).map((h) => ({
      id: String(h.id),
      title: h.name,
      status: 'notDone' as const,
    })),
  }));
}

/** 아이템이 완료로 집계되는지 여부 */
function isCountedAsDone(item: HabitItem): boolean {
  return item.status !== undefined && DONE_STATUSES.has(item.status);
}

// ---------------------------------------------------------------------------
// 훅: 섹션 상태 및 아이템 업데이트 (단일 책임)
// ---------------------------------------------------------------------------
function useHabitSections(habits: Habit[]) {
  // habits를 카테고리별 섹션으로 변환한 결과를 보관 (체크/하트 등 로컬 상태 반영용)
  const [sections, setSections] = useState<Section[]>(() =>
    habitsToSections(habits)
  );

  // habits가 바뀌면(조회 갱신·삭제 등) 섹션을 다시 계산해서 동기화
  useEffect(() => {
    setSections(habitsToSections(habits));
  }, [habits]);

  // id에 해당하는 습관 아이템만 updater로 갱신 (완료 토글, 상태 변경 등)
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

  /** 한 개만 선택: 클릭한 아이템만 토글, 나머지 해제 */
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

// ---------------------------------------------------------------------------
// 컴포넌트
// ---------------------------------------------------------------------------
const HomeList = ({ habits, onHabitsRefetch }: HomeListProps) => {
  const { sections, updateItem, selectOnly } = useHabitSections(habits);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);

  const handleToggleDone = (id: string) => {
    updateItem(id, (item) => ({
      ...item,
      status: item.status === 'done' ? 'notDone' : 'done',
    }));
  };

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

  const handleEdit = () => {
    closeStatusSheet();
    // TODO: 습관 수정 화면 연결 (예: /habit/edit/:id)
    toast('수정 기능 준비 중이에요');
  };

  const handleDelete = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      toast.success('습관이 삭제되었어요');
    } catch {
      toast.error('삭제에 실패했어요');
      throw new Error('delete failed');
    }
  };

  const activeItem = useMemo(() => {
    if (!activeItemId) return null;
    return sections
      .flatMap((section) => section.items)
      .find((item) => item.id === activeItemId);
  }, [activeItemId, sections]);

  const { inProgressCount, doneCount, progressPercent } = useMemo(() => {
    const allItems = sections.flatMap((s) => s.items);
    const total = allItems.length;
    const doneCount = allItems.filter(isCountedAsDone).length;
    const inProgressCount = total - doneCount;
    const progressPercent =
      total === 0 ? 0 : Math.round((doneCount / total) * 100);

    return { inProgressCount, doneCount, progressPercent };
  }, [sections]);

  const plusButtonRightStyle = {
    right: `max(1.5rem, calc((100vw - ${CONTENT_MAX_WIDTH_PX}px) / 2 + 1.5rem))`,
  };

  return (
    <div className="px-4 pt-6 pb-28">
      <HeaderDate
        dateLabel={HEADER_DATE_LABEL}
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
            onToggleSelect={selectOnly}
          />
        ))}
      </div>

      <button
        type="button"
        className="fixed bottom-24"
        style={plusButtonRightStyle}
      >
        <img src={plusButton} alt="더보기" className="h-14 w-14" />
      </button>

      <StatusBottomSheet
        open={isStatusSheetOpen}
        title={activeItem?.title}
        habitId={activeItemId}
        onClose={closeStatusSheet}
        onSelectStatus={handleSelectStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onHabitsRefetch={onHabitsRefetch}
      />
    </div>
  );
};

export default HomeList;
