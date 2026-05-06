// 습관 폼 공통 상태·로직 훅 — 온보딩(Step2/3)과 CreateHabit이 공유
import { useCallback, useMemo, useState } from 'react';
import type { CategoryItem } from '../components/shared/habit/CategorySelector';
import { showToast } from '../components/ui/toast/Toast';

type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

type InitialValues = {
  name?: string;
  color?: string;
  selectedCategory?: string | null;
  frequency?: Frequency;
  selectedDays?: string[];
  isPublic?: boolean;
};

type UseHabitFormOptions = {
  baseCategories?: CategoryItem[];
  initialValues?: InitialValues;
};

export const useHabitForm = ({
  baseCategories = [],
  initialValues = {},
}: UseHabitFormOptions = {}) => {
  const [name, setName] = useState(initialValues.name ?? '');
  const [habitColor, setHabitColor] = useState(
    initialValues.color ?? '#3B47B3'
  );
  const [extraCategories, setExtraCategories] = useState<CategoryItem[]>([]);
  const categories = useMemo(
    () => [...baseCategories, ...extraCategories],
    [baseCategories, extraCategories]
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialValues.selectedCategory ?? null
  );
  const [frequency, setFrequency] = useState<Frequency>(
    initialValues.frequency ?? 'DAILY'
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialValues.selectedDays ?? []
  );
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isPublic, setIsPublic] = useState(initialValues.isPublic ?? true);

  // CUSTOM: 다중 선택 토글
  const toggleDay = useCallback((d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }, []);

  // WEEKLY: 단일 선택 (다른 요일 누르면 기존 해제)
  const selectSingleDay = useCallback((d: string) => {
    setSelectedDays((prev) => (prev.includes(d) ? [] : [d]));
  }, []);

  // 카테고리 추가: 중복이면 기존 항목 선택, 아니면 목록에 추가 후 선택
  const handleAddCategory = useCallback(
    (categoryName: string, emoji: string | null) => {
      const trimmed = categoryName.trim();
      if (!trimmed) return;

      const exists = categories.some((c) => c.name === trimmed);
      if (exists) {
        showToast.default('이미 있는 카테고리예요');
        setSelectedCategory(trimmed);
      } else {
        setExtraCategories((prev) => [
          ...prev,
          { name: trimmed, icon: emoji ?? undefined },
        ]);
        setSelectedCategory(trimmed);
        showToast.success('카테고리가 추가되었어요');
      }
    },
    [categories]
  );

  return {
    name,
    setName,
    habitColor,
    setHabitColor,
    categories,
    selectedCategory,
    setSelectedCategory,
    frequency,
    setFrequency,
    selectedDays,
    toggleDay,
    alarmEnabled,
    setAlarmEnabled,
    ampm,
    setAmpm,
    hour,
    setHour,
    minute,
    setMinute,
    isPublic,
    setIsPublic,
    handleAddCategory,
    selectSingleDay,
  };
};
