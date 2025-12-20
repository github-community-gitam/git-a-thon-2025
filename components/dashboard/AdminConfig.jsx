"use client";

import { useState, useEffect } from "react";
import { getSystemConfig, updateSystemConfig } from "@/app/actions/config";

export default function AdminConfig() {
    const [config, setConfig] = useState(null);
    const [liveTimeIst, setLiveTimeIst] = useState("");

    // New States
    const [maxTeams, setMaxTeams] = useState(5);
    const [round, setRound] = useState(1);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        const res = await getSystemConfig();
        if (res.success && res.config) {
            setConfig(res.config);
            setMaxTeams(res.config.maxTeamPerProblem || 5);
            setRound(res.config.currentRound || 1);

            // Convert UTC DB time to IST local string for input
            if (res.config.probStmtsLiveTime) {
                const date = new Date(res.config.probStmtsLiveTime);
                const istOffset = 5.5 * 60 * 60 * 1000;
                const istDate = new Date(date.getTime() + istOffset);
                setLiveTimeIst(istDate.toISOString().slice(0, 16));
            }
        }else{
            console.log(res);
        }
    };

    const handleSaveDate = async () => {
        setLoading(true);
        // Manual IST -> UTC conversion
        const [d, t] = liveTimeIst.split('T');
        const [y, m, day] = d.split('-');
        const [h, min] = t.split(':');

        const utcDate = new Date(Date.UTC(y, m - 1, day, h, min));
        utcDate.setHours(utcDate.getHours() - 5);
        utcDate.setMinutes(utcDate.getMinutes() - 30);

        await updateSystemConfig({ probStmtsLiveTime: utcDate });
        setLoading(false);
        alert("Time updated!");
        loadConfig();
    };

    const handleSaveSettings = async () => {
        setLoading(true);
        await updateSystemConfig({
            maxTeamPerProblem: parseInt(maxTeams),
            currentRound: parseInt(round)
        });
        setLoading(false);
        alert("Settings updated!");
        loadConfig();
    };

    const toggleLeaderboard = async () => {
        if (!config) return;
        setLoading(true);
        await updateSystemConfig({ showLeaderboard: !config.showLeaderboard });
        setLoading(false);
        loadConfig();
    };

    if (!config) return <div className="text-gray-400">Loading config...</div>;

    return (
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold text-white mb-4">System Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Timer Config */}
                <div className="space-y-4">
                    <label className="block text-sm text-gray-400">Go Live Time (IST)</label>
                    <div className="flex gap-2">
                        <input
                            type="datetime-local"
                            className="bg-black/50 border border-white/20 rounded px-2 py-2 text-white w-full text-sm"
                            value={liveTimeIst}
                            onChange={(e) => setLiveTimeIst(e.target.value)}
                        />
                        <button
                            onClick={handleSaveDate}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm disabled:opacity-50"
                        >
                            Set
                        </button>
                    </div>
                </div>

                {/* Competition Settings */}
                <div className="space-y-4">
                    <label className="block text-sm text-gray-400">Competition Params</label>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Max Teams/Prob</span>
                            <input
                                type="number"
                                className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-20 text-sm"
                                value={maxTeams}
                                onChange={(e) => setMaxTeams(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Current Round</span>
                            <input
                                type="number"
                                className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white w-20 text-sm"
                                value={round}
                                onChange={(e) => setRound(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            disabled={loading}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded text-sm mt-2 disabled:opacity-50"
                        >
                            Update Params
                        </button>
                    </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                    <label className="block text-sm text-gray-400">Public Features</label>
                    <div className="flex items-center justify-between bg-black/50 p-3 rounded border border-white/10">
                        <span className="text-gray-200 text-sm">Leaderboard</span>
                        <button
                            onClick={toggleLeaderboard}
                            disabled={loading}
                            className={`px-3 py-1 rounded text-xs font-bold transition ${config.showLeaderboard ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                        >
                            {config.showLeaderboard ? "VISIBLE" : "HIDDEN"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
