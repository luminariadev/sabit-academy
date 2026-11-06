"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initialize cursor positioning so it's centered on the mouse
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    // Hover effect for interactive elements: neo-brutalist invert/scale
    const handleHoverIn = () => {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: "#000",
        borderColor: "#000",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#FFD700", // Yellow filling
        borderColor: "#000",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Add hover effects to interactive elements
    const interactives = document.querySelectorAll(
      "a, button, input, [role='button']"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-4 border-black bg-[#FFD700] pointer-events-none z-[9999] hidden md:block shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors"
    >
      {/* Optional internal crosshair or icon could go here */}
    </div>
  );
}
