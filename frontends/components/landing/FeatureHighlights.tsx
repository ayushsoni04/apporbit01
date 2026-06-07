const DOT_GRID_STYLE = {
  backgroundImage: "radial-gradient(circle, #d9d9d9 1px, transparent 1px)",
  backgroundSize: "18px 18px",
} as const;

function FeatureCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[32px] border-4 border-[rgba(231,231,231,0.3)] bg-white/90 p-8 backdrop-blur-[36px] ${className}`}
      style={DOT_GRID_STYLE}
    >
      {children}
    </article>
  );
}

function CardFade({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white ${className}`}
    />
  );
}

function IntegrationCard() {
  return (
    <FeatureCard className="h-[398px]">
      <h3 className="max-w-[452px] font-display text-[34px] font-medium leading-tight text-black">
        Connects Seemlesly With Shopify And Its Plugins
      </h3>

      <img
        src="/features/shopify-integrations.png"
        alt="Shopify integrations with Stripe, Klaviyo, and Mailchimp"
        className="pointer-events-none absolute bottom-0 left-1/2 w-full max-w-[520px] -translate-x-1/2 object-contain"
      />
    </FeatureCard>
  );
}

function ApkOwnershipCard() {
  return (
    <FeatureCard className="h-[398px]">
      <div className="flex h-full flex-col gap-8">
        <h3 className="max-w-[396px] font-display text-[34px] font-medium leading-tight text-black">
          Your App. Your APK. Own It Forever.
        </h3>

        <div className="rounded-xl border-4 border-[rgba(194,194,194,0.28)] bg-white/90 px-3 py-[18px] backdrop-blur-[24px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src="/features/app-icon.png"
                  alt=""
                  className="size-[54px] shrink-0 rounded-lg object-cover"
                />
                <div>
                  <p className="text-2xl text-black">Yourapp.apk</p>
                  <p className="text-base text-[#606060]">24.5 MB</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#affa72] bg-[#4fe642] px-[11px] py-[5px]">
                <span className="text-xs text-[#306b00]">Ready</span>
                <img src="/features/icon-check.png" alt="" className="size-4" />
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#d9d9d9]">
              <div className="h-full w-full rounded-full bg-[#3b82f6]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex h-[220px] w-full max-w-[258px] flex-col items-center justify-center rounded-lg border-4 border-[#ededed] bg-white px-3 py-6 sm:h-[253px]">
            <img
              src="/features/icon-android.png"
              alt=""
              className="mb-2 h-[38px] w-[63px] object-contain"
            />
            <div className="flex items-end gap-1">
              <span className="text-[13px] font-medium text-black">
                Download Android APK
              </span>
              <img src="/features/icon-download.png" alt="" className="size-[18px]" />
            </div>
          </div>
          <div className="flex h-[220px] w-full max-w-[258px] flex-col items-center justify-center rounded-lg border-4 border-[#ededed] bg-white px-3 py-6 sm:h-[255px]">
            <img
              src="/features/icon-apple.png"
              alt=""
              className="mb-2 size-10 object-contain"
            />
            <div className="flex items-end gap-1">
              <span className="text-[13px] font-medium text-black">
                Download Android APK
              </span>
              <img src="/features/icon-download.png" alt="" className="size-[18px]" />
            </div>
          </div>
        </div>
      </div>

      <CardFade className="h-[64px]" />
    </FeatureCard>
  );
}

function LivePreviewCard() {
  return (
    <FeatureCard className="flex h-[828px] flex-col items-center">
      <div className="flex w-full max-w-[514px] flex-col items-center gap-[59px]">
        <h3 className="text-center font-display text-[34px] font-medium leading-tight text-black">
          Live Preview In
          <br />
          Under 10 Seconds
        </h3>

        <div className="relative mx-auto h-[620px] w-[300px] shrink-0">
          <img
            src="/phone/phone-jason.png"
            alt="Live app preview on phone"
            className="h-full w-full object-contain object-top drop-shadow-[0_24px_48px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>

      <CardFade className="h-[123px]" />
    </FeatureCard>
  );
}

export function FeatureHighlights() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-[1231px] flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex w-full max-w-[600px] flex-col gap-8">
          <IntegrationCard />
          <ApkOwnershipCard />
        </div>
        <div className="w-full max-w-[599px] lg:shrink-0">
          <LivePreviewCard />
        </div>
      </div>
    </section>
  );
}
