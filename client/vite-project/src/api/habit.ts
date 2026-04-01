//습관 관련 api
// TODO: JWT에 memberId 클레임 추가되면 하드코딩 제거 필요
import type { CreateHabitPayload, Day, Habit } from '../types/habitType';
import api from './client';

const TEMP_MEMBER_ID = 1;

const DAY_TO_NUMBER: Record<Day, number> = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6,
};

//습관 생성 (명세: POST /api/habits/{memberId})
export const createHabit = async (payload: CreateHabitPayload) => {
  const body = {
    name: payload.name,
    ...(payload.categoryId != null && { categoryId: payload.categoryId }),
    ...(payload.userCategoryId != null && {
      userCategoryId: payload.userCategoryId,
    }),
    frequency: payload.frequency,
    ...(payload.days?.length && {
      days: payload.days.map((d) => DAY_TO_NUMBER[d]),
    }),
    isPublic: payload.isPublic,
    startDate: payload.startDate,
    color: payload.color,
  };
  const res = await api.post(`/api/habits/${TEMP_MEMBER_ID}`, body);
  return res.data;
};

// 습관 목록 조회 (명세: GET /api/habits/user/{memberId})
export const getHabits = async (params?: {
  date?: string;
}): Promise<Habit[]> => {
  const res = await api.get(`/api/habits/user/${TEMP_MEMBER_ID}`, { params });
  console.log('getHabits', res.data);
  return Array.isArray(res.data) ? res.data : [];
};

//습관 삭제 (명세: DELETE /api/habits/:id)
export const deleteHabit = async (id: string): Promise<void> => {
  await api.delete(`/api/habits/${id}`);
};

// 얼음(프리즈) 사용 (명세: POST /api/user-habits/:userHabitId/freeze?postponeDays=N)
export const freezeHabit = async (
  userHabitId: number,
  postponeDays: number
): Promise<void> => {
  await api.post(`/api/user-habits/${userHabitId}/freeze`, null, {
    params: { postponeDays },
  });
};
