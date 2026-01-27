import { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { mapDaysToServer } from '../../api/utils';
import { createHabit } from '../../api/habit';
import type { CreateHabitPayload } from '../../types/habitType';
import toast from 'react-hot-toast';
import CategoryAddModal from '../../components/habit/CategoryAddModal';
import CategorySelector from '../../components/habit/CategorySelector';
import HabitNameField from '../../components/habit/HabitNameField';
import HabitSettingSection from '../../components/habit/HabitOptionsSection';
const CreateHabit = () => {
  const navigate = useNavigate();

  // --- [상태 관리 및 로직: 기존 유지] ---
  type CategoryItem = { name: string; icon?: string };
  const [categories, setCategories] = useState<CategoryItem[]>([
    { name: '건강관리', icon: '💊' },
    { name: '마음챙김', icon: '☕️' },
    { name: '운동', icon: '🏋️' },
    { name: '생활습관', icon: '✅' },
    { name: '자기계발', icon: '📝' },
    { name: '독서', icon: '📖' },
    { name: '공부', icon: '📘' },
    { name: '커리어', icon: '💼' },
    { name: '모닝루틴', icon: '🌞' },
  ]);

  // 상태 변수들
  const day = ['월', '화', '수', '목', '금', '토', '일'] as const;
  const firstRow = day.slice(0, 4); // 월 화 수 목
  const secondRow = day.slice(4); // 금 토 일
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<Frequency>('DAILY');
  type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
  const [isPublic, setIsPublic] = useState(true);
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // --- [공통 디자인 가이드 적용] ---

  // 알림 화면 공통 디자인
  const baseBtn =
    'h-[48px] w-full rounded-[20px] text-[16px] font-medium transition-all active:scale-[0.98] flex items-center justify-center';
  const outlineBtn = `${baseBtn} border-[1.5px] border-[#2563EB] text-[#2563EB] bg-white`;
  const filledBtn = `${baseBtn} bg-[#2563EB] text-white`;

  // 빈도 선택 버튼 스타일
  const freqBase =
    'h-[55px] w-full rounded-full border-2 ' +
    'text-[16px] leading-[20px] font-medium transition active:scale-[0.98]';
  const freqInactive = `${freqBase} bg-white border-zinc-200 text-zinc-900`;
  const freqActive = `${freqBase} bg-[#EFF6FF] border-[#A5B4FC] text-[#2563EB]`;

  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };
  // 요일로 선택 버튼 스타일
  const dayBase =
    'h-[64px] w-[64px] rounded-full border-2 ' +
    'text-[14px] leading-[18px] font-medium ' +
    'flex items-center justify-center transition';
  const dayInactive = `${dayBase} bg-white border-zinc-200 text-zinc-900`;
  const dayActive = `${dayBase} bg-[#EFF6FF] border-[#A5B4FC] text-[#2563EB]`;

  const canSubmit =
    name.trim().length > 0 &&
    selectedCategory !== null &&
    (frequency !== 'CUSTOM' || selectedDays.length > 0);

  const handleSubmit = async () => {
    if (!canSubmit || isLoading) return;
    const payload: CreateHabitPayload = {
      name: name.trim(),
      category: selectedCategory!,
      frequency,
      ...(frequency === 'CUSTOM' && { days: mapDaysToServer(selectedDays) }),
      isPublic,
    };
    try {
      setIsLoading(true);
      await createHabit(payload);
      toast.success('습관이 생성되었습니다!');
      navigate('/');
    } catch {
      toast.error('습관 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 직접 추가 처리
  const handleAddCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const hasSameCategory = categories.some((c) => c.name === trimmed);

    if (hasSameCategory) {
      // 중복 입력 시: 새로 추가하지 않고 기존 카테고리를 선택
      toast('이미 있는 카테고리예요', { icon: '⚠️' });
      setSelectedCategory(trimmed);
      setIsCategoryModalOpen(false);
      return;
    }

    // 신규 카테고리 추가 + 해당 카테고리를 선택 상태로 설정
    setCategories((prev) => [...prev, { name: trimmed }]);
    setSelectedCategory(trimmed); //  추가한 것만 선택(싱글)
    setIsCategoryModalOpen(false);

    toast.success('카테고리가 추가되었어요');
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

      <main className="mx-auto w-full max-w-[420px] md:max-w-[720px] px-4 md:px-8 pt-8 pb-32">
        {/* 습관명 */}
        <HabitNameField value={name} onChange={setName} />

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
          <HabitSettingSection
            frequency={frequency}
            setFrequency={setFrequency}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            dayRows={{ first: firstRow, second: secondRow }}
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
            styles={{
              freqActive,
              freqInactive,
              dayActive,
              dayInactive,
              filledBtn,
              outlineBtn,
            }}
          />
        </section>
      </main>

      {/* 완료 버튼: 하단 고정 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-100 p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div className="mx-auto w-full max-w-[420px] md:max-w-[720px]">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className={`h-14 w-full rounded-[20px] text-[16px] font-bold transition-all ${
              !canSubmit || isLoading
                ? 'bg-zinc-200 text-zinc-500'
                : 'bg-[#2563EB] text-white active:scale-[0.98]'
            }`}
          >
            {isLoading ? '생성 중...' : '완료'}
          </button>
        </div>
      </div>

      {isCategoryModalOpen && (
        <CategoryAddModal
          open={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSubmit={handleAddCategory}
        />
      )}
    </div>
  );
};

export default CreateHabit;
