"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import ROICalculator from "@/components/ROICalculator";
import FinalCTA from "@/components/FinalCTA";

export default function CalculatorPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="ROI Calculator"
          title={<>The CFO <span className="text-copper">Cost vs. Value</span> Calculator</>}
          subtitle="See exactly how much you save with a fractional CFO compared to a full-time hire. Adjust the sliders to match your business profile."
        />
        <ROICalculator />
        <FinalCTA onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
