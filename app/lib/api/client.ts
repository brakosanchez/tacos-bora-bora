import { API_URL } from './config';
import { ApiResponse } from '@/types/api';

// Función auxiliar para manejar las respuestas de la API
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  if (typeof data === 'object' && data !== null) {
    return data as T;
  }
  throw new Error('Respuesta no válida del servidor');
};

export const api = {
  get: async <T>(endpoint: string, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
    return handleApiResponse(response);
  },

  post: async <T>(endpoint: string, data: any = null, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
    return handleApiResponse(response);
  },

  put: async <T>(endpoint: string, data: any = null, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
    return handleApiResponse(response);
  },

  delete: async <T>(endpoint: string, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
    return handleApiResponse(response);
  },
};
