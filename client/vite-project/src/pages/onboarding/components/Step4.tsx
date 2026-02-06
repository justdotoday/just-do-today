import { IoChevronBack } from 'react-icons/io5';

// 온보딩 4: 목표 저장
type Step4Props = {
  onFinish: () => void; // 모달 닫기 로직을 부모에서 전달
  onBack: () => void; // 뒤로가기 핸들러
};

const Step4 = ({ onFinish, onBack }: Step4Props) => {
  return (
    <div className="flex flex-col">
      {/* 뒤로가기 버튼 및 진행도 */}
      <div className="flex flex-row items-center justify-between px-4 mt-10 mb-6">
        <button
          type="button"
          onClick={onBack} // 부모에서 내려준 onBack 호출
          className="inline-flex h-11 w-11 items-center justify-center rounded-full active:bg-zinc-100"
          aria-label="뒤로가기"
        >
          <IoChevronBack className="block text-2xl text-zinc-900" />
        </button>
        <p className="text-[15px] font-semibold text-zinc-900">4/4</p>
      </div>

      {/* 메인섹션 */}
      <p className="font-bold text-4xl p-1 m-1 mb-10">
        작심삼일과 함께 이루고 싶은 목표는 무엇인가요?
      </p>
      <p className="text-gray-400 p-1 m-1">
        더 좋은 서비스를 만들어가기 위해 참고할게요!
      </p>

      {/* 입력창 */}
      <input
        className="border-2 rounded-2xl min-h-30 border-gray-300 p-2 m-2"
        placeholder="목표를 입력해주세요"
      />

      {/* 완료 버튼들 */}
      <div className="fixed bottom-0 left-0 w-full flex flex-col items-center gap-2 px-4 pb-6 bg-white">
        <button
          className="text-gray-500 rounded-2xl cursor-pointer w-full p-4"
          onClick={onFinish}
        >
          넘어가기
        </button>
        <button
          className="bg-blue-500 text-white rounded-2xl cursor-pointer w-full p-4"
          onClick={onFinish}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default Step4;
