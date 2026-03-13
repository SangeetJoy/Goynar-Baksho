import React from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Button } from './Button';
import { COLORS } from '@/lib/constants/colors';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  showPrice = true,
}) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.warmEspresso }}>
          {product.name}
        </h3>
        {showPrice && (
          <p className="text-2xl font-bold mb-4" style={{ color: COLORS.warmEspresso }}>
            ${product.price.toFixed(2)}
          </p>
        )}
        {onAddToCart && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAddToCart(product)}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};
