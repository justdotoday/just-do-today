type Step3Props = {
  onNext: () => void;
};

const Step3 = ({ onNext }: Step3Props) => {
  return (
    <div className="flex flex-col">
      {/* step 진행도 바 */}
      <div className="flex flex-row justify-around gap-2 m-2 mt-10 mb-40">
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-500"></p>
        <p className="rounded-2xl w-1/4 p-2 bg-gray-300"></p>
      </div>

      {/* 메인섹터 */}
      <div>
        <p className="text-2xl p-1 m-2">얼마나 자주 할 건가요?</p>
      </div>
      <div>
        <button>매일</button>
        <button>일주일에 한 번</button>
        <button>한달에 한 번</button>
        <button>요일로 선택</button>
        {/* 요일로 선택 시, 요일 선택하는 모달? */}
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

export default Step3;
