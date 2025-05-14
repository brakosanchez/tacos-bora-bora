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

  const isHomePage = pathname === '/';

  return (
    <AnimatePresence mode="sync">
      {isLoading && (
        <motion.div 
          initial={{ opacity: 1, backgroundColor: 'black' }}
          animate={isHomePage ? { 
            opacity: [1, 1, 0],
            transition: {
              duration: 2,
              times: [0, 0.9, 1],
              ease: 'easeInOut'
            }
          } : { opacity: 1 }}
          exit={isHomePage ? { 
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
          } : { opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={isHomePage ? { opacity: 0, scale: 0.8 } : { opacity: 0 }}
            animate={isHomePage ? { 
              opacity: [0, 1, 1],
              scale: [0.8, 1, 1],
              transition: {
                duration: 2,
                times: [0, 0.3, 1],
                ease: 'easeInOut'
              }
            } : {
              opacity: [0, 1, 0],
              scale: [0.7, 1, 0.7],
              transition: {
                duration: 0.8,
                times: [0, 0.5, 1],
                ease: 'easeInOut'
              }
            }}
          >
            {isHomePage ? (
              <Image 
                src="/images/Logo.png" 
                alt="Tacos Bora Bora Logo" 
                width={250} 
                height={250}
                className="opacity-90"
              />
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }
                }}
                className="w-32 h-32 bg-bora-orange rounded-full opacity-70 animate-pulse"
              />
            )}
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
