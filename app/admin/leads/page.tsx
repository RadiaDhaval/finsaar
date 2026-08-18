"use client";

import React, { useEffect, useState } from "react";
import {
  Inbox,
  Search,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Copy,
  ExternalLink,
  MessageSquare,
  X,
  Filter,
  RotateCcw,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import {
  Lead,
  getLeads,
  updateLeadStatus,
  moveToBin,
  restoreLead,
  permanentlyDeleteLead,
  emptyBin,
} from "@/lib/leads-service";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "contacted" | "bin">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchLeadsData = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "contacted") => {
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus, deleted_at: null } : lead))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
      setActionMessage({
        type: "success",
        text: `Lead status updated to ${newStatus.toUpperCase()}`,
      });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({
        type: "error",
        text: res.error || "Failed to update lead status.",
      });
    }
  };

  const handleMoveToBin = async (id: string) => {
    setProcessingId(id);
    const res = await moveToBin(id);
    setProcessingId(null);

    if (res.success) {
      const deleted_at = new Date().toISOString();
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: "bin" as const, deleted_at } : l))
      );
      if (selectedLead?.id === id) setSelectedLead(null);
      setActionMessage({
        type: "success",
        text: "Lead moved to Recycle Bin (Kept for 30 days).",
      });
      setTimeout(() => setActionMessage(null), 3500);
    } else {
      setActionMessage({
        type: "error",
        text: res.error || "Failed to move lead to bin.",
      });
    }
  };

  const handleRestore = async (id: string) => {
    setProcessingId(id);
    const res = await restoreLead(id);
    setProcessingId(null);

    if (res.success) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: "new" as const, deleted_at: null } : l))
      );
      setActionMessage({
        type: "success",
        text: "Lead restored back to active inquiries!",
      });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({
        type: "error",
        text: res.error || "Failed to restore lead.",
      });
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to permanently delete this lead? This cannot be undone.");
    if (!confirm) return;

    setProcessingId(id);
    const res = await permanentlyDeleteLead(id);
    setProcessingId(null);

    if (res.success) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
      setActionMessage({
        type: "success",
        text: "Lead permanently deleted.",
      });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({
        type: "error",
        text: res.error || "Failed to permanently delete lead.",
      });
    }
  };

  const handleEmptyBin = async () => {
    const binCount = leads.filter((l) => l.status === "bin").length;
    if (binCount === 0) return;

    const confirm = window.confirm(`Permanently delete all ${binCount} leads in the Recycle Bin?`);
    if (!confirm) return;

    setLoading(true);
    const res = await emptyBin();
    setLoading(false);

    if (res.success) {
      setLeads((prev) => prev.filter((l) => l.status !== "bin"));
      setActionMessage({
        type: "success",
        text: "Recycle Bin emptied successfully.",
      });
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      setActionMessage({
        type: "error",
        text: res.error || "Failed to empty bin.",
      });
    }
  };

  // Split Active vs Bin Leads
  const activeLeads = leads.filter((l) => l.status !== "bin");
  const binLeads = leads.filter((l) => l.status === "bin");

  // Filtered Leads
  const filteredLeads = (statusFilter === "bin" ? binLeads : activeLeads).filter((lead) => {
    const matchesStatus =
      statusFilter === "all" ||
      statusFilter === "bin" ||
      lead.status === statusFilter;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q) ||
      (lead.description && lead.description.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const totalActiveCount = activeLeads.length;
  const newCount = activeLeads.filter((l) => l.status === "new").length;
  const contactedCount = activeLeads.filter((l) => l.status === "contacted").length;
  const binCount = binLeads.length;

  return (
    <div className="space-y-8 w-full max-w-full pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#B5723B]/10 text-[#B5723B]">
              <Inbox size={18} />
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-[#14213A]">
              Strategy Call Leads
            </h1>
          </div>
          <p className="text-xs text-[#7A7F8C]">
            Direct founder inquiries received from the &quot;Book a Strategy Call&quot; modal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeadsData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-[#E7E4DC] bg-white text-[#7A7F8C] hover:text-[#14213A] hover:bg-[#F5F3EE] transition-all disabled:opacity-50"
            title="Refresh Leads"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Action Notification */}
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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm">
          <p className="text-xs font-semibold text-[#7A7F8C] uppercase tracking-wider mb-1">
            Total Inquiries
          </p>
          <p className="font-heading font-extrabold text-3xl text-[#14213A]">
            {totalActiveCount}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#B5723B] uppercase tracking-wider">
              Action Required (New)
            </p>
            {newCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#B5723B] animate-pulse" />
            )}
          </div>
          <p className="font-heading font-extrabold text-3xl text-[#B5723B]">{newCount}</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            In Touch / Contacted
          </p>
          <p className="font-heading font-extrabold text-3xl text-emerald-700">
            {contactedCount}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#E7E4DC] shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7F8C]" />
          <input
            type="text"
            placeholder="Search by founder, email, phone, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-xs text-[#14213A] placeholder-[#7A7F8C]/60 focus:outline-none focus:border-[#B5723B]"
          />
        </div>

        {/* Status Filters & Bin */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-[#FAFAF8] p-1 rounded-2xl border border-[#E7E4DC]">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-[#14213A] text-white shadow-sm"
                  : "text-[#7A7F8C] hover:text-[#14213A]"
              }`}
            >
              All ({totalActiveCount})
            </button>
            <button
              onClick={() => setStatusFilter("new")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "new"
                  ? "bg-[#14213A] text-white shadow-sm"
                  : "text-[#7A7F8C] hover:text-[#14213A]"
              }`}
            >
              New ({newCount})
            </button>
            <button
              onClick={() => setStatusFilter("contacted")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === "contacted"
                  ? "bg-[#14213A] text-white shadow-sm"
                  : "text-[#7A7F8C] hover:text-[#14213A]"
              }`}
            >
              Contacted ({contactedCount})
            </button>
          </div>

          {/* Recycle Bin Tab Button */}
          <button
            onClick={() => setStatusFilter("bin")}
            className={`px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              statusFilter === "bin"
                ? "bg-red-500 text-white border-red-500 shadow-sm"
                : "bg-white border-[#E7E4DC] text-[#7A7F8C] hover:text-red-600 hover:border-red-200"
            }`}
            title="Deleted leads stay in Bin for 30 days"
          >
            <Trash2 size={13} />
            <span>Bin</span>
            {binCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  statusFilter === "bin"
                    ? "bg-white text-red-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {binCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bin Notice Header if in Bin tab */}
      {statusFilter === "bin" && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-700 shrink-0" />
            <span>
              <strong>Recycle Bin:</strong> Deleted leads stay here for <strong>30 days</strong> before automatic permanent deletion. You can restore them anytime.
            </span>
          </div>
          {binCount > 0 && (
            <button
              onClick={handleEmptyBin}
              className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors shrink-0 shadow-sm"
            >
              Empty Bin ({binCount})
            </button>
          )}
        </div>
      )}

      {/* Leads List / Table */}
      <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <RefreshCw size={24} className="animate-spin text-[#B5723B] mx-auto mb-3" />
            <p className="text-xs text-[#7A7F8C]">Loading leads data...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#E7E4DC] flex items-center justify-center mx-auto text-[#7A7F8C]">
              {statusFilter === "bin" ? <Trash2 size={22} /> : <Inbox size={22} />}
            </div>
            <h3 className="font-heading font-bold text-base text-[#14213A]">
              {statusFilter === "bin" ? "Recycle Bin is empty" : "No inquiries found"}
            </h3>
            <p className="text-xs text-[#7A7F8C] max-w-sm mx-auto">
              {statusFilter === "bin"
                ? "Deleted leads will appear here for 30 days with a restore option."
                : searchQuery || statusFilter !== "all"
                ? "No leads matched your search criteria or status filter."
                : "When founders submit the strategy call modal, inquiries will show up right here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E7E4DC]">
            {filteredLeads.map((lead) => {
              const formattedDate = new Date(lead.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              // Days remaining in bin calculation
              let daysRemaining: number | null = null;
              if (lead.status === "bin" && lead.deleted_at) {
                const elapsed = Date.now() - new Date(lead.deleted_at).getTime();
                daysRemaining = Math.max(0, Math.ceil((THIRTY_DAYS_MS - elapsed) / (24 * 60 * 60 * 1000)));
              }

              return (
                <div
                  key={lead.id}
                  className={`p-5 md:p-6 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
                    lead.status === "bin" ? "bg-red-50/20 hover:bg-red-50/40" : "hover:bg-[#FAFAF8]"
                  }`}
                >
                  {/* Lead Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-heading font-bold text-base text-[#14213A]">
                        {lead.name}
                      </h3>

                      {/* Status Badge */}
                      {lead.status !== "bin" ? (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            lead.status === "new"
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {lead.status === "new" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          )}
                          {lead.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                          <Trash2 size={11} /> In Bin
                          {daysRemaining !== null && ` (${daysRemaining}d left)`}
                        </span>
                      )}

                      <span className="text-[11px] text-[#7A7F8C] flex items-center gap-1">
                        <Clock size={12} /> {formattedDate}
                      </span>
                    </div>

                    {/* Contact details */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#3a3f4d]">
                      {/* Phone */}
                      <div className="flex items-center gap-1.5 bg-[#FAFAF8] px-2.5 py-1 rounded-lg border border-[#E7E4DC]">
                        <Phone size={13} className="text-[#B5723B]" />
                        <span>{lead.phone}</span>
                        <button
                          onClick={() => handleCopy(lead.phone, `phone-${lead.id}`)}
                          className="text-[#7A7F8C] hover:text-[#14213A] ml-1"
                          title="Copy phone"
                        >
                          <Copy size={11} />
                        </button>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-1.5 bg-[#FAFAF8] px-2.5 py-1 rounded-lg border border-[#E7E4DC]">
                        <Mail size={13} className="text-[#B5723B]" />
                        <span>{lead.email}</span>
                        <button
                          onClick={() => handleCopy(lead.email, `email-${lead.id}`)}
                          className="text-[#7A7F8C] hover:text-[#14213A] ml-1"
                          title="Copy email"
                        >
                          <Copy size={11} />
                        </button>
                      </div>

                      {copiedText?.includes(lead.id) && (
                        <span className="text-[10px] text-emerald-600 font-bold animate-fadeIn">
                          Copied!
                        </span>
                      )}
                    </div>

                    {/* Query snippet */}
                    {lead.description && (
                      <div className="bg-[#FAFAF8] p-3 rounded-xl border border-[#E7E4DC] text-xs text-[#14213A]/80 flex items-start justify-between gap-2 mt-2">
                        <p className="line-clamp-2 italic">
                          &ldquo;{lead.description}&rdquo;
                        </p>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-[11px] font-semibold text-[#B5723B] hover:underline shrink-0 ml-2"
                        >
                          View Full
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions depending on whether lead is in Bin or Active */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E7E4DC]">
                    {lead.status !== "bin" ? (
                      <>
                        {/* Quick Call */}
                        <a
                          href={`tel:${lead.phone}`}
                          className="px-3 py-2 bg-white border border-[#E7E4DC] hover:border-[#B5723B] rounded-xl text-xs font-semibold text-[#14213A] flex items-center gap-1.5 transition-colors shadow-sm"
                          title="Call Lead"
                        >
                          <Phone size={13} className="text-emerald-600" />
                          <span>Call</span>
                        </a>

                        {/* Quick Email */}
                        <a
                          href={`mailto:${lead.email}?subject=Regarding your Finsaar Strategy Call`}
                          className="px-3 py-2 bg-white border border-[#E7E4DC] hover:border-[#B5723B] rounded-xl text-xs font-semibold text-[#14213A] flex items-center gap-1.5 transition-colors shadow-sm"
                          title="Email Lead"
                        >
                          <Mail size={13} className="text-blue-600" />
                          <span>Email</span>
                        </a>

                        {/* Status Dropdown: Only New & Contacted */}
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(
                              lead.id,
                              e.target.value as "new" | "contacted"
                            )
                          }
                          className="px-3 py-2 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-xs font-semibold text-[#14213A] focus:outline-none focus:border-[#B5723B] cursor-pointer"
                        >
                          <option value="new">Mark: New</option>
                          <option value="contacted">Mark: Contacted</option>
                        </select>

                        {/* Move to Bin Button */}
                        <button
                          onClick={() => handleMoveToBin(lead.id)}
                          disabled={processingId === lead.id}
                          className="p-2 text-[#7A7F8C] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                          title="Move to Recycle Bin (Kept for 30 days)"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Restore Lead Button */}
                        <button
                          onClick={() => handleRestore(lead.id)}
                          disabled={processingId === lead.id}
                          className="px-3.5 py-2 bg-white border border-[#E7E4DC] hover:border-emerald-500 rounded-xl text-xs font-semibold text-emerald-700 flex items-center gap-1.5 transition-colors shadow-sm"
                          title="Restore lead back to active list"
                        >
                          <RotateCcw size={13} />
                          <span>Restore</span>
                        </button>

                        {/* Permanent Delete Button */}
                        <button
                          onClick={() => handlePermanentDelete(lead.id)}
                          disabled={processingId === lead.id}
                          className="px-3.5 py-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-1.5 transition-colors"
                          title="Delete permanently from database"
                        >
                          <Trash2 size={13} />
                          <span>Delete Permanently</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Query Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213A]/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#E7E4DC] shadow-2xl max-w-lg w-full p-6 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-[#14213A]">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-[#7A7F8C]">Inquiry Details</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl text-[#7A7F8C] hover:text-[#14213A] hover:bg-[#FAFAF8] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contacts Info in Modal */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#E7E4DC]">
                <span className="text-[10px] text-[#7A7F8C] uppercase font-semibold block mb-0.5">
                  Phone
                </span>
                <span className="font-bold text-[#14213A]">{selectedLead.phone}</span>
              </div>
              <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#E7E4DC]">
                <span className="text-[10px] text-[#7A7F8C] uppercase font-semibold block mb-0.5">
                  Email
                </span>
                <span className="font-bold text-[#14213A] truncate block">
                  {selectedLead.email}
                </span>
              </div>
            </div>

            {/* Description content */}
            <div>
              <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                Description / Query
              </label>
              <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E7E4DC] text-xs text-[#14213A] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto font-body">
                {selectedLead.description || "No description provided."}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="px-4 py-2 bg-[#14213A] text-white rounded-xl text-xs font-semibold hover:bg-[#1e3256] transition-colors flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  <span>Call Founder</span>
                </a>
                <a
                  href={`mailto:${selectedLead.email}?subject=Finsaar Strategy Call Follow-up`}
                  className="px-4 py-2 bg-white border border-[#E7E4DC] text-[#14213A] rounded-xl text-xs font-semibold hover:bg-[#F5F3EE] transition-colors flex items-center gap-1.5"
                >
                  <Mail size={13} />
                  <span>Send Email</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-[#7A7F8C] hover:text-[#14213A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
