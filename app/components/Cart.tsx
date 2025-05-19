'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { salsas } from './Menu';
import Menu from './Menu';
import CartItem from './CartItem';
import AddressForm from './AddressForm';
import OrderReviewModal from './OrderReviewModal';
import OrderFinalConfirmationModal from './OrderFinalConfirmationModal';
import PickupForm from './PickupForm';

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [isOrderReviewOpen, setIsOrderReviewOpen] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [isPickupFormOpen, setIsPickupFormOpen] = useState(false);
  const [isFinalConfirmationOpen, setIsFinalConfirmationOpen] = useState(false);
  const [deliveryData, setDeliveryData] = useState<{
    name: string;
    phone: string;
    address?: string;
    time: string;
  } | undefined>(undefined);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  // Verificar restricción de salsas basada en la cantidad de tacos
  const tacoCount = items.filter(item => item.category === 'Tacos').reduce((total, item) => total + item.quantity, 0);
  const isSalsaRestricted = tacoCount <= 5;



  return (
    <div className="bg-bora-black/30 backdrop-blur-sm rounded-2xl p-8 border border-bora-orange/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bebas text-bora-yellow text-center">Tu Carrito</h3>
        <button 
          onClick={clearCart}
          className="text-sm text-bora-white/70 hover:text-bora-white px-4 py-2 rounded-full border border-bora-orange/20 hover:border-bora-orange/50 transition-all duration-300 hover:scale-105"
        >
          Vaciar Carrito
        </button>
      </div>

      {/* Mensajes de límite de compra */}
      <div className="text-bora-white/80 text-sm mb-6">
        <p>• Para entrega a domicilio es un consumo mínimo de $150</p>
        <p>• Para salsas para llevar se requieren mínimo 6 tacos</p>
      </div>

      {totalItems === 0 ? (
        <div className="text-center py-8">
          <p className="text-bora-white/70 font-unbounded text-lg">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="space-y-6 max-h-96 overflow-y-auto mb-8 scrollbar-thin scrollbar-thumb-bora-orange/20 scrollbar-track-bora-black/20">
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.category}-${item.quantity}-${JSON.stringify(item.salsas)}`} item={item} />
            ))}
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-bora-white/80 font-unbounded">Total:</span>
              <span className="font-bebas text-bora-yellow text-xl">${totalPrice}</span>
            </div>
          </div>
        </>
      )}

      {/* Botón de revisar pedido */}
      <button 
        onClick={() => {
          // Solo abrir el modal si hay items en el carrito
          if (totalItems > 0) {
            setIsOrderReviewOpen(true);
          } else {
            toast.error('No hay items en el carrito');
          }
        }}
        className="w-full bg-gradient-to-r from-bora-orange to-bora-red text-white py-4 rounded-xl font-unbounded hover:from-bora-red hover:to-bora-orange transition-all duration-300 hover:shadow-bora-orange/50 hover:shadow-xl"
      >
        Revisar Pedido
      </button>

      {isOrderReviewOpen && totalItems > 0 && (
        <OrderReviewModal
          isOpen={true}
          onClose={() => {
            setIsOrderReviewOpen(false);
            // No cerrar los otros modales aquí, se manejarán individualmente
          }}
          onConfirm={(deliveryType) => {
            // Verificar restricciones antes de continuar
            if (deliveryType === 'domicilio' && totalPrice < 150) {
              toast.error('Para pedidos a domicilio se requiere un mínimo de $150');
              return;
            }
            
            // Abrir el siguiente modal según el tipo de entrega
            if (deliveryType === 'domicilio') {
              setIsAddressFormOpen(true);
            } else {
              setIsPickupFormOpen(true);
            }
          }}
          totalPrice={totalPrice}
        />
      )}

      {isAddressFormOpen && (
        <AddressForm
          isOpen={true}
          onClose={() => {
            setIsAddressFormOpen(false);
            setIsOrderReviewOpen(true);
          }}
          onConfirm={(data: { address: string; contact: string; time: string }) => {
            setDeliveryData({
              name: '',
              phone: data.contact,
              address: data.address,
              time: data.time
            });
            setIsFinalConfirmationOpen(true);
          }}
          onPrevious={() => {
            setIsAddressFormOpen(false);
            setIsOrderReviewOpen(true);
          }}
          isOrderConfirmed={isOrderConfirmed}
        />
      )}

      {isPickupFormOpen && (
        <PickupForm
          isOpen={true}
          onClose={() => {
            setIsPickupFormOpen(false);
            setIsOrderReviewOpen(true);
          }}
          onConfirm={(pickupInfo: { name: string; phone: string; pickupTime: string }) => {
            setDeliveryData({
              name: pickupInfo.name,
              phone: pickupInfo.phone,
              time: pickupInfo.pickupTime
            });
            setIsPickupFormOpen(false);
            setIsFinalConfirmationOpen(true);
          }}
        />
      )}

      {isFinalConfirmationOpen && (
        <OrderFinalConfirmationModal
          isOpen={true}
          onClose={() => {
            setIsFinalConfirmationOpen(false);
            setIsOrderReviewOpen(true);
          }}
          onConfirm={() => {
            clearCart();
            setIsOrderConfirmed(true);
            setIsFinalConfirmationOpen(false);
          }}
          deliveryData={deliveryData}
        />
      )}



      {isFinalConfirmationOpen && (
        <OrderFinalConfirmationModal
          isOpen={true}
          onClose={() => {
            setIsFinalConfirmationOpen(false);
            setIsOrderReviewOpen(true);
          }}
          onConfirm={() => {
            clearCart();
            setIsOrderConfirmed(true);
            setIsFinalConfirmationOpen(false);
          }}
          deliveryData={deliveryData}
        />
      )}
    </div>
  );
}
