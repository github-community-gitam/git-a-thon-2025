"use client";

import { useEffect, useState } from "react";
import { getAllTeamScores } from "@/app/actions/team";

export default function AdminScoreboard() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllTeamScores().then(res => {
            if (res.success) setTeams(res.data);
            setLoading(false);
        });
    }, []);

    // Calculate robust average
    const calculateStats = (scores) => {
        if (!scores || scores.length === 0) return { avg: "N/A", text: "No Data" };

        let total = 0;
        let count = 0;
        scores.forEach(s => {
            // Check current round or average of all? Usually sums.
            // Let's sum round1 + round2 (if exists) for each judge, then avg across judges.
            // Or avg round1 across judges?
            // Simple: Sum of (Round1 + Round2) for all entries / number of entries?
            // Better: Average Score provided by judges
            // Assuming score.round1 is out of 100.
            const r1 = s.round1 || 0;
            const r2 = s.round2 || 0;
            total += (r1 + r2);
            if (r1 || r2) count++;
        });

        if (count === 0) return { avg: "0", text: "No Data" };

        // This is a naive average. 
        // User asked for "average score".
        const avg = (total / scores.length).toFixed(1); // Avg total points per judge
        return { avg, text: `${scores.length} Judges` };
    };

    if (loading) return <div className="text-white">Loading scores...</div>;

    return (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden mt-8">
            <div className="p-4 border-b border-white/10 bg-black/40">
                <h3 className="text-xl font-bold text-white">Full Scoreboard</h3>
            </div>
            <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-black/50 text-gray-200 sticky top-0 z-10">
                        <tr>
                            <th className="p-3">Team</th>
                            <th className="p-3">Problem Statement</th>
                            <th className="p-3">Room</th>
                            <th className="p-3">Judges & Scores</th>
                            <th className="p-3 text-right">Avg Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {teams.map(team => {
                            const { avg } = calculateStats(team.scores);
                            return (
                                <tr key={team.id} className="hover:bg-white/5 transition">
                                    <td className="p-3">
                                        <div className="font-semibold text-white">{team.name || `Team ${team.serialIndex}`}</div>
                                        <div className="text-xs text-blue-400">#{team.serialIndex}</div>
                                        <div className="mt-1 text-xs text-gray-500">
                                            {team.members.map(m => m.name).join(", ")}
                                        </div>
                                    </td>
                                    <td className="p-3 max-w-xs">
                                        <div className="truncate" title={team.problemStatement?.title}>
                                            {team.problemStatement?.title || <span className="text-yellow-500">Not Selected</span>}
                                        </div>
                                    </td>
                                    <td className="p-3 font-mono">
                                        {team.roomNumber || "-"}
                                    </td>
                                    <td className="p-3">
                                        {team.scores.length === 0 ? (
                                            <span className="text-gray-600 italic">No scores yet</span>
                                        ) : (
                                            <div className="space-y-1">
                                                {team.scores.map(s => (
                                                    <div key={s.id} className="flex gap-2 text-xs">
                                                        <span className="text-gray-300 font-medium w-24 truncate">{s.judge.name}:</span>
                                                        <span className="text-green-400">R1: {s.round1 || 0}</span>
                                                        {s.round2 > 0 && <span className="text-purple-400">R2: {s.round2}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="text-xl font-bold text-white">{avg}</div>
                                        <div className="text-xs text-gray-500">{team.scores.length} entries</div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
