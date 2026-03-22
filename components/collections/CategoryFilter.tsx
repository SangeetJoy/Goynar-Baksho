import React from "react";

type CategoryOption = {
  value: "all" | "necklace" | "bracelet" | "ring" | "earring";
  label: string;
};

const CATEGORIES: CategoryOption[] = [
  { value: "all", label: "All Products" },
  { value: "necklace", label: "Necklaces" },
  { value: "earring", label: "Earrings" },
  { value: "bracelet", label: "Bracelets" },
  { value: "ring", label: "Rings" },
];

interface CategoryFilterProps {
  selectedCategory: CategoryOption["value"];
  onCategoryChange: (category: CategoryOption["value"]) => void;
}

interface CategoryButtonProps {
  category: CategoryOption;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 text-white
      ${
        isSelected
          ? "bg-brand-accent border-none"
          : "bg-brand-card border border-brand-accent"
      }`}
  >
    {category.label}
  </button>
);

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => (
  <div className="mb-12">
    <h2 className="text-xl font-semibold mb-6 text-brand-heading">
      Filter by Category
    </h2>

    {/* Desktop — horizontal pill row */}
    <div className="hidden md:flex flex-wrap gap-4">
      {CATEGORIES.map((category) => (
        <CategoryButton
          key={category.value}
          category={category}
          isSelected={selectedCategory === category.value}
          onClick={() => onCategoryChange(category.value)}
        />
      ))}
    </div>

    {/* Mobile — dropdown */}
    <select
      value={selectedCategory}
      onChange={(e) =>
        onCategoryChange(e.target.value as CategoryOption["value"])
      }
      className="md:hidden w-full px-4 py-3 rounded-lg bg-brand-card text-white border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
    >
      {CATEGORIES.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  </div>
);
