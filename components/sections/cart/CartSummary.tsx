import React from "react";
import { Button } from "@/components/ui/Button";
import { COLORS } from "@/lib/constants/colors";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onClearCart: () => void;
}

const SummaryRow = ({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <div className="flex justify-between">
    <span style={{ color: COLORS.textBody, opacity: 0.8 }}>{label}</span>
    <span style={{ color: valueColor ?? COLORS.textBody }}>{value}</span>
  </div>
);

const TotalRow = ({ finalTotal }: { finalTotal: number }) => (
  <div
    className="pt-4 border-t flex justify-between items-center"
    style={{ borderColor: COLORS.productBackdrop }}
  >
    <span
      className="text-xl font-semibold"
      style={{ color: COLORS.textHeading }}
    >
      Total
    </span>
    <span className="text-2xl font-bold" style={{ color: COLORS.textHeading }}>
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
      className="w-full py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
      style={{
        backgroundColor: "transparent",
        color: COLORS.textBody,
        border: `1px solid ${COLORS.productBackdrop}`,
      }}
    >
      Clear Cart
    </button>
  </div>
);

const FooterNote = () => (
  <div
    className="mt-6 pt-6 border-t"
    style={{ borderColor: COLORS.productBackdrop }}
  >
    <p
      className="text-xs text-center"
      style={{ color: COLORS.textBody, opacity: 0.6 }}
    >
      Free shipping on all orders • Secure checkout
    </p>
  </div>
);

export const CartSummary: React.FC<CartSummaryProps> = ({
  total,
  itemCount,
  onClearCart,
}) => {
  const tax = total * 0.18; // 18% GST
  const shipping = 0; // Free shipping
  const finalTotal = total + tax + shipping;

  return (
    <div
      className="rounded-2xl p-6 sticky top-24"
      style={{ backgroundColor: COLORS.bgSecondary }}
    >
      <h3
        className="text-2xl font-serif mb-6"
        style={{ color: COLORS.textHeading }}
      >
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        <SummaryRow
          label={`Subtotal (${itemCount} items)`}
          value={`₹${total.toFixed(2)}`}
        />
        <SummaryRow
          label="Shipping"
          value="FREE"
          valueColor={COLORS.accentPrimary}
        />
        <SummaryRow label="Tax (GST 18%)" value={`₹${tax.toFixed(2)}`} />
        <TotalRow finalTotal={finalTotal} />
      </div>

      <ActionButtons onClearCart={onClearCart} />
      <FooterNote />
    </div>
  );
};
