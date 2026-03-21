import React from "react";
import { COLORS } from "@/lib/constants/colors";
import { Button } from "../ui";

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

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-12">
      <h2
        className="text-xl font-semibold mb-6"
        style={{ color: COLORS.textHeading }}
      >
        Filter by Category
      </h2>

      {/* Desktop Filter - Horizontal */}
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

      {/* Mobile Filter - Dropdown */}
      <div className="md:hidden">
        <select
          value={selectedCategory}
          onChange={(e) =>
            onCategoryChange(e.target.value as CategoryOption["value"])
          }
          className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-opacity-50"
          style={{
            backgroundColor: COLORS.bgSecondary,
            color: COLORS.textBody,
            borderColor: COLORS.accentPrimary,
          }}
        >
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Separate Button Component for better readability
interface CategoryButtonProps {
  category: CategoryOption;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: isSelected ? COLORS.accentPrimary : COLORS.bgSecondary,
        color: COLORS.textBody,
        border: isSelected ? "none" : `1px solid ${COLORS.accentPrimary}`,
      }}
    >
      {category.label}
    </button>
  );
};
