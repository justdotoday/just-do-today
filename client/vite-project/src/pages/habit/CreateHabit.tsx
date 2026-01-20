import React, { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Toggle from '../../components/Toggle';
import { mapDaysToServer } from '../../api/utils';
import { createHabit } from '../../api/habit';
import type { CreateHabitPayload } from '../../types/habitType';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateHabit = () => {
  const navigate = useNavigate();

  // 카테고리 배열
  const categories = [
    '외국어',
    '자격증',
    '포트폴리오',
    '독서',
    '강의수강',
    '헬스/홈트',
    '스트레칭',
    '물 마시기',
    '다이어트',
    '생활루틴',
    '건강관리',
    '코딩',
  ];

  //날짜 배열
  const day = ['월', '화', '수', '목', '금', '토', '일'];

  // 습관 제목 상태관리
  const [name, setName] = useState('');

  // 카테고리 제목 상태관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 주기별 상태관리 및 Frequency타입 선언
  const [frequency, setFrequency] = useState<Frequency>('DAILY');
  type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

  // 공개여부 상태관리
  const [isPublic, setIsPublic] = useState(true);

  // frequency type지정

  // 공통 디자인 컴포넌트
  const outlineBtn =
    'h-12 rounded-xl border-2 border-blue-500 text-blue-600 text-[14px] font-semibold active:bg-blue-50';
  // 공통 디자인 컴포넌트
  const filledBtn =
    'h-12 rounded-xl bg-blue-600 text-white text-[14px] font-semibold active:bg-blue-700';

  //알림 상태변화
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');

  //요일 선택 상태볂화
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  //완료 버튼 계산식
  const canSubmit =
    name.trim().length > 0 &&
    selectedCategory !== null &&
    (frequency !== 'CUSTOM' || selectedDays.length > 0);

  //api 연결
  const handleSubmit = async () => {
    if (!canSubmit) return;
    const payload: CreateHabitPayload = {
      name: name.trim(),
      category: selectedCategory!,
      frequency,
      days: frequency === 'CUSTOM' ? mapDaysToServer(selectedDays) : undefined,
      isPublic,
    };
    try {
      await createHabit(payload);
      toast.success('습관이 생성되었습니다!');
      // navigate('/habit'); << 이건 추후 상의
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        toast.error('서버 연결 X');
        return;
      }
      toast.error('습관 생성 실패');
    }
  };

  // 반응형 ui
  /**
   * Layout & Responsive Guide (CreateHabit)
   *
   * 기준
   * - 웹앱(PWA) 특성상 iPhone ~ iPad(세로)까지 자연스럽게 대응
   *
   * - Mobile (<768px)
   *   - max-width: 420px
   *   - padding-x: 16px (px-4)
   *
   * - iPad / Tablet (>=768px, md)
   *   - max-width: 720px
   *   - padding-x: 32px (md:px-8)
   *
   * Safe Area 대응 (iOS)
   * - Header: env(safe-area-inset-top) 적용
   * - Bottom CTA: env(safe-area-inset-bottom) 적용
   *   → 노치 / 홈 인디케이터 영역 침범 방지
   *
   * UI 규칙
   * - Category Chips: flex-wrap 사용 (화면 폭에 따라 자동 줄바꿈)
   * - Frequency Buttons: grid-cols-2 고정
   *   → 모바일에서도 버튼 크기 안정적으로 유지
   *
   * 비고
   * - 태블릿 전용 레이아웃 분기(2열 등)는 의도적으로 제외
   * - 필요 시 md:grid-cols-* 확장 가능
   */

  return (
    <div className="min-h-screen bg-white">
      {/* 상단바 */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="pt-[env(safe-area-inset-top)]" />
        <div className="relative flex h-12 items-center justify-center px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-2 inline-flex h-11 w-11 items-center justify-center rounded-full active:bg-zinc-100"
            aria-label="뒤로가기"
          >
            <IoChevronBack className="text-2xl text-zinc-900" />
          </button>

          <h1 className="text-[15px] font-semibold text-zinc-900">
            미션 생성하기
          </h1>
        </div>
        <div className="h-px w-full bg-zinc-100" />
      </header>

      {/* 본문 */}
      <main className="mx-auto w-full max-w-[420px] md:max-w-[720px] px-4 md:px-8 pt-4 pb-[calc(120px+env(safe-area-inset-bottom))]">
        {/* 습관명 */}
        <section className="mt-8 space-y-2">
          <h2 className="text-[13px] font-semibold text-zinc-900">
            어떤 습관을 만들고 싶으신가요?
          </h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 유산소 30분, 하루 1L 물 마시기..."
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-[14px] outline-none placeholder:text-zinc-400 focus:border-zinc-400"
          />
        </section>
        {/* 카테고리 */}
        <section className="mt-6 space-y-3">
          <h2 className="text-[13px] font-semibold text-zinc-900">
            습관 카테고리를 선택해 주세요.
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`min-h-[40px] rounded-full px-3.5 py-2 text-[12px] font-semibold
                  ${
                    selectedCategory === c
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-700 active:bg-zinc-200'
                  }
                `}
              >
                {c}
              </button>
            ))}

            <button
              type="button"
              className="min-h-[40px] rounded-full border border-dashed border-zinc-300 bg-white px-3.5 py-2 text-[12px] font-semibold text-zinc-700 active:bg-zinc-50"
            >
              직접 작성 <span className="ml-1">+</span>
            </button>
          </div>
        </section>
        {/* 빈도 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-[18px] font-bold text-zinc-900">
            얼마나 자주 할 건가요?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFrequency('DAILY')}
              className={frequency === 'DAILY' ? filledBtn : outlineBtn}
            >
              매일
            </button>

            <button
              type="button"
              onClick={() => setFrequency('WEEKLY')}
              className={frequency === 'WEEKLY' ? filledBtn : outlineBtn}
            >
              일주일에 한 번
            </button>

            <button
              type="button"
              onClick={() => setFrequency('MONTHLY')}
              className={frequency === 'MONTHLY' ? filledBtn : outlineBtn}
            >
              한 달에 한 번
            </button>

            <button
              type="button"
              onClick={() => setFrequency('CUSTOM')}
              className={frequency === 'CUSTOM' ? filledBtn : outlineBtn}
            >
              요일로 선택
            </button>
          </div>
          {/* 요일별 선택 로직 */}
          {frequency === 'CUSTOM' && (
            <div className="mt-4 rounded-2xl bg-zinc-200/70 p-4">
              <p className="text-[13px] font-medium text-zinc-500 leading-none">
                요일을 선택하세요!
              </p>

              <div className="mt-4 grid grid-cols-7 place-items-center">
                {day.map((d) => {
                  const active = selectedDays.includes(d);

                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className="flex flex-col items-center gap-3"
                    >
                      {/* 체크박스 */}
                      <span
                        className={[
                          'h-5 w-5 rounded-[2px] border-2 border-zinc-900 bg-white',
                          active ? 'bg-zinc-900' : '',
                        ].join(' ')}
                      />
                      {/* 요일 텍스트 */}
                      <span className="text-[14px] font-semibold text-zinc-900">
                        {d}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
        <section className="mt-8 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold text-zinc-900">
              알림을 받으시겠어요?
            </h2>
            <Toggle checked={alarmEnabled} onChange={setAlarmEnabled} />
          </div>

          <div className="grid grid-cols-[1fr_1fr_auto_1fr] items-center gap-3">
            <button
              type="button"
              onClick={() => setAmpm('AM')}
              disabled={!alarmEnabled}
              className={ampm === 'AM' ? filledBtn : outlineBtn}
            >
              오전
            </button>

            <button
              type="button"
              onClick={() => setAmpm('PM')}
              disabled={!alarmEnabled}
              className={ampm === 'PM' ? filledBtn : outlineBtn}
            >
              오후
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
        {/* 공개 */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              이 습관을 친구에게 공개할까요?
            </h2>
            <Toggle checked={isPublic} onChange={setIsPublic} />
          </div>
        </section>
      </main>

      {/* 완료 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <div className="mx-auto w-full max-w-[420px] md:max-w-[720px] border-t border-zinc-200 px-4 md:px-8 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
          {' '}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            type="button"
            className={[
              'h-12 w-full rounded-2xl text-[14px] font-semibold transition',
              canSubmit
                ? 'bg-blue-600 text-white active:bg-blue-700'
                : 'bg-zinc-200 text-zinc-500 cursor-not-allowed',
            ].join(' ')}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHabit;
