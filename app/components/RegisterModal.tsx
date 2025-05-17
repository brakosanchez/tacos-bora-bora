import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiX } from 'react-icons/fi';
import { register } from '@/lib/api/users';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

export default function RegisterModal({ isOpen, onClose, onLogin }: { 
  isOpen: boolean; 
  onClose: () => void;
  onLogin: () => void;
}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
      onClose();
      onLogin(); // Abrir modal de login después del registro
    } catch (err) {
      setError('Error al registrar el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pt-32">
      <div className="bg-bora-black/80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bebas text-bora-yellow">Crear Cuenta</h2>
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
            <label className="block text-bora-yellow mb-2">Nombre Completo</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>

          <div>
            <label className="block text-bora-yellow mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>

          <div>
            <label className="block text-bora-yellow mb-2">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
              placeholder="(55) XXX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-bora-yellow mb-2">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
              placeholder="Calle, número, colonia, CP"
            />
          </div>

          <div>
            <label className="block text-bora-yellow mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-bora-black/50 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-bora-yellow hover:bg-bora-orange text-black font-semibold py-3 px-4 rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </button>

          <div className="flex justify-center mt-4">
            <span className="text-bora-yellow">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={onLogin}
                className="text-bora-orange hover:text-bora-yellow"
              >
                Inicia Sesión
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
            Registrarse con Google
          </button>
        </form>
      </div>
    </div>
  );
}
