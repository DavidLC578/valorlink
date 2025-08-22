import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
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

        if (!session?.user?.isProfileComplete) {
            return NextResponse.json(
                { message: "Please complete your profile to send a friend request" },
                { status: 400 }
            );
        }

        const { receiverId } = await request.json();

        // Validate input
        if (!receiverId) {
            return NextResponse.json(
                { message: "The receiver ID is required" },
                { status: 400 }
            );
        }

        // Prevent self-requests
        if (receiverId === session.user.id) {
            return NextResponse.json(
                { message: "You can't send a request to yourself" },
                { status: 400 }
            );
        }

        // Check if the receiver exists
        const receiverExists = await db.user.findUnique({
            where: { id: receiverId }
        });

        if (!receiverExists) {
            return NextResponse.json(
                { message: "The receiver user does not exist" },
                { status: 404 }
            );
        }

        // Check if there is already a request
        const existingRequest = await db.friendship.findFirst({
            where: {
                OR: [
                    { senderId: session.user.id, receiverId },
                    { senderId: receiverId, receiverId: session.user.id }
                ]
            }
        });

        if (existingRequest) {
            const message = existingRequest.senderId === session.user.id
                ? "You already sent a request to this user"
                : "You already have a pending request from this user";

            return NextResponse.json(
                { message },
                { status: 409 } // Conflict
            );
        }

        // Create the friendship request
        const friendship = await db.friendship.create({
            data: {
                senderId: session.user.id,
                receiverId,
                status: "PENDING",
            },
        });

        return NextResponse.json({
            message: "Friendship request sent successfully",
            friendship
        }, { status: 201 }); // 201 Created

    } catch (error) {
        console.error("Error in the friendship request:", error);
        return NextResponse.json(
            {
                message: "Internal server error",
                error: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}