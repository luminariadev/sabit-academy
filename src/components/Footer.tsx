"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <section className="pt-32 bg-[var(--color-light)] border-t-[3px] border-dark relative overflow-hidden flex flex-col items-center min-h-screen justify-between">
      
      {/* Top Text and Input */}
      <div className="container-xl relative z-20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-32">
        <div className="max-w-xl">
          <h2 className="font-display text-5xl md:text-[5.5rem] font-bold text-dark mb-6 tracking-tight leading-none text-stroke drop-shadow-[2px_2px_0_rgba(31,28,24,0.3)]">
            See you there!
          </h2>
          <p className="font-body text-dark font-medium text-xl leading-relaxed">
            Reach out to Isabel at <strong className="font-bold border-b-2 border-dark cursor-pointer">isabel@designsie.co.uk</strong><br />
            if you have any questions.
          </p>
        </div>

        <div className="flex w-full lg:w-auto flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full sm:w-48 px-6 py-4 bg-white brutal-border font-body font-bold text-dark placeholder:text-dark/40 focus:outline-none rounded-xl"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full sm:w-64 px-6 py-4 bg-white brutal-border font-body font-bold text-dark placeholder:text-dark/40 focus:outline-none rounded-xl"
            />
          </div>
          <button className="w-full bg-[var(--color-orange)] text-white font-display text-2xl px-6 py-4 brutal-border brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_#1f1c18] transition-all rounded-xl text-stroke drop-shadow-[1px_1px_0_#1f1c18]">
            Get updates
          </button>
        </div>
      </div>

      {/* Giant Sun Mascot and Photos */}
      <div className="relative w-full flex justify-center items-end mt-auto h-[400px]">
        
        {/* Left Photo (Clean cut rounded shape) */}
        <div className="absolute left-[10%] bottom-0 z-10 hidden lg:block transform -rotate-3 hover:rotate-0 transition-transform">
          <div className="relative w-72 h-80">
            <div className="absolute inset-0 bg-[var(--color-pink)] brutal-border rounded-t-[8rem] rounded-b-2xl scale-[1.03] shadow-[4px_4px_0_0_#1f1c18]"></div>
            <Image src="/images/vibe2.jpg" alt="Person" fill className="object-cover rounded-t-[8rem] rounded-b-2xl brutal-border" />
          </div>
        </div>

        {/* Right Photo */}
        <div className="absolute right-[10%] bottom-0 z-10 hidden lg:block transform rotate-6 hover:rotate-0 transition-transform">
          <div className="relative w-[22rem] h-72">
            <div className="absolute inset-0 bg-[var(--color-orange)] brutal-border rounded-t-[6rem] rounded-b-2xl scale-[1.03] shadow-[4px_4px_0_0_#1f1c18]"></div>
            <Image src="/images/vibe3.jpg" alt="People" fill className="object-cover rounded-t-[6rem] rounded-b-2xl brutal-border" />
          </div>
        </div>

        {/* Giant Mascot (Sabit Sun) */}
        <div className="relative z-20 mx-auto w-[600px] md:w-[900px]">
          <svg viewBox="0 0 500 250" className="w-full h-auto text-[var(--color-mango)] drop-shadow-[6px_-4px_0_#1f1c18]" fill="currentColor">
            {/* Smooth Spikes / Sun Rays */}
            <path d="M40,250 L10,210 L50,190 L25,140 L70,140 L65,85 L115,105 L130,55 L175,85 L205,35 L245,75 L285,30 L315,80 L360,50 L380,100 L430,75 L425,130 L470,125 L450,180 L490,195 L460,240 L495,250 Z" stroke="#1f1c18" strokeWidth="6" strokeLinejoin="round" fill="currentColor" />
            {/* Main Half Circle */}
            <path d="M60,250 A 190 190 0 0 1 440,250 Z" stroke="#1f1c18" strokeWidth="6" />
            {/* Eyes */}
            <circle cx="210" cy="180" r="10" fill="#1f1c18" />
            <circle cx="290" cy="180" r="10" fill="#1f1c18" />
            {/* Smile */}
            <path d="M230,210 Q 250,230 270,210" fill="none" stroke="#1f1c18" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

      </div>
    </section>
  );
}
