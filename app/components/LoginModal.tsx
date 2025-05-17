import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiX } from 'react-icons/fi';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function LoginModal({ isOpen, onClose, onRegister }: { 
  isOpen: boolean; 
  onClose: () => void;
  onRegister: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bora-black/80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bebas text-bora-yellow">Iniciar Sesión</h2>
          <button onClick={onClose} className="text-bora-yellow hover:text-bora-orange">
            <FiX size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-bora-yellow mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>

          <div>
            <label className="block text-bora-yellow mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-bora-yellow text-bora-black hover:bg-bora-orange transition-all duration-300"
          >
            Iniciar Sesión
          </button>

          <div className="flex justify-center mt-4">
            <span className="text-bora-yellow">
              ¿No tienes cuenta?{' '}
              <button
                onClick={onRegister}
                className="text-bora-orange hover:text-bora-yellow"
              >
                Regístrate
              </button>
            </span>
          </div>

          {/* Botón de Google */}
          <button
            onClick={() => {
              signIn('google');
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors mt-4"
          >
            <FaGoogle className="mr-2" />
            Iniciar con Google
          </button>
        </form>
      </div>
    </div>
  );
}
