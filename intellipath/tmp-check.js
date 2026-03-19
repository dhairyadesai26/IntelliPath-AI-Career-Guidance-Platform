const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  const users = await db.user.findMany({ select: { id: true, email: true }});
  const user = users.find(u => u.email === "dhairyadesai950@gmail.com");

  const predictions = await db.prediction.findMany({
    where: { userId: user.id },
    include: { career: { select: { title: true }} },
    orderBy: { matchScore: 'desc' },
    take: 5
  });

  console.log(JSON.stringify(predictions.map(p => ({
    career: p.career.title,
    score: p.matchScore,
  })), null, 2));
}

main().catch(console.error).finally(() => db.$disconnect());
