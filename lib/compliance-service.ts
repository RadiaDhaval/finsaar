import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface ComplianceItem {
  id: string;
  category: string; // e.g. "Every Month", "Quarterly Deadlines", "Annual Deadlines (Sep - Nov)"
  date: string;     // e.g. "7th", "15th Jun/Sep/Dec/Mar", "30th Sep"
  task: string;     // e.g. "TDS / TCS Deposit for previous month"
  order_index?: number;
  created_at?: string;
}

export interface ComplianceGroup {
  month: string;
  items: { id?: string; date: string; task: string }[];
}

export const initialComplianceDeadlines: ComplianceItem[] = [
  {
    id: "comp-1",
    category: "Every Month",
    date: "7th",
    task: "TDS / TCS Deposit for previous month",
    order_index: 1,
  },
  {
    id: "comp-2",
    category: "Every Month",
    date: "11th",
    task: "GSTR-1 filing (Outward supplies)",
    order_index: 2,
  },
  {
    id: "comp-3",
    category: "Every Month",
    date: "15th",
    task: "PF / ESI Deposit for previous month",
    order_index: 3,
  },
  {
    id: "comp-4",
    category: "Every Month",
    date: "20th",
    task: "GSTR-3B filing (Summary return & tax payment)",
    order_index: 4,
  },
  {
    id: "comp-5",
    category: "Quarterly Deadlines",
    date: "15th Jun/Sep/Dec/Mar",
    task: "Advance Income Tax Installment",
    order_index: 5,
  },
  {
    id: "comp-6",
    category: "Quarterly Deadlines",
    date: "31st Jan/May/Jul/Oct",
    task: "TDS Return Filing (Form 24Q/26Q)",
    order_index: 6,
  },
  {
    id: "comp-7",
    category: "Annual Deadlines (Sep - Nov)",
    date: "30th Sep",
    task: "Income Tax Return (ITR) for non-audit cases",
    order_index: 7,
  },
  {
    id: "comp-8",
    category: "Annual Deadlines (Sep - Nov)",
    date: "31st Oct",
    task: "Income Tax Return (ITR) for audit cases",
    order_index: 8,
  },
  {
    id: "comp-9",
    category: "Annual Deadlines (Sep - Nov)",
    date: "30th Nov",
    task: "ROC Annual Filing (AOC-4, MGT-7)",
    order_index: 9,
  },
];

const LOCAL_STORAGE_KEY = "finsaar_compliance_items";

export async function getComplianceItems(): Promise<ComplianceItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch {
          // fallback
        }
      }
    }
    return initialComplianceDeadlines;
  }

  try {
    const { data, error } = await supabase
      .from("compliance_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return initialComplianceDeadlines;
    }

    return data as ComplianceItem[];
  } catch (err) {
    console.error("Error fetching compliance items:", err);
    return initialComplianceDeadlines;
  }
}

export async function getGroupedComplianceDeadlines(): Promise<ComplianceGroup[]> {
  const items = await getComplianceItems();
  const groupsMap = new Map<string, { id?: string; date: string; task: string }[]>();

  for (const item of items) {
    const cat = item.category || "General Deadlines";
    if (!groupsMap.has(cat)) {
      groupsMap.set(cat, []);
    }
    groupsMap.get(cat)!.push({
      id: item.id,
      date: item.date,
      task: item.task,
    });
  }

  return Array.from(groupsMap.entries()).map(([month, groupItems]) => ({
    month,
    items: groupItems,
  }));
}

export async function createComplianceItem(
  item: Omit<ComplianceItem, "id" | "created_at">
): Promise<{ success: boolean; data?: ComplianceItem; error?: string }> {
  const newItem: ComplianceItem = {
    ...item,
    id: `comp-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const items = await getComplianceItems();
      const updated = [...items, newItem];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true, data: newItem };
  }

  try {
    const { data, error } = await supabase
      .from("compliance_items")
      .insert([item])
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as ComplianceItem };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create compliance item",
    };
  }
}

export async function updateComplianceItem(
  id: string,
  updates: Partial<Omit<ComplianceItem, "id">>
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("comp-")) {
    if (typeof window !== "undefined") {
      const items = await getComplianceItems();
      const updated = items.map((it) => (it.id === id ? { ...it, ...updates } : it));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("compliance_items")
      .update(updates)
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update compliance item",
    };
  }
}

export async function deleteComplianceItem(
  id: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase || id.startsWith("comp-")) {
    if (typeof window !== "undefined") {
      const items = await getComplianceItems();
      const updated = items.filter((it) => it.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from("compliance_items")
      .delete()
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete compliance item",
    };
  }
}

export async function seedInitialCompliance(): Promise<{ success: boolean; count?: number; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialComplianceDeadlines));
    }
    return { success: true, count: initialComplianceDeadlines.length };
  }

  try {
    const { error: deleteErr } = await supabase.from("compliance_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteErr) console.warn("Notice clearing table:", deleteErr.message);

    const itemsToInsert = initialComplianceDeadlines.map(({ id, ...rest }, index) => ({
      ...rest,
      order_index: index + 1,
    }));

    const { data, error } = await supabase.from("compliance_items").insert(itemsToInsert).select();
    if (error) return { success: false, error: error.message };
    return { success: true, count: data?.length || 0 };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to seed compliance data",
    };
  }
}
