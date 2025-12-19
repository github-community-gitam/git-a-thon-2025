"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTeamsForJudging() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                problemStatement: true,
                scores: true,
                members: true
            },
            orderBy: { serialIndex: 'asc' }
        });
        return { success: true, data: teams };
    } catch (error) {
        return { success: false, error: "Failed to fetch teams" };
    }
}

export async function submitScore(teamId, judgeId, round, scoreValue) {
    try {
        // Check if score exists for this team/judge? 
        // Logic: Usually one score per team per round? Or multiple judges?
        // Schema handles many scores per team. 
        // We will create a new score entry or update existence if we want one per team.
        // For simple hackathon, let's assume we append scores or update if we track judgeId.

        // Let's Find existing score for this judge/team if exists
        const existing = await prisma.score.findFirst({
            where: { teamId, judgeId }
        });

        if (existing) {
            await prisma.score.update({
                where: { id: existing.id },
                data: {
                    [round === 1 ? 'round1' : 'round2']: scoreValue
                }
            });
        } else {
            await prisma.score.create({
                data: {
                    teamId,
                    judgeId,
                    [round === 1 ? 'round1' : 'round2']: scoreValue
                }
            });
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Scoring error:", error);
        return { success: false, error: "Failed to submit score" };
    }
}
