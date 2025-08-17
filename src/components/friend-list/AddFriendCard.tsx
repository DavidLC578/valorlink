import { UserRoundPlus } from "lucide-react";

export default function AddFriendCard() {
    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600">
            <div className="flex items-center gap-2 mb-4">
                <UserRoundPlus className="w-6 h-6 text-purple-400" />
                <h1 className="text-lg font-bold text-left">Add friend</h1>
            </div>
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Enter username" className="w-full px-4 py-2 rounded-lg border border-gray-500" />
                <button className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold">Send</button>
            </div>
        </div>
    )
}