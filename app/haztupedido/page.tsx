'use client';

import { useState } from 'react';
import Menu from '../components/Menu';
import Background from '../components/Background';
import FireTitle from '../components/FireTitle';

export default function HazTuPedidoPage() {
  const [isSalsaRestricted, setIsSalsaRestricted] = useState(false);

  return (
    <main className="min-h-screen bg-bora-black">
      <div className="relative pt-20">
        {/* Título con efecto de fuego */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <FireTitle text="Haz tu Pedido" />
        </div>
        
        {/* Background */}
        <Background />
        
        {/* Menu */}
        <Menu isSalsaRestricted={isSalsaRestricted} />
      </div>
    </main>
  );
}
