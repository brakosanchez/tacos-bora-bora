'use client';

import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-lg" onClick={onClose} />
      <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl shadow-xl max-w-md w-full border border-bora-orange/20 mx-4">
        {children}
      </div>
    </div>
  );
}
