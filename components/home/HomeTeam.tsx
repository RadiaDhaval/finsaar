"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Image from "next/image";

const teamMembers = [
  { name: "Rahul Sharma", role: "Founder & CFO", image: "/rahul.png" },
  { name: "Anjali Desai", role: "Co-Founder", image: "/anjali.png" },
  { name: "Vikram Singh", role: "Partner", image: "/vikram.png" },
  { name: "Priya Patel", role: "Senior Analyst", image: "/anjali.png" },
  { name: "Amit Kumar", role: "Tax Specialist", image: "/rahul.png" },
  { name: "Neha Gupta", role: "Compliance Lead", image: "/anjali.png" },
  { name: "Rohit Verma", role: "Financial Controller", image: "/vikram.png" },
  { name: "Sneha Reddy", role: "Audit Manager", image: "/anjali.png" },
  { name: "Karan Mehta", role: "Strategy Head", image: "/rahul.png" },
  { name: "Pooja Shah", role: "Associate", image: "/anjali.png" },
  { name: "Arjun Nair", role: "Operations", image: "/vikram.png" },
  { name: "Kriti Sen", role: "HR Head", image: "/anjali.png" },
];

export default function HomeTeam() {
  return (
    <section className="py-24 lg:py-32 bg-[#FBF9F6] relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-copper/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-navy/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center justify-center px-4 py-1.5 font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-8 bg-copper/15 text-copper border border-copper/30">
            Our Team
          </span>
          <Heading as="h2" className="text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium max-w-4xl mx-auto">
            We celebrate collaboration, enthusiasm and focus. Come for our expertise, stay for our reliability <span className="italic text-copper font-semibold">(and a bit of buffoonery)</span>. Meet the people behind the practice.
          </Heading>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 6) * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-5 shadow-[0_8px_20px_rgba(20,33,58,0.06)] group-hover:shadow-[0_20px_40px_rgba(20,33,58,0.12)] border border-navy/5 transition-all duration-500">
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay" />
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h4 className="font-heading font-bold text-navy text-[15px] md:text-base leading-tight mb-1 group-hover:text-copper transition-colors duration-300">
                {member.name}
              </h4>
              <p className="font-body text-[11px] md:text-xs text-navy/60 font-medium">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
