'use client';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Taco de Bistec",
    price: 30,
    image: "/images/bistec.png",
    description: "Jugosa carne de res marinada"
  },
  {
    id: 2,
    name: "Taco de Pollo",
    price: 30,
    image: "/images/pollo.png",
    description: "Pollo marinado a la plancha"
  },
  {
    id: 3,
    name: "Taco de Longaniza",
    price: 30,
    image: "/images/longaniza .png",
    description: "Auténtica longaniza artesanal"
  }
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-bora-black">
      <div className="relative pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl md:text-7xl font-bebas text-bora-yellow text-center mb-12 animate-float">
            Nuestros Productos
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-black/80 rounded-lg overflow-hidden hover:bg-black/90 transition-all duration-300 flex flex-col items-center justify-center"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-48 h-48 object-contain animate-float hover:animate-flame cursor-pointer transition-transform duration-300 hover:scale-110"
                />
                <div className="p-4 text-center">
                  <h2 className="text-2xl font-bebas text-bora-yellow mb-2">{product.name}</h2>
                  <p className="text-2xl font-yeseva text-bora-yellow mb-2">${product.price}</p>
                  <p className="text-base font-unbounded text-gray-300 line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
