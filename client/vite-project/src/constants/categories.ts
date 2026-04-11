import type { CategoryItem } from '../components/habit/CategorySelector';

/** 습관 카테고리 기본 목록 (온보딩 Step2) */
export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 1,  name: '건강관리', icon: '💊' },
  { id: 2,  name: '마음챙김', icon: '☕️' },
  { id: 3,  name: '운동',     icon: '🏋️' },
  { id: 4,  name: '생활습관', icon: '✅' },
  { id: 5,  name: '자기계발', icon: '📝' },
  { id: 6,  name: '독서',     icon: '📖' },
  { id: 7,  name: '공부',     icon: '📘' },
  { id: 8,  name: '커리어',   icon: '💼' },
  { id: 11, name: '모닝루틴', icon: '🌞' },
  { id: 9,  name: '나이트루틴', icon: '🌙' },
];
