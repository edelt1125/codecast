"use server"

const { db } = require("@/lib/db");

export async function GET(req) {
  // search for all categories in our db
  const categories = await db.category.findMany();
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
