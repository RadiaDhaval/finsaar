"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function FAQPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="FAQ"
          title={<>Everything you need to <span className="text-copper">know</span></>}
          subtitle="Find answers to the most common questions founders ask about working with Finsaar, our pricing, onboarding, and service scope."
        />
        <FAQ />
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
