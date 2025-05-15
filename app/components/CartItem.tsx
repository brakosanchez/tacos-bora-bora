'use client';

import { useCart, CartItem as CartItemType } from '../context/CartContext';

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
    <div className="flex flex-col bg-bora-black/40 rounded-lg p-4 border border-bora-orange/10">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-unbounded text-bora-white">{item.name}</h4>
          {item.salsas && item.salsas.length > 0 && (
            <p className="text-bora-orange/80 text-xs mt-1 font-unbounded">
              Con: {item.salsas.join(', ')}
            </p>
          )}
        </div>
        <span className="font-bebas text-lg text-bora-yellow">${item.price * item.quantity}</span>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-bora-black/60 text-bora-white/70 hover:text-bora-white border border-bora-orange/20 hover:border-bora-orange/50"
          >
            -
          </button>
          <span className="text-bora-white font-unbounded">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-bora-black/60 text-bora-white/70 hover:text-bora-white border border-bora-orange/20 hover:border-bora-orange/50"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-bora-white/50 hover:text-bora-white font-unbounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
