"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import BentoServices from "@/components/BentoServices";
import TechIntegrations from "@/components/TechIntegrations";
import FinalCTA from "@/components/FinalCTA";

export default function ServicesPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="Our Services"
          title={<>Three pillars of <span className="text-copper">financial clarity</span></>}
          subtitle="From day-to-day compliance to boardroom-ready capital strategy, we handle your entire financial stack so you can focus on what matters — growing your business."
        />
        <BentoServices />
        <TechIntegrations />
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
