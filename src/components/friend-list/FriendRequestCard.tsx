'use client'
import { Player } from "@/generated/prisma"
import { Check, Clock, MapPin, Search, Trophy, X } from "lucide-react"
import { useEffect, useState } from "react"
import PaginationButtons from "./PaginationButtons"

export default function FriendRequestCard() {
    const [activeTab, setActiveTab] = useState('incoming')

    const [page, setPage] = useState(1)
    const [outgoing, setOutgoing] = useState<Player[]>([])
    const [incoming, setIncoming] = useState<Player[]>([])
    const [totalIncoming, setTotalIncoming] = useState(0)
    const [totalOutgoing, setTotalOutgoing] = useState(0)

    useEffect(() => {
        const handleOutgoing = async () => {
            const res = await fetch(`/api/friends/outgoing?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            setOutgoing(data.players)
            setTotalOutgoing(data.total)
        }
        handleOutgoing()
    }, [page])

    useEffect(() => {
        const handleIncoming = async () => {
            const res = await fetch(`/api/friends/incoming?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            setIncoming(data.players)
            setTotalIncoming(data.total)
        }
        handleIncoming()
    }, [page])

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Friend Request</h2>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search friend..."
                        className="bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-2 bg-slate-700 p-1 h-10 rounded-lg mb-6 gap-2">
                    <button
                        onClick={() => { setActiveTab('incoming'); setPage(1) }}
                        className={`text-sm font-medium rounded-md ${activeTab === 'incoming' ? 'bg-purple-500 text-white' : ' text-white'}`}
                    >
                        Incoming
                    </button>
                    <button
                        onClick={() => { setActiveTab('outgoing'); setPage(1) }}
                        className={`text-sm font-medium rounded-md ${activeTab === 'outgoing' ? 'bg-purple-500 text-white' : ' text-white'}`}
                    >
                        Outgoing
                    </button>
                </div>

                <div className="mt-0 bg-slate-700 p-3 rounded-lg">
                    {activeTab === 'incoming' ? (
                        incoming.length === 0 ? (
                            <p className="text-white text-center">No friend requests</p>
                        ) : (
                            incoming.map((player) => (
                                <div className="flex gap-2 items-center justify-between" key={player.id}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 sm:w-11 sm:h-12 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                                                <span className="text-xl sm:text-xl md:text-xl font-bold text-white">
                                                    {player.alias.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold mb-1">{player.alias}</p>
                                            <p>@{player.alias}</p>
                                            <div className="flex gap-7">
                                                <div className="flex items-center gap-1">
                                                    <Trophy className="w-4 h-4 text-purple-400" />
                                                    <p className="text-slate-300/70">{player.rank.charAt(0).toUpperCase() + player.rank.slice(1)}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-purple-400" />
                                                    <p className="text-slate-300/70">{player.region.toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold">
                                            <Check className="w-4 h-4 text-white" />
                                        </button>
                                        <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold">
                                            <X className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>
                            )))) : (
                        outgoing.length === 0 ? (
                            <p className="text-white text-center">No friend requests</p>
                        ) : (
                            outgoing.map((player) => (
                                <div className="flex gap-2 items-center justify-between" key={player.id}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-12 sm:w-11 sm:h-12 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                                                <span className="text-xl sm:text-xl md:text-xl font-bold text-white">
                                                    {player.alias.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold mb-1">{player.alias}</p>
                                            <div className="flex gap-7">
                                                <div className="flex items-center gap-1">
                                                    <Trophy className="w-4 h-4 text-purple-400" />
                                                    <p className="text-slate-300/70">{player.rank.charAt(0).toUpperCase() + player.rank.slice(1)}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4 text-purple-400" />
                                                    <p className="text-slate-300/70">{player.region.toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm py-1 px-2 rounded-lg bg-slate-400/20">
                                            Pending
                                        </p>
                                    </div>
                                </div>
                            ))))}
                </div>

                {/* Paginación */}
                <PaginationButtons
                    page={page}
                    setPage={setPage}
                    activeTab={activeTab}
                    totalIncoming={totalIncoming}
                    totalOutgoing={totalOutgoing}
                />
            </div>
        </div >
    )
}