import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from "jspdf";
import { Product } from "@/lib/types";
import { CartItem } from "./hooks/useCart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppCheckout(
  cart: CartItem[],
  customerName: string,
  customerPhone: string
) {
  const ownerPhone = "918918833943"; // owner's number with country code, no +

  // Build the order lines
  const itemLines = cart
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`
    )
    .join("\n");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = "ORD-" + Date.now();

  // Message to OWNER
  const ownerMessage = `🛍️ New Order Received! (${orderId})

Customer: ${customerName}
Phone: ${customerPhone}

Items:
${itemLines}

Total: ₹${total}

Please confirm and share payment details with the customer.`;

  // Message to USER (opens as a "note to self" — user copies it)
  const userMessage = `✅ Your order has been placed! (${orderId})

${itemLines}

Total: ₹${total}

The shop will contact you on WhatsApp to confirm and collect payment. Keep this as your receipt.`;

  return {
    ownerUrl: `https://wa.me/${ownerPhone}?text=${encodeURIComponent(
      ownerMessage
    )}`,
    userReceiptText: userMessage,
    orderId,
  };
}

// generateInvoicePDF.ts
// Uses jsPDF to programmatically draw a crisp, professional invoice.
// Install: npm install jspdf

interface InvoiceData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
  date: string; // formatted date string
}

// ─── Colour palette (matches brand) ──────────────────────────────────────────
const COLORS = {
  bg: [18, 10, 10] as [number, number, number], // brand-bg dark
  accent: [139, 72, 57] as [number, number, number], // brand-accent
  heading: [212, 175, 55] as [number, number, number], // brand-heading gold
  white: [255, 255, 255] as [number, number, number],
  muted: [180, 160, 150] as [number, number, number],
  divider: [60, 40, 40] as [number, number, number],
  rowAlt: [30, 18, 18] as [number, number, number], // alternating row bg
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const PAGE_W = 210; // A4 mm
const PAGE_H = 297;
const MARGIN = 16;
const COL_RIGHT = PAGE_W - MARGIN;

export function generateInvoicePDF(data: InvoiceData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 0; // running vertical cursor

  // ── Background ──────────────────────────────────────────────────────────────
  doc.setFillColor(...COLORS.bg);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // ── Header band ─────────────────────────────────────────────────────────────
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, 0, PAGE_W, 36, "F");

  // Brand name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.heading);
  doc.text("Goynar Baksho", MARGIN, 15);

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text("You matter!", MARGIN, 21);

  // "INVOICE" label — top right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.heading);
  doc.text("INVOICE", COL_RIGHT, 15, { align: "right" });

  // Order ID — top right below
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text(data.orderId, COL_RIGHT, 21, { align: "right" });

  y = 46;

  // ── Order meta row ───────────────────────────────────────────────────────────
  // Left: customer info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text("BILLED TO", MARGIN, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.white);
  doc.text(data.customerName, MARGIN, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  doc.text(`+${data.customerPhone}`, MARGIN, y + 12);

  // Right: date + order id
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text("DATE", COL_RIGHT, y, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.white);
  doc.text(data.date, COL_RIGHT, y + 6, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text("ORDER ID", COL_RIGHT, y + 14, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.heading);
  doc.text(data.orderId, COL_RIGHT, y + 20, { align: "right" });

  y += 30;

  // ── Divider ──────────────────────────────────────────────────────────────────
  doc.setDrawColor(...COLORS.divider);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, COL_RIGHT, y);
  y += 6;

  // ── Table header ─────────────────────────────────────────────────────────────
  const COL = {
    no: MARGIN,
    item: MARGIN + 10,
    cat: MARGIN + 95,
    qty: MARGIN + 125,
    unit: MARGIN + 145,
    total: COL_RIGHT,
  };

  doc.setFillColor(...COLORS.accent);
  doc.rect(MARGIN, y, PAGE_W - MARGIN * 2, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text("#", COL.no, y + 5.5);
  doc.text("ITEM", COL.item, y + 5.5);
  doc.text("CATEGORY", COL.cat, y + 5.5);
  doc.text("QTY", COL.qty, y + 5.5);
  doc.text("UNIT PRICE", COL.unit, y + 5.5);
  doc.text("TOTAL", COL.total, y + 5.5, { align: "right" });

  y += 10;

  // ── Table rows ───────────────────────────────────────────────────────────────
  data.cartItems.forEach((item, idx) => {
    const rowH = 10;
    const lineTotal = item.price * item.quantity;

    // Alternating row background
    if (idx % 2 === 1) {
      doc.setFillColor(...COLORS.rowAlt);
      doc.rect(MARGIN, y - 1, PAGE_W - MARGIN * 2, rowH, "F");
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.white);

    doc.text(String(idx + 1), COL.no, y + 5.5);
    doc.text(item.name, COL.item, y + 5.5);

    doc.setTextColor(...COLORS.muted);
    doc.text(item.category.toUpperCase(), COL.cat, y + 5.5);

    doc.setTextColor(...COLORS.white);
    doc.text(String(item.quantity), COL.qty, y + 5.5);
    doc.text(`Rs.${item.price.toFixed(2)}`, COL.unit, y + 5.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.heading);
    doc.text(`Rs.${lineTotal.toFixed(2)}`, COL.total, y + 5.5, {
      align: "right",
    });

    y += rowH;
  });

  y += 4;

  // ── Divider ──────────────────────────────────────────────────────────────────
  doc.setDrawColor(...COLORS.divider);
  doc.line(MARGIN, y, COL_RIGHT, y);
  y += 6;

  // ── Totals block ─────────────────────────────────────────────────────────────
  const TOTAL_X = COL_RIGHT - 55;

  // Subtotal
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  doc.text("Subtotal", TOTAL_X, y);
  doc.text(`Rs.${data.cartTotal.toFixed(2)}`, COL_RIGHT, y, { align: "right" });
  y += 6;

  // Delivery note
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(8);
  doc.text("Delivery", TOTAL_X, y);
  doc.setTextColor(...COLORS.white);
  doc.text("To be confirmed", COL_RIGHT, y, { align: "right" });
  y += 8;

  // Total box
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(TOTAL_X - 4, y - 1, COL_RIGHT - TOTAL_X + 8, 12, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.heading);
  doc.text("TOTAL", TOTAL_X, y + 7);
  doc.text(`Rs.${data.cartTotal.toFixed(2)}`, COL_RIGHT - 2, y + 7, {
    align: "right",
  });

  y += 20;

  // ── Note box ─────────────────────────────────────────────────────────────────
  doc.setDrawColor(...COLORS.divider);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, PAGE_W - MARGIN * 2, 22, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.accent);
  doc.text("NOTE", MARGIN + 4, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.muted);
  doc.text(
    "The shop will contact you on WhatsApp to confirm your order and share payment details.",
    MARGIN + 4,
    y + 13
  );
  doc.text(
    "Please keep this invoice as your order reference.",
    MARGIN + 4,
    y + 19
  );

  y += 30;

  // ── Footer ───────────────────────────────────────────────────────────────────
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, PAGE_H - 16, PAGE_W, 16, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.heading);
  doc.text("Goynar Baksho", MARGIN, PAGE_H - 7);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.white);
  doc.text("Thank you for your order!", PAGE_W / 2, PAGE_H - 7, {
    align: "center",
  });
  doc.text("goynarbaksho.com", COL_RIGHT, PAGE_H - 7, { align: "right" });

  // ── Save ─────────────────────────────────────────────────────────────────────
  doc.save(`${data.orderId}-invoice.pdf`);
}
