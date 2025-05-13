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
  { id: 1, nombre: 'Taco de Mixiote', precio: 30 },
  { id: 2, nombre: 'Taco de Pastor', precio: 25 },
  { id: 3, nombre: 'Taco de Suadero', precio: 25 },
  { id: 4, nombre: 'Kilo de Mixiote', precio: 330 },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Preparar items del pedido
    const orderItems = Object.entries(selectedItems)
      .filter(([_, details]) => details.cantidad > 0)
      .map(([itemId, details]) => {
        const item = menuItems.find(m => m.id === parseInt(itemId));
        return {
          nombre: item?.nombre || '',
          cantidad: details.cantidad,
          notas: details.notas
        };
      });

    const orderData = {
      ...formData,
      items: orderItems,
      fecha: new Date().toISOString(),
    };

    // Aquí iría la lógica para enviar el pedido
    console.log('Pedido:', orderData);
    
    // Por ahora solo mostraremos una alerta
    alert('¡Gracias por tu pedido! Te contactaremos pronto.');
    router.push('/');
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
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
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              Confirmar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
