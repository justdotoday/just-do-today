import { useState } from 'react';
import Onboarding from './components/Onboarding';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';

const MainPage = () => {
  const navigate = useNavigate();
  const needsOnboarding = true; // 지금은 임시
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-zinc-100">
      <div
        className="mx-auto flex w-full flex-1 flex-col items-center justify-center px-4 text-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{ maxWidth: 414 }}
      >
        <p className="text-[18px] font-semibold text-zinc-800">
          시작이 반이에요!
        </p>
        <p className="mt-1 text-[18px] font-semibold text-zinc-800">
          먼저 습관 하나 등록해볼까요?
        </p>
        <button
          type="button"
          onClick={() => navigate('/createHabit')}
          className="mt-10 h-14 w-full max-w-[320px] rounded-full font-semibold text-white transition active:scale-[0.98]"
          style={{ backgroundColor: COLORS.primary }}
        >
          습관 등록하기
        </button>
      </div>

      {/* 온보딩 모달 — 나중에 할래요/Step4 완료 → HomePage, Step1 뒤로가기 → MainPage */}
      {needsOnboarding && isOnboardingOpen && (
        <Onboarding
          onFinish={() => {
            setIsOnboardingOpen(false);
            navigate('/home', { state: { view: 'list' }, replace: true });
          }}
          onSkip={() => {
            setIsOnboardingOpen(false);
            navigate('/home/empty', { replace: true });
          }}
          onExit={() => {
            setIsOnboardingOpen(false);
            navigate('/home');
          }}
        />
      )}
    </div>
  );
};

export default MainPage;
