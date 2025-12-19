"use client";

import React from "react";
import Countdown from "./Countdown";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]"></div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/90">
              EPOCH 4.0 Presents
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1
              className={`${spaceGrotesk.className} font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none`}
            >
              <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent drop-shadow-2xl">
                GIT-A-THON
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`${spaceGrotesk.className} text-lg sm:text-xl md:text-2xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed`}
            >
              Code through the night. Build for impact.
            </p>
          </div>

          {/* Countdown */}
          <div className="w-full max-w-5xl ">
            <Countdown targetDate="2025-12-20T09:00:00" />
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href={session ? "/dashboard" : "/login"}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-xl font-semibold text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <span>{session ? "Access Dashboard" : "Login"}</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
