//습관 관련 api
import type { CreateHabitPayload } from '../types/habitType';
import api from './client';

export const createHabit = async (payload: CreateHabitPayload) => {
  const res = await api.post('/habits', payload);
  return res.data;
};
