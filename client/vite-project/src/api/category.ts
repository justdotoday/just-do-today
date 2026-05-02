// 유저 카테고리 API
import api from './client';

export interface UserCategoryResponse {
  categoryId: number;
  categoryName: string;
  emoji: string | null;
}

export const getUserCategories = async (): Promise<UserCategoryResponse[]> => {
  const res = await api.get('/api/categories/user');
  return res.data;
};

export const createUserCategory = async (name: string, emoji: string | null): Promise<UserCategoryResponse> => {
  const res = await api.post('/api/categories/user', { name, emoji });
  return res.data;
};
