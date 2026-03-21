import React from "react";
import Image from "next/image";
import { COLORS } from "@/lib/constants/colors";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);

const ProductDetails = ({
  name,
  price,
  category,
}: {
  name: string;
  price: number;
  category: string;
}) => (
  <div className="flex-grow">
    <span
      className="text-xs uppercase tracking-wide"
      style={{ color: COLORS.textHeading, opacity: 0.7 }}
    >
      {category}
    </span>
    <h3
      className="text-lg font-semibold mt-1"
      style={{ color: COLORS.textBody }}
    >
      {name}
    </h3>
    <p className="text-xl font-bold mt-2" style={{ color: COLORS.textHeading }}>
      ₹{price.toFixed(2)}
    </p>
  </div>
);

const QuantityControls = ({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: COLORS.productBackdrop,
          color: COLORS.textBody,
        }}
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-bold">−</span>
      </button>

      <span
        className="w-12 text-center font-semibold"
        style={{ color: COLORS.textBody }}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          backgroundColor: COLORS.accentPrimary,
          color: COLORS.textBody,
        }}
        aria-label="Increase quantity"
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>

    <button
      onClick={onRemove}
      className="text-sm underline hover:opacity-70 transition-opacity"
      style={{ color: COLORS.textBody, opacity: 0.6 }}
    >
      Remove
    </button>
  </div>
);

const Subtotal = ({ price, quantity }: { price: number; quantity: number }) => (
  <div className="text-right hidden md:block">
    <p
      className="text-sm mb-1"
      style={{ color: COLORS.textBody, opacity: 0.7 }}
    >
      Subtotal
    </p>
    <p className="text-2xl font-bold" style={{ color: COLORS.textHeading }}>
      ₹{(price * quantity).toFixed(2)}
    </p>
  </div>
);

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div
      className="rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: COLORS.bgSecondary }}
    >
      <div className="flex gap-4 items-center">
        <ProductImage src={item.image} alt={item.name} />
        <ProductDetails
          name={item.name}
          price={item.price}
          category={item.category}
        />
        <QuantityControls
          quantity={item.quantity}
          onIncrease={() => handleQuantityChange(item.quantity + 1)}
          onDecrease={() => handleQuantityChange(item.quantity - 1)}
          onRemove={() => onRemove(item.id)}
        />
        <Subtotal price={item.price} quantity={item.quantity} />
      </div>
    </div>
  );
};
