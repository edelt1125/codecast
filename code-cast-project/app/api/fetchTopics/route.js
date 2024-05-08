import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  // search for all topics in our db
  const topics = await prisma.topics.findMany();
  return new Response(JSON.stringify(topics), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
