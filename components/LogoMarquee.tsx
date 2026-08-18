"use client";

const clients = [
  "Fabswadeshi",
  "Yber",
  "Dhansa Labs",
  "Goblin India",
  "Jayraj Group",
  "Eco Roots",
  "Wow Factors",
  "Utility forms",
  "Pragati Handicraft",
];

function ClientItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center mx-8 sm:mx-12 group min-w-max cursor-pointer">
      <span className="text-2xl md:text-3xl font-heading font-bold text-navy/40 group-hover:text-copper transition-colors duration-500 uppercase tracking-widest whitespace-nowrap drop-shadow-sm">
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section
      className="py-10 bg-[#F6F1E3] border-b border-sand/40 relative z-10 -mt-4 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]"
      style={{ borderTopRightRadius: '100vw 4vw' }}
    >
      <div className="relative mt-8">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F6F1E3] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F6F1E3] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {/* Duplicate clients for seamless loop */}
          {[...clients, ...clients, ...clients].map((name, i) => (
            <ClientItem key={`client-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
