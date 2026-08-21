"use server";

import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "finsaar_admin_auth";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "finsaar@2026";

/**
 * Verify admin password on the server and set an HTTP-only session cookie
 */
export async function verifyAdminPassword(password: string) {
  if (!password) {
    return { success: false, error: "Password is required" };
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  if (password.trim() === expectedPassword.trim()) {
    const cookieStore = await cookies();
    // Set authenticated cookie (expires in 7 days)
    cookieStore.set(ADMIN_COOKIE_NAME, "authenticated_session_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { success: true };
  }

  return { success: false, error: "Invalid admin password. Please try again." };
}

/**
 * Check if the current server request has a valid admin session cookie
 */
export async function checkAdminSession() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  return { isAuthenticated: Boolean(authCookie?.value === "authenticated_session_token") };
}

/**
 * Logout and clear the admin session cookie
 */
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}
