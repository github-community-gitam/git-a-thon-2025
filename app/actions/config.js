'use server';

import { revalidatePath } from "next/cache";

export async function getSystemConfig() {
    try {
        const config = await prisma.systemConfig.findFirst();
        return { success: true, config };
    } catch (error) {
        console.error("Error fetching system config:", error);
        return { success: false, error: "Failed to fetch config" };
    }
}

export async function updateSystemConfig(data) {
    try {
        // data: { probStmtsLiveTime: Date, showLeaderboard: Boolean, ... }
        await prisma.systemConfig.update({
            where: { id: 1 },
            data
        });
        revalidatePath("/dashboard");
        revalidatePath("/leaderboard");
        return { success: true };
    } catch (error) {
        console.error("Update config error:", error);
        return { success: false, error: "Failed to update config" };
    }
}
