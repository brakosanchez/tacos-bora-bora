'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { salsas } from './Menu';
import { toast } from 'react-hot-toast';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (deliveryType: 'domicilio' | 'sucursal') => void;
  totalPrice: number;
}

export default function OrderReviewModal({ isOpen, onClose, onConfirm, totalPrice }: OrderReviewModalProps) {
  const { items } = useCart();
  const [selectedSalsas, setSelectedSalsas] = useState<string[]>(() => {
    // Si hay un kilo de mixiote en el carrito, preseleccionar las salsas correspondientes
    const hasKiloMixiote = items.some(item => item.name === 'Kilo de Mixiote');
    if (hasKiloMixiote) {
      // Filtrar las salsas a excluir (habanero y chimichurri)
      return salsas
        .filter(salsa => salsa.id !== 's7' && salsa.id !== 's8')
        .map(salsa => salsa.id);
    }
    return [];
  });

  // Verificar si hay salsas en el carrito
  const hasSalsas = items.some(item => item.category === 'Salsas');
  // Verificar si hay tacos en el carrito
  const hasTacos = items.some(item => item.category === 'Tacos');
  // Contar el número de tacos
  const tacoCount = items.filter(item => item.category === 'Tacos').reduce((total, item) => total + item.quantity, 0);

  const toggleSalsa = (salsaId: string) => {
    // Si hay menos de 5 tacos, limitar a 3 salsas
    if (tacoCount <= 5 && selectedSalsas.length >= 3) {
      toast.error('Solo puedes seleccionar hasta 3 salsas para pedidos de 5 tacos o menos');
      return;
    }

    // Actualizar las salsas seleccionadas
    setSelectedSalsas(prev => 
      prev.includes(salsaId)
        ? prev.filter(id => id !== salsaId)
        : [...prev, salsaId]
    );

    // Actualizar las salsas en todos los items de tacos
    items.forEach(item => {
      if (item.category === 'Tacos') {
        const newSalsas = selectedSalsas.map(id => {
          const salsa = salsas.find(s => s.id === id);
          return salsa ? salsa.name : '';
        }).filter(Boolean);
        item.salsas = newSalsas;
      }
    });
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-black/95 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-bora-orange/20 shadow-lg">
          <h2 className="text-2xl font-bebas text-bora-yellow text-center mb-6">Selecciona tus Salsas</h2>

          {/* Salsas */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {salsas.map((salsa) => (
                <button
                  key={salsa.id}
                  onClick={() => toggleSalsa(salsa.id)}
                  className={`
                    text-sm px-4 py-2 rounded-full border 
                    transition-all duration-300 ease-in-out
                    ${selectedSalsas.includes(salsa.id) 
                      ? 'bg-gradient-to-r from-orange-600/60 via-orange-500/60 to-orange-400/60 text-bora-white border-orange-500 shadow-lg shadow-orange-500/30' 
                      : 'bg-bora-black/40 text-bora-white/70 border-bora-orange/20 hover:border-orange-500/50 hover:bg-orange-500/20'}
                    ${selectedSalsas.includes(salsa.id) && 'animate-pulse'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {selectedSalsas.includes(salsa.id) && (
                      <span className="text-bora-red text-lg">✓</span>
                    )}
                    {salsa.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-bora-orange/50 text-bora-black rounded-lg hover:bg-bora-orange/70 transition-all duration-300"
            >
              Cancelar
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Verificar si el total es suficiente para domicilio
                  if (totalPrice < 150) {
                    toast.error('Para pedidos a domicilio se requiere un mínimo de $150');
                    return;
                  }
                  // Actualizar las salsas en todos los items
                  items.forEach(item => {
                    if (item.category === 'Tacos') {
                      const newSalsas = selectedSalsas.map(id => {
                        const salsa = salsas.find(s => s.id === id);
                        return salsa ? salsa.name : '';
                      }).filter(Boolean);
                      item.salsas = newSalsas;
                    }
                  });
                  onConfirm('domicilio');
                }}
                className="px-6 py-3 bg-bora-orange/70 text-bora-black rounded-lg hover:bg-bora-orange/90 transition-all duration-300"
              >
                A Domicilio
              </button>
              <button
                onClick={() => {
                  // Actualizar las salsas en todos los items
                  items.forEach(item => {
                    if (item.category === 'Tacos') {
                      const newSalsas = selectedSalsas.map(id => {
                        const salsa = salsas.find(s => s.id === id);
                        return salsa ? salsa.name : '';
                      }).filter(Boolean);
                      item.salsas = newSalsas;
                    }
                  });
                  onConfirm('sucursal');
                }}
                className="px-6 py-3 bg-bora-orange/70 text-bora-black rounded-lg hover:bg-bora-orange/90 transition-all duration-300"
              >
                Recoger en Sucursal
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
}
