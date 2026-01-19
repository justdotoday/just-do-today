// 온보딩 1 : 사용자 이름 입력단계

type Step1Props = {
  onNext: () => void;
};

const Step1 = ({ onNext }: Step1Props) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-2xl p-1 m-1">
        반가워요! 사용자의 이름을 입력해주세요!
      </p>

      <input
        className="border-2 border-gray-300 p-2 m-2"
        placeholder="예) 홍길동"
      ></input>
      <button
        className="bg-black text-white rounded-2xl cursor-pointer m-1 p-4"
        onClick={onNext}
      >
        다음으로
      </button>
    </div>
  );
};

export default Step1;
