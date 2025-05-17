'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { LoginModal } from './Auth/LoginModal';
import { RegisterModal } from './Auth/RegisterModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="relative">
      <nav className="bg-gradient-to-r from-black/95 to-black/90 fixed w-full z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div className="flex-1 flex justify-center items-center">
              <Link href="/" className="flex items-center gap-2">
                <img src="/images/logoSolo.png" alt="Tacos Bora Bora" className="h-12 w-12 object-contain" />
                <span className="text-bora-yellow font-bebas text-2xl hover:text-yellow-500 transition-colors tracking-wider">
                  Tacos Bora Bora
                </span>
              </Link>
            </div>

            {/* Botón de menú hamburguesa */}
            <div className="flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-yellow-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="fixed inset-x-0 top-24 bg-black/95 shadow-lg z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="space-y-1">
                <Link 
                  href="/products" 
                  className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                  onClick={() => setIsOpen(false)}
                >
                  Productos
                </Link>
                <Link 
                  href="/haztupedido" 
                  className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                  onClick={() => setIsOpen(false)}
                >
                  Haz tu Pedido
                </Link>
                <Link 
                  href="/contacto" 
                  className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
                <Link 
                  href="/feedback" 
                  className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                  onClick={() => setIsOpen(false)}
                >
                  Feedback
                </Link>
                {session ? (
                  <>
                    <Link 
                      href="/admin/dashboard" 
                      className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-gray-300 hover:text-red-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80 w-full text-left"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsOpen(false);
                      }}
                      className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => {
                        setIsRegisterOpen(true);
                        setIsOpen(false);
                      }}
                      className="block text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modales */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onRegister={() => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
      }} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onLogin={() => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
      }} />
    </div>
  );
};

export default Navbar;
