import { useState } from 'react';

import Toggle from '../../components/Toggle';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

type Step3Props = {
  onNext: () => void;
};

type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

const Step3 = ({ onNext }: Step3Props) => {
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

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
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

      <main className="mx-auto w-full px-4 md:px-8 pt-4 pb-[calc(120px+env(safe-area-inset-bottom))]">
        {/* 빈도 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-[18px] font-bold text-zinc-900">
            얼마나 자주 할 건가요?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setFrequency('DAILY')}
              className={frequency === 'DAILY' ? filledBtn : outlineBtn}
            >
              매일
            </button>
            <button
              onClick={() => setFrequency('WEEKLY')}
              className={frequency === 'WEEKLY' ? filledBtn : outlineBtn}
            >
              일주일에 한 번
            </button>
            <button
              onClick={() => setFrequency('MONTHLY')}
              className={frequency === 'MONTHLY' ? filledBtn : outlineBtn}
            >
              한 달에 한 번
            </button>
            <button
              onClick={() => setFrequency('CUSTOM')}
              className={frequency === 'CUSTOM' ? filledBtn : outlineBtn}
            >
              요일로 선택
            </button>
          </div>

          {frequency === 'CUSTOM' && (
            <div className="mt-4 rounded-2xl bg-zinc-200/70 p-4">
              <p className="text-[13px] font-medium text-zinc-500">
                요일을 선택하세요!
              </p>

              {/* 요일로 선택 버튼 */}
              <div className="mt-4 grid grid-cols-7 place-items-center">
                {days.map((d) => {
                  const active = selectedDays.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-[14px] transition-colors duration-200
        ${
          active
            ? 'border border-blue-500 text-blue-600 bg-white'
            : 'border border-zinc-300 text-zinc-900 bg-white'
        }
      `}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* 알림 */}
        <section className="mt-8 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-zinc-900">
              알림을 받으시겠어요?
            </h2>
            <Toggle checked={alarmEnabled} onChange={setAlarmEnabled} />
          </div>

          {/* 오전 오후 토글 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <button
              onClick={() => setAmpm(ampm === 'AM' ? 'PM' : 'AM')}
              disabled={!alarmEnabled}
              className={filledBtn}
            >
              {ampm === 'AM' ? '오전' : '오후'}
            </button>

            <span className="text-zinc-400 font-bold">:</span>

            <div className="grid grid-cols-2 gap-3">
              <input
                disabled={!alarmEnabled}
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-blue-500 text-center text-blue-600 font-semibold outline-none disabled:opacity-40"
                inputMode="numeric"
              />
              <input
                disabled={!alarmEnabled}
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="h-12 w-full rounded-xl border-2 border-blue-500 text-center text-blue-600 font-semibold outline-none disabled:opacity-40"
                inputMode="numeric"
              />
            </div>
          </div>
        </section>

        {/* 공개 여부 */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              이 습관을 친구에게 공개할까요?
            </h2>
            <Toggle checked={isPublic} onChange={setIsPublic} />
          </div>
        </section>
      </main>

      {/* 다음 버튼 */}
      <footer className="fixed bottom-0 left-0 w-full px-4 pb-[env(safe-area-inset-bottom)] bg-white">
        <button
          className="w-full h-14 bg-blue-500 text-white rounded-2xl cursor-pointer font-semibold"
          onClick={onNext}
        >
          다음으로
        </button>
      </footer>
    </div>
  );
};

export default Step3;
