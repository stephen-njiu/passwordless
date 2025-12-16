"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully!");
            router.push("/auth/sign");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign out");
          },
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600/20 px-6 py-3 font-semibold text-red-400 shadow-lg shadow-red-500/20 transition-all hover:bg-red-600/30 hover:shadow-xl hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LogOut className="size-4" />
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
