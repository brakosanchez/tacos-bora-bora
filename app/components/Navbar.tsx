'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const isLoggedIn = typeof document !== 'undefined' ? document.cookie.includes('isLoggedIn=true') : false;

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.replace('/');
  };

  return (
    <nav className="bg-gradient-to-r from-black/95 to-black/90 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="flex items-center gap-2"
          >
            <img 
              src="/images/Logo.png" 
              alt="Tacos Bora Bora" 
              className="h-8 w-auto md:hidden"
            />
            <span className="hidden md:block text-bora-yellow font-bebas text-2xl hover:text-yellow-500 transition-colors tracking-wider">
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
            {isLoggedIn && (
              <>
                <Link 
                  href="/admin/dashboard" 
                  className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/inventario" 
                  className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
                >
                  Inventario
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-500 transition-colors text-base font-unbounded px-3"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
            {!isLoggedIn && (
              <Link
                href="/login"
                className="text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-3"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

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
              {isLoggedIn && (
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
                  <Link 
                    href="/inventario" 
                    className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-lg font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/inventario');
                    }}
                  >
                    Inventario
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-gray-300 hover:text-red-500 transition-colors text-base font-unbounded px-3 py-2"
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="block w-full text-gray-300 hover:text-yellow-500 transition-colors text-base font-unbounded px-4 py-3 rounded-lg hover:bg-black/80"
                onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
