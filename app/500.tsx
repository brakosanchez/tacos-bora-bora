'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bora-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-bora-yellow mb-4">500 - Error Interno</h1>
        <p className="text-gray-300 mb-6">Lo sentimos, algo salió mal en el servidor.</p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-bora-yellow text-bora-black hover:bg-yellow-400 transition-colors"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
