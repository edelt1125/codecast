"use server"

const { db } = require("@/lib/db");

export async function POST(req) {

  const { id } = await req.json();

  try {
    const vote = await db.topics.update({
        where: { id },
        data: { votes: { increment: 1 } }
    });

    revalidatePath("/community"); // Replace with the actual path to your comments page
    console.log("Revalidated /comments");

    return new Response(JSON.stringify(vote), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create comment" }), {
      status: 500,
    });
  }
}
