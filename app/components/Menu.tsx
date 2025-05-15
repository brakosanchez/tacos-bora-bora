'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

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

const salsas = [
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // Efecto de brillo temporal al seleccionar un producto
  const handleItemClick = (itemId: string, category: string) => {
    // Establece el item seleccionado para mostrar el efecto de brillo
    setSelectedItem(itemId);
    
    // Agrega el item al carrito con las salsas seleccionadas
    const item = [...menuItems, ...extras, ...drinks, ...salsasVenta].find(item => item.id === itemId);
    if (item) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        category: item.category,
        salsas: category === 'Salsas' ? [] : selectedSalsas.map(id => {
          const salsa = salsas.find(s => s.id === id);
          return salsa ? salsa.name : '';
        }).filter(Boolean)
      });
    }
    
    // Elimina el efecto de brillo después de un breve momento
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  };
  
  const toggleSalsa = (salsaId: string) => {
    setSelectedSalsas(prev => 
      prev.includes(salsaId)
        ? prev.filter(id => id !== salsaId)
        : [...prev, salsaId]
    );
  };
  
  return (
    <section>
      <div>
        <h2 className="text-4xl font-bebas text-bora-yellow text-center mb-16">¡Haz tu pedido ahora!</h2>
        
        {/* Salsas para acompañar */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Salsas para tu Pedido</h3>
          <div className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border border-bora-orange/20">
            <p className="text-bora-white/70 text-sm mb-4 font-unbounded">Selecciona las salsas que deseas para tus tacos:</p>
            <div className="flex flex-wrap gap-3">
              {salsas.map((salsa) => (
                <button
                  key={salsa.id}
                  onClick={() => toggleSalsa(salsa.id)}
                  className={`
                    text-sm px-3 py-1.5 rounded-full border 
                    transition-all duration-200 ease-in-out
                    ${selectedSalsas.includes(salsa.id) 
                      ? 'bg-bora-orange/40 text-bora-white border-bora-orange' 
                      : 'bg-bora-black/40 text-bora-white/70 border-bora-orange/20 hover:border-bora-orange/50'}
                  `}
                >
                  {salsa.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tacos Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Tacos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(item => item.category === 'Tacos').map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleItemClick(item.id, item.category)}
                className={`
                  bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border cursor-pointer
                  ${selectedItem === item.id ? 'border-bora-yellow ring-2 ring-bora-yellow' : 'border-bora-orange/20'} 
                  hover:border-bora-yellow transition-all duration-200
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-bora-yellow">${item.price}</span>
                </div>
                {item.description && (
                  <p className="text-bora-white/70 text-sm mb-3">{item.description}</p>
                )}
                <div className="mt-2 text-bora-orange/80 text-xs">
                  {selectedSalsas.length > 0 ? (
                    <p>Con: {selectedSalsas.map(id => {
                      const salsa = salsas.find(s => s.id === id);
                      return salsa ? salsa.name : '';
                    }).join(', ')}</p>
                  ) : (
                    <p>Haz clic para agregar al pedido</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Especialidades Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-red mb-6">Especialidades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.filter(item => item.category === 'Especialidades').map((item) => (
              <div 
                key={item.id}
                onClick={() => handleItemClick(item.id, item.category)}
                className={`
                  bg-black/30 backdrop-blur-sm rounded-lg p-6 border cursor-pointer
                  ${selectedItem === item.id ? 'border-cyan-400 ring-2 ring-cyan-400' : 'border-white/10'} 
                  hover:border-cyan-500/50 transition-all duration-200
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-unbounded text-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-cyan-400">${item.price}</span>
                </div>
                {item.description && (
                  <p className="text-white/70 text-sm mb-3 font-unbounded">{item.description}</p>
                )}
                <div className="mt-2 text-cyan-400/80 text-xs">
                  {selectedSalsas.length > 0 ? (
                    <p>Con: {selectedSalsas.map(id => {
                      const salsa = salsas.find(s => s.id === id);
                      return salsa ? salsa.name : '';
                    }).join(', ')}</p>
                  ) : (
                    <p>Haz clic para agregar al pedido</p>
                  )}
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
              <div 
                key={item.id}
                onClick={() => handleItemClick(item.id, item.category)}
                className={`
                  bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border cursor-pointer
                  ${selectedItem === item.id ? 'border-bora-yellow ring-2 ring-bora-yellow' : 'border-bora-orange/20'} 
                  hover:border-bora-yellow transition-all duration-200
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-bora-yellow">${item.price}</span>
                </div>
                <div className="mt-2 text-bora-orange/80 text-xs">
                  <p>Haz clic para agregar al pedido</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bebidas Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Bebidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinks.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleItemClick(item.id, item.category)}
                className={`
                  bg-black/30 backdrop-blur-sm rounded-lg p-6 border cursor-pointer
                  ${selectedItem === item.id ? 'border-cyan-400 ring-2 ring-cyan-400' : 'border-white/10'} 
                  hover:border-cyan-500/50 transition-all duration-200
                `}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-unbounded text-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-cyan-400">${item.price}</span>
                </div>
                <div className="mt-2 text-cyan-400/80 text-xs">
                  <p className="font-unbounded">Haz clic para agregar al pedido</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Salsas para venta */}
        <div>
          <h3 className="text-3xl font-yeseva text-bora-orange mb-6 hover:animate-pulse-warm cursor-default">Salsas para Llevar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salsasVenta.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleItemClick(item.id, item.category)}
                className={`
                  bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border cursor-pointer
                  ${selectedItem === item.id ? 'border-bora-yellow ring-2 ring-bora-yellow' : 'border-bora-orange/20'} 
                  hover:border-bora-yellow transition-all duration-200
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
                  <span className="font-bebas text-xl text-bora-yellow">${item.price}</span>
                </div>
                {item.description && (
                  <p className="text-bora-white/70 text-sm mb-3 font-unbounded">{item.description}</p>
                )}
                <div className="mt-2 text-bora-orange/80 text-xs">
                  <p className="font-unbounded">Haz clic para agregar al pedido</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
