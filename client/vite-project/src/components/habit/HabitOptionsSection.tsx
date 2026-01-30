type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

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

  styles?: {
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
              onClick={() => setFrequency(type)}
              className={
                frequency === type ? styles?.freqActive : styles?.freqInactive
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
          <div className="mt-4 rounded-2xl bg-zinc-100 p-4">
            <p className="text-[13px] font-medium text-zinc-500">
              요일을 선택하세요!
            </p>
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-4 gap-2 place-items-center">
                {dayRows.first.map((d) => {
                  const active = selectedDays.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={
                        active ? styles?.dayActive : styles?.dayInactive
                      }
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-2 place-items-center">
                {dayRows.second.map((d) => {
                  const active = selectedDays.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDay(d)}
                      className={
                        active ? styles?.dayActive : styles?.dayInactive
                      }
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
          <button
            onClick={() => setAlarmEnabled(!alarmEnabled)}
            className={styles?.outlineBtn}
          >
            {alarmEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
          <button
            onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
            disabled={!alarmEnabled}
            className={styles?.outlineBtn}
          >
            {ampm === 'AM' ? '오전' : '오후'}
          </button>

          <select
            disabled={!alarmEnabled}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className={styles?.outlineBtn}
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

          <span className="text-zinc-400 font-bold">:</span>

          <select
            disabled={!alarmEnabled}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className={styles?.outlineBtn}
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
      <section className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">
          이 습관을 친구에게 공개할까요?
        </h2>
        <button
          onClick={() => setIsPublic(!isPublic)}
          className={styles?.outlineBtn}
        >
          {isPublic ? '공개' : '비공개'}
        </button>
      </section>
    </div>
  );
};

export default HabitOptionsSection;
