"use server"

const { db } = require("@/lib/db");

export async function POST(req) {
  const { text, userId, timestamp } = await req.json();

  try {
    const comment = await db.comment.create({
      data: {
        text,
        user: { connect: { externalUserId: userId } }, // Ensure the schema matches: It might be `user: { connect: { id: userId } }`
        timestamp,
      }
    });

    // Revalidate the path where comments are displayed
    await revalidatePath("/comments"); // Replace with the actual path to your comments page
    console.log("Revalidated /comments");

    
    return new Response(JSON.stringify(comment), {
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
