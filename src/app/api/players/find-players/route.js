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

        // Obtener el usuario actual para excluirlo de los resultados
        const currentUser = await db.user.findUnique({
            where: { email: session.user.email },
            include: { Player: true }
        });

        const where = {
            availability: 'Available', // Solo mostrar jugadores disponibles
            userId: { not: currentUser.id } // Excluir al usuario actual
        };
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
