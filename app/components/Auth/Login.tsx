'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await signIn('google');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90">
      <div className="bg-black/95 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Iniciar Sesión
        </h2>

        {/* Botón de Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <FaGoogle className="mr-2" />
          Iniciar con Google
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
