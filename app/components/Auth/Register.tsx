'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await signIn('google');
    } catch (err) {
      setError('Error al iniciar sesión con Google');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        action: 'register'
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirigir al usuario a la página principal después del registro
        window.location.href = '/';
      }
    } catch (err) {
      setError('Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90">
      <div className="bg-black/95 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
          Registrarse
        </h2>

        {/* Botón de Google */}
        <button
          onClick={() => {
            signIn('google');
          }}
          className="w-full bg-bora-orange hover:bg-bora-yellow text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors mt-4"
        >
          <FaGoogle className="mr-2" />
          Registrarse con Google
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
