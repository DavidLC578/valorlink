const fakePlayers = [
    {
        name: "SovaMain#EU",
        rank: "Diamond 2",
        agent: "Sova",
        availability: "Afternoons",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sova"
    },
    {
        name: "JettQueen#SP",
        rank: "Platinum 1",
        agent: "Jett",
        availability: "Weekends",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jett"
    },
    {
        name: "OmenGod#Night",
        rank: "Immortal",
        agent: "Omen",
        availability: "Nights",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omen"
    }
]

export default function SuggestedPlayers() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">
                Recommended Players for You
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fakePlayers.map((player, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 hover:bg-gray-800/80 transition transform hover:scale-105 cursor-pointer"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img src={player.image} alt={player.name} className="w-14 h-14 rounded-full" />
                            <div>
                                <h3 className="text-xl font-semibold">{player.name}</h3>
                                <p className="text-sm text-gray-400">{player.rank}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300">
                            Favorite agent: <span className="text-white">{player.agent}</span><br />
                            Availability: {player.availability}
                        </p>
                        <button className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-md transition cursor-pointer">
                            Send friend request
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
