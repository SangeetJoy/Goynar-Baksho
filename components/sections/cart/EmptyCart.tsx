import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COLORS } from "@/lib/constants/colors";

const CartIcon = () => (
  <div
    className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center"
    style={{ backgroundColor: COLORS.bgSecondary }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={COLORS.textHeading}
      className="w-16 h-16"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  </div>
);

export const EmptyCart: React.FC = () => (
  <section
    className="py-20 min-h-[60vh] flex items-center justify-center"
    style={{ backgroundColor: COLORS.bgPrimary }}
  >
    <div className="container mx-auto px-4 text-center">
      <CartIcon />

      <h2
        className="text-3xl lg:text-4xl font-serif mb-4"
        style={{ color: COLORS.textHeading }}
      >
        Your Cart is Empty
      </h2>

      <p
        className="text-lg mb-8 max-w-md mx-auto"
        style={{ color: COLORS.textBody, opacity: 0.7 }}
      >
        Looks like you haven't added any items to your cart yet. Start shopping
        to fill it up!
      </p>

      <Link href="/collections">
        <Button variant="primary" size="lg">
          Continue Shopping
        </Button>
      </Link>
    </div>
  </section>
);
