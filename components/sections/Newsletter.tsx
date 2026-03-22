"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-16 bg-brand-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif mb-8 text-brand-heading">
            Stay in Touch
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 max-w-md px-6 py-3 rounded-full text-base text-white bg-brand-card border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-50 placeholder:text-[#555]"
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
