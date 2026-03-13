'use client';

import React from 'react';
import { ProductCard } from '../ui/ProductCard';
import { PRODUCTS } from '@/lib/data/products';
import { useCart } from '@/lib/hooks/useCart';
import { COLORS } from '@/lib/constants/colors';

export const NewArrivals: React.FC = () => {
  const { addToCart } = useCart();
  const newArrivals = PRODUCTS.filter((p) => p.newArrival);

  return (
    <section className="py-16" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl lg:text-5xl font-serif mb-12 text-center lg:text-left"
          style={{ color: COLORS.warmEspresso }}
        >
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              showPrice={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
