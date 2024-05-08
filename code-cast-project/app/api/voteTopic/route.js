"use server"

const { db } = require("@/lib/db");

export async function POST(req) {

  const { id } = await req.json();

  try {
    const vote = await db.topics.update({
        where: { id },
        data: { votes: { increment: 1 } }
    });
    return new Response(JSON.stringify(vote), {
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
