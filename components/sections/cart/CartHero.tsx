import React from "react";

export const CartHero: React.FC = () => (
  <section className="py-12 lg:py-16 bg-brand-bg">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl lg:text-5xl font-serif uppercase tracking-wide text-brand-heading">
        Shopping Cart
      </h1>
      <p className="text-base lg:text-lg mt-4 max-w-2xl mx-auto text-white opacity-80">
        Review your selected items and proceed to checkout
      </p>
    </div>
  </section>
);
