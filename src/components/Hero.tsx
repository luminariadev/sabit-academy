"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-40 overflow-hidden bg-[var(--color-light)]">
      <div className="container-xl relative z-10 flex flex-col items-center">
        
        {/* Main Headline */}
        <div className="flex flex-col items-center justify-center text-center z-20 relative mb-12">
          <h1 className="font-display text-[5rem] md:text-[7rem] lg:text-[8rem] leading-[0.9] font-bold text-dark text-stroke drop-shadow-[4px_4px_0_#1f1c18] tracking-wide mb-6">
            vibes, good times.
          </h1>
          
          {/* Stacked Sticker Title */}
          <div className="relative inline-block w-fit">
            <div className="absolute inset-0 bg-dark transform rotate-3 rounded-xl translate-y-3 translate-x-2"></div>
            <div className="relative bg-[var(--color-mango)] px-10 py-3 brutal-border rounded-xl transform -rotate-2">
              <span className="font-display text-[3.5rem] md:text-[5rem] text-white text-stroke drop-shadow-[3px_3px_0_rgba(31,28,24,0.3)]">
                Flowfest is back.
              </span>
            </div>
          </div>
        </div>

        {/* Polaroid and Rainbow Section */}
        <div className="relative w-full max-w-2xl flex justify-center mt-8">
          
          {/* Vertical Rainbow Stripes - Perfectly scaled and rounded */}
          <div className="absolute top-0 flex gap-4 z-0 h-[600px] items-start">
            <div className="w-20 md:w-32 h-[450px] bg-[var(--color-pink)] border-[3px] border-dark rounded-b-full shadow-[4px_4px_0_0_#1f1c18] transform -translate-y-24"></div>
            <div className="w-20 md:w-32 h-[550px] bg-[var(--color-mango)] border-[3px] border-dark rounded-b-full shadow-[4px_4px_0_0_#1f1c18] transform -translate-y-8"></div>
            <div className="w-20 md:w-32 h-[350px] bg-[var(--color-orange)] border-[3px] border-dark rounded-b-full shadow-[4px_4px_0_0_#1f1c18] transform -translate-y-32"></div>
          </div>

          {/* Polaroid Photo */}
          <div className="relative z-10 mt-12 w-full max-w-sm">
            <div className="bg-white p-4 pb-16 brutal-border brutal-shadow transform rotate-3 rounded-2xl hover:rotate-0 hover:-translate-y-2 transition-transform duration-300">
              <div className="relative w-full h-80 border-[3px] border-dark rounded-xl overflow-hidden bg-gray-200">
                <Image
                  src="/images/vibe1.jpg"
                  alt="Festival vibes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
