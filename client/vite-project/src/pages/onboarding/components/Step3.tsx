/**
 * 온보딩 Step3 — 빈도·알림·공개 설정 화면 (3/3)
 */
import { useState } from 'react';
import HabitOptionsSection from '../../../components/habit/HabitOptionsSection';
import MonthlyDatePickerSheet from '../../../components/habit/MonthlyDatePickerSheet';
import OnboardingLayout from './OnboardingLayout';
import { mapDaysToServer } from '../../../api/utils';
import type { Day } from '../../../types/habitType';
import { COLORS } from '../../../constants/colors';
import { useHabitForm } from '../../../hooks/useHabitForm';
import { HABIT_FORM_STYLES, DAYS_FIRST_ROW, DAYS_SECOND_ROW } from '../../../constants/habitFormStyles';

const ONBOARDING_STEP_INDEX = 3;
const ONBOARDING_STEP_TOTAL = 3;
const DEFAULT_NICKNAME_DISPLAY = '회원';

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
  const {
    frequency,
    setFrequency,
    selectedDays,
    toggleDay,
    alarmEnabled,
    setAlarmEnabled,
    ampm,
    setAmpm,
    hour,
    setHour,
    minute,
    setMinute,
    isPublic,
    setIsPublic,
    selectSingleDay,
  } = useHabitForm();

  const [isMonthlyPickerOpen, setIsMonthlyPickerOpen] = useState(false);
  const [selectedMonthlyDay, setSelectedMonthlyDay] = useState<number | null>(null);

  // WEEKLY·CUSTOM은 요일 최소 1개 선택 필수
  const canNext =
    frequency === 'DAILY' || frequency === 'MONTHLY' || selectedDays.length > 0;

  const handleNext = () => {
    onNext({
      frequency,
      ...(frequency === 'CUSTOM' && { days: mapDaysToServer(selectedDays) }),
      isPublic,
    });
  };

  return (
    <>
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

      <HabitOptionsSection
        frequency={frequency}
        setFrequency={(val) => {
            setFrequency(val);
            if (val === 'MONTHLY') setIsMonthlyPickerOpen(true);
          }}
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
        onSingleDaySelect={selectSingleDay}
        selectedMonthlyDay={selectedMonthlyDay}
        onReopenMonthlyPicker={() => setIsMonthlyPickerOpen(true)}
        styles={HABIT_FORM_STYLES}
      />
    </OnboardingLayout>

    {isMonthlyPickerOpen && (
      <MonthlyDatePickerSheet
        open={isMonthlyPickerOpen}
        onClose={() => setIsMonthlyPickerOpen(false)}
        onSelect={(day) => setSelectedMonthlyDay(day)}
        initialDay={selectedMonthlyDay ?? undefined}
      />
    )}
    </>
  );
};

export default Step3;
