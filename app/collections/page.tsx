'use client';

import React from 'react';
import { CollectionsHero } from '@/components/sections/collections/CollectionsHero';
import { CollectionsContent } from '@/components/sections/collections/CollectionsContent';
import { COLORS } from '@/lib/constants/colors';

export default function CollectionsPage() {
  return (
    <div style={{ backgroundColor: COLORS.bgPrimary }}>
      <CollectionsHero />
      <CollectionsContent />
    </div>
  );
}
