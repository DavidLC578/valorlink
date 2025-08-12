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

    try {
        const currentPlayer = await db.player.findUnique({
            where: { userId: session.user.id },
        });

        if (!currentPlayer) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Player profile not found",
                    hasProfile: false
                },
                {
                    status: 200
                }
            );
        }

        const currentRankData = ranks.find(r => r.id === currentPlayer.rank);
        const currentTier = currentRankData?.tier || 0;

        const minTier = Math.max(1, currentTier - 1);
        const maxTier = Math.min(25, currentTier + 1);

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
    } catch (error) {
        console.error('Error in sugPlayers API:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}