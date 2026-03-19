import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_ITEMS } from '@/lib/constants/navigation';
import { COLORS } from '@/lib/constants/colors';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-20" style={{ backgroundColor: COLORS.bgPrimary, borderColor: COLORS.bgSecondary }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-2xl font-serif italic" style={{ color: COLORS.textBody }}>
                <span className="font-bold">Your Fair Karn</span>
                <p className="text-xs font-light not-italic mt-1" style={{ color: COLORS.textHeading }}>Fine Jewelry Collection</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {FOOTER_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: COLORS.textBody }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-sm" style={{ color: COLORS.textBody, opacity: 0.7 }}>
              © {currentYear} Your Fair Karn
            </p>
            <p className="text-xs mt-1" style={{ color: COLORS.textHeading, opacity: 0.6 }}>
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
