/** 홈 리스트용 순수 로직: habits → 카테고리별 섹션, 진행률 계산. */
import type { Habit } from '../../../../types/habitType';
import { DEFAULT_CATEGORIES } from '../../../../constants/categories';

const FALLBACK_CATEGORY_ICON = '📌';
const UNCATEGORIZED_LABEL = '미분류';
const DONE_STATUSES: ReadonlySet<string> = new Set(['done', 'heart']);

export type HabitItem = {
  id: string;
  title: string;
  color?: string | null;
  status?: 'done' | 'heart' | 'freeze' | 'notDone';
  isSelected?: boolean;
};

export type Section = {
  icon: string;
  title: string;
  items: HabitItem[];
};

export function formatDateLabel(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function getCategoryKey(category: string | null | undefined): string {
  const value =
    category == null ? '' : typeof category === 'string' ? category.trim() : '';
  return value === '' || value === 'null' ? UNCATEGORIZED_LABEL : value;
}

export function habitsToSections(habits: Habit[]): Section[] {
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
