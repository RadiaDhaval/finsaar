import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  description?: string | null;
  source: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
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
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "mock-2",
    name: "Ananya Sharma",
    phone: "+91 97112 33445",
    email: "ananya@ecologix.co.in",
    description: "D2C sustainable brand scaling beyond ₹5 Cr ARR. Looking for a Fractional CFO for inventory financing & GST audit prep.",
    source: "strategy_call_modal",
    status: "contacted",
    created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "mock-3",
    name: "Rohit Singhania",
    phone: "+91 99887 66554",
    email: "rohit@singhaniagroup.com",
    description: "Exploring CFO advisory to clean up books and construct investor-ready financial model before institutional fundraising round.",
    source: "strategy_call_modal",
    status: "new",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
];

/**
 * Fetch all leads from Supabase (or fallback mock data)
 */
export async function getLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured || !supabase) {
    // In local mode without Supabase, check local storage if client-side
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("finsaar_local_leads");
      if (stored) {
        try {
          return JSON.parse(stored);
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
      return data as Lead[];
    }

    return [];
  } catch (err) {
    console.error("Error fetching leads from Supabase:", err);
    return mockLeads;
  }
}

/**
 * Update lead status (e.g. 'new' -> 'contacted' -> 'closed')
 */
export async function updateLeadStatus(
  id: string,
  status: "new" | "contacted" | "closed"
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("mock-")) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("finsaar_local_leads");
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const updated = list.map((l) => (l.id === id ? { ...l, status } : l));
      localStorage.setItem("finsaar_local_leads", JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
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
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("mock-")) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("finsaar_local_leads");
      const list: Lead[] = stored ? JSON.parse(stored) : [...mockLeads];
      const filtered = list.filter((l) => l.id !== id);
      localStorage.setItem("finsaar_local_leads", JSON.stringify(filtered));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete lead",
    };
  }
}
