"use client";

import React from "react";
import { useCartContext } from "@/providers/CartProvider";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";
import { COLORS } from "@/lib/constants/colors";

export const CartContent: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCartContext();

  // Show empty cart if no items
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section
      className="py-12 pb-20"
      style={{ backgroundColor: COLORS.bgPrimary }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - 2/3 width */}
          <div className="lg:col-span-2 space-y-4">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: COLORS.textHeading }}
            >
              Items in Cart ({cartItems.length})
            </h2>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Cart Summary - 1/3 width */}
          <div className="lg:col-span-1">
            <CartSummary
              total={getCartTotal()}
              itemCount={cartItems.length}
              onClearCart={clearCart}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
