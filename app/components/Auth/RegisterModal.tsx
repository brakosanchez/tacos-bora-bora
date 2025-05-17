'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { register } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(formData.name, formData.email, formData.password, formData.phone, formData.address);
      onClose();
      router.push('/menu');
    } catch (err) {
      setError('Error al registrarse');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center pt-0 pb-4 px-4 z-50">
      <div className="bg-black/95 backdrop-blur-lg rounded-2xl p-6 max-w-sm w-full h-[60vh] flex flex-col border border-bora-orange/20 shadow-lg">
        <h2 className="text-2xl font-bebas text-bora-yellow mb-4 text-center">Registrarse</h2>
        <div className="flex-grow">
          {!showForm ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-bora-yellow text-bora-black py-3 px-4 rounded-lg hover:bg-bora-orange transition-colors"
              >
                Crear cuenta
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">o</span>
                </div>
              </div>
              <button
                onClick={() => signIn('google')}
                className="w-full bg-black/80 border border-bora-orange rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-black/90 transition-colors"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                Continuar con Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 overflow-y-auto">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-bora-yellow hover:text-bora-orange mb-4"
              >
                ← Volver
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bora-yellow mb-1">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bora-yellow mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
                    required
                    placeholder="(55) XXX XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bora-yellow mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bora-yellow mb-1">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
                    required
                    placeholder="Calle, número, colonia, CP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bora-yellow mb-1">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bora-yellow mb-1">Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 bg-black/80 border-b-2 border-bora-orange rounded-lg focus:outline-none focus:border-bora-yellow"
                    required
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center bg-red-500/10 rounded-lg p-2">{error}</p>}
              <button
                type="submit"
                className="w-full bg-bora-yellow text-bora-black py-1.5 px-3 rounded-lg hover:bg-bora-orange transition-colors"
              >
                Registrarse
              </button>
            </form>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-bora-yellow">
            ¿Ya tienes una cuenta?{' '}
            <button
              onClick={onLogin}
              className="text-bora-yellow hover:text-bora-orange"
            >
              Iniciar sesión
            </button>
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top--2 right-4 text-bora-yellow hover:text-bora-orange"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
