'use client';

import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="bg-bora-black/30 backdrop-blur-sm rounded-2xl p-8 border border-bora-orange/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h3 className="text-3xl font-bebas text-bora-yellow text-center">Tu Carrito</h3>
        <p className="text-bora-white/70 text-center py-8 font-unbounded text-lg">Tu carrito está vacío</p>
      </div>
    );
  }

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
      
      <div className="space-y-6 max-h-96 overflow-y-auto mb-8 scrollbar-thin scrollbar-thumb-bora-orange/20 scrollbar-track-bora-black/20">
        {items.map((item) => (
          <CartItem key={`${item.id}-${JSON.stringify(item.salsas)}`} item={item} />
        ))}
      </div>
      
      <div className="border-t border-bora-orange/20 pt-6">
        <div className="flex justify-between text-bora-white mb-4 text-center">
          <span className="font-unbounded text-lg">Total:</span>
          <span className="font-bebas text-2xl text-bora-yellow">${totalPrice}</span>
        </div>
        <button className="w-full bg-gradient-to-r from-bora-orange to-bora-red text-white py-4 rounded-xl font-unbounded hover:from-bora-red hover:to-bora-orange transition-all duration-300 hover:shadow-bora-orange/50 hover:shadow-xl">
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
