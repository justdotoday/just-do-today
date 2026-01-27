import Toggle from '../../components/Toggle';

type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

type Props = {
  // 빈도 관련
  frequency: Frequency;
  setFrequency: (val: Frequency) => void;
  selectedDays: string[];
  toggleDay: (d: string) => void;
  dayRows: { first: readonly string[]; second: readonly string[] };
  // 알림 관련
  alarmEnabled: boolean;
  setAlarmEnabled: (val: boolean) => void;
  ampm: 'AM' | 'PM';
  setAmpm: (val: 'AM' | 'PM') => void;
  hour: string;
  setHour: (val: string) => void;
  minute: string;
  setMinute: (val: string) => void;
  // 공개 여부
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
  // 디자인 스타일 props
  styles: {
    freqActive: string;
    freqInactive: string;
    dayActive: string;
    dayInactive: string;
    filledBtn: string;
    outlineBtn: string;
  };
};

const HabitSettingSection = ({
  frequency,
  setFrequency,
  selectedDays,
  toggleDay,
  dayRows,
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
  styles,
}: Props) => {
  return (
    <div className="space-y-10">
      {/* 1. 빈도 선택 섹션 */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-zinc-950">
          얼마나 자주 할 건가요?
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFrequency(type)}
              className={
                frequency === type ? styles.freqActive : styles.freqInactive
              }
            >
              {type === 'DAILY'
                ? '매일'
                : type === 'WEEKLY'
                ? '일주일에 한 번'
                : type === 'MONTHLY'
                ? '한 달에 한 번'
                : '요일로 선택'}
            </button>
          ))}
        </div>

        {frequency === 'CUSTOM' && (
          <div className="mt-6 flex flex-col items-center gap-5">
            <div className="grid grid-cols-4 gap-5">
              {dayRows.first.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={
                    selectedDays.includes(d)
                      ? styles.dayActive
                      : styles.dayInactive
                  }
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-5">
              {dayRows.second.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={
                    selectedDays.includes(d)
                      ? styles.dayActive
                      : styles.dayInactive
                  }
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. 알림 설정 섹션 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-zinc-950">
            알림을 받으시겠어요?
          </h2>
          <Toggle checked={alarmEnabled} onChange={setAlarmEnabled} />
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] items-center gap-3">
          <button
            disabled={!alarmEnabled}
            onClick={() => setAmpm('AM')}
            className={`${
              ampm === 'AM' ? styles.filledBtn : styles.outlineBtn
            } h-12 disabled:opacity-30`}
          >
            오전
          </button>
          <button
            disabled={!alarmEnabled}
            onClick={() => setAmpm('PM')}
            className={`${
              ampm === 'PM' ? styles.filledBtn : styles.outlineBtn
            } h-12 disabled:opacity-30`}
          >
            오후
          </button>
          <span className="text-zinc-300 font-bold px-1">:</span>
          <input
            disabled={!alarmEnabled}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="h-12 w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 text-center text-[16px] font-bold outline-none focus:border-[#2563EB] focus:bg-white disabled:opacity-30"
          />
          <input
            disabled={!alarmEnabled}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="h-12 w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 text-center text-[16px] font-bold outline-none focus:border-[#2563EB] focus:bg-white disabled:opacity-30"
          />
        </div>
      </section>

      {/* 3. 공개 여부 섹션 */}
      <section className="mb-10 flex items-center justify-between">
        <h2 className="text-[18px] font-semibold text-zinc-900">
          이 습관을 친구에게 공개할까요?
        </h2>
        <Toggle checked={isPublic} onChange={setIsPublic} />
      </section>
    </div>
  );
};

export default HabitSettingSection;
