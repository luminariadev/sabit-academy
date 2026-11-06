"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw SVG paths
      const paths = gsap.utils.toArray<SVGPathElement>(".rainbow-path");
      
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      });

      // Manifesto text animation
      gsap.from(".manifesto-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
      
      // Floating image animation
      gsap.to(".floating-img", {
        y: -20,
        rotation: 3,
        ease: "sine.inOut",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 px-6 md:px-12 bg-light-plus overflow-hidden brutal-border border-l-0 border-r-0"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative">
        
        {/* SVG Decorative Rainbow */}
        <div className="absolute top-0 right-0 -z-0 opacity-40 md:opacity-100 pointer-events-none w-full md:w-1/2 h-full flex justify-end">
          <svg
            ref={svgRef}
            viewBox="0 0 500 500"
            className="w-[150%] max-w-[800px] h-auto drop-shadow-[4px_4px_0_#000]"
            fill="none"
            strokeLinecap="round"
          >
            <path
              className="rainbow-path"
              d="M 500,500 C 500,200 200,0 -100,0"
              stroke="#FFC900" // Mango
              strokeWidth="24"
            />
            <path
              className="rainbow-path"
              d="M 500,500 C 500,240 240,40 -100,40"
              stroke="#FF90E8" // Pink
              strokeWidth="24"
            />
            <path
              className="rainbow-path"
              d="M 500,500 C 500,280 280,80 -100,80"
              stroke="#2DD4BF" // Teal
              strokeWidth="24"
            />
            <path
              className="rainbow-path"
              d="M 500,500 C 500,320 320,120 -100,120"
              stroke="#FF6B6B" // Orange-ish
              strokeWidth="24"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 relative z-10 flex flex-col gap-8">
          <h2 className="font-display text-6xl md:text-8xl font-black uppercase text-black drop-shadow-[6px_6px_0_rgba(0,0,0,1)] manifesto-text text-white" style={{ WebkitTextStroke: "2px black" }}>
            WE DON'T DO BORING.
          </h2>
          
          <div className="bg-white brutal-border brutal-shadow arch-card p-8 md:p-12 relative -rotate-2 manifesto-text">
            <p className="font-sans text-xl md:text-2xl font-bold leading-relaxed text-black">
              Sabit Academy is the ultimate playground for digital rebels. We believe in bold colors, loud designs, and breaking every rule in the book while building the web of tomorrow.
            </p>
          </div>
        </div>

        {/* Floating Image */}
        <div className="w-full md:w-1/2 relative z-10 flex justify-center md:justify-end mt-12 md:mt-0">
          <div className="relative w-72 h-80 md:w-96 md:h-[28rem] floating-img rotate-3">
            <Image
              src="/images/vibe1.jpg"
              alt="Creative vibes"
              fill
              className="object-cover brutal-border brutal-shadow"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
