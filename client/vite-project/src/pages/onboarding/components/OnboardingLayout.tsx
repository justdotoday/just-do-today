// 온보딩 공통 레이아웃 — 상단 뒤로가기/단계 표시 + 하단 고정 버튼

import type { ReactNode } from 'react';
import OnboardingStepHeader from './OnboardingStepHeader';
import { COLORS } from '../../../constants/colors';

type OnboardingLayoutProps = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  children: ReactNode;
  canNext?: boolean;
  nextLabel?: string;
  /** 제공 시 다음으로 버튼 위에 스킵 버튼 표시 */
  onSkip?: () => void;
  skipLabel?: string;
};

const OnboardingLayout = ({
  step,
  totalSteps,
  onBack,
  onNext,
  children,
  canNext = true,
  nextLabel = '다음으로',
  onSkip,
  skipLabel = '나중에 할래요',
}: OnboardingLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-[414px] flex-1 flex-col bg-white">
        <OnboardingStepHeader step={step} totalSteps={totalSteps} onBack={onBack} />

        <main className="flex flex-1 flex-col px-4 pb-[calc(80px+env(safe-area-inset-bottom))]">
          {children}
        </main>
      </div>

      {/* 하단 고정 버튼 */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[414px] -translate-x-1/2 space-y-2 px-4 pb-[calc(16px+env(safe-area-inset-bottom))]"
        style={onSkip ? { background: 'linear-gradient(180deg, transparent 0%, #ffffff 30%)', paddingTop: '2rem' } : { background: '#ffffff' }}
      >
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="block w-full py-3 text-center text-[15px] font-medium text-zinc-500 active:opacity-80"
          >
            {skipLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="flex h-12 w-full items-center justify-center rounded-full text-white text-sm transition active:scale-[0.98] disabled:bg-zinc-300 disabled:active:scale-100"
          style={canNext ? { backgroundColor: COLORS.primary } : undefined}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default OnboardingLayout;
