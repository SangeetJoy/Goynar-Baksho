import React from 'react';
import { Button } from '../ui/Button';
import { COLORS } from '@/lib/constants/colors';

export const OurStory: React.FC = () => {
  return (
    <section className="py-16" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl ml-auto rounded-3xl p-8 lg:p-12 shadow-lg" style={{ backgroundColor: COLORS.bgSecondary }}>
          <h2
            className="text-4xl lg:text-5xl font-serif mb-6"
            style={{ color: COLORS.textHeading }}
          >
            Our Story
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: COLORS.textBody, opacity: 0.8 }}
          >
            We believe that every woman deserves to feel special and elegant. Our passion for creating beautiful, affordable gold-plated jewelry has driven us to craft pieces that celebrate femininity and grace. Each design tells a story of timeless beauty and modern sophistication.
          </p>
          <Button variant="primary" size="md">
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
};
