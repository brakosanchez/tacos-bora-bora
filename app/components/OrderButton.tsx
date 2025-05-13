'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface OrderButtonProps {
  className?: string;
  onClick?: () => void;
  scrollToMenu?: boolean;
}

const OrderButton: React.FC<OrderButtonProps> = ({ className = '', onClick, scrollToMenu = false }) => {
  const router = useRouter();

  const handleClick = () => {
    if (scrollToMenu) {
      // Scroll to menu section
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to order page
      console.log('Navigating to /ordenar');
      console.log('Current URL:', window.location.href);
      console.log('Current pathname:', window.location.pathname);
      try {
        window.location.href = '/ordenar';
      } catch (error) {
        console.error('Navigation error:', error);
        alert('Error al navegar: ' + error.message);
      }
    }
    
    // Call additional onClick handler if provided
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`font-unbounded bg-gradient-to-r from-bora-red to-bora-orange 
                 px-8 py-3 rounded-lg text-xl shadow-lg 
                 hover:from-bora-orange hover:to-bora-red transition-all duration-300
                 border-2 border-bora-yellow/30 hover:animate-heat-wave
                 hover:shadow-bora-orange/50 hover:shadow-2xl ${className}`}
    >
      ¡Ordena Ahora!
    </button>
  );
};

export default OrderButton;
