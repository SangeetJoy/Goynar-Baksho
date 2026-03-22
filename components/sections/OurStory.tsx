import React from "react";
import { Button } from "../ui/Button";

export const OurStory: React.FC = () => (
  <section className="py-16 bg-brand-bg">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl ml-auto rounded-3xl p-8 lg:p-12 shadow-lg bg-brand-card">
        <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-brand-heading">
          Our Story
        </h2>
        <p className="text-base leading-relaxed mb-8 text-white opacity-80">
          We believe that every woman deserves to feel special and elegant. Our
          passion for creating beautiful, affordable gold-plated jewelry has
          driven us to craft pieces that celebrate femininity and grace. Each
          design tells a story of timeless beauty and modern sophistication.
        </p>
        <Button variant="primary" size="md">
          Explore Collection
        </Button>
      </div>
    </div>
  </section>
);
