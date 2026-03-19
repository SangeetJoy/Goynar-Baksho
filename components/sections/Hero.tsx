import React from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { CategoryCard } from "../ui/CategoryCard";
import { CATEGORIES } from "@/lib/data/categories";
import { COLORS } from "@/lib/constants/colors";
import { cn } from "@/lib/utils";

// — Styles —
const styles = {
  section: "relative py-20",
  container: "container mx-auto px-8",
  grid: "grid lg:grid-cols-2 items-center gap-6",
  imageWrapper:
    "relative h-[26rem] w-[40rem] overflow-hidden rounded-[2.5rem] shadow-2xl",
  image: "object-cover",
  heroLeft: "relative flex justify-end overflow-visible",
  categories: "absolute -bottom-8 left-1/2 -translate-x-8 flex gap-4 z-20",
  heroRight: "flex flex-col items-start gap-8 pl-16",
  heading: "font-serif text-[3.2rem] leading-tight uppercase tracking-wide",
};

const HeroImage = () => (
  <div
    className={cn(styles.imageWrapper)}
    style={{ backgroundColor: COLORS.accentPrimary }}
  >
    <Image
      src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop"
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
    <h1 className={styles.heading} style={{ color: COLORS.textHeading }}>
      Elegance, Redefined
    </h1>
    <Button variant="primary" size="lg">
      SHOP NOW
    </Button>
  </div>
);

export const Hero: React.FC = () => (
  <section className={styles.section} style={{ backgroundColor: COLORS.bgPrimary }}>
    <div className={styles.container}>
      <div className={styles.grid}>
        <HeroLeft />
        <HeroRight />
      </div>
    </div>
  </section>
);
