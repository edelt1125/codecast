"use server"

const { db } = require("@/lib/db");

export async function GET(req) {
    const comments = await db.comment.findMany({
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
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
