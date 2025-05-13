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
