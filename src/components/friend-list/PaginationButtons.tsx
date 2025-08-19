'use client'
export default function PaginationButtons({
    page,
    setPage,
    activeTab,
    totalIncoming,
    totalOutgoing
}: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    activeTab: string;
    totalIncoming: number;
    totalOutgoing: number;
}) {
    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => setPage((prev: number) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg font-medium ${page === 1 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
                Previous
            </button>
            <div className="flex gap-2">
                {[...Array(activeTab === 'incoming' ? totalIncoming : totalOutgoing)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 rounded ${page === i + 1 ? "bg-purple-600" : "bg-gray-700"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={page === (activeTab === 'incoming' ? totalIncoming : totalOutgoing)}
                className={`px-4 py-2 rounded-lg font-medium ${page === (activeTab === 'incoming' ? totalIncoming : totalOutgoing) ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
                Next
            </button>
        </div >
    )
}