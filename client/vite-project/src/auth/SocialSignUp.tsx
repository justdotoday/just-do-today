import zaksimLogo from '../assets/zaksim-logo.png';
import today from '../assets/today.png';
import { motion } from 'framer-motion';
import bgAuth from '../assets/bg-auth.png';
import KaKaoLogin from '../assets/KaKaoLogin.png';
import GoogleLogin from '../assets/GoogleLogin.png';

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
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgAuth})` }}
      />

      {/* content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* ✅ 가운데(로고) 영역이 남는 높이를 먹음 */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <div className="relative">
            <motion.img
              src={zaksimLogo}
              alt="ZAKSIM"
              className="w-[220px] max-w-full"
              initial={{ opacity: 0, scale: 0.8, clipPath: 'inset(0 84% 0 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{
                clipPath: { delay: 0.5, duration: 0.3, ease: 'easeInOut' },
                opacity: { delay: 0.1, duration: 0.3, ease: 'backIn' },
                scale: { delay: 0.1, duration: 0.3, ease: 'backIn' },
              }}
            />
          </div>

          <motion.img
            src={today}
            alt="오늘의 할 일"
            className="w-[220px] max-w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        </div>

        {/* ✅ 버튼은 “묶어서” 하단에 고정 */}
        <div className="mt-auto space-y-4 pb-10">
          {/* Kakao */}
          <button
            type="button"
            onClick={handleKakao}
            className="
      relative h-[58px] w-full overflow-hidden rounded-full
      bg-[#FEE500]
      shadow-[0_12px_30px_rgba(0,0,0,0.18)]
      active:scale-[0.98]
      transition-transform
    "
          >
            <img
              src={KaKaoLogin}
              alt="카카오로 시작하기"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </button>

          {/* 구글 */}
          <button
            type="button"
            onClick={handleGoogle}
            className="
      relative h-[58px] w-full overflow-hidden rounded-full
      bg-white
      shadow-[0_12px_30px_rgba(0,0,0,0.18)]
      active:scale-[0.98]
      transition-transform
    "
          >
            <img
              src={GoogleLogin}
              alt="Google로 시작하기"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
