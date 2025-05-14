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
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ 
            opacity: 0.78, 
            backdropFilter: 'blur(8px)',
            transition: { 
              duration: 0.6,
              type: "tween",
              ease: "easeInOut" 
            }
          }}
          exit={{ 
            opacity: 0,
            backdropFilter: 'blur(0px)', 
            transition: { 
              duration: 0.6,
              type: "tween",
              ease: "easeInOut" 
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bora-black"
        >
          <motion.div
            initial={{ 
              opacity: 0,
              scale: 0.7 
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                type: "spring",
                stiffness: 120,
                damping: 10
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src="/images/Logo.png" 
              alt="Tacos Bora Bora Logo" 
              width={200} 
              height={200}
              className="transition-transform duration-300 ease-in-out"
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
          duration: 0.6,
          type: "tween",
          ease: "easeInOut"
        }}
        variants={{
          initialState: {
            opacity: 0,
            y: 50,
            scale: 0.98
          },
          animateState: {
            opacity: 1,
            y: 0,
            scale: 1
          },
          exitState: {
            opacity: 0,
            y: -50,
            scale: 0.98
          },
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
