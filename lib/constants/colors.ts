export const COLORS = {
  blush: '#FFFDFD',
  warmEspresso: '#3E3636',
  dustyRose: '#D9B3B0',
} as const;

export type ColorKey = keyof typeof COLORS;
