'use client';

import { useState } from 'react';

interface MenuItem {
  name: string;
  price: number;
  category: string;
  description?: string;
  extras?: Array<{
    name: string;
    price: number;
  }>;
}

const extras = [
  { name: 'Queso', price: 10, category: 'Extras' },
  { name: 'Consomé', price: 10, category: 'Extras' },
  { name: 'Consomé (1 litro)', price: 50, category: 'Extras' },
];

const salsas = [
  'Piña',
  'Piña con habanero',
  'Cebollas moradas',
  'Nopales',
  'Salsa verde',
  'Salsa roja',
  'Salsa de habanero',
  'Chimichurri'
];

const menuItems: MenuItem[] = [
  { name: 'Bistec', price: 30, category: 'Tacos', description: 'Jugosa carne de res marinada' },
  { name: 'Longaniza', price: 30, category: 'Tacos', description: 'Auténtica longaniza artesanal' },
  { name: 'Pollo', price: 30, category: 'Tacos', description: 'Pollo marinado a la plancha' },
  { name: 'Aguja Norteña', price: 30, category: 'Tacos', description: 'Corte especial de res' },
  { name: 'Campechano', price: 30, category: 'Tacos', description: 'Combinación de longaniza con bistec o pollo' },
  { name: 'Mixiote', price: 30, category: 'Tacos', description: 'Tradicional mixiote de res' },
  { name: 'Cecina', price: 35, category: 'Especialidades', description: 'Fina cecina de res' },
  { name: 'Arrachera', price: 35, category: 'Especialidades', description: 'Corte premium de arrachera' },
  { name: 'Kilo de Mixiote', price: 330, category: 'Especialidades', description: 'Mixiote de res para toda la familia' },
];

const drinks = [
  { name: 'Coca Cola', price: 20, category: 'Refrescos' },
  { name: 'Sprite', price: 20, category: 'Refrescos' },
  { name: 'Fanta', price: 20, category: 'Refrescos' },
  { name: 'Delaware Punch', price: 20, category: 'Refrescos' },
  { name: 'Boing Mango', price: 20, category: 'Refrescos' },
  { name: 'Boing Guayaba', price: 20, category: 'Refrescos' },
  { name: 'Mundet Manzana', price: 20, category: 'Refrescos' },
  { name: 'Topo Chico', price: 25, category: 'Agua Mineral' },
];

export default function Menu() {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (extraName: string) => {
    setSelectedExtras((prev: string[]) => 
      prev.includes(extraName) 
        ? prev.filter((name: string) => name !== extraName)
        : [...prev, extraName]
    );
  }
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bebas text-bora-yellow text-center mb-12 animate-float">¿De qué vas a echar taquito?</h1>
        
        {/* Tacos Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Tacos</h3>
          <div className="mb-6 bg-bora-black/30 backdrop-blur-sm rounded-lg p-4 border border-bora-orange/20">
            <p className="text-bora-white/70 text-sm mb-2">Todas nuestras salsas hechas en casa:</p>
            <div className="flex flex-wrap gap-2">
              {salsas.map((salsa) => (
                <span key={salsa} className="text-bora-yellow/90 text-sm bg-bora-black/30 px-2 py-1 rounded-full border border-bora-orange/20">
                  {salsa}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(item => item.category === 'Tacos').map((item) => (
              <div key={item.name} className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border border-bora-orange/20 hover:border-bora-yellow transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-bora-yellow">${item.price}</span>
                </div>
                {item.description && (
                  <p className="text-bora-white/70 text-sm mb-2">{item.description}</p>
                )}
                <button
                  key={item.name}
                  onClick={() => toggleExtra(item.name)}
                  className={`
                    relative overflow-hidden
                    bg-bora-orange/20 text-bora-white p-2 rounded-lg text-sm
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105 hover:bg-bora-orange/40
                    active:scale-95 active:bg-bora-orange/60
                    ${selectedExtras.includes(item.name) ? 'ring-2 ring-bora-yellow' : ''}
                    group
                  `}
                >
                  <span className="relative z-10">{item.name} (+${item.price})</span>
                  <span className="absolute inset-0 bg-bora-orange/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Especialidades Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-red mb-6">Especialidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(item => item.category === 'Especialidades').map((item) => (
              <div key={item.name} className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-cyan-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="font-unbounded text-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-cyan-400">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extras Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Extras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extras.map((item) => (
              <div key={item.name} className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border border-bora-orange/20 hover:border-bora-yellow transition-all duration-300 hover:scale-105 hover:animate-heat-wave group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-bora-yellow group-hover:animate-pulse-warm">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bebidas Section */}
        <div>
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Bebidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinks.map((item) => (
              <div key={item.name} className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-cyan-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="font-unbounded text-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-cyan-400">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón de ordenar eliminado */}
    </section>
  );
}
