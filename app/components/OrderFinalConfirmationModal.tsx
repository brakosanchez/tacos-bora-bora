'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';

interface OrderFinalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deliveryData?: {
    name: string;
    phone: string;
    address?: string;
    time?: string;
  };
  isLowValueOrder?: boolean;
  tacoCount?: number;
}

export default function OrderFinalConfirmationModal({ isOpen, onClose, onConfirm, deliveryData, isLowValueOrder, tacoCount }: OrderFinalConfirmationModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const hasOnlySalsas = items.every(item => item.category === 'Salsas');
  const [paymentMethod, setPaymentMethod] = React.useState('efectivo');

  const paymentOptions = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'tarjeta', label: 'Tarjeta de Crédito/Débito' },
    { value: 'criptomonedas', label: 'Criptomonedas (BTC, ETH, USDT)' }
  ];

  const handleConfirmOrder = () => {
    // Aquí iría la lógica para enviar el pedido
    toast.success('¡Pedido realizado con éxito!');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
      <div className="bg-bora-black/30 backdrop-blur-sm rounded-2xl border border-bora-orange/20 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-bora-black/30 backdrop-blur-sm rounded-2xl border border-bora-orange/20 max-w-2xl w-full">
          <div className="flex justify-between items-center border-b border-bora-orange/20">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-bora-white/80 hover:text-bora-white transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-2xl font-bebas text-bora-orange">Resumen del Pedido</h2>
            <button
              onClick={onClose}
              className="text-bora-white/80 hover:text-bora-white transition-all duration-300"
            >
              X
            </button>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-bebas text-bora-yellow text-center mb-6">Confirmar Pedido</h2>

            {/* Lista de productos */}
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-unbounded text-bora-white/80">{item.name} x{item.quantity}</span>
                  <span className="font-bebas text-bora-yellow">${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-bora-white/80 font-unbounded">Total:</span>
                  <span className="font-bebas text-bora-yellow text-xl">${totalPrice}</span>
                </div>
                {isLowValueOrder && tacoCount && tacoCount <= 5 && (
                  <div className="bg-bora-black/40 p-4 rounded-lg">
                    <p className="text-bora-white/80 text-sm">
                      Para pedidos menores a $150 y de 5 tacos o menos, solo se permiten hasta 3 salsas
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Datos de entrega */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bebas text-bora-orange mb-4">Datos de entrega</h3>
              <div className="flex flex-col gap-4">
                {deliveryData && (
                  <div className="flex justify-between items-center">
                    <span className="text-bora-white/80 font-unbounded">Nombre</span>
                    <span className="font-bebas text-bora-orange">{deliveryData.name}</span>
                  </div>
                )}
                {deliveryData && (
                  <div className="flex justify-between items-center">
                    <span className="text-bora-white/80 font-unbounded">Teléfono</span>
                    <span className="font-bebas text-bora-orange">{deliveryData.phone}</span>
                  </div>
                )}
                {deliveryData?.address && (
                  <div className="flex justify-between items-center">
                    <span className="text-bora-white/80 font-unbounded">Dirección</span>
                    <span className="font-bebas text-bora-orange">{deliveryData.address}</span>
                  </div>
                )}
                {deliveryData?.time && (
                  <div className="flex justify-between items-center">
                    <span className="text-bora-white/80 font-unbounded">Hora de entrega</span>
                    <span className="font-bebas text-bora-orange">{deliveryData.time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Método de pago */}
            <div className="mb-6">
              <h3 className="font-unbounded text-bora-white/80 mb-2">Método de Pago</h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-bora-black/40 rounded-lg p-4 text-bora-white/80 border border-bora-orange/20"
              >
                {paymentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-bora-black/40 rounded-lg text-bora-white/80 hover:bg-bora-black/50 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmOrder}
                className="w-full px-6 py-3 bg-bora-orange text-bora-black rounded-lg hover:bg-bora-orange/90 transition-all duration-300"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
