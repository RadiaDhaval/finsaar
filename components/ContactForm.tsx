"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic validation for at least 10 digits
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
  };

  const handleSubmit = () => {
    let newErrors = { name: "", phone: "", email: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (min 10 digits).";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // In production, this would send to CRM/API
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
    setErrors({
      name: "",
      phone: "",
      email: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-sand/30"
          >
            {/* Close button */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-sand-light/50 flex items-center justify-center text-navy/40 hover:text-navy hover:bg-sand-light transition-all duration-300 z-10 cursor-pointer"
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div className="px-8 pt-8 pb-4">
                  <h3 className="font-heading font-bold text-2xl text-navy mb-1">
                    Book a Strategy Call
                  </h3>
                  <p className="font-body text-sm text-navy/50">
                    We&apos;ll reach out to schedule your session.
                  </p>
                </div>

                {/* Form Content */}
                <div className="px-8 pb-8 space-y-4">
                  <div>
                    <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20 ${
                        errors.name
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-sand/60 focus:border-copper focus:ring-copper/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20 ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-sand/60 focus:border-copper focus:ring-copper/20"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      placeholder="you@company.com"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-sand/60 focus:border-copper focus:ring-copper/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      size="md"
                      onClick={handleSubmit}
                      className="w-full flex justify-center"
                    >
                      Book My Call
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-8 py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2
                    size={64}
                    className="text-emerald mx-auto mb-6"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="font-heading font-bold text-2xl text-navy mb-3">
                  You&apos;re all set!
                </h3>
                <p className="font-body text-navy/50 mb-8 max-w-xs mx-auto">
                  Our team will review your details and reach out within 24
                  hours to schedule your strategy call.
                </p>
                <Button variant="secondary" onClick={resetForm} className="mx-auto">
                  Close
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
