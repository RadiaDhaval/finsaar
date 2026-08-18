import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  description?: string | null;
  source: string;
  status: "new" | "contacted" | "bin";
  created_at: string;
  deleted_at?: string | null;
}

// Fallback mock leads for local preview / demonstration when Supabase is not yet populated
const mockLeads: Lead[] = [
  {
    id: "mock-1",
    name: "Vikram Malhotra",
    phone: "+91 98201 54321",
    email: "vikram@zenithtech.io",
    description: "Series-A stage SaaS company. Need guidance on setting up ESOP pool and cashflow projections for the upcoming board meeting.",
    source: "strategy_call_modal",
    status: "new",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-2",
    name: "Ananya Sharma",
    phone: "+91 97112 33445",
    email: "ananya@ecologix.co.in",
    description: "D2C sustainable brand scaling beyond ₹5 Cr ARR. Looking for a Fractional CFO for inventory financing & GST audit prep.",
    source: "strategy_call_modal",
    status: "contacted",
    created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-3",
    name: "Rohit Singhania",
    phone: "+91 99887 66554",
    email: "rohit@singhaniagroup.com",
    description: "Exploring CFO advisory to clean up books and construct investor-ready financial model before institutional fundraising round.",
    source: "strategy_call_modal",
    status: "new",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const LOCAL_STORAGE_KEY = "finsaar_local_leads";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Fetch all leads from Supabase (or fallback mock data) and clean up >30 days binned leads
 */
export async function getLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          const parsed: Lead[] = JSON.parse(stored);
          const now = Date.now();
          // Filter out binned items older than 30 days
          const cleaned = parsed.filter((l) => {
            if (l.status === "bin" && l.deleted_at) {
              return now - new Date(l.deleted_at).getTime() < THIRTY_DAYS_MS;
            }
            return true;
          });
          if (cleaned.length !== parsed.length) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        } catch {
          // fallback
        }
      }
    }
    return mockLeads;
  }

  try {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase leads fetch failed:", error.message);
      return mockLeads;
    }

    if (data && data.length > 0) {
      const leadsList = data as Lead[];
      const now = Date.now();

      // Check if any leads in bin are older than 30 days and auto-purge them asynchronously
      const expiredBinnedIds = leadsList
        .filter((l) => l.status === "bin" && l.deleted_at && now - new Date(l.deleted_at).getTime() >= THIRTY_DAYS_MS)
        .map((l) => l.id);

      if (expiredBinnedIds.length > 0) {
        supabase.from("leads").delete().in("id", expiredBinnedIds).then();
        return leadsList.filter((l) => !expiredBinnedIds.includes(l.id));
      }

      return leadsList;
    }

    return [];
  } catch (err) {
    console.error("Error fetching leads from Supabase:", err);
    return mockLeads;
  }
}

/**
 * Update lead status (between 'new' and 'contacted')
 */
export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted"
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("mock-")) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const updated = list.map((l) => (l.id === id ? { ...l, status, deleted_at: null } : l));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status, deleted_at: null })
      .eq("id", id);

    if (error) {
      // Fallback if deleted_at column doesn't exist yet in Supabase
      if (error.message.includes("deleted_at")) {
        const { error: fallbackErr } = await supabase
          .from("leads")
          .update({ status })
          .eq("id", id);
        if (fallbackErr) return { success: false, error: fallbackErr.message };
        return { success: true };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update lead status",
    };
  }
}

/**
 * Move a lead to Recycle Bin (stays for 30 days)
 */
export async function moveToBin(id: string): Promise<{ success: boolean; error?: string }> {
  const deleted_at = new Date().toISOString();

  if (!isSupabaseConfigured || !supabase || id.startsWith("mock-")) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const updated = list.map((l) =>
        l.id === id ? { ...l, status: "bin" as const, deleted_at } : l
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status: "bin", deleted_at })
      .eq("id", id);

    if (error) {
      // Fallback if deleted_at column doesn't exist yet in Supabase
      if (error.message.includes("deleted_at")) {
        const { error: fallbackErr } = await supabase
          .from("leads")
          .update({ status: "bin" })
          .eq("id", id);
        if (fallbackErr) return { success: false, error: fallbackErr.message };
        return { success: true };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to move lead to bin",
    };
  }
}

/**
 * Restore a lead from Recycle Bin back to 'new'
 */
export async function restoreLead(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("mock-")) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const updated = list.map((l) =>
        l.id === id ? { ...l, status: "new" as const, deleted_at: null } : l
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status: "new", deleted_at: null })
      .eq("id", id);

    if (error) {
      // Fallback if deleted_at column doesn't exist yet in Supabase
      if (error.message.includes("deleted_at")) {
        const { error: fallbackErr } = await supabase
          .from("leads")
          .update({ status: "new" })
          .eq("id", id);
        if (fallbackErr) return { success: false, error: fallbackErr.message };
        return { success: true };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to restore lead",
    };
  }
}

/**
 * Permanently delete a single lead
 */
export async function permanentlyDeleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("mock-")) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const filtered = list.filter((l) => l.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to permanently delete lead",
    };
  }
}

/**
 * Empty all leads in the Recycle Bin
 */
export async function emptyBin(): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const filtered = list.filter((l) => l.status !== "bin");
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase.from("leads").delete().eq("status", "bin");
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to empty bin",
    };
  }
}
