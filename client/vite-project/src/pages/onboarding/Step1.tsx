// 온보딩 1 : 사용자 이름 입력단계

type Step1Props = {
  onNext: () => void;
};

const Step1 = ({ onNext }: Step1Props) => {
  return (
    <div className="flex flex-col">
      {/* step 진행도 바 */}
      <div className="flex flex-row justify-around gap-2 m-2 mt-10 mb-40">
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-300"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-300"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-300"></p>
      </div>

      {/* 메인섹터 */}

      <p className="flex items-center font-bold text-2xl p-1 m-1">
        안녕하세요! <br /> 사용자의 이름을 입력해주세요!
      </p>

      {/* 이름(닉네임) 설정 */}
      <p className="text-gray-400 m-2">이름(닉네임)</p>
      <input
        className="border-2 rounded-2xl border-gray-300 p-2 m-2"
        placeholder="예) 홍길동"
      ></input>

      {/* next 버튼 */}
      <div className="flex justify-center">
        <button
          className="fixed bottom-0 w-150 bg-blue-500 text-white rounded-2xl cursor-pointer m-2 p-4"
          onClick={onNext}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Step1;
