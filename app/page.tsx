"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import HomeWhyFinsaar from "@/components/home/HomeWhyFinsaar";
import HomeServices from "@/components/home/HomeServices";
import HomeFounder from "@/components/home/HomeFounder";
import HomeTeam from "@/components/home/HomeTeam";
import HomeMission from "@/components/home/HomeMission";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  return (
    <>
      <Navbar onOpenContact={openContact} />
      <main className="flex-1">
        <Hero onOpenContact={openContact} />
        <LogoMarquee />
        <HomeTestimonials />
        <HomeFounder />
        <HomeTeam />
        <HomeMission />
        <HomeServices />
        <HomeFAQ />
        <HomeWhyFinsaar />
        <FinalCTA onOpenContact={openContact} />
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={closeContact} />
    </>
  );
}
