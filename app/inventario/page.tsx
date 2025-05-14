'use client';

import { useState } from 'react';

interface Insumo {
  id?: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  fechaIngreso?: Date;
}

export default function InventarioPage() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [nuevoInsumo, setNuevoInsumo] = useState<Insumo>({
    nombre: '',
    cantidad: 0,
    unidad: 'kg'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoInsumo(prev => ({
      ...prev,
      [name]: name === 'cantidad' ? Number(value) : value
    }));
  };

  const agregarInsumo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoInsumo.nombre || nuevoInsumo.cantidad <= 0) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }

    const insumoConFecha = {
      ...nuevoInsumo,
      id: Date.now().toString(),
      fechaIngreso: new Date()
    };

    setInsumos(prev => [...prev, insumoConFecha]);
    setNuevoInsumo({ nombre: '', cantidad: 0, unidad: 'kg' });
  };

  const eliminarInsumo = (id: string) => {
    setInsumos(prev => prev.filter(insumo => insumo.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bebas mb-8 text-center">Inventario de Insumos</h1>
      
      <form 
        onSubmit={agregarInsumo} 
        className="bg-bora-black/50 backdrop-blur-sm p-6 rounded-lg mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="nombre"
            value={nuevoInsumo.nombre}
            onChange={handleInputChange}
            placeholder="Nombre del Insumo"
            className="bg-bora-black/30 text-white p-2 rounded"
            required
          />
          <input
            type="number"
            name="cantidad"
            value={nuevoInsumo.cantidad}
            onChange={handleInputChange}
            placeholder="Cantidad"
            min="0"
            step="0.01"
            className="bg-bora-black/30 text-white p-2 rounded"
            required
          />
          <select
            name="unidad"
            value={nuevoInsumo.unidad}
            onChange={handleInputChange}
            className="bg-bora-black/30 text-white p-2 rounded"
          >
            <option value="kg">Kilogramos</option>
            <option value="g">Gramos</option>
            <option value="l">Litros</option>
            <option value="pza">Piezas</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="mt-4 w-full bg-bora-orange text-black p-2 rounded hover:bg-bora-yellow transition-colors"
        >
          Agregar Insumo
        </button>
      </form>

      <div className="bg-bora-black/50 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-2xl font-bebas mb-4">Lista de Insumos</h2>
        {insumos.length === 0 ? (
          <p className="text-center text-gray-400">No hay insumos registrados</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-bora-orange/30">
                <th className="py-2 text-left">Nombre</th>
                <th className="py-2 text-left">Cantidad</th>
                <th className="py-2 text-left">Unidad</th>
                <th className="py-2 text-left">Fecha</th>
                <th className="py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {insumos.map((insumo) => (
                <tr key={insumo.id} className="border-b border-bora-orange/10 hover:bg-bora-black/30">
                  <td className="py-2">{insumo.nombre}</td>
                  <td className="py-2">{insumo.cantidad}</td>
                  <td className="py-2">{insumo.unidad}</td>
                  <td className="py-2">
                    {insumo.fechaIngreso?.toLocaleDateString()}
                  </td>
                  <td className="py-2 text-right">
                    <button 
                      onClick={() => eliminarInsumo(insumo.id!)}
                      className="bg-red-600/50 text-white px-2 py-1 rounded hover:bg-red-700/50 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
