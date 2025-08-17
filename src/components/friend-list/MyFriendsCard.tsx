'use client'
import { useState } from "react";
// Datos de ejemplo tipo JSON
const friendsData = [
    {
        id: 1,
        name: "Alex",
        username: "@AlexGamer",
        rank: "GOLD2",
        region: "NA Region",
        joined: "Jan 2023",
    },
    {
        id: 2,
        name: "Sarah",
        username: "@SarahPro",
        rank: "PLATINUM1",
        region: "EU Region",
        joined: "Mar 2023",
    },
    {
        id: 3,
        name: "Mike",
        username: "@MikeElite",
        rank: "DIAMOND3",
        region: "NA Region",
        joined: "Feb 2023",
    },
    {
        id: 4,
        name: "Emma",
        username: "@EmmaStar",
        rank: "SILVER1",
        region: "EU Region",
        joined: "Apr 2023",
    },
];

const FriendsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const friendsPerPage = 3;

    // Calculate the number of visible friends per page
    const indexOfLast = currentPage * friendsPerPage;
    const indexOfFirst = indexOfLast - friendsPerPage;
    const currentFriends = friendsData.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(friendsData.length / friendsPerPage);

    return (
        <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
            <h2 className="text-xl font-bold mb-4">My Friends ({friendsData.length})</h2>

            {/* Friend Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentFriends.map((friend) => (
                    <div
                        key={friend.id}
                        className="bg-slate-700 p-4 rounded-2xl shadow-lg flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 font-bold">
                                    {friend.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold">{friend.name}</p>
                                    <p className="text-gray-400 text-sm">{friend.username}</p>
                                </div>
                            </div>

                            <p className="text-purple-400 font-bold">{friend.rank}</p>
                            <p className="text-gray-400 text-sm">{friend.region}</p>
                            <p className="text-gray-500 text-xs">Joined {friend.joined}</p>
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

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-purple-600" : "bg-gray-700"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FriendsList;
