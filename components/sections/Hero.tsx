import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { CategoryCard } from '../ui/CategoryCard';
import { CATEGORIES } from '@/lib/data/categories';
import { COLORS } from '@/lib/constants/colors';

export const Hero: React.FC = () => {
  return (
    <section className="relative pb-20 pt-8 lg:pt-12" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left - Hero Image with dusty rose background */}
          <div className="relative">
            <div
              className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl"
              style={{ backgroundColor: COLORS.dustyRose }}
            >
              <Image
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop"
                alt="Elegant woman wearing gold jewelry"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="relative text-center lg:text-left space-y-8">
            <h1
              className="text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight"
              style={{ color: COLORS.warmEspresso }}
            >
              Elegance, Redefined
            </h1>
            <Button variant="primary" size="lg">
              LLOET NOW
            </Button>
          </div>
        </div>
        
        {/* Category Cards - Positioned to appear floating at bottom */}
        <div className="flex flex-wrap justify-center lg:justify-end gap-4 -mt-8 lg:-mt-16 relative z-10">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => console.log(`Navigate to ${category.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
