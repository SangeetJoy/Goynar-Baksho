import React from 'react';
import Image from 'next/image';
import { Testimonial } from '@/lib/types';
import { COLORS } from '@/lib/constants/colors';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="rounded-3xl p-8 shadow-lg relative" style={{ backgroundColor: COLORS.bgSecondary }}>
      <div className="absolute top-6 left-6 text-6xl opacity-20" style={{ color: COLORS.accentPrimary }}>
        &ldquo;
      </div>
      <div className="flex items-center mb-4">
        {testimonial.avatar && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold" style={{ color: COLORS.textBody }}>
            {testimonial.name}
          </h4>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4"
                fill={i < testimonial.rating ? COLORS.accentPrimary : 'none'}
                stroke={COLORS.accentPrimary}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: COLORS.textBody, opacity: 0.8 }}>
        {testimonial.text}
      </p>
      <div className="absolute bottom-6 right-6 text-6xl opacity-20" style={{ color: COLORS.accentPrimary }}>
        &rdquo;
      </div>
    </div>
  );
};
