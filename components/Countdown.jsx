"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    Days: "00",
    Hours: "00",
    Minutes: "00",
    Seconds: "00",
  });

  useEffect(() => {
    // Set countdown to 1 hour from now ON THE CLIENT
    const target = Date.now() + 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({
          Days: "00",
          Hours: "00",
          Minutes: "00",
          Seconds: "00",
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        Days: days.toString().padStart(2, "0"),
        Hours: hours.toString().padStart(2, "0"),
        Minutes: minutes.toString().padStart(2, "0"),
        Seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 text-center">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">Hackathon starts in</h3>

      <div className="flex justify-center gap-4">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div
            key={label}
            className="bg-gray-800 w-20 h-20 md:w-24 md:h-24 rounded-lg flex flex-col items-center justify-center"
          >
            <span className="text-2xl md:text-3xl font-bold text-blue-500">
              {value}
            </span>
            <p className="text-sm md:text-base">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
