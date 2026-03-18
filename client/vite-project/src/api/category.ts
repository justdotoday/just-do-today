// 유저 카테고리 API
import api from './client';

export interface UserCategoryResponse {
  id: number;
  name: string;
  emoji: string | null;
}

export const createUserCategory = async (name: string, emoji: string | null): Promise<UserCategoryResponse> => {
  const res = await api.post('/api/categories/user', { name, emoji });
  return res.data;
};
