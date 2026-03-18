import { useState } from 'react';
import OnboardingStepHeader from './OnboardingStepHeader';

/** 온보딩 Step4 — 목표 입력 및 완료 (4/4) */
const ONBOARDING_CONTENT_MAX_WIDTH_PX = 414;
const ONBOARDING_BOTTOM_PADDING_PX = 16;

type Step4Props = {
  onFinish: (goal: string) => void;
  onBack: () => void;
};

const Step4 = ({ onFinish, onBack }: Step4Props) => {
  const [goal, setGoal] = useState('');

  const contentMaxWidthStyle = { maxWidth: ONBOARDING_CONTENT_MAX_WIDTH_PX };
  const bottomAreaPadding = `calc(${ONBOARDING_BOTTOM_PADDING_PX}px + env(safe-area-inset-bottom))`;

  return (
    <div className="flex min-h-screen flex-col">
      {/* 콘텐츠 영역 (414px) */}
      <div
        className="mx-auto flex w-full flex-1 flex-col bg-white"
        style={contentMaxWidthStyle}
      >
        <OnboardingStepHeader step={4} totalSteps={4} onBack={onBack} />

        <main className="flex flex-1 flex-col px-4 pb-24">
          {/* 목표 입력 섹션 */}
          <section className="mb-8">
            <h2 className="mb-2 font-bold text-2xl text-zinc-900">
              작심과 함께 이루고 싶은 <br />
              목표를 알려주세요.
            </h2>
            <p className="mb-6 text-[15px] text-zinc-500">
              더 좋은 서비스를 만들기 위해 참고할게요.
            </p>
            <br />
            <br />
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="운동하는 습관을 들여서 건강해지고 싶어요!"
              rows={6}
              className="w-full rounded-2xl border-2 border-zinc-200 bg-white px-4 py-4 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-[#2563EB] focus:outline-none resize-none"
            />
          </section>
        </main>
      </div>

      {/* 하단 고정: 시작하기 버튼 */}
      <div
        className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 bg-white px-4 pt-2"
        style={{
          ...contentMaxWidthStyle,
          paddingBottom: bottomAreaPadding,
        }}
      >
        <button
          type="button"
          onClick={() => onFinish(goal)}
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#2563EB] font-semibold text-white transition active:scale-[0.98]"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Step4;
