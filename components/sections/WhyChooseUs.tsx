import React from "react";
import { FeatureCard } from "../ui/FeatureCard";
import { FEATURES } from "@/lib/constants/features";

export const WhyChooseUs: React.FC = () => (
  <section className="py-16 bg-brand-card">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl lg:text-5xl font-serif mb-12 text-center text-brand-heading">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  </section>
);
