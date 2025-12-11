"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="bg-[#0f1214] text-white min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4">GIT-A-THON</h1>
      <h2 className="text-2xl md:text-3xl font-medium mb-4">24-Hour Hackathon</h2>
      <p className="text-gray-300 text-lg md:text-xl mb-8">
        Code through the night. Build for impact.
      </p>

      {/* Description */}
      <p className="text-gray-400 max-w-3xl mb-8">
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
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Hackathon starts in</h3>
        <div className="flex justify-center gap-4 text-center">
          {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
            <div
              key={label}
              className="bg-gray-800 w-20 h-20 md:w-24 md:h-24 rounded-lg flex flex-col items-center justify-center"
            >
              <span className="text-2xl md:text-3xl font-bold text-blue-500">00</span>
              <p className="text-sm md:text-base">{label}</p>
            </div>
          ))}
        </div>
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
