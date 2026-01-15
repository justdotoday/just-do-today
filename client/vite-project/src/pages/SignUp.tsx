const SignUp = () => {
  return (
    <div className="flex flex-col justify-between h-screen bg-white text-center font-sans">
      {/* 상단 타이틀 */}
      <div className="pt-10">
        <h1 className="text-2xl font-bold text-gray-800">Title</h1>
      </div>

      {/* 로고 */}
      <div className="mt-20">
        <div className="text-3xl font-bold text-gray-600">Logo</div>
      </div>

      {/* 버튼 영역 */}
      <div className="mb-16 px-6 space-y-4">
        <a
          href="#"
          className="block w-full bg-gray-800 text-white py-3 rounded-lg text-base hover:bg-gray-700"
        >
          구글 아이디로 시작하기
        </a>
        <a
          href="http://localhost:8080/auth/kakao"
          className="block w-full bg-gray-800 text-white py-3 rounded-lg text-base hover:bg-gray-700"
        >
          카카오 아이디로 시작하기
        </a>
      </div>
    </div>
  );
};

export default SignUp;
