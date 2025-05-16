'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import FireTitle from './FireTitle';
import { salsas } from './Menu';

interface MenuSectionProps {
  title: string;
  items: Array<{ id: string; name: string; price: number; description?: string; category: string }>;
  selectedSalsas: string[];
  onAddToCart: (item: any) => void;
  categoryColor?: string;
}

export default function MenuSection({ title, items, selectedSalsas, onAddToCart, categoryColor = 'bora-yellow' }: MenuSectionProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string, category: string) => {
    setSelectedItem(itemId);
    
    const item = items.find(item => item.id === itemId);
    if (item) {
      onAddToCart({
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
            onClick={() => handleItemClick(item.id, item.category)}
            className={`
              bg-bora-black/30 backdrop-blur-sm rounded-lg p-4 md:p-6 border cursor-pointer
              ${selectedItem === item.id ? `border-${categoryColor} ring-2 ring-${categoryColor}` : 'border-bora-orange/20'} 
              hover:border-${categoryColor} transition-all duration-200
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-unbounded text-bora-white text-lg">{item.name}</h4>
              <span className="font-bebas text-xl text-${categoryColor}">${item.price}</span>
            </div>
            {item.description && (
              <p className="text-bora-white/70 text-sm mb-3">{item.description}</p>
            )}
            <div className="mt-2 text-${categoryColor}/80 text-xs">
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
  );
}
