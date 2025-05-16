'use client';

import '../styles/fire-animations.css';

interface FireTitleProps {
  text: string;
  isHovered?: boolean;
  className?: string;
}

export default function FireTitle({ text, isHovered = false, className = '' }: FireTitleProps) {
  return (
    <div className="relative">
      <h1 
        className={`text-5xl md:text-6xl font-bebas font-bold transition-all duration-500 ${className} ${
          isHovered 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 animate-glow'
            : 'text-yellow-600 animate-float'
        }`}
      >
        {text}
      </h1>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-orange-600/30 to-yellow-600/30 opacity-0 transition-opacity duration-500 hover:opacity-100 animate-gradient" />
      )}
    </div>
  );
}
