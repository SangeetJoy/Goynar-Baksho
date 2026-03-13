import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { CategoryCard } from '../ui/CategoryCard';
import { CATEGORIES } from '@/lib/data/categories';
import { COLORS } from '@/lib/constants/colors';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-8 lg:py-12" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left - Hero Image with taller aspect ratio */}
          <div className="relative">
            <div
              className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[3/5] rounded-[3rem] overflow-hidden shadow-2xl"
              style={{ backgroundColor: COLORS.dustyRose }}
            >
              <Image
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=1000&fit=crop"
                alt="Elegant woman wearing gold jewelry"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Category Cards - Absolutely positioned at bottom-left of hero image */}
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 flex flex-wrap gap-3 z-10">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => console.log(`Navigate to ${category.slug}`)}
                />
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="relative text-center lg:text-left space-y-8 lg:pt-12">
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
      </div>
    </section>
  );
};
