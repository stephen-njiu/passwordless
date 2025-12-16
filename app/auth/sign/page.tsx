import CV99XAuthForm from "@/components/auth/CV99XAuthForm";
import Image from "next/image";
import { getAvailableProviders } from "@/lib/available-providers";

export default async function SignPage() {
  const availableProviders = getAvailableProviders();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-900">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-neutral-900 to-blue-900/20" />
      
      {/* Floating Orbs */}
      <div className="absolute left-1/4 top-1/4 size-96 animate-pulse rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 size-96 animate-pulse rounded-full bg-pink-600/10 blur-3xl animation-delay-2000" />
      <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/10 blur-3xl animation-delay-4000" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        
        {/* Logo/Brand Section */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 p-0.5 shadow-lg shadow-purple-500/50">
            <Image 
              src="/logo.png" 
              alt="CV99X Logo" 
              width={58} 
              height={58}
              className="size-full object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-black text-transparent">
              CV99X
            </h1>
            <p className="text-xs text-gray-500">AI-Powered Resume Platform</p>
          </div>
        </div>

        {/* Auth Form */}
        <CV99XAuthForm availableProviders={availableProviders} />

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-600">
            © 2025 CV99X. Crafting your perfect resume with AI.
          </p>
        </div>
      </div>

      {/* Animated Particles (optional decorative effect) */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute size-1 animate-pulse rounded-full bg-purple-500/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
