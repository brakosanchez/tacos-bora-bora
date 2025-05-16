'use client';

import { products, Product } from '../products/data/products';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-bora-black">
      <div className="relative pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl md:text-7xl font-bebas text-bora-yellow text-center mb-12 animate-float">
            Nuestros Productos
          </h1>
          
          {/* Tacos Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {products
              .filter((product: Product) => product.category === "Tacos")
              .map((product: Product) => (
                <div 
                  key={product.id} 
                  className="group relative bg-bora-black/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-bora-black/40 transition-all duration-300 flex flex-col items-center"
                >
                  <div className="relative w-full h-64 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bebas text-2xl text-bora-yellow mb-2">{product.name}</h3>
                    <p className="font-yeseva text-xl text-bora-yellow">${product.price}</p>
                    <p className="font-unbounded text-bora-white/70 mt-4">{product.description}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Resto de productos */}
          <div className="mt-16">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="px-4 py-2 rounded-full bg-bora-black/40 text-bora-white/70 hover:text-bora-white hover:bg-bora-orange/20 transition-all duration-300">
                Especialidades
              </button>
              <button className="px-4 py-2 rounded-full bg-bora-black/40 text-bora-white/70 hover:text-bora-white hover:bg-bora-orange/20 transition-all duration-300">
                Extras
              </button>
              <button className="px-4 py-2 rounded-full bg-bora-black/40 text-bora-white/70 hover:text-bora-white hover:bg-bora-orange/20 transition-all duration-300">
                Salsas
              </button>
              <button className="px-4 py-2 rounded-full bg-bora-black/40 text-bora-white/70 hover:text-bora-white hover:bg-bora-orange/20 transition-all duration-300">
                Refrescos
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter((product: Product) => product.category !== "Tacos")
                .map((product: Product) => (
                  <div 
                    key={product.id} 
                    className="group relative bg-bora-black/30 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-bora-black/40 transition-all duration-300 flex flex-col items-center"
                  >
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="font-bebas text-2xl text-bora-yellow mb-2">{product.name}</h3>
                          <p className="font-yeseva text-xl text-bora-yellow">${product.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <p className="font-unbounded text-bora-white/70 line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
