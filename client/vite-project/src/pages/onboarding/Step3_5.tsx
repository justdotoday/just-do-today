import { useEffect } from 'react';
import startIcon from '../../assets/Start.png';
import { COLORS } from '../../constants/colors';

type Step3_5Props = {
  onNext: () => void;
};

const Step3_5 = ({ onNext }: Step3_5Props) => {
  useEffect(() => {
    // 2초 후 다음 단계로 이동
    const timer = setTimeout(() => {
      onNext();
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      {/* 체크 아이콘 */}
      <img
        src={startIcon}
        alt="시작"
        className="w-24 h-24 object-contain mb-6"
      />

      {/* 텍스트 */}
      <p className="text-2xl font-bold text-zinc-900 mb-2">시작이 반!</p>
      <p className="text-lg text-zinc-600">
        <span style={{ color: COLORS.primary }}>첫 습관</span>이 등록되었어요.
      </p>
    </div>
  );
};

export default Step3_5;
