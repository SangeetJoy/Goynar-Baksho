// CollectionProductCard is now a thin re-export of the unified ProductCard
// with collections-specific defaults baked in.
import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "../ui/ProductCard";

interface CollectionProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  product,
  onAddToCart,
}) => (
  <ProductCard
    product={product}
    onAddToCart={onAddToCart}
    showPrice={true}
    showBadges={true}
    showCategory={true}
  />
);
