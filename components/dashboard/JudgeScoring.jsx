"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTeamsForJudging, submitScore } from "@/app/actions/judge";
import { getSystemConfig } from "@/app/actions/config";

export default function JudgeScoring() {
    const { data: session } = useSession();
    const [teams, setTeams] = useState([]);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [round, setRound] = useState(1);

    useEffect(() => {
        async function load() {
            try {
                const [tRes, cRes] = await Promise.all([
                    getTeamsForJudging(),
                    getSystemConfig()
                ]);

                if (tRes.success) setTeams(tRes.data);
                if (cRes.success) {
                    setConfig(cRes.config);
                    setRound(cRes.config.currentRound || 1);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleScore = async (teamId, score) => {
        if (score === "" || score === undefined) return;
        await submitScore(teamId, round, parseInt(score));
        // Refresh to show persisted
        const res = await getTeamsForJudging();
        if (res.success) setTeams(res.data);
    };

    const getMyScore = (team) => {
        if (!session?.user?.id || !team.scores) return undefined;
        const scoreRec = team.scores.find(s => s.judgeId === session.user.id);
        const val = scoreRec ? (round === 1 ? scoreRec.round1 : scoreRec.round2) : undefined;
        return val; // Return undefined if not set, or number
    };

    if (loading) return <div className="text-white text-center py-20">Loading...</div>;

    return (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Judging Portal <span className="text-sm font-normal text-gray-500">(Round {round})</span></h2>
            </div>

            <div className="space-y-4">
                {teams.map(team => (
                    <div key={team.id} className="bg-black/40 p-4 rounded-lg border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-white">{team.name || `Team ${team.serialIndex}`}</span>
                                <span className="text-xs font-mono text-gray-500">#{team.serialIndex}</span>
                            </div>
                            <p className="text-sm text-blue-300">{team.problemStatement?.title || "No Problem Selected"}</p>
                            <p className="text-xs text-green-400 mt-1">Room: {team.roomNumber || "N/A"}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex flex-col items-end">
                                <label className="text-xs text-gray-400 mb-1">Score (0-100)</label>
                                <input
                                    type="number"
                                    min="0" max="100"
                                    placeholder={getMyScore(team) !== undefined ? String(getMyScore(team)) : "Score"}
                                    className="bg-neutral-800 border border-white/20 rounded px-2 py-1 text-white w-24 text-right hover:border-blue-500 focus:border-blue-500 transition-colors"
                                    onBlur={(e) => handleScore(team.id, e.target.value)}
                                />
                                {getMyScore(team) !== undefined && <span className="text-xs text-green-500 mt-1">Saved</span>}
                            </div>
                        </div>
                    </div>
                ))}
                {teams.length === 0 && <p className="text-gray-500 text-center">No teams found.</p>}
            </div>
        </div>
    );
}
