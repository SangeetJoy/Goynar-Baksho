"use client";

import React from "react";
import { PRODUCTS } from "@/lib/data/products";
import { useCartContext } from "@/providers/CartProvider";
import { SectionProductGrid } from "../ui/SectionProductGrid";

export const Bestsellers: React.FC = () => {
  const { addToCart } = useCartContext();
  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

  return (
    <SectionProductGrid
      title="Bestsellers"
      products={bestsellers}
      onAddToCart={addToCart}
      showPrice={true}
      showBadges={true}
      showCategory={true}
    />
  );
};
