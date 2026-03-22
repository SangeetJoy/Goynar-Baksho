"use client";

import React from "react";
import { ProductCard } from "../ui/ProductCard";
import { PRODUCTS } from "@/lib/data/products";
import { useCartContext } from "@/providers/CartProvider";

export const Bestsellers: React.FC = () => {
  const { addToCart } = useCartContext();
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 3);

  return (
    <section className="py-16 bg-brand-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-serif mb-12 text-center lg:text-left text-brand-heading">
          Bestsellers
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              showPrice={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
