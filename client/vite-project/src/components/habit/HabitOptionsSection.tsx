import { useEffect, useState } from 'react';
import Toggle from '../../components/Toggle';

/** 시 옵션 (12시간제 1~12) */
const HOUR_OPTIONS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
] as const;

/** 분 옵션 (00~59, 5분 단위) */
const MINUTE_OPTIONS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
] as const;

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

const HabitOptionsSection = ({
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
  const [openPicker, setOpenPicker] = useState<'hour' | 'minute' | null>(null);

  const safeHour = HOUR_OPTIONS.includes(hour as (typeof HOUR_OPTIONS)[number])
    ? hour
    : '01';
  const safeMinute = MINUTE_OPTIONS.includes(
    minute as (typeof MINUTE_OPTIONS)[number]
  )
    ? minute
    : '00';

  useEffect(() => {
    if (!HOUR_OPTIONS.includes(hour as (typeof HOUR_OPTIONS)[number]))
      setHour('01');
    if (!MINUTE_OPTIONS.includes(minute as (typeof MINUTE_OPTIONS)[number]))
      setMinute('00');
  }, [hour, minute, setHour, setMinute]);

  const handleHourSelect = (v: string) => {
    setHour(v);
    setOpenPicker(null);
  };
  const handleMinuteSelect = (v: string) => {
    setMinute(v);
    setOpenPicker(null);
  };

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
        <div
          className={`flex flex-col gap-2 ${
            !alarmEnabled ? 'pointer-events-none opacity-30' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!alarmEnabled}
              onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
              className="h-12 min-w-28 shrink-0 rounded-2xl border border-zinc-200 bg-white px-4 text-[16px] font-medium text-zinc-900 transition active:scale-[0.98] disabled:opacity-30"
            >
              {ampm === 'AM' ? '오전' : '오후'}
            </button>
            <div className="relative">
              <button
                type="button"
                disabled={!alarmEnabled}
                onClick={() =>
                  setOpenPicker(openPicker === 'hour' ? null : 'hour')
                }
                className="h-12 w-28 rounded-2xl border border-zinc-200 bg-white text-center text-[16px] font-medium text-zinc-900 transition active:scale-[0.98] disabled:opacity-30"
              >
                {safeHour}
              </button>
              {openPicker === 'hour' && (
                <ul
                  className="absolute left-0 top-full z-[100] mt-1 max-h-40 w-28 overflow-y-auto rounded-2xl border border-zinc-200 bg-white py-1 shadow-lg"
                  role="listbox"
                >
                  {HOUR_OPTIONS.map((h) => (
                    <li key={h} role="option" aria-selected={h === safeHour}>
                      <button
                        type="button"
                        onClick={() => handleHourSelect(h)}
                        className={`w-full py-2 text-center text-[16px] font-medium ${
                          h === safeHour
                            ? 'bg-zinc-100 text-zinc-900'
                            : 'text-zinc-700'
                        }`}
                      >
                        {h}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className="text-zinc-900 font-medium shrink-0">:</span>
            <div className="relative">
              <button
                type="button"
                disabled={!alarmEnabled}
                onClick={() =>
                  setOpenPicker(openPicker === 'minute' ? null : 'minute')
                }
                className="h-12 w-28 rounded-2xl border border-zinc-200 bg-white text-center text-[16px] font-medium text-zinc-900 transition active:scale-[0.98] disabled:opacity-30"
              >
                {safeMinute}
              </button>
              {openPicker === 'minute' && (
                <ul
                  className="absolute left-0 top-full z-[100] mt-1 max-h-40 w-28 overflow-y-auto rounded-2xl border border-zinc-200 bg-white py-1 shadow-lg"
                  role="listbox"
                >
                  {MINUTE_OPTIONS.map((m) => (
                    <li key={m} role="option" aria-selected={m === safeMinute}>
                      <button
                        type="button"
                        onClick={() => handleMinuteSelect(m)}
                        className={`w-full py-2 text-center text-[16px] font-medium ${
                          m === safeMinute
                            ? 'bg-zinc-100 text-zinc-900'
                            : 'text-zinc-700'
                        }`}
                      >
                        {m}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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

export default HabitOptionsSection;
