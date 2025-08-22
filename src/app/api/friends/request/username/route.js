import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import db from "@/libs/db";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        // Verify authentication
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized: Please log in to continue" },
                { status: 401 }
            );
        }

        const { username } = await request.json();

        // Validate input
        if (!username || typeof username !== 'string' || username.trim() === '') {
            return NextResponse.json(
                { message: "Username is required" },
                { status: 400 }
            );
        }

        // Search for the user by username
        const user = await db.user.findFirst({
            where: {
                username: username.trim(),
                id: { not: session.user.id } // Avoid searching for the own user
            },
            select: {
                id: true,
                Player: true
            }
        });

        if (!user) {
            return NextResponse.json(
                { message: "No user found with that username" },
                { status: 404 }
            );
        }

        if (!user.Player) {
            return NextResponse.json(
                { message: "User does not have a profile" },
                { status: 400 }
            );
        }

        // Check if there is already a request
        const existingRequest = await db.friendship.findFirst({
            where: {
                OR: [
                    { senderId: session.user.id, receiverId: user.id },
                    { senderId: user.id, receiverId: session.user.id }
                ]
            }
        });

        if (existingRequest) {
            const message = existingRequest.senderId === session.user.id
                ? "You already sent a friend request to this user"
                : "You already have a pending friend request from this user";

            return NextResponse.json(
                { message },
                { status: 409 } // Conflict
            );
        }

        // Create the friend request
        const friendship = await db.friendship.create({
            data: {
                senderId: session.user.id,
                receiverId: user.id,
                status: "PENDING",
            },
        });

        return NextResponse.json({
            message: "Friend request sent successfully",
            friendship
        }, { status: 201 });

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
