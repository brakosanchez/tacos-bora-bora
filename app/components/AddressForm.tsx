'use client';

import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';

import { useSession } from 'next-auth/react';

interface Geolocation {
  latitude: number;
  longitude: number;
}

interface FormData {
  street: string;
  number: string;
  neighborhood: string;
  reference: string;
  phone: string;
  name: string;
  email: string;
}

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onConfirm: (data: {
    address: string;
    contact: string;
    time: string;
  }) => void;
  isOrderConfirmed: boolean;
}


export default function AddressForm({ isOpen, onClose, onPrevious, onConfirm, isOrderConfirmed }: AddressFormProps) {
  // Contextos y hooks
  const { data: session } = useSession();

  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    street: '',
    number: '',
    neighborhood: '',
    reference: '',
    phone: '',
    name: session?.user?.name || '',
    email: session?.user?.email || ''
  });

  // Manejo de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Validaciones
    if (!formData.street) {
      toast.error('Por favor, ingresa la calle');
      return;
    }
    if (!formData.number) {
      toast.error('Por favor, ingresa el número');
      return;
    }
    if (!formData.neighborhood) {
      toast.error('Por favor, ingresa la colonia');
      return;
    }
    if (!formData.phone) {
      toast.error('Por favor, ingresa un teléfono válido');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error('El teléfono debe tener 10 dígitos');
      return;
    }

    const address = `${formData.street} ${formData.number}, ${formData.neighborhood}`;
    const contact = `${formData.name || 'Cliente'} - ${formData.phone}`;
    const baseProductionTime = 20;
    const deliveryTime = `${baseProductionTime} minutos`;

    onConfirm({
      address,
      contact,
      time: deliveryTime
    });
    onClose();
  };

  // Manejo de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  // Prellenar datos del formulario si hay sesión
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || ''
      }));
    }
  }, [session]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full border border-bora-orange/20 mx-4 p-8">
        <div className="flex justify-between items-center border-b border-bora-orange/20 mb-8 pb-4">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 text-bora-white/80 hover:text-bora-white transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-2xl font-bebas text-bora-orange">Información de entrega</h2>
          <button
            onClick={onClose}
            className="text-bora-white/80 hover:text-bora-white transition-all duration-300"
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Columna 1 */}
            <div>
              <div className="space-y-2">
                <label className="text-bora-white font-unbounded">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="px-4 py-3 bg-black/50 border border-bora-orange/20 rounded-lg text-bora-white/80 placeholder-bora-white/40 focus:outline-none focus:border-bora-orange/50 focus:ring-2 focus:ring-bora-orange/50 w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-bora-white/80 mb-2">Calle</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Calle"
                  value={formData.street}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/50 border border-bora-orange/20 rounded-lg text-bora-white/80 placeholder-bora-white/40 focus:outline-none focus:border-bora-orange/50 focus:ring-2 focus:ring-bora-orange/50 w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-bora-white/80 mb-2">Colonia</label>
                <input
                  type="text"
                  name="neighborhood"
                  placeholder="Colonia"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/50 border border-bora-orange/20 rounded-lg text-bora-white/80 placeholder-bora-white/40 focus:outline-none focus:border-bora-orange/50 focus:ring-2 focus:ring-bora-orange/50 w-full"
                />
              </div>
            </div>

            {/* Columna 2 */}
            <div>
              <div className="space-y-2">
                <label className="block text-bora-white/80 mb-2">Número</label>
                <input
                  type="text"
                  name="number"
                  placeholder="Número"
                  value={formData.number}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/50 border border-bora-orange/20 rounded-lg text-bora-white/80 placeholder-bora-white/40 focus:outline-none focus:border-bora-orange/50 focus:ring-2 focus:ring-bora-orange/50 w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-bora-white/80 mb-2">Referencias</label>
                <textarea
                  name="reference"
                  placeholder="Referencias"
                  value={formData.reference}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/50 border border-bora-orange/20 rounded-lg text-bora-white/80 placeholder-bora-white/40 focus:outline-none focus:border-bora-orange/50 focus:ring-2 focus:ring-bora-orange/50 w-full h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-bora-white/80 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-3 bg-black/50 border border-bora-orange/20 rounded-lg text-bora-white/80 placeholder-bora-white/40 focus:outline-none focus:border-bora-orange/50 focus:ring-2 focus:ring-bora-orange/50 w-full"
                />
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrevious();
              }}
              className="px-6 py-3 bg-bora-orange/50 text-bora-black rounded-lg hover:bg-bora-orange/70 transition-all duration-300"
            >
              Atrás
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-bora-orange/70 text-bora-black rounded-lg hover:bg-bora-orange/90 transition-all duration-300"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
