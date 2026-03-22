import React from "react";
import Image from "next/image";
import { INSTAGRAM_POSTS } from "@/lib/data/instagram";

export const InstagramFeed: React.FC = () => (
  <section className="py-16 bg-brand-card">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — Text and Avatar */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif mb-4 text-brand-heading">
            Follow Us
          </h2>
          <p className="text-xl mb-6 text-white opacity-70">@GoynarBaksho</p>
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-brand-accent shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop"
              alt="Goynar Baksho on Instagram"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right — Instagram Grid */}
        <div className="grid grid-cols-3 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-brand-mauve"
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
