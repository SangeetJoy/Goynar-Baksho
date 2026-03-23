"use client";

import React, { useState, useEffect } from "react";
import { buildWhatsAppCheckout, generateInvoicePDF } from "@/lib/utils";
import { Product } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { CloseIcon, DownloadIcon, WhatsAppIcon } from "./icons";
import {
  Step,
  ReceiptData,
  CheckoutModalProps,
  DetailsStepProps,
  WhatsAppStepProps,
  ConfirmedStepProps,
} from "./types";

// ─── Shared UI primitives ─────────────────────────────────────────────────────

const ModalHeader = ({
  label,
  title,
  onClose,
}: {
  label: string;
  title: string;
  onClose: () => void;
}) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <p className="text-xs uppercase tracking-widest text-brand-accent mb-1">
        {label}
      </p>
      <h2 className="font-serif text-2xl text-brand-heading">{title}</h2>
    </div>
    <button
      onClick={onClose}
      className="text-white/40 hover:text-white transition-colors mt-1"
    >
      <CloseIcon />
    </button>
  </div>
);

const OrderIdBadge = ({ orderId }: { orderId: string }) => (
  <div className="flex items-center justify-between bg-brand-card border border-white/10 rounded-xl px-4 py-3">
    <span
      className="text-xs uppercase tracking-widest"
      style={{ color: "rgba(255,255,255,0.4)" }}
    >
      Order ID
    </span>
    <span className="font-mono text-sm text-brand-accent font-medium">
      {orderId}
    </span>
  </div>
);

const CartSummaryCard = ({
  cartItems,
  cartTotal,
}: {
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
}) => (
  <div className="bg-brand-card border border-white/10 rounded-2xl p-4 max-h-44 overflow-y-auto">
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
);

const NextStepsList = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-col gap-2">
    {steps.map((text, i) => (
      <div key={i} className="flex items-start gap-3">
        <span className="w-5 h-5 rounded-full bg-brand-accent/20 text-brand-accent text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
          {i + 1}
        </span>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          {text}
        </p>
      </div>
    ))}
  </div>
);

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
      <ModalHeader label="Step 1 of 2" title="Your Details" onClose={onClose} />

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

const WhatsAppStep: React.FC<WhatsAppStepProps> = ({
  receipt,
  cartItems,
  cartTotal,
  onSent,
  onClose,
}) => {
  const handleWhatsApp = () => {
    window.open(receipt.ownerUrl, "_blank");
    setTimeout(onSent, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <ModalHeader
        label="Step 2 of 2"
        title="Place Your Order"
        onClose={onClose}
      />

      <CartSummaryCard cartItems={cartItems} cartTotal={cartTotal} />

      <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-4 py-3">
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
        className="text-xs text-center -mt-2"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Order ID:{" "}
        <span className="font-mono text-brand-accent">{receipt.orderId}</span>
      </p>
    </div>
  );
};

const WHAT_HAPPENS_NEXT = [
  "The shop will message you on WhatsApp to confirm",
  "You'll receive payment instructions from the shop",
  "Your order will be dispatched after payment",
];

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
    <div className="flex flex-col gap-5">
      <ModalHeader
        label="Order Sent"
        title="You're All Set!"
        onClose={onClose}
      />

      {/* Success banner */}
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3">
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

      <OrderIdBadge orderId={receipt.orderId} />

      <NextStepsList steps={WHAT_HAPPENS_NEXT} />

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
        className="w-full py-3 text-sm rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-colors"
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

  useEffect(() => {
    if (isOpen) {
      setStep("details");
      setReceipt(null);
    }
  }, [isOpen]);

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
    <Modal isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  );
};
