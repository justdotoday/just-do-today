/**
 * 온보딩 Step3 — 빈도·알림·공개 설정 화면 (3/3)
 */
import { useState } from 'react';
import HabitOptionsSection from '../../../components/habit/HabitOptionsSection';
import OnboardingStepHeader from './OnboardingStepHeader';

const ONBOARDING_CONTENT_MAX_WIDTH_PX = 414;
const ONBOARDING_BOTTOM_PADDING_PX = 16;
const ONBOARDING_STEP_INDEX = 3;
const ONBOARDING_STEP_TOTAL = 3;
const PRIMARY_BLUE_HEX = '#2563EB';
const DEFAULT_NICKNAME_DISPLAY = '회원';

const DAYS_FIRST_ROW = ['월', '화', '수', '목'] as const;
const DAYS_SECOND_ROW = ['금', '토', '일'] as const;

type Step3Props = {
  onNext: () => void;
  onBack: () => void;
  /** 나중에 할래요 클릭 시 (MainPage로 이동) */
  onSkip: () => void;
  nickname?: string;
};

type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

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
  const outlineBtn = `${baseBtn} border-[1.5px] border-[#2563EB] text-[#2563EB] bg-white`;
  const filledBtn = `${baseBtn} bg-[#2563EB] text-white`;

  const freqBase =
    'h-[55px] w-full rounded-full border-2 ' +
    'text-[16px] leading-[20px] font-medium transition active:scale-[0.98]';
  const freqInactive = `${freqBase} bg-white border-zinc-200 text-zinc-900`;
  const freqActive = `${freqBase} bg-[#EFF6FF] border-[#A5B4FC] text-[#2563EB]`;

  const dayBase =
    'h-[64px] w-[64px] rounded-full border-2 ' +
    'text-[14px] leading-[18px] font-medium ' +
    'flex items-center justify-center transition';
  const dayInactive = `${dayBase} bg-white border-zinc-200 text-zinc-900`;
  const dayActive = `${dayBase} bg-[#EFF6FF] border-[#A5B4FC] text-[#2563EB]`;

  const contentMaxWidthStyle = { maxWidth: ONBOARDING_CONTENT_MAX_WIDTH_PX };
  const bottomAreaPadding = `calc(${ONBOARDING_BOTTOM_PADDING_PX}px + env(safe-area-inset-bottom))`;

  // 빈도가 '요일로 선택'이면 최소 1개 요일 선택 필수
  const canNext =
    frequency !== 'CUSTOM' || selectedDays.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-100">
      <div
        className="mx-auto flex w-full flex-1 flex-col bg-white"
        style={contentMaxWidthStyle}
      >
        <OnboardingStepHeader
          step={ONBOARDING_STEP_INDEX}
          totalSteps={ONBOARDING_STEP_TOTAL}
          onBack={onBack}
        />

        <main className="flex flex-1 flex-col px-4 pb-24">
          <section className="mb-6">
            <h2 className="mb-1 font-bold text-2xl text-zinc-900">
              <span style={{ color: PRIMARY_BLUE_HEX }}>{nickname}</span>
              <span className="text-zinc-900">님, 반가워요!</span>
            </h2>
            <p className="font-bold text-2xl text-zinc-900">
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
        </main>
      </div>

      <div
        className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 space-y-2 bg-white px-4 pt-2"
        style={{
          ...contentMaxWidthStyle,
          paddingBottom: bottomAreaPadding,
        }}
      >
        <button
          type="button"
          onClick={onSkip}
          className="block w-full py-3 text-center text-[15px] font-medium text-zinc-500 active:opacity-80"
        >
          나중에 할래요
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="flex h-14 w-full items-center justify-center rounded-full font-semibold text-white transition active:scale-[0.98] disabled:bg-zinc-300 disabled:active:scale-100"
          style={canNext ? { backgroundColor: PRIMARY_BLUE_HEX } : undefined}
        >
          다음으로
        </button>
      </div>
    </div>
  );
};

export default Step3;
