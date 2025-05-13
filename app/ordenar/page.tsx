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
  { id: 1, nombre: 'Taco de Mixiote', precio: 30, categoria: 'Tacos' },
  { id: 2, nombre: 'Taco de Camarón', precio: 35, categoria: 'Tacos' },
  { id: 3, nombre: 'Taco de Pescado', precio: 35, categoria: 'Tacos' },
  { id: 4, nombre: 'Kilo de Mixiote', precio: 330, categoria: 'Especialidades' },
  { id: 5, nombre: 'Mixiote de Pollo', precio: 180, categoria: 'Especialidades' },
  { id: 6, nombre: 'Mixiote de Res', precio: 200, categoria: 'Especialidades' },
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
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 ${formErrors.nombre ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                />
                {formErrors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.nombre}</p>
                )}
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej. 5512345678"
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 ${formErrors.telefono ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                />
                {formErrors.telefono && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.telefono}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección de entrega
              </label>
              <textarea
                id="direccion"
                name="direccion"
                required
                value={formData.direccion}
                onChange={handleInputChange}
                rows={3}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 ${formErrors.direccion ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
              />
              {formErrors.direccion && (
                <p className="mt-1 text-sm text-red-600">{formErrors.direccion}</p>
              )}
            </div>
          </div>

          {/* Selección de items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Tu Orden</h2>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{item.nombre}</h3>
                    <p className="text-gray-500">${item.precio}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <label htmlFor={`cantidad-${item.id}`} className="sr-only">
                        Cantidad
                      </label>
                      <input
                        type="number"
                        id={`cantidad-${item.id}`}
                        min="0"
                        value={selectedItems[item.id]?.cantidad || 0}
                        onChange={(e) => handleItemChange(item.id, 'cantidad', parseInt(e.target.value) || 0)}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-orange-500"
                      />
                    </div>
                    <div className="flex-grow">
                      <label htmlFor={`notas-${item.id}`} className="sr-only">
                        Notas especiales
                      </label>
                      <input
                        type="text"
                        id={`notas-${item.id}`}
                        placeholder="Notas especiales"
                        value={selectedItems[item.id]?.notas || ''}
                        onChange={(e) => handleItemChange(item.id, 'notas', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500"
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
