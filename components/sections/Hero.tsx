import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { COLORS } from '@/lib/constants/colors';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-12 lg:py-20" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div
              className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
              style={{ backgroundColor: COLORS.dustyRose }}
            >
              <Image
                src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=800&h=1000&fit=crop"
                alt="Elegant jewelry model"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="text-center lg:text-left">
            <h1
              className="text-5xl lg:text-7xl font-serif mb-8 leading-tight"
              style={{ color: COLORS.warmEspresso }}
            >
              Elegance, Redefined
            </h1>
            <Button variant="primary" size="lg" className="mb-8">
              LLOET NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
