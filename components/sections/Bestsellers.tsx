'use client';

import React from 'react';
import Image from 'next/image';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';
import { PRODUCTS } from '@/lib/data/products';
import { useCart } from '@/lib/hooks/useCart';
import { COLORS } from '@/lib/constants/colors';

export const Bestsellers: React.FC = () => {
  const { addToCart } = useCart();
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 3);

  return (
    <section className="py-16" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl lg:text-5xl font-serif mb-12 text-center lg:text-left"
          style={{ color: COLORS.textHeading }}
        >
          Bestsellers
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Large Featured Image */}
          <div className="lg:col-span-1">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.accentPrimary }}>
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop"
                alt="Featured bestseller"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Cards */}
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              showPrice={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
