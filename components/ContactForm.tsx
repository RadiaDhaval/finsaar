"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const revenueStages = [
  "Pre-revenue",
  "₹10L – ₹1Cr",
  "₹1Cr – ₹10Cr",
  "₹10Cr – ₹50Cr",
  "₹50Cr+",
];

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    revenueStage: "",
    name: "",
    email: "",
    phone: "",
  });

  const totalSteps = 3;

  const handleSubmit = () => {
    // In production, this would send to CRM/API
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setSubmitted(false);
    setFormData({
      companyName: "",
      website: "",
      revenueStage: "",
      name: "",
      email: "",
      phone: "",
    });
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return formData.companyName.trim() !== "";
    if (step === 2) return formData.revenueStage !== "";
    if (step === 3)
      return formData.name.trim() !== "" && formData.email.trim() !== "";
    return false;
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-sand/30"
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
                {/* Progress Bar */}
                <div className="px-8 pt-8 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-xs text-navy/40 uppercase tracking-wider">
                      Step {step} of {totalSteps}
                    </span>
                    <span className="font-body text-xs text-copper font-medium">
                      {step === 1
                        ? "Company Info"
                        : step === 2
                        ? "Business Stage"
                        : "Contact Details"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-sand-light rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-copper rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(step / totalSteps) * 100}%`,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Form Content */}
                <div className="px-8 py-6 min-h-[280px]">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="font-heading font-bold text-xl text-navy mb-1">
                            Tell us about your company
                          </h3>
                          <p className="font-body text-sm text-navy/50">
                            Just the basics to get started.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              value={formData.companyName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  companyName: e.target.value,
                                })
                              }
                              placeholder="e.g., Acme Technologies"
                              className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20"
                            />
                          </div>
                          <div>
                            <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                              Website (Optional)
                            </label>
                            <input
                              type="url"
                              value={formData.website}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  website: e.target.value,
                                })
                              }
                              placeholder="https://your-company.com"
                              className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="font-heading font-bold text-xl text-navy mb-1">
                            What&apos;s your revenue stage?
                          </h3>
                          <p className="font-body text-sm text-navy/50">
                            This helps us tailor the right service for you.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {revenueStages.map((stage) => (
                            <button
                              key={stage}
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  revenueStage: stage,
                                })
                              }
                              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 font-body text-sm min-h-[44px] cursor-pointer ${
                                formData.revenueStage === stage
                                  ? "bg-copper/10 border-copper text-navy shadow-sm"
                                  : "bg-sand-light/20 border-sand/40 text-navy/60 hover:border-copper/30 hover:bg-sand-light/40"
                              }`}
                            >
                              {stage}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="font-heading font-bold text-xl text-navy mb-1">
                            How can we reach you?
                          </h3>
                          <p className="font-body text-sm text-navy/50">
                            We&apos;ll reach out to schedule your strategy call.
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Your full name"
                              className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20"
                            />
                          </div>
                          <div>
                            <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              placeholder="you@company.com"
                              className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20"
                            />
                          </div>
                          <div>
                            <label className="font-body text-sm font-medium text-navy/70 block mb-2">
                              Phone (Optional)
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3 rounded-xl border border-sand/60 focus:border-copper focus:ring-2 focus:ring-copper/20 outline-none font-body text-sm text-navy transition-all duration-300 bg-sand-light/20"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="px-8 pb-8 flex items-center justify-between gap-4">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2 font-body text-sm text-navy/50 hover:text-navy transition-colors min-h-[44px] cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <Button
                      size="md"
                      onClick={() => setStep(step + 1)}
                      disabled={!canProceed()}
                      className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Continue
                      <ArrowRight size={16} />
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      onClick={handleSubmit}
                      disabled={!canProceed()}
                      className={!canProceed() ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Book My Call
                      <ArrowRight size={16} />
                    </Button>
                  )}
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
                <Button variant="secondary" onClick={resetForm}>
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
