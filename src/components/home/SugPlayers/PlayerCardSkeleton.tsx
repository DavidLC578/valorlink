export default function PlayerCardSkeleton() {
    return (
        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-700 rounded"></div>
                    <div className="h-4 w-24 bg-gray-700 rounded"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-700 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
            </div>
            <div className="mt-4 w-full h-10 bg-purple-700/50 rounded-md"></div>
        </div>
    );
}
