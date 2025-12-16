"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Sparkles, Mail, Zap } from "lucide-react";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { motion } from "motion/react";
import type { Provider } from "@/lib/available-providers";

export default function CV99XAuthForm({ 
  availableProviders,
  magicLinkEnabled = true
}: { 
  availableProviders: Provider[];
  magicLinkEnabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || socialBusy) return;

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    let tid: string | number | undefined;
    setLoading(true);

    try {
      const { error } = await authClient.signIn.magicLink(
        {
          email,
          callbackURL: "/profile",
          newUserCallbackURL: "/profile",
        },
        {
          onRequest: () => {
            tid = toast.loading("Sending magic link...", {
              icon: <Loader2 className="size-4 animate-spin text-fuchsia-700" />,
            });
          },
          onSuccess: () => {
            toast.success(
              <span className="flex items-center gap-2">
                <Sparkles className="size-4 text-fuchsia-500" />
                Check your inbox! Magic link sent.
              </span>,
              { id: tid }
            );
            // Clear the email input field after successful send
            form.reset();
          },
          onError: (ctx: any) => {
            const fallback = "We couldn't send the link. Please try again.";
            const message =
              typeof ctx.error === "string"
                ? ctx.error
                : ctx.error?.message || fallback;
            toast.error(message, { id: tid ?? undefined });
          },
        }
      );

      if (error) {
        const fallback = "We couldn't send the link. Please try again.";
        const message =
          typeof error === "string" ? error : error?.message || fallback;
        toast.error(message, { id: tid ?? undefined });
        return;
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error sending the link.";
      toast.error(message, { id: tid ?? undefined });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <form
        onSubmit={handleSubmit}
        className="relative space-y-6 rounded-2xl border border-purple-500/20 bg-linear-to-b from-neutral-900/95 to-neutral-900/98 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-xl" />

        {/* Header */}
        <div className="space-y-2 text-center">
        
          <h1 className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            Welcome to CV99X
          </h1>
          <p className="text-sm text-gray-100">
            Sign in or create your account to get started
          </p>
        </div>

        {/* Social Sign In */}
        <div className="space-y-4">
          {availableProviders.length > 0 && (
            <>
              <SocialSignIn
                disabled={loading}
                onBusyChange={setSocialBusy}
                providers={availableProviders}
              />

              {/* Divider - only show if magic link is enabled */}
              {magicLinkEnabled && (
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />
                  <span className="text-xs text-gray-500">or continue with email</span>
                  <span className="h-px flex-1 bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />
                </div>
              )}
            </>
          )}

          {availableProviders.length === 0 && magicLinkEnabled && (
            <p className="text-center text-sm text-gray-500">
              Sign in with your email below
            </p>
          )}

          {availableProviders.length === 0 && !magicLinkEnabled && (
            <p className="text-center text-sm text-red-400">
              No authentication providers configured. Please contact support.
            </p>
          )}
        </div>

        {/* Magic Link Email Form - only show if enabled */}
        {magicLinkEnabled && (
          <>
            {/* Email Input */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wider text-white"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-300" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading || socialBusy}
                  className="h-12 border-purple-500/30 bg-neutral-800/50 pl-10 text-gray-100 placeholder:text-gray-600 focus:border-purple-500 focus:bg-neutral-800/70 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-200">
              We'll send you a secure one-time link to sign in instantly—no password needed.
            </p>

            {/* Submit Button */}
            <Button
              disabled={loading || socialBusy}
              type="submit"
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-5 transition-transform group-hover:rotate-12" />
                    Send Magic Link
                  </>
                )}
              </span>
              <div className="absolute inset-0 -z-10 bg-linear-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </>
        )}

        {/* Footer */}
        <div className="space-y-2 pt-4 text-center text-xs italic text-gray-400">
          <p>
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-purple-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-purple-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </form>

      {/* Autofill Styling */}
      <style jsx>{`
        form input:-webkit-autofill,
        form input:-webkit-autofill:hover,
        form input:-webkit-autofill:focus {
          -webkit-text-fill-color: #f5f5f5;
          box-shadow: 0 0 0px 1000px #262626 inset;
          caret-color: #a855f7;
          border-radius: 0.75rem;
        }
        form input:-moz-autofill {
          box-shadow: 0 0 0px 1000px #262626 inset;
          color: #f5f5f5 !important;
          caret-color: #a855f7;
        }
      `}</style>
    </motion.div>
  );
}
