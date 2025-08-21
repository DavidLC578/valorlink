'use client'
import { Player } from "@/generated/prisma";
import { useState, useEffect } from "react";
import UserIcon from "../UserIcon";

export default function MyFriendsCard() {
    const [friendsData, setFriendsData] = useState<Player[]>([])

    useEffect(() => {
        const fetchFriends = async () => {
            const res = await fetch(`/api/friends`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            console.log(data)
            setFriendsData(data)
        }
        fetchFriends()
    }, [])

    return (
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
            <h2 className="text-xl font-bold mb-4">My Friends ({friendsData.length})</h2>

            {/* Friend Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {friendsData.map((friend) => (
                    <div
                        key={friend.id}
                        className="bg-slate-700 p-4 rounded-2xl shadow-lg flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <div className="flex items-start space-x-3">
                                <UserIcon alias={friend.alias} className="w-12 h-12 sm:w-11 sm:h-12 md:w-11 md:h-11" />
                                <div className="min-w-0">
                                    <p className="text-slate-100 text-lg truncate">{friend.alias}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start space-y-1 pt-1">
                                <span className="text-purple-400 font-semibold">
                                    {friend.rank.toUpperCase()}
                                </span>
                                <span className="text-slate-300 text-sm">
                                    {friend.region.toUpperCase()} Region
                                </span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <h4 className="text-slate-400 text-sm font-medium mb-2">Roles</h4>
                            <div className="flex flex-wrap gap-2">
                                {friend.roles.map((role) => (
                                    <span
                                        key={role}
                                        className="bg-slate-800/70 text-purple-300 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-500/30"
                                    >
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="flex mt-4 space-x-2">
                            <button className="flex-1 bg-purple-500 hover:bg-purple-700 px-3 py-2 rounded-xl font-semibold">
                                Message
                            </button>
                            <button className="border border-solid border-slate-600 hover:border-gray-500 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-xl">
                                Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

