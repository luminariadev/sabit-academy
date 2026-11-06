"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const discussions = [
  {
    title: "Deep Dive: Agentic AI & Hermes Agent",
    preview: "Bahas arsitektur Hermes Agent, tool calling, dan bagaimana agentic AI mengubah cara kita membangun software...",
    author: "Ahmad R.",
    avatarColor: "bg-[#2dd4bf]",
    replies: 34,
    tags: ["AI", "Agent"],
    colSpan: "md:col-span-2",
  },
  {
    title: "Survive Semester 5",
    preview: "Sharing pengalaman ngerjain tugas besar, tips manajemen waktu, dan cara balance...",
    author: "Siti N.",
    avatarColor: "bg-[#f489a3]",
    replies: 21,
    tags: ["Akademik"],
    colSpan: "md:col-span-1",
  },
  {
    title: "Bangun SaaS Bareng",
    preview: "Cari tim buat bikin SaaS product dari nol pakai Next.js + Supabase. Open untuk yang mau belajar...",
    author: "Rizki F.",
    avatarColor: "bg-[#f3a20f]",
    replies: 18,
    tags: ["Project"],
    colSpan: "md:col-span-1",
  },
  {
    title: "Cloud Computing AWS vs GCP",
    preview: "Perbandingan lengkap dari sisi pricing, dokumentasi, dan developer experience. Mana yang lebih cocok buat mahasiswa...",
    author: "Dian P.",
    avatarColor: "bg-[#2dd4bf]",
    replies: 12,
    tags: ["Cloud"],
    colSpan: "md:col-span-2",
  },
];

export default function Discussions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".discuss-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".discuss-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-white border-t-[3px] border-[#121212]">
      {/* Thin architectural lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(#121212 1px, transparent 1px), linear-gradient(90deg, #121212 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <div className="container-xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-16 inline-flex border-[3px] border-[#121212] bg-[#f3a20f] px-6 py-2 shadow-[4px_4px_0px_0px_#121212]">
          <span className="text-sm font-display font-bold uppercase tracking-widest text-[#121212]">
            03 / Diskusi
          </span>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-5xl md:text-7xl font-black uppercase text-[#121212] mb-6">
            Obrolan <br />
            <span className="bg-[#2dd4bf] border-[3px] border-[#121212] px-4 py-2 shadow-[4px_4px_0px_0px_#121212] inline-block">Hangat</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="discuss-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {discussions.map((disc, i) => (
            <div
              key={i}
              className={`discuss-card bg-white border-[3px] border-[#121212] shadow-[6px_6px_0px_0px_#121212] p-8 md:p-10 flex flex-col justify-between hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#121212] transition-all duration-300 rounded-t-[3rem] rounded-b-none ${disc.colSpan}`}
            >
              <div>
                <div className="flex items-center gap-2 mb-8">
                  {disc.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-bold uppercase border-[3px] border-[#121212] px-3 py-1 bg-[#fdfbf7] shadow-[2px_2px_0px_0px_#121212]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-[#121212]">
                  {disc.title}
                </h3>
                <p className="font-body text-lg font-bold mb-10 text-[#121212]/80">
                  {disc.preview}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t-[3px] border-[#121212]">
                <div className="flex items-center gap-3">
                  {/* Fake User Avatar (Brutal Pill) */}
                  <div className={`w-10 h-10 rounded-full border-[3px] border-[#121212] ${disc.avatarColor} shadow-[2px_2px_0px_0px_#121212]`}></div>
                  <span className="font-body font-black uppercase text-sm md:text-base">{disc.author}</span>
                </div>
                <div className="font-body font-bold text-sm uppercase border-[3px] border-[#121212] px-3 py-1 bg-white shadow-[2px_2px_0px_0px_#121212]">
                  {disc.replies} Replies
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
