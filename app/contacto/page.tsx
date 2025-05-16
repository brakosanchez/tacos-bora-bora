'use client';

import { useState } from 'react';
import Background from '../components/Background';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar envío de formulario
    console.log('Formulario enviado:', formData);
    // Resetear formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10 max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bebas text-bora-yellow text-center mb-12 animate-float">
              Contáctanos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-bebas text-2xl text-bora-yellow mb-4">Ubicación</h2>
                  <p className="font-unbounded text-bora-white/90 mb-2">
                    Calle Alondras #410, Los Aguiluchos
                  </p>
                  <p className="font-unbounded text-bora-white/90 mb-2">
                    Nextlalpan, Estado de México
                  </p>
                  <p className="font-unbounded text-bora-yellow/80 text-sm">
                    A 10 minutos del AIFA
                  </p>
                </div>

                <div>
                  <h2 className="font-bebas text-2xl text-bora-yellow mb-4">Horario</h2>
                  <p className="font-unbounded text-bora-white/90">Abierto todos los días</p>
                  <p className="font-unbounded text-bora-white/90">9:00 a.m. – 4:00 p.m.</p>
                </div>

                <div>
                  <h2 className="font-bebas text-2xl text-bora-yellow mb-4">Contacto</h2>
                  <p className="font-unbounded text-bora-white/90">Tel: (55) 1234-5678</p>
                  <p className="font-unbounded text-bora-white/90">WhatsApp: (55) 8765-4321</p>
                </div>
              </div>

              {/* Map */}
              <div className="bg-black/30 p-4 rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d394.7681360228939!2d-99.09330376256538!3d19.725877189312776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d18dfc827df46b%3A0x82a71a9b70d60acc!2sTacos%20Bora%20Bora!5e0!3m2!1ses-419!2smx!4v1697594400000!5m2!1ses-419!2smx"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>

            <h2 className="text-3xl font-bebas text-bora-yellow text-center mb-8">Escríbenos</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-bora-white/90 mb-2 font-unbounded text-sm">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-bora-black/50 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white/90
                           focus:outline-none focus:border-bora-yellow focus:ring-2 focus:ring-bora-yellow/20"
                  required
                />
              </div>

              <div>
                <label className="block text-bora-white/90 mb-2 font-unbounded text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bora-black/50 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white/90
                           focus:outline-none focus:border-bora-yellow focus:ring-2 focus:ring-bora-yellow/20"
                  required
                />
              </div>

              <div>
                <label className="block text-bora-white/90 mb-2 font-unbounded text-sm">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-bora-black/50 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white/90
                           focus:outline-none focus:border-bora-yellow focus:ring-2 focus:ring-bora-yellow/20"
                />
              </div>

              <div>
                <label className="block text-bora-white/90 mb-2 font-unbounded text-sm">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-bora-black/50 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white/90
                           focus:outline-none focus:border-bora-yellow focus:ring-2 focus:ring-bora-yellow/20"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-bora-red to-bora-orange px-6 py-3 rounded-lg
                         font-unbounded text-lg hover:from-bora-orange hover:to-bora-red
                         transition-all duration-300 border border-bora-yellow/20
                         hover:shadow-lg hover:shadow-bora-orange/20"
              >
                Enviar Mensaje
              </button>
            </form>

            <div className="mt-12 text-center">
              <h2 className="font-yeseva text-2xl text-bora-yellow mb-4">Redes Sociales</h2>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-bora-white/90 hover:text-bora-yellow transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-bora-white/90 hover:text-bora-yellow transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-bora-white/90 hover:text-bora-yellow transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
