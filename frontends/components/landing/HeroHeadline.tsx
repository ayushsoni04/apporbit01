"use client";

import { FadeUp, WordReveal } from "@/components/animation";

const headlineClass =
  "font-display text-9xl font-medium leading-[0.93] tracking-[-5.52px] text-[#353638]";

export function HeroHeadline() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center justify-center gap-6">
        <WordReveal
          text="Turn Your"
          as="h1"
          className={`${headlineClass} text-nowrap`}
          delay={0.15}
        />
        <FadeUp delay={0.45}>
          <img src="/shopifyxstore.png" alt="shopifyxstore" className="h-30 w-auto" />
        </FadeUp>
        <WordReveal
          text="Shopify"
          as="h1"
          className={headlineClass}
          delay={0.35}
        />
      </div>
      <WordReveal
        text="Store To An App"
        as="h1"
        className={headlineClass}
        delay={0.55}
      />
    </div>
  );
}
