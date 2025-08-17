"use client";

import { BellRing, UserRoundPlus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddFriendCard() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleAddFriend = async () => {
        const res = await fetch("api/friends/request/username",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            }
        )
        console.log("Res: ", res)
        const data = await res.json()
        console.log("data: ", data)
        setMessage(data.message)
    }

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 flex flex-col gap-4 justify-between">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <UserRoundPlus className="w-6 h-6 text-purple-400" />
                    <h1 className="text-lg font-bold text-left">Add friend</h1>
                </div>
                <form className="flex items-center gap-2" action={handleAddFriend}>
                    <input type="text" placeholder="Enter username" className="w-full px-4 py-2 rounded-lg border border-gray-500"
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold">Send</button>
                </form>
            </div>
            {message && (
                <div className="mt-2 text-sm text-gray-300 border-t border-gray-600 pt-3">
                    <div className="flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-gray-400" />
                        <span>{message}</span>
                        <button
                            type="button"
                            className="ml-auto text-gray-400 hover:text-gray-200"
                            onClick={() => setMessage("")}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}