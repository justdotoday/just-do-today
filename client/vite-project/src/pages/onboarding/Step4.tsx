// 온보딩 4: 목표 저장

type Step4Props = {
  onFinish: () => void;
};

const Step4 = ({ onFinish }: Step4Props) => {
  return (
    <div className="flex flex-col">
      {/* step 진행도 바 */}
      <div className="flex flex-row justify-around gap-2 m-2 mt-10 mb-40">
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
      </div>

      {/* 메인섹터 */}
      <p
        className="font-bold text-4xl p-1 m-1 mb-10
      "
      >
        작심삼입일과 함께 이루고 싶은 목표는 무엇인가요?
      </p>
      <p className="text-gray-400 p-1 m-1">
        더 좋은 서비스를 만들어가기 위해 참고할게요!
      </p>

      {/* 입력창 */}
      <input
        className="border-2 rounded-2xl h-100 border-gray-300 p-2 m-2"
        placeholder="더 좋은 서비스를 만들어가기 위해 참고할게요!"
      />
      {/* 완료버튼 버튼 */}
      <div className="flex justify-center">
        <button
          className="fixed bottom-16 text-gray-500 rounded-2xl cursor-pointer m-2 p-4"
          onClick={onFinish}
        >
          넘어가기
        </button>
        <button
          className="fixed bottom-0 w-150 bg-blue-500 text-white rounded-2xl cursor-pointer m-2 p-4"
          onClick={onFinish}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default Step4;
