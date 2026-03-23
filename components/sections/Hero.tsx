import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { CategoryCard } from "../ui/CategoryCard";
import { CATEGORIES } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const styles = {
  section: "relative py-12 md:py-20 bg-brand-bg",
  container: "container mx-auto px-4 md:px-8",

  // Mobile: single column centered. Desktop: two columns.
  grid: "flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-6",

  // Mobile: bigger circle. Desktop: original rounded rectangle.
  imageWrapper:
    "relative w-[22rem] h-[22rem] rounded-full overflow-hidden shadow-2xl bg-brand-accent " +
    "md:w-[28rem] md:h-[28rem] " +
    "lg:h-[26rem] lg:w-[40rem] lg:rounded-[2.5rem]",

  image: "object-cover",
  heroLeft: "relative flex justify-center lg:justify-end overflow-visible",

  // Categories float below image on desktop only
  categories:
    "hidden lg:flex absolute -bottom-10 left-[100%] -translate-x-8 gap-4 z-20",

  // Desktop only — hidden on mobile
  heroRight: "hidden lg:flex flex-col items-start gap-8 pl-16",

  heading:
    "font-serif text-[3.2rem] leading-tight uppercase tracking-wide text-brand-heading",
};

const HeroImage = () => (
  <div className={cn(styles.imageWrapper)}>
    <Image
      src="/images/hero/hero-image.png"
      alt="Elegant jewelry"
      fill
      className={styles.image}
      priority
    />
  </div>
);

const FloatingCategories = () => (
  <div className={styles.categories}>
    {CATEGORIES.map((category) => (
      <CategoryCard
        key={category.id}
        category={category}
        onClick={() => console.log(`Navigate to ${category.slug}`)}
      />
    ))}
  </div>
);

const HeroLeft = () => (
  <div className={styles.heroLeft}>
    <HeroImage />
    <FloatingCategories />
  </div>
);

const HeroRight = () => (
  <div className={styles.heroRight}>
    <h1 className={styles.heading}>Shine without the price</h1>
    <Button variant="primary" size="lg">
      SHOP NOW
    </Button>
  </div>
);

export const Hero: React.FC = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <div className={styles.grid}>
        <HeroLeft />
        <HeroRight />
      </div>
    </div>
  </section>
);
