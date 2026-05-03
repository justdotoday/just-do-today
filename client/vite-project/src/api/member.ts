import api from './client';

export type TodayStatus = {
  heart: number;
  freeze: number;
};

export const getTodayStatus = async (): Promise<TodayStatus> => {
  const res = await api.get('/api/members/todaystatus');
  return res.data;
};
