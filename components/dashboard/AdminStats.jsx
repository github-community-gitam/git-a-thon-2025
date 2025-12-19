"use client";

import { useEffect, useState } from "react";
import { getProblemDistribution } from "@/app/actions/team";

export default function AdminStats() {
    const [stats, setStats] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        getProblemDistribution().then(res => {
            if (res.success) setStats(res.data);
        });
    }, []);

    return (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Problem Statement Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map(s => {
                    const isExpanded = expandedId === s.id;
                    return (
                        <div
                            key={s.id}
                            className={`bg-black/40 p-4 rounded border border-white/5 cursor-pointer transition hover:border-white/20 ${isExpanded ? "row-span-2" : ""}`}
                            onClick={() => setExpandedId(isExpanded ? null : s.id)}
                        >
                            <h4 className={`font-semibold text-white ${isExpanded ? "" : "truncate"}`} title={s.title}>{s.title}</h4>
                            <div className="flex justify-between items-end mt-2">
                                <span className="text-3xl font-bold text-blue-400">{s._count.teams}</span>
                                <span className="text-xs text-gray-500">Teams</span>
                            </div>
                            {s.teams.length > 0 && (
                                <div className={`mt-2 text-xs text-gray-400 ${isExpanded ? "" : "truncate"}`}>
                                    {isExpanded ? (
                                        <ul className="mt-2 space-y-2">
                                            {s.teams.map(t => {
                                                const leader = t.members.find(m => m.id === t.leaderId);
                                                return (
                                                    <li key={t.id} className="bg-white/5 p-2 rounded">
                                                        <div className="font-medium text-white">
                                                            {t.name || `Team ${t.serialIndex}`}
                                                        </div>
                                                        <div className="flex justify-between mt-1 text-gray-500">
                                                            <span>Lead: {leader?.name || "N/A"}</span>
                                                            {t.roomNumber && <span className="text-blue-400 bg-blue-500/10 px-1 rounded">Room {t.roomNumber}</span>}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        s.teams.map(t => t.name || `Team ${t.serialIndex}`).join(", ")
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {stats.length === 0 && <p className="text-gray-500">No stats available.</p>}
        </div>
    );
}
