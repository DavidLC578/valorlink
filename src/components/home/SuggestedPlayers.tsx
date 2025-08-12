'use client'
import { Player } from "@/generated/prisma";
import { getSuggestedPlayers } from "@/libs/api/sugPlayers";
import { Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import PlayerCardSkeleton from "./SugPlayers/PlayerCardSkeleton";
import Link from "next/link";

export default function SuggestedPlayers() {
    const [suggestedPlayers, setSuggestedPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasProfile, setHasProfile] = useState(true);

    useEffect(() => {
        const fetchSuggestedPlayers = async () => {
            try {
                setIsLoading(true);
                const response = await getSuggestedPlayers();
                console.log(response);

                if (!response.success) {
                    if (response.hasProfile === false) {
                        setHasProfile(false);
                    }
                    return;
                }
                setSuggestedPlayers(response.suggestedPlayers || []);
            } catch (error) {
                console.error('Error fetching suggested players:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSuggestedPlayers()
    }, [])

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">
                Recommended Players for You
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!hasProfile ? (
                    <div className="col-span-full text-center py-8">
                        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 max-w-md mx-auto">
                            <Gamepad2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">You don't have a player profile</h3>
                            <p className="text-gray-400 mb-4">Create your profile to see recommended players</p>
                            <Link
                                href="/profile/create"
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                            >
                                Create profile
                            </Link>
                        </div>
                    </div>
                ) : isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                        <PlayerCardSkeleton key={`skeleton-${index}`} />
                    ))
                ) : suggestedPlayers.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 max-w-md mx-auto">
                            <Gamepad2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-300">No recommended players available</h3>
                            <p className="text-gray-400 mt-2">Try again later</p>
                        </div>
                    </div>
                ) : (
                    suggestedPlayers.map((player, id) => (
                        <div
                            key={id}
                            className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 hover:bg-gray-800/80 transition transform hover:scale-105 cursor-pointer"
                        >
                            <Link href={`/profile/${player.userId}`}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                        <Gamepad2 className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{player.alias}</h3>
                                        <p className="text-sm text-gray-400">{player.rank.charAt(0).toUpperCase() + player.rank.slice(1)}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">
                                    Roles: <span className="text-white">{player.roles.join(", ").charAt(0).toUpperCase() + player.roles.join(", ").slice(1)}</span><br />
                                    Region: {player.region.toUpperCase()}
                                </p>
                            </Link>
                            <button className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-md transition cursor-pointer">
                                Send friend request
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
