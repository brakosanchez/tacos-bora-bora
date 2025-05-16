'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import FireTitle from './FireTitle';
import MenuSection from './MenuSection';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

const extras = [
  { id: 'e1', name: 'Queso', price: 10, category: 'Extras' },
  { id: 'e2', name: 'Consomé', price: 10, category: 'Extras' },
  { id: 'e3', name: 'Consomé (1 litro)', price: 50, category: 'Extras' },
];

export const salsas = [
  { id: 's1', name: 'Piña', description: 'Salsa de piña fresca con un toque de cilantro' },
  { id: 's2', name: 'Piña con habanero', description: 'Salsa de piña con habanero para los amantes del picante' },
  { id: 's3', name: 'Cebollas moradas', description: 'Cebollas moradas encurtidas con habanero y oregano' },
  { id: 's4', name: 'Nopales', description: 'Nopales tiernos con jitomate y cilantro' },
  { id: 's5', name: 'Salsa verde', description: 'Salsa de tomate verde, chile serrano, cebolla y cilantro' },
  { id: 's6', name: 'Salsa roja', description: 'Salsa de tomate, chile de árbol, cebolla y ajo' },
  { id: 's7', name: 'Salsa de habanero', description: 'Nuestra salsa más picante, solo para valientes' },
  { id: 's8', name: 'Chimichurri', description: 'Salsa argentina de perejil, ajo, vinagre y aceite de oliva' }
];

const salsasVenta = [
  { id: 'sv1', name: 'Salsa Verde (4oz)', description: 'Salsa de tomate verde, chile serrano, cebolla y cilantro', price: 25, category: 'Salsas' },
  { id: 'sv2', name: 'Salsa Roja (4oz)', description: 'Salsa de tomate, chile de árbol, cebolla y ajo', price: 25, category: 'Salsas' },
  { id: 'sv3', name: 'Salsa de Habanero (4oz)', description: 'Nuestra salsa más picante, solo para valientes', price: 25, category: 'Salsas' },
  { id: 'sv4', name: 'Chimichurri (4oz)', description: 'Salsa argentina de perejil, ajo, vinagre y aceite de oliva', price: 25, category: 'Salsas' },
];

const menuItems = [
  { id: 't1', name: 'Bistec', price: 30, category: 'Tacos', description: 'Jugosa carne de res marinada' },
  { id: 't2', name: 'Longaniza', price: 30, category: 'Tacos', description: 'Auténtica longaniza artesanal' },
  { id: 't3', name: 'Pollo', price: 30, category: 'Tacos', description: 'Pollo marinado a la plancha' },
  { id: 't4', name: 'Aguja Norteña', price: 30, category: 'Tacos', description: 'Corte especial de res' },
  { id: 't5', name: 'Campechano', price: 30, category: 'Tacos', description: 'Combinación de longaniza con bistec o pollo' },
  { id: 't6', name: 'Mixiote', price: 30, category: 'Tacos', description: 'Tradicional mixiote de res' },
  { id: 'e1', name: 'Cecina', price: 35, category: 'Especialidades', description: 'Fina cecina de res' },
  { id: 'e2', name: 'Arrachera', price: 35, category: 'Especialidades', description: 'Corte premium de arrachera' },
  { id: 'e3', name: 'Kilo de Mixiote', price: 330, category: 'Especialidades', description: 'Mixiote de res para toda la familia' },
];

const drinks = [
  { id: 'd1', name: 'Coca Cola', price: 20, category: 'Refrescos' },
  { id: 'd2', name: 'Sprite', price: 20, category: 'Refrescos' },
  { id: 'd3', name: 'Fanta', price: 20, category: 'Refrescos' },
  { id: 'd4', name: 'Delaware Punch', price: 20, category: 'Refrescos' },
  { id: 'd5', name: 'Boing Mango', price: 20, category: 'Refrescos' },
  { id: 'd6', name: 'Boing Guayaba', price: 20, category: 'Refrescos' },
  { id: 'd7', name: 'Mundet Manzana', price: 20, category: 'Refrescos' },
  { id: 'd8', name: 'Topo Chico', price: 25, category: 'Agua Mineral' },
];

export default function Menu() {
  const { addToCart } = useCart();
  const [selectedSalsas, setSelectedSalsas] = useState<string[]>([]);
  
  const handleAddToCart = (item: any) => {
    addToCart(item);
  };
  
  const toggleSalsa = (salsaId: string) => {
    setSelectedSalsas(prev => 
      prev.includes(salsaId)
        ? prev.filter(id => id !== salsaId)
        : [...prev, salsaId]
    );
  };
  
  return (
    <section className="flex flex-col justify-center items-center min-h-screen gap-6 md:gap-8">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Salsas para acompañar */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <FireTitle text="Salsas para tu Pedido" isHovered={false} />
          </div>
          <div className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-8 border border-bora-orange/20">
            <p className="text-bora-white/70 text-sm mb-4 font-unbounded">Selecciona las salsas que deseas para tus tacos:</p>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {salsas.map((salsa) => (
                <button
                  key={salsa.id}
                  onClick={() => toggleSalsa(salsa.id)}
                  className={`
                    text-sm px-4 py-2 rounded-full border 
                    transition-all duration-300 ease-in-out
                    ${selectedSalsas.includes(salsa.id) 
                      ? 'bg-gradient-to-r from-red-600/40 via-orange-600/40 to-yellow-600/40 text-bora-white border-bora-orange shadow-lg shadow-orange-500/20' 
                      : 'bg-bora-black/40 text-bora-white/70 border-bora-orange/20 hover:border-bora-orange/50 hover:bg-bora-orange/20'}
                    ${selectedSalsas.includes(salsa.id) && 'animate-pulse'}
                  `}
                >
                  {salsa.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tacos Section */}
        <MenuSection
          title="Tacos"
          items={menuItems.filter(item => item.category === 'Tacos')}
          selectedSalsas={selectedSalsas}
          onAddToCart={handleAddToCart}
        />

        {/* Especialidades Section */}
        <MenuSection
          title="Especialidades"
          items={menuItems.filter(item => item.category === 'Especialidades')}
          selectedSalsas={selectedSalsas}
          onAddToCart={handleAddToCart}
          categoryColor="cyan-400"
        />

        {/* Extras Section */}
        <MenuSection
          title="Extras"
          items={extras}
          selectedSalsas={selectedSalsas}
          onAddToCart={handleAddToCart}
        />

        {/* Refrescos Section */}
        <MenuSection
          title="Refrescos"
          items={drinks}
          selectedSalsas={selectedSalsas}
          onAddToCart={handleAddToCart}
        />

        {/* Salsas Section */}
        <MenuSection
          title="Salsas"
          items={salsasVenta}
          selectedSalsas={selectedSalsas}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
}
