'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface OrderButtonProps {
  className?: string;
  onClick?: () => void;
  scrollToMenu?: boolean;
}

const OrderButton: React.FC<OrderButtonProps> = ({ className = '', onClick, scrollToMenu = false }) => {
  const router = useRouter();

  const handleClick = useCallback((e: React.MouseEvent) => {
    console.log('OrderButton clicked');
    console.log('ScrollToMenu:', scrollToMenu);
    console.log('Current URL:', window.location.href);
    console.log('Router object:', router);

    // Prevent default button behavior
    e.preventDefault();
    e.stopPropagation();

    try {
      if (scrollToMenu) {
        // Scroll to menu section
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          menuSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to order page
        console.log('Attempting to navigate to /ordenar');
        router.push('/ordenar');
      }
      
      // Call additional onClick handler if provided
      if (onClick) onClick();
    } catch (error) {
      console.error('Navigation error:', error);
      alert(`Error al navegar: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [router, scrollToMenu, onClick]);

  return (
    <button
      type="button"
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
