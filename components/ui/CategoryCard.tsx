import React from "react";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="rounded-2xl px-8 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:scale-105 min-w-[180px] relative bg-brand-card shadow-[0_8px_32px_var(--color-accent-glow)]"
  >
    <h3 className="text-xl font-semibold text-brand-heading">
      {category.name}
    </h3>
  </button>
);
