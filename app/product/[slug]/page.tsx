"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCartContext } from "@/providers/CartProvider";
// import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/lib/types";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
const Breadcrumb = ({ product }: { product: Product }) => (
  <nav
    className="flex items-center gap-2 text-xs mb-8 md:mb-12"
    style={{ color: "rgba(255,255,255,0.4)" }}
  >
    <Link href="/" className="hover:text-brand-accent transition-colors">
      Home
    </Link>
    <span>/</span>
    <Link
      href="/collections"
      className="hover:text-brand-accent transition-colors"
    >
      Collections
    </Link>
    <span>/</span>
    <Link
      href={`/collections?category=${product.category}`}
      className="hover:text-brand-accent transition-colors capitalize"
    >
      {product.category}s
    </Link>
    <span>/</span>
    <span className="text-white/70 truncate max-w-[160px]">{product.name}</span>
  </nav>
);

// ─── Badges ───────────────────────────────────────────────────────────────────
const ProductBadges = ({ product }: { product: Product }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    <span className="px-3 py-1 rounded-full text-xs font-medium border border-brand-accent/40 text-brand-accent capitalize">
      {product.category}
    </span>
    {product.bestseller && (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-accent text-white">
        Bestseller
      </span>
    )}
    {product.newArrival && (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-heading text-brand-bg">
        New Arrival
      </span>
    )}
  </div>
);

// ─── Craft details strip ──────────────────────────────────────────────────────
const CRAFT_TAGS = [
  { icon: "✦", label: "Gold Plated" },
  { icon: "◈", label: "Handcrafted" },
  { icon: "◇", label: "Locally Sourced" },
  { icon: "❖", label: "Quality Assured" },
];

const CraftStrip = () => (
  <div className="grid grid-cols-2 gap-3 my-6">
    {CRAFT_TAGS.map((tag) => (
      <div
        key={tag.label}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand-card border border-brand-accent/10 text-sm"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        <span className="text-brand-accent text-xs">{tag.icon}</span>
        {tag.label}
      </div>
    ))}
  </div>
);

// ─── Main product section ─────────────────────────────────────────────────────
const ProductDetail = ({ product }: { product: Product }) => {
  const { addToCart } = useCartContext();
  const [added, setAdded] = useState(product.isAddedToCart ?? false);

  const handleAddToCart = () => {
    if (!added) {
      product.isAddedToCart = true;
      addToCart(product);
      setAdded(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Image */}
      <div className="relative">
        <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-brand-card sticky top-8">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <ProductBadges product={product} />

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-heading leading-tight mb-4">
          {product.name}
        </h1>

        <p className="text-3xl md:text-4xl font-bold text-brand-heading mb-6">
          ₹{product.price.toFixed(2)}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Description */}
        <p
          className="text-sm md:text-base leading-loose mb-6"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {product.description}
        </p>

        {/* Craft strip */}
        <CraftStrip />

        {/* Add to cart */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`flex-1 py-4 rounded-full text-sm font-medium transition-all duration-300
              ${
                added
                  ? "bg-brand-card border border-brand-accent/40 text-brand-accent cursor-default"
                  : "bg-brand-accent text-white hover:opacity-90 hover:scale-[1.02]"
              }`}
          >
            {added ? "✓  Added to Cart" : "Add to Cart"}
          </button>
          <Link
            href="/collections"
            className="flex-1 py-4 rounded-full text-sm font-medium border border-white/20 text-white text-center hover:border-brand-accent/50 transition-colors duration-200"
          >
            Browse More
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-8 mb-6" />

        {/* Reassurance row */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-3 text-xs"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          <span className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Free delivery above ₹999
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Quality guaranteed
          </span>
          <span className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Secure packaging
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── Related products ─────────────────────────────────────────────────────────
const RelatedProducts = ({ product }: { product: Product }) => {
  const { addToCart } = useCartContext();
  const related = getRelatedProducts(product, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 md:mt-28">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-white/10" />
        <h2 className="font-serif text-2xl md:text-3xl text-brand-heading whitespace-nowrap">
          You May Also Like
        </h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {related.map((p) => (
          <Link key={p.id} href={`/product/${p.slug}`} className="block">
            <ProductCard
              product={p}
              onAddToCart={addToCart}
              showPrice
              showBadges
              showCategory
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-brand-bg py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <Breadcrumb product={product} />
        <ProductDetail product={product} />
        <RelatedProducts product={product} />
      </div>
    </main>
  );
}
