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
}: Props) => {
  return (
    <div className="space-y-10">
      {/* 1. 빈도 선택 */}
      <section className="space-y-4">
        <h2 className="text-[18px] font-semibold text-zinc-950">
          얼마나 자주 할 건가요?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFrequency(type)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition
                ${
                  frequency === type
                    ? 'bg-blue-100 text-blue-600 border-blue-400'
                    : 'bg-white text-zinc-600 border-zinc-200'
                }`}
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
            <div className="mt-4 grid grid-cols-7 gap-2 place-items-center">
              {['월', '화', '수', '목', '금', '토', '일'].map((d) => {
                const active = selectedDays.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDay(d)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-[14px] transition-colors
                      ${
                        active
                          ? 'border border-blue-500 text-blue-600 bg-white'
                          : 'border border-zinc-300 text-zinc-900 bg-white'
                      }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 2. 알림 설정 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-zinc-950">
            알림을 받으시겠어요?
          </h2>
          <Toggle checked={alarmEnabled} onChange={setAlarmEnabled} />
        </div>

        <div className="grid grid-cols-[1fr_1fr_auto_1fr] items-center gap-3">
          {/* 오전/오후 토글 */}
          <button
            onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
            disabled={!alarmEnabled}
            className="h-12 w-full rounded-xl border border-blue-500 bg-white text-blue-600 text-sm font-semibold disabled:opacity-40"
          >
            {ampm === 'AM' ? '오전' : '오후'}
          </button>

          {/* 시 선택 */}
          <select
            disabled={!alarmEnabled}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="h-12 w-full rounded-xl border border-blue-500 bg-white text-blue-600 text-center font-semibold appearance-none disabled:opacity-40"
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

          {/* 콜론 */}
          <span className="text-zinc-400 font-bold">:</span>

          {/* 분 선택 */}
          <select
            disabled={!alarmEnabled}
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="h-12 w-full rounded-xl border border-blue-500 bg-white text-blue-600 text-center font-semibold appearance-none disabled:opacity-40"
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

      {/* 3. 공개 여부 */}
      <section className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">
          이 습관을 친구에게 공개할까요?
        </h2>
        <Toggle checked={isPublic} onChange={setIsPublic} />
      </section>
    </div>
  );
};

export default HabitSettingSection;
