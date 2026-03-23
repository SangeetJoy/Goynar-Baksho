"use client";

import React, { useState, useEffect } from "react";
import { buildWhatsAppCheckout, generateInvoicePDF } from "@/lib/utils";
import { Product } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = "details" | "whatsapp" | "confirmed";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: (Product & { quantity: number })[];
}

interface ReceiptData {
  orderId: string;
  ownerUrl: string;
  customerName: string;
  customerPhone: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.833L0 24l6.335-1.51A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.888.904-3.635-.235-.374A9.818 9.818 0 1112 21.818z" />
  </svg>
);

// ─── Step 1: Customer Details ─────────────────────────────────────────────────
interface DetailsStepProps {
  onSubmit: (name: string, phone: string) => void;
  onClose: () => void;
  cartTotal: number;
  itemCount: number;
}

const DetailsStep: React.FC<DetailsStepProps> = ({
  onSubmit,
  onClose,
  cartTotal,
  itemCount,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim()) e.phone = "Please enter your phone number";
    else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit Indian mobile number";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;
    onSubmit(name.trim(), formattedPhone);
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-transparent border-b py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors duration-200 ${
      hasError
        ? "border-red-400/60 focus:border-red-400"
        : "border-white/20 focus:border-brand-accent"
    }`;

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-accent mb-1">
            Step 1 of 2
          </p>
          <h2 className="font-serif text-2xl text-brand-heading">
            Your Details
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors mt-1"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Cart summary pill */}
      <div className="flex items-center justify-between bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-4 py-3 mb-8">
        <span className="text-sm text-white/70">
          {itemCount} item{itemCount !== 1 ? "s" : ""} in cart
        </span>
        <span className="font-semibold text-brand-heading text-sm">
          ₹{cartTotal.toFixed(2)}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: undefined }));
            }}
            className={inputClass(!!errors.name)}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Mobile Number (e.g. 9876543210)"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((p) => ({ ...p, phone: undefined }));
            }}
            className={inputClass(!!errors.phone)}
            maxLength={10}
          />
          {errors.phone && (
            <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-full bg-brand-accent text-white text-sm font-medium mt-2 hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </form>

      <p
        className="text-xs text-center mt-4"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Your details are only shared with the shop owner via WhatsApp.
      </p>
    </div>
  );
};

// ─── Step 2: WhatsApp Action ──────────────────────────────────────────────────
interface WhatsAppStepProps {
  receipt: ReceiptData;
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
  onSent: () => void;
  onClose: () => void;
}

const WhatsAppStep: React.FC<WhatsAppStepProps> = ({
  receipt,
  cartItems,
  cartTotal,
  onSent,
  onClose,
}) => {
  const handleWhatsApp = () => {
    window.open(receipt.ownerUrl, "_blank");
    // Small delay so WhatsApp has time to open before we transition
    setTimeout(onSent, 800);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-accent mb-1">
            Step 2 of 2
          </p>
          <h2 className="font-serif text-2xl text-brand-heading">
            Place Your Order
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors mt-1"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Order summary card */}
      <div className="bg-brand-card border border-white/10 rounded-2xl p-4 mb-6 max-h-44 overflow-y-auto">
        <div className="flex flex-col divide-y divide-white/5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2.5 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-brand-accent/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{item.name}</p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    x{item.quantity} × ₹{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-brand-heading flex-shrink-0">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 mt-1 border-t border-white/10">
          <span className="text-sm font-semibold text-white">Total</span>
          <span className="text-base font-bold text-brand-heading">
            ₹{cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Instruction */}
      <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-4 py-3 mb-6">
        <p className="text-sm text-white/80 leading-relaxed">
          📱 Tap the button below to send your order to the shop on WhatsApp.
          The shop will confirm and share payment details with you.
        </p>
      </div>

      <button
        onClick={handleWhatsApp}
        className="w-full py-4 rounded-full bg-[#25D366] text-white text-sm font-semibold flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity"
      >
        <WhatsAppIcon />
        Send Order on WhatsApp
      </button>

      <p
        className="text-xs text-center mt-4"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Order ID:{" "}
        <span className="font-mono text-brand-accent">{receipt.orderId}</span>
      </p>
    </div>
  );
};

// ─── Step 3: Confirmed ────────────────────────────────────────────────────────
interface ConfirmedStepProps {
  receipt: ReceiptData;
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
  onClose: () => void;
}

const ConfirmedStep: React.FC<ConfirmedStepProps> = ({
  receipt,
  cartItems,
  cartTotal,
  onClose,
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    generateInvoicePDF({
      orderId: receipt.orderId,
      customerName: receipt.customerName,
      customerPhone: receipt.customerPhone,
      cartItems,
      cartTotal,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-accent mb-1">
            Order Sent
          </p>
          <h2 className="font-serif text-2xl text-brand-heading">
            You're All Set!
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors mt-1"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Success banner */}
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3 mb-6 mt-4">
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-white">
            Order sent, {receipt.customerName}!
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            The shop will contact you shortly to confirm.
          </p>
        </div>
      </div>

      {/* Order ID box */}
      <div className="flex items-center justify-between bg-brand-card border border-white/10 rounded-xl px-4 py-3 mb-6">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Order ID
        </span>
        <span className="font-mono text-sm text-brand-accent font-medium">
          {receipt.orderId}
        </span>
      </div>

      {/* What's next */}
      <div className="flex flex-col gap-2 mb-6">
        {[
          "The shop will message you on WhatsApp to confirm",
          "You'll receive payment instructions from the shop",
          "Your order will be dispatched after payment",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
              {i + 1}
            </span>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Download invoice */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-4 rounded-full bg-brand-accent text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        <DownloadIcon />
        {downloading ? "Generating PDF..." : "Download Invoice"}
      </button>

      <button
        onClick={onClose}
        className="w-full py-3 mt-3 text-sm rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

// ─── Modal Shell ──────────────────────────────────────────────────────────────
export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
}) => {
  const [step, setStep] = useState<Step>("details");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep("details");
      setReceipt(null);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleDetailsSubmit = (name: string, phone: string) => {
    const { ownerUrl, orderId } = buildWhatsAppCheckout(cartItems, name, phone);
    setReceipt({ orderId, ownerUrl, customerName: name, customerPhone: phone });
    setStep("whatsapp");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full sm:max-w-md bg-brand-bg border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 md:p-8 shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6 sm:hidden" />

        {step === "details" && (
          <DetailsStep
            onSubmit={handleDetailsSubmit}
            onClose={onClose}
            cartTotal={cartTotal}
            itemCount={itemCount}
          />
        )}

        {step === "whatsapp" && receipt && (
          <WhatsAppStep
            receipt={receipt}
            cartItems={cartItems}
            cartTotal={cartTotal}
            onSent={() => setStep("confirmed")}
            onClose={onClose}
          />
        )}

        {step === "confirmed" && receipt && (
          <ConfirmedStep
            receipt={receipt}
            cartItems={cartItems}
            cartTotal={cartTotal}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};
