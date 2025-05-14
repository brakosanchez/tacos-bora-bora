'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  const dashboardItems = [
    { 
      name: 'Inventario', 
      description: 'Gestiona tus productos y existencias', 
      href: '/admin/inventario',
      icon: '📦'
    },
    { 
      name: 'Buzón de Interacciones', 
      description: 'Revisa clics en redes sociales', 
      href: '/admin/buzon',
      icon: '📩'
    },
    { 
      name: 'Generar Pedidos', 
      description: 'Crea y administra pedidos', 
      href: '/admin/pedidos/generar',
      icon: '🍽️'
    },
    { 
      name: 'Leer Pedidos', 
      description: 'Consulta pedidos recibidos', 
      href: '/admin/pedidos/leer',
      icon: '📋'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-bora-black">Panel de Administración</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {dashboardItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-bora-black mb-2">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
