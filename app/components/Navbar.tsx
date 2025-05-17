'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    router.replace('/');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-black/95 to-black/90 fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              href="/" 
              className="flex items-center gap-2"
            >
              <img 
                src="/images/logoSolo.png" 
                alt="Tacos Bora Bora" 
                className="h-8 w-auto"
              />
              <span className="text-bora-yellow font-bebas text-2xl hover:text-yellow-500 transition-colors tracking-wider">
                Tacos Bora Bora
              </span>
            </Link>

            {/* Botón de menú hamburguesa para móviles */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-yellow-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Menú para pantallas grandes */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/products" 
                className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
              >
                Productos
              </Link>
              <Link 
                href="/haztupedido" 
                className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
              >
                Haz tu Pedido
              </Link>
              <Link 
                href="/contacto" 
                className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
              >
                Contacto
              </Link>
              <Link 
                href="/feedback" 
                className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
              >
                Feedback
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/admin/dashboard" 
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-black/95 shadow-lg fixed inset-x-0 top-20`}>
        <div className="p-4 space-y-4">
          <Link 
            href="/products" 
            className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
            onClick={() => {
              setIsOpen(false);
              router.push('/products');
            }}
          >
            Productos
          </Link>
          <Link 
            href="/haztupedido" 
            className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
            onClick={() => {
              setIsOpen(false);
              router.push('/haztupedido');
            }}
          >
            Haz tu Pedido
          </Link>
          <Link 
            href="/contacto" 
            className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
            onClick={() => {
              setIsOpen(false);
              router.push('/contacto');
            }}
          >
            Contacto
          </Link>
          <Link 
            href="/feedback" 
            className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
            onClick={() => {
              setIsOpen(false);
              router.push('/feedback');
            }}
          >
            Feedback
          </Link>
          {isAuthenticated ? (
            <>
              <Link 
                href="/admin/dashboard" 
                className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/admin/dashboard');
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block text-gray-300 hover:text-red-500 transition-colors text-base font-unbounded px-3 py-2"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLoginOpen(true);
                }}
                className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsRegisterOpen(true);
                }}
                className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modales de Login y Register */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Navbar;
