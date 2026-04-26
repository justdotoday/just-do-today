import { useState } from 'react';
import GlowEffect from '../../components/ui/GlowEffect';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step3_5 from './Step3_5';
import { completeOnboarding } from '../../api/onboarding';
import { showToast } from '../../components/ui/toast/Toast';
import type { Step2HabitData } from './Step2';
import type { Step3HabitData } from './Step3';

const ONBOARDING_BACKDROP_Z_INDEX = 40;
const ONBOARDING_MODAL_Z_INDEX = 50;

type OnboardingStep = 'step1' | 'step2' | 'step3' | 'step3_5' | 'step4';

const STEP_TO_PREVIOUS: Record<OnboardingStep, OnboardingStep | 'finish'> = {
  step1: 'finish',
  step2: 'step1',
  step3: 'step2',
  step3_5: 'step3',
  step4: 'step3',
};

type OnboardingProps = {
  /** Step4 "시작하기" 완료 시 → HomeList */
  onFinish: () => void;
  /** Step2/Step3 "나중에 할래요" 클릭 시 → HomeEmpty */
  onSkip?: () => void;
  /** Step1에서 뒤로가기 → MainPage(/main) */
  onExit?: () => void;
};

const Onboarding = ({ onFinish, onSkip, onExit }: OnboardingProps) => {
  const [step, setStep] = useState<OnboardingStep>('step1');
  const [nickname, setNickname] = useState('');
  const [habitStep2, setHabitStep2] = useState<Step2HabitData | null>(null);
  const [habitStep3, setHabitStep3] = useState<Step3HabitData | null>(null);

  const handleBack = () => {
    const previous = STEP_TO_PREVIOUS[step];
    if (previous === 'finish') {
      (onExit ?? onFinish)();
    } else {
      setStep(previous);
    }
  };

  const handleStep1Next = (nextNickname: string) => {
    setNickname(nextNickname);
    setStep('step2');
  };

  const handleStep2Next = (data: Step2HabitData) => {
    setHabitStep2(data);
    setStep('step3');
  };

  const handleStep3Next = (data: Step3HabitData) => {
    setHabitStep3(data);
    setStep('step3_5');
  };

  const handleFinish = async (goal: string) => {
    // Step2+3 데이터가 있으면 habit 포함, 없으면 null (나중에 할래요 후 재진입 시)
    const habit =
      habitStep2 && habitStep3
        ? {
            ...habitStep2,
            ...habitStep3,
            startDate: new Date().toISOString().split('T')[0],
          }
        : null;

    console.log('[온보딩 완료 요청]', { nickname, goal, habit });

    try {
      await completeOnboarding({ nickname, goal, habit });
      onFinish();
    } catch (e: unknown) {
      const res = (e as { response?: { status?: number; data?: unknown } })
        ?.response;
      console.error('[온보딩 완료 실패]', res?.status, res?.data, e);
      const msg =
        typeof res?.data === 'object' &&
        res?.data !== null &&
        'message' in res.data
          ? String((res.data as { message: unknown }).message)
          : res?.status
            ? `서버 오류 (${res.status})`
            : '네트워크 연결을 확인해 주세요';
      showToast.error(msg);
    }
  };

  const stepContent = (() => {
    if (step === 'step1') {
      return <Step1 onNext={handleStep1Next} onBack={handleBack} />;
    }
    if (step === 'step2') {
      return (
        <Step2
          nickname={nickname || undefined}
          onNext={handleStep2Next}
          onBack={handleBack}
          onSkip={onSkip ?? onFinish}
        />
      );
    }
    if (step === 'step3') {
      return (
        <Step3
          nickname={nickname || undefined}
          onNext={handleStep3Next}
          onBack={handleBack}
          onSkip={onSkip ?? onFinish}
        />
      );
    }
    if (step === 'step3_5') {
      return <Step3_5 onNext={() => setStep('step4')} />;
    }
    if (step === 'step4') {
      return <Step4 onFinish={handleFinish} onBack={handleBack} />;
    }
    return null;
  })();

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40"
        style={{ zIndex: ONBOARDING_BACKDROP_Z_INDEX }}
      />
      <div
        className="fixed inset-0 overflow-hidden transition-transform duration-300 translate-y-0"
        style={{ background: '#FFFFFF', zIndex: ONBOARDING_MODAL_Z_INDEX }}
      >
        <GlowEffect position="top" />
        {stepContent}
      </div>
    </>
  );
};

export default Onboarding;
