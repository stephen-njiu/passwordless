"use client";
import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || socialBusy) return;
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!email) { toast.error("Email is required"); return; }
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
              icon: <Loader2 className="size-4 animate-spin text-fuchsia-400" />,
            });
          },
          onSuccess: () => {
            toast.success(
              <span className="flex items-center gap-1">
                <Sparkles className="size-4 text-fuchsia-400" />
                Check your inbox
              </span>,
              { id: tid }
            );
            router.push("/auth/login");
          },
          onError: (ctx) => {
            const fallback = "We couldn't send the link. Please try again.";
            const message = typeof ctx.error === "string"
              ? ctx.error
              : ctx.error?.message || fallback;
            toast.error(message, { id: tid ?? undefined });
          },
        }
      );
      if (error) {
        const fallback = "We couldn't send the link. Please try again.";
        const message = typeof error === "string" ? error : error?.message || fallback;
        toast.error(message, { id: tid ?? undefined });
        return;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error sending the link.";
      toast.error(message, { id: tid ?? undefined });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-100">Create account</h2>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400"><span className="size-2 rounded-full bg-emerald-500" /> Sign-Up</span>
      </div>
      {/* Social providers */}
      <div className="space-y-2">
        <SocialSignIn disabled={loading} onBusyChange={setSocialBusy} />
        <div className="flex items-center gap-3 text-[10px] text-zinc-500">
          <span className="h-px flex-1 bg-zinc-700" />
          <span>or continue with email</span>
          <span className="h-px flex-1 bg-zinc-700" />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs uppercase tracking-wide text-zinc-400">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" disabled={loading || socialBusy} className="bg-zinc-800/60 border-zinc-700 focus:border-violet-500 text-zinc-100 placeholder:text-zinc-500 caret-violet-400 focus:bg-zinc-800/70" />
        </div>
      </div>
      <p className="text-[10px] text-zinc-500">We will send you a one-time link to finish setup.</p>
      <Button disabled={loading || socialBusy} type="submit" className="w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500 font-medium text-white shadow-sm hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:opacity-60 cursor-pointer">
        {loading ? "Sending..." : "Email me a sign-in link"}
      </Button>
      <p className="text-xs text-zinc-500 text-center">Have an account? <a href="/auth/login" className="text-violet-400 hover:underline">Sign in</a></p>
      <style jsx>{`
        form input:-webkit-autofill,
        form input:-webkit-autofill:hover,
        form input:-webkit-autofill:focus {
          -webkit-text-fill-color: #f5f5f5;
          box-shadow: 0 0 0px 1000px #27272a inset;
          caret-color: #7c3aed;
        }
        form input:-moz-autofill {
          box-shadow: 0 0 0px 1000px #27272a inset;
          color: #f5f5f5 !important;
          caret-color: #7c3aed;
        }
      `}</style>
    </form>
  );
}