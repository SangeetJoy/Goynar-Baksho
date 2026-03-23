import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Button } from "./Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  /** Show price below name. Default: true */
  showPrice?: boolean;
  /** Show bestseller / new arrival badges. Default: false */
  showBadges?: boolean;
  /** Show category label above name. Default: false */
  showCategory?: boolean;
}

// ─── Badges ───────────────────────────────────────────────────────────────────
const BADGE_STYLES = {
  bestseller: { label: "BESTSELLER", className: "bg-brand-accent text-white" },
  newArrival: { label: "NEW", className: "bg-brand-heading text-brand-bg" },
} as const;

const ProductBadges: React.FC<{
  bestseller?: boolean;
  newArrival?: boolean;
}> = ({ bestseller, newArrival }) => {
  const active = [
    bestseller && BADGE_STYLES.bestseller,
    newArrival && BADGE_STYLES.newArrival,
  ].filter(Boolean) as { label: string; className: string }[];

  if (!active.length) return null;

  return (
    <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col gap-1 md:gap-2 z-10">
      {active.map(({ label, className }) => (
        <span
          key={label}
          className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold ${className}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  showPrice = true,
  showBadges = false,
  showCategory = false,
}) => (
  <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col bg-[#5C3D41]">
    {/* Image */}
    <div className="aspect-square relative overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {showBadges && (
        <ProductBadges
          bestseller={product.bestseller}
          newArrival={product.newArrival}
        />
      )}
    </div>

    {/* Info */}
    <div className="p-3 md:p-6 flex flex-col flex-grow text-center md:text-left">
      {showCategory && (
        <span className="text-[10px] md:text-xs uppercase tracking-wide mb-1 text-brand-heading opacity-80">
          {product.category}
        </span>
      )}
      <h3 className="text-sm md:text-lg font-semibold mb-2 flex-grow text-white leading-snug">
        {product.name}
      </h3>
      {showPrice && (
        <p className="text-base md:text-2xl font-bold mb-2 md:mb-4 text-brand-heading">
          ₹{product.price.toFixed(2)}
        </p>
      )}
      {onAddToCart && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => onAddToCart(product)}
          className="w-full text-xs md:text-sm"
        >
          {product.isAddedToCart ? "Added" : "Add to Cart"}
        </Button>
      )}
    </div>
  </div>
);
