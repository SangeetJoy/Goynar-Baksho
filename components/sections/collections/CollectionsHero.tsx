import React from 'react';
import { COLORS } from '@/lib/constants/colors';

export const CollectionsHero: React.FC = () => {
  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: COLORS.bgPrimary }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1
          className="text-5xl lg:text-6xl font-serif mb-4 uppercase tracking-wide"
          style={{ color: COLORS.textHeading }}
        >
          Our Collections
        </h1>
        <p
          className="text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ color: COLORS.textBody, opacity: 0.8 }}
        >
          Discover our exquisite collection of gold-plated jewelry, crafted with
          precision and designed to make you shine.
        </p>
      </div>
    </section>
  );
};
