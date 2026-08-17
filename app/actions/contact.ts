"use server";

import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key");

export async function submitContactForm(formData: {
  name: string;
  phone: string;
  email: string;
}) {
  try {
    // Validate inputs
    if (!formData.name || !formData.phone || !formData.email) {
      return { success: false, error: "All fields are required." };
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success for development.");
      // If we don't have a key, simulate a successful send for testing purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    }

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "Finsaar Website <onboarding@resend.dev>", // Replace with a verified domain in production
      to: [process.env.RESEND_TO_EMAIL || "hello@finsaar.com"], // Replace with the client's actual receiving email
      subject: `New Strategy Call Request from ${formData.name}`,
      html: `
        <h2>New Strategy Call Request</h2>
        <p>A new prospect has requested a strategy call via the website.</p>
        <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; max-width: 600px;">
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
        </table>
        <br/>
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
