export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "necklace" | "earring" | "bracelet" | "ring";
  description?: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  isAddedToCart?: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  link: string;
}
