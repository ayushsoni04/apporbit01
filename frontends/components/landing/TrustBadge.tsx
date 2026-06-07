"use client";

import { FadeUp } from "@/components/animation";

export function TrustBadge() {
  return (
    <FadeUp delay={1.15}>
      <div className="flex items-center gap-4">
        <img src="/icons/credit.png" alt="" className="h-6 w-6 shrink-0" />
        <span className="text-xl font-medium text-[#b9b9b9]">
          No credit card needed
        </span>
      </div>
    </FadeUp>
  );
}
