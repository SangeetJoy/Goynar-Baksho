import React from 'react';
import { TestimonialCard } from '../ui/TestimonialCard';
import { TESTIMONIALS } from '@/lib/data/testimonials';
import { COLORS } from '@/lib/constants/colors';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16" style={{ backgroundColor: COLORS.bgSecondary }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl lg:text-5xl font-serif mb-12 text-center"
          style={{ color: COLORS.textHeading }}
        >
          Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.slice(0, 2).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
