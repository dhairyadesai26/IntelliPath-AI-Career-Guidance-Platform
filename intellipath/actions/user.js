"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateAIInsights } from "./dashboard";

// ---------------- UPDATE USER ----------------

export async function updateUser(data) {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {

    // 1️⃣ Check if insights already exist
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // 2️⃣ If not, generate with AI (OUTSIDE transaction)
    if (!industryInsight) {

      const insights = await generateAIInsights(data.industry);

      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,

          salaryRanges: insights.salaryRanges,
          growthRate: insights.growthRate,

          demandLevel: insights.demandLevel?.toUpperCase() || "MEDIUM",
          marketOutlook: insights.marketOutlook?.toUpperCase() || "NEUTRAL",

          topSkills: insights.topSkills,
          keyTrends: insights.keyTrends,
          recommendedSkills: insights.recommendedSkills,

          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // 3️⃣ Fast DB transaction (only DB operations)
    const result = await db.$transaction(async (tx) => {

      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: Number(data.experience),
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };

    });

    return { success: true, ...result };

  } catch (error) {

    console.error("FULL ERROR:", error);
    throw new Error("Failed to update profile: " + error.message);

  }
}

//
// ---------------- ONBOARDING STATUS ----------------
//

export async function getUserOnboardingStatus() {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    if (!user) throw new Error("User not found");

    return {
      isOnboarded: !!user.industry,
    };

  } catch (error) {

    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");

  }
}