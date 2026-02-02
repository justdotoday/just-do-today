type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

type Styles = {
  freqActive: string;
  freqInactive: string;
  dayActive: string;
  dayInactive: string;
  filledBtn: string;
  outlineBtn: string;
};

type Props = {
  frequency: Frequency;
  setFrequency: (val: Frequency) => void;
  selectedDays: string[];
  toggleDay: (d: string) => void;
  dayRows: { first: readonly string[]; second: readonly string[] };
  alarmEnabled: boolean;
  setAlarmEnabled: (val: boolean) => void;
  ampm: 'AM' | 'PM';
  setAmpm: (val: 'AM' | 'PM') => void;
  hour: string;
  setHour: (val: string) => void;
  minute: string;
  setMinute: (val: string) => void;
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
  styles?: Partial<Styles>;
};

const defaultStyles: Styles = {
  freqInactive:
    'h-12 rounded-full border border-zinc-200 bg-white text-zinc-500 font-medium transition',
  freqActive:
    'h-12 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-semibold transition',
  dayInactive:
    'h-12 w-12 rounded-full border border-zinc-200 bg-white text-zinc-500 font-medium transition',
  dayActive:
    'h-12 w-12 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-semibold transition',
  outlineBtn:
    'h-11 px-6 rounded-full border border-zinc-200 bg-white text-zinc-500 font-medium transition',
  filledBtn:
    'h-11 px-6 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-semibold transition',
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
  const s: Styles = { ...defaultStyles, ...(styles ?? {}) };

  const timeBase =
    'h-14 px-6 rounded-full border text-base font-semibold transition appearance-none';
  const timeEnabled = 'border-zinc-200 bg-white text-zinc-900';
  const timeDisabled = 'border-zinc-200 bg-zinc-100 text-zinc-400';
  const timeClass = (minWidth: string) =>
    [minWidth, timeBase, alarmEnabled ? timeEnabled : timeDisabled].join(' ');

  return (
    <div className="space-y-10">
      {/* 빈도 선택 */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-zinc-950">
          얼마나 자주 할 건가요?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFrequency(type)}
              className={frequency === type ? s.freqActive : s.freqInactive}
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
          <div className="mt-4 p-1">
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-4 gap-3 place-items-center">
                {dayRows.first.map((d) => {
                  const active = selectedDays.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className={active ? s.dayActive : s.dayInactive}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-3 place-items-center">
                {dayRows.second.map((d) => {
                  const active = selectedDays.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className={active ? s.dayActive : s.dayInactive}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 알림 설정 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-zinc-950">
            알림을 받으시겠어요?
          </h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={alarmEnabled}
              onChange={() => setAlarmEnabled(!alarmEnabled)}
              className="sr-only peer"
            />
            <div className="w-12 h-7 bg-zinc-200 rounded-full peer peer-checked:bg-blue-500 transition" />
            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5" />
          </label>
        </div>

        <div className="flex justify-center gap-3 items-center">
          <button
            type="button"
            onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
            disabled={!alarmEnabled}
            className={timeClass('min-w-[96px]')}
          >
            {ampm === 'AM' ? '오전' : '오후'}
          </button>

          <select
            disabled={!alarmEnabled}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className={timeClass('min-w-[96px]')}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const val = String(i + 1).padStart(2, '0');
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>

          <span className="text-[22px] font-semibold text-zinc-300">:</span>

          <select
            disabled={!alarmEnabled}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className={timeClass('min-w-[96px]')}
          >
            {[
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
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 공개 여부 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-zinc-950">
            이 습관을 친구에게 공개할까요?
          </h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="sr-only peer"
            />
            <div className="w-12 h-7 bg-zinc-200 rounded-full peer peer-checked:bg-blue-500 transition" />
            <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5" />
          </label>
        </div>
      </section>
    </div>
  );
};

export default HabitOptionsSection;
