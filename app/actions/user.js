"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUserDetails(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                team: {
                    include: {
                        problemStatement: true,
                        members: true
                    }
                }
            }
        });
        return { success: true, data: user };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { success: false, error: "Failed to fetch user details" };
    }
}

export async function getTeamDetails(teamId) {
    try {
        const team = await prisma.team.findUnique({
            where: { id: teamId },
            include: {
                members: true,
                problemStatement: true
            }
        });
        return { success: true, data: team };
    } catch (error) {
        return { success: false, error: "Failed to fetch team" };
    }
}

export async function updateCheckInStatus(userId, status) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { status }
        });

        // Create log entry
        await prisma.checkInLog.create({
            data: {
                userId,
                status
            }
        });

        revalidatePath("/dashboard");
        return { success: true, data: user };
    } catch (error) {
        console.error("Check-in update error:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function checkInUser(userId) {
    return await updateCheckInStatus(userId, 'CHECKED_IN');
}

export async function toggleCheckIn(userId) {
    // Deprecated or mapped to specific logic. 
    // If used as toggle: fetch current, swap. But logic suggests explicit buttons now.
    // We'll keep it for legacy safety but it shouldn't be used.
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const newStatus = user.status === 'CHECKED_IN' ? 'CHECKED_OUT' : 'CHECKED_IN';
        return await updateCheckInStatus(userId, newStatus);
    } catch (e) {
        return { success: false, error: "Toggle failed" };
    }
}

export async function getAllUsers() {
    try {
        const users = await prisma.user.findMany({
            include: { team: true },
            orderBy: { name: 'asc' }
        });
        return { success: true, data: users };
    } catch (error) {
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function getCheckInHistory(userId) {
    try {
        const logs = await prisma.checkInLog.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' }
        });
        return { success: true, data: logs };
    } catch (error) {
        return { success: false, error: "Failed to fetch history" };
    }
}
