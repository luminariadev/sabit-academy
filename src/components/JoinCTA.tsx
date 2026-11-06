"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JoinCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".join-label",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".join-label",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".join-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".join-content",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".join-form",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".join-form",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".social-link",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".social-link",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "" });
  };

  const socials = [
    {
      name: "Discord",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: "bg-[#5865F2]",
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "bg-[#24292e]",
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "bg-[#E1306C]",
    },
  ];

  return (
    <section
      id="bergabung"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-[var(--color-light)] border-t-2 border-[var(--color-dark)] overflow-hidden"
    >
      <div className="container-xl relative z-10">
        {/* Section Label */}
        <div className="join-label flex items-center gap-4 mb-16">
          <span className="text-sm font-bold text-dark uppercase border-2 border-dark px-3 py-1 bg-green-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            04 / Bergabung
          </span>
          <div className="h-[2px] flex-1 bg-dark max-w-[100px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="join-content font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8 text-dark">
              Mari bertumbuh
              <br />
              <span className="bg-yellow-300 px-2 border-2 border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mt-2">bersama kami.</span>
            </h2>
            <p className="join-content text-xl font-bold text-dark leading-relaxed mb-12 p-6 border-2 border-dark bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Bergabung dengan Sabit Academy sekarang. Gratis, tanpa syarat.
              Cukup jadi bagian dari keluarga besar Informatika UIN SGD Bandung.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link flex items-center gap-3 px-6 py-4 border-2 border-dark ${social.color} text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="join-form">
            <div className="p-8 md:p-10 border-2 border-dark bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-300 border-2 border-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl font-black mb-2 text-dark">
                    Selamat Bergabung!
                  </h3>
                  <p className="text-dark font-bold text-lg">
                    Kami akan menghubungi kamu segera.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-3xl font-black mb-2 text-dark">
                    Daftar Sekarang
                  </h3>
                  <p className="text-base font-bold text-dark/70 mb-8">
                    Isi data diri untuk bergabung dengan komunitas.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2 uppercase">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-dark text-dark font-bold placeholder:text-dark/40 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-dark mb-2 uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="nama@student.uinsgd.ac.id"
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-dark text-dark font-bold placeholder:text-dark/40 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-10 px-6 py-5 bg-[var(--color-pink)] text-[var(--color-dark)] font-black text-xl rounded-full border-2 border-[var(--color-dark)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Bergabung Sekarang
                  </button>

                  <p className="mt-6 text-sm font-bold text-dark/70 text-center">
                    Dengan bergabung, kamu setuju dengan ketentuan komunitas kami.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
