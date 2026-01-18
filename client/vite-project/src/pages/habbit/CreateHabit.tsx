import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CreateHabit = () => {
  const navigate = useNavigate();

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
      <main className="mx-auto w-full max-w-[420px] px-4 pt-4 pb-[calc(120px+env(safe-area-inset-bottom))]">
        {/* 습관명 */}
        <section className="space-y-2">
          <h2 className="text-[13px] font-semibold text-zinc-900">
            어떤 습관을 만들고 싶으신가요?
          </h2>
          <input
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
                className="min-h-[40px] rounded-full bg-zinc-100 px-3.5 py-2 text-[12px] font-semibold text-zinc-700 active:bg-zinc-200"
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
        <section className="mt-6 space-y-3">
          <h2 className="text-[13px] font-semibold text-zinc-900">
            얼마나 자주 할 건가요?
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="h-12 rounded-2xl border border-zinc-200 bg-white text-[13px] font-semibold text-zinc-800 active:bg-zinc-50"
            >
              매일
            </button>
            <button
              type="button"
              className="h-12 rounded-2xl border border-zinc-200 bg-white text-[13px] font-semibold text-zinc-800 active:bg-zinc-50"
            >
              일주일에 한 번
            </button>
            <button
              type="button"
              className="h-12 rounded-2xl border border-zinc-200 bg-white text-[13px] font-semibold text-zinc-800 active:bg-zinc-50"
            >
              한 달에 한 번
            </button>
            <button
              type="button"
              className="h-12 rounded-2xl border border-zinc-200 bg-white text-[13px] font-semibold text-zinc-800 active:bg-zinc-50"
            >
              요일로 선택
            </button>
          </div>
        </section>

        {/* 알림 */}
        <section className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              알림을 받으시겠어요?
            </h2>

            {/* 디자인용 토글 */}
            <div className="relative h-7 w-12 rounded-full bg-zinc-900">
              <div className="absolute left-5 top-0.5 h-6 w-6 rounded-full bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-2">
            <div className="h-12 rounded-2xl border border-zinc-200 bg-white px-3 text-[14px] leading-[48px] text-zinc-700">
              오전
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <div className="h-12 rounded-2xl border border-zinc-200 bg-white px-3 text-center text-[14px] leading-[48px] text-zinc-700">
                12
              </div>
              <span className="text-zinc-500">:</span>
              <div className="h-12 rounded-2xl border border-zinc-200 bg-white px-3 text-center text-[14px] leading-[48px] text-zinc-700">
                00
              </div>
            </div>
          </div>
        </section>

        {/* 공개 */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-zinc-900">
              이 습관을 친구에게 공개할까요?
            </h2>

            {/* 디자인용 토글 */}
            <div className="relative h-7 w-12 rounded-full bg-zinc-900">
              <div className="absolute left-5 top-0.5 h-6 w-6 rounded-full bg-white" />
            </div>
          </div>
        </section>
      </main>

      {/* 완료 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
        <div className="mx-auto w-full max-w-[420px] border-t border-zinc-200 px-4 pt-3 pb-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
          <button
            type="button"
            className="h-12 w-full rounded-2xl bg-zinc-200 text-[14px] font-semibold text-zinc-500"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHabit;
