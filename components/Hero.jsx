"use client";

import React from "react";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#0f1214] text-white flex flex-col items-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Title */}
      <h1 className="mt-8 font-mono font-bold text-9xl leading-[1.1]">
        GIT-A-THON
      </h1>

      {/* Tagline */}
      <p className="mt-8 text-2xl font-mono text-gray-300 max-w-2xl">
        Code through the night. Build for impact.
      </p>

      {/* Info Tags */}
      <div className="mt-10 mb-10 flex flex-wrap justify-center gap-x-10   gap-y-6">
        {/* Duration */}
        <div className="flex items-center gap-2 rounded-full bg-gray-800 px-5 py-2">
          <img
            src="/icons/Access%20time.svg"
            alt="Duration"
            className="h-5 w-5"
          />
          <span className="text-sm sm:text-base">24-Hour Hackathon</span>
        </div>

        {/* Teams */}
        <div className="flex items-center gap-2 rounded-full bg-gray-800 px-5 py-2">
          <img src="/icons/People.svg" alt="Participants" className="h-5 w-5" />
          <span className="text-sm sm:text-base">
            50 Teams • 200–300 Participants
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 rounded-full bg-gray-800 px-5 py-2">
          <img
            src="/icons/Location%20on.svg"
            alt="Location"
            className="h-5 w-5"
          />
          <span className="text-sm sm:text-base">GITAM University</span>
        </div>

        {/* Communities */}
        <div className="flex items-center gap-2 rounded-full bg-gray-800 px-5 py-2">
          <img src="/icons/Group.svg" alt="Communities" className="h-5 w-5" />
          <span className="text-sm sm:text-base">
            GitHub • ACM • IEEE • AWS SIG
          </span>
        </div>
      </div>

      {/* Countdown */}
      <div className="mb-08">
        <Countdown targetDate="2025-12-20T09:00:00+05:30" />
      </div>
      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            document
              .getElementById("register")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-md bg-green-500 px-8 py-3 font-semibold transition hover:bg-green-600 cursor-target cursor-pointer"
        >
          Register Your Team
        </button>
      </div>
    </section>
  );
}
