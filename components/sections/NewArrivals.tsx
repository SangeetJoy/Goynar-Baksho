"use client";

import React from "react";
import { PRODUCTS } from "@/lib/data/products";
import { useCartContext } from "@/providers/CartProvider";
import { SectionProductGrid } from "../ui/SectionProductGrid";

export const NewArrivals: React.FC = () => {
  const { addToCart } = useCartContext();
  const newArrivals = PRODUCTS.filter((p) => p.newArrival);

  return (
    <SectionProductGrid
      title="New Arrivals"
      products={newArrivals}
      onAddToCart={addToCart}
      showPrice={false}
      showBadges={true}
    />
  );
};
