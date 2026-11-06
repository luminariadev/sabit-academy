"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can I have a discount?",
      a: "Tickets are already super affordable, but if you're a student, drop us an email for a special community rate!",
    },
    {
      q: "How do I get there?",
      a: "We are located at the main hall of UIN SGD Bandung. Just follow the Sabit signs from the main gate.",
    },
    {
      q: "Is there food included?",
      a: "Yes! There will be plenty of local snacks, coffee, and a heavy meal included with your ticket.",
    },
    {
      q: "What should I bring?",
      a: "Bring your laptop, a charger, and your best vibes. We'll provide the internet and the fun.",
    },
    {
      q: "Will there be an afterparty?",
      a: "Of course. We'll be hosting a casual networking session with music and more coffee right after the main talks.",
    },
  ];

  return (
    <section className="py-32 bg-[var(--color-light)] border-t-[3px] border-dark relative">
      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Huge photo */}
        <div className="relative pt-6 pr-6">
          <div className="bg-[var(--color-light-plus)] p-3 brutal-border brutal-shadow rounded-[3rem] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="rounded-[2.5rem] overflow-hidden border-[3px] border-dark h-[500px] lg:h-[600px] w-full relative bg-gray-200">
              <img src="/images/vibe1.jpg" alt="Crowd" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right: FAQ Folders */}
        <div className="flex flex-col pt-8 pr-4">
          {faqs.map((faq, i) => (
            <div key={i} className="folder-tab-container cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              
              {/* Fake Folder Tab */}
              <div className="folder-tab-top"></div>
              
              {/* Folder Content Box */}
              <div className="folder-tab-content p-6 flex flex-col justify-center">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-body font-bold text-xl md:text-2xl text-dark tracking-wide">{faq.q}</h3>
                  <span className="text-dark font-black text-3xl leading-none font-display">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </div>
                
                {/* Expandable answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-[500px] mt-4 pt-4 border-t-2 border-dark/20' : 'max-h-0'}`}
                >
                  <p className="font-body font-semibold text-dark/80 text-lg leading-relaxed">{faq.a}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
