import { useMemo, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mapDaysToServer } from '../../api/utils';
import { createHabit } from '../../api/habit';
import { getUserCategories } from '../../api/category';
import type { CreateHabitPayload } from '../../types/habit.type';
import { showToast } from '../../components/ui/toast/Toast';
import CategoryAddModal from '../../components/shared/habit/CategoryAddModal';
import MonthlyDatePickerSheet from '../../components/shared/habit/MonthlyDatePickerSheet';
import CategorySelector from '../../components/shared/habit/CategorySelector';
import HabitNameField from '../../components/shared/habit/HabitNameField';
import HabitOptionsSection from '../../components/shared/habit/HabitOptionsSection';
import { useHabitForm } from '../../hooks/useHabitForm';
import {
  HABIT_FORM_STYLES,
  DAYS_FIRST_ROW,
  DAYS_SECOND_ROW,
} from '../../constants/habitFormStyles';
import { COLORS } from '../../constants/colors';

const CreateHabit = () => {
  const navigate = useNavigate();

  const { data: serverCategories } = useQuery({
    queryKey: ['userCategories'],
    queryFn: getUserCategories,
  });

  const baseCategories = useMemo(
    () =>
      (serverCategories ?? []).map((c) => ({
        name: c.categoryName,
        icon: c.emoji ?? undefined,
      })),
    [serverCategories]
  );

  const {
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
  } = useHabitForm({ baseCategories });

  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMonthlyPickerOpen, setIsMonthlyPickerOpen] = useState(false);
  const [selectedMonthlyDay, setSelectedMonthlyDay] = useState<number | null>(
    null
  );

  // WEEKLY·CUSTOM은 요일 최소 1개 선택 필수
  const canSubmit =
    name.trim().length > 0 &&
    selectedCategory !== null &&
    (frequency === 'DAILY' ||
      frequency === 'MONTHLY' ||
      selectedDays.length > 0);

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;

    const selected = categories.find((c) => c.name === selectedCategory);
    if (!selected) {
      showToast.error('카테고리를 선택해 주세요');
      return;
    }

    const payload: CreateHabitPayload = {
      name: name.trim(),
      categoryName: selected.name,
      ...(selected.icon && { emoji: selected.icon }),
      frequency,
      ...(frequency === 'CUSTOM' && { days: mapDaysToServer(selectedDays) }),
      isPublic,
      startDate: new Date().toISOString().split('T')[0],
      color: habitColor,
    };

    try {
      setIsLoading(true);
      await createHabit(payload);
      showToast.success('습관이 생성되었습니다!');
      navigate(-1);
    } catch (err: unknown) {
      // 디버깅: 원인 확인용 (외부=백엔드/네트워크 vs 내부=프론트 로직)
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { status?: number; data?: unknown } }).response
          : null;
      const status = msg?.status;
      const body = msg?.data;
      console.error('[습관 생성 실패]', { status, body, err });
      const fallback =
        status != null
          ? `요청 실패 (${status})`
          : '네트워크 또는 서버 연결 실패';
      showToast.error(
        typeof body === 'object' && body != null && 'message' in body
          ? String((body as { message: unknown }).message)
          : fallback
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단바 */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
        <div className="pt-[env(safe-area-inset-top)]" />
        <div className="relative flex h-14 items-center justify-center px-4">
          <button onClick={() => navigate(-1)} className="absolute left-2 p-2">
            <IoChevronBack className="text-2xl text-zinc-900" />
          </button>
          <h1 className="text-[16px] font-semibold text-zinc-950">
            습관 생성하기
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[420px] px-4 pt-8 pb-32">
        {/* 습관명 입력 필드 */}
        <HabitNameField
          value={name}
          onChange={setName}
          selectedColor={habitColor}
          onColorChange={setHabitColor}
        />

        {/* 카테고리 */}
        <section className="mt-10 space-y-4">
          <CategorySelector
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            onOpenAdd={() => setIsCategoryModalOpen(true)}
          />
        </section>

        {/* 빈도 */}
        <section className="mt-6 space-y-4">
          <HabitOptionsSection
            frequency={frequency}
            setFrequency={(val) => {
              setFrequency(val);
              if (val === 'MONTHLY') setIsMonthlyPickerOpen(true);
            }}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            dayRows={{ first: DAYS_FIRST_ROW, second: DAYS_SECOND_ROW }}
            alarmEnabled={alarmEnabled}
            setAlarmEnabled={setAlarmEnabled}
            ampm={ampm}
            setAmpm={setAmpm}
            hour={hour}
            setHour={setHour}
            minute={minute}
            setMinute={setMinute}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            onSingleDaySelect={selectSingleDay}
            selectedMonthlyDay={selectedMonthlyDay}
            onReopenMonthlyPicker={() => setIsMonthlyPickerOpen(true)}
            styles={HABIT_FORM_STYLES}
          />
        </section>
      </main>

      {/* 습관 등록하기 버튼: 하단 고정 */}
      <div className="fixed bottom-0 z-50 bg-white px-4 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))] left-[max(0px,calc((100vw-414px)/2))] right-[max(0px,calc((100vw-414px)/2))]">
        <div className="mx-auto w-full max-w-[420px]">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className={`h-14 w-full rounded-full text-[16px] font-bold transition-all ${
              !canSubmit || isLoading
                ? 'bg-zinc-200 text-zinc-500'
                : 'text-white active:scale-[0.98]'
            }`}
            style={
              canSubmit && !isLoading
                ? { backgroundColor: COLORS.primary }
                : undefined
            }
          >
            {isLoading ? '등록 중...' : '습관 등록하기'}
          </button>
        </div>
      </div>

      {isCategoryModalOpen && (
        <CategoryAddModal
          open={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSubmit={(categoryName, emoji) => {
            handleAddCategory(categoryName, emoji);
            setIsCategoryModalOpen(false);
          }}
        />
      )}

      {isMonthlyPickerOpen && (
        <MonthlyDatePickerSheet
          open={isMonthlyPickerOpen}
          onClose={() => setIsMonthlyPickerOpen(false)}
          onSelect={(day) => setSelectedMonthlyDay(day)}
          initialDay={selectedMonthlyDay ?? undefined}
        />
      )}
    </div>
  );
};

export default CreateHabit;
