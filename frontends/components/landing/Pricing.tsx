import Link from "next/link";

const PLANS = [
  {
    id: "free",
    badge: "Free Plan",
    badgeVariant: "muted" as const,
    price: "$0",
    priceSub: null as string | null,
    description: "See your store as an app before you commit to anything",
    features: [
      "Live app preview using your real store data",
      "See your actual products, collections and images",
      "No credit card required",
    ],
    ctaVariant: "secondary" as const,
    featured: false,
  },
  {
    id: "builder",
    badge: "Builder Plan",
    badgeVariant: "accent" as const,
    price: "$99/",
    priceSub: "one time",
    description: "Everything you need to launch your app and own it outright",
    features: [
      "Everything in Preview",
      "Complete customization colors, fonts, layout",
      "Android & IOS APK download",
      "Shopify sync auto-updates when your store changes",
      "Other app only features",
    ],
    ctaVariant: "primary" as const,
    featured: true,
  },
  {
    id: "enterprise",
    badge: "Enterprise Plan",
    badgeVariant: "muted" as const,
    price: "Custom",
    priceSub: null as string | null,
    description:
      "Complex stores, custom integrations, and priority support from our team.",
    features: [
      "Everything in Builder",
      "Custom React Native development",
      "Custom integrations and features",
      "Priority support",
    ],
    ctaVariant: "secondary" as const,
    featured: false,
  },
] as const;

function CheckIcon({ accent }: { accent?: boolean }) {
  return (
    <svg
      className={`mt-0.5 size-[19px] shrink-0 ${accent ? "text-[#3b82f6]" : "text-[#c5c5c5]"}`}
      viewBox="0 0 19 19"
      fill="none"
      aria-hidden
    >
      <circle
        cx="9.5"
        cy="9.5"
        r="8.25"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5.8 9.55 8.2 12l4.4-4.4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CtaChevron({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-current ${className ?? ""}`}
      aria-hidden
    >
      <svg className="size-2.5" viewBox="0 0 10 10" fill="none">
        <path
          d="M3.5 2 6.5 5 3.5 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CurrencySelect() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-[40px] border-[1.5px] border-[#e8e8ea] bg-white px-[18px] py-2.5 shadow-sm">
      <span className="text-xl leading-none" aria-hidden>
        🇺🇸
      </span>
      <div className="relative">
        <label htmlFor="pricing-currency" className="sr-only">
          Currency
        </label>
        <select
          id="pricing-currency"
          name="pricing-currency"
          className="cursor-pointer appearance-none bg-transparent py-0 pl-0 pr-7 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 rounded-sm"
          defaultValue="usd"
        >
          <option value="usd">dollar</option>
        </select>
        <svg
          className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-[#454545]"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 6.5 8 10.5 12 6.5M4 9.5 8 5.5 12 9.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-[100px] py-16 font-sans md:py-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-6 md:gap-[42px]">
        <h2 className="max-w-[900px] text-center font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-black md:text-5xl lg:text-[56px] lg:leading-[1.08]">
          Own Your App Without Owning A Monthly Bill
        </h2>

        <CurrencySelect />

        <div className="flex w-full flex-col items-stretch justify-center gap-6 lg:flex-row lg:items-start lg:gap-8 xl:gap-[33px]">
          {PLANS.map((plan) => {
            if (plan.featured) {
              return (
                <div
                  key={plan.id}
                  className="relative mx-auto  flex w-full max-w-[404px] flex-col lg:mx-0 lg:mt-0"
                >
                  <div className="bg-[#3B82F6] rounded-[25px] py-3 flex-col ">
                    <p className="text-white text-center text-xl font-medium ">
                      Most Popular
                    </p>
                    <div className="relative mx-1 z-0  my-1 flex min-h-[560px] flex-col rounded-[25px]  bg-white md:min-h-[600px] md:p-[34px] md:pt-12">
                      <div className="flex flex-1 flex-col gap-8">
                        <div className="flex flex-col gap-8">
                          <div className="inline-flex w-fit items-center rounded-[40px] border-2 border-[#659df9] px-3 py-2">
                            <span className="text-base font-normal text-[#659df9]">
                              {plan.badge}
                            </span>
                          </div>
                          <div className="flex flex-col gap-4">
                            <p className="text-[0px] leading-none">
                              <span className="text-[clamp(3rem,8vw,4.875rem)] font-normal text-[#3b82f6]">
                                {plan.price}
                              </span>
                              {plan.priceSub && (
                                <span className="ml-1 text-2xl font-medium capitalize text-black">
                                  {plan.priceSub}
                                </span>
                              )}
                            </p>
                            <p className="max-w-[320px] text-[15.72px] font-medium leading-6 text-[#454545]">
                              {plan.description}
                            </p>
                          </div>
                          <ul className="flex flex-col gap-3">
                            {plan.features.map((feature) => (
                              <li key={feature} className="flex gap-2">
                                <CheckIcon accent />
                                <span className="text-base font-medium leading-6 text-[#454545]">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Link
                        href="/signup"
                        className="relative mt-10 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-[#3b82f6] bg-[#3b82f6] px-8 py-2.5 text-lg font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb]"
                      >
                        Convert My Store
                        <CtaChevron />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={plan.id}
                className="mx-auto flex w-full max-w-[382px] flex-col btn-gradient-1 bg-white p-8  md:min-h-[560px] lg:mx-0 lg:mt-[40px]"
              >
                <div className="flex flex-1 flex-col gap-8">
                  <div className="inline-flex w-fit items-center  px-3 py-2">
                    <span className="text-base font-normal text-[#c5c5c5]">
                      {plan.badge}
                    </span>
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <p
                        className={`font-normal text-black ${plan.id === "enterprise" ? "text-[56px] leading-none" : "text-[72px] leading-none"}`}
                      >
                        {plan.price}
                      </p>
                      <p className="max-w-[244px] text-[15.72px] font-medium leading-6 text-[#454545]">
                        {plan.description}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <CheckIcon />
                          <span className="text-base font-medium leading-6 text-[#454545]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link
                  href="/signup"
                  className="relative mt-10 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-[#d2d2d2] bg-[#e3e3e3] px-8 py-2.5 text-lg font-normal text-black shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#d8d8d8]"
                >
                  Convert My Store
                  <CtaChevron className="text-black" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
