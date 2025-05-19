'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface PickupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pickupInfo: { name: string; phone: string; pickupTime: string }) => void;
}

export default function PickupForm({ isOpen, onClose, onConfirm }: PickupFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const { data: session } = useSession();

  // Opciones de hora de recogida (9am a 4pm)
  const pickupTimeOptions = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  useEffect(() => {
    if (session?.user) {
      setName(session.user?.name || '');
    }
  }, [session]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full border border-bora-orange/20 p-8">
        <div className="flex justify-between items-center border-b border-bora-orange/20 mb-8 pb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-bora-white/80 hover:text-bora-white transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-2xl font-bebas text-bora-orange">Información del Cliente</h2>
          <button
            onClick={onClose}
            className="text-bora-white/80 hover:text-bora-white transition-all duration-300"
          >
            X
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-bora-white/80 font-unbounded">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="bg-bora-black/40 text-bora-white/80 rounded-lg p-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bora-white/80 font-unbounded">Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Tu teléfono"
                className="bg-bora-black/40 text-bora-white/80 rounded-lg p-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-bora-white/80 font-unbounded">Hora de recogida</label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="bg-bora-black/40 text-bora-white/80 rounded-lg p-3"
              >
                <option value="">Selecciona una hora</option>
                {pickupTimeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-bora-black/40 text-bora-white/80 hover:text-bora-white transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => onConfirm({ name, phone, pickupTime })}
              className="px-6 py-2 rounded-lg bg-bora-orange text-bora-white hover:bg-bora-orange/90 transition-all duration-300"
              disabled={!name || !phone || !pickupTime}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
