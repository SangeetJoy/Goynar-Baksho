'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/lib/data/products';
import { CategoryFilter } from '@/components/collections/CategoryFilter';
import { ProductGrid } from '@/components/collections/ProductGrid';
import { useCart } from '@/lib/hooks/useCart';
import { Product } from '@/lib/types';

type CategoryFilter = 'all' | 'necklace' | 'bracelet' | 'ring' | 'earring';

export const CollectionsContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const { addToCart } = useCart();

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
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
    addToCart(product);
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
          <p
            className="text-sm"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
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
