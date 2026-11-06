"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" }
    );

    tl.fromTo(
      textRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
      "-=0.2"
    );

    tl.to(screenRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2,
    });
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] bg-[#f489a3] flex flex-col items-center justify-center"
    >
      <div ref={logoRef} className="flex flex-col items-center gap-4 mb-8">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 drop-shadow-[4px_4px_0_#121212]"
        >
          <path
            d="M20 2C13 2 7 8 7 16C7 24 13 30 20 30C15 30 11 25 11 19C11 13 15 8 20 8C25 8 29 12 29 17C29 10 25 2 20 2Z"
            fill="#f3ecd2"
            stroke="#121212"
            strokeWidth="2"
          />
          <circle cx="28" cy="12" r="3" fill="#f3a20f" stroke="#121212" strokeWidth="2" />
        </svg>
        <span className="font-display text-4xl text-[#121212] font-bold tracking-tight">
          SABIT
        </span>
      </div>

      <span
        ref={textRef}
        className="text-sm font-bold font-body text-[#121212] tracking-widest uppercase mb-8"
      >
        Menyiapkan Festival...
      </span>

      <div className="w-64 h-4 bg-[#f3ecd2] brutal-border brutal-shadow rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-[#f3a20f] border-r-2 border-dark origin-left"
        />
      </div>
    </div>
  );
}
