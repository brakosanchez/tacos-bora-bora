import { api } from './client';

export const getMenuItems = async () => {
  return api.get('/menu');
};

export const getMenuItemsByCategory = async (category: string) => {
  return api.get(`/menu?category=${category}`);
};
