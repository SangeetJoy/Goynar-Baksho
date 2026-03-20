import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/lib/constants/colors';

interface CollectionProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
      style={{ backgroundColor: COLORS.productBackdrop }}
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {product.bestseller && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: COLORS.accentPrimary,
                color: COLORS.textBody,
              }}
            >
              BESTSELLER
            </span>
          )}
          {product.newArrival && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: COLORS.textHeading,
                color: COLORS.bgPrimary,
              }}
            >
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Tag */}
        <span
          className="text-xs uppercase tracking-wide mb-2"
          style={{ color: COLORS.textHeading, opacity: 0.8 }}
        >
          {product.category}
        </span>

        {/* Product Name */}
        <h3
          className="text-lg font-semibold mb-3 flex-grow"
          style={{ color: COLORS.textBody }}
        >
          {product.name}
        </h3>

        {/* Price and Button */}
        <div className="space-y-3">
          <p
            className="text-2xl font-bold"
            style={{ color: COLORS.textHeading }}
          >
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
    </div>
  );
};
