'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import FireTitle from './FireTitle';
import MenuSection from './MenuSection';
import Cart from './Cart';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

interface MenuSectionProps {
  title: string;
  items: Array<{ id: string; name: string; price: number; description?: string; category: string; image?: string }>;
  selectedSalsas: string[];
  onAddToCart: (item: any) => void;
  categoryColor?: string;
  isSalsaRestricted?: boolean;
}

const extras = [
  { id: 'e1', name: 'Queso', price: 10, category: 'Extras', image: 'queso100' },
  { id: 'e2', name: 'Consomé', price: 10, category: 'Extras', image: 'consome100' },
  { id: 'e3', name: 'Consomé (1 litro)', price: 50, category: 'Extras', image: 'litro100' },
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

const productImages: { [key: string]: string } = {
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
  'Campechano de Pollo': 'campepollo100',
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

const menuItems = [
  { id: 't1', name: 'Bistec', price: 30, category: 'Tacos', description: 'Jugosa carne de res marinada', image: productImages['Bistec'] },
  { id: 't2', name: 'Longaniza', price: 30, category: 'Tacos', description: 'Auténtica longaniza artesanal', image: productImages['Longaniza'] },
  { id: 't3', name: 'Pollo', price: 30, category: 'Tacos', description: 'Pollo marinado a la plancha', image: productImages['Pollo'] },
  { id: 't4', name: 'Aguja Norteña', price: 30, category: 'Tacos', description: 'Corte especial de res', image: productImages['Aguja Norteña'] },
  { id: 't5', name: 'Campechano de Res', price: 30, category: 'Tacos', description: 'Combinación de longaniza con bistec', image: productImages['Campechano'] },
  { id: 't7', name: 'Campechano de Pollo', price: 30, category: 'Tacos', description: 'Combinación de longaniza con pollo', image: productImages['Campechano de Pollo'] },
  { id: 't6', name: 'Mixiote', price: 30, category: 'Tacos', description: 'Tradicional mixiote de res', image: productImages['Mixiote'] },
  { id: 'e1', name: 'Cecina', price: 35, category: 'Especialidades', description: 'Fina cecina de res', image: productImages['Cecina'] },
  { id: 'e2', name: 'Arrachera', price: 35, category: 'Especialidades', description: 'Corte premium de arrachera', image: productImages['Arrachera'] },
  { id: 'e3', name: 'Kilo de Mixiote', price: 330, category: 'Especialidades', description: 'Mixiote de res para toda la familia', image: productImages['Kilo de Mixiote'] },
];

const drinks = [
  { id: 'd1', name: 'Coca Cola', price: 20, category: 'Refrescos', image: productImages['Coca Cola'] },
  { id: 'd2', name: 'Sprite', price: 20, category: 'Refrescos', image: productImages['Sprite'] },
  { id: 'd3', name: 'Fanta', price: 20, category: 'Refrescos', image: productImages['Fanta'] },
  { id: 'd4', name: 'Delaware Punch', price: 20, category: 'Refrescos', image: productImages['Delaware Punch'] },
  { id: 'd5', name: 'Boing Mango', price: 20, category: 'Refrescos', image: productImages['Boing Mango'] },
  { id: 'd6', name: 'Boing Guayaba', price: 20, category: 'Refrescos', image: productImages['Boing Guayaba'] },
  { id: 'd7', name: 'Mundet Manzana', price: 20, category: 'Refrescos', image: productImages['Mundet Manzana'] },
  { id: 'd8', name: 'Topo Chico', price: 25, category: 'Agua Mineral', image: productImages['Topo Chico'] }
];

export default function Menu({ isSalsaRestricted }: { isSalsaRestricted: boolean }) {
  const { addToCart, items, totalItems, totalPrice } = useCart();
  const [selectedSalsas, setSelectedSalsas] = useState<string[]>([]);
  
  const handleAddToCart = (item: any) => {
    addToCart(item);
  };
  
  const toggleSalsa = (salsaId: string) => {
    setSelectedSalsas(prev => 
      prev.includes(salsaId)
        ? prev.filter((id: string) => id !== salsaId)
        : [...prev, salsaId]
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      {/* Menu Sections */}
      <div>

        
        {/* Tacos Section */}
        <MenuSection
          title="Tacos"
          items={menuItems.filter(item => item.category === 'Tacos')}
          onAddToCart={handleAddToCart}
          categoryColor="orange-500"
        />

        {/* Especialidades Section */}
        <MenuSection
          title="Especialidades"
          items={menuItems.filter(item => item.category === 'Especialidades')}
          onAddToCart={handleAddToCart}
          categoryColor="orange-500"
        />

        {/* Extras Section */}
        <MenuSection
          title="Extras"
          items={extras}
          onAddToCart={handleAddToCart}
          categoryColor="orange-500"
        />

        {/* Refrescos Section */}
        <MenuSection
          title="Refrescos"
          items={drinks}
          onAddToCart={handleAddToCart}
          categoryColor="green-500"
        />

        {/* Salsas Section */}
        <MenuSection
          title="Salsas"
          items={salsasVenta}
          onAddToCart={handleAddToCart}
          categoryColor="red-500"
          isSalsaRestricted={isSalsaRestricted}
        />
      </div>

      {/* Cart */}
      <div className="mt-8">
        <Cart />
      </div>
    </div>
  );
}
