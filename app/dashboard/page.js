import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import StudentView from "@/components/dashboard/StudentView";
import VolunteerScanner from "@/components/dashboard/VolunteerScanner";
import CheckInTable from "@/components/dashboard/CheckInTable";
import RoomAllotment from "@/components/dashboard/RoomAllotment";
import JudgeScoring from "@/components/dashboard/JudgeScoring";
import AdminStats from "@/components/dashboard/AdminStats";
import AdminConfig from "@/components/dashboard/AdminConfig";
import AdminScoreboard from "@/components/dashboard/AdminScoreboard";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Manage your hackathon activities.</p>
            </header>

            {role === "STUDENT" && <StudentView user={session.user} />}

            {role === "VOLUNTEER" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-blue-400">QR Scanner</h2>
                        <VolunteerScanner />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-purple-400">Check-in Management</h2>
                        <CheckInTable />
                    </div>
                </div>
            )}

            {role === "ADMIN" && (
                <div className="space-y-8">
                    <AdminConfig />
                    <AdminStats />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold text-blue-400 mb-4">Scanner</h2>
                            <VolunteerScanner />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-purple-400 mb-4">Check-ins</h2>
                            <CheckInTable />
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8">
                        <h2 className="text-xl font-semibold text-green-400 mb-4">Room Allotment</h2>
                        <RoomAllotment />
                    </div>
                    <AdminScoreboard />
                </div>
            )}

            {role === "JUDGE" && <JudgeScoring />}

            {!["STUDENT", "VOLUNTEER", "ADMIN", "JUDGE"].includes(role) && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                    Unknown Role. Please contact support.
                </div>
            )}
        </div>
    );
}
