// 온보딩 완료 API — 닉네임, 목표, 첫 습관(선택)을 서버에 전송하고 완료 처리
import api from './client';

export interface CompleteOnboardingRequest {
  nickname: string;
  goal: string;
  habit: null;
}

export const completeOnboarding = (data: CompleteOnboardingRequest) =>
  api.post('/api/onBoarding/complete', data);
