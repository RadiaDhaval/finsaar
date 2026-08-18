"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import {
  CaseStudy,
  getCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  seedInitialCaseStudies,
} from "@/lib/case-studies-service";

const glowOptions = [
  { label: "Orange Glow", value: "bg-orange-500", color: "bg-orange-500" },
  { label: "Blue Glow", value: "bg-blue-500", color: "bg-blue-500" },
  { label: "Emerald Glow", value: "bg-emerald-500", color: "bg-emerald-500" },
  { label: "Purple Glow", value: "bg-purple-500", color: "bg-purple-500" },
  { label: "Copper Glow", value: "bg-[#B5723B]", color: "bg-[#B5723B]" },
];

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    industry: "",
    metric: "",
    description: "",
    glow: "bg-orange-500",
  });
  const [saving, setSaving] = useState(false);

  const fetchStudies = async () => {
    setLoading(true);
    try {
      const data = await getCaseStudies();
      setStudies(data);
    } catch (err) {
      console.error("Failed to load case studies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  const handleOpenAdd = () => {
    setEditingStudy(null);
    setFormData({
      title: "",
      industry: "D2C / E-Commerce",
      metric: "3x Growth",
      description: "",
      glow: "bg-orange-500",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setFormData({
      title: study.title,
      industry: study.industry,
      metric: study.metric,
      description: study.description || study.desc || "",
      glow: study.glow || "bg-orange-500",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.metric.trim() || !formData.description.trim()) {
      alert("Please fill in Title, Metric, and Description.");
      return;
    }

    setSaving(true);
    if (editingStudy) {
      const res = await updateCaseStudy(editingStudy.id, {
        title: formData.title.trim(),
        industry: formData.industry.trim(),
        metric: formData.metric.trim(),
        description: formData.description.trim(),
        glow: formData.glow,
      });
      if (res.success) {
        setActionMessage({
          type: "success",
          text: "Case study updated successfully.",
        });
        setIsModalOpen(false);
        await fetchStudies();
      } else {
        setActionMessage({
          type: "error",
          text: res.error || "Failed to update case study.",
        });
      }
    } else {
      const res = await createCaseStudy({
        title: formData.title.trim(),
        industry: formData.industry.trim(),
        metric: formData.metric.trim(),
        description: formData.description.trim(),
        glow: formData.glow,
        order_index: studies.length + 1,
      });
      if (res.success) {
        setActionMessage({
          type: "success",
          text: "New case study created successfully.",
        });
        setIsModalOpen(false);
        await fetchStudies();
      } else {
        setActionMessage({
          type: "error",
          text: res.error || "Failed to create case study.",
        });
      }
    }
    setSaving(false);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this case study?");
    if (!confirm) return;

    const res = await deleteCaseStudy(id);
    if (res.success) {
      setStudies((prev) => prev.filter((s) => s.id !== id));
      setActionMessage({
        type: "success",
        text: "Case study deleted.",
      });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({
        type: "error",
        text: res.error || "Failed to delete case study.",
      });
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setActionMessage(null);
    try {
      const res = await seedInitialCaseStudies();
      if (res.success) {
        setActionMessage({
          type: "success",
          text: `Successfully synced ${res.count || 0} case studies!`,
        });
        await fetchStudies();
      } else {
        setActionMessage({
          type: "error",
          text: res.error || "Failed to sync case studies.",
        });
      }
    } catch (err: unknown) {
      setActionMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Sync error",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#B5723B]/10 text-[#B5723B]">
              <Briefcase size={18} />
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#14213A]">
              Case Studies
            </h1>
          </div>
          <p className="text-xs text-[#7A7F8C]">
            Manage client growth stories, financial milestones, and CFO success transformations
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/resources/case-studies"
            target="_blank"
            className="px-3.5 py-2 rounded-xl border border-[#E7E4DC] bg-white text-xs font-semibold text-[#14213A] hover:bg-[#FAFAF8] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>View Live Page</span>
            <ExternalLink size={13} />
          </Link>

          <button
            onClick={handleSeed}
            disabled={seeding}
            className="px-3.5 py-2 rounded-xl border border-[#B5723B]/30 bg-[#B5723B]/5 hover:bg-[#B5723B]/10 text-xs font-semibold text-[#B5723B] flex items-center gap-1.5 transition-colors disabled:opacity-50"
            title="Reset / Sync default case studies"
          >
            <Sparkles size={13} className={seeding ? "animate-spin" : ""} />
            <span>{seeding ? "Syncing..." : "Sync Defaults"}</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#14213A] text-white text-xs font-semibold hover:bg-[#1e3256] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} />
            <span>Add Case Study</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {actionMessage && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm ${
            actionMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 size={16} className="shrink-0" />
            ) : (
              <AlertCircle size={16} className="shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-xs font-semibold opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Case Studies Cards */}
      {loading ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-[#E7E4DC]">
          <RefreshCw size={24} className="animate-spin text-[#B5723B] mx-auto mb-3" />
          <p className="text-xs text-[#7A7F8C]">Loading case studies...</p>
        </div>
      ) : studies.length === 0 ? (
        <div className="p-16 text-center space-y-3 bg-white rounded-3xl border border-[#E7E4DC]">
          <Briefcase size={28} className="text-[#7A7F8C] mx-auto" />
          <h3 className="font-heading font-bold text-base text-[#14213A]">No case studies found</h3>
          <p className="text-xs text-[#7A7F8C]">
            Click &quot;Sync Defaults&quot; or &quot;Add Case Study&quot; to publish client growth stories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {studies.map((study) => (
            <div
              key={study.id}
              className="bg-[#14213A] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/10 shadow-lg group"
            >
              {/* Background ambient glow */}
              <div
                className={`absolute top-0 right-0 w-72 h-72 ${
                  study.glow || "bg-orange-500"
                } blur-[100px] opacity-20 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start justify-between">
                {/* Left: Metric & Industry */}
                <div className="shrink-0 w-full md:w-56">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[11px] font-heading font-medium tracking-wider uppercase mb-3">
                    {study.industry}
                  </span>
                  <div className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                    {study.metric}
                  </div>
                </div>

                {/* Middle: Content */}
                <div className="flex-1 space-y-2 min-w-0">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug">
                    {study.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    {study.desc}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-start bg-white/10 p-1.5 rounded-2xl backdrop-blur-xs">
                  <button
                    onClick={() => handleOpenEdit(study)}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors"
                    title="Edit Case Study"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(study.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-colors"
                    title="Delete Case Study"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213A]/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl max-w-xl w-full p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#14213A]">
                  {editingStudy ? "Edit Case Study" : "Add Case Study"}
                </h3>
                <p className="text-xs text-[#7A7F8C]">
                  Showcase measurable client ROI & CFO impact
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#7A7F8C] hover:text-[#14213A] hover:bg-[#FAFAF8] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Metric Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                    Hero Metric / Result (e.g. &quot;3x Growth&quot;, &quot;₹50Cr Raised&quot;)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3x Growth"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-xs text-[#14213A] focus:outline-none focus:border-[#B5723B]"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                    Industry / Tag
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. D2C / E-Commerce"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-xs text-[#14213A] focus:outline-none focus:border-[#B5723B]"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                  Headline / Case Study Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaling a D2C Brand from ₹1Cr to ₹10Cr ARR"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-xs text-[#14213A] focus:outline-none focus:border-[#B5723B]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                  Transformation Summary / Description
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain how Finsaar CFO services solved their cash flow, audits, or fundraise..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-xs text-[#14213A] focus:outline-none focus:border-[#B5723B] resize-none"
                />
              </div>

              {/* Glow Accent */}
              <div>
                <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                  Ambient Glow Accent
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {glowOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, glow: opt.value })}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                        formData.glow === opt.value
                          ? "border-[#14213A] bg-[#14213A] text-white shadow-sm"
                          : "border-[#E7E4DC] bg-[#FAFAF8] text-[#14213A] hover:bg-[#F5F3EE]"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${opt.color}`} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7E4DC]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A7F8C] hover:text-[#14213A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#14213A] text-white text-xs font-semibold hover:bg-[#1e3256] transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingStudy ? "Update Case Study" : "Create Case Study"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
