"use client";

import React from "react";
import { CollectionsHero } from "@/components/sections/collections/CollectionsHero";
import { CollectionsContent } from "@/components/sections/collections/CollectionsContent";

export default function CollectionsPage() {
  return (
    <div className="bg-brand-bg">
      <CollectionsHero />
      <CollectionsContent />
    </div>
  );
}
