"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-id")
);

export async function submitContactForm(formData: {
  name: string;
  phone: string;
  email: string;
  description?: string;
}) {
  try {
    // Validate inputs
    if (!formData.name || !formData.phone || !formData.email) {
      return { success: false, error: "Name, phone number, and email are required." };
    }

    // 1. Save submission into Supabase Database
    if (isSupabaseConfigured) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { error: dbError } = await supabase.from("leads").insert([
          {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            description: formData.description?.trim() || null,
            source: "strategy_call_modal",
            created_at: new Date().toISOString(),
          },
        ]);

        if (dbError) {
          console.error("Supabase Database Insert Warning:", dbError.message);
        } else {
          console.log("Lead successfully saved to Supabase 'leads' table.");
        }
      } catch (dbErr) {
        console.error("Error saving lead to database:", dbErr);
      }
    } else {
      console.log("Supabase not configured; skipping database insertion in local mode.");
    }

    // 2. Send Notification Email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating email success for development.");
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true };
    }

    const descriptionHtml = formData.description?.trim()
      ? `
        <tr>
          <td style="font-weight: bold; vertical-align: top;">Description / Query</td>
          <td style="white-space: pre-wrap;">${formData.description.trim()}</td>
        </tr>
      `
      : "";

    const { data, error } = await resend.emails.send({
      from: "Finsaar Website <onboarding@resend.dev>", // Replace with verified domain in production
      to: [process.env.RESEND_TO_EMAIL || "hello@finsaar.com"], // Receiving email
      subject: `New Strategy Call Request from ${formData.name}`,
      html: `
        <h2>New Strategy Call Request</h2>
        <p>A new prospect has requested a strategy call via the website.</p>
        <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: Arial, sans-serif;">
          <tr>
            <td style="font-weight: bold; width: 30%;">Name</td>
            <td>${formData.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Phone</td>
            <td>${formData.phone}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Email</td>
            <td>${formData.email}</td>
          </tr>
          ${descriptionHtml}
        </table>
        <br/>
        <p style="color: #666; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
        <p>Please reach out to them within 24 hours.</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: `Resend Error: ${error.message}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error submitting form:", error);
    return { success: false, error: `Unexpected error: ${error.message || "Unknown error"}` };
  }
}
