import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route";
import db from "@/libs/db";
import { getServerSession } from "next-auth";

export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { username } = await params

    try {
        const player = await db.user.findUnique({
            where: {
                username: username
            },
            select: {
                username: true,
                Player: true
            }
        })
        if (!player) {
            return NextResponse.json(
                {
                    message: "Player not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({ player }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { username } = await params
    const data = await request.json();
    const { availability } = data

    try {
        const playerUpdated = await db.user.update({
            where: {
                username: username
            },
            data: {
                Player: {
                    update: {
                        availability: availability
                    }
                }
            }
        })

        if (!playerUpdated) {
            return NextResponse.json(
                {
                    message: "Player not updated",
                },
                {
                    status: 400,
                }
            );
        }


        return NextResponse.json({ playerUpdated }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }

}