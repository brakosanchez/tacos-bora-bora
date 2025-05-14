'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.5,
              type: "spring",
              stiffness: 100 
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            transition: { duration: 0.3 }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bora-black/80 backdrop-blur-sm"
        >
          <Image 
            src="/images/Logo.png" 
            alt="Tacos Bora Bora Logo" 
            width={200} 
            height={200}
            className="animate-pulse"
          />
        </motion.div>
      )}

      <motion.div 
        key={pathname}
        initial="initialState" 
        animate="animateState" 
        exit="exitState"
        transition={{
          duration: 0.5,
        }}
        variants={{
          initialState: {
            opacity: 0,
            y: 50
          },
          animateState: {
            opacity: 1,
            y: 0
          },
          exitState: {
            opacity: 0,
            y: -50
          },
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
