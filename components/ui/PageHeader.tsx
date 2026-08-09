"use client";

import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";

interface PageHeaderProps {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  dark?: boolean;
}

export default function PageHeader({ badge, title, subtitle, dark = false }: PageHeaderProps) {
  return (
    <section className={`pt-[72px] ${dark ? "bg-navy" : "bg-gradient-to-b from-white to-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {badge && (
            <span className={`inline-flex items-center justify-center px-4 py-1.5 font-heading font-semibold text-[13px] tracking-[0.2em] uppercase rounded-full mb-6 ${dark ? "bg-copper/10 text-copper border border-copper/20" : "bg-copper/10 text-copper border border-copper/20"}`}>
              {badge}
            </span>
          )}
          <Heading as="h1" className={`mt-4 ${dark ? "text-white" : ""}`}>
            {title}
          </Heading>
          <Text size="lg" className={`mt-6 ${dark ? "text-white/60" : "text-navy/60"}`}>
            {subtitle}
          </Text>
        </motion.div>
      </div>
    </section>
  );
}
