import React from 'react';
import { Button } from '../ui/Button';
import { COLORS } from '@/lib/constants/colors';

export const OurStory: React.FC = () => {
  return (
    <section className="py-16" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl ml-auto bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
          <h2
            className="text-4xl lg:text-5xl font-serif mb-6"
            style={{ color: COLORS.warmEspresso }}
          >
            Our Story
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: COLORS.warmEspresso, opacity: 0.8 }}
          >
            Who yet mean andint gotit collet of mainstream howk ovenelly to homeperifest behalf. 5 Kamus ako hidahout horeas . No comnou guit immeralise yod imbollientsary polinte illudronship herne jewellery persalt sparkles.
          </p>
          <Button variant="primary" size="md">
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};
