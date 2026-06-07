"use client";

import { FadeUp, WordReveal } from "@/components/animation";

const BULLET_ICON =
  "https://www.figma.com/api/mcp/asset/6c8a2797-1c7f-452f-8747-071d5dfe36ed";

export function HeroTagline() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <WordReveal
        text="The Easiest Way to Launch Your Shopify App"
        as="p"
        className="text-center text-xl text-[#171717]"
        delay={0.75}
        stagger={0.04}
      />
      <FadeUp delay={1.05}>
        <img src={BULLET_ICON} alt="" className="h-[4.4px] w-[4.4px] shrink-0" />
      </FadeUp>
      <WordReveal
        text="No Code Needed"
        as="p"
        className="text-center text-xl text-[#171717]"
        delay={0.95}
        stagger={0.06}
      />
    </div>
  );
}
