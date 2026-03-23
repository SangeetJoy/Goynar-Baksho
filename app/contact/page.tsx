"use client";

import React, { useState } from "react";
import { SHOP_CONTACT, BUSINESS_HOURS } from "@/lib/constants/contact";
import {
  PhoneIcon,
  EmailIcon,
  LocationIcon,
  ClockIcon,
  CheckIcon,
} from "../../components/icons/ContactIcons";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormState = { name: string; email: string; message: string };
type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ─── Contact detail data ──────────────────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    icon: PhoneIcon,
    label: "Phone & WhatsApp",
    value: SHOP_CONTACT.phone,
    href: `https://wa.me/${SHOP_CONTACT.whatsappNumber}`,
    linkLabel: "Chat on WhatsApp →",
  },
  {
    icon: EmailIcon,
    label: "Email",
    value: SHOP_CONTACT.email,
    href: `mailto:${SHOP_CONTACT.email}`,
    linkLabel: "Send an email →",
  },
  {
    icon: LocationIcon,
    label: "Visit Us",
    value: SHOP_CONTACT.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(
      SHOP_CONTACT.address
    )}`,
    linkLabel: "Get directions →",
  },
];

// ─── Section Heading — centered, full width ───────────────────────────────────
const SectionHeading = () => (
  <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
    <p className="text-xs uppercase tracking-[0.2em] text-brand-accent mb-4">
      Get in Touch
    </p>
    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-heading leading-tight mb-5">
      We'd Love to Hear From You
    </h1>
    <p
      className="text-sm md:text-base"
      style={{ color: "rgba(255,255,255,0.55)" }}
    >
      Whether you have a question about an order, want to know more about a
      piece, or simply want to say hello — we're here.
    </p>
  </div>
);

// ─── Contact Form ─────────────────────────────────────────────────────────────
const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Replace with your actual submission logic (Formspree, EmailJS, API route)
    await new Promise((res) => setTimeout(res, 1200));
    setStatus("success");
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/20 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-accent transition-colors duration-200";

  return (
    <div className="bg-brand-card rounded-2xl md:rounded-3xl p-6 md:p-10 h-full">
      <h2 className="text-xl font-semibold text-brand-heading mb-8">
        Send a Message
      </h2>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
            {CheckIcon}
          </div>
          <p className="text-brand-heading font-serif text-2xl">
            Message Sent!
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setForm({ name: "", email: "", message: "" });
              setStatus("idle");
            }}
            className="mt-4 text-sm text-brand-accent underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="self-start px-8 py-3 rounded-full bg-brand-accent text-white text-sm font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};

// ─── Contact Info ─────────────────────────────────────────────────────────────
const ContactInfo = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-6">
      {CONTACT_DETAILS.map((item) => (
        <div key={item.label} className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-brand-accent/15 flex items-center justify-center flex-shrink-0 text-brand-accent mt-0.5">
            {item.icon}
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {item.label}
            </p>
            <p className="text-sm text-white leading-relaxed">{item.value}</p>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-accent mt-1 inline-block hover:underline underline-offset-4"
            >
              {item.linkLabel}
            </a>
          </div>
        </div>
      ))}
    </div>

    <div className="h-px bg-white/10" />

    <div>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "rgba(255,255,255,0.4)" }}>{ClockIcon}</span>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Business Hours
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {BUSINESS_HOURS.map(({ day, time }) => (
          <div key={day} className="flex justify-between items-center text-sm">
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{day}</span>
            <span className="text-white font-medium">{time}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="h-px bg-white/10" />

    <div
      className="rounded-2xl overflow-hidden border border-white/10"
      style={{ height: "220px" }}
    >
      <iframe
        title="Shop Location"
        src={SHOP_CONTACT.mapEmbedSrc}
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-bg py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Centered heading — spans full width */}
        <SectionHeading />

        {/* Two column layout below */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
