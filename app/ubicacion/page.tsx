'use client';

import Background from '../components/Background';

export default function UbicacionPage() {
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
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
            <h1 className="text-5xl md:text-7xl font-bebas text-bora-yellow text-center mb-12 animate-float">
              Ubicación
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-yeseva text-2xl text-bora-yellow mb-4">Dirección</h2>
                  <p className="text-bora-white/90 mb-2">
                    Calle Alondras #410, Los Aguiluchos
                  </p>
                  <p className="text-bora-white/90 mb-2">
                    Nextlalpan, Estado de México
                  </p>
                  <p className="text-bora-yellow/80 text-sm">
                    A 10 minutos del AIFA
                  </p>
                </div>

                <div>
                  <h2 className="font-yeseva text-2xl text-bora-yellow mb-4">Horario</h2>
                  <p className="text-bora-white/90">Abierto todos los días</p>
                  <p className="text-bora-white/90">9:00 a.m. – 4:00 p.m.</p>
                </div>

                <div>
                  <h2 className="font-yeseva text-2xl text-bora-yellow mb-4">Contacto</h2>
                  <p className="text-bora-white/90">Tel: (55) 1234-5678</p>
                  <p className="text-bora-white/90">WhatsApp: (55) 8765-4321</p>
                </div>
              </div>

              {/* Map */}
              <div className="h-96 bg-bora-black/50 rounded-lg border border-bora-orange/20 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.7!2d-99.0!3d19.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQyJzAwLjAiTiA5OcKwMDAnMDAuMCJX!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
