"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateCheckInStatus, getCheckInHistory } from "@/app/actions/user";

export default function CheckInTable() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    // Modal State
    const [selectedUser, setSelectedUser] = useState(null);
    const [historyLogs, setHistoryLogs] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const res = await getAllUsers();
        if (res.success) setUsers(res.data);
    };

    const handleUpdateStatus = async (userId, status) => {
        await updateCheckInStatus(userId, status);
        loadUsers(); // Refresh
    };

    const handleViewHistory = async (user) => {
        setSelectedUser(user);
        setLoadingHistory(true);
        const res = await getCheckInHistory(user.id);
        if (res.success) setHistoryLogs(res.data);
        setLoadingHistory(false);
    };

    const closeHistory = () => {
        setSelectedUser(null);
        setHistoryLogs([]);
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(filter.toLowerCase()) ||
        u.email?.toLowerCase().includes(filter.toLowerCase()) ||
        u.team?.teamIdString?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden relative">
            <div className="p-4 border-b border-white/10">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-black/50 text-gray-200 sticky top-0">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Team</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition">
                                <td className="p-3 cursor-pointer group" onClick={() => handleViewHistory(user)}>
                                    <div className="font-medium text-white group-hover:text-blue-400 transition-colors underline decoration-dotted decoration-white/20 underline-offset-4">{user.name}</div>
                                    <div className="text-xs">{user.email}</div>
                                </td>
                                <td className="p-3 font-mono text-xs">
                                    {user.team?.teamIdString || "N/A"}
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-0.5 rounded text-xs ${user.status === 'CHECKED_IN' ? "bg-green-500/20 text-green-400" :
                                        user.status === 'CHECKED_OUT' ? "bg-red-500/20 text-red-400" :
                                            "bg-yellow-500/20 text-yellow-400"
                                        }`}>
                                        {user.status || 'ABSENT'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleUpdateStatus(user.id, 'CHECKED_IN')}
                                        disabled={user.status === 'CHECKED_IN'}
                                        className="text-green-400 hover:text-green-300 text-xs disabled:opacity-30 border border-green-500/30 px-2 py-1 rounded hover:bg-green-500/10 transition"
                                    >
                                        In
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(user.id, 'CHECKED_OUT')}
                                        disabled={user.status === 'CHECKED_OUT'}
                                        className="text-red-400 hover:text-red-300 text-xs disabled:opacity-30 border border-red-500/30 px-2 py-1 rounded hover:bg-red-500/10 transition"
                                    >
                                        Out
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* History Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-neutral-900 border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                            <div>
                                <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                                <p className="text-sm text-gray-400">Check-In History</p>
                            </div>
                            <button onClick={closeHistory} className="text-gray-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {loadingHistory ? (
                                <p className="text-center text-gray-500">Loading history...</p>
                            ) : historyLogs.length === 0 ? (
                                <p className="text-center text-gray-500">No history found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {historyLogs.map((log, idx) => (
                                        <div key={log.id} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-3 h-3 rounded-full mt-1.5 ${log.status === 'CHECKED_IN' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                {idx !== historyLogs.length - 1 && <div className="w-0.5 h-full bg-white/10 mt-1"></div>}
                                            </div>
                                            <div className="pb-4">
                                                <div className={`font-semibold ${log.status === 'CHECKED_IN' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {log.status === 'CHECKED_IN' ? 'Checked In' : 'Checked Out'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
