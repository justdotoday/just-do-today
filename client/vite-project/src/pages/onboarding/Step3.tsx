import { useState } from 'react';
// import Toggle from '../../components/Toggle';
import { IoChevronBack } from 'react-icons/io5';
import HabitOptionsSection from '../../components/habit/HabitOptionsSection';

type Step3Props = {
  onNext: () => void;
  onBack: () => void;
};

type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

const Step3 = ({ onNext, onBack }: Step3Props) => {
  // 상태 관리
  const [frequency, setFrequency] = useState<Frequency>('DAILY');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [isPublic, setIsPublic] = useState(true);

  // 데이터
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // 버튼 스타일
  const outlineBtn =
    'h-12 rounded-xl border-2 border-blue-500 text-blue-600 text-[14px] font-semibold active:bg-blue-50';
  const filledBtn =
    'h-12 rounded-xl bg-blue-600 text-white text-[14px] font-semibold active:bg-blue-700';

  // 요일 토글
  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <div className="min-h-screen bg-white">
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
        <p className="text-[15px] font-semibold text-zinc-900">
          <span className="text-blue-600">2</span>/3
        </p>
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

      {/* 습관 컨포넌트 */}
      <div>
        <HabitOptionsSection
          frequency={frequency}
          setFrequency={setFrequency}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          dayRows={{
            first: ['월', '화', '수', '목'],
            second: ['금', '토', '일'],
          }}
          alarmEnabled={alarmEnabled}
          setAlarmEnabled={setAlarmEnabled}
          ampm={ampm}
          setAmpm={setAmpm}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          styles={{
            freqActive: filledBtn,
            freqInactive: outlineBtn,
            dayActive: 'bg-blue-500 text-white rounded-xl p-2',
            dayInactive: 'bg-gray-200 text-gray-600 rounded-xl p-2',
            filledBtn,
            outlineBtn,
          }}
        />
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

export default Step3;
