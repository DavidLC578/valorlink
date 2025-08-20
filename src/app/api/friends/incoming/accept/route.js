import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            { message: "Unauthorized: Please log in to continue" },
            { status: 401 }
        );
    }

    const { senderId } = await request.json();

    try {
        // Verify if the friendship request exists
        const existingRequest = await db.friendship.findFirst({
            where: {
                senderId,
                receiverId: session.user.id,
                status: "PENDING"
            },
        });

        if (!existingRequest) {
            return NextResponse.json(
                { message: "Friendship request not found or already processed" },
                { status: 404 }
            );
        }

        // Update the status to ACCEPTED
        const friendship = await db.friendship.update({
            where: {
                id: existingRequest.id
            },
            data: {
                status: "ACCEPTED"
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json({
            message: "Friendship request accepted!",
            friendship
        }, { status: 200 });
    } catch (error) {
        console.error("Error accepting friendship request:", error);
        return NextResponse.json(
            {
                message: "Error processing the friendship request",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}