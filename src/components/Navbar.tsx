"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tentang", href: "#tentang" },
    { label: "Kegiatan", href: "#kegiatan" },
    { label: "Diskusi", href: "#diskusi" },
    { label: "Bergabung", href: "#bergabung" },
  ];

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl rounded-full border-2 border-dark bg-[#fffefb] px-4 md:px-8 py-2 md:py-3 ${
          isScrolled
            ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12"
              >
                <path
                  d="M20 2C13 2 7 8 7 16C7 24 13 30 20 30C15 30 11 25 11 19C11 13 15 8 20 8C25 8 29 12 29 17C29 10 25 2 20 2Z"
                  fill="#000000"
                />
                <circle cx="30" cy="8" r="3" fill="#f3a20f" className="stroke-2 stroke-dark" />
              </svg>
            </div>
            <span className="font-display text-xl font-black tracking-tight text-dark uppercase">
              Sabit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative text-sm font-bold text-dark hover:-translate-y-0.5 transition-transform duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#f3a20f] border-dark group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("#bergabung")}
              className="px-6 py-2 bg-[#f3a20f] text-dark border-2 border-dark text-sm font-black rounded-full transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Gabung Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${
                isMobileOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#fffefb] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-3xl font-display font-black text-dark hover:text-[#f3a20f] transition-colors duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("#bergabung")}
          className="mt-4 px-8 py-3 bg-[#f3a20f] border-2 border-dark text-dark text-lg font-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Gabung Sekarang
        </button>
      </div>
    </>
  );
}
