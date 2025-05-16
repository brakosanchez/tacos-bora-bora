'use client';

import Menu from './components/Menu';
import Background from './components/Background';
import OrderButton from './components/OrderButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-bora-black">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center overflow-hidden pt-32 pb-32">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-bora-orange/20 via-transparent to-bora-brown/40"></div>
          <Background />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('/images/palm-overlay.png')] bg-contain bg-right-top opacity-30 animate-sway"></div>
        
        {/* Content */}
        <div className="relative z-20 text-center text-white px-12 mb-16">
          <div className="bg-bora-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-bora-orange/20 animate-float">
             <div className="flex flex-col items-center mb-6">
               <div 
                 className="w-48 h-48 mb-8 hover:animate-flame cursor-pointer transition-transform duration-300 hover:scale-110 bg-contain bg-center bg-no-repeat priority bg-[url('/images/logoSolo.png')] md:bg-[url('/images/Logo.png')] md:w-[256px] md:h-[256px]"
                 role="img"
                 aria-label="Tacos Bora Bora Logo"
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
            <OrderButton />
          </div>
        </div>

        {/* Water effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 
                      bg-gradient-to-t from-bora-orange/50 via-bora-yellow/30 to-transparent 
                      animate-water"></div>
      </div>

      {/* Front Image Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-bora-black/30 backdrop-blur-sm"></div>
        <img 
          src="/images/frente borabora.jpg" 
          alt="Fachada de Tacos Bora Bora"
          className="w-full h-[60vh] object-cover object-center
            transition-all duration-2000
            hover:scale-110 hover:rotate-6
            hover:translate-y-[-10px]
            hover:shadow-[0_20px_40px_rgba(255,165,0,0.3)]
            hover:opacity-90
          "
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bebas text-bora-yellow text-center z-10 animate-float">
            Bienvenidos a Tacos Bora Bora
          </h2>
        </div>
      </div>

      {/* Contact Section */}
      
      <div className="min-h-[calc(100vh-8rem)]">
        {/* Taco Showcase */}
        <section id="tacos" className="relative bg-gradient-to-b from-bora-brown to-bora-black pt-8 pb-8 mt-0">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bebas text-white text-center mb-12">
              <span className="relative z-10 hover:text-bora-yellow transition-all duration-300" style={{
                animation: 'float 2s ease-in-out infinite',
              }}>Nuestros Tacos</span>
            </h2>
            <div className="flex justify-center items-center space-x-8">
              {[
                { 
                  src: '/images/bistec.png', 
                  alt: 'Taco de Bistec',
                  name: 'Bistec'
                },
                { 
                  src: '/images/longaniza .png', 
                  alt: 'Taco de Longaniza',
                  name: 'Longaniza'
                },
                { 
                  src: '/images/pollo.png', 
                  alt: 'Taco de Pollo',
                  name: 'Pollo'
                }
              ].map((taco, index) => (
                <div 
                  key={index} 
                  className="transform transition-all duration-500 hover:scale-110 hover:rotate-6 
                    hover:drop-shadow-[0_0_20px_rgba(255,165,0,0.7)] animate-float"
                >
                  <img 
                    src={taco.src} 
                    alt={taco.alt}
                    className="w-48 md:w-64 h-48 md:h-64 object-contain"
                    title={taco.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section id="contacto" className="relative bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bebas text-white text-center mb-12">
            Encuéntranos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Our Story */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8">
              <h3 className="font-bebas text-2xl text-bora-yellow mb-4">Nuestra Historia</h3>
              <p className="font-unbounded text-bora-white/90 mb-4">
                Desde agosto del 2021, con el apoyo incondicional de nuestra familia, dimos vida a este sueño. Inspirados por nuestro amor a la naturaleza y compromiso con la calidad, creamos un espacio único donde cada taco es una experiencia tropical.
              </p>
            </div>

            {/* Location Info */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="font-bebas text-2xl text-cyan-400 mb-4">Ubicación</h3>
              <p className="font-unbounded text-bora-white/90 mb-4">Calle Alondras #410, Los Aguiluchos, Nextlalpan, Estado de México</p>
              <p className="font-unbounded text-bora-yellow/80 text-sm mb-4">A 10 minutos del AIFA</p>
              <h3 className="font-bebas text-2xl text-bora-yellow mb-4 mt-8">Horario</h3>
              <p className="font-unbounded text-bora-white/90">Abierto todos los días</p>
              <p className="font-unbounded text-bora-white/90">9:00 a.m. – 4:00 p.m.</p>
            </div>
            {/* Social Media */}
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="font-bebas text-2xl text-cyan-400 mb-4">Síguenos</h3>
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
