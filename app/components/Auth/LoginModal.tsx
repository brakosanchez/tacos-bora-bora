'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegister }) => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
      router.push('/menu');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-black/95 backdrop-blur-lg rounded-2xl p-6 max-w-sm w-full border border-bora-orange/20 shadow-lg">
        <h2 className="text-2xl font-bebas text-bora-yellow mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-bora-yellow mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bora-yellow mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center bg-red-500/10 rounded-lg p-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-bora-yellow text-bora-black py-2 px-4 rounded-lg hover:bg-bora-orange transition-colors"
          >
            Iniciar Sesión
          </button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/80 text-bora-yellow">o</span>
            </div>
          </div>
          <button
            onClick={() => signIn('google')}
            className="w-full bg-black/80 border border-bora-orange rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-black/90 transition-colors"
          >
            <FaGoogle className="w-5 h-5 text-red-500" />
            Continuar con Google
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-bora-yellow">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onRegister}
              className="text-bora-yellow hover:text-bora-orange"
            >
              Regístrate
            </button>
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-bora-yellow hover:text-bora-orange"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
