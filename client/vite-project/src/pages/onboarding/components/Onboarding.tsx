import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step3_5 from './Step3_5';

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
  /** Step4 완료 또는 나중에 할래요 → HomePage(/) */
  onFinish: () => void;
  /** Step1에서 뒤로가기 → MainPage(/main) */
  onExit?: () => void;
};

const Onboarding = ({ onFinish, onExit }: OnboardingProps) => {
  const [step, setStep] = useState<OnboardingStep>('step1');
  const [nickname, setNickname] = useState('');

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

  const stepContent = (() => {
    if (step === 'step1') {
      return <Step1 onNext={handleStep1Next} onBack={handleBack} />;
    }
    if (step === 'step2') {
      return (
        <Step2
          nickname={nickname || undefined}
          onNext={() => setStep('step3')}
          onBack={handleBack}
          onSkip={onFinish}
        />
      );
    }
    if (step === 'step3') {
      return (
        <Step3
          nickname={nickname || undefined}
          onNext={() => setStep('step3_5')}
          onBack={handleBack}
          onSkip={onFinish}
        />
      );
    }
    if (step === 'step3_5') {
      return <Step3_5 onNext={() => setStep('step4')} />;
    }
    if (step === 'step4') {
      return <Step4 onFinish={onFinish} onBack={handleBack} />;
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
        className="fixed inset-0 bg-white transition-transform duration-300 translate-y-0"
        style={{ zIndex: ONBOARDING_MODAL_Z_INDEX }}
      >
        {stepContent}
      </div>
    </>
  );
};

export default Onboarding;
