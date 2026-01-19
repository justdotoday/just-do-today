type Step3Props = {
  onNext: () => void;
};

const Step3 = ({ onNext }: Step3Props) => {
  return (
    <div className="flex flex-col">
      <p>얼마나 자주 할 건가요?</p>
      <div>
        <button>매일</button>
        <button>일주일에 한 번</button>
        <button>한 달에 한 번</button>
        <button>요일별로 선택</button>
      </div>

      <div className="flex flex-row">
        <p>알림을 받으시겠어요?</p>
        <span>토글 버튼</span>
      </div>
      <div className="flex flex-col">
        <button>오전</button>
        <button>오후</button>
      </div>
      <div>
        <button>시간</button>
        <button>분</button>
      </div>
      <div className="flex flex-row">
        <p>이 습관을 친구에게 공개할까요?</p>
        <p>토글</p>
      </div>

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

export default Step3;
