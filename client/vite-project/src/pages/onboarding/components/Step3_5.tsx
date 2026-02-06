import { useEffect } from 'react';

type Step3_5Props = {
  onNext: () => void;
};

const Step3_5 = ({ onNext }: Step3_5Props) => {
  useEffect(() => {
    // 1.5초 후 다음 단계로 이동
    const timer = setTimeout(() => {
      onNext();
    }, 1500);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      {/* 체크 아이콘 */}
      <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-6">
        <span className="text-white text-5xl">✔️</span>
      </div>

      {/* 텍스트 */}
      <p className="text-2xl font-bold text-zinc-900 mb-2">시작이 반!</p>
      <p className="text-lg text-zinc-600">첫 습관이 등록되었어요.</p>
    </div>
  );
};

export default Step3_5;
