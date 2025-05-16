'use client';

import Menu from '../../components/Menu';
import Background from '../../components/Background';
import Cart from '../../components/Cart';

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-bora-black">
      <div className="relative pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-bora-orange/20 via-transparent to-bora-brown/40"></div>
          <Background />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl md:text-7xl font-bebas text-bora-yellow text-center mb-12 animate-float">
            Nuestro Menú
          </h1>
          
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
    </main>
  );
}
