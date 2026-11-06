"use client";

import Image from "next/image";

export default function Speakers() {
  return (
    <section className="py-32 bg-[var(--color-light)] border-t-[3px] border-dark relative">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Stacked Title */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-dark leading-none">
              <span className="block mb-2 text-6xl">Our 2025</span>
              {/* Stacked Block 1 */}
              <div className="relative inline-block mt-4 w-fit">
                <div className="absolute inset-0 bg-dark transform rotate-2 rounded-xl translate-y-2 translate-x-2"></div>
                <div className="relative bg-[var(--color-mango)] px-8 py-2 brutal-border rounded-xl transform -rotate-2">
                  <span className="text-white text-stroke drop-shadow-[2px_2px_0_rgba(31,28,24,0.3)] tracking-wider">
                    Speaker
                  </span>
                </div>
              </div>
              <br />
              {/* Stacked Block 2 */}
              <div className="relative inline-block mt-4 w-fit">
                <div className="absolute inset-0 bg-dark transform -rotate-1 rounded-xl translate-y-2 translate-x-2"></div>
                <div className="relative bg-[var(--color-orange)] px-8 py-2 brutal-border rounded-xl transform rotate-2">
                  <span className="text-white text-stroke drop-shadow-[2px_2px_0_rgba(31,28,24,0.3)] tracking-wider">
                    Lineup
                  </span>
                </div>
              </div>
            </h2>
            <p className="font-body font-semibold text-dark/80 text-lg md:text-xl mb-10 leading-relaxed max-w-md">
              Yep, we got <strong className="text-dark font-black">absolute legends</strong> for the keynote. 
              Plus some amazing talents that will also be sharing the stage. (More speaker announcements to come!)
            </p>
            <button className="brutal-pill bg-[var(--color-pink)] px-8 py-4 font-display text-2xl w-fit brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_#1f1c18] transition-all cursor-pointer">
              Buy Tickets
            </button>
          </div>

          {/* Right: Speaker Cards (Clean Arches, no messy filters) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 border-l-[3px] border-dark/20 pl-0 lg:pl-12">
            
            {/* Speaker 1 (Keynote) */}
            <div className="relative group pt-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white brutal-pill px-6 py-2 z-20 shadow-[3px_3px_0_#1f1c18]">
                <span className="font-bold text-sm text-dark tracking-wide">Keynote</span>
              </div>
              
              <div className="bg-[var(--color-mango)] brutal-border rounded-t-[10rem] rounded-b-2xl brutal-shadow relative overflow-hidden flex flex-col items-center pt-16 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="relative w-full h-[350px]">
                  <Image
                    src="/images/vibe2.jpg"
                    alt="Speaker 1"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Subtle Inner Shadow to frame the image cleanly */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                </div>
                
                <div className="absolute bottom-6 bg-[var(--color-orange)] text-white font-display px-6 py-2 brutal-pill z-20 text-stroke drop-shadow-[2px_2px_0_#1f1c18] text-xl">
                  Fajar Setiawan
                </div>
              </div>
            </div>

            {/* Speaker 2 (Development) */}
            <div className="relative group pt-6 sm:mt-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white brutal-pill px-6 py-2 z-20 shadow-[3px_3px_0_#1f1c18]">
                <span className="font-bold text-sm text-dark tracking-wide">Development</span>
              </div>
              
              <div className="bg-[var(--color-orange)] brutal-border rounded-t-[10rem] rounded-b-2xl brutal-shadow relative overflow-hidden flex flex-col items-center pt-16 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="relative w-full h-[350px]">
                  <Image
                    src="/images/vibe3.jpg"
                    alt="Speaker 2"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                </div>
                
                <div className="absolute bottom-6 bg-[var(--color-mango)] text-white font-display px-6 py-2 brutal-pill z-20 text-stroke drop-shadow-[2px_2px_0_#1f1c18] text-xl">
                  Nadia Putri
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
