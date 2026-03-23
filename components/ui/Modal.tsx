"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Max width of the modal panel. Defaults to 'sm:max-w-md' */
  maxWidth?: string;
  /** Close modal when backdrop is clicked. Defaults to true */
  closeOnBackdrop?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidth = "sm:max-w-md",
  closeOnBackdrop = true,
}) => {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel — bottom sheet on mobile, centered on desktop */}
      <div
        className={`relative w-full ${maxWidth} bg-brand-bg border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 md:p-8 shadow-2xl z-10`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6 sm:hidden" />

        {children}
      </div>
    </div>
  );
};
