// 유저 카테고리 API
import api from './client';

export interface UserCategoryResponse {
  categoryId: number;
  categoryName: string;
  emoji: string | null;
}

export interface CategoryManageResponse {
  categoryUserId: number;
  name: string;
  emoji: string | null;
  habitCount: number;
}

export const getUserCategories = async (): Promise<UserCategoryResponse[]> => {
  const res = await api.get('/api/categories/user');
  return res.data;
};

export const getManagedCategories = async (): Promise<CategoryManageResponse[]> => {
  const res = await api.get('/api/categories/manage');
  return res.data;
};

export const createUserCategory = async (name: string, emoji: string | null): Promise<UserCategoryResponse> => {
  const res = await api.post('/api/categories/user', { name, emoji });
  return res.data;
};

export const updateUserCategory = async (id: number, name: string, emoji: string | null): Promise<UserCategoryResponse> => {
  const res = await api.put(`/api/categories/user/${id}`, { name, emoji });
  return res.data;
};

export const deleteUserCategory = async (categoryUserId: number): Promise<void> => {
  await api.delete(`/api/categories/user/${categoryUserId}`);
};
