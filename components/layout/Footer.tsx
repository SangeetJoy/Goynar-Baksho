import React from 'react';
import Link from 'next/link';
import { FOOTER_NAV_ITEMS } from '@/lib/constants/navigation';
import { COLORS } from '@/lib/constants/colors';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-2xl font-serif italic" style={{ color: COLORS.warmEspresso }}>
                <span className="font-bold">Ela-Jewelmalestine</span>
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
                style={{ color: COLORS.warmEspresso }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-sm" style={{ color: COLORS.warmEspresso, opacity: 0.7 }}>
              Newsleterator 1908 Copyright LV03
            </p>
            <p className="text-xs mt-1" style={{ color: COLORS.warmEspresso, opacity: 0.5 }}>
              Of maestros Laori 1957 jamfiber
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
