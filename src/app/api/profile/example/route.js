import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    const player = await db.user.findUnique({
        where: {
            username: "carlos"
        },
        select: {
            username: true,
            Player: true
        }
    })
    console.log(player)
    return NextResponse.json({ player }, { status: 200 });
}