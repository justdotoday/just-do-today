import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step3_5 from './Step3_5';

// 온보딩 단계 타입 정의
type Step = 'step1' | 'step2' | 'step3' | 'step3_5' | 'step4';

type OnboardingProps = {
  onFinish: () => void;
};

const Onboarding = ({ onFinish }: OnboardingProps) => {
  const [step, setStep] = useState<Step>('step1');

  // 뒤로가기 핸들러
  const handleBack = () => {
    switch (step) {
      case 'step1':
        onFinish(); // 첫 단계에서 뒤로가기 → 모달 닫기
        break;
      case 'step2':
        setStep('step1');
        break;
      case 'step3':
        setStep('step2');
        break;
      case 'step3_5':
        setStep('step3'); // 완료 화면에서 뒤로가기 → Step3로
        break;
      case 'step4':
        setStep('step3');
        break;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* 온보딩 모달 */}
      <div className="fixed inset-0 z-50 bg-white transition-transform duration-300 translate-y-0">
        {step === 'step1' && (
          <Step1 onNext={() => setStep('step2')} onBack={handleBack} />
        )}
        {step === 'step2' && (
          <Step2 onNext={() => setStep('step3')} onBack={handleBack} />
        )}
        {step === 'step3' && (
          <Step3 onNext={() => setStep('step3_5')} onBack={handleBack} />
        )}
        {step === 'step3_5' && <Step3_5 onNext={() => setStep('step4')} />}
        {step === 'step4' && <Step4 onFinish={onFinish} onBack={handleBack} />}
      </div>
    </>
  );
};

export default Onboarding;
