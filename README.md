# Your Fair Karn - Gold Plated Jewelry E-commerce Website

A beautiful, modern e-commerce website for gold-plated jewelry built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Color Scheme:**
  - Blush: `#FFFDFD` (Background)
  - Warm Espresso: `#3E3636` (Text)
  - Dusty Rose: `#D9B3B0` (Accent)

- **Typography:**
  - Playfair Display (Serif) - For headings
  - Inter (Sans-serif) - For body text

- **Design Elements:**
  - Elegant rounded components with generous border-radius
  - Smooth hover transitions and animations
  - Responsive grid layouts
  - Modern card-based product displays
  - Professional shadow effects

## 📁 Project Structure

```
/app
├── app/
│   ├── api/[[...path]]/route.js  # Backend API routes
│   ├── page.tsx                  # Main homepage
│   ├── layout.tsx                # Root layout with Header & Footer
│   └── globals.css               # Global styles & Tailwind config
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Responsive header with navigation
│   │   └── Footer.tsx            # Footer component
│   │
│   ├── ui/
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── ProductCard.tsx       # Product display card
│   │   ├── CategoryCard.tsx      # Category navigation card
│   │   ├── FeatureCard.tsx       # Feature highlight card
│   │   └── TestimonialCard.tsx   # Customer testimonial card
│   │
│   └── sections/
│       ├── Hero.tsx              # Hero section with CTA
│       ├── Categories.tsx        # Product categories
│       ├── NewArrivals.tsx       # New products section
│       ├── WhyChooseUs.tsx       # Features section
│       ├── Bestsellers.tsx       # Best selling products
│       ├── OurStory.tsx          # About section
│       ├── Testimonials.tsx      # Customer reviews
│       ├── InstagramFeed.tsx     # Social media integration
│       ├── Newsletter.tsx        # Email subscription
│       └── FeaturedCollection.tsx # Featured products
│
├── lib/
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   │
│   ├── constants/
│   │   ├── colors.ts             # Color constants
│   │   ├── navigation.ts         # Navigation items
│   │   └── features.ts           # Features data
│   │
│   ├── data/
│   │   ├── products.ts           # Mock product data
│   │   ├── testimonials.ts       # Customer reviews
│   │   ├── categories.ts         # Product categories
│   │   └── instagram.ts          # Social media posts
│   │
│   └── hooks/
│       └── useCart.ts            # Shopping cart hook
│
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Google Fonts (Playfair Display, Inter)
- **Icons:** Heroicons (SVG)
- **State Management:** React Hooks
- **Image Optimization:** Next.js Image Component

## 🎯 Key Features

### Homepage Sections
1. **Hero Section** - Eye-catching hero with model image and CTA
2. **Categories** - Quick navigation to Necklaces, Earrings, Bracelets
3. **New Arrivals** - Display latest products
4. **Why Choose Us** - Feature highlights (Free Shipping, Quality, Returns)
5. **Bestsellers** - Most popular products with pricing
6. **Our Story** - Brand narrative
7. **Testimonials** - Customer reviews with ratings
8. **Instagram Feed** - Social proof with images
9. **Featured Collection** - Hero showcase with product grid
10. **Newsletter** - Email subscription

### Components
- **Responsive Header** - Sticky navigation with search, user, cart icons
- **Product Cards** - Hover effects, image zoom, Add to Cart
- **Category Cards** - Interactive navigation buttons
- **Feature Cards** - Icon-based feature highlights
- **Testimonial Cards** - Star ratings and customer photos
- **Footer** - Brand info, navigation, copyright

### Shopping Cart (useCart Hook)
- Add to cart functionality
- Update quantities
- Remove items
- Calculate totals
- Cart count badge

## 🎨 Design Principles

1. **Mobile-First Responsive** - Fully responsive from mobile to desktop
2. **Clean Code** - Well-organized, modular components
3. **Type Safety** - Full TypeScript support
4. **Performance** - Optimized images and lazy loading
5. **Accessibility** - Semantic HTML and ARIA labels
6. **Modern UI** - Contemporary design with smooth animations

## 📦 Data Structure

### Product Interface
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'necklace' | 'earring' | 'bracelet' | 'ring';
  description?: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}
```

### Mock Data Included
- 11 Products across all categories
- 4 Customer testimonials
- 3 Category types
- 3 Feature highlights
- 3 Instagram posts

## 🔄 Future Backend Integration

The app is structured to easily connect to any backend:

1. **API Routes Ready** - `/app/api/[[...path]]/route.js` for backend logic
2. **MongoDB Setup** - Environment configured for database
3. **Type Definitions** - All interfaces ready for API integration
4. **Hooks** - useCart can be extended for API calls

### Environment Variables
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=your_database_name
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 🎭 Customization

### Adding New Products
Edit `/lib/data/products.ts` and add:
```typescript
{
  id: '12',
  name: 'New Product',
  price: 99.00,
  image: 'image-url',
  category: 'necklace',
  newArrival: true,
}
```

### Changing Colors
Edit `/lib/constants/colors.ts`:
```typescript
export const COLORS = {
  blush: '#FFFDFD',
  warmEspresso: '#3E3636',
  dustyRose: '#D9B3B0',
};
```

### Adding Sections
Create new component in `/components/sections/` and import in `/app/page.tsx`

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
- **Large Desktop:** > 1400px (container max-width)

## 🔧 Development Notes

- All components use TypeScript for type safety
- Custom Tailwind colors defined in config
- Images use Next.js Image component for optimization
- Client components marked with 'use client' directive
- Server components are default (no directive needed)

## 📄 License

This is a custom-built e-commerce website for Your Fair Karn jewelry shop.

## 🙏 Credits

- Design inspiration from modern e-commerce websites
- Images from Unsplash (placeholder images)
- Icons from Heroicons

---

Built with ❤️ using Next.js and TypeScript
