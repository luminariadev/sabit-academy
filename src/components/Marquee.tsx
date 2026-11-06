"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const inner = marqueeRef.current?.querySelector(
        ".marquee-track"
      ) as HTMLElement;
      if (!inner) return;

      gsap.to(inner, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });

      // Scroll-based speed boost
      gsap.to(inner, {
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: "-=100",
        ease: "none",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const words = [
    "SABIT ACADEMY",
    "•",
    "INFORMATIKA",
    "•",
    "UIN SGD BANDUNG",
    "•",
    "AGENTIC AI",
    "•",
    "HERMES AGENT",
    "•",
    "OPEN SOURCE",
    "•",
    "FULLSTACK DEV",
    "•",
    "MACHINE LEARNING",
    "•",
  ];

  return (
    <div
      ref={marqueeRef}
      className="relative py-8 border-y border-border overflow-hidden bg-bg-primary"
    >
      <div className="marquee-track flex whitespace-nowrap w-max">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className={`mx-4 font-display text-4xl md:text-6xl font-bold ${
              word === "•"
                ? "text-accent-gold"
                : "text-text-primary/10 hover:text-text-primary/30 transition-colors duration-500"
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
