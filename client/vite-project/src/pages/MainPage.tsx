import Onboarding from './onboarding/Onboarding';

const MainPage = () => {
  const needsOnboarding = true; // 지금은 임시

  return (
    <div className="relative h-screen">
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p>
          아직 추가한 습관이 없네요! <br /> 지금 바로 추가해볼까요?
        </p>

        <button>습관 등록하기</button>
      </div>

      {needsOnboarding && <Onboarding />}
    </div>
  );
};

export default MainPage;
