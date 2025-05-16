import { API_URL } from './config';
import { getAccessToken } from '../auth';

export const api = {
  get: async <T>(endpoint: string, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAccessToken() ? { Authorization: `Bearer ${await getAccessToken()}` } : {}),
      },
      ...config,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  },

  post: async <T>(endpoint: string, data: any = null, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAccessToken() ? { Authorization: `Bearer ${await getAccessToken()}` } : {}),
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  },

  put: async <T>(endpoint: string, data: any = null, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAccessToken() ? { Authorization: `Bearer ${await getAccessToken()}` } : {}),
      },
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  },

  delete: async <T>(endpoint: string, config = {}): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(await getAccessToken() ? { Authorization: `Bearer ${await getAccessToken()}` } : {}),
      },
      ...config,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  },
};
