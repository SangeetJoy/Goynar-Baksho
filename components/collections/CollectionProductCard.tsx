import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface CollectionProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
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
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {active.map(({ label, className }) => (
        <span
          key={label}
          className={`px-3 py-1 rounded-full text-xs font-bold ${className}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

// ─── Image block ──────────────────────────────────────────────────────────────
const ProductImage: React.FC<{
  src: string;
  alt: string;
  bestseller?: boolean;
  newArrival?: boolean;
}> = ({ src, alt, bestseller, newArrival }) => (
  <div className="aspect-square relative overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <ProductBadges bestseller={bestseller} newArrival={newArrival} />
  </div>
);

// ─── Info block ───────────────────────────────────────────────────────────────
const ProductInfo: React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
}> = ({ product, onAddToCart }) => (
  <div className="p-6 flex flex-col flex-grow">
    <span className="text-xs uppercase tracking-wide mb-2 text-brand-heading opacity-80">
      {product.category}
    </span>
    <h3 className="text-lg font-semibold mb-3 flex-grow text-white">
      {product.name}
    </h3>
    <div className="space-y-3">
      <p className="text-2xl font-bold text-brand-heading">
        ₹{product.price.toFixed(2)}
      </p>
      <Button
        variant="primary"
        size="sm"
        onClick={() => onAddToCart(product)}
        className="w-full"
      >
        {product.isAddedToCart ? "Added to Cart" : "Add to Cart"}
      </Button>
    </div>
  </div>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
export const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  product,
  onAddToCart,
}) => (
  <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col bg-[#5C3D41]">
    <ProductImage
      src={product.image}
      alt={product.name}
      bestseller={product.bestseller}
      newArrival={product.newArrival}
    />
    <ProductInfo product={product} onAddToCart={onAddToCart} />
  </div>
);
