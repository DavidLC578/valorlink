'use client'
import { Player } from "@/generated/prisma"
import { Check, Clock, MapPin, Search, Trophy, X } from "lucide-react"
import { useEffect, useState } from "react"
import PaginationButtons from "./PaginationButtons"
import UserIcon from "../UserIcon"

export default function FriendRequestCard() {
    const [activeTab, setActiveTab] = useState('incoming')

    const [page, setPage] = useState(1)
    const [outgoing, setOutgoing] = useState<Player[]>([])
    const [incoming, setIncoming] = useState<Player[]>([])
    const [totalIncoming, setTotalIncoming] = useState(1)
    const [totalOutgoing, setTotalOutgoing] = useState(1)

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
            if (data.total > 0) setTotalOutgoing(data.total)
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
            if (data.total > 0) setTotalIncoming(data.total)
        }
        handleIncoming()
    }, [page])

    const handleAccept = async (senderId: string) => {
        const res = await fetch(`/api/friends/incoming/accept`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId }),
        })
        if (res.status === 200) {
            setIncoming((prev) => prev.filter((player) => player.userId !== senderId))
        }
    }

    const handleRejectIncoming = async (senderId: string) => {
        const res = await fetch(`/api/friends/incoming/reject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId }),
        })
        if (res.status === 200) {
            setIncoming((prev) => prev.filter((player) => player.userId !== senderId))
        }
    }

    const handleRejectOutgoing = async (receiverId: string) => {
        const res = await fetch(`/api/friends/outgoing/reject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ receiverId }),
        })
        if (res.status === 200) {
            setOutgoing((prev) => prev.filter((player) => player.userId !== receiverId))
        }
    }

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Friend Request</h2>
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
                                        <UserIcon alias={player.alias} className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12" />
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
                                        <button onClick={() => handleAccept(player.userId)}
                                            className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold">
                                            <Check className="w-4 h-4 text-white" />
                                        </button>
                                        <button onClick={() => handleRejectIncoming(player.userId)}
                                            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold">
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
                                        <UserIcon alias={player.alias} className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12" />
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
                                        <button onClick={() => handleRejectOutgoing(player.userId)}
                                            className="px-2 py-2 rounded-lg bg-red-500 text-white font-semibold">
                                            <X className="w-4 h-4 text-white" />
                                        </button>
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