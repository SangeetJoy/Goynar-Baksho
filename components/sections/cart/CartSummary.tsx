import React from "react";
import { Button } from "@/components/ui/Button";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onClearCart: () => void;
}

const SummaryRow = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex justify-between">
    <span className="text-white opacity-80">{label}</span>
    <span className={highlight ? "text-brand-accent" : "text-white"}>
      {value}
    </span>
  </div>
);

const TotalRow = ({ finalTotal }: { finalTotal: number }) => (
  <div className="pt-4 border-t border-brand-mauve flex justify-between items-center">
    <span className="text-xl font-semibold text-brand-heading">Total</span>
    <span className="text-2xl font-bold text-brand-heading">
      ₹{finalTotal.toFixed(2)}
    </span>
  </div>
);

const ActionButtons = ({ onClearCart }: { onClearCart: () => void }) => (
  <div className="space-y-3">
    <Button variant="primary" size="md" className="w-full">
      Proceed to Checkout
    </Button>
    <button
      onClick={onClearCart}
      className="w-full py-3 rounded-full text-sm font-medium text-white border border-brand-mauve bg-transparent transition-all duration-300 hover:opacity-80"
    >
      Clear Cart
    </button>
  </div>
);

export const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  itemCount,
  onClearCart,
}) => {
  const tax = total * 0.18;
  const finalTotal = total + tax;

  return (
    <div className="rounded-2xl p-6 sticky top-24 bg-brand-card">
      <h3 className="text-2xl font-serif mb-6 text-brand-heading">
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        <SummaryRow
          label={`Subtotal (${itemCount} items)`}
          value={`₹${total.toFixed(2)}`}
        />
        <SummaryRow label="Shipping" value="FREE" highlight />
        <SummaryRow label="Tax (GST 18%)" value={`₹${tax.toFixed(2)}`} />
        <TotalRow finalTotal={finalTotal} />
      </div>

      <ActionButtons onClearCart={onClearCart} />

      <div className="mt-6 pt-6 border-t border-brand-mauve">
        <p className="text-xs text-center text-white opacity-60">
          Free shipping on all orders • Secure checkout
        </p>
      </div>
    </div>
  );
};
