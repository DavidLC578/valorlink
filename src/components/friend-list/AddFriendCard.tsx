"use client";

import { BellRing, Loader2, UserRoundPlus, X } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AddFriendCard() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleAddFriend = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!username.trim()) {
            setMessage({ text: "Please enter a username", type: "error" });
            return;
        }

        setIsLoading(true);
        
        try {
            const res = await fetch("api/friends/request/username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });
            
            const data = await res.json();
            setMessage({ 
                text: data.message, 
                type: res.ok ? "success" : "error" 
            });
            
            if (res.ok) {
                setUsername("");
                // Auto-hide success message after 5 seconds
                setTimeout(() => setMessage({ text: "", type: "" }), 5000);
            }
        } catch (error) {
            setMessage({ 
                text: "Failed to send friend request. Please try again.", 
                type: "error" 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const messageStyles = {
        success: "bg-green-900/30 border-green-800 text-green-300",
        error: "bg-red-900/30 border-red-800 text-red-300",
        info: "bg-blue-900/30 border-blue-800 text-blue-300"
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 flex flex-col gap-4">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <UserRoundPlus className="w-6 h-6 text-purple-400" />
                    <h1 className="text-lg font-bold text-left">Add friend</h1>
                </div>
                <form 
                    className="flex flex-col gap-3" 
                    onSubmit={handleAddFriend}
                >
                    <div className="flex items-center gap-2">
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-slate-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                            value={username} 
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (message.text) setMessage({ text: "", type: "" });
                            }}
                            disabled={isLoading}
                            aria-label="Friend's username"
                        />
                        <button 
                            type="submit" 
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={isLoading || !username.trim()}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="sr-only">Sending...</span>
                                </>
                            ) : (
                                <span>Send</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            {message.text && (
                <div 
                    className={`mt-1 p-3 rounded-lg border text-sm flex items-start gap-2 ${messageStyles[message.type as keyof typeof messageStyles] || messageStyles.info}`}
                    role="alert"
                >
                    <BellRing className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="flex-1">{message.text}</span>
                    <button
                        type="button"
                        className="text-inherit hover:opacity-80 ml-2"
                        onClick={() => setMessage({ text: "", type: "" })}
                        aria-label="Dismiss message"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    )
}