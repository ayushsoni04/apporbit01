"use client";

import { useState } from "react";
import { ScrollReveal, WordReveal } from "@/components/animation";
import { ConvertMyStoreButton, ShopifyStoreUrlInput } from "@/components/ui";

const EndCTA = () => {
  const [storeName, setStoreName] = useState("");

  return (
    <section className="mx-auto w-[70%] max-w-[1512px] px-6 py-12 md:py-16">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
        <div className="flex w-full max-w-[560px] flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <WordReveal
            text="Catch Up With the Market"
            as="div"
            className="font-display text-xl text-black sm:text-2xl"
            triggerOnScroll
            stagger={0.05}
          />
          <WordReveal
            text="Convert To An App"
            as="div"
            className="font-display text-3xl font-bold text-black sm:text-4xl"
            triggerOnScroll
            stagger={0.06}
          />
          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row lg:items-start">
            <ShopifyStoreUrlInput
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <ConvertMyStoreButton className="w-full justify-center sm:w-auto" />
          <div className="flex items-center gap-2">
            <img src="./icons/credit.png" className="w-6 h-6" alt="" />
            <span className="text-xl font-medium text-[#b9b9b9]">No Credit Card Needed</span>
          </div>
        </div>
        <ScrollReveal className="flex w-full max-w-[560px] items-center justify-center lg:max-w-[640px]" delay={0.15}>
          <img
            src="/phone/phoneEndCTA.png"
            className="w-full max-w-[460px] object-contain sm:max-w-[520px] lg:max-w-none"
            alt="phone mockups"
          />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EndCTA;