const SignUp = () => {
  const KAKAO_AUTH_URL =
    'https://kauth.kakao.com/oauth/authorize?client_id=' +
    import.meta.env.VITE_KAKAO_REST_API_KEY +
    '&redirect_uri=http://localhost:5173/auth/kakao/callback' +
    '&response_type=code';

  console.log(KAKAO_AUTH_URL);

  return (
    <div>
      <div>Title</div>
      <div>logo</div>
      <div className="flex gap-2 flex-col items-center">
        <a href="">구글 아이디로 시작하기</a>
        <a href={KAKAO_AUTH_URL}> 카카오 아이디로 시작하기</a>
      </div>
    </div>
  );
};

export default SignUp;
