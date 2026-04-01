// 온보딩 완료 API — 닉네임, 목표, 첫 습관(선택)을 서버에 전송하고 완료 처리
import api from './client';
import type { Day } from '../types/habitType';

export interface OnboardingHabitPayload {
  name: string;
  categoryId?: number;
  userCategoryId?: number;
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

export const completeOnboarding = (data: CompleteOnboardingRequest) =>
  api.post('/api/onboarding/complete', data);
