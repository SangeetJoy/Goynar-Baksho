import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppCheckout(cart, customerName, customerPhone) {
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
