'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface OrderButtonProps {
  className?: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({ className = '' }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/ordenar');
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
      Ordena Ahora!
    </button>
  );
};

export default OrderButton;
