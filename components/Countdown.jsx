"use client";

import { useState, useEffect } from "react";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    Days: "00",
    Hours: "00",
    Minutes: "00",
    Seconds: "00",
  });

  useEffect(() => {
    // Use the targetDate prop or default to December 20, 2025 at 9:00 AM
    const target = new Date(targetDate || "2025-12-20T09:00:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          Days: "00",
          Hours: "00",
          Minutes: "00",
          Seconds: "00",
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        Days: days.toString().padStart(2, "0"),
        Hours: hours.toString().padStart(2, "0"),
        Minutes: minutes.toString().padStart(2, "0"),
        Seconds: seconds.toString().padStart(2, "0"),
      });
    };

    // Initial update
    updateCountdown();

    // Update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-white/50 uppercase tracking-wider">Event Begins In</p>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="group relative"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 hover:border-white/20 transition-all duration-300 shadow-xl">
              {/* Value */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {value}
              </div>
              
              {/* Label */}
              <div className="mt-2 text-xs sm:text-sm md:text-base font-medium text-white/60 uppercase tracking-wider">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
