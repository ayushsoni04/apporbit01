"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
};

export function WordReveal({
  text,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.07,
  triggerOnScroll = false,
}: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll<HTMLElement>("[data-word]");

    gsap.set(words, { yPercent: 110, opacity: 0 });

    const animation = gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: triggerOnScroll
        ? {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        : undefined,
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [text, delay, stagger, triggerOnScroll]);

  const tokens = text.split(" ");

  return (
    <Tag ref={containerRef as never} className={className}>
      {tokens.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block will-change-transform">
            {word}
          </span>
          {index < tokens.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}
