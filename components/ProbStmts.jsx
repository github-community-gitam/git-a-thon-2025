
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Countdown from "@/components/Countdown";
import { getProblemStatements } from "@/app/actions/team";
import { motion } from "framer-motion";

export default function ProbStmts() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getProblemStatements();
      if (res.success) {
        setProblems(res.data);
        setConfig(res.config);
      } else {
        setError(res.error || "Failed to load");
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (error) return <div className="text-center py-20 text-gray-500">{error}</div>;

  const isLive = config?.isLive;

  return (
    <div>
      <Navbar />
      <div className="py-25 px-4 min-h-screen">
        <h1 className="text-center text-white text-4xl font-bold mb-4 mt-20">
          Problem Statements
        </h1>

        {!isLive ? (
          <div className="flex flex-col items-center justify-center space-y-8 mt-12">
            <p className="text-center text-xl text-gray-300">
              Challenges will be revealed in:
            </p>
            <Countdown targetDate={config?.probStmtsLiveTime} />
          </div>
        ) : (
          <>
            <h2 className="text-center text-lg mb-12 text-gray-300">
              Choose a challenge that pushes your Creativity, Technical skills and UX Thinking
            </h2>

            {problems.length === 0 ? (
              <p className="text-center text-gray-500">No problem statements found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {problems.map((card) => (
                  <div
                    key={card.id}
                    className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center h-full flex flex-col justify-between min-h-[200px]"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                      {card.title}
                    </h3>

                    <p className="text-gray-400 text-md mb-6 leading-relaxed max-h-24 overflow-hidden">
                      {card.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${card.isFull ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                        {card.isFull ? "FULL" : "AVAILABLE"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {card._count?.teams || 0} / {card.maxCount || 5} Teams
                      </span>
                    </div>


                    <button
                      className="w-full py-2.5 px-4 bg-transparent border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                      onClick={() => setSelectedCard(card)}
                    >
                      View Details
                    </button>
                  </div>
                ))}

                {selectedCard && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                      onClick={() => setSelectedCard(null)}
                    />

                    <div
                      className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 
                bg-[#0f172a] text-white rounded-xl shadow-2xl border border-slate-700 p-8 max-h-[75vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold">{selectedCard.title}</h2>

                        <button
                          onClick={() => setSelectedCard(null)}
                          className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-6 text-[15px] leading-relaxed">
                        {/* Description is the main content for now as DB schema is simple */}
                        <div>
                          <h3 className="text-lg font-medium mb-1 text-slate-300">
                            Problem Context
                          </h3>
                          <p className="text-slate-400">{selectedCard.description}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
