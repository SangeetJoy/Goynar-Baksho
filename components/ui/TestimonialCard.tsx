import React from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className="w-4 h-4"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => (
  <div className="rounded-3xl p-8 shadow-lg relative bg-brand-card">
    {/* Opening quote */}
    <div className="absolute top-6 left-6 text-6xl opacity-20 text-brand-accent">
      &ldquo;
    </div>

    <div className="flex items-center mb-4">
      {testimonial.avatar && (
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div>
        <h4 className="font-semibold text-white">{testimonial.name}</h4>
        <div className="flex gap-1 mt-1 text-brand-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < testimonial.rating} />
          ))}
        </div>
      </div>
    </div>

    <p className="text-sm leading-relaxed text-white opacity-80">
      {testimonial.text}
    </p>

    {/* Closing quote */}
    <div className="absolute bottom-6 right-6 text-6xl opacity-20 text-brand-accent">
      &rdquo;
    </div>
  </div>
);
