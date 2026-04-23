import { Header } from "./Header";
import { HeroBadge } from "./HeroBadge";
import { HeroHeadline } from "./HeroHeadline";
import { HeroTagline } from "./HeroTagline";
import { Features } from "./Features";
import { AppImpact } from "./AppImpact";
import { PhoneMockup } from "./PhoneMockup";
import { Pricing } from "./Pricing";
import { StoreConversionForm } from "./StoreConversionForm";
import { TrustBadge } from "./TrustBadge";
import { Footer } from "./Footer";
import EndCTA from "./EndCTA";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[86px]">
        <section className="mx-auto flex max-w-[1107px] flex-col items-center gap-8 px-6 pt-[101px]">
          <div className="flex flex-col items-center gap-[72px]">
            <div className="flex flex-col items-center gap-6">
              <HeroBadge />
              <div className="flex flex-col items-center gap-4">
                <HeroHeadline />
                <HeroTagline />
              </div>
            </div>
            <div className="flex flex-col items-center gap-8">
              <StoreConversionForm />
              <TrustBadge />
            </div>
          </div>
        </section>
        <section className="flex justify-center px-6 pb-24 pt-16">
          <PhoneMockup />
        </section>
        {/* <Features /> */}
        <AppImpact />
        <Pricing />
        <EndCTA />
      </main>
      <Footer />
    </div>
  );
}
