// 습관 폼 공통 스타일 상수 — 온보딩 기준으로 통일

const BASE_BTN =
  'h-[48px] w-full rounded-[20px] text-[16px] font-medium transition-all active:scale-[0.98] flex items-center justify-center';
const FREQ_BASE =
  'h-11 w-full rounded-full border text-[12px] leading-[20px] font-medium transition active:scale-[0.98]';
const DAY_BASE =
  'h-[45px] w-[45px] rounded-full border text-[12px] leading-[18px] font-medium flex items-center justify-center transition';

export const HABIT_FORM_STYLES = {
  freqActive: `${FREQ_BASE} bg-[#EFF6FF] border-[#A5B4FC] text-[#2E68EF]`,
  freqInactive: `${FREQ_BASE} bg-white border-zinc-200 text-zinc-900`,
  dayActive: `${DAY_BASE} bg-[#EFF6FF] border-[#A5B4FC] text-[#2E68EF]`,
  dayInactive: `${DAY_BASE} bg-white border-zinc-200 text-zinc-900`,
  filledBtn: `${BASE_BTN} bg-[#2E68EF] text-white`,
  outlineBtn: `${BASE_BTN} border-[1.5px] border-[#2E68EF] text-[#2E68EF] bg-white`,
} as const;

export const DAYS_FIRST_ROW = ['월', '화', '수', '목'] as const;
export const DAYS_SECOND_ROW = ['금', '토', '일'] as const;
