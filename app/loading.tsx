'use client'

import { motion } from 'motion/react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center relative overflow-hidden">
      {/* Static background gradient - no animation for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center">
          {/* Simplified skeleton cards */}
          <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-20 md:h-24 rounded-xl bg-neutral-500/30 border border-purple-500/20 relative overflow-hidden"
              >
                {/* Static skeleton lines */}
                <div className="absolute inset-0 p-1 flex flex-col justify-center gap-2">
                  <motion.div
                    className="h-2 bg-linear-to-r from-purple-500 to-transparent rounded"
                    animate={{ opacity: [0.2, 0.9, 0.1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className="h-2 bg-linear-to-r from-pink-500 to-transparent rounded"
                    animate={{ opacity: [0.2, 0.9, 0.1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3 + 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Loading text - simple fade */}
          <div className="text-center mb-6">
            <motion.p
              className="text-white text-xl md:text-white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Preparing your Experience...
            </motion.p>
          </div>

          {/* Simplified animated dots */}
          <div className="flex gap-2 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-purple-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Lightweight progress bar */}
          <div className="w-full max-w-md h-1 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-purple-500 to-pink-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
