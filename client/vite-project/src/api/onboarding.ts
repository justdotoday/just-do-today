// 온보딩 완료 API — 닉네임, 목표, 첫 습관(선택)을 서버에 전송하고 완료 처리
import api from './client';
import type { Day } from '../types/habit.type';

const DAY_TO_NUMBER: Record<Day, number> = {
  MON: 0, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5, SUN: 6,
};

export interface OnboardingHabitPayload {
  name: string;
  categoryName: string;
  emoji?: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';
  days?: Day[];
  isPublic: boolean;
  color: string;
  startDate: string;
}

export interface CompleteOnboardingRequest {
  nickname: string;
  goal: string;
  habit: OnboardingHabitPayload | null;
}

export const completeOnboarding = (data: CompleteOnboardingRequest) => {
  const body = {
    ...data,
    habit: data.habit
      ? { ...data.habit, days: data.habit.days?.map((d) => DAY_TO_NUMBER[d]) }
      : null,
  };
  return api.post('/api/onboarding/complete', body);
};
