const tips = [
    "Use voice chat to improve coordination.",
    "Look for teammates with similar rank for competitive play.",
    "Add roles to your profile: support, entry, lurker...",
    "Avoid playing when tilted. Take breaks between matches."
]

export default function TipsSection() {
    return (
        <div className="bg-gray-800/40 border border-gray-700 p-6 rounded-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Tips to Enhance Your Experience</h2>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
                {tips.map((tip, index) => (
                    <li key={index} className="hover:text-white transition">{tip}</li>
                ))}
            </ul>
        </div>
    )
}
