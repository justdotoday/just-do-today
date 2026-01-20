import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step4 from './Step4';
import Step3 from './Step3';

// 온보딩 모달

const Onboarding = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* 온보딩 모달 css */}
      <div
        className="fixed inset-0 z-50
             bg-white
             transition-transform duration-300
             translate-y-0"
      >
        {/* 온보딩 1단계 시작, 다음 */}
        {step === 0 && <Step1 onNext={() => setStep(1)} />}
        {/* 온보딩 2단계, 다음 */}
        {step === 1 && <Step2 onNext={() => setStep(2)} />}
        {/* 온보딩 3단계, 완료 */}
        {step === 2 && <Step3 onNext={() => setStep(3)} />}
        {/*  */}
        {step === 3 && <Step4 onFinish={() => {}} />}
      </div>
    </>
  );
};

export default Onboarding;
