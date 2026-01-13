const SignUp = () => {
  const KAKAO_AUTH_URL =
    'https://kauth.kakao.com/oauth/authorize' +
    '?client_id=' +
    import.meta.env.VITE_KAKAO_REST_API_KEY +
    '&redirect_uri=http://localhost:5173/auth/kakao/callback' +
    '&response_type=code';

  console.log('KAKAO_AUTH_URL', KAKAO_AUTH_URL);

  return (
    <div>
      <a href={KAKAO_AUTH_URL}>카카오 아이디로 시작하기</a>
    </div>
  );
};

export default SignUp;
