import { Product } from "@/lib/types";
export type Step = "details" | "whatsapp" | "confirmed";

export interface ReceiptData {
  orderId: string;
  ownerUrl: string;
  customerName: string;
  customerPhone: string;
}

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: (Product & { quantity: number })[];
}

export interface DetailsStepProps {
  onSubmit: (name: string, phone: string) => void;
  onClose: () => void;
  cartTotal: number;
  itemCount: number;
}

export interface WhatsAppStepProps {
  receipt: ReceiptData;
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
  onSent: () => void;
  onClose: () => void;
}

export interface ConfirmedStepProps {
  receipt: ReceiptData;
  cartItems: (Product & { quantity: number })[];
  cartTotal: number;
  onClose: () => void;
}
