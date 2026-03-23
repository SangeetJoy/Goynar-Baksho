import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import Link from "next/link";

interface SectionProductGridProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  showPrice?: boolean;
  showBadges?: boolean;
  showCategory?: boolean;
}

export const SectionProductGrid: React.FC<SectionProductGridProps> = ({
  title,
  products,
  onAddToCart,
  showPrice = true,
  showBadges = false,
  showCategory = false,
}) => (
  <section className="py-12 md:py-16 bg-brand-bg">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 md:mb-12 text-center lg:text-left text-brand-heading">
        {title}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (
          <Link href={`/product/${product.slug}`}>
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              showPrice={showPrice}
              showBadges={showBadges}
              showCategory={showCategory}
            />
          </Link>
        ))}
      </div>
    </div>
  </section>
);
