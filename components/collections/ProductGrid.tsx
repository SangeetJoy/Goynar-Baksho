import React from "react";
import { Product } from "@/lib/types";
import { CollectionProductCard } from "./CollectionProductCard";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-white opacity-60">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {products.map((product) => (
        <Link href={`/product/${product.slug}`}>
          <CollectionProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        </Link>
      ))}
    </div>
  );
};
