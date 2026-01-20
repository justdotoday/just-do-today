// 온보딩 2 : 습관설정 입력단계

type Step2Props = {
  onNext: () => void;
};

const Step2 = ({ onNext }: Step2Props) => {
  return (
    <div className="flex flex-col">
      {/* step 진행도 바 */}
      <div className="flex flex-row justify-around gap-2 m-2 mt-10 mb-40">
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-300"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-300"></p>
      </div>

      {/* 메인섹터 */}
      <p className="text-2xl p-1 m-2">반가워요! username님!</p>
      <p className="font-bold text-2xl p-1 m-1"></p>

      <p className="p-1 m-1">어떤 습관을 생성해볼까요?</p>

      {/* 입력창 */}
      <input
        className="border-2 rounded-2xl border-gray-300 p-2 m-2"
        placeholder="예) 하루 30분 운동하기, 물 2L 마시기, 단어 30개 외우기..."
      ></input>

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

      {/* next 버튼 */}
      <div className="flex justify-center">
        <button
          className="fixed bottom-16 text-gray-500 rounded-2xl cursor-pointer m-2 p-4"
          onClick={onNext}
        >
          넘어가기
        </button>
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

export default Step2;
