export function HeroHeadline() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center justify-center gap-6">
        <h1 className="font-display text-9xl text-nowrap font-medium leading-[0.93] tracking-[-5.52px] text-[#353638]">
          Turn Your
        </h1>
        <img src="/shopifyxstore.png" alt="shopifyxstore" className="h-30 w-auto" />
        <h1 className="font-display text-9xl font-medium leading-[0.93] tracking-[-5.52px] text-[#353638]">
          Shopify
        </h1>
      </div>
      <h1 className="font-display text-9xl font-medium leading-[0.93] tracking-[-5.52px] text-[#353638]">
        Store To An App
      </h1>
    </div>
  );
}
