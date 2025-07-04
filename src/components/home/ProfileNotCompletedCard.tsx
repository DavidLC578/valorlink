import Link from "next/link"

export default async function ProfileNotCompletedCard() {
    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">Your profile is incomplete!</h2>
                <p className="text-gray-300">
                    Complete your profile to enjoy all of ValorLink's features.
                    Help other players get to know you better and find teammates more easily.
                </p>
                <div className="pt-4">
                    <Link
                        href="/profile/edit"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg transition cursor-pointer"
                    >
                        Complete profile
                    </Link>
                </div>
            </div>
        </div>
    )
}