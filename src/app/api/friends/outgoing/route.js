import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(request) {
    const { searchParams } = request.nextUrl;
    const page = searchParams.get("page") || "1"
    const limit = 1
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized: Please log in to continue" },
                { status: 401 }
            );
        }


        const friendships = await db.friendship.findMany({
            where: {
                senderId: session.user.id,
                status: "PENDING"
            },
            select: {
                receiver: {
                    select: {
                        Player: true
                    }
                }
            },
            take: limit,
            skip: (page - 1) * limit,
        })

        const totalCount = await db.friendship.count({
            where: {
                senderId: session.user.id,
                status: "PENDING"
            }
        })

        const players = friendships.map(friendship => friendship.receiver.Player)

        return NextResponse.json({ players, total: totalCount }, { status: 200 });
    } catch (error) {
        console.error("Error in friend request:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
