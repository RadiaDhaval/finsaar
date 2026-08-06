"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    revenue: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: "Email Us", value: "hello@finsaar.com", href: "mailto:hello@finsaar.com" },
    { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: MapPin, label: "Visit Us", value: "Mumbai, Maharashtra, India", href: "#" },
    { icon: Clock, label: "Business Hours", value: "Mon–Fri, 9:00 AM – 7:00 PM IST", href: "#" },
  ];

  return (
    <>
      <Navbar onOpenContact={() => setContactOpen(true)} />
      <main className="flex-1">
        <PageHeader
          badge="Contact"
          title={<>Let&apos;s build your <span className="text-copper">finance brain</span></>}
          subtitle="Ready to take control of your financial future? Reach out to us and we'll schedule a free strategy call within 24 hours."
        />

        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="font-heading font-bold text-xl text-navy mb-2">Get in Touch</h3>
                  <p className="font-body text-navy/50">We typically respond within 4 hours during business days.</p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-xl border border-sand/40 hover:border-copper/30 hover:bg-sand-light/20 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center shrink-0 group-hover:bg-copper/20 transition-colors">
                        <item.icon size={18} className="text-copper" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-navy">{item.label}</p>
                        <p className="font-body text-sm text-navy/50">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Quick CTA */}
                <div className="bg-navy rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-copper/10 blur-2xl" />
                  <div className="relative">
                    <h4 className="font-heading font-bold text-white mb-2">Prefer a quick chat?</h4>
                    <p className="font-body text-sm text-white/50 mb-4">Book a free 15-min strategy call directly.</p>
                    <Button size="sm" onClick={() => setContactOpen(true)}>
                      Book a Call <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3"
              >
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-sand/40 shadow-xl p-8 space-y-6">
                    <h3 className="font-heading font-bold text-xl text-navy">Send us a message</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-sm font-medium text-navy/70 block mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy bg-sand-light/20 transition-all" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-navy/70 block mb-2">Email *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy bg-sand-light/20 transition-all" placeholder="you@company.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-sm font-medium text-navy/70 block mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy bg-sand-light/20 transition-all" placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-navy/70 block mb-2">Company</label>
                        <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy bg-sand-light/20 transition-all" placeholder="Your company" />
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-sm font-medium text-navy/70 block mb-2">Current Revenue Stage</label>
                      <select value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy bg-sand-light/20 transition-all cursor-pointer">
                        <option value="">Select your stage</option>
                        <option value="pre-revenue">Pre-revenue</option>
                        <option value="10l-1cr">₹10L – ₹1Cr</option>
                        <option value="1cr-10cr">₹1Cr – ₹10Cr</option>
                        <option value="10cr-50cr">₹10Cr – ₹50Cr</option>
                        <option value="50cr+">₹50Cr+</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-body text-sm font-medium text-navy/70 block mb-2">Message</label>
                      <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy bg-sand-light/20 transition-all resize-none" placeholder="Tell us about your business and what you need help with..." />
                    </div>

                    <Button size="lg" className="w-full">
                      Send Message <ArrowRight size={16} />
                    </Button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border border-sand/40 shadow-xl p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">✓</span>
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-navy mb-3">Message Sent!</h3>
                    <p className="font-body text-navy/50 max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
