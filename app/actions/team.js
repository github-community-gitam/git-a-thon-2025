"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProblemStatements() {
    try {
        const config = await prisma.systemConfig.findFirst();

        // Time based visibility
        const now = new Date();
        const liveTime = new Date(config?.probStmtsLiveTime || now);

        // If needed, we can return hidden: true if not yet live, or let frontend handle countdown
        // User asked for countdown, so we return data but flag if it's "future" or just return time

        const isLive = now >= liveTime;

        // IF not live, do NOT fetch problems to prevent leakage
        let problemsWithAvailability = [];

        if (isLive) {
            const problems = await prisma.problemStatement.findMany({
                include: {
                    _count: {
                        select: { teams: true }
                    }
                },
                orderBy: { title: 'asc' }
            });

            problemsWithAvailability = problems.map(p => ({
                ...p,
                isFull: p._count.teams >= (config.maxTeamPerProblem || 5)
            }));
        }

        return {
            success: true,
            data: problemsWithAvailability,
            config: {
                probStmtsLiveTime: config?.probStmtsLiveTime,
                isLive
            }
        };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to fetch problem statements" };
    }
}

export async function selectProblemStatement(teamId, problemStatementId, userEmail) {
    try {
        const config = await prisma.systemConfig.findFirst();

        // 1. Time Check
        const now = new Date();
        const liveTime = new Date(config?.probStmtsLiveTime || now);
        if (now < liveTime) {
            return { success: false, error: "Problem statements are not yet live." };
        }

        // 2. Role Check (Only Leader)
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            include: { team: true }
        });

        if (!user) return { success: false, error: "User not found" };
        if (user.teamId !== teamId) return { success: false, error: "User not in this team" };

        // Check if leader. If team has leaderId, check match. Or check role 'LEADER'? 
        // Schema has leaderId in Team.
        if (user.team.leaderId !== user.id) {
            return { success: false, error: "Only the Team Leader can select a problem statement." };
        }

        // Check availability
        const problem = await prisma.problemStatement.findUnique({
            where: { id: problemStatementId },
            include: { _count: { select: { teams: true } } }
        });

        if (!problem) return { success: false, error: "Problem not found" };

        if (problem._count.teams >= (config.maxTeamPerProblem || 5)) {
            return { success: false, error: "Problem statement is full" };
        }

        await prisma.team.update({
            where: { id: teamId },
            data: { problemStatementId }
        });

        await prisma.problemStatement.update({
            where: { id: problemStatementId },
            data: {
                count: {
                    increment: 1
                }
            }
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Select problem error:", error);
        return { success: false, error: "Failed to select problem" };
    }
}

export async function getProblemDistribution() {
    try {
        const stats = await prisma.problemStatement.findMany({
            include: {
                _count: {
                    select: { teams: true }
                },
                teams: {
                    select: {
                        id: true,
                        serialIndex: true,
                        teamIdString: true,
                        name: true,
                        roomNumber: true,
                        leaderId: true,
                        members: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return { success: true, data: stats };
    } catch (error) {
        return { success: false, error: "Failed to fetch distribution" };
    }
}

// ... existing allotRoom ...

export async function updateTeamName(teamId, name) {
    try {
        // Validation: name length/profanity?
        if (!name || name.length < 3) return { success: false, error: "Name too short" };

        await prisma.team.update({
            where: { id: teamId },
            data: { name }
        });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update team name" };
    }
}

export async function allotRoom(teamId, roomNumber) {
    try {
        await prisma.team.update({
            where: { id: teamId },
            data: { roomNumber }
        });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to allot room" };
    }
}

export async function getTeamsWithoutRooms() {
    try {
        const teams = await prisma.team.findMany({
            // Removed roomNumber: null filter to show all teams for admin filtering
            // But function name is "WithoutRooms". Let's update or keep flexible.
            // User asked for "Admin capabilities to view student names and filter by team".
            // We might need a generic getTeams action.
            include: {
                members: true,
                problemStatement: true
            },
            orderBy: { serialIndex: 'asc' }
        });
        return { success: true, data: teams };
    } catch (error) {
        return { success: false, error: "Failed to fetch teams" };
    }
}

export async function getAllTeamScores() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                members: { select: { id: true, name: true } },
                problemStatement: { select: { title: true } },
                scores: {
                    include: {
                        judge: { select: { name: true, email: true } }
                    }
                }
            },
            orderBy: { serialIndex: 'asc' }
        });
        return { success: true, data: teams };
    } catch (error) {
        return { success: false, error: "Failed to fetch scores" };
    }
}
