'use client';

import React from 'react';
import Link from 'next/link';

interface OrderButtonProps {
  className?: string;
  onClick?: () => void;
  scrollToMenu?: boolean;
}

const OrderButton: React.FC<OrderButtonProps> = ({ className = '', onClick, scrollToMenu = false }) => {
  const handleClick = (e: React.MouseEvent) => {
    console.log('OrderButton clicked');
    console.log('ScrollToMenu:', scrollToMenu);
    console.log('Current URL:', window.location.href);

    if (scrollToMenu) {
      // Scroll to menu section
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Prevent default link behavior
      e.preventDefault();
      // Navigate to order page
      console.log('Attempting to navigate to /ordenar');
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
    <Link
      href="/ordenar"
      onClick={handleClick}
      className={`font-unbounded bg-gradient-to-r from-bora-red to-bora-orange 
                 px-8 py-3 rounded-lg text-xl shadow-lg 
                 hover:from-bora-orange hover:to-bora-red transition-all duration-300
                 border-2 border-bora-yellow/30 hover:animate-heat-wave
                 hover:shadow-bora-orange/50 hover:shadow-2xl ${className}`}
    >
      ¡Ordena Ahora!
    </Link>
  );
};

export default OrderButton;
