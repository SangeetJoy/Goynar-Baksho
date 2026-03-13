'use client';

import React from 'react';
import { CategoryCard } from '../ui/CategoryCard';
import { CATEGORIES } from '@/lib/data/categories';
import { COLORS } from '@/lib/constants/colors';

export const Categories: React.FC = () => {
  return (
    <section className="py-12" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6">
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
