'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingDuration = isFirstLoad ? 2000 : 800;
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (isFirstLoad) setIsFirstLoad(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, [pathname, isFirstLoad]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div 
          initial={{ opacity: 1, backgroundColor: 'black' }}
          animate={{ 
            opacity: [1, 1, 0],
            transition: {
              duration: 2,
              times: [0, 0.9, 1],
              ease: 'easeInOut'
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1],
              scale: [0.8, 1, 1],
              transition: {
                duration: 2,
                times: [0, 0.3, 1],
                ease: 'easeInOut'
              }
            }}
          >
            <Image 
              src="/images/Logo.png" 
              alt="Tacos Bora Bora Logo" 
              width={250} 
              height={250}
              className="opacity-90"
            />
          </motion.div>
        </motion.div>
      )}

      <motion.div 
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { duration: 0.5, ease: 'easeInOut' }
        }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeInOut' }
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
