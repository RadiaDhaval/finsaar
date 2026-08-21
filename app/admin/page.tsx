"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Inbox,
  FileText,
  Calendar,
  Briefcase,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Layers,
  ChevronRight,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";
import { getLeads, Lead } from "@/lib/leads-service";
import { getBlogPosts } from "@/lib/blog-service";
import { BlogPost } from "@/lib/blog-data";
import { getComplianceItems, ComplianceItem } from "@/lib/compliance-service";
import { getCaseStudies, CaseStudy } from "@/lib/case-studies-service";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [compliance, setCompliance] = useState<ComplianceItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [leadsData, postsData, compData, casesData] = await Promise.all([
        getLeads(),
        getBlogPosts({ includeDrafts: true }),
        getComplianceItems(),
        getCaseStudies(),
      ]);
      setLeads(leadsData);
      setPosts(postsData);
      setCompliance(compData);
      setCaseStudies(casesData);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const activeLeads = leads.filter((l) => l.status !== "bin");
  const newLeadsCount = activeLeads.filter((l) => l.status === "new").length;
  const publishedPostsCount = posts.filter((p) => p.published).length;

  return (
    <div className="space-y-8 w-full max-w-full pb-20">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#B5723B]/10 text-[#B5723B]">
              <LayoutDashboard size={18} />
            </span>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#14213A]">
              Finsaar Studio Central
            </h1>
          </div>
          <p className="text-xs text-[#7A7F8C]">
            Executive overview of incoming founder inquiries, thought leadership publications, and compliance assets
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadAllData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-[#E7E4DC] bg-white text-[#7A7F8C] hover:text-[#14213A] hover:bg-[#FAFAF8] transition-all disabled:opacity-50 shadow-sm"
            title="Refresh Dashboard"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#B5723B]" : ""} />
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl border border-[#E7E4DC] bg-white text-xs font-semibold text-[#14213A] hover:bg-[#FAFAF8] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Live Website</span>
            <ExternalLink size={13} />
          </Link>

          <Link
            href="/admin/blog/new"
            className="px-4 py-2 rounded-xl bg-[#14213A] text-white text-xs font-semibold hover:bg-[#1e3256] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle size={14} />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* Primary 4 Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Leads */}
        <Link
          href="/admin/leads"
          className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm hover:border-[#B5723B]/40 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-[#B5723B]/10 text-[#B5723B] group-hover:scale-110 transition-transform">
              <Inbox size={18} />
            </span>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 animate-pulse">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <p className="text-xs font-semibold text-[#7A7F8C] uppercase tracking-wider mb-1">
            Strategy Inquiries
          </p>
          <div className="flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-[#14213A]">
              {activeLeads.length}
            </p>
            <span className="text-xs font-semibold text-[#B5723B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              View Leads <ChevronRight size={13} />
            </span>
          </div>
        </Link>

        {/* Card 2: Blog Posts */}
        <Link
          href="/admin/blog"
          className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm hover:border-[#B5723B]/40 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <FileText size={18} />
            </span>
            <span className="text-[11px] font-medium text-[#7A7F8C]">
              {publishedPostsCount} Published
            </span>
          </div>
          <p className="text-xs font-semibold text-[#7A7F8C] uppercase tracking-wider mb-1">
            Blog Articles
          </p>
          <div className="flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-[#14213A]">
              {posts.length}
            </p>
            <span className="text-xs font-semibold text-[#B5723B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Manage <ChevronRight size={13} />
            </span>
          </div>
        </Link>

        {/* Card 3: Compliance Items */}
        <Link
          href="/admin/compliance-calendar"
          className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm hover:border-[#B5723B]/40 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <Calendar size={18} />
            </span>
            <span className="text-[11px] font-medium text-emerald-700">
              Statutory
            </span>
          </div>
          <p className="text-xs font-semibold text-[#7A7F8C] uppercase tracking-wider mb-1">
            Compliance Deadlines
          </p>
          <div className="flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-[#14213A]">
              {compliance.length}
            </p>
            <span className="text-xs font-semibold text-[#B5723B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Calendar <ChevronRight size={13} />
            </span>
          </div>
        </Link>

        {/* Card 4: Case Studies */}
        <Link
          href="/admin/case-studies"
          className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm hover:border-[#B5723B]/40 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Briefcase size={18} />
            </span>
            <span className="text-[11px] font-medium text-purple-700">
              Transformations
            </span>
          </div>
          <p className="text-xs font-semibold text-[#7A7F8C] uppercase tracking-wider mb-1">
            Case Studies
          </p>
          <div className="flex items-baseline justify-between">
            <p className="font-heading font-extrabold text-3xl text-[#14213A]">
              {caseStudies.length}
            </p>
            <span className="text-xs font-semibold text-[#B5723B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Stories <ChevronRight size={13} />
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Launchpad Action Cards */}
      <div className="bg-[#14213A] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5723B]/20 blur-[120px] pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div>
            <span className="px-3 py-1 bg-white/10 rounded-full text-[11px] font-heading font-medium tracking-widest uppercase text-[#E7E4DC]">
              Quick Launchpad
            </span>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl mt-2 text-white">
              Studio Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/leads"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B5723B]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <Inbox size={20} className="text-[#B5723B] mb-2" />
                <h3 className="font-heading font-bold text-sm text-white">Founder Inquiries</h3>
                <p className="text-[11px] text-white/60 mt-1">Review contact form submissions & call prospects</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B5723B] group-hover:translate-x-1 transition-transform">
                <span>View Leads</span>
                <ArrowRight size={12} />
              </div>
            </Link>

            <Link
              href="/admin/blog/new"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B5723B]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <FileText size={20} className="text-[#B5723B] mb-2" />
                <h3 className="font-heading font-bold text-sm text-white">Publish New Blog</h3>
                <p className="text-[11px] text-white/60 mt-1">Draft & publish authoritative financial intelligence</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B5723B] group-hover:translate-x-1 transition-transform">
                <span>Open Editor</span>
                <ArrowRight size={12} />
              </div>
            </Link>

            <Link
              href="/admin/compliance-calendar"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B5723B]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <Calendar size={20} className="text-[#B5723B] mb-2" />
                <h3 className="font-heading font-bold text-sm text-white">Compliance Schedule</h3>
                <p className="text-[11px] text-white/60 mt-1">Manage monthly, quarterly & ROC filing deadlines</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B5723B] group-hover:translate-x-1 transition-transform">
                <span>Edit Calendar</span>
                <ArrowRight size={12} />
              </div>
            </Link>

            <Link
              href="/admin/case-studies"
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B5723B]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <Briefcase size={20} className="text-[#B5723B] mb-2" />
                <h3 className="font-heading font-bold text-sm text-white">Client Case Studies</h3>
                <p className="text-[11px] text-white/60 mt-1">Showcase 3x revenue growth & fundraise milestones</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B5723B] group-hover:translate-x-1 transition-transform">
                <span>Manage Stories</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Split Section: Recent Leads & Recent Blog Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Recent Leads */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
            <div className="flex items-center gap-2">
              <Inbox size={16} className="text-[#B5723B]" />
              <h2 className="font-heading font-bold text-base text-[#14213A]">Recent Strategy Leads</h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#B5723B] hover:underline flex items-center gap-1"
            >
              <span>View All ({activeLeads.length})</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {activeLeads.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7A7F8C]">
              No inquiries yet. When founders submit the strategy modal, they will show up here.
            </div>
          ) : (
            <div className="divide-y divide-[#E7E4DC]">
              {activeLeads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-xs text-[#14213A] truncate">
                        {lead.name}
                      </h4>
                      <span
                        className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          lead.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A7F8C] truncate mt-0.5">
                      {lead.email} • {lead.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-1.5 rounded-lg border border-[#E7E4DC] hover:border-emerald-500 text-[#14213A] hover:text-emerald-700 bg-[#FAFAF8] transition-colors"
                      title="Call"
                    >
                      <Phone size={12} />
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="p-1.5 rounded-lg border border-[#E7E4DC] hover:border-blue-500 text-[#14213A] hover:text-blue-700 bg-[#FAFAF8] transition-colors"
                      title="Email"
                    >
                      <Mail size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Blog Posts */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#B5723B]" />
              <h2 className="font-heading font-bold text-base text-[#14213A]">Recent Blog Articles</h2>
            </div>
            <Link
              href="/admin/blog"
              className="text-xs font-semibold text-[#B5723B] hover:underline flex items-center gap-1"
            >
              <span>View All ({posts.length})</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7A7F8C]">
              No articles found. Click &quot;New Post&quot; to write your first insight.
            </div>
          ) : (
            <div className="divide-y divide-[#E7E4DC]">
              {posts.slice(0, 4).map((post) => (
                <div key={post.slug} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-xs text-[#14213A] truncate">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#7A7F8C] mt-0.5">
                      <span className="text-[#B5723B] font-medium">{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime || "5 min"}</span>
                    </div>
                  </div>

                  <Link
                    href={`/admin/blog/edit?slug=${post.slug}`}
                    className="px-2.5 py-1 text-[11px] font-semibold text-[#14213A] hover:text-[#B5723B] bg-[#FAFAF8] border border-[#E7E4DC] rounded-lg transition-colors shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
