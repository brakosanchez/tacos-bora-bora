'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'Tacos' | 'Salsas' | 'Bebidas';
  salsas?: string[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems(prevItems => {
      // Verificar si el item ya existe en el carrito
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === newItem.id && 
        JSON.stringify(item.salsas) === JSON.stringify(newItem.salsas)
      );

      if (existingItemIndex >= 0) {
        // Si el item existe, incrementar la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Si no existe, agregar el nuevo item
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const removeFromCart = (id: string) => {
    removeItem(id);
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      const itemIndex = updatedItems.findIndex(item => item.id === id);
      if (itemIndex >= 0) {
        updatedItems[itemIndex].quantity = quantity;
      }
      return updatedItems;
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      removeItem,
      clearCart,
      updateQuantity,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      totalPrice: items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
