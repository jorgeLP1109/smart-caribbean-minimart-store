// archivo: src/app/page.tsx

import { PrismaClient, Product } from '@prisma/client';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/config/site';
import HeroBanner from '@/components/HeroBanner';
// import CategoryShowcase from '@/components/CategoryShowcase'; // <-- LÍNEA ELIMINADA

// ... (El resto del archivo no cambia y es correcto)

// Función para obtener los datos desde el servidor. Se ejecuta en el servidor.
async function getProducts(): Promise<Product[]> {
  const prisma = new PrismaClient();
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

// Helper para agrupar productos por categoría, normalizando a minúsculas
function groupProductsByCategory(products: Product[]): Record<string, Product[]> {
  return products.reduce((acc, product) => {
    const categoryKey = (product.category || 'uncategorized').toLowerCase();
    if (!acc[categoryKey]) {
      acc[categoryKey] = [];
    }
    acc[categoryKey].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
}

// El componente de la página principal ahora es un Server Component (async)
export default async function HomePage() {
  const products = await getProducts();
  const groupedProducts = groupProductsByCategory(products);

  return (
    <div className="space-y-12">
      {/* 1. Componente del Hero Banner */}
      <HeroBanner />
      
      {/* 2. Componente para destacar categorías (ELIMINADO TEMPORALMENTE) */}
      {/* <CategoryShowcase /> */}

      {/* 3. Sección principal de productos */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
        </div>
        
        {/* Iteramos sobre nuestra lista oficial de categorías para mantener el orden */}
        {categories.map((category) => {
          const productsInCategory = groupedProducts[category.value];
          
          if (!productsInCategory || productsInCategory.length === 0) {
            return null;
          }

          return (
            <section key={category.value} id={category.value} className="py-12 scroll-mt-20">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b-2 border-brand-orange pb-2">
                {category.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {productsInCategory.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}