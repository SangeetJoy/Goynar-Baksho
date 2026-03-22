import React from "react";
import Link from "next/link";
import { FOOTER_NAV_ITEMS } from "@/lib/constants/navigation";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-card bg-brand-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="inline-block text-white font-serif italic text-2xl"
          >
            <span className="font-bold">Goynar Baksho</span>
            <p className="text-xs font-light not-italic mt-1 text-brand-heading">
              You matter !
            </p>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {FOOTER_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-sm text-white opacity-70">
              © {currentYear} Goynar Baksho
            </p>
            <p className="text-xs mt-1 text-brand-heading opacity-60">
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
