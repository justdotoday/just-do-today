// 온보딩 Step2 — 첫 습관 등록 화면: 습관명·색상·카테고리 입력 (2/3)

import { useState } from 'react';
import ColorPalette from '../../../components/ColorPalette';
import OnboardingStepHeader from './OnboardingStepHeader';
import CategorySelector from '../../../components/habit/CategorySelector';
import type { CategoryItem } from '../../../components/habit/CategorySelector';
import CategoryAddModal from '../../../components/habit/CategoryAddModal';

const ONBOARDING_CONTENT_MAX_WIDTH_PX = 414;
const ONBOARDING_BOTTOM_PADDING_PX = 16;
const ONBOARDING_STEP_INDEX = 2;
const ONBOARDING_STEP_TOTAL = 3;
const PRIMARY_BLUE_HEX = '#2563EB';

const DEFAULT_NICKNAME_DISPLAY = '회원';

const DEFAULT_CATEGORIES: CategoryItem[] = [
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

type Step2Props = {
  onNext: () => void;
  onBack: () => void;
  nickname?: string;
};

const Step2 = ({
  onNext,
  onBack,
  nickname = DEFAULT_NICKNAME_DISPLAY,
}: Step2Props) => {
  const [habitName, setHabitName] = useState('');
  const [habitColor, setHabitColor] = useState(PRIMARY_BLUE_HEX);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [categories, setCategories] =
    useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleAddCategory = (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;

    const isExistingCategory = categories.some((c) => c.name === trimmed);
    if (isExistingCategory) {
      setSelectedCategory(trimmed);
    } else {
      setCategories((prev) => [...prev, { name: trimmed }]);
      setSelectedCategory(trimmed);
    }
    setIsCategoryModalOpen(false);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleOpenColorPalette = () => {
    setIsColorPaletteOpen(true);
  };

  const handleColorSelect = (color: string) => {
    setHabitColor(color);
    setIsColorPaletteOpen(false);
  };

  const contentMaxWidthStyle = {
    maxWidth: ONBOARDING_CONTENT_MAX_WIDTH_PX,
  };

  const bottomAreaPadding = `calc(${ONBOARDING_BOTTOM_PADDING_PX}px + env(safe-area-inset-bottom))`;

  // 필수: 습관명 + 카테고리 선택 시에만 다음으로 진행
  const canNext = habitName.trim().length > 0 && selectedCategory !== null;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      {isColorPaletteOpen && (
        <ColorPalette
          onClose={() => setIsColorPaletteOpen(false)}
          onSelect={handleColorSelect}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryAddModal
          open={isCategoryModalOpen}
          onClose={handleCloseCategoryModal}
          onSubmit={handleAddCategory}
        />
      )}

      <div
        className="mx-auto flex w-full flex-1 flex-col bg-white"
        style={contentMaxWidthStyle}
      >
        <OnboardingStepHeader
          step={ONBOARDING_STEP_INDEX}
          totalSteps={ONBOARDING_STEP_TOTAL}
          onBack={onBack}
        />

        <main className="flex flex-1 flex-col px-4 pb-24">
          <section className="mb-6">
            <h2 className="mb-1 font-bold text-2xl text-zinc-900">
              <span style={{ color: PRIMARY_BLUE_HEX }}>{nickname}</span>
              <span className="text-zinc-900">님, 반가워요!</span>
            </h2>
            <p className="font-bold text-2xl text-zinc-900">
              지금 바로 습관 하나 등록해 볼까요?
            </p>
          </section>

          <section className="mb-6">
            <p className="mb-2 text-[15px] font-semibold text-zinc-900">
              어떤 습관인가요?
            </p>
            <div className="relative">
              <button
                type="button"
                onClick={handleOpenColorPalette}
                className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full shrink-0 "
                style={{ backgroundColor: habitColor }}
                aria-label="습관 색상 선택"
                title="색상 변경"
              />
              <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="일어나자마자 물 마시기"
                className="w-full rounded-2xl border-2 border-zinc-200 py-3 pl-12 pr-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                style={{
                  borderColor: habitName.length > 0 ? habitColor : undefined,
                }}
              />
            </div>
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
        </main>
      </div>

      <div
        className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 space-y-2 bg-white px-4 pt-2"
        style={{
          ...contentMaxWidthStyle,
          paddingBottom: bottomAreaPadding,
        }}
      >
        <button
          type="button"
          onClick={onNext}
          className="block w-full py-3 text-center text-[15px] font-medium text-zinc-500 active:opacity-80"
        >
          나중에 할래요
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="flex h-14 w-full items-center justify-center rounded-full font-semibold text-white transition active:scale-[0.98] disabled:bg-zinc-300 disabled:active:scale-100"
          style={canNext ? { backgroundColor: PRIMARY_BLUE_HEX } : undefined}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Step2;
