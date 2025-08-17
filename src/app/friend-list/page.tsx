import FriendListGrid from "@/components/friend-list/FriendListGrid";
import { Users } from "lucide-react";

export default function FriendList() {
    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-7xl my-10">
                <div className="flex items-center gap-2 mb-4 text-left ">
                    <Users className="w-8 h-8 text-purple-400" />
                    <h1 className="font-bold text-3xl">Friends</h1>
                </div>
                <FriendListGrid />
            </div>
        </main>
    )
}
