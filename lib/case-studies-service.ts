import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  metric: string; // e.g. "3x Growth", "100% Audit-Ready", "₹50Cr Raised"
  description: string;
  desc?: string;  // backward-compatible alias
  glow?: string;  // e.g. "bg-orange-500", "bg-blue-500", "bg-emerald-500"
  link?: string;
  order_index?: number;
  created_at?: string;
}

export const initialCaseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Scaling a D2C Brand from ₹1Cr to ₹10Cr ARR",
    industry: "D2C / E-Commerce",
    metric: "3x Growth",
    description: "How we implemented a 13-week rolling cash flow model and optimized their working capital cycle, freeing up cash for aggressive marketing spend without raising debt.",
    desc: "How we implemented a 13-week rolling cash flow model and optimized their working capital cycle, freeing up cash for aggressive marketing spend without raising debt.",
    glow: "bg-orange-500",
    order_index: 1,
  },
  {
    id: "case-2",
    title: "Automating Compliance for a SaaS Startup",
    industry: "B2B SaaS",
    metric: "100% Audit-Ready",
    description: "Transitioned their messy spreadsheet-based accounting into a fully automated tech stack, ensuring flawless GST compliance and saving the founders 40+ hours a month.",
    desc: "Transitioned their messy spreadsheet-based accounting into a fully automated tech stack, ensuring flawless GST compliance and saving the founders 40+ hours a month.",
    glow: "bg-blue-500",
    order_index: 2,
  },
  {
    id: "case-3",
    title: "Due Diligence Prep for Series A",
    industry: "HealthTech",
    metric: "₹50Cr Raised",
    description: "Acted as their embedded CFO to rebuild historical financials, clear compliance backlogs, and manage the data room—resulting in a smooth term sheet signing.",
    desc: "Acted as their embedded CFO to rebuild historical financials, clear compliance backlogs, and manage the data room—resulting in a smooth term sheet signing.",
    glow: "bg-emerald-500",
    order_index: 3,
  },
];

const LOCAL_STORAGE_KEY = "finsaar_case_studies";

function normalizeStudy(item: any): CaseStudy {
  return {
    id: item.id,
    title: item.title || "",
    industry: item.industry || "",
    metric: item.metric || "",
    description: item.description || item.desc || "",
    desc: item.description || item.desc || "",
    glow: item.glow || "bg-orange-500",
    link: item.link || "#",
    order_index: item.order_index || 0,
    created_at: item.created_at,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          return parsed.map(normalizeStudy);
        } catch {
          // fallback
        }
      }
    }
    return initialCaseStudies;
  }

  try {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialCaseStudies;
    }

    return data.map(normalizeStudy);
  } catch (err) {
    console.error("Error fetching case studies:", err);
    return initialCaseStudies;
  }
}

export async function createCaseStudy(
  study: {
    title: string;
    industry: string;
    metric: string;
    description: string;
    glow?: string;
    link?: string;
    order_index?: number;
  }
): Promise<{ success: boolean; data?: CaseStudy; error?: string }> {
  const newStudy: CaseStudy = {
    ...study,
    desc: study.description,
    id: `case-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const list = await getCaseStudies();
      const updated = [...list, newStudy];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true, data: newStudy };
  }

  try {
    const { data, error } = await supabase
      .from("case_studies")
      .insert([
        {
          title: study.title,
          industry: study.industry,
          metric: study.metric,
          description: study.description,
          glow: study.glow || "bg-orange-500",
          link: study.link || "#",
          order_index: study.order_index || 0,
        },
      ])
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: normalizeStudy(data) };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create case study",
    };
  }
}

export async function updateCaseStudy(
  id: string,
  updates: Partial<{
    title: string;
    industry: string;
    metric: string;
    description: string;
    desc?: string;
    glow?: string;
    link?: string;
    order_index?: number;
  }>
): Promise<{ success: boolean; error?: string }> {
  const payload: any = { ...updates };
  if (updates.description) {
    payload.description = updates.description;
    payload.desc = updates.description;
  } else if (updates.desc) {
    payload.description = updates.desc;
    payload.desc = updates.desc;
  }

  if (!isSupabaseConfigured || !supabase || id.startsWith("case-")) {
    if (typeof window !== "undefined") {
      const list = await getCaseStudies();
      const updated = list.map((c) => (c.id === id ? { ...c, ...payload } : c));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const dbUpdates: any = { ...payload };
    delete dbUpdates.desc; // remove client alias before sending to db

    const { error } = await supabase
      .from("case_studies")
      .update(dbUpdates)
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update case study",
    };
  }
}

export async function deleteCaseStudy(
  id: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("case-")) {
    if (typeof window !== "undefined") {
      const list = await getCaseStudies();
      const updated = list.filter((c) => c.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("case_studies")
      .delete()
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete case study",
    };
  }
}

export async function seedInitialCaseStudies(): Promise<{ success: boolean; count?: number; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCaseStudies));
    }
    return { success: true, count: initialCaseStudies.length };
  }

  try {
    const { error: deleteErr } = await supabase.from("case_studies").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteErr) console.warn("Notice clearing table:", deleteErr.message);

    const studiesToInsert = initialCaseStudies.map((s, index) => ({
      title: s.title,
      industry: s.industry,
      metric: s.metric,
      description: s.description,
      glow: s.glow || "bg-orange-500",
      link: s.link || "#",
      order_index: index + 1,
    }));

    const { data, error } = await supabase.from("case_studies").insert(studiesToInsert).select();
    if (error) return { success: false, error: error.message };
    return { success: true, count: data?.length || 0 };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to seed case studies",
    };
  }
}
