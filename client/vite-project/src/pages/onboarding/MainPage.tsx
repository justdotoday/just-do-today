import { useState } from 'react';
import Onboarding from './components/Onboarding';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const needsOnboarding = true; // 지금은 임시
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);

  return (
    <div className="relative h-screen">
      <div className="mt-10 flex flex-col items-center text-center">
        <p className="text-base font-semibold text-zinc-800">
          시작이 반이에요!
        </p>
        <p className="text-base font-semibold text-zinc-800">
          먼저 습관 하나 등록해볼까요?
        </p>

        <button
          type="button"
          onClick={() => navigate('/createHabit')}
          className="mt-10 h-14 w-full max-w-[320px] rounded-full bg-blue-600 text-white"
        >
          습관 등록하기
        </button>
      </div>

      {/* 온보딩 모달 */}
      {needsOnboarding && isOnboardingOpen && (
        <Onboarding onFinish={() => setIsOnboardingOpen(false)} />
      )}
    </div>
  );
};

export default MainPage;
