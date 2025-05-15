'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Background from '../../components/Background';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si está logueado mediante cookies
    const isLoggedIn = document.cookie.includes('isLoggedIn=true');
    
    if (!isLoggedIn) {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.replace('/login');
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bora-brown to-black p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/50 rounded-xl p-8 backdrop-blur-sm border border-bora-orange/20 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bebas text-bora-yellow">Panel de Administración</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 transition-colors font-unbounded text-sm"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Tarjetas de Acceso Rápido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link href="/inventario" className="group">
              <div className="bg-black/30 p-6 rounded-lg border border-bora-orange/10 hover:border-bora-orange/30 transition-all hover:bg-black/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bebas text-bora-orange mb-2">Inventario</h3>
                    <p className="text-gray-400 font-unbounded text-sm">Gestiona insumos y existencias</p>
                  </div>
                  <span className="text-bora-orange/50 group-hover:text-bora-orange transition-colors">
                    →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/admin/usuarios" className="group">
              <div className="bg-black/30 p-6 rounded-lg border border-bora-orange/10 hover:border-bora-orange/30 transition-all hover:bg-black/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bebas text-bora-orange mb-2">Usuarios</h3>
                    <p className="text-gray-400 font-unbounded text-sm">Administra el equipo</p>
                  </div>
                  <span className="text-bora-orange/50 group-hover:text-bora-orange transition-colors">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 p-6 rounded-lg border border-bora-orange/10">
              <h3 className="text-xl font-bebas text-bora-orange mb-4">Ventas del Día</h3>
              <p className="text-3xl font-bebas text-bora-yellow">$0.00</p>
              <p className="text-gray-400 font-unbounded text-xs mt-2">vs ayer: --</p>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-bora-orange/10">
              <h3 className="text-xl font-bebas text-bora-orange mb-4">Pedidos Pendientes</h3>
              <p className="text-3xl font-bebas text-bora-yellow">0</p>
              <p className="text-gray-400 font-unbounded text-xs mt-2">actualizado hace 1 min</p>
            </div>

            <div className="bg-black/30 p-6 rounded-lg border border-bora-orange/10">
              <h3 className="text-xl font-bebas text-bora-orange mb-4">Productos Bajos</h3>
              <p className="text-3xl font-bebas text-bora-yellow">0</p>
              <p className="text-gray-400 font-unbounded text-xs mt-2">necesitan atención</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
