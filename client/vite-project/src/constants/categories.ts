import type { CategoryItem } from '../components/habit/CategorySelector';

/** 습관 카테고리 기본 목록 (온보딩 Step2, CreateHabit 등에서 공통 사용) */
export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { name: '건강관리', icon: '💊' },
  { name: '마음챙김', icon: '☕️' },
  { name: '운동', icon: '🏋️' },
  { name: '생활습관', icon: '✅' },
  { name: '자기계발', icon: '📝' },
  { name: '독서', icon: '📖' },
  { name: '공부', icon: '📘' },
  { name: '커리어', icon: '💼' },
  { name: '모닝루틴', icon: '🌞' },
  { name: '나이트루틴', icon: '🌙' },
];
