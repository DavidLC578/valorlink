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

export async function DELETE(request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized: Please log in to continue" },
            { status: 401 }
        );
    }

    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { message: "Friend ID is required" },
                { status: 400 }
            );
        }

        // Check if friendship exists
        const existingFriendship = await db.friendship.findFirst({
            where: {
                OR: [
                    {
                        senderId: session.user.id,
                        receiverId: userId,
                        status: "ACCEPTED"
                    },
                    {
                        senderId: userId,
                        receiverId: session.user.id,
                        status: "ACCEPTED"
                    }
                ]
            }
        });

        if (!existingFriendship) {
            return NextResponse.json(
                { message: "Friendship not found or you don't have permission" },
                { status: 404 }
            );
        }

        // Delete friendship
        const deletedFriendship = await db.friendship.delete({
            where: {
                id: existingFriendship.id
            },
            include: {
                sender: {
                    select: { Player: true }
                },
                receiver: {
                    select: { Player: true }
                }
            }
        });

        return NextResponse.json({
            message: "Friendship deleted successfully",
            friendship: deletedFriendship
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting friendship:", error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { message: "Friendship doesn't exist or was already deleted" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}