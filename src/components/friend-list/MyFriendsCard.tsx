'use client'
import { Player } from "@/generated/prisma";
import { useState, useEffect } from "react";
import UserIcon from "../UserIcon";

export default function MyFriendsCard() {
    const [friendsData, setFriendsData] = useState<Player[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchFriends = async () => {
            if (isInitialLoading) {
                setIsLoading(true)
            }
            try {
                const res = await fetch(`/api/friends?page=${currentPage}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data = await res.json()
                setFriendsData(data.friends || [])
                setTotalPages(Math.ceil((data.total || 1) / 3))
            } catch (error) {
                console.error('Error fetching friends:', error)
            } finally {
                setIsLoading(false)
                setIsInitialLoading(false)
            }
        }
        fetchFriends()
    }, [currentPage, isInitialLoading])

    return (
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
            <h2 className="text-xl font-bold mb-4">
                My Friends
            </h2>

            {/* Friend Grid */}
            <div className="relative min-h-[300px]">
                {isInitialLoading && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
                    </div>
                )}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isInitialLoading ? 'opacity-50' : ''}`}>
                {friendsData.map((friend) => (
                    <div
                        key={friend.id}
                        className="bg-slate-700 p-4 rounded-2xl shadow-lg flex flex-col justify-between"
                    >
                        <div className="space-y-2">
                            <div className="flex items-start space-x-3">
                                <UserIcon alias={friend.alias} className="w-11 h-11 sm:w-11 sm:h-11 md:w-11 md:h-11" />
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
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isLoading}
                    className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                    Previous
                </button>
                <div className="flex gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show max 5 pages in navigation
                        let pageNum = i + 1;
                        if (totalPages > 5) {
                            // If there are more than 5 pages, show pages around the current page
                            if (currentPage > 3) {
                                pageNum = currentPage - 2 + i;
                                if (pageNum > totalPages) return null;
                            }
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1 rounded ${currentPage === pageNum ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"}`}
                                disabled={isLoading}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                </div>
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className={`px-4 py-2 rounded-lg font-medium ${currentPage === totalPages || isLoading ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                    Next
                </button>
            </div >
        </div>
    );
};

