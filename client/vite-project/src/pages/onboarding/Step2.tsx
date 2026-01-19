// 온보딩 2 : 습관설정 입력단계

type Step2Props = {
  onNext: () => void;
};

const Step2 = ({ onNext }: Step2Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-2xl p-1 m-1">반가워요! username님!</p>
      <p className="font-bold text-2xl p-1 m-1">먼저, 습관을 생성해볼까요?</p>

      <p className="p-1 m-1">어떤 습관을 생성해볼까요?</p>
      <input
        className="border-2 border-gray-300 p-2 m-2"
        placeholder="예) 하루 운동 30분하기, 물 2L 마시기, 영단어 20개 외우기..."
      />

      <div className="p-1 m-1">
        <p className="mb-2">습관 카테고리를 선택해주세요.</p>
        <ul>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">외국어</li>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">자격증</li>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">
            포트폴리오
          </li>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">독서</li>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">운동</li>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">
            생활루틴
          </li>
          <li className="rounded-2xl bg-gray-200 text-2xl p-4 mb-2">
            건강관리
          </li>
        </ul>
        <div className="flex justify-center items-center">
          <button className="cursor-pointer underline underline-offset-1">
            생성하고 싶은 카테고리가 없나요? <br /> 그렇다면 직접 추가할 수
            있어요!
          </button>
        </div>
      </div>

      <button
        className="bg-black text-white rounded-2xl cursor-pointer m-1 p-4"
        onClick={onNext}
      >
        다음으로
      </button>
    </div>
  );
};

export default Step2;
