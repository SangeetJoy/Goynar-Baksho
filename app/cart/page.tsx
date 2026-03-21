"use client";

import React from "react";
import { CartContent } from "@/components/sections/cart/CartContent";
import { CartHero } from "@/components/sections/cart/CartHero";
import { COLORS } from "@/lib/constants/colors";

export default function CartPage() {
  return (
    <div style={{ backgroundColor: COLORS.bgPrimary, minHeight: "100vh" }}>
      <CartHero />
      <CartContent />
    </div>
  );
}
