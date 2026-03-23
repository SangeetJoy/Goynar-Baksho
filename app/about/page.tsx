import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BRAND,
  FOUNDERS,
  CRAFT_HIGHLIGHTS,
  WHY_US,
} from "@/lib/constants/about";

// ─── Hero ─────────────────────────────────────────────────────────────────────
const AboutHero = () => (
  <section className="relative bg-brand-bg overflow-hidden py-24 md:py-32">
    {/* Decorative gold ring */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        border: "1px solid rgba(212,175,55,0.08)",
        boxShadow: "0 0 120px 40px rgba(212,175,55,0.04)",
      }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ border: "1px solid rgba(212,175,55,0.06)" }}
    />

    <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-brand-accent/30 shadow-2xl">
          <Image
            src={BRAND.logoSrc}
            alt={BRAND.name}
            width={144}
            height={144}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-4">
        Our Story
      </p>
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brand-heading leading-tight mb-6">
        More Than Jewelry.
        <br />
        <span className="italic">A Love Story.</span>
      </h1>
      <p
        className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {BRAND.name} was born from one man's wish to see his wife shine — not
        just in jewelry, but in confidence, independence, and purpose.
      </p>
    </div>
  </section>
);

// ─── Brand Story ──────────────────────────────────────────────────────────────
const BrandStory = () => (
  <section className="bg-brand-bg py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Decorative line */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-brand-accent/20" />
          <span className="text-brand-accent text-lg">✦</span>
          <div className="h-px flex-1 bg-brand-accent/20" />
        </div>

        <div className="space-y-6 text-center">
          <p className="font-serif text-2xl md:text-3xl text-brand-heading leading-relaxed">
            "Every woman deserves to feel like she matters — adorned,
            celebrated, and seen."
          </p>
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Goynar Baksho — meaning <em>"Jewellery Box"</em> in Bengali —
            started as a deeply personal act of love. Subhra Majumder, watching
            his wife Pali's creativity and warmth light up every room, knew she
            was capable of something extraordinary. He didn't just want to start
            a business — he wanted to hand her a stage.
          </p>
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Together, they built a brand rooted in the belief that beautiful
            jewelry should be within every woman's reach. From their home in
            Siliguri, Pali curates each piece with care — selecting designs that
            are modern yet timeless, bold yet wearable. Every necklace,
            bracelet, and earring carries a little piece of her heart.
          </p>
          <p
            className="text-sm md:text-base leading-loose"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            This is not just a shop. It is a story of love, empowerment, and the
            quiet courage it takes to build something of your own.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <div className="h-px flex-1 bg-brand-accent/20" />
          <span className="text-brand-accent text-lg">✦</span>
          <div className="h-px flex-1 bg-brand-accent/20" />
        </div>
      </div>
    </div>
  </section>
);

// ─── Founders ─────────────────────────────────────────────────────────────────
const Founders = () => (
  <section className="bg-brand-bg py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-accent mb-3 text-center">
        The People Behind It
      </p>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-heading text-center mb-14">
        Meet the Founders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {FOUNDERS.map((founder) => (
          <div
            key={founder.name}
            className="group relative rounded-3xl overflow-hidden bg-brand-card"
          >
            {/* Photo */}
            <div className="relative h-80 md:h-96 overflow-hidden">
              <Image
                src={founder.imageSrc}
                alt={founder.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(30,14,14,0.95) 0%, rgba(30,14,14,0.2) 50%, transparent 100%)",
                }}
              />
            </div>

            {/* Info */}
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-brand-accent mb-1">
                {founder.role}
              </p>
              <h3 className="font-serif text-2xl text-brand-heading mb-3">
                {founder.name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {founder.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Our Craft ────────────────────────────────────────────────────────────────
const OurCraft = () => (
  <section className="bg-brand-bg py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-accent mb-3 text-center">
        What We Do
      </p>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-heading text-center mb-14">
        Our Craft
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CRAFT_HIGHLIGHTS.map((item, idx) => (
          <div
            key={item.title}
            className="relative rounded-2xl p-6 md:p-8 bg-brand-card border border-brand-accent/10 hover:border-brand-accent/30 transition-colors duration-300"
          >
            {/* Number watermark */}
            <span
              className="absolute top-4 right-5 font-serif text-5xl font-bold pointer-events-none select-none"
              style={{ color: "rgba(212,175,55,0.07)" }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="w-8 h-0.5 bg-brand-accent mb-5" />
            <h3 className="text-base font-semibold text-brand-heading mb-3">
              {item.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const WhyChooseUs = () => (
  <section className="bg-brand-bg py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-brand-accent mb-3 text-center">
        Why Goynar Baksho
      </p>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-heading text-center mb-14">
        What Sets Us Apart
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {WHY_US.map((item) => (
          <div
            key={item.title}
            className="flex gap-5 items-start p-6 rounded-2xl bg-brand-card border border-brand-accent/10 hover:border-brand-accent/25 transition-colors duration-300"
          >
            <span className="text-brand-accent text-2xl mt-0.5 flex-shrink-0">
              {item.icon}
            </span>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA ──────────────────────────────────────────────────────────────────────
const AboutCTA = () => (
  <section className="bg-brand-bg py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-8">
      <div
        className="relative rounded-3xl overflow-hidden text-center px-6 py-16 md:py-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,72,57,0.35) 0%, rgba(30,14,14,0) 70%)",
          border: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        {/* Decorative corners */}
        <span className="absolute top-5 left-5 text-brand-accent/30 text-2xl">
          ✦
        </span>
        <span className="absolute top-5 right-5 text-brand-accent/30 text-2xl">
          ✦
        </span>
        <span className="absolute bottom-5 left-5 text-brand-accent/30 text-2xl">
          ✦
        </span>
        <span className="absolute bottom-5 right-5 text-brand-accent/30 text-2xl">
          ✦
        </span>

        <p className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-4">
          You Matter
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-heading mb-5 leading-tight">
          Ready to Find Your
          <br />
          Perfect Piece?
        </h2>
        <p
          className="text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Browse our curated collections — crafted with love, designed for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/collections"
            className="px-8 py-3.5 rounded-full bg-brand-accent text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-105"
          >
            Shop Collections
          </Link>
          <a
            href={BRAND.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full border border-brand-accent text-white text-sm font-medium transition-all duration-200 hover:bg-brand-accent/10 flex items-center gap-2"
          >
            {/* Facebook icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            Follow on Facebook
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <AboutHero />
      <BrandStory />
      <Founders />
      <OurCraft />
      <WhyChooseUs />
      <AboutCTA />
    </main>
  );
}
