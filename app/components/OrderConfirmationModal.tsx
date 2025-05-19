'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Geolocation } from '../types';
import { toast } from 'react-hot-toast';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryAddress: string;
  showLocationButton?: boolean;
  isReviewingOrder?: boolean;
}

export default function OrderConfirmationModal({ isOpen, onClose, deliveryAddress, showLocationButton = true, isReviewingOrder = false }: OrderConfirmationModalProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'not_requested'>('not_requested');
  const [userLocation, setUserLocation] = useState<Geolocation | null>(null);

  // Solo inicializar la geolocalización si no estamos revisando el pedido
  useEffect(() => {
    if (!isReviewingOrder) {
      // Inicializar geolocalización solo cuando sea necesario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationPermission('granted');
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          () => {
            setLocationPermission('denied');
          }
        );
      }
    }
  }, [isReviewingOrder]);

  const paymentOptions = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'tarjeta', label: 'Tarjeta' },
    { value: 'criptomonedas', label: 'Criptomonedas' }
  ];

  const handleLocationPermission = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        setLocationPermission('granted');
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      } catch (error) {
        setLocationPermission('denied');
      }
    } else {
      setLocationPermission('denied');
    }
  };

  const handleSubmit = async () => {
    try {
      // Aquí iría la lógica para enviar el pedido al servidor
      // Por ahora solo mostramos un mensaje de confirmación
      
      // Limpiar el carrito
      clearCart();
      
      // Mostrar mensaje de éxito
      toast.success('¡Pedido enviado con éxito!', {
        position: 'top-center',
        duration: 5000,
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          border: '1px solid #F59E0B',
          borderRadius: '10px',
        },
      });
      
      // Cerrar el modal después de un breve retraso
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      toast.error('Error al procesar el pedido. Por favor, intenta de nuevo.', {
        position: 'top-center',
        duration: 5000,
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          border: '1px solid #dc2626',
          borderRadius: '10px',
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-bora-black/30 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full mx-4">
        <h2 className="text-2xl font-bebas text-bora-yellow text-center mb-6">Confirmación de Pedido</h2>

        {/* Lista de productos */}
        <div className="space-y-4 mb-6">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-bora-white/80 font-unbounded">
                {item.name} {item.salsas && item.salsas.length > 0 ? `(${item.salsas.join(', ')})` : ''}
              </span>
              <span className="font-bebas text-bora-yellow">${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between items-center border-t border-bora-orange/20 pt-4">
            <span className="font-unbounded text-bora-white/80">Total:</span>
            <span className="font-bebas text-bora-yellow">${totalPrice}</span>
          </div>
        </div>

        {/* Método de pago */}
        <div className="mb-6">
          <label className="block text-bora-white/80 font-unbounded mb-2">Método de Pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-bora-black/40 border border-bora-orange/20 rounded-lg p-3 text-bora-white/80 font-unbounded"
          >
            {paymentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dirección */}
        <div className="mb-6">
          <label className="block text-bora-white/80 font-unbounded mb-2">Dirección de Entrega</label>
          <div className="p-4 bg-bora-black/40 rounded-lg">
            <p className="text-bora-white/80 break-words whitespace-pre-wrap">{deliveryAddress}</p>
          </div>
          {showLocationButton && (
            <div className="mt-4">
              <button
                onClick={handleLocationPermission}
                className="w-full text-center text-bora-white/70 hover:text-bora-white px-4 py-2 rounded-full border border-bora-orange/20 hover:border-bora-orange/50 transition-all duration-300 hover:scale-105"
              >
                {locationPermission === 'not_requested'
                  ? 'Usar mi ubicación actual'
                  : locationPermission === 'granted'
                  ? 'Ubicación obtenida correctamente'
                  : 'Permisos denegados'}
              </button>
            </div>
          )}
        </div>

        {/* Mensaje de tiempo de entrega */}
        <div className="mb-6 p-4 bg-bora-black/40 rounded-lg">
          <p className="text-bora-white/80 font-unbounded">
            Tiempo estimado de entrega: 15-20 minutos
          </p>
          <p className="text-bora-white/60 font-unbounded mt-2">
            Por favor, asegúrate de estar en la dirección indicada para la entrega.
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-bora-white/70 hover:text-bora-white rounded-lg border border-bora-orange/20 hover:border-bora-orange/50 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-bora-orange to-bora-red text-white rounded-lg hover:from-bora-red hover:to-bora-orange transition-all duration-300"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
