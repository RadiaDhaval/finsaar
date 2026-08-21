"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Lock, ArrowRight, AlertCircle, ShieldCheck, Eye, EyeOff, KeyRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { verifyAdminPassword } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Verify against master Admin Password Server Action
      const result = await verifyAdminPassword(password);

      if (result.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("finsaar_admin_auth", "true");
        }
        router.push("/admin");
        return;
      }

      // 2. If Supabase is configured, also try Supabase Auth as secondary
      if (isSupabaseConfigured && supabase && password.includes("@")) {
        // In case user typed email:password
      }

      setError(result.error || "Incorrect admin password. Access denied.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-[#FAFAF8] via-[#F5F3EE] to-[#EAE6DE]">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#14213A] to-[#1e3256] flex items-center justify-center p-3 shadow-xl shadow-[#14213A]/15 border border-white/20">
            <Image
              src="/imp/logo/d.png"
              alt="Finsaar Studio Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#14213A]">
            Finsaar Studio
          </h1>
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <ShieldCheck size={14} className="text-[#B5723B]" />
            <p className="font-body text-xs font-semibold text-[#7A7F8C] uppercase tracking-wider">
              Protected Admin Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] p-8 md:p-10 shadow-[0_20px_50px_rgba(20,33,58,0.08)] backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-700 font-medium animate-shake">
              <AlertCircle size={16} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-[#14213A] uppercase tracking-wider">
                  Admin Passcode
                </label>
                <span className="text-[11px] text-[#7A7F8C] flex items-center gap-1">
                  <KeyRound size={12} className="text-[#B5723B]" />
                  Authorized personnel only
                </span>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7F8C]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  required
                  autoFocus
                  className="w-full pl-10 pr-11 py-3.5 bg-[#FAFAF8] border border-[#E7E4DC] rounded-2xl text-sm font-body text-[#14213A] placeholder-[#7A7F8C]/60 focus:outline-none focus:border-[#B5723B] focus:ring-2 focus:ring-[#B5723B]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A7F8C] hover:text-[#14213A] transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-3.5 px-4 bg-[#14213A] hover:bg-[#1e3256] active:scale-[0.99] text-white rounded-2xl font-heading font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#14213A]/15 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  <span>Unlock Studio</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E7E4DC] text-center">
            <Link
              href="/"
              className="text-xs text-[#7A7F8C] hover:text-[#B5723B] transition-colors font-medium"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
