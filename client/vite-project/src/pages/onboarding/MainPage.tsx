import { useState } from 'react';
import Onboarding from './components/Onboarding';

const MainPage = () => {
  const needsOnboarding = true; // 지금은 임시
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);

  return (
    <div className="relative h-screen">
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p>
          아직 추가한 습관이 없네요! <br /> 지금 바로 추가해볼까요?
        </p>

        <button>습관 등록하기</button>
      </div>

      {/* 온보딩 모달 */}
      {needsOnboarding && isOnboardingOpen && (
        <Onboarding onFinish={() => setIsOnboardingOpen(false)} />
      )}
    </div>
  );
};

export default MainPage;
