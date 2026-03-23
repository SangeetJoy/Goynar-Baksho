"use client";

import React from "react";
import { FilterSidebar } from "@/components/collections/FilterSidebar";
import { ProductGrid } from "@/components/collections/ProductGrid";
import { useCartContext } from "@/providers/CartProvider";
import { useProductFilters } from "@/lib/hooks/useProductFilters";
import { Product } from "@/lib/types";

export const CollectionsContent: React.FC = () => {
  const { addToCart, cartItems } = useCartContext();

  const {
    selectedCategory,
    selectedPriceRange,
    filteredProducts,
    handleCategoryChange,
    handlePriceRangeChange,
  } = useProductFilters();

  console.log({ cartItems });

  const handleAddToCart = (product: Product) => {
    if (!product.isAddedToCart) {
      product.isAddedToCart = true;
      addToCart(product);
    }
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <section className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Sidebar — handles its own mobile/desktop rendering */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            productCount={filteredProducts.length}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop product count */}
            <p
              className="hidden md:block text-sm mb-8"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>

            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
