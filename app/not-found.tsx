'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bora-black">
      <div className="bg-bora-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-bora-orange/20 text-center">
        <h2 className="text-2xl font-bebas text-bora-yellow mb-4">
          404 - Página no encontrada
        </h2>
        <p className="text-bora-white/90 mb-6">
          La página que buscas no existe o ha sido movida
        </p>
        <Link
          href="/"
          className="font-unbounded bg-gradient-to-r from-bora-red to-bora-orange 
                   px-6 py-2 rounded-lg text-sm hover:from-bora-orange hover:to-bora-red
                   transition-all duration-300 border border-bora-yellow/20
                   hover:shadow-lg hover:shadow-bora-orange/20 inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
