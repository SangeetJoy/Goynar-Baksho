import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { COLORS } from '@/lib/constants/colors';
import { PRODUCTS } from '@/lib/data/products';

export const FeaturedCollection: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-16" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        {/* Hero Oval Image */}
        <div className="relative mb-12">
          <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-[50%] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&h=800&fit=crop"
              alt="Gold Plated Jewelry Collection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-30">
              <h2 className="text-white text-4xl lg:text-6xl font-serif mb-4 leading-tight px-4">
                Gold Plated<br />
                Jewelry Collection<br />
                Luxury Redefined
              </h2>
              <Button variant="primary" size="lg">
                Shop Now
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Collection Title */}
        <h3
          className="text-4xl lg:text-5xl font-serif mb-12 text-center"
          style={{ color: COLORS.warmEspresso }}
        >
          Featured Collection
        </h3>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
