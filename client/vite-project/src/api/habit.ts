//습관 관련 api
import type { CreateHabitPayload, UpdateHabitPayload, Day, Habit } from '../types/habit.type';
import api from './client';

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
    categoryName: payload.categoryName,
    ...(payload.emoji && { emoji: payload.emoji }),
    frequency: payload.frequency,
    ...(payload.days?.length && {
      days: payload.days.map((d) => DAY_TO_NUMBER[d]),
    }),
    isPublic: payload.isPublic,
    startDate: payload.startDate,
    color: payload.color,
  };
  const res = await api.post(`/api/habits`, body);
  return res.data;
};

// 습관 수정 (PUT /api/habits/:id)
export const updateHabit = async (
  id: string,
  payload: UpdateHabitPayload
) => {
  const body = {
    name: payload.name,
    categoryName: payload.categoryName,
    ...(payload.emoji && { emoji: payload.emoji }),
    frequency: payload.frequency,
    ...(payload.days?.length && {
      days: payload.days.map((d) => DAY_TO_NUMBER[d]),
    }),
    isPublic: payload.isPublic,
    color: payload.color,
  };
  const res = await api.put(`/api/habits/${id}`, body);
  return res.data;
};

// 습관 목록 조회 (명세: GET /api/habits/user/{memberId})
export const getHabits = async (params?: {
  date?: string;
}): Promise<Habit[]> => {
  const res = await api.get(`/api/habits`, { params });
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

// 완료 토글 (명세: POST /api/user-habits/:userHabitId/done)
export const toggleDone = async (userHabitId: number): Promise<void> => {
  await api.post(`/api/user-habits/${userHabitId}/done`);
};

// 프리즈 해제 (POST /api/user-habits/:userHabitId/thaw)
export const thawHabit = async (userHabitId: number): Promise<void> => {
  await api.post(`/api/user-habits/${userHabitId}/thaw`);
};

// 하트 사용 토글 (POST /api/user-habits/:userHabitId/heart)
export const toggleHeart = async (userHabitId: number): Promise<void> => {
  await api.post(`/api/user-habits/${userHabitId}/heart`);
};

export type HeatmapDay = {
  /** 'YYYY-MM-DD' */
  date: string;
  mood: string;
};

export type HeatmapResponse = {
  year: number;
  month: number;
  days: HeatmapDay[];
};

/**
 * 습관 월별 히트맵 조회
 * GET /api/habits/{userHabitId}/heatmap?year=&month=
 * month: 1-indexed
 */
export const getHabitHeatmap = async (
  userHabitId: number,
  year: number,
  month: number
): Promise<HeatmapResponse> => {
  const res = await api.get(`/api/habits/${userHabitId}/heatmap`, {
    params: { year, month },
  });
  return res.data;
};
