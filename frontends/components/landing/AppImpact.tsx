const HERO_SHADOW_IMAGE =
  "https://www.figma.com/api/mcp/asset/3bb36fc7-03ef-4c37-8f5a-93b843d89938";
const HERO_SCREEN_IMAGE =
  "https://www.figma.com/api/mcp/asset/cd42ebce-cd5e-46cd-afc7-27ac68c0899c";
const HERO_PHONE_FRAME_IMAGE =
  "https://www.figma.com/api/mcp/asset/e0515e41-10d6-4893-b278-4f4af773b177";



const FEATURE_CARDS = [
  {
    title: "Push Notifications",
    description:
      "Gets your offers in front of customers the moment you send them, with no inbox or algorithm in the way.",
  },
  {
    title: "Abandoned Cart Recovery",
    description:
      "Automatically follows up with customers who left without buying so no revenue slips away quietly.",
  },
  {
    title: "Home Screen Presence",
    description:
      "Your store lives on their phone permanently instead of disappearing once a browser tab is closed.",
  },
  {
    title: "Real-Time Order Tracking",
    description:
      "Removes browser redirects and third-party tracking pages from the post-purchase experience.",
  },
  {
    title: "Wishlist & Save For Later",
    description:
      "Gives high-intent customers a reason to return and buy what they already chose.",
  },
  {
    title: "Home Screen Widget",
    description:
      "Show deals, cart status, or order tracking directly on the home screen without opening the app.",
  },
] as const;

function ImpactCallout({
  title,
  body,
  side,
  top,
}: {
  title: string;
  body: string;
  side: "left" | "right";
  top: string;
}) {
  const sideClasses =
    side === "left"
      ? "xl:absolute xl:left-0 xl:items-end xl:border-r-2 xl:border-r-[#3b82f6] xl:pr-6 xl:text-right"
      : "xl:absolute xl:right-0 xl:items-start xl:border-l-2 xl:border-l-[#3b82f6] xl:pl-6 xl:text-left";

  return (
    <article
      className={`flex w-full max-w-[360px] flex-col gap-2 rounded-xl bg-white/85 p-4 text-left backdrop-blur-sm max-xl:border max-xl:border-[#e8e8ea] max-xl:shadow-sm ${sideClasses} ${top}`}
    >
      <h3 className="font-display text-[26px] font-medium leading-[1.1] tracking-tight text-black">
        {title}
      </h3>
      <p className="text-[16px] leading-[1.35] text-[#8f8787]">{body}</p>
    </article>
  );
}

function FeaturePreview({ index }: { index: number }) {
  return (
    <div className="relative h-[232px] bg-[#F3F3F3] overflow-hidden rounded-[18px] border border-[#ececef]">
        <img
          src="/phone/card1.png"
          alt=""
          className="h-full w-full object-contain opacity-85"
          loading="lazy"
        />
    
    </div>
  );
}

export function AppImpact() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-14 px-6">
        <h2 className="mx-auto max-w-[620px] text-center font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-black md:text-6xl">
          What Having An App Does For You
        </h2>

        <img src="/phone/phoneEndCTA.png" className="w-1/2 mx-auto p-6" alt="phone cta" />

        <div className="grid gap-[26px] md:grid-cols-2 xl:grid-cols-3">
          {FEATURE_CARDS.map((feature, index) => (
            <article
              key={feature.title}
              className="rounded-[26px] border border-[#e6e6ea] bg-white p-[22px] shadow-[0_8px_24px_rgba(10,10,15,0.04)]"
            >
              <FeaturePreview index={index} />
              <div className="mt-5">
                <h3 className="font-display text-xl font-medium leading-[1.06] tracking-[-0.02em] text-black">
                  {feature.title}
                </h3>
                <p className="mt-3 text-lg  leading-[1.4] text-black">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
