import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyIllustration from './EmptyIllustration';
import GlowEffect from '../../ui/GlowEffect';

type Props = { hideDate?: boolean };

const HomeEmpty = ({ hideDate = false }: Props) => {
  const navigate = useNavigate();
  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      }),
    []
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden px-4">
      <GlowEffect position="bottom" />

      {!hideDate && (
        <div className="pt-6 text-2xl font-semibold tracking-[-0.02em] text-zinc-950">
          {dateLabel}
        </div>
      )}

      {/* 헤더 아래 콘텐츠 영역 — 일러스트는 이 안에서만 absolute */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <EmptyIllustration />
        </div>

        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="text-base font-semibold text-zinc-800">시작이 반이에요!</p>
          <p className="text-base font-semibold text-zinc-800">먼저 습관 하나 등록해볼까요?</p>

          <button
            type="button"
            onClick={() => navigate('/createHabit')}
            className="mt-7 h-12 w-60 rounded-full bg-blue-600 text-white"
          >
            습관 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeEmpty;
