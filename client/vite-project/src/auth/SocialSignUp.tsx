import zaksimLogo from '../assets/zaksim-logo.png';
import today from '../assets/today.png';
import { motion } from 'framer-motion';
import bgAuth from '../assets/bg-auth.png';
import KaKaoLogin from '../assets/KaKaoLogin.png';

const SocialSignUp = () => {
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
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <div className="relative">
            <motion.img
              src={zaksimLogo}
              alt="ZAKSIM"
              className="w-[220px] max-w-full"
              initial={{ opacity: 0, scale: 0.8, clipPath: 'inset(0 84% 0 0)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{
                clipPath: { delay: 0.5, duration: 0.3, ease: 'easeInOut' }, //z가 뜬 후 확장
                opacity: { delay: 0.1, duration: 0.3, ease: 'backIn' }, //z가 먼저 뜸
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
              flex items-center justify-center gap-3
              h-[58px] w-full
              rounded-full bg-white
              shadow-[0_12px_30px_rgba(0,0,0,0.18)]
              active:scale-[0.98] transition-transform
            "
          >
            {/* 구글 공식 컬러 G 로고 SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-6 w-6"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083L43.611,20.083C43.611,20.083,43.611,20.083,43.611,20.083c0.251,1.267,0.389,2.575,0.389,3.917c0,11.045-8.955,20-20,20c-0.012,0-0.023,0-0.035,0l6.57-5.283C31.666,37.868,33.792,36.078,35.303,34h0.046c1.649-4.657,0.679-9.996-2.247-13.917H43.611z"
              />
            </svg>
            <span className="text-[15px] font-semibold text-slate-800 font-['Pretendard']">
              Google로 시작하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSignUp;
