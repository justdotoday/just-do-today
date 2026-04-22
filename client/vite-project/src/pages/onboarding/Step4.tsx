import { useState } from 'react';
import OnboardingLayout from '../../components/shared/onboarding/OnboardingLayout';
import { COLORS } from '../../constants/colors';

/** 온보딩 Step4 — 목표 입력 및 완료 (4/4) */

type Step4Props = {
  onFinish: (goal: string) => void;
  onBack: () => void;
};

const Step4 = ({ onFinish, onBack }: Step4Props) => {
  const [goal, setGoal] = useState('');

  return (
    <OnboardingLayout
      step={4}
      totalSteps={4}
      onBack={onBack}
      onNext={() => onFinish(goal)}
      nextLabel="시작하기"
    >
      {/* 목표 입력 섹션 */}
      <section>
        <h2 className="text-lg my-1 font-bold">
          작심과 함께 이루고 싶은 <br />
          목표를 알려주세요.
        </h2>
        <p className="mb-3 text-[13px] text-zinc-500">
          더 좋은 서비스를 만들기 위해 참고할게요.
        </p>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="운동하는 습관을 들여서 건강해지고 싶어요!"
          rows={6}
          className="my-6 w-full rounded-3xl border border-zinc-200 bg-white px-4 py-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-none"
          style={{ borderColor: goal.length > 0 ? COLORS.primary : undefined }}
        />
      </section>
    </OnboardingLayout>
  );
};

export default Step4;
