import db from "@/libs/db";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

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

    try {
        const { region, role, rank } = await request.json();

        const where = {};
        if (region) where.region = region;
        if (role) where.roles = { has: role };
        if (rank) where.rank = rank;

        const players = await db.player.findMany({
            where: Object.keys(where).length > 0 ? where : undefined
        });

        return NextResponse.json({ players }, { status: 200 });
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
