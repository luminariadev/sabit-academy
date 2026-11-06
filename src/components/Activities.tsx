"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    title: "Konsultasi Akademik",
    tag: "Mentoring",
    image: "/images/vibe2.jpg",
    rotate: "-rotate-3",
  },
  {
    title: "Tech Talk & Diskusi",
    tag: "Diskusi",
    image: "/images/vibe3.jpg",
    rotate: "rotate-6",
  },
  {
    title: "Project Kolaboratif",
    tag: "Coding",
    image: "/images/vibe2.jpg",
    rotate: "-rotate-6",
  },
  {
    title: "Workshop & Bootcamp",
    tag: "Belajar",
    image: "/images/vibe3.jpg",
    rotate: "rotate-3",
  },
  {
    title: "Community Meetup",
    tag: "Networking",
    image: "/images/vibe2.jpg",
    rotate: "-rotate-3",
  },
];

export default function Activities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".activity-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".activity-list",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#fdfbf7] border-t-[3px] border-[#121212] overflow-hidden">
      <div className="container-xl mx-auto px-6 lg:px-12">
        <div className="mb-16 inline-flex border-[3px] border-[#121212] bg-[#f489a3] px-6 py-2 shadow-[4px_4px_0px_0px_#121212]">
          <span className="text-sm font-display font-bold uppercase tracking-widest text-[#121212]">
            02 / Kegiatan
          </span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl font-black uppercase mb-16 text-[#121212]">
          Kegiatan <span className="text-[#f3a20f] bg-white border-[3px] border-[#121212] px-4 py-1 shadow-[4px_4px_0px_0px_#121212]">SABIT</span>
        </h2>
        
        <div className="activity-list border-t-[4px] border-[#121212]">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="activity-item group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b-[4px] border-[#121212] cursor-pointer relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <h3 className="font-display text-4xl md:text-6xl font-black uppercase text-[#121212] transition-colors group-hover:text-[#2dd4bf] relative z-20">
                {activity.title}
              </h3>
              <span className="mt-4 md:mt-0 font-body font-bold text-lg md:text-2xl uppercase border-[3px] border-[#121212] px-6 py-2 bg-white shadow-[4px_4px_0px_0px_#121212] relative z-20">
                {activity.tag}
              </span>

              {/* Hover Image Reveal */}
              {hoveredIndex === i && (
                <div className={`pointer-events-none absolute right-[10%] md:right-[20%] top-1/2 -translate-y-1/2 z-10 w-64 h-64 md:w-80 md:h-80 border-[4px] border-[#121212] bg-[#f3a20f] shadow-[8px_8px_0px_0px_#121212] ${activity.rotate} transition-transform duration-300 overflow-hidden`}>
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
