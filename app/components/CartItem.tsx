'use client';

import { useCart, CartItem as CartItemType } from '../context/CartContext';
import { salsas } from './Menu';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col bg-bora-black/40 rounded-xl p-6 border border-bora-orange/20 hover:border-bora-orange/40 transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bebas text-xl text-bora-yellow">{item.name}</h4>
          {item.salsas && item.salsas.length > 0 && (
            <p className="text-bora-orange/80 text-sm mt-2 font-unbounded">
              <span className="text-bora-white/70">Salsas:</span> {item.salsas
                .map(salsaId => salsas.find(s => s.id === salsaId)?.name || salsaId)
                .join(', ')}
            </p>
          )}
        </div>
        <span className="font-bebas text-2xl text-bora-yellow">${item.price * item.quantity}</span>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-bora-black/60 text-bora-white/70 hover:text-bora-white border border-bora-orange/20 hover:border-bora-orange/50 hover:scale-105 transition-all duration-300"
          >
            <span className="font-bebas">-</span>
          </button>
          <span className="text-bora-white font-unbounded text-xl">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-bora-black/60 text-bora-white/70 hover:text-bora-white border border-bora-orange/20 hover:border-bora-orange/50 hover:scale-105 transition-all duration-300"
          >
            <span className="font-bebas">+</span>
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-sm text-bora-white/50 hover:text-bora-white font-unbounded hover:underline transition-colors duration-300"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
