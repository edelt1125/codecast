// app/api/fetchComments/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const comments = await prisma.comment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
