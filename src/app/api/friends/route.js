import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "@/libs/db";

export async function GET(request) {
    const { searchParams } = request.nextUrl;
    const page = searchParams.get("page") || "1"
    const limit = 3

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized: Please log in to continue" },
            { status: 401 }
        );
    }

    try {
        const friendships = await db.friendship.findMany({
            where: {
                OR: [
                    { senderId: session.user.id, status: "ACCEPTED" },
                    { receiverId: session.user.id, status: "ACCEPTED" }
                ]
            },
            include: {
                sender: {
                    select: {
                        Player: true
                    }
                },
                receiver: {
                    select: {
                        Player: true
                    }
                }
            },
            take: limit,
            skip: (page - 1) * limit
        })

        const friends = friendships.map(friendship => {
            const friendData = friendship.senderId === session.user.id ?
                friendship.receiver.Player :
                friendship.sender.Player;
            return friendData;
        });

        const totalCount = await db.friendship.count({
            where: {
                OR: [
                    { senderId: session.user.id, status: "ACCEPTED" },
                    { receiverId: session.user.id, status: "ACCEPTED" }
                ]
            }
        })

        return NextResponse.json({ friends, total: totalCount }, { status: 200 });
    } catch (error) {
        console.error("Error fetching friends:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }

        );

    }





}