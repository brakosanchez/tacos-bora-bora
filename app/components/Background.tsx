import React from 'react';

const Background = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-sm"></div>
      
      {/* SVG Palm Trees and Banana Plants */}
      <svg className="absolute left-0 bottom-0 w-48 h-96 opacity-60 origin-bottom animate-sway" viewBox="0 0 100 200">
        <path
          d="M50 200 C20 150,10 100,40 50 C45 40,60 60,55 70 C70 40,80 30,85 20 C90 10,70 30,65 40 C80 20,90 0,95 10"
          fill="none"
          stroke="currentColor"
          className="text-bora-yellow/40"
          strokeWidth="2"
        />
        {/* Add more palm fronds here */}
      </svg>
      
      <svg className="absolute right-0 bottom-0 w-48 h-96 opacity-60 origin-bottom animate-sway delay-1000" viewBox="0 0 100 200">
        <path
          d="M50 200 C80 150,90 100,60 50 C55 40,40 60,45 70 C30 40,20 30,15 20 C10 10,30 30,35 40 C20 20,10 0,5 10"
          fill="none"
          stroke="currentColor"
          className="text-bora-yellow/40"
          strokeWidth="2"
        />
        {/* Add more palm fronds here */}
      </svg>
      
      {/* Banana Plants */}
      <svg className="absolute left-1/4 bottom-0 w-32 h-64 opacity-40 origin-bottom animate-sway delay-500" viewBox="0 0 100 200">
        <path
          d="M50 200 Q60 150,70 100 T90 50"
          fill="none"
          stroke="currentColor"
          className="text-bora-yellow/40"
          strokeWidth="2"
        />
        <path
          d="M50 180 Q40 130,30 80 T10 30"
          fill="none"
          stroke="currentColor"
          className="text-bora-yellow/40"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Background;
