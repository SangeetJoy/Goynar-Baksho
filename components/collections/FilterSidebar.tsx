"use client";

import React, { useState, useEffect } from "react";
import {
  CategoryFilter,
  PriceRange,
  PRICE_RANGES,
} from "../../lib/hooks/useProductFilters";

type CategoryOption = {
  value: CategoryFilter;
  label: string;
};

const CATEGORIES: CategoryOption[] = [
  { value: "all", label: "All Products" },
  { value: "necklace", label: "Necklaces" },
  { value: "earring", label: "Earrings" },
  { value: "bracelet", label: "Bracelets" },
  { value: "ring", label: "Rings" },
];

interface FilterSidebarProps {
  selectedCategory: CategoryFilter;
  selectedPriceRange: PriceRange | "all";
  onCategoryChange: (category: CategoryFilter) => void;
  onPriceRangeChange: (range: PriceRange | "all") => void;
  productCount: number;
}

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 text-white
      ${
        isSelected
          ? "bg-brand-accent"
          : "bg-transparent hover:bg-brand-card border border-transparent hover:border-brand-accent"
      }`}
  >
    {label}
  </button>
);

const SidebarContent: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange,
  productCount,
}) => {
  const selectedPriceIndex = PRICE_RANGES.findIndex((opt) => {
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
    <div className="flex flex-col gap-8">
      {/* Product count */}
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {productCount} product{productCount !== 1 ? "s" : ""}
      </p>

      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-brand-heading opacity-60">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <FilterButton
              key={cat.value}
              label={cat.label}
              isSelected={selectedCategory === cat.value}
              onClick={() => onCategoryChange(cat.value)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white opacity-10" />

      {/* Price */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-brand-heading opacity-60">
          Price Range
        </h3>
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map((opt, idx) => (
            <FilterButton
              key={idx}
              label={opt.label}
              isSelected={idx === selectedPriceIndex}
              onClick={() => onPriceRangeChange(opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const FilterSidebar: React.FC<FilterSidebarProps> = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const hasActiveFilters =
    props.selectedCategory !== "all" || props.selectedPriceRange !== "all";

  return (
    <>
      {/* ── Mobile: filter bar trigger ── */}
      <div className="md:hidden mb-6 flex items-center gap-4 justify-between">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-accent text-white text-sm font-medium transition-all duration-200 hover:bg-brand-accent"
        >
          {/* Filter icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-brand-accent border border-white" />
          )}
        </button>

        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          {props.productCount} product{props.productCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Mobile: slide-in drawer overlay ── */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setDrawerOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black opacity-60" />

          {/* Drawer panel */}
          <div
            className="relative ml-auto w-72 h-full overflow-y-auto p-6 bg-brand-card"
            style={{ boxShadow: "-4px 0 24px rgba(0,0,0,0.5)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-brand-heading">
                Filters
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-white opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Close filters"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <SidebarContent {...props} />

            {/* Apply button */}
            <div className="mt-8">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3 rounded-full bg-brand-accent text-white font-medium text-sm transition-all duration-200 hover:opacity-90"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop: sticky sidebar ── */}
      <aside className="hidden md:block w-56 flex-shrink-0">
        <div className="sticky top-8">
          <h2 className="text-lg font-semibold mb-6 text-brand-heading">
            Filters
          </h2>
          <SidebarContent {...props} />
        </div>
      </aside>
    </>
  );
};
