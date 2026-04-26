// 기록(daily log) API
import api from './client';

export type CreateDailyLogPayload = {
  userHabitId: number;
  logDate: string;
  mood: string;
  note: string;
};

export const createDailyLog = async (payload: CreateDailyLogPayload): Promise<void> => {
  await api.post('/api/daily-logs', payload);
};
