'use client';

import Menu from '../components/Menu';
import Cart from '../components/Cart';

export default function OrdenarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bora-black to-bora-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bebas text-bora-yellow text-center mb-12">Haz tu Pedido</h1>
        <p className="text-bora-white/80 text-center mb-12">Elige tus tacos favoritos</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Menu />
          </div>
          <div className="lg:sticky lg:top-24 h-fit">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
