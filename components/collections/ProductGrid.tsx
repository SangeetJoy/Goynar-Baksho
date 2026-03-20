import React from 'react';
import { Product } from '@/lib/types';
import { CollectionProductCard } from './CollectionProductCard';
import { COLORS } from '@/lib/constants/colors';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
}) => {
  // Show empty state if no products
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p
          className="text-xl"
          style={{ color: COLORS.textBody, opacity: 0.6 }}
        >
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <CollectionProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
