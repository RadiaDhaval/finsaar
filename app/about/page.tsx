"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import WhyFinsaar from "@/components/WhyFinsaar";
import FounderCFO from "@/components/FounderCFO";
import FinalCTA from "@/components/FinalCTA";
import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import { Target, Zap, Eye, Shield } from "lucide-react";

const values = [
  { icon: Target, title: "Precision", description: "Every number matters. We obsess over accuracy because your financial clarity depends on it." },
  { icon: Zap, title: "Velocity", description: "Real-time dashboards, proactive alerts, and rapid responses. Finance at the speed of your business." },
  { icon: Eye, title: "Transparency", description: "No hidden fees, no jargon walls. You see exactly what we see, when we see it." },
  { icon: Shield, title: "Trust", description: "Your data, your books, your future. We treat them with the same gravity as our own." },
];

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="About Finsaar"
          title={<>Built by founders, <span className="text-copper">for founders</span></>}
          subtitle="We started Finsaar because we saw too many brilliant companies stumble over messy books, missed deadlines, and financial blind spots. There had to be a better way."
        />

        {/* Mission Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-body text-sm text-copper font-medium uppercase tracking-widest">Our Mission</span>
                <Heading as="h2" className="mt-4">
                  Finance shouldn&apos;t be the <span className="text-copper">limiting factor</span>
                </Heading>
                <div className="mt-6 space-y-4">
                  <Text size="lg" muted>
                    Finsaar is a boutique CFO-as-a-service firm built specifically for Indian startups
                    and SMEs scaling from &quot;1 to 10&quot; or &quot;10 to 100.&quot;
                  </Text>
                  <Text muted>
                    We combine deep chartered accountancy expertise with modern technology to build
                    scalable financial infrastructure — real-time dashboards, automated compliance,
                    cashflow forecasting, and capital strategy — all under one roof.
                  </Text>
                  <Text muted>
                    Think of us as your embedded finance brain: always on, always ahead, always in your corner.
                  </Text>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-sand/30 hover:border-copper/20 transition-colors group"
                  >
                    <v.icon size={24} className="text-copper mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    <h4 className="font-heading font-bold text-navy text-sm mb-2">{v.title}</h4>
                    <p className="font-body text-xs text-navy/50 leading-relaxed">{v.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <WhyFinsaar />
        <FounderCFO />
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
