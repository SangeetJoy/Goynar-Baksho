'use client';

import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Bestsellers } from '@/components/sections/Bestsellers';
import { OurStory } from '@/components/sections/OurStory';
import { Testimonials } from '@/components/sections/Testimonials';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { Newsletter } from '@/components/sections/Newsletter';
import { FeaturedCollection } from '@/components/sections/FeaturedCollection';

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <NewArrivals />
      <WhyChooseUs />
      <Bestsellers />
      <OurStory />
      <Testimonials />
      <InstagramFeed />
      <FeaturedCollection />
      <Newsletter />
    </div>
  );
}
