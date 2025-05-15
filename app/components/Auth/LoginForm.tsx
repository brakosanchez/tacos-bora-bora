'use client';

import React, { useState } from 'react';

interface LoginFormProps {
  onClose: () => void;
  onSuccess: (userType: 'client' | 'staff') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    // For now, just simulate a successful login
    onSuccess('client');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-bora-black/90 p-8 rounded-xl border border-bora-orange/20 w-full max-w-md">
        <h2 className="text-2xl font-bebas text-bora-yellow mb-6">
          {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-bora-white/90 mb-2 font-unbounded text-sm">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bora-black/50 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white/90
                       focus:outline-none focus:border-bora-yellow focus:ring-2 focus:ring-bora-yellow/20"
              required
              autoComplete="username"
            />
          </div>
          
          <div>
            <label className="block text-bora-white/90 mb-2 font-unbounded text-sm">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bora-black/50 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white/90
                       focus:outline-none focus:border-bora-yellow focus:ring-2 focus:ring-bora-yellow/20"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-bora-red to-bora-orange px-6 py-2 rounded-lg
                       font-unbounded text-sm hover:from-bora-orange hover:to-bora-red
                       transition-all duration-300 border border-bora-yellow/20
                       hover:shadow-lg hover:shadow-bora-orange/20"
            >
              {isRegistering ? 'Registrarse' : 'Entrar'}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-bora-black/50 px-6 py-2 rounded-lg font-unbounded text-sm
                       border border-bora-orange/20 hover:border-bora-yellow
                       transition-all duration-300 text-bora-white/90"
            >
              Cancelar
            </button>
          </div>
        </form>

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full text-center text-bora-yellow/80 hover:text-bora-yellow
                   text-sm mt-6 transition-colors"
        >
          {isRegistering 
            ? '¿Ya tienes cuenta? Inicia sesión' 
            : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
