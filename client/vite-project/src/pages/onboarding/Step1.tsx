// 온보딩 1 : 사용자 이름 입력단계
import { IoChevronBack } from 'react-icons/io5';

type Step1Props = {
  onNext: () => void;
  onBack: () => void;
};

const Step1 = ({ onNext, onBack }: Step1Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between px-4 mt-10 mb-40">
        {/* 뒤로가기 버튼 및 진행도 */}
        <div className="flex flex-row items-center justify-between px-4 mt-10 mb-6">
          <button
            type="button"
            onClick={onBack} // navigate(-1) 대신 부모에서 내려준 onBack 호출
            className="inline-flex h-11 w-11 items-center justify-center rounded-full active:bg-zinc-100"
            aria-label="뒤로가기"
          >
            <IoChevronBack className="block text-2xl text-zinc-900" />
          </button>
        </div>

        {/* 진행도 텍스트 */}
        <p className="text-[15px] font-semibold text-zinc-900">1/3</p>
      </div>

      {/* 메인섹션 */}
      <div>
        <p className="flex items-center font-bold text-2xl p-1 m-1 mb-10">
          안녕하세요! ♥ <br /> 어떻게 불러드릴까요?
        </p>
      </div>

      {/* 이름(닉네임) 설정 */}
      <input
        className="border-2 rounded-2xl border-gray-300 p-2 m-2 h-20"
        placeholder="예) 나는야종달새"
      />

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
