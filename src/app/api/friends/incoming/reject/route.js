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

        // Delete the friendship request
        const friendship = await db.friendship.delete({
            where: {
                id: existingRequest.id
            },
        });

        return NextResponse.json({
            message: "Friendship request rejected!",
            friendship
        }, { status: 200 });
    } catch (error) {
        console.error("Error rejecting friendship request:", error);
        return NextResponse.json(
            { message: "Error processing the rejection of the friendship request" },
            { status: 500 }
        );
    }
}
