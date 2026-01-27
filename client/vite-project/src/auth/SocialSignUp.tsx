import zaksimLogo from '../assets/zaksim-logo.png';
import today from '../assets/today.png';
import { motion } from 'framer-motion';
import bgAuth from '../assets/bg-auth.png';

export default function SocialSignUp() {
  const handleKakao = () => {
    // 템플릿 리터럴을 사용해 URL 완성
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_CLIENT_ID
    }&redirect_uri=${
      import.meta.env.VITE_KAKAO_REDIRECT_URI
    }&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  };

  const handleGoogle = () => {
    // TODO: google oauth
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 1. 배경 (Background Layers) */}
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgAuth})`,
        }}
      />

      {/* 2. 콘텐츠 (Main Content) */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex-1" />

        {/* 로고 섹션 */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* 전체 로고 이미지 (Z가 먼저 뜨고 글자가 펼쳐지는 애니메이션) */}
            <motion.img
              src={zaksimLogo}
              alt="ZAKSIM"
              className="w-[220px] max-w-full"
              initial={{
                opacity: 0,
                scale: 0.8,
                clipPath: 'inset(0 84% 0 0)', // 시작 시 왼쪽 'Z' 영역만 남기고 가림
              }}
              animate={{
                opacity: 1,
                scale: 1,
                clipPath: 'inset(0 0% 0 0)', // 전체 로고가 다 보이게 확장
              }}
              transition={{
                clipPath: { delay: 0.5, duration: 0.3, ease: 'easeInOut' }, // Z가 뜬 후 확장
                opacity: { delay: 0.1, duration: 0.3, ease: 'backIn' }, // Z가 먼저 뜸
                scale: { delay: 0.1, duration: 0.3, ease: 'backIn' },
              }}
            />
          </div>

          {/* 슬로건: 로고 완성 후 등장 */}
          <motion.img
            src={today}
            alt="오늘의 할 일"
            className="w-[220px] max-w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        </div>

        {/* 하단 빈 공간: 로고를 위로 밀어주어 균형을 맞춤 */}
        <div className="flex-1" />

        {/* 버튼 섹션: 하단 여백을 유지하며 아래쪽에 고정 */}
        <div className="mt-auto space-y-3 pb-10">
          <button
            type="button"
            onClick={handleKakao}
            className="h-14 w-full rounded-full bg-[#FEE500] text-[15px] font-semibold text-[#111] active:scale-[0.99] transition-transform"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#3B1E1E] text-[10px] font-bold text-[#FEE500]">
                KAKAO
              </span>
              카카오로 시작하기
            </span>
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="h-14 w-full rounded-full bg-white text-[15px] font-semibold text-zinc-900 shadow-sm active:scale-[0.99] transition-transform"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <span className="text-[16px] font-bold">G</span>
              Google로 시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
