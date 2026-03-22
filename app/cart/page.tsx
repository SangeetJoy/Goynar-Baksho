"use client";

import React from "react";
import { CartContent } from "@/components/sections/cart/CartContent";
import { CartHero } from "@/components/sections/cart/CartHero";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <CartHero />
      <CartContent />
    </div>
  );
}
