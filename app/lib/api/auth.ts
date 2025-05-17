import { api } from './client';
import { AuthResponse, User } from '@/types/api';

export const login = async (email: string, password: string): Promise<AuthResponse | null> => {
  try {
    const response = await api.post<AuthResponse>(`/auth/login/access-token`, {
      username: email,
      password,
    });
    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null;
  }
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse | null> => {
  try {
    const response = await api.post<AuthResponse>(`/auth/register`, {
      name,
      email,
      password,
      passwordConfirm: password
    });
    return response;
  } catch (error) {
    console.error('Error al registrarse:', error);
    return null;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>(`/users/me`);
    return response;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
};
