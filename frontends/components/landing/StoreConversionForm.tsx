"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animation";
import { ConvertMyStoreButton, ShopifyStoreUrlInput } from "@/components/ui";

const SELL_ICON =
  "https://www.figma.com/api/mcp/asset/65affad4-a9f1-4571-bb67-9eb39ed01e81";

export function StoreConversionForm() {
  const [storeName, setStoreName] = useState("");

  return (
    <FadeUp delay={1.05} className="relative flex flex-col items-center gap-8">
      <div className="absolute -left-20 -translate-y-1/2 rotate-[-10.65deg]">
        <div className="flex items-center justify-center gap-1.5 rounded border border-[#3b82f6] bg-white px-2 py-2">
          <img src={SELL_ICON} alt="" className="h-3.5 w-3.5" />
          <span className="text-sm font-semibold text-[#3b82f6]">
            Free preview
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <ShopifyStoreUrlInput
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <ConvertMyStoreButton />
      </div>
    </FadeUp>
  );
}
