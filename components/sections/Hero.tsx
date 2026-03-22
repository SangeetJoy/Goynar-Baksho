import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { CategoryCard } from "../ui/CategoryCard";
import { CATEGORIES } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

const styles = {
  section: "relative py-20 bg-brand-bg",
  container: "container mx-auto px-8",
  grid: "grid lg:grid-cols-2 items-center gap-6",
  imageWrapper:
    "relative h-[26rem] w-[40rem] overflow-hidden rounded-[2.5rem] shadow-2xl bg-brand-accent",
  image: "object-cover",
  heroLeft: "relative flex justify-end overflow-visible",
  categories: "absolute -bottom-10 left-[100%] -translate-x-8 flex gap-4 z-20",
  heroRight: "flex flex-col items-start gap-8 pl-16",
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
