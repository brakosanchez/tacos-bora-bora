'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderFormData {
  nombre: string;
  telefono: string;
  direccion: string;
  items: {
    nombre: string;
    cantidad: number;
    notas: string;
  }[];
}

const menuItems = [
  { id: 1, nombre: 'Bistec', precio: 30, categoria: 'Tacos', descripcion: 'Jugosa carne de res marinada' },
  { id: 2, nombre: 'Longaniza', precio: 30, categoria: 'Tacos', descripcion: 'Auténtica longaniza artesanal' },
  { id: 3, nombre: 'Pollo', precio: 30, categoria: 'Tacos', descripcion: 'Pollo marinado a la plancha' },
  { id: 4, nombre: 'Aguja Norteña', precio: 30, categoria: 'Tacos', descripcion: 'Corte especial de res' },
  { id: 5, nombre: 'Campechano', precio: 30, categoria: 'Tacos', descripcion: 'Combinación de longaniza con bistec o pollo' },
  { id: 6, nombre: 'Mixiote', precio: 30, categoria: 'Tacos', descripcion: 'Tradicional mixiote de res' },
  { id: 7, nombre: 'Cecina', precio: 35, categoria: 'Especialidades', descripcion: 'Fina cecina de res' },
  { id: 8, nombre: 'Arrachera', precio: 35, categoria: 'Especialidades', descripcion: 'Corte premium de arrachera' },
  { id: 9, nombre: 'Kilo de Mixiote', precio: 330, categoria: 'Especialidades', descripcion: 'Mixiote de res para toda la familia' },
];

export default function OrderPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<OrderFormData>({
    nombre: '',
    telefono: '',
    direccion: '',
    items: [],
  });

  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: { cantidad: number; notas: string };
  }>({});

  const salsas = [
    'Piña',
    'Piña con habanero',
    'Cebollas moradas',
    'Nopales',
    'Salsa verde',
    'Salsa roja',
    'Salsa de habanero',
    'Chimichurri'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (itemId: number, field: 'cantidad' | 'notas', value: string | number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }

    // Validar teléfono (formato mexicano)
    const phoneRegex = /^(\+?52)?([ -]?)\d{10}$/;
    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.telefono)) {
      errors.telefono = 'Número de teléfono inválido';
    }

    // Validar dirección
    if (!formData.direccion.trim()) {
      errors.direccion = 'La dirección es requerida';
    }

    // Validar que haya al menos un item
    const orderItems = Object.entries(selectedItems)
      .filter(([_, details]) => details.cantidad > 0);
    
    if (orderItems.length === 0) {
      errors.items = 'Debes seleccionar al menos un producto';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar formulario
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    // Preparar items del pedido
    const orderItems = Object.entries(selectedItems)
      .filter(([_, details]) => details.cantidad > 0)
      .map(([itemId, details]) => {
        const item = menuItems.find(m => m.id === parseInt(itemId));
        return {
          nombre: item?.nombre || '',
          cantidad: details.cantidad,
          precio: item?.precio || 0,
          notas: details.notas || ''
        };
      });

    const orderData = {
      ...formData,
      items: orderItems,
      total: calculateTotal(),
      fecha: new Date().toISOString(),
    };

    try {
      // Simular envío de pedido
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En un escenario real, aquí iría la llamada a una API
      console.log('Pedido enviado:', orderData);
      
      // Mostrar confirmación
      alert('¡Gracias por tu pedido! Te contactaremos pronto.');
      router.push('/');
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('Hubo un problema al enviar tu pedido. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, details]) => {
      const item = menuItems.find(m => m.id === parseInt(itemId));
      return total + (item?.precio || 0) * details.cantidad;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Realiza tu Pedido
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información personal */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Información de Contacto</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-bora-black/30 border border-bora-orange/20 rounded-lg px-4 py-3 text-bora-white focus:outline-none focus:border-bora-yellow transition-colors"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-bora-white/70 mb-2">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-bora-black/30 border border-bora-orange/20 rounded-lg px-4 py-3 text-bora-white focus:outline-none focus:border-bora-yellow transition-colors"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-bora-white/70 mb-2">Dirección de Entrega</label>
              <textarea
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                className="w-full bg-bora-black/30 border border-bora-orange/20 rounded-lg px-4 py-3 text-bora-white focus:outline-none focus:border-bora-yellow transition-colors h-24"
              />
            </div>

            {/* Menu Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <div key={item.id} className="bg-bora-black/30 backdrop-blur-sm rounded-lg p-6 border border-bora-orange/20 hover:border-bora-yellow transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-unbounded text-bora-white text-lg">{item.nombre}</h4>
                    <span className="font-bebas text-xl text-bora-yellow">${item.precio}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <label className="text-bora-white/70 mr-2">Cantidad:</label>
                    <input
                      type="number"
                      min="0"
                      value={selectedItems[item.id]?.cantidad || 0}
                      onChange={(e) => handleItemChange(item.id, 'cantidad', e.target.value)}
                      className="w-20 bg-bora-black/30 border border-bora-orange/20 rounded-lg px-2 py-1 text-bora-white focus:outline-none focus:border-bora-yellow"
                    />
                  </div>
                  <div>
                    <label className="block text-bora-white/70 mb-2">Notas:</label>
                    <textarea
                      value={selectedItems[item.id]?.notas || ''}
                      onChange={(e) => handleItemChange(item.id, 'notas', e.target.value)}
                      className="w-full bg-bora-black/30 border border-bora-orange/20 rounded-lg px-4 py-2 text-bora-white focus:outline-none focus:border-bora-yellow h-20"
                      placeholder="Instrucciones especiales"
                    />
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total y botón de envío */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-orange-600">
                ${calculateTotal()}
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${isSubmitting ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'}`}
            >
              {isSubmitting ? 'Enviando pedido...' : 'Confirmar Pedido'}
            </button>
            {formErrors.items && (
              <p className="mt-4 text-center text-sm text-red-600">{formErrors.items}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
