import { api } from './client';

export const login = async (email: string, password: string) => {
  return api.post<{ access_token: string }>(`/auth/login/access-token`, {
    username: email,
    password,
  });
};

export const getCurrentUser = async () => {
  return api.get('/auth/test-token');
};
