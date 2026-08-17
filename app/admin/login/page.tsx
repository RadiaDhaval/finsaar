"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      // Demo / offline mode bypass
      setTimeout(() => {
        router.push("/admin/blog");
      }, 500);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // If user doesn't exist yet, offer simple sign-up or show message
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push("/admin/blog");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error");
      setLoading(false);
    }
  };

  const handleDirectDemoAccess = () => {
    router.push("/admin/blog");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-[#FAFAF8] to-[#F2EFE9]">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#14213A] to-[#1e3256] flex items-center justify-center text-white font-heading font-bold text-2xl shadow-lg shadow-[#14213A]/10">
            F
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-[#14213A]">
            Finsaar Studio
          </h1>
          <p className="font-body text-sm text-[#7A7F8C] mt-1.5">
            Client Content & Blog Management Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-[#E7E4DC] p-8 md:p-10 shadow-[0_20px_40px_rgba(20,33,58,0.05)]">
          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFF8ED] border border-[#B5723B]/30 flex items-start gap-3">
              <Sparkles size={18} className="text-[#B5723B] shrink-0 mt-0.5" />
              <div className="text-xs text-[#14213A]/80">
                <p className="font-semibold text-[#B5723B]">Quick Preview Mode</p>
                <p className="mt-0.5">
                  Supabase keys are not set yet. You can click <strong>&quot;Enter Studio&quot;</strong> to explore the full dashboard and editor.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-700">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-700">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7F8C]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isSupabaseConfigured ? "client@finsaar.com" : "admin@finsaar.com"}
                  required={isSupabaseConfigured}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-sm font-body text-[#14213A] placeholder-[#7A7F8C]/60 focus:outline-none focus:border-[#B5723B] focus:ring-2 focus:ring-[#B5723B]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14213A] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7F8C]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required={isSupabaseConfigured}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF8] border border-[#E7E4DC] rounded-xl text-sm font-body text-[#14213A] placeholder-[#7A7F8C]/60 focus:outline-none focus:border-[#B5723B] focus:ring-2 focus:ring-[#B5723B]/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#14213A] hover:bg-[#1e3256] text-white rounded-xl font-heading font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#14213A]/10 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Enter Studio <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E7E4DC] text-center">
            <Link
              href="/blog"
              className="text-xs text-[#7A7F8C] hover:text-[#B5723B] transition-colors"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
