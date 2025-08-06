'use client'
import { PlayerInfo } from "@/types/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MapPin, Calendar, Trophy, Users, Gamepad2, Star } from "lucide-react"


function ProfileComponent() {

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { username } = useParams()

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/profile/${username}`);
                if (!res.ok) {
                    throw new Error('Failed to load profile');
                }
                const data = await res.json();
                setPlayerInfo(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                console.error('Error fetching player:', err);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchPlayer();
        }
    }, [username])

    return (
        <>
            <main className="min-h-screen">
                <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">

                    {/* Profile Header */}
                    <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm p-8 rounded-xl">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                                        <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                                            <span className="text-4xl font-bold text-white">
                                                {playerInfo?.player.username?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-2">
                                        <Star className="w-4 h-4 text-white fill-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-2">{playerInfo?.player.username}</h1>
                                    <p className="text-xl text-purple-400 mb-4">@{playerInfo?.player.username}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>NA Region</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined March 2023</span>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                                    {playerInfo?.player.Player?.description}
                                </p>
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
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Availability</p>
                                    <p className="text-white text-2xl font-bold">
                                        {playerInfo?.player.Player?.availability?.toUpperCase() || 'Available'}
                                    </p>
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

        </>
    )
}
export default ProfileComponent