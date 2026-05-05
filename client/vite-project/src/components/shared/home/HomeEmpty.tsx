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
    <div className="relative flex flex-col min-h-[calc(100dvh-96px)] px-4">
      <GlowEffect position="bottom" />

      {!hideDate && (
        <div className="pt-6 text-2xl font-semibold leading-none text-zinc-950">
          {dateLabel}
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <EmptyIllustration />

        <div className="mt-10 flex flex-col items-center text-center w-full">
          <p className="text-base font-semibold text-zinc-800">시작이 반이에요!</p>
          <p className="text-base font-semibold text-zinc-800">먼저 습관 하나 등록해볼까요?</p>

          <button
            type="button"
            onClick={() => navigate('/createHabit')}
            className="mt-10 h-14 w-full max-w-[420px] rounded-full bg-blue-600 text-white"
          >
            습관 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeEmpty;
