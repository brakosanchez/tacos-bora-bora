'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from './Auth/LoginForm';

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState<'client' | 'staff' | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Menú', href: '/menu' },
    { name: 'Ubicación', href: '/ubicacion' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-bora-black/95 via-bora-black/80 to-bora-black/95 backdrop-blur-md border-b border-bora-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/Logo.png"
                alt="Tacos Bora Bora Logo"
                className="h-10 w-auto transition-transform duration-300 hover:scale-110 hover:animate-flame"
              />
              <span className="font-bebas text-2xl text-transparent bg-gradient-to-r from-bora-yellow via-bora-orange to-bora-red bg-clip-text hover:animate-shimmer bg-[length:200%_auto]">
                TACOS BORA BORA
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-unbounded text-bora-white/80 hover:text-bora-yellow px-3 py-2 rounded-md text-sm transition-all duration-300 hover:animate-heat-wave hover:scale-110"
                >
                  {item.name}
                </Link>
              ))}
              {userType ? (
                <button
                  onClick={() => setUserType(null)}
                  className="font-unbounded text-bora-white/80 hover:text-bora-yellow px-3 py-2 rounded-md text-sm
                           transition-all duration-300 hover:animate-heat-wave hover:scale-110"
                >
                  Cerrar sesión
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="font-unbounded bg-gradient-to-r from-bora-red to-bora-orange px-4 py-2 rounded-lg
                           text-sm hover:from-bora-orange hover:to-bora-red transition-all duration-300
                           border border-bora-yellow/20 hover:animate-heat-wave"
                >
                  Iniciar sesión
                </button>
              )}
            </div>

            {showLogin && (
              <LoginForm
                onClose={() => setShowLogin(false)}
                onSuccess={(type) => {
                  setUserType(type);
                  setShowLogin(false);
                }}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-bora-white hover:text-bora-yellow focus:outline-none"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-bora-black/80 backdrop-blur-md border-t border-bora-orange/20">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-unbounded text-bora-white/80 hover:text-bora-yellow block px-3 py-2 rounded-md text-base transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
