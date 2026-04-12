/** 홈 리스트용 순수 로직: habits → 카테고리별 섹션, 진행률 계산. */
import type { Habit } from '../../../../types/habitType';
import { DEFAULT_CATEGORIES } from '../../../../constants/categories';

const UNCATEGORIZED_LABEL = '미분류';
const DONE_STATUSES: ReadonlySet<string> = new Set(['done', 'heart']);

export type HabitItem = {
  id: string;
  userHabitId?: number;
  title: string;
  color?: string | null;
  status?: 'done' | 'heart' | 'freeze' | 'notDone';
  isSelected?: boolean;
  /** 얼음 상태일 때 미룬 날짜 */
  freezeUntil?: Date;
};

export type Section = {
  icon: string;
  title: string;
  items: HabitItem[];
};

export function formatDateLabel(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function apiStatusToUiStatus(status: string): HabitItem['status'] {
  switch (status) {
    case 'freeze':
      return 'freeze';
    case 'done':
      return 'done';
    case 'heart':
      return 'heart';
    default:
      return 'notDone';
  }
}

function getCategoryKey(category: string | null | undefined): string {
  if (category == null) return UNCATEGORIZED_LABEL;
  const trimmed = category.trim();
  if (trimmed === '' || trimmed === 'null') return UNCATEGORIZED_LABEL;
  return trimmed;
}

export function habitsToSections(habits: Habit[]): Section[] {
  if (habits.length === 0) return [];

  // 카테고리별로 그룹핑
  const byCategory: Record<string, Habit[]> = {};
  habits.forEach((h) => {
    const key = getCategoryKey(h.category);
    if (!byCategory[key]) byCategory[key] = [];
    byCategory[key].push(h);
  });

  // 알려진 카테고리 순서 우선, 나머지는 뒤에 배치
  const knownOrder = DEFAULT_CATEGORIES.map((c) => c.name).filter(
    (name) => byCategory[name] != null
  );
  const rest = Object.keys(byCategory).filter(
    (name) => !knownOrder.includes(name)
  );
  const order = [...knownOrder, ...rest];

  return order.map((categoryName) => ({
    // API 응답의 emoji 우선, 없으면 DEFAULT_CATEGORIES에서 룩업
    icon:
      byCategory[categoryName][0]?.emoji ??
      DEFAULT_CATEGORIES.find((c) => c.name === categoryName)?.icon ??
      '',
    title: categoryName,
    items: (byCategory[categoryName] ?? []).map((h) => ({
      id: String(h.id),
      userHabitId: Number(h.id),
      title: h.name,
      color: h.color ?? null,
      status: apiStatusToUiStatus(h.status),
    })),
  }));
}

function isCountedAsDone(item: HabitItem): boolean {
  return item.status !== undefined && DONE_STATUSES.has(item.status);
}

export function computeProgress(sections: Section[]) {
  const items = sections.flatMap((s) => s.items);
  const total = items.length;
  const doneCount = items.filter(isCountedAsDone).length;
  return {
    inProgressCount: total - doneCount,
    doneCount,
    progressPercent: total === 0 ? 0 : Math.round((doneCount / total) * 100),
  };
}
