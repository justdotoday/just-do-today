// 온보딩 2 : 습관설정 입력단계
import { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import ColorPalette from '../../components/ColorPalette';

type Step2Props = {
  onNext: () => void;
};

const Step2 = ({ onNext }: Step2Props) => {
  const navigate = useNavigate();

  // 컬러 팔레트 모달 이벤트
  const [showPalette, setShowPalette] = useState(false);

  // 선택된 색상 상태 (입력창/버튼에만 반영)
  const [selectedColor, setSelectedColor] = useState<string>('#ccc');

  return (
    <div className="flex flex-col">
      {/* 모달 조건부 렌더링 */}
      {showPalette && (
        <ColorPalette
          onClose={() => setShowPalette(false)}
          onSelect={(color) => {
            setSelectedColor(color); // 선택된 색상 저장
            setShowPalette(false);
          }}
        />
      )}

      {/* 뒤로가기 버튼 및 진행도 */}
      <div className="flex flex-row items-center justify-between px-4 mt-10 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full active:bg-zinc-100"
          aria-label="뒤로가기"
        >
          <IoChevronBack className="block text-2xl text-zinc-900" />
        </button>
        <p className="text-[15px] font-semibold text-zinc-900">2/3</p>
      </div>

      {/* 메인 섹션 */}
      <h2>
        <p className="font-bold text-2xl p-1 m-2">
          <span className="text-blue-600">종달새</span>님! 반가워요!
        </p>
        <p className="font-bold text-2xl p-1 m-2">
          지금 바로 습관 하나 등록해볼까요?
        </p>
      </h2>

      {/* 입력창 */}
      <div className="relative m-2">
        <input
          className="w-full border-2 rounded-2xl pl-12 p-2 pr-16"
          style={{ borderColor: selectedColor }} // 선택된 색상 테두리 반영
          placeholder="예) 하루 30분 운동하기, 물 2L 마시기, 단어 30개 외우기..."
        />
        <button
          type="button"
          onClick={() => setShowPalette(true)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full h-6 w-6 cursor-pointer"
          style={{ backgroundColor: selectedColor }} // 버튼 색상 반영
        ></button>
      </div>

      {/* 카테고리 선택 (항상 회색 유지) */}
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
      <div className="fixed bottom-12 w-full flex flex-col items-center gap-2">
        <button
          className="text-gray-500 rounded-2xl cursor-pointer m-2 p-4"
          onClick={onNext}
        >
          나중에 할래요
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
