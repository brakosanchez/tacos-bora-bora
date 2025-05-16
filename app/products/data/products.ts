export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Bistec",
    price: 30,
    image: "/images/bistec.png",
    description: "Jugosa carne de res marinada con especias especiales",
    category: "Tacos"
  },
  {
    id: 2,
    name: "Pollo",
    price: 30,
    image: "/images/pollo.png",
    description: "Pollo marinado a la plancha con un toque especial de especias",
    category: "Tacos"
  },
  {
    id: 3,
    name: "Longaniza",
    price: 30,
    image: "/images/longaniza.png",
    description: "Auténtica longaniza artesanal con especias tradicionales",
    category: "Tacos"
  },
  {
    id: 4,
    name: "Aguja Norteña",
    price: 30,
    image: "/images/agujanortena.png",
    description: "Corte especial de res con un toque especial de especias",
    category: "Tacos"
  },
  {
    id: 5,
    name: "Campechano",
    price: 30,
    image: "/images/campechano.png",
    description: "Combinación de longaniza con bistec o pollo",
    category: "Tacos"
  },
  {
    id: 6,
    name: "Mixiote",
    price: 30,
    image: "/images/mixiote.png",
    description: "Tradicional mixiote de res con especias autóctonas",
    category: "Tacos"
  },
  {
    id: 7,
    name: "Cecina",
    price: 35,
    image: "/images/cecina.png",
    description: "Fina cecina de res con especias especiales",
    category: "Especialidades"
  },
  {
    id: 8,
    name: "Arrachera",
    price: 35,
    image: "/images/arrachera.png",
    description: "Corte premium de arrachera con especias especiales",
    category: "Especialidades"
  },
  {
    id: 9,
    name: "Kilo de Mixiote",
    price: 330,
    image: "/images/mixiote-kilo.png",
    description: "Mixiote de res para toda la familia",
    category: "Especialidades"
  },
  {
    id: 10,
    name: "Queso",
    price: 10,
    image: "/images/queso.png",
    description: "Queso fresco para acompañar tus tacos",
    category: "Extras"
  },
  {
    id: 11,
    name: "Consomé",
    price: 10,
    image: "/images/consome.png",
    description: "Consomé tradicional para acompañar tus tacos",
    category: "Extras"
  },
  {
    id: 12,
    name: "Consomé (1 litro)",
    price: 50,
    image: "/images/consome-litro.png",
    description: "Consomé tradicional en litro para toda la familia",
    category: "Extras"
  },
  {
    id: 13,
    name: "Salsa Verde (4oz)",
    price: 25,
    image: "/images/salsa-verde.png",
    description: "Salsa de tomate verde, chile serrano, cebolla y cilantro",
    category: "Salsas"
  },
  {
    id: 14,
    name: "Salsa Roja (4oz)",
    price: 25,
    image: "/images/salsa-roja.png",
    description: "Salsa de tomate, chile de árbol, cebolla y ajo",
    category: "Salsas"
  },
  {
    id: 15,
    name: "Salsa de Habanero (4oz)",
    price: 25,
    image: "/images/salsa-habanero.png",
    description: "Nuestra salsa más picante, solo para valientes",
    category: "Salsas"
  },
  {
    id: 16,
    name: "Chimichurri (4oz)",
    price: 25,
    image: "/images/chimichurri.png",
    description: "Salsa argentina de perejil, ajo, vinagre y aceite de oliva",
    category: "Salsas"
  },
  {
    id: 17,
    name: "Coca Cola",
    price: 20,
    image: "/images/coca-cola.png",
    description: "Refresco Coca Cola",
    category: "Refrescos"
  },
  {
    id: 18,
    name: "Sprite",
    price: 20,
    image: "/images/sprite.png",
    description: "Refresco Sprite",
    category: "Refrescos"
  },
  {
    id: 19,
    name: "Fanta",
    price: 20,
    image: "/images/fanta.png",
    description: "Refresco Fanta",
    category: "Refrescos"
  },
  {
    id: 20,
    name: "Delaware Punch",
    price: 20,
    image: "/images/delaware-punch.png",
    description: "Refresco Delaware Punch",
    category: "Refrescos"
  },
  {
    id: 21,
    name: "Boing Mango",
    price: 20,
    image: "/images/boing-mango.png",
    description: "Refresco Boing Mango",
    category: "Refrescos"
  },
  {
    id: 22,
    name: "Boing Guayaba",
    price: 20,
    image: "/images/boing-guayaba.png",
    description: "Refresco Boing Guayaba",
    category: "Refrescos"
  },
  {
    id: 23,
    name: "Mundet Manzana",
    price: 20,
    image: "/images/mundet-manzana.png",
    description: "Refresco Mundet Manzana",
    category: "Refrescos"
  },
  {
    id: 24,
    name: "Topo Chico",
    price: 25,
    image: "/images/topo-chico.png",
    description: "Agua mineral Topo Chico",
    category: "Agua Mineral"
  }
];
