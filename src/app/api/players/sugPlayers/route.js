import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import db from "@/libs/db";
import { NextResponse } from "next/server";
import ranks from "@/libs/data/ranks.json";

export async function GET(request) {
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

    const currentPlayer = await db.player.findUnique({
        where: { userId: session.user.id },
    });

    if (!currentPlayer) {
        return NextResponse.json(
            {
                message: "Player not found",
            },
            {
                status: 404,
            }
        );
    }

    // Obtener el tier del rango actual del jugador
    const currentRankData = ranks.find(r => r.id === currentPlayer.rank);
    const currentTier = currentRankData?.tier || 0;
    
    // Definir el rango de tiers a buscar (1 arriba y 1 abajo)
    const minTier = Math.max(1, currentTier - 1);
    const maxTier = Math.min(25, currentTier + 1); // Asumiendo que 25 es el tier máximo
    
    // Obtener los IDs de los rangos dentro del rango de tiers
    const similarRanks = ranks
        .filter(r => r.tier >= minTier && r.tier <= maxTier)
        .map(r => r.id);
    
    const candidates = await db.player.findMany({
        where: {
            NOT: { userId: session.user.id },
            region: currentPlayer.region,
            rank: { in: similarRanks },
        },
    });
    const shuffled = candidates.sort(() => 0.5 - Math.random());
    const suggestedPlayers = shuffled.slice(0, 3);

    return NextResponse.json({ suggestedPlayers }, { status: 200 });
}