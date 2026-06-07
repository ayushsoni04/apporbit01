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

      <div className="pointer-events-none absolute left-1/2 top-[167px] h-[619px] w-[554px] -translate-x-1/2">
        <img
          src="/features/integration-arcs-v2.png"
          alt=""
          className="absolute left-1/2 top-0 h-[619px] w-[614px] max-w-none -translate-x-1/2"
        />
        <div className="absolute -left-5 top-[39px] h-[189px] w-[596px]">
          <img
            src="/features/integration-shopify.png"
            alt="Shopify"
            className="absolute left-[60px] top-[29px] h-[32px] w-[85px] object-contain"
          />
          <img
            src="/features/integration-klaviyo.png"
            alt="Klaviyo"
            className="absolute left-[145px] top-[99px] h-[74px] w-[131px] object-contain"
          />
          <div className="absolute left-[316px] top-0 flex h-[78px] w-[75px] items-center justify-center">
            <img
              src="/features/integration-stripe.png"
              alt="Stripe"
              className="h-[61px] w-[54px] rotate-[24.7deg] object-contain"
            />
          </div>
          <img
            src="/features/integration-mailchimp.png"
            alt="Mailchimp"
            className="absolute left-[454px] top-[121px] h-[30px] w-[101px] object-contain"
          />
        </div>
      </div>
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
    <FeatureCard className="flex h-[828px] w-full flex-col items-center">
      <div className="flex h-[826px] w-full max-w-[515px] flex-col items-center gap-[59px]">
        <h3 className="w-full font-display text-[34px] font-medium leading-tight text-black">
          Live Preview In
          <br />
          Under 10 Seconds
        </h3>

        <div className="relative aspect-[639/1051] w-[639px] max-w-[calc(100vw-80px)] shrink-0">
          <div className="absolute left-[13.77%] top-[2.86%] h-[55.91%] w-[71.96%] overflow-hidden rounded-[34px]">
            <img
              src="/features/live-preview-screen.png"
              alt="Live app preview"
              className="size-full object-cover object-top"
            />
          </div>
          <div className="absolute inset-x-[9.7%] bottom-[1.01%] top-0 pointer-events-none">
            <img
              src="/features/live-preview-frame.png"
              alt=""
              className="size-full object-contain object-top"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[-4px] left-[-4px] h-[123px] w-[calc(100%+8px)] bg-gradient-to-b from-transparent to-white" />
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
