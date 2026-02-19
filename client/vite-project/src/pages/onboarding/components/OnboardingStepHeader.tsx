import { IoChevronBack } from 'react-icons/io5';

type OnboardingStepHeaderProps = {
  /** 현재 단계 (1부터) */
  step: number;
  /** 전체 단계 수 (예: 3 또는 4) */
  totalSteps: number;
  /** 뒤로가기 클릭 시 (Step1에서 뒤로가면 온보딩 닫기 등) */
  onBack: () => void;
};

/** 온보딩 Step1~4 공통 상단: safe area + 뒤로가기 버튼 + 진행도(step/totalSteps) */
const OnboardingStepHeader = ({
  step,
  totalSteps,
  onBack,
}: OnboardingStepHeaderProps) => {
  return (
    <>
      <div className="pt-[env(safe-area-inset-top)]" />
      <header className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="-ml-3 inline-flex h-11 w-11 items-center justify-center rounded-full active:bg-zinc-100"
          aria-label="뒤로가기"
        >
          <IoChevronBack className="text-2xl text-zinc-900" />
        </button>
        <span className="text-[15px] font-semibold text-zinc-900">
          {step}/{totalSteps}
        </span>
      </header>
    </>
  );
};

export default OnboardingStepHeader;
