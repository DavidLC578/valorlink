'use client'
import { PlayerInfo } from "@/types/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MapPin, Calendar, Trophy, Users, Gamepad2, Star, User, UserRoundPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import UserIcon from "@/components/UserIcon"

function ProfileComponent() {

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const router = useRouter()
    const { userId } = useParams()
    const { data: session } = useSession() as {
        data: {
            user: {
                id: string
                name?: string | null
                email?: string | null
                image?: string | null
                isProfileComplete?: boolean
            }
        } | null
    }

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/profile/${userId}`);
                if (!res.ok) {
                    throw new Error('Failed to load profile');
                }
                const data = await res.json();
                if (!data.player.Player) {
                    router.push('/home')
                }
                setPlayerInfo(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                console.error('Error fetching player:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPlayer();
        }
    }, [userId])

    const isOwner = session?.user?.id === playerInfo?.player.Player?.userId

    const handleSendFriendRequest = async () => {
        try {
            const response = await fetch('/api/friends/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    receiverId: userId,
                }),
            });
            const data = await response.json();
            if (data.friendship.status === 'PENDING') {
                setIsPending(true);
            }
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    }

    const isFriend = playerInfo?.player.friendsReceived.some(friendship => friendship.status === 'ACCEPTED') || playerInfo?.player.friendsSent.some(friendship => friendship.status === 'ACCEPTED');

    useEffect(() => {
        if (playerInfo?.player.friendsReceived.some(friendship => friendship.status === 'PENDING') || playerInfo?.player.friendsSent.some(friendship => friendship.status === 'PENDING')) {
            setIsPending(true);
        }
    }, [playerInfo]);

    return (
        <>
            {
                loading || !playerInfo?.player.Player ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <main className="min-h-screen">
                        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">

                            {/* Profile Header */}
                            <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <UserIcon alias={playerInfo?.player.username} className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12" />
                                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-purple-500 rounded-full p-1.5 sm:p-2">
                                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 w-full text-center sm:text-left space-y-3 sm:space-y-4">
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                                                {playerInfo?.player.username}
                                            </h1>
                                            <p className="text-lg sm:text-xl text-purple-400">
                                                @{playerInfo?.player.username}
                                            </p>
                                            {isPending ? (
                                                <div className="inline-flex items-center mt-4 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all duration-200 text-white font-medium">
                                                    <User className="w-4 h-4 mr-1" />
                                                    <p>Pending...</p>
                                                </div>
                                            ) : (!isOwner && !isFriend) && (
                                                <div className="mt-4 sm:mt-6">
                                                    <button
                                                        className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                                                        onClick={handleSendFriendRequest}
                                                    >
                                                        <UserRoundPlus className="w-5 h-5 mr-2" />
                                                        Send Friend Request
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 sm:gap-6 text-slate-300 text-sm sm:text-base">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                                <span>NA Region</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                                <span>Mar 2023</span>
                                            </div>
                                        </div>

                                        {playerInfo?.player.Player?.description && (
                                            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mt-3 sm:mt-4">
                                                {playerInfo.player.Player.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Rank */}
                                <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors p-6 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                            <Trophy className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Rank</p>
                                            <p className="text-white text-2xl font-bold">
                                                {playerInfo?.player.Player?.rank?.toUpperCase() || 'Unranked'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors p-6 rounded-xl">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                            <Users className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div className="items-center gap-2 flex-1">
                                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Availability</p>
                                            <div className="flex items-center gap-2 w-full">
                                                {isOwner ? (
                                                    <select
                                                        className="text-white text-2xl font-bold bg-transparent border-none focus:outline-none cursor-pointer w-full"
                                                        defaultValue={playerInfo?.player.Player?.availability || 'Available'}
                                                        onChange={async (e) => {
                                                            const response = await fetch(`/api/profile/${playerInfo?.player.Player?.userId}`, {
                                                                method: 'PUT',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ availability: e.target.value }),
                                                            })
                                                            await response.json()
                                                        }}
                                                    >
                                                        <option className="text-white bg-slate-800" value="Available">Available</option>
                                                        <option className="text-white bg-slate-800" value="Not available">Not available</option>
                                                    </select>
                                                ) : (
                                                    <span className="text-white text-2xl font-bold">
                                                        {playerInfo?.player.Player?.availability || 'Available'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Roles */}
                            <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm p-8 rounded-xl">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <Gamepad2 className="w-5 h-5 text-purple-400" />
                                    </div>
                                    Main Roles
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {playerInfo?.player.Player?.roles?.map((role, index) => {
                                        const isEven = index % 2 === 0;
                                        const colorClass = isEven
                                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30'
                                            : 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30';

                                        return (
                                            <span
                                                key={index}
                                                className={`inline-block border px-6 py-3 text-base font-medium rounded-lg transition-colors ${colorClass}`}
                                            >
                                                {role}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    )
}
export default ProfileComponent