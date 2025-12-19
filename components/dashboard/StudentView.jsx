"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { getTeamDetails, getUserDetails } from "@/app/actions/user";
import { getProblemStatements, selectProblemStatement, updateTeamName } from "@/app/actions/team";

import Countdown from "@/components/Countdown";

function TeamNameEditor({ team, isLeader }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(team.name || `Team ${team.serialIndex}`);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await updateTeamName(team.id, name);
        setSaving(false);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex gap-2 mt-1">
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-sm w-full"
                />
                <button onClick={handleSave} disabled={saving} className="text-green-400 text-xs hover:text-green-300">
                    {saving ? "..." : "Save"}
                </button>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 text-xs hover:text-white">Cancel</button>
            </div>
        )
    }

    return (
        <div className="flex justify-between items-center mt-1">
            <p className="font-bold text-xl text-white">{team.name || `Team #${team.serialIndex}`}</p>
            {isLeader && (
                <button onClick={() => setIsEditing(true)} className="text-xs text-blue-400 hover:underline">
                    Edit
                </button>
            )}
        </div>
    )
}

export default function StudentView({ user }) {
    const [qrSrc, setQrSrc] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const [problems, setProblems] = useState([]);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedProblem, setSelectedProblem] = useState("");

    useEffect(() => {
        // Generate QR
        QRCode.toDataURL(user.email).then(setQrSrc);

        // Fetch Details 
        const fetchData = async () => {
            const uRes = await getUserDetails(user.email);
            if (uRes.success) setUserDetails(uRes.data);

            const pRes = await getProblemStatements();
            if (pRes.success) {
                setProblems(pRes.data);
                setConfig(pRes.config);
            }

            setLoading(false);
        };
        fetchData();
    }, [user.email]);

    const handleSelectProblem = async () => {
        if (!selectedProblem || !userDetails?.teamId) return;

        const res = await selectProblemStatement(userDetails.teamId, selectedProblem, user.email);
        if (!res.success) {
            alert(res.error);
            return;
        }

        // Reload data
        const uRes = await getUserDetails(user.email);
        if (uRes.success) setUserDetails(uRes.data);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ID Card / QR Section */}
            <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Boarding Pass
                </h2>

                <div className="p-4 bg-white rounded-xl">
                    {qrSrc && <img src={qrSrc} alt="Check-in QR" className="w-48 h-48" />}
                </div>

                <div className="text-center">
                    <p className="text-lg font-mono text-white tracking-widest">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold inline-block ${userDetails?.checkInStatus ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                        {userDetails?.checkInStatus ? "CHECKED IN" : "NOT CHECKED IN"}
                    </div>
                </div>
            </div>

            {/* Team & Problem Section */}
            <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl space-y-6">
                <h3 className="text-xl font-semibold text-white">Team Details</h3>

                {userDetails?.team ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-black/50 rounded-lg border border-white/5">
                            <p className="text-sm text-gray-400">Team Name</p>
                            <TeamNameEditor team={userDetails.team} isLeader={userDetails.role === 'LEADER' || userDetails.id === userDetails.team.leaderId} />

                            <p className="text-sm text-gray-400 mt-4">Team ID</p>
                            <p className="font-mono text-xs text-gray-500">#{userDetails.team.serialIndex} ({userDetails.team.teamIdString || userDetails.team.id})</p>
                        </div>

                        <div className="p-4 bg-black/50 rounded-lg border border-white/5">
                            <p className="text-sm text-gray-400">Problem Statement</p>
                            {userDetails.team.problemStatement ? (
                                <p className="font-medium text-blue-300">{userDetails.team.problemStatement.title}</p>
                            ) : (
                                <div className="mt-2 space-y-2">
                                    {!config?.isLive ? (
                                        <div className="py-2">
                                            <p className="text-yellow-500 text-xs mb-2 uppercase tracking-widest font-bold">Selection Opens In</p>
                                            <div className="scale-[0.6] origin-top-left -mb-10 w-[150%]">
                                                <Countdown targetDate={config?.probStmtsLiveTime} />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-yellow-500 text-sm">Action Required: Select a problem</p>
                                            <select
                                                className="w-full bg-neutral-800 text-white p-2 rounded border border-white/20"
                                                onChange={(e) => setSelectedProblem(e.target.value)}
                                                value={selectedProblem}
                                            >
                                                <option value="">Select a challenge...</option>
                                                {problems.map(p => (
                                                    <option key={p.id} value={p.id} disabled={p.isFull}>
                                                        {p.title} {p.isFull ? "(FULL)" : ""}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={handleSelectProblem}
                                                className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition"
                                                disabled={!selectedProblem}
                                            >
                                                Confirm Selection
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {userDetails.team.roomNumber && (
                            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                                <p className="text-sm text-green-400">Allotted Room</p>
                                <p className="text-2xl font-bold text-white">{userDetails.team.roomNumber}</p>
                            </div>
                        )}

                        <div className="p-4 bg-black/50 rounded-lg border border-white/5">
                            <p className="text-sm text-gray-400 mb-2">Team Members</p>
                            <div className="space-y-1">
                                {userDetails.team.members && userDetails.team.members.map(m => (
                                    <div key={m.id} className="flex justify-between text-sm">
                                        <span className={m.id === userDetails.id ? "text-white font-medium" : "text-gray-400"}>
                                            {m.name} {m.id === userDetails.team.leaderId && "👑"}
                                        </span>
                                        <span className={`text-xs px-2 rounded ${m.status === 'CHECKED_IN' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                                            {m.status || 'ABSENT'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">You are not assigned to a team yet.</p>
                )}
            </div>
        </div>
    );
}
