/**
 * 온보딩 Step3 — 빈도·알림·공개 설정 화면 (3/3)
 */
import { useState } from 'react';
import HabitOptionsSection from '../../../components/habit/HabitOptionsSection';
import OnboardingLayout from './OnboardingLayout';
import { mapDaysToServer } from '../../../api/utils';
import type { Day } from '../../../types/habitType';
import { COLORS } from '../../../constants/colors';

const ONBOARDING_STEP_INDEX = 3;
const ONBOARDING_STEP_TOTAL = 3;
const DEFAULT_NICKNAME_DISPLAY = '회원';

const DAYS_FIRST_ROW = ['월', '화', '수', '목'] as const;
const DAYS_SECOND_ROW = ['금', '토', '일'] as const;

type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

export type Step3HabitData = {
  frequency: Frequency;
  days?: Day[];
  isPublic: boolean;
};

type Step3Props = {
  onNext: (data: Step3HabitData) => void;
  onBack: () => void;
  /** 나중에 할래요 클릭 시 (MainPage로 이동) */
  onSkip: () => void;
  nickname?: string;
};

const Step3 = ({
  onNext,
  onBack,
  onSkip,
  nickname = DEFAULT_NICKNAME_DISPLAY,
}: Step3Props) => {
  const [frequency, setFrequency] = useState<Frequency>('DAILY');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [isPublic, setIsPublic] = useState(false);

  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const baseBtn =
    'h-[48px] w-full rounded-[20px] text-[16px] font-medium transition-all active:scale-[0.98] flex items-center justify-center';
  const outlineBtn = `${baseBtn} border-[1.5px] border-[#2E68EF] text-[#2E68EF] bg-white`;
  const filledBtn = `${baseBtn} bg-[#2E68EF] text-white`;

  const freqBase =
    'h-11 w-full rounded-full border ' +
    'text-[12px] leading-[20px] font-medium transition active:scale-[0.98]';
  const freqInactive = `${freqBase} bg-white border-zinc-200 text-zinc-900`;
  const freqActive = `${freqBase} bg-[#EFF6FF] border-[#A5B4FC] text-[#2E68EF]`;

  const dayBase =
    'h-[45px] w-[45px] rounded-full border ' +
    'text-[12px] leading-[18px] font-medium ' +
    'flex items-center justify-center transition';
  const dayInactive = `${dayBase} bg-white border-zinc-200 text-zinc-900`;
  const dayActive = `${dayBase} bg-[#EFF6FF] border-[#A5B4FC] text-[#2E68EF]`;

  // 빈도가 '요일로 선택'이면 최소 1개 요일 선택 필수
  const canNext = frequency !== 'CUSTOM' || selectedDays.length > 0;

  const handleNext = () => {
    onNext({
      frequency,
      ...(frequency === 'CUSTOM' && { days: mapDaysToServer(selectedDays) }),
      isPublic,
    });
  };

  return (
    <OnboardingLayout
      step={ONBOARDING_STEP_INDEX}
      totalSteps={ONBOARDING_STEP_TOTAL}
      onBack={onBack}
      onNext={handleNext}
      canNext={canNext}
      onSkip={onSkip}
    >
      <section className="mb-6">
        <h2 className="font-bold text-lg text-zinc-900">
          <span style={{ color: COLORS.primary }}>{nickname}</span>
          <span className="text-zinc-900">님, 반가워요!</span>
        </h2>
        <p className="font-bold text-lg text-zinc-900">
          지금 바로 습관 하나 등록해 볼까요?
        </p>
      </section>

      {/* 습관 설정 섹션 컴포넌트 사용 */}
      <HabitOptionsSection
        frequency={frequency}
        setFrequency={setFrequency}
        selectedDays={selectedDays}
        toggleDay={toggleDay}
        dayRows={{ first: DAYS_FIRST_ROW, second: DAYS_SECOND_ROW }}
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
          freqActive,
          freqInactive,
          dayActive,
          dayInactive,
          filledBtn,
          outlineBtn,
        }}
      />
    </OnboardingLayout>
  );
};

export default Step3;
