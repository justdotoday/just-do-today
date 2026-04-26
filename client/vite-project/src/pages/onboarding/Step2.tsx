// 온보딩 Step2 — 첫 습관 등록 화면: 습관명·색상·카테고리 입력 (2/3)

import { useState } from 'react';
import CategorySelector from '../../components/shared/habit/CategorySelector';
import CategoryAddModal from '../../components/shared/habit/CategoryAddModal';
import HabitNameField from '../../components/shared/habit/HabitNameField';
import { DEFAULT_CATEGORIES } from '../../constants/categories';
import { useHabitForm } from '../../hooks/useHabitForm';
import OnboardingLayout from '../../components/shared/onboarding/OnboardingLayout';
import { COLORS } from '../../constants/colors';

const ONBOARDING_STEP_INDEX = 2;
const ONBOARDING_STEP_TOTAL = 3;
const DEFAULT_NICKNAME_DISPLAY = '회원';

export type Step2HabitData = {
  name: string;
  color: string;
  categoryName: string;
  emoji?: string;
};

type Step2Props = {
  onNext: (data: Step2HabitData) => void;
  onBack: () => void;
  /** 나중에 할래요 클릭 시 (MainPage로 이동) */
  onSkip: () => void;
  nickname?: string;
};

const Step2 = ({
  onNext,
  onBack,
  onSkip,
  nickname = DEFAULT_NICKNAME_DISPLAY,
}: Step2Props) => {
  const {
    name,
    setName,
    habitColor,
    setHabitColor,
    categories,
    selectedCategory,
    setSelectedCategory,
    handleAddCategory,
  } = useHabitForm({ initialCategories: DEFAULT_CATEGORIES });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleNext = () => {
    const selected = categories.find((c) => c.name === selectedCategory);
    if (!selected) return;
    onNext({
      name: name.trim(),
      color: habitColor,
      categoryName: selected.name,
      ...(selected.icon && { emoji: selected.icon }),
    });
  };

  // 필수: 습관명 + 카테고리 선택 시에만 다음으로 진행
  const canNext = name.trim().length > 0 && selectedCategory !== null;

  return (
    <>
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

      <OnboardingLayout
        step={ONBOARDING_STEP_INDEX}
        totalSteps={ONBOARDING_STEP_TOTAL}
        onBack={onBack}
        onNext={handleNext}
        canNext={canNext}
        onSkip={onSkip}
      >
        <section className="mb-6">
          <h2 className="font-bold text-lg text-zinc-900">
            <span style={{ color: COLORS.primary }}>{nickname}</span>
            <span className="text-zinc-900">님, 반가워요!</span>
          </h2>
          <p className="font-bold text-lg text-zinc-900">
            지금 바로 습관 하나 등록해 볼까요?
          </p>
        </section>

        <section className="mb-6">
          <HabitNameField
            value={name}
            onChange={setName}
            selectedColor={habitColor}
            onColorChange={setHabitColor}
          />
        </section>

        <section className="flex-1">
          <CategorySelector
            title="습관 카테고리를 선택해 주세요."
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            onOpenAdd={() => setIsCategoryModalOpen(true)}
          />
        </section>
      </OnboardingLayout>
    </>
  );
};

export default Step2;
