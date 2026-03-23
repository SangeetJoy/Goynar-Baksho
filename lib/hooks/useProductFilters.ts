import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { Product } from "@/lib/types";

export type CategoryFilter =
  | "all"
  | "necklace"
  | "bracelet"
  | "ring"
  | "earring";

export type PriceRange = {
  min: number;
  max: number;
};

export const PRICE_RANGES: { label: string; value: PriceRange | "all" }[] = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹500", value: { min: 0, max: 499 } },
  { label: "₹500 – ₹999", value: { min: 500, max: 999 } },
  { label: "₹1,000 – ₹1,999", value: { min: 1000, max: 1999 } },
  { label: "₹2,000+", value: { min: 2000, max: Infinity } },
];

type UseProductFiltersReturn = {
  selectedCategory: CategoryFilter;
  selectedPriceRange: PriceRange | "all";
  filteredProducts: Product[];
  handleCategoryChange: (category: CategoryFilter) => void;
  handlePriceRangeChange: (range: PriceRange | "all") => void;
};

export function useProductFilters(): UseProductFiltersReturn {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    PriceRange | "all"
  >("all");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        selectedPriceRange === "all" ||
        (product.price >= selectedPriceRange.min &&
          product.price <= selectedPriceRange.max);

      return matchesCategory && matchesPrice;
    });
  }, [selectedCategory, selectedPriceRange]);

  const handleCategoryChange = (category: CategoryFilter) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range: PriceRange | "all") => {
    setSelectedPriceRange(range);
  };

  return {
    selectedCategory,
    selectedPriceRange,
    filteredProducts,
    handleCategoryChange,
    handlePriceRangeChange,
  };
}
