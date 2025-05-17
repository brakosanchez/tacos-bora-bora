import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiX } from 'react-icons/fi';
import { register } from '@/lib/api/users';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onLogin }: RegisterModalProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

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
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-black/95 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-lg border border-bora-orange/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bebas text-bora-yellow">Crear Cuenta</h2>
          <button onClick={onClose} className="text-bora-yellow hover:text-bora-orange">
            <FiX size={24} />
          </button>
        </div>

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
                <div className="w-full border-t border-bora-orange" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bora-black/80 text-bora-yellow">o</span>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-bora-yellow hover:text-bora-orange mb-4"
            >
              ← Volver
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-bora-yellow mb-2">Nombre Completo</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black/80 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
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
                  className="w-full p-2 rounded-lg bg-black/80 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
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
                  className="w-full p-2 rounded-lg bg-black/80 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
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
                  className="w-full p-2 rounded-lg bg-black/80 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
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
                  className="w-full p-2 rounded-lg bg-black/80 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
                  required
                />
              </div>
              <div>
                <label className="block text-bora-yellow mb-2">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-black/80 border-b-2 border-bora-orange text-white focus:outline-none focus:border-bora-yellow"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bora-yellow text-bora-black py-2 px-4 rounded-lg hover:bg-bora-orange transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
