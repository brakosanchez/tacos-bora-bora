'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import FireTitle from './FireTitle';
import { salsas } from './Menu';

interface ProductImages {
  [key: string]: string;
}

// Mapeo de nombres específicos a sus imágenes
const productImages: ProductImages = {
  // Bebidas
  'Topo Chico': 'topo100',
  'Coca Cola': 'coca100',
  'Boing Mango': 'boing100',
  'Boing Guayaba': 'boing100',
  'Mundet Manzana': 'mundet100',
  'Fanta': 'fanta100',
  'Sprite': 'sprite100',
  'Delaware Punch': 'dela100',

  // Tacos
  'Bistec': 'bistec100',
  'Longaniza': 'longaniza100',
  'Pollo': 'pollo100',
  'Aguja Norteña': 'aguja100',
  'Campechano': 'campebistec100',
  'Mixiote': 'mixiote100',

  // Especialidades
  'Cecina': 'cecina100',
  'Arrachera': 'arrachera100',
  'Kilo de Mixiote': 'mixiotekilo100',

  // Extras
  'Queso': 'queso100',
  'Consomé': 'consome100',
  'Consomé (1 litro)': 'litro100',

  // Salsas de venta
  'Salsa Verde (4oz)': 'salsaverde4oz',
  'Salsa Roja (4oz)': 'salsaroja4oz',
  'Salsa de Habanero (4oz)': 'salsadehabanero4oz',
  'Chimichurri (4oz)': 'chimichurri4oz'
};

interface MenuSectionProps {
  title: string;
  items: Array<{ id: string; name: string; price: number; description?: string; category: string; image?: string }>;
  onAddToCart: (item: any) => void;
  categoryColor?: string;
  isSalsaRestricted?: boolean;
}

export default function MenuSection({ title, items, onAddToCart, categoryColor = 'orange-500', isSalsaRestricted = false }: MenuSectionProps) {
  const isDrinksSection = title.toLowerCase().includes('refrescos') || title.toLowerCase().includes('bebidas');
  const isSalsasSection = title.toLowerCase().includes('salsas');
  const isTacosSection = title.toLowerCase().includes('tacos');
  const isEspecialidadesSection = title.toLowerCase().includes('especialidades');
  
  const getColor = () => categoryColor || 'orange-500';
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string, category: string, item: any) => {
    setSelectedItem(itemId);
    
    // Si es una salsa y hay restricción, limitar la selección
    if (category === 'Salsas' && isSalsaRestricted) {
      toast.error('Solo se permiten hasta 3 salsas para pedidos menores a $150 y de 5 tacos o menos');
      return;
    }
    
    // Agregar el item al carrito
    const salsasToAdd = item.name === 'Kilo de Mixiote' 
      ? salsas
          .filter(salsa => salsa.id !== 's7' && salsa.id !== 's8') // Excluye salsa de habanero (s7) y chimichurri (s8)
          .map(salsa => salsa.name)
      : []; // Ahora guardamos los nombres en lugar de los IDs
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      category: item.category,
      salsas: salsasToAdd
    });
    
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <FireTitle text={title} isHovered={false} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleItemClick(item.id, item.category, item)}
            className={`
              bg-bora-black/30 backdrop-blur-sm rounded-lg p-4 md:p-6 border cursor-pointer
              ${selectedItem === item.id ? (isDrinksSection ? 'border-lime-500 ring-4 ring-lime-500 ring-offset-4 ring-offset-lime-500/10' : 'border-orange-500 ring-4 ring-orange-500 ring-offset-4 ring-offset-orange-500/10') : 'border-bora-orange/20'} 
              hover:border-${isDrinksSection ? 'lime-500' : 'orange-500'} hover:ring-4 hover:ring-${isDrinksSection ? 'lime-500' : 'orange-500'} hover:ring-offset-4 ring-offset-${isDrinksSection ? 'lime-500' : 'orange-500'}/10 transition-all duration-300 ease-in-out
              hover:shadow-${isDrinksSection ? 'lime-500' : 'orange-500'}/10
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <img 
                  src={
                    item.image 
                      ? `/images/productos/${item.image}.png`
                      : '/images/productos/aguja100.png'
                  }
                  alt={item.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/productos/aguja100.png';
                  }}
                />
                <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
              </div>
              <span className="font-bebas text-xl text-${isDrinksSection ? 'lime-500' : 'orange-500'}">${item.price}</span>
            </div>
            {item.description && (
              <p className="text-bora-white/70 text-sm mb-3">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
