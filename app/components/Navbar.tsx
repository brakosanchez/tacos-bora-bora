'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cookies } from 'next/headers';

function Navbar() {
  const router = useRouter();
  const isLoggedIn = typeof document !== 'undefined' ? document.cookie.includes('isLoggedIn=true') : false;

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.replace('/');
  };

  return (
    <nav className="bg-gradient-to-r from-black/95 to-black/90 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-bora-yellow font-bebas text-2xl hover:text-yellow-500 transition-colors tracking-wider"
          >
            Tacos Bora Bora
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/menu" 
              className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
            >
              Menú
            </Link>
            <Link 
              href="/ordenar" 
              className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
            >
              Ordenar
            </Link>
            <Link 
              href="/ubicacion" 
              className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
            >
              Ubicación
            </Link>
            <Link 
              href="/contacto" 
              className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
            >
              Contacto
            </Link>
            {isLoggedIn && (
              <>
                <Link 
                  href="/admin/dashboard" 
                  className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/inventario" 
                  className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
                >
                  Inventario
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm font-unbounded"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
            {!isLoggedIn && (
              <Link
                href="/login"
                className="text-gray-300 hover:text-yellow-500 transition-colors text-sm font-unbounded"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
