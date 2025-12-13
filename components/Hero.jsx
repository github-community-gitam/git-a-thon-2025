"use client";

import React from "react";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="bg-[#0f1214] text-white min-h-screen flex flex-col items-center text-center px-4 pt-20 pb-16 overflow-visible">

      {/* Title */}
      <h1 className="font-bold mb-4 text-[clamp(2.5rem,8vw,5rem)] leading-[1.1]">
        GIT-A-THON
      </h1>

      <h2 className="font-medium mb-4 text-[clamp(1.5rem,5vw,2.5rem)] leading-snug">
        24-Hour Hackathon
      </h2>

      <p className="text-gray-300 mb-8 text-[clamp(1rem,3vw,1.25rem)] max-w-2xl">
        Code through the night. Build for impact.
      </p>

      {/* Description */}
      <p className="text-gray-400 max-w-3xl mb-8 text-[clamp(0.875rem,2vw,1.125rem)] leading-relaxed">
        EPOCH 4.0 Hackathon is a 24-hour, on-site coding marathon where teams
        solve real-world problem statements with a strong focus on user
        experience, creativity, functionality, and completeness.
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          ⏱ 24-Hour Hackathon
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          👥 50 Teams • 200-300 Participants
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          📍 GITAM University
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-full flex items-center gap-2">
          ⭐ GitHub • ACM • IEEE • AWS SIG
        </div>
      </div>

      {/* Countdown */}
      <div className="mb-12">
        <Countdown targetDate="2025-01-15T00:00:00" />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-md font-semibold">
          Register Your Team
        </button>
        <button className="border border-green-500 hover:bg-green-500 hover:text-white px-6 py-3 rounded-md font-semibold">
          View Problem Statements
        </button>
      </div>
    </section>
  );
}
