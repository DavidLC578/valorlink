import Link from "next/link";

export default function QuickActions() {
    return (
        <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">What would you like to do today?</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Link href="/find-players" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg transition cursor-pointer">
                    Find Players
                </Link>
                <Link href="/friend-list" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg text-lg transition cursor-pointer">
                    Friend List
                </Link>
                <Link href="/profile/create" className="bg-gray-800 border border-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg transition cursor-pointer">
                    Edit Profile
                </Link>
            </div>
        </div>
    )
}