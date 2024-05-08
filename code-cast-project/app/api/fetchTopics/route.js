"use server"

const { db } = require("@/lib/db");

export async function GET(req) {
  // search for all topics in our db
  const topics = await db.topics.findMany();
  return new Response(JSON.stringify(topics), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
