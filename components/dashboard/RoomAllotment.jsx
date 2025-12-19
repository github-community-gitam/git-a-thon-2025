"use client";

import { useEffect, useState } from "react";
import { allotRoom } from "@/app/actions/team";
import { getTeamsForJudging } from "@/app/actions/judge";

export default function RoomAllotment() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [roomInput, setRoomInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("unassigned"); // all, assigned, unassigned

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {
        const res = await getTeamsForJudging(); // Reusing this as it fetches all teams details
        if (res.success) setTeams(res.data);
    };

    const handleAllot = async () => {
        if (!selectedTeam || !roomInput) return;

        const res = await allotRoom(selectedTeam, roomInput);
        if (res.success) {
            setRoomInput("");
            setSelectedTeam(null);
            loadTeams();
        }
    };

    const filteredTeams = teams.filter(t => {
        // Search Filter
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            (t.name && t.name.toLowerCase().includes(searchLower)) ||
            String(t.serialIndex).includes(searchTerm) ||
            (t.teamIdString && t.teamIdString.toLowerCase().includes(searchLower)) ||
            t.members.some(m => m.name.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;

        // Status Filter
        if (filterStatus === "assigned") return t.roomNumber;
        if (filterStatus === "unassigned") return !t.roomNumber;
        return true;
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden p-4">
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Teams</h3>
                        <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                            {['all', 'assigned', 'unassigned'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1 text-xs font-medium rounded capitalize ${filterStatus === status ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    <input
                        placeholder="Search Team, ID, or Member Name..."
                        className="bg-black/50 border border-white/20 rounded px-3 py-2 text-sm text-white w-full"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {filteredTeams.map(team => (
                        <div
                            key={team.id}
                            onClick={() => {
                                setSelectedTeam(team.id);
                                setRoomInput(team.roomNumber || "");
                            }}
                            className={`p-3 rounded-lg cursor-pointer transition border flex flex-col gap-2 ${selectedTeam === team.id ? "bg-blue-600/20 border-blue-500" : "bg-black/40 border-white/5 hover:border-white/20"
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-white">{team.name || `Team ${team.serialIndex}`} <span className="text-gray-500 text-xs font-normal">#{team.serialIndex}</span></span>
                                {team.roomNumber && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">Room: {team.roomNumber}</span>}
                            </div>

                            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                                {team.members.map(m => (
                                    <span key={m.id} className="bg-white/5 px-1.5 py-0.5 rounded">{m.name}</span>
                                ))}
                            </div>

                            {team.problemStatement && (
                                <div className="text-xs text-blue-300">
                                    {team.problemStatement.title}
                                </div>
                            )}
                        </div>
                    ))}
                    {filteredTeams.length === 0 && <p className="text-gray-500 text-center py-4">No teams found matching criteria.</p>}
                </div>
            </div>

            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-center space-y-4 h-fit sticky top-6">
                <h3 className="text-lg font-semibold text-white">Assign Room</h3>
                <div className="text-sm text-gray-400 mb-2">
                    {selectedTeam ? `Selected: ${teams.find(t => t.id === selectedTeam)?.name || 'Team'}` : "Select a team to assign room"}
                </div>
                <input
                    type="text"
                    placeholder="Room Number (e.g. A-101)"
                    className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
                    value={roomInput}
                    onChange={(e) => setRoomInput(e.target.value)}
                    disabled={!selectedTeam}
                />
                <button
                    onClick={handleAllot}
                    disabled={!selectedTeam || !roomInput}
                    className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-medium py-2 rounded transition"
                >
                    Update Allocation
                </button>
            </div>
        </div>
    );
}
