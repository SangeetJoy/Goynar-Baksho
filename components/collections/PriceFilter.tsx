import React from "react";
import { PRICE_RANGES, PriceRange } from "../../lib/hooks/useProductFilters";

interface PriceFilterProps {
  selectedPriceRange: PriceRange | "all";
  onPriceRangeChange: (range: PriceRange | "all") => void;
}

interface PriceButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const PriceButton: React.FC<PriceButtonProps> = ({
  label,
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
    {label}
  </button>
);

export const PriceFilter: React.FC<PriceFilterProps> = ({
  selectedPriceRange,
  onPriceRangeChange,
}) => {
  // Determine which option is currently selected for the <select>
  const selectedIndex = PRICE_RANGES.findIndex((opt) => {
    if (opt.value === "all" && selectedPriceRange === "all") return true;
    if (
      typeof opt.value !== "string" &&
      typeof selectedPriceRange !== "string" &&
      opt.value.min === selectedPriceRange.min &&
      opt.value.max === selectedPriceRange.max
    )
      return true;
    return false;
  });

  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-brand-heading">
        Filter by Price
      </h2>

      {/* Desktop — horizontal pill row */}
      <div className="hidden md:flex flex-wrap gap-4">
        {PRICE_RANGES.map((option, idx) => (
          <PriceButton
            key={idx}
            label={option.label}
            isSelected={idx === selectedIndex}
            onClick={() => onPriceRangeChange(option.value)}
          />
        ))}
      </div>

      {/* Mobile — dropdown */}
      <select
        value={selectedIndex}
        onChange={(e) =>
          onPriceRangeChange(PRICE_RANGES[Number(e.target.value)].value)
        }
        className="md:hidden w-full px-4 py-3 rounded-lg bg-brand-card text-white border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50"
      >
        {PRICE_RANGES.map((option, idx) => (
          <option key={idx} value={idx}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
