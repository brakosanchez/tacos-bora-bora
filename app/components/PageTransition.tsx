'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const pageVariants = {
  initial: { 
    opacity: 0, 
    x: '-10%', 
    scale: 0.95,
    rotateY: 15
  },
  in: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.7,
      type: 'tween',
      ease: 'anticipate'
    }
  },
  out: { 
    opacity: 0, 
    x: '10%', 
    scale: 0.95,
    rotateY: -15,
    transition: {
      duration: 0.7,
      type: 'tween',
      ease: 'anticipate'
    }
  }
};

const loadingVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
      ease: 'easeInOut'
    }
  },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingDuration = isFirstLoad ? 2000 : 1000;
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
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ 
            opacity: 0.78, 
            backdropFilter: 'blur(8px)',
            transition: { duration: 0.7, ease: 'easeInOut' }
          }}
          exit={{ 
            opacity: 0,
            backdropFilter: 'blur(0px)', 
            transition: { duration: 0.7, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bora-black"
        >
          <motion.div
            variants={loadingVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
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
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
