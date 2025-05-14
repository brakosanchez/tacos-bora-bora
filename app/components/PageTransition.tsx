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
              duration: 1,
              type: "tween",
              ease: "easeInOut" 
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            transition: { 
              duration: 0.8,
              type: "tween",
              ease: "easeInOut" 
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bora-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <Image 
              src="/images/Logo.png" 
              alt="Tacos Bora Bora Logo" 
              width={200} 
              height={200}
              className="transition-all duration-1000"
            />
          </motion.div>
        </motion.div>
      )}

      <motion.div 
        key={pathname}
        initial="initialState" 
        animate="animateState" 
        exit="exitState"
        transition={{
          duration: 0.8,
          type: "tween",
          ease: "easeInOut"
        }}
        variants={{
          initialState: {
            opacity: 0,
            y: 100,
            scale: 0.95
          },
          animateState: {
            opacity: 1,
            y: 0,
            scale: 1
          },
          exitState: {
            opacity: 0,
            y: -100,
            scale: 0.95
          },
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
