import React from 'react';
import Image from 'next/image';
import { INSTAGRAM_POSTS } from '@/lib/data/instagram';
import { COLORS } from '@/lib/constants/colors';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-16" style={{ backgroundColor: COLORS.blush }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text and Avatar */}
          <div>
            <h2
              className="text-3xl lg:text-4xl font-serif mb-4"
              style={{ color: COLORS.warmEspresso }}
            >
              Follow Us
            </h2>
            <p className="text-xl mb-6" style={{ color: COLORS.warmEspresso, opacity: 0.7 }}>
              @shopname
            </p>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop"
                alt="Shop avatar"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <span className="text-white font-bold text-sm">$395</span>
              </div>
            </div>
          </div>

          {/* Right - Instagram Grid */}
          <div className="grid grid-cols-3 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.link}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={post.image}
                  alt="Instagram post"
                  fill
                  className="object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
