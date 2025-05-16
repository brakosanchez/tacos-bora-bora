import { api } from './client';

export const submitFeedback = async (category: string, rating: number, comment: string) => {
  return api.post('/feedback', {
    category,
    rating,
    comment,
  });
};

export const getFeedbackStats = async () => {
  return api.get('/feedback/stats');
};
