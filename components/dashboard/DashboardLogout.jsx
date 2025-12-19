"use client";

import { signOut } from "next-auth/react";

export default function DashboardLogout() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-500 border border-red-500/20 transition-all duration-200"
        >
            Logout
        </button>
    );
}
