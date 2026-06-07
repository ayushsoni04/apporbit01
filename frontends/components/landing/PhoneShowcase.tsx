"use client";

import { useEffect, useRef, useState } from "react";

const HEADER_OFFSET = 86;
const FRAME_WIDTH = 1365.574;
const FRAME_HEIGHT_END = 941.666;

const CENTER_WIDTH = 396;
const CENTER_HEIGHT = 808;
const SMALL_WIDTH = 234.574;
const SMALL_HEIGHT = 478.666;
const CENTER_INITIAL_SCALE = 1.14;
const CENTER_SCALE_END = SMALL_WIDTH / CENTER_WIDTH;
const CENTER_START_OFFSET_Y = -64;

const INNER_ROW_WIDTH = 812;
const OUTER_ROW_WIDTH = FRAME_WIDTH;

const PHONES = [
  {
    id: "john",
    src: "/phone/phone-john.png",
    alt: "John Richardson portfolio app",
    x: -OUTER_ROW_WIDTH / 2 + SMALL_WIDTH / 2,
    startY: 1063,
    endY: 463,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
  {
    id: "monito",
    src: "/phone/phone-monito.png",
    alt: "Monito pet app",
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
    src: "/phone/phone-jet.png",
    alt: "Jet Hawken portfolio app",
    x: INNER_ROW_WIDTH / 2 - SMALL_WIDTH / 2,
    startY: 902,
    endY: 302,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
  {
    id: "jason",
    src: "/phone/phone-jason.png",
    alt: "Jason Markus marketing app",
    x: OUTER_ROW_WIDTH / 2 - SMALL_WIDTH / 2,
    startY: 1063,
    endY: 463,
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
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

export function PhoneShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = clamp(-rect.top, 0, scrollableDistance);
      setProgress(scrolled / scrollableDistance);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [viewportHeight]);

  const easedProgress = easeInOutCubic(progress);
  const centerScale = lerp(CENTER_INITIAL_SCALE, CENTER_SCALE_END, easedProgress);

  const initialCenterHeight = CENTER_HEIGHT * CENTER_INITIAL_SCALE;
  const startSceneOffset =
    (viewportHeight / viewportScale - initialCenterHeight) / 2 +
    CENTER_START_OFFSET_Y;
  const endSceneOffset =
    (viewportHeight / viewportScale - FRAME_HEIGHT_END) / 2;
  const sceneOffsetY = lerp(startSceneOffset, endSceneOffset, easedProgress);

  return (
    <section
      ref={sectionRef}
      className="relative h-[240vh] pt-16"
      aria-label="App preview showcase"
    >
      <div className="sticky top-[86px] flex h-[calc(100vh-86px)] items-start justify-center overflow-hidden px-6">
        <div
          className="relative will-change-transform"
          style={{
            width: FRAME_WIDTH * viewportScale,
            height: FRAME_HEIGHT_END * viewportScale,
            transform: `translateY(${sceneOffsetY * viewportScale}px)`,
          }}
        >
          {PHONES.map((phone) => {
            const y = lerp(phone.startY, phone.endY, easedProgress) * viewportScale;
            const x = phone.x * viewportScale;
            const width = phone.width * viewportScale;
            const height = phone.height * viewportScale;
            const isCenter = phone.id === "center";
            const zIndex = isCenter ? 30 : 10;

            return (
              <div
                key={phone.id}
                className="absolute left-1/2 overflow-visible"
                style={{
                  top: y,
                  width,
                  height,
                  transform: isCenter
                    ? `translateX(calc(-50% + ${x}px)) scale(${centerScale})`
                    : `translateX(calc(-50% + ${x}px))`,
                  transformOrigin: isCenter ? "top center" : "center center",
                  zIndex,
                }}
              >
                {isCenter ? (
                  <CenterPhoneMockup alt={phone.alt} />
                ) : (
                  <img
                    src={phone.src}
                    alt={phone.alt}
                    className="h-full w-full object-contain object-top drop-shadow-[0_24px_48px_rgba(0,0,0,0.18)]"
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
