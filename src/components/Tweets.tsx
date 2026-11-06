"use client";

export default function Tweets() {
  const tweets = [
    {
      name: "Cassie Evans",
      handle: "@cassiecodes",
      content:
        "Not exaggerating when I say Sabit Academy was my web event of the year. I go to a lot of meetups but the vibe here is unmatched!",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "Kieran Wallworth",
      handle: "@kieranwallworth",
      content:
        "Sabit is a 'community event' like no other. A day packed with Next.js, coffee, fun and festival vibes. Let's make this the norm!",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
  ];

  return (
    <section className="py-32 bg-[var(--color-light)] border-t-[3px] border-dark relative overflow-hidden flex justify-center items-center">
      
      {/* Huge Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 md:opacity-100 z-0">
        <h2 className="font-display text-[8rem] md:text-[15rem] leading-none text-dark flex items-center">
          Flow
          <div className="bg-[var(--color-mango)] px-8 brutal-border rounded-xl transform rotate-2 -ml-8 -mr-8">
            <span className="text-white text-stroke">Love</span>
          </div>
        </h2>
      </div>

      {/* Tweet Cards Stack */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 mt-12 h-[400px]">
        
        {/* Tweet 1 (Bottom, slightly rotated) */}
        <div className="absolute top-12 left-4 md:left-12 right-4 md:-right-8 bg-white brutal-border brutal-shadow rounded-2xl p-6 md:p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden brutal-border">
                <img src={tweets[1].avatar} alt={tweets[1].name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-dark text-lg">{tweets[1].name}</h4>
                <span className="text-dark/60 font-semibold">{tweets[1].handle}</span>
              </div>
            </div>
            {/* Fake Twitter Bird SVG */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1DA1F2]" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
          <p className="font-body text-xl font-medium text-dark leading-relaxed">
            {tweets[1].content}
          </p>
        </div>

        {/* Tweet 2 (Top, slightly rotated left) */}
        <div className="absolute top-0 left-0 right-8 bg-white brutal-border brutal-shadow rounded-2xl p-6 md:p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden brutal-border">
                <img src={tweets[0].avatar} alt={tweets[0].name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-dark text-lg">{tweets[0].name}</h4>
                <span className="text-dark/60 font-semibold">{tweets[0].handle}</span>
              </div>
            </div>
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1DA1F2]" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
          <p className="font-body text-xl font-medium text-dark leading-relaxed">
            {tweets[0].content}
          </p>
        </div>

      </div>
    </section>
  );
}
