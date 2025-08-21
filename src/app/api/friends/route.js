import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import db from "@/libs/db";

export async function GET() {
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
            }
        })

        const friends = friendships.map(friendship => {
            const friendData = friendship.senderId === session.user.id ?
                friendship.receiver.Player :
                friendship.receiver.Player;
            return friendData;
        });

        return NextResponse.json(friends, { status: 200 });
    } catch (error) {
        console.error("Error fetching friends:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }

        );

    }





}