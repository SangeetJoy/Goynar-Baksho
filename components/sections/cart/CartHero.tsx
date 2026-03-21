import React from "react";
import { COLORS } from "@/lib/constants/colors";

export const CartHero: React.FC = () => {
  return (
    <section
      className="py-12 lg:py-16"
      style={{ backgroundColor: COLORS.bgPrimary }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1
          className="text-4xl lg:text-5xl font-serif uppercase tracking-wide"
          style={{ color: COLORS.textHeading }}
        >
          Shopping Cart
        </h1>
        <p
          className="text-base lg:text-lg mt-4 max-w-2xl mx-auto"
          style={{ color: COLORS.textBody, opacity: 0.8 }}
        >
          Review your selected items and proceed to checkout
        </p>
      </div>
    </section>
  );
};
