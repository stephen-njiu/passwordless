"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { Provider } from "@/lib/available-providers";

export function SocialSignIn({
  providers,
  callbackURL = "/profile",
  className,
  disabled,
  onBusyChange,
}: {
  providers: Provider[];
  callbackURL?: string;
  className?: string;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
}) {
  const [busy, setBusy] = React.useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    if (busy || disabled) return;
    setBusy(provider);
    onBusyChange?.(true);
    
    const providerNames: Record<Provider, string> = {
      github: "GitHub",
      google: "Google",
      twitter: "Twitter",
      apple: "Apple",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      discord: "Discord",
      gitlab: "GitLab",
      tiktok: "TikTok",
      microsoft: "Microsoft",
      spotify: "Spotify",
      dropbox: "Dropbox",
      twitch: "Twitch",
    };
    
    const label = `Connecting to ${providerNames[provider] || provider}...`;
    
    const tid = toast(label, {
      icon: <Loader2 className="size-4 animate-spin text-fuchsia-400" />,
      duration: Infinity,
    });

    try {
      await authClient.signIn.social(
        { provider, callbackURL },
        {
          onError: (ctx) => {
            const fallback = "We couldn't reach the provider. Try again.";
            const message = typeof ctx.error === "string"
              ? ctx.error
              : ctx.error?.message || fallback;
            toast.error(message, { id: tid ?? undefined });
            setBusy(null);
            onBusyChange?.(false);
          },
        }
      );
    } catch (e: any) {
      const fallback = "Sign in failed. Please try again.";
      const message = typeof e === "string" ? e : e?.message || fallback;
      toast.error(message, { id: tid ?? undefined });
    } finally {
      setBusy(null);
      onBusyChange?.(false);
    }
  };

  // Define color schemes for each provider
  const providerColors: Record<Provider, { border: string; shadow: string }> = {
    github: { border: "hover:border-purple-500/50", shadow: "hover:shadow-purple-500/20" },
    google: { border: "hover:border-pink-500/50", shadow: "hover:shadow-pink-500/20" },
    linkedin: { border: "hover:border-blue-500/50", shadow: "hover:shadow-blue-500/20" },
    twitter: { border: "hover:border-cyan-500/50", shadow: "hover:shadow-cyan-500/20" },
    facebook: { border: "hover:border-blue-600/50", shadow: "hover:shadow-blue-600/20" },
    discord: { border: "hover:border-indigo-500/50", shadow: "hover:shadow-indigo-500/20" },
    apple: { border: "hover:border-gray-500/50", shadow: "hover:shadow-gray-500/20" },
    gitlab: { border: "hover:border-orange-500/50", shadow: "hover:shadow-orange-500/20" },
    tiktok: { border: "hover:border-pink-500/50", shadow: "hover:shadow-pink-500/20" },
    microsoft: { border: "hover:border-blue-500/50", shadow: "hover:shadow-blue-500/20" },
    spotify: { border: "hover:border-green-500/50", shadow: "hover:shadow-green-500/20" },
    dropbox: { border: "hover:border-blue-400/50", shadow: "hover:shadow-blue-400/20" },
    twitch: { border: "hover:border-purple-600/50", shadow: "hover:shadow-purple-600/20" },
  };

  // SVG components mapping
  const providerIcons: Record<Provider, React.ComponentType<{ className?: string }>> = {
    github: SvgGitHub,
    google: SvgGoogle,
    linkedin: SvgLinkedIn,
    twitter: SvgTwitter,
    facebook: SvgFacebook,
    discord: SvgDiscord,
    apple: SvgApple,
    gitlab: SvgGitLab,
    tiktok: SvgTikTok,
    microsoft: SvgMicrosoft,
    spotify: SvgSpotify,
    dropbox: SvgDropbox,
    twitch: SvgTwitch,
  };

  const gridCols = providers.length <= 2 ? "grid-cols-2" : providers.length === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <div className={cn("grid gap-3", gridCols, className)}>
      {providers.map((provider) => {
        const Icon = providerIcons[provider];
        const colors = providerColors[provider];
        
        return (
          <Button
            key={provider}
            type="button"
            onClick={() => handle(provider)}
            disabled={disabled || !!busy}
            className={cn(
              "group relative justify-center border cursor-pointer transition-all duration-300",
              "bg-zinc-900/90 hover:bg-zinc-900 text-zinc-100 border-zinc-800/50",
              colors.border,
              "hover:shadow-lg",
              colors.shadow,
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            title={`Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
          >
            {busy === provider ? (
              <Loader2 className="size-5 animate-spin" aria-hidden />
            ) : (
              Icon && <Icon className="size-5 transition-transform group-hover:scale-110" />
            )}
          </Button>
        );
      })}
    </div>
  );
}

// SVG Icons
function SvgGitHub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.55v-2.1c-3.22.7-3.9-1.55-3.9-1.55-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.74 1.27 3.41.97.11-.76.41-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.13 0 0 .98-.31 3.2 1.18a11 11 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.64 1.63.24 2.83.12 3.13.75.81 1.2 1.84 1.2 3.1 0 4.43-2.71 5.4-5.3 5.68.43.37.81 1.1.81 2.22v3.29c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function SvgGoogle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.65 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.156 7.964 3.036l5.657-5.657C34.759 6.01 29.609 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.046 0 20-8.955 20-20 0-1.341-.138-2.651-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.586 16.061 18.946 12 24 12c3.059 0 5.842 1.156 7.964 3.036l5.657-5.657C34.759 6.01 29.609 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.357 0 10.243-2.042 13.941-5.377l-6.445-5.482C29.371 34.999 26.864 36 24 36c-5.192 0-9.607-3.317-11.269-7.946l-6.54 5.04C9.518 39.771 16.235 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.414 3.989-5.221 8-11.303 8-5.192 0-9.607-3.317-11.269-7.946l-6.54 5.04C9.518 39.771 16.235 44 24 44 35.046 44 44 35.046 44 24c0-1.341-.138-2.651-.389-3.917z"/>
    </svg>
  );
}

function SvgLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function SvgTwitter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.36 8.56 8.56 0 0 1-2.72 1.04 4.27 4.27 0 0 0-7.28 3.9A12.13 12.13 0 0 1 3.15 4.9a4.26 4.26 0 0 0 1.32 5.7 4.23 4.23 0 0 1-1.93-.53v.05a4.27 4.27 0 0 0 3.43 4.18 4.28 4.28 0 0 1-1.92.07 4.27 4.27 0 0 0 3.99 2.97A8.56 8.56 0 0 1 2 19.55a12.08 12.08 0 0 0 6.56 1.92c7.87 0 12.18-6.52 12.18-12.17 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 6.59a8.52 8.52 0 0 1-2.54.7Z" />
    </svg>
  );
}

function SvgFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect width="24" height="24" rx="4" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.5 7.5h1.75V5.25H13.5c-1.66 0-3 1.34-3 3V10H9v2.25h1.5V18h2.25v-5.75h2l.25-2.25h-2.25V8.25c0-.41.34-.75.75-.75Z"
      />
    </svg>
  );
}

function SvgDiscord({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect width="24" height="24" rx="4" fill="#5865F2" />
      <path
        fill="#fff"
        d="M16.7 8.4a8 8 0 0 0-2.1-.7l-.2.4a7 7 0 0 1-4.8 0l-.2-.4a8 8 0 0 0-2.1.7c-1.2 2.1-1.5 4.1-1.3 6.1 1.1.8 2.3 1.3 3.6 1.6l.5-.8c-.9-.3-1.7-.7-2.4-1.2.6.4 1.5.8 2.6 1 .9.2 1.9.2 2.8 0 1.1-.2 2-.6 2.6-1-.7.5-1.5.9-2.4 1.2l.5.8c1.3-.3 2.5-.8 3.6-1.6.2-2-.1-4-1.3-6.1ZM9.5 12.7c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1Zm5 0c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1Z"
      />
    </svg>
  );
}

function SvgApple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.42 2.22-1.19 3.05-.76.83-2.03 1.44-3.09 1.36-.14-1.1.43-2.27 1.16-3.04.8-.86 2.13-1.47 3.12-1.37zM21.5 17.12c-.6 1.38-.89 1.98-1.66 3.18-1.08 1.66-2.6 3.73-4.49 3.75-1.05.02-1.76-.71-3.05-.71-1.29 0-2.06.69-3.07.73-1.9.07-3.36-1.8-4.45-3.45C3.05 18.46 2 15.4 2 12.56 2 9.09 4.25 7.08 6.75 7.05c1.13-.02 2.18.78 2.97.78.78 0 2.07-.96 3.5-.83.59.02 2.26.24 3.34 1.8-.09.06-1.99 1.16-1.97 3.46.02 2.76 2.41 3.67 2.44 3.68-.03.07-.28.98-.53 1.18z" />
    </svg>
  );
}

function SvgGitLab({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#FC6D26" d="M22 12.3l-2.1-6.4c-.1-.3-.5-.3-.7 0l-1.6 4.9H6.4L4.9 5.9c-.1-.3-.5-.3-.7 0L2 12.3c-.1.3 0 .7.3.9l9.4 6.8c.2.1.4.1.6 0l9.4-6.8c.3-.2.4-.6.3-.9z"/>
    </svg>
  );
}

function SvgTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect width="24" height="24" rx="5" fill="#000" />
      <path fill="#25F4EE" d="M14.5 7.2c.8.8 1.9 1.3 3 1.4v2.2c-1.3 0-2.6-.4-3.7-1.1v4.8c0 2.7-2.2 4.9-4.9 4.9S4 17.2 4 14.5s2.2-4.9 4.9-4.9c.4 0 .8 0 1.1.1v2.4c-.4-.2-.7-.2-1.1-.2-1.4 0-2.5 1.1-2.5 2.5S7.5 17 8.9 17s2.5-1.1 2.5-2.5V4.5h3.1v2.7z"/>
      <path fill="#FE2C55" d="M14.5 7.2V4.5h-1.8v8.1c0 2.7-2.2 4.9-4.9 4.9-.9 0-1.8-.3-2.6-.7.9 1.4 2.5 2.3 4.3 2.3 2.7 0 4.9-2.2 4.9-4.9V7.2z" opacity=".9"/>
    </svg>
  );
}

function SvgMicrosoft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function SvgSpotify({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10" fill="#1DB954" />
      <path fill="#fff" d="M16.9 15.6c-.2.3-.6.3-.9.2-2.4-1.4-5.4-1.8-8.9-1.1-.3.1-.7-.2-.7-.6 0-.3.2-.6.5-.6 3.8-.8 7.2-.3 9.9 1.2.3.1.4.5.1.9Zm1-2.4c-.2.3-.6.4-.9.2-2.8-1.6-7.1-2.2-10.5-1.3-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.8-1 8.5-.3 11.6 1.5.3.2.4.5.2.8ZM18 10.6c-3.2-1.9-8.4-2.1-11.4-1.3-.4.1-.8-.1-.9-.5s.1-.8.5-.9c3.5-.9 9.2-.6 12.8 1.6.4.2.5.7.3 1-.2.3-.6.4-1 .1Z" />
    </svg>
  );
}

function SvgDropbox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#0061FF" d="M7.2 3 2 6.3l5.2 3.2 5.2-3.2L7.2 3Zm0 11.3L2 17.6l5.2 3.2 5.2-3.2-5.2-3.3ZM22 6.3 16.8 3 11.6 6.3l5.2 3.2L22 6.3Zm-5.2 8.3-5.2 3.2 5.2 3.2L22 17.8l-5.2-3.2Z" />
    </svg>
  );
}

function SvgTwitch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#9146FF" d="M3 2h18v12l-4.5 4.5H12l-3 3H6v-3H3V2Zm3 2v12h3v3l3-3h4.5l3-3V4H6Z" />
      <path fill="#fff" d="M14 7h2v5h-2V7Zm-5 0h2v5H9V7Z" />
    </svg>
  );
}

export default SocialSignIn;