'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { COLORS } from '@/lib/constants/colors';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16" style={{ backgroundColor: COLORS.dustyRose }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-4xl lg:text-5xl font-serif mb-8"
            style={{ color: COLORS.warmEspresso }}
          >
            Stay in Touch
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 max-w-md px-6 py-3 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                color: COLORS.warmEspresso,
                backgroundColor: 'white',
              }}
              required
            />
            <Button type="submit" variant="primary" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
