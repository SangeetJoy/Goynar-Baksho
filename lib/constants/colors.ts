export const COLORS = {
  // Backgrounds
  bgPrimary: '#121212',        // Main background - deep charcoal
  bgSecondary: '#1C1C1C',      // Secondary background for cards/sections
  
  // Accents
  accentPrimary: '#A66D70',    // Dusty Rose - primary accent (buttons)
  accentGlow: '#3D2B2E',       // Reddish-brown glow for hover effects
  
  // Text
  textHeading: '#E2C29C',      // Champagne gold for headings
  textBody: '#FFFFFF',         // Pure white for body text and nav
  
  // Product
  productBackdrop: '#5C3D41',  // Muted mauve gradient for product cards
  
  // Legacy (keeping for compatibility)
  blush: '#121212',
  warmEspresso: '#E2C29C',
  dustyRose: '#A66D70',
} as const;

export type ColorKey = keyof typeof COLORS;
