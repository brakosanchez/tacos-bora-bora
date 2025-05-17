'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, getCurrentUser } from '@/lib/api/auth';
import { getAccessToken, setAccessToken, clearAccessToken } from '@/lib/auth';
import { User, AuthResponse } from '@/types/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setAccessToken: (token: string) => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token válido
    const checkAuth = async () => {
      const token = await getAccessToken();
      if (token !== null) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error al obtener usuario:', error);
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await login(email, password) as AuthResponse | null;
      if (response && response.access_token) {
        await setAccessToken(response.access_token);
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          router.push('/menu');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const response = await register(name, email, password) as AuthResponse | null;
      if (response && response.access_token) {
        await setAccessToken(response.access_token);
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
          router.push('/menu');
        }
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    clearAccessToken();
    setUser(null);
    router.push('/');
  };

  const isAuthenticated = !!user;

  const setAccessToken = async (token: string) => {
    await setAccessToken(token);
  };

  const getCurrentUser = async (): Promise<User | null> => {
    const userData = await getCurrentUser();
    return userData;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      setAccessToken,
      getCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

export default AuthContext;
