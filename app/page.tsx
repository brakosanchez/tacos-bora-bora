'use client';

import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Background from './components/Background';
import OrderButton from './components/OrderButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-bora-orange/20 via-transparent to-bora-brown/40"></div>
          <Background />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/images/palm-overlay.png')] bg-contain bg-right-top opacity-30 animate-sway"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="bg-bora-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-bora-orange/20">
            <div className="flex flex-col items-center mb-6">
              <img
                src="/images/Logo.png"
                alt="Tacos Bora Bora Logo"
                className="w-32 md:w-40 h-auto mb-4 animate-float hover:animate-flame cursor-pointer transition-transform duration-300 hover:scale-110"
              />
              <h1 className="font-bebas text-7xl md:text-9xl tracking-wider relative group">
                <span className="absolute inset-0 text-transparent bg-gradient-to-r from-bora-yellow via-bora-red to-bora-orange bg-clip-text blur-sm animate-shimmer bg-[length:200%_auto] select-none">
                  Ven a la isla del sabor
                </span>
                <span className="relative text-bora-yellow animate-float">
                  Ven a la isla del sabor
                </span>
              </h1>
            </div>
            <p className="font-yeseva text-2xl md:text-4xl mb-8 text-transparent bg-gradient-to-r from-bora-orange via-bora-yellow to-bora-red bg-clip-text animate-float">
              No te quedes con el antojo
            </p>
            <OrderButton scrollToMenu={true} />
          </div>
        </div>

        {/* Water effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 
                      bg-gradient-to-t from-bora-orange/50 via-bora-yellow/30 to-transparent 
                      animate-water"></div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="relative bg-gradient-to-b from-bora-brown to-bora-black">
        <Menu />
      </section>

      {/* Contact Section */}
      <section id="contacto" className="relative bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bebas text-white text-center mb-12">
            Encuéntranos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Our Story */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
              <h3 className="font-yeseva text-2xl text-bora-yellow mb-4">Nuestra Historia</h3>
              <p className="text-bora-white/90 mb-4">
                Desde agosto del 2021, con el apoyo incondicional de nuestra familia, dimos vida a este sueño. Inspirados por nuestro amor a la naturaleza y compromiso con la calidad, creamos un espacio único donde cada taco es una experiencia tropical.
              </p>
            </div>

            {/* Location Info */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="font-yeseva text-2xl text-cyan-400 mb-4">Ubicación</h3>
              <p className="text-bora-white/90 mb-4">Calle Alondras #410, Los Aguiluchos, Nextlalpan, Estado de México</p>
              <p className="text-bora-yellow/80 text-sm mb-4">A 10 minutos del AIFA</p>
              <h3 className="font-yeseva text-2xl text-bora-yellow mb-4 mt-8">Horario</h3>
              <p className="text-bora-white/90">Abierto todos los días</p>
              <p className="text-bora-white/90">9:00 a.m. – 4:00 p.m.</p>
            </div>
            {/* Social Media */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="font-yeseva text-2xl text-cyan-400 mb-4">Síguenos</h3>
              <div className="space-y-4">
                <a href="https://instagram.com/tacosborabora" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center text-white/80 hover:text-cyan-400 transition-colors">
                  <span className="text-xl mr-2">📸</span> @tacosborabora
                </a>
                <a href="https://facebook.com/tacosborabora" target="_blank" rel="noopener noreferrer"
                   className="flex items-center text-white/80 hover:text-cyan-400 transition-colors">
                  <span className="text-xl mr-2">👍</span> /tacosborabora
                </a>
                <a href="https://tiktok.com/@tacosborabora" target="_blank" rel="noopener noreferrer"
                   className="flex items-center text-white/80 hover:text-cyan-400 transition-colors">
                  <span className="text-xl mr-2">🎵</span> @tacosborabora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
