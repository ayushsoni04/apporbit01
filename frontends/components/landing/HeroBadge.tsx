"use client";

import { FadeUp } from "@/components/animation";

const BAG_ICON = "https://www.figma.com/api/mcp/asset/ebf3dd1e-d914-4ffe-b017-30fa6fe97359";

export function HeroBadge() {
  return (
    <FadeUp delay={0}>
      <div className="inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white bg-white px-6 py-2.5 shadow-sm">
        <img
          src={BAG_ICON}
          alt=""
          className="h-4 w-4 shrink-0 object-contain"
        />
        <span className="text-base font-medium text-[#3b82f6]">
          Join 5000+ Store Owners
        </span>
      </div>
    </FadeUp>
  );
}
