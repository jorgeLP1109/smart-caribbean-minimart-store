import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import type { Metadata, ResolvingMetadata } from 'next';

const prisma = new PrismaClient();

// Definimos un tipo para los props de forma clara
type Props = {
  params: { productId: string }
}

async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Usamos el tipo 'Props' para ser explícitos
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const product = await getProduct(params.productId);
    
    if (!product) {
        return { title: 'Product Not Found' };
    }
    
    return {
        title: `${product.name} | Smart Caribbean Minimart`,
        description: product.description,
    };
}

// Usamos el tipo 'Props' aquí también
export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.productId);

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <p>The product you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="flex flex-col">
                {product.category && <p className="text-sm text-gray-500 uppercase">{product.category.replace(/-/g, ' ')}</p>}
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-4 text-3xl font-bold text-brand-orange">${product.price.toFixed(2)}</p>
                
                <div className="mt-2">
                    {product.stock > 0 ? (
                        <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
                    ) : (
                        <span className="text-red-600 font-semibold">Out of Stock</span>
                    )}
                </div>

                <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800">Description</h3>
                <p className="mt-2 text-gray-600">
                    {product.description || 'No description available.'}
                </p>
                </div>

                <div className="mt-auto pt-8">
                    {product.stock > 0 ? (
                        <AddToCartButton product={product} />
                    ) : (
                        <button className="w-full py-3 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed" disabled>
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}