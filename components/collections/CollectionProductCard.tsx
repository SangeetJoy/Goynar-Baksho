import React from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { COLORS } from "@/lib/constants/colors";

interface CollectionProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}
interface BadgeConfig {
  label: string;
  backgroundColor: string;
  color: string;
}

const BADGE_STYLES: Record<string, BadgeConfig> = {
  bestseller: {
    label: "BESTSELLER",
    backgroundColor: COLORS.accentPrimary,
    color: COLORS.textBody,
  },
  newArrival: {
    label: "NEW",
    backgroundColor: COLORS.textHeading,
    color: COLORS.bgPrimary,
  },
};

const ProductBadges: React.FC<{
  bestseller?: boolean;
  newArrival?: boolean;
}> = ({ bestseller, newArrival }) => {
  const activeBadges = [
    bestseller && BADGE_STYLES.bestseller,
    newArrival && BADGE_STYLES.newArrival,
  ].filter(Boolean) as BadgeConfig[];

  if (!activeBadges.length) return null;

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {activeBadges.map(({ label, backgroundColor, color }) => (
        <span
          key={label}
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor, color }}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

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

const ProductInfo: React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
}> = ({ product, onAddToCart }) => (
  <div className="p-6 flex flex-col flex-grow">
    <span
      className="text-xs uppercase tracking-wide mb-2"
      style={{ color: COLORS.textHeading, opacity: 0.8 }}
    >
      {product.category}
    </span>

    <h3
      className="text-lg font-semibold mb-3 flex-grow"
      style={{ color: COLORS.textBody }}
    >
      {product.name}
    </h3>

    <div className="space-y-3">
      <p className="text-2xl font-bold" style={{ color: COLORS.textHeading }}>
        ₹{product.price.toFixed(2)}
      </p>
      <Button
        variant="primary"
        size="sm"
        onClick={() => onAddToCart(product)}
        className="w-full"
      >
        Add to Cart
      </Button>
    </div>
  </div>
);

export const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
      style={{ backgroundColor: COLORS.productBackdrop }}
    >
      <ProductImage
        src={product.image}
        alt={product.name}
        bestseller={product.bestseller}
        newArrival={product.newArrival}
      />
      <ProductInfo product={product} onAddToCart={onAddToCart} />
    </div>
  );
};
