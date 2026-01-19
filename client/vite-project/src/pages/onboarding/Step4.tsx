// 온보딩 4: 목표 저장

type Step4Props = {
  onFinish: () => void;
};

const Step4 = ({ onFinish }: Step4Props) => {
  return (
    <div className="flex flex-col">
      <p className="p-1 m-1">반가워요! username</p>
      <p
        className="font-bold text-4xl p-1 m-1
      "
      >
        작심삼입일과 함께 이루고 싶은 목표는 무엇인가요?
      </p>
      <p className="text-gray-400 p-1 m-1">
        더 좋은 서비스를 만들어가기 위해 참고할게요!
      </p>

      <input
        className="border-2 border-gray-300 p-2 m-2"
        placeholder="예) 운동 습관 만들기, 공부 습관 만들기..."
      />
      <button
        className="bg-black text-white rounded-sm cursor-pointer m-1 p-1"
        onClick={onFinish}
      >
        제출하기
      </button>
      <button className="cursor-pointer" onClick={onFinish}>
        나중에 할게요
      </button>
    </div>
  );
};

export default Step4;
