"use client";

import React from "react";
import { ProductCard } from "../ui/ProductCard";
import { PRODUCTS } from "@/lib/data/products";
import { useCartContext } from "@/providers/CartProvider";

export const NewArrivals: React.FC = () => {
  const { addToCart } = useCartContext();
  const newArrivals = PRODUCTS.filter((p) => p.newArrival);

  return (
    <section className="py-16 bg-brand-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-serif mb-12 text-center lg:text-left text-brand-heading">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              showPrice={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
