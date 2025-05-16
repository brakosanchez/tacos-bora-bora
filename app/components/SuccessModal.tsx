'use client';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  return (
    <div className={isOpen ? 'fixed inset-0 z-50' : 'hidden'}>
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-bora-black/80 rounded-2xl p-8 max-w-md w-full mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">
              <svg className="w-16 h-16 mx-auto text-bora-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bebas text-bora-yellow mb-4">
              {message || '¡Gracias por su tiempo!'}
            </h2>
            <p className="text-gray-300 mb-6">
              Su retroalimentación nos ayuda a mejorar continuamente.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-bora-yellow text-bora-black hover:bg-yellow-400 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
