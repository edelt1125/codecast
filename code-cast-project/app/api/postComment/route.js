

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { text, userId, timestamp } = await req.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        user: { connect: { externalUserId: userId } }, // Ensure the schema matches: It might be `user: { connect: { id: userId } }`
        timestamp,
      }
    });
    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create comment" }), {
      status: 500,
    });
  }
}
