"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { CategoryFilter } from "@/components/collections/CategoryFilter";
import { ProductGrid } from "@/components/collections/ProductGrid";
import { useCartContext } from "@/providers/CartProvider";
import { Product } from "@/lib/types";

type CategoryFilter = "all" | "necklace" | "bracelet" | "ring" | "earring";

export const CollectionsContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const { addToCart, cartItems } = useCartContext();

  console.log({ cartItems });

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return PRODUCTS;
    }
    return PRODUCTS.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category: CategoryFilter) => {
    setSelectedCategory(category);
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    if (!product.isAddedToCart) {
      product.isAddedToCart = true; // Add the `isAdded` property to the product object
      addToCart(product);
    }
    // You can add a toast notification here later
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <section className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Product Count */}
        <div className="mb-8">
          <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
};
