import React from 'react';
import { Category } from '@/lib/types';
import { COLORS } from '@/lib/constants/colors';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl px-8 py-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 min-w-[180px]"
    >
      <h3 className="text-xl font-semibold" style={{ color: COLORS.warmEspresso }}>
        {category.name}
      </h3>
    </button>
  );
};
