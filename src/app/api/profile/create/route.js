import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(request) {
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

    const data = await request.json();
    const { alias, description, region, rank, roles } = data

    try {
        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
        const createdPlayer = await db.player.upsert({
            where: { userId: user.id },
            update: { alias, description, region, roles, rank },
            create: {
                userId: user.id,
                alias,
                description,
                region,
                roles,
                rank,
            }
        });
        if (createdPlayer) {
            await db.user.update({
                where: { id: user.id },
                data: { isProfileComplete: true },
            });
        }
        return NextResponse.json({ message: 'Profile saved successfully' }, { status: 200 });
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