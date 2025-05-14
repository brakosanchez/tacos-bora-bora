'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={pathname}
        initial="initialState" 
        animate="animateState" 
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        className="absolute inset-0"
      >
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
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
