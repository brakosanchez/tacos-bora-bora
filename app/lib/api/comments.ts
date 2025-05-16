import { api } from './client';

export const createComment = async (menuItemId: number, content: string, rating: number) => {
  return api.post('/comments', {
    menu_item_id: menuItemId,
    content,
    rating,
  });
};

export const getCommentsForMenuItem = async (menuItemId: number) => {
  return api.get(`/comments?menu_item_id=${menuItemId}`);
};
