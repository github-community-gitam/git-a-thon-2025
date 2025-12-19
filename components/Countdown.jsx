"use client";

import { useEffect, useState } from "react";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    if (!targetDate) return {};
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) return {};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (Object.keys(timeLeft).length === 0) {
    return null; // Timer expired
  }

  return (
    <div className="flex gap-4 p-8 bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-4xl mx-auto justify-center items-center">
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-bold font-mono text-white">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">{timeLeft.days === 1 ? 'Day' : 'Days'}</span>
      </div>
      <span className="text-4xl text-gray-700">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-bold font-mono text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Hours</span>
      </div>
      <span className="text-4xl text-gray-700">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-bold font-mono text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">Mins</span>
      </div>
      <span className="text-4xl text-gray-700">:</span>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-6xl font-bold font-mono text-blue-500">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-xs text-blue-500/50 uppercase tracking-widest mt-2">Secs</span>
      </div>
    </div>
  );
}
