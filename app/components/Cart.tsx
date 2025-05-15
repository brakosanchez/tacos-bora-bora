'use client';

import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border border-bora-orange/20">
        <h3 className="text-2xl font-yeseva text-bora-orange mb-4">Tu Carrito</h3>
        <p className="text-bora-white/70 text-center py-6 font-unbounded">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border border-bora-orange/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-yeseva text-bora-orange">Tu Carrito</h3>
        <button 
          onClick={clearCart}
          className="text-sm text-bora-white/70 hover:text-bora-white px-3 py-1 rounded-full border border-bora-orange/20 hover:border-bora-orange/50 transition-all"
        >
          Vaciar
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
        {items.map((item) => (
          <CartItem key={`${item.id}-${JSON.stringify(item.salsas)}`} item={item} />
        ))}
      </div>
      
      <div className="border-t border-bora-orange/20 pt-4">
        <div className="flex justify-between text-bora-white mb-2">
          <span className="font-unbounded">Total:</span>
          <span className="font-bebas text-xl text-bora-yellow">${totalPrice}</span>
        </div>
        <button className="w-full bg-bora-orange text-white py-3 rounded-lg font-unbounded hover:bg-bora-orange/90 transition-all">
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
