"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

const HEADER_OFFSET = 86;
const FRAME_WIDTH = 1365.574;
const FRAME_HEIGHT_END = 941.666;

const CENTER_WIDTH = 396;
const CENTER_HEIGHT = 808;
const SMALL_WIDTH = 234.574;
const SMALL_HEIGHT = 478.666;
const CENTER_INITIAL_SCALE = 1.14;
const CENTER_SCALE_END = SMALL_WIDTH / CENTER_WIDTH;
const CENTER_START_OFFSET_Y = -48;

const INNER_ROW_WIDTH = 812;
const OUTER_ROW_WIDTH = FRAME_WIDTH;

const PHONES = [
  {
    id: "john",
    alt: "John Richardson portfolio app",
    x: -OUTER_ROW_WIDTH / 2 + SMALL_WIDTH / 2,
    startY: 1063,
    endY: 463,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
  {
    id: "monito",
    alt: "Furniture shopping app preview",
    x: -INNER_ROW_WIDTH / 2 + SMALL_WIDTH / 2,
    startY: 902,
    endY: 302,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
  {
    id: "center",
    alt: "Nebulla shopping app preview",
    x: 0,
    startY: 0,
    endY: 0,
    width: CENTER_WIDTH,
    height: CENTER_HEIGHT,
  },
  {
    id: "jet",
    alt: "Jet Hawken portfolio app",
    x: INNER_ROW_WIDTH / 2 - SMALL_WIDTH / 2,
    startY: 902,
    endY: 302,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
  {
    id: "jason",
    alt: "Jason Markus marketing app",
    x: OUTER_ROW_WIDTH / 2 - SMALL_WIDTH / 2,
    startY: 1063,
    endY: 463,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
] as const;

function JohnPhoneMockup({ alt }: { alt: string }) {
  return (
    <div className="relative size-full overflow-visible">
      <div className="pointer-events-none absolute inset-[0_-60.3%_0.56%_0] overflow-visible">
        <img
          src="/phone/phone-john-shadow.png"
          alt=""
          className="absolute left-0 top-0 size-full max-w-none object-cover object-left"
          draggable={false}
        />
      </div>
      <div className="absolute left-[4.26%] top-[1.67%] h-[95.5%] w-[92.5%] overflow-hidden rounded-[24px] bg-white">
        <img
          src="/phone/phone-john-screen.png"
          alt={alt}
          className="size-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[1.6%] top-0">
        <img
          src="/phone/phone-john-frame.png"
          alt=""
          className="size-full object-contain object-top"
          draggable={false}
        />
      </div>
    </div>
  );
}

function JasonPhoneMockup({ alt }: { alt: string }) {
  return (
    <div className="relative size-full overflow-visible">
      <div className="pointer-events-none absolute inset-[0_-60.3%_0.56%_0] overflow-visible">
        <img
          src="/phone/phone-jason-shadow.png"
          alt=""
          className="absolute left-0 top-0 size-full max-w-none object-cover object-left"
          draggable={false}
        />
      </div>
      <div className="absolute left-[4.26%] top-[1.67%] h-[95.5%] w-[92.5%] overflow-hidden rounded-[24px] bg-white">
        <img
          src="/phone/phone-jason-screen.png"
          alt={alt}
          className="size-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[1.6%] top-0">
        <img
          src="/phone/phone-jason-frame.png"
          alt=""
          className="size-full object-contain object-top"
          draggable={false}
        />
      </div>
    </div>
  );
}

function MonitoPhoneMockup({ alt }: { alt: string }) {
  return (
    <div className="relative size-full overflow-visible">
      <div className="pointer-events-none absolute inset-[0_-60.3%_0.55%_0] overflow-visible">
        <img
          src="/phone/phone-monito-shadow.png"
          alt=""
          className="absolute left-0 top-0 size-full max-w-none object-cover object-left"
          draggable={false}
        />
      </div>
      <div className="absolute left-[2.56%] top-[1.46%] h-[95%] w-[94.7%] overflow-hidden rounded-[27px] bg-white shadow-[27px_27px_76px_-7px_rgba(90,66,42,0.2)]">
        <img
          src="/phone/phone-monito-screen.png"
          alt={alt}
          className="size-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[1.6%] top-0">
        <img
          src="/phone/phone-monito-frame.png"
          alt=""
          className="size-full object-contain object-top"
          draggable={false}
        />
      </div>
    </div>
  );
}

function JetPhoneMockup({ alt }: { alt: string }) {
  return (
    <div className="relative size-full overflow-visible">
      <div className="pointer-events-none absolute inset-[0_-62%_-16%_0] overflow-visible">
        <img
          src="/phone/phone-jet-shadow.png"
          alt=""
          className="absolute left-0 top-0 size-full max-w-none object-cover object-left"
          draggable={false}
        />
      </div>
      <div className="absolute left-1/2 top-[1.67%] h-[96.3%] w-[91.2%] -translate-x-1/2 overflow-hidden rounded-[17px] bg-white">
        <img
          src="/phone/phone-jet-screen.png"
          alt={alt}
          className="size-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[1%] top-0">
        <img
          src="/phone/phone-jet-frame.png"
          alt=""
          className="size-full object-contain object-top"
          draggable={false}
        />
      </div>
    </div>
  );
}

function CenterPhoneMockup({ alt }: { alt: string }) {
  return (
    <div className="relative size-full overflow-visible">
      <div className="pointer-events-none absolute inset-[0_-62%_-16%_0] overflow-visible">
        <img
          src="/phone/phone-center-shadow.png"
          alt=""
          className="absolute left-0 top-0 size-full max-w-none object-cover object-left"
          draggable={false}
        />
      </div>
      <div className="absolute inset-[1.9%_5%_2.1%_5%] overflow-hidden rounded-[26px] bg-white">
        <img
          src="/phone/phone-center-screen.png"
          alt={alt}
          className="absolute inset-0 size-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[1%] top-0">
        <img
          src="/phone/phone-center-frame.png"
          alt=""
          className="size-full object-contain object-top"
          draggable={false}
        />
      </div>
    </div>
  );
}

function PhoneMockup({ id, alt }: { id: (typeof PHONES)[number]["id"]; alt: string }) {
  switch (id) {
    case "center":
      return <CenterPhoneMockup alt={alt} />;
    case "john":
      return <JohnPhoneMockup alt={alt} />;
    case "monito":
      return <MonitoPhoneMockup alt={alt} />;
    case "jet":
      return <JetPhoneMockup alt={alt} />;
    case "jason":
      return <JasonPhoneMockup alt={alt} />;
  }
}

export function PhoneShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const phoneRefs = useRef<Partial<Record<(typeof PHONES)[number]["id"], HTMLDivElement>>>({});
  const [viewportScale, setViewportScale] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    const updateLayout = () => {
      const availableWidth = window.innerWidth - 48;
      setViewportScale(Math.min(1, availableWidth / FRAME_WIDTH));
      setViewportHeight(window.innerHeight - HEADER_OFFSET);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useLayoutEffect(() => {
    registerGsapPlugins();

    const section = sectionRef.current;
    const scene = sceneRef.current;
    if (!section || !scene) return;

    const scale = viewportScale;
    const vh = viewportHeight;

    const initialCenterHeight = CENTER_HEIGHT * CENTER_INITIAL_SCALE;
    const startSceneOffset =
      (vh / scale - initialCenterHeight) / 2 + CENTER_START_OFFSET_Y;
    const endSceneOffset = (vh / scale - FRAME_HEIGHT_END) / 2;

    const ctx = gsap.context(() => {
      gsap.set(scene, { y: startSceneOffset * scale });

      PHONES.forEach((phone) => {
        const el = phoneRefs.current[phone.id];
        if (!el) return;

        const x = phone.x * scale;
        const isCenter = phone.id === "center";

        gsap.set(el, {
          top: phone.startY * scale,
          width: phone.width * scale,
          height: phone.height * scale,
          xPercent: -50,
          x,
          scale: isCenter ? CENTER_INITIAL_SCALE : 1,
          transformOrigin: isCenter ? "top center" : "center center",
          zIndex: isCenter ? 30 : 10,
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        scene,
        { y: endSceneOffset * scale, duration: 1 },
        0,
      );

      PHONES.forEach((phone) => {
        const el = phoneRefs.current[phone.id];
        if (!el) return;

        timeline.to(
          el,
          {
            top: phone.endY * scale,
            scale: phone.id === "center" ? CENTER_SCALE_END : 1,
            duration: 1,
          },
          0,
        );
      });
    }, section);

    return () => ctx.revert();
  }, [viewportScale, viewportHeight]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[240vh] pt-16"
      aria-label="App preview showcase"
    >
      <div className="sticky top-[86px] flex h-[calc(100vh-86px)] items-start justify-center overflow-hidden px-6">
        <div
          ref={sceneRef}
          className="relative will-change-transform"
          style={{
            width: FRAME_WIDTH * viewportScale,
            height: FRAME_HEIGHT_END * viewportScale,
          }}
        >
          {PHONES.map((phone) => (
            <div
              key={phone.id}
              ref={(el) => {
                if (el) phoneRefs.current[phone.id] = el;
              }}
              className="absolute left-1/2 overflow-visible"
            >
              <PhoneMockup id={phone.id} alt={phone.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
