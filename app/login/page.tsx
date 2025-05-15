'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Background from '../components/Background';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Credenciales predefinidas
    const ADMIN_CREDENTIALS = [
      { email: 'admin@tacoborabora.com', password: 'TacosBora2024!' },
      { email: 'admin@tacosborabora.com', password: 'admin123' }
    ];

    const validCredentials = ADMIN_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    try {
      console.log('Login attempt:', { email, validCredentials: !!validCredentials });

      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 500));

      if (validCredentials) {
        // Establecer cookie de manera más explícita
        document.cookie = 'isLoggedIn=true; path=/; max-age=3600; SameSite=Strict';
        
        // Usar replace en lugar de push para reemplazar la entrada del historial
        router.replace('/admin/dashboard');
      } else {
        setError('Credenciales inválidas');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error de inicio de sesión');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bora-black relative">
      <Background />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-bora-orange/20">
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/Logo.png" 
              alt="Tacos Bora Bora Logo" 
              width={150} 
              height={150}
              className="animate-float"
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-bora-yellow">
            Panel de Administración
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-bora-white">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-black/20 border border-bora-orange/30 rounded-md text-bora-white focus:outline-none focus:ring-2 focus:ring-bora-orange"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-bora-white">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-black/20 border border-bora-orange/30 rounded-md text-bora-white focus:outline-none focus:ring-2 focus:ring-bora-orange"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-2 px-4 font-semibold rounded-md transition-colors
                ${isLoading 
                  ? 'bg-bora-orange/50 text-white/70 cursor-not-allowed' 
                  : 'bg-bora-orange text-white hover:bg-bora-yellow'}
              `}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
