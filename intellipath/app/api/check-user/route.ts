import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();
  if (!user) return NextResponse.json(null);

  try {
    const existing = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existing) return NextResponse.json(existing);

    const name =
      `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });

    return NextResponse.json(newUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json(null, { status: 500 });
  }
}
