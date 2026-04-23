const FEATURES = [
  {
    title: "Live store preview",
    description:
      "See how your Shopify store looks as a mobile app before you commit. Enter your store URL and browse real products in an app-style layout.",
    icon: "Preview",
  },
  {
    title: "Real product data",
    description:
      "Pull products, images, prices, and descriptions directly from your store via Shopify. Search and filters work on your actual catalog.",
    icon: "Catalog",
  },
  {
    title: "No-code to start",
    description:
      "Free tier needs no setup—just your store URL. Preview on the spot. Upgrade when you’re ready to ship a real app.",
    icon: "Rocket",
  },
  {
    title: "Shopify API integration",
    description:
      "Pro plan connects your app to Shopify so orders, inventory, and customers stay in sync. One source of truth for your store.",
    icon: "Plug",
  },
  {
    title: "App Store ready",
    description:
      "Pro and Custom builds are designed to meet store guidelines. Get a shippable iOS and Android app, not just a prototype.",
    icon: "Store",
  },
  {
    title: "Custom design option",
    description:
      "Need a unique look or flow? Custom App tier gives you a design-from-scratch experience tailored to your brand.",
    icon: "Palette",
  },
] as const;

const ICONS: Record<string, React.ReactNode> = {
  Preview: (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Catalog: (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Rocket: (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Plug: (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  Store: (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Palette: (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
};

export function Features() {
  return (
    <section id="features" className="scroll-mt-[100px] border-t border-[#eee] bg-[#fafafa]">
      <div className="mx-auto max-w-[1107px] px-6 py-16 md:py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-4xl font-medium tracking-[-1.5px] text-[#353638] md:text-5xl">
            Why nebulla.ai
          </h2>
          <p className="max-w-[520px] text-lg text-[#6e6e73]">
            Everything you need to turn your Shopify store into a real mobile app—from preview to launch.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-2xl border border-[#e5e5e5] bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f7ff] text-[#3b82f6]">
                {ICONS[feature.icon]}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-[#353638] md:text-xl">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
