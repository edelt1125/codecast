"use server"

import { revalidatePath } from "next/cache";
const { db } = require("@/lib/db");

export async function POST(req) {
    try {
        const data = await req.json();
        const newComment = await db.comment.create({
            data: {
                ...data,
                createdAt: new Date(),
            },
        });

        // Revalidate the comments page
        await revalidatePath("/community");
        console.log("Revalidated path");

        return new Response(JSON.stringify(newComment), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });
    } catch (error) {
        console.error("Error in POST /api/comments:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
