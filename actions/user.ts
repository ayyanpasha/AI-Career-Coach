"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { User } from "@prisma/client";
import { err } from "inngest/types";
import { generateAIInsights } from "./dashboard";

interface UpdateUserData {
    name?: string;
    email?: string;
    industry: string;
    experience: number;
    bio: string;
    skills: string[];
}

interface UpdateUserResult {
    success: boolean;
    updatedUser: User;
    industryInsight?: any; // optional, depending on your logic
}


export async function updateUser(data: UpdateUserData): Promise<UpdateUserResult | undefined> {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });

    if (!user) throw new Error("User not found");

    try {
        const result = await db.$transaction(
            async (tx) => {
                // find the industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    },
                });
                // If industry doesnt exist, create it with default values - will replace it with ai later
                if (!industryInsight) {
                    const insights = await generateAIInsights(data.industry);

                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insights,
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
                }

                // Update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills
                    }
                });

                return { updatedUser, industryInsight };
            }, {
            timeout: 10000,
        }
        )
        return { success: true, ...result };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function getUserOnboardingStatus(): Promise<{ isOnboarded: boolean }> {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    });

    if (!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true
            },
        });

        return {
            isOnboarded: !!user?.industry
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error("Failed to check onboarding status");
        }
        return {
            isOnboarded: false
        }
    }
}