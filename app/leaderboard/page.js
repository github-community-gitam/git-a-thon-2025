import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";

export const dynamic = 'force-dynamic';

async function getLeaderboard() {
    // Determine current round to show? Or average?
    // Let's show total score or sort by current round? 
    // Standard hackathon: sort by average of all judges for active round.
    // For MVP: Sum of all scores?
    // Let's fetch teams and scores.

    // Logic: Calculate average score per team.
    const teams = await prisma.team.findMany({
        include: {
            scores: true,
            problemStatement: true
        }
    });

    const leaderboard = teams.map(team => {
        const totalRound1 = team.scores.reduce((acc, s) => acc + (s.round1 || 0), 0);
        const countRound1 = team.scores.filter(s => s.round1 !== null).length;
        const avg1 = countRound1 ? totalRound1 / countRound1 : 0;

        const totalRound2 = team.scores.reduce((acc, s) => acc + (s.round2 || 0), 0);
        const countRound2 = team.scores.filter(s => s.round2 !== null).length;
        const avg2 = countRound2 ? totalRound2 / countRound2 : 0;

        // Current round? Let's just sum averages or pick max? 
        // Let's use total average.

        return {
            ...team,
            score: avg1 + avg2 // Simple metric for now
        };
    }).sort((a, b) => b.score - a.score);

    return leaderboard;
}

export default async function LeaderboardPage() {
    const config = await prisma.systemConfig.findFirst();

    if (!config?.showLeaderboard) {
        return (
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[80vh]">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent mb-4">
                        Revealing Soon
                    </h1>
                    <p className="text-gray-500 text-lg">The leaderboard is currently hidden.</p>
                </div>
            </div>
        );
    }

    const leaderboard = await getLeaderboard();

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="max-w-6xl mx-auto py-24 px-4">
                <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
                    Leaderboard
                </h1>

                <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-800 text-gray-400 text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 text-center w-16">Rank</th>
                                    <th className="p-4">Team</th>
                                    <th className="p-4">Problem Statement</th>
                                    <th className="p-4 text-right">Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {leaderboard.map((team, index) => (
                                    <tr key={team.id} className="hover:bg-white/5 transition">
                                        <td className="p-4 text-center font-bold text-gray-500">
                                            {index + 1}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-lg">{team.name || `Team ${team.serialIndex}`}</div>
                                            <div className="text-xs text-gray-500 font-mono">#{team.serialIndex}</div>
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">
                                            {team.problemStatement?.title || "N/A"}
                                        </td>
                                        <td className="p-4 text-right font-mono text-yellow-400 font-bold text-xl">
                                            {team.score.toFixed(1)}
                                        </td>
                                    </tr>
                                ))}
                                {leaderboard.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No scores available yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
