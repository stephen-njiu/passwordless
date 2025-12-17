import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-neutral-900 to-blue-900/20" />
      
      {/* Floating Orbs */}
      <div className="absolute left-1/4 top-1/4 size-96 animate-pulse rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 size-96 animate-pulse rounded-full bg-pink-600/10 blur-3xl animation-delay-2000" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="CV99X Logo"
            width={150}
            height={150}
            priority
            className="drop-shadow-2xl"
          />
        </div>

        {/* Heading */}
        <h1 className="mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-center text-5xl font-black text-transparent md:text-6xl">
          Welcome to CV99X
        </h1>
        
        <p className="mb-12 max-w-md text-center text-lg text-gray-400">
          Your Homepage
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/auth/sign"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60"
          >
            Get Started
          </Link>
          
          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-xl border-2 border-purple-500/50 bg-neutral-900/50 px-8 py-4 font-semibold text-gray-100 backdrop-blur-xl transition-all hover:border-purple-500 hover:bg-neutral-900/80"
          >
            Profile
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-16 text-center text-xs text-gray-600">
          Passwordless Authentication Template
        </p>
      </div>
    </div>
  );
}