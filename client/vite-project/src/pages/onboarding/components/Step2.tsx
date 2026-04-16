// 온보딩 Step2 — 첫 습관 등록 화면: 습관명·색상·카테고리 입력 (2/3)

import { useRef, useState } from 'react';
import ColorPalette from '../../../components/ColorPalette';
import CategorySelector from '../../../components/habit/CategorySelector';
import type { CategoryItem } from '../../../components/habit/CategorySelector';
import CategoryAddModal from '../../../components/habit/CategoryAddModal';
import { DEFAULT_CATEGORIES } from '../../../constants/categories';
import OnboardingLayout from './OnboardingLayout';
import { COLORS } from '../../../constants/colors';

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
  const [habitName, setHabitName] = useState('');
  const [habitColor, setHabitColor] = useState('#3B47B3');
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [paletteAnchorRect, setPaletteAnchorRect] = useState<DOMRect | null>(
    null
  );
  const colorButtonRef = useRef<HTMLButtonElement | null>(null);
  const [categories, setCategories] =
    useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleAddCategory = (name: string, emoji: string | null) => {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;

    const isExistingCategory = categories.some((c) => c.name === trimmed);
    if (isExistingCategory) {
      setSelectedCategory(trimmed);
    } else {
      setCategories((prev) => [
        ...prev,
        { name: trimmed, icon: emoji ?? undefined },
      ]);
      setSelectedCategory(trimmed);
    }
    setIsCategoryModalOpen(false);
  };

  const handleOpenColorPalette = () => {
    setPaletteAnchorRect(
      colorButtonRef.current?.getBoundingClientRect() ?? null
    );
    setIsColorPaletteOpen(true);
  };

  const handleColorSelect = (color: string) => {
    setHabitColor(color);
    setIsColorPaletteOpen(false);
  };

  const handleNext = () => {
    const selected = categories.find((c) => c.name === selectedCategory);
    if (!selected) return;
    onNext({
      name: habitName.trim(),
      color: habitColor,
      categoryName: selected.name,
      ...(selected.icon && { emoji: selected.icon }),
    });
  };

  // 필수: 습관명 + 카테고리 선택 시에만 다음으로 진행
  const canNext = habitName.trim().length > 0 && selectedCategory !== null;

  return (
    <>
      {isColorPaletteOpen && paletteAnchorRect && (
        <ColorPalette
          onClose={() => setIsColorPaletteOpen(false)}
          onSelect={handleColorSelect}
          selectedColor={habitColor}
          anchorRect={paletteAnchorRect}
        />
      )}

      {isCategoryModalOpen && (
        <CategoryAddModal
          open={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSubmit={handleAddCategory}
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
          <p className="mb-2 font-semibold text-zinc-900">어떤 습관인가요?</p>
          <div className="relative">
            <button
              type="button"
              onClick={handleOpenColorPalette}
              ref={colorButtonRef}
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full shrink-0"
              style={{ backgroundColor: habitColor }}
              aria-label="습관 색상 선택"
              title="색상 변경"
            />
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="ex)일어나자마자 물 마시기"
              className="w-full rounded-full border border-zinc-200 py-3 pl-12 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
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
      </OnboardingLayout>
    </>
  );
};

export default Step2;
