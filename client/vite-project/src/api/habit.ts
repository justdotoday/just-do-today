//습관 관련 api (명세: POST /api/habits)
import type { CreateHabitPayload, Day, Habit } from '../types/habitType';
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

//습관 생성 (명세: POST /api/habits)
export const createHabit = async (payload: CreateHabitPayload) => {
  const body = {
    name: payload.name,
    category: payload.category,
    frequency: payload.frequency,
    ...(payload.days?.length && {
      days: payload.days.map((d) => DAY_TO_NUMBER[d]),
    }),
    isPublic: payload.isPublic,
    startDate: payload.startDate,
  };
  const res = await api.post('/api/habits', body);
  return res.data;
};

//습관 목록 조회 (명세: GET /api/habits)
export const getHabits = async (): Promise<Habit[]> => {
  const res = await api.get('api/habits');
  return Array.isArray(res.data) ? res.data : [];
};
