import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User, Mail, Calendar, Check, X, Shield } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign");
  }

  const user = session.user;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-neutral-900 to-blue-900/20" />
      
      {/* Floating Orbs */}
      <div className="absolute left-1/4 top-1/4 size-96 animate-pulse rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 size-96 animate-pulse rounded-full bg-pink-600/10 blur-3xl animation-delay-2000" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-black text-transparent">
            Your Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">Welcome to CV99X</p>
        </div>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-linear-to-b from-neutral-900/95 to-neutral-900/98 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 blur-xl" />

          {/* User Avatar Section */}
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {user.image ? (
              <div className="relative size-24 overflow-hidden rounded-full border-2 border-purple-500/50 shadow-lg shadow-purple-500/50">
                <Image
                  src={user.image}
                  alt={user.name || "User avatar"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex size-24 items-center justify-center rounded-full border-2 border-purple-500/50 bg-linear-to-br from-purple-600 via-pink-600 to-blue-600 shadow-lg shadow-purple-500/50">
                <User className="size-12 text-white" />
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-100">
                {user.name || "Anonymous User"}
              </h2>
              <p className="mt-1 text-sm text-gray-400">{user.email}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {user.emailVerified ? (
                  <span className="flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    <Check className="size-3" />
                    Email Verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                    <X className="size-3" />
                    Email Not Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            
            {/* User ID */}
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                <Shield className="size-4" />
                User ID
              </div>
              <p className="break-all font-mono text-sm text-gray-300">{user.id}</p>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                <Mail className="size-4" />
                Email Address
              </div>
              <p className="break-all text-sm text-gray-300">{user.email}</p>
            </div>

            {/* Created At */}
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                <Calendar className="size-4" />
                Account Created
              </div>
              <p className="text-sm text-gray-300">
                {user.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Updated At */}
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                <Calendar className="size-4" />
                Last Updated
              </div>
              <p className="text-sm text-gray-300">
                {user.updatedAt 
                  ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

          </div>

          {/* Session Info */}
          <div className="mt-6 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
            <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">
              Session Information
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <span className="text-gray-500">Session ID:</span>{" "}
                <span className="font-mono text-gray-300">{session.session.id}</span>
              </p>
              <p>
                <span className="text-gray-500">Expires At:</span>{" "}
                <span className="text-gray-300">
                  {new Date(session.session.expiresAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
              {session.session.ipAddress && (
                <p>
                  <span className="text-gray-500">IP Address:</span>{" "}
                  <span className="font-mono text-gray-300">{session.session.ipAddress}</span>
                </p>
              )}
              {session.session.userAgent && (
                <p>
                  <span className="text-gray-500">User Agent:</span>{" "}
                  <span className="text-gray-300">{session.session.userAgent}</span>
                </p>
              )}
            </div>
          </div>

          {/* Raw Data (Dev Only) */}
          <details className="mt-6">
            <summary className="cursor-pointer text-xs uppercase tracking-wider text-gray-500 hover:text-gray-400">
              Raw User Data (Debug)
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-black/50 p-4 text-xs text-gray-400">
              {JSON.stringify({ user, session: session.session }, null, 2)}
            </pre>
          </details>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LogoutButton />
          <a
            href="/"
            className="inline-block rounded-xl bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60"
          >
            Go to Home
          </a>
        </div>

      </div>
    </div>
  );
}