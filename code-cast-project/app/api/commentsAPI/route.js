"use server"

const { db } = require("@/lib/db");

export async function GET(req) {
    try {
        const comments = await db.comment.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log("Fetched comments: ", comments);

        return new Response(JSON.stringify(comments), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        console.error("Error in GET /api/comments:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
