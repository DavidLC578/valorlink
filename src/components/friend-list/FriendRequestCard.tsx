'use client'
import { Player } from "@/generated/prisma"
import { Check, Clock, Loader2, UserRoundPlus, X } from "lucide-react"
import { useEffect, useState } from "react"
import PaginationButtons from "./PaginationButtons"
import UserIcon from "../UserIcon"

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface RequestState {
    [key: string]: {
        status: RequestStatus;
        type?: 'accept' | 'reject';
    };
}

export default function FriendRequestCard() {
    const [activeTab, setActiveTab] = useState('incoming')

    const [page, setPage] = useState(1);
    const [outgoing, setOutgoing] = useState<Player[]>([]);
    const [incoming, setIncoming] = useState<Player[]>([]);
    const [totalIncoming, setTotalIncoming] = useState(1);
    const [totalOutgoing, setTotalOutgoing] = useState(1);
    const [isLoading, setIsLoading] = useState({
        incoming: false,
        outgoing: false
    });
    const [requestStates, setRequestStates] = useState<RequestState>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleOutgoing = async () => {
            try {
                setIsLoading(prev => ({ ...prev, outgoing: true }));
                const res = await fetch(`/api/friends/outgoing?page=${page}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (!res.ok) {
                    throw new Error('Failed to fetch outgoing requests');
                }
                
                const data = await res.json();
                setOutgoing(data.players);
                if (data.total > 0) setTotalOutgoing(data.total);
                setError(null);
            } catch (err) {
                console.error('Error fetching outgoing requests:', err);
                setError('Failed to load outgoing requests. Please try again.');
            } finally {
                setIsLoading(prev => ({ ...prev, outgoing: false }));
            }
        };
        handleOutgoing();
    }, [page]);

    useEffect(() => {
        const handleIncoming = async () => {
            try {
                setIsLoading(prev => ({ ...prev, incoming: true }));
                const res = await fetch(`/api/friends/incoming?page=${page}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (!res.ok) {
                    throw new Error('Failed to fetch incoming requests');
                }
                
                const data = await res.json();
                setIncoming(data.players);
                if (data.total > 0) setTotalIncoming(data.total);
                setError(null);
            } catch (err) {
                console.error('Error fetching incoming requests:', err);
                setError('Failed to load incoming requests. Please try again.');
            } finally {
                setIsLoading(prev => ({ ...prev, incoming: false }));
            }
        };
        handleIncoming();
    }, [page]);

    const updateRequestState = (id: string, status: RequestStatus, type?: 'accept' | 'reject') => {
        setRequestStates(prev => ({
            ...prev,
            [id]: { status, type }
        }));
    };

    const handleAccept = async (senderId: string) => {
        updateRequestState(senderId, 'loading', 'accept');
        
        try {
            const res = await fetch(`/api/friends/incoming/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ senderId }),
            });
            
            if (res.ok) {
                updateRequestState(senderId, 'success', 'accept');
                // Small delay to show success state before removing
                setTimeout(() => {
                    setIncoming(prev => prev.filter((player) => player.userId !== senderId));
                    setRequestStates(prev => {
                        const newStates = { ...prev };
                        delete newStates[senderId];
                        return newStates;
                    });
                }, 500);
            } else {
                throw new Error('Failed to accept request');
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
            updateRequestState(senderId, 'error', 'accept');
            // Reset error state after a delay
            setTimeout(() => {
                updateRequestState(senderId, 'idle');
            }, 3000);
        }
    };

    const handleRejectIncoming = async (senderId: string) => {
        updateRequestState(senderId, 'loading', 'reject');
        
        try {
            const res = await fetch(`/api/friends/incoming/reject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ senderId }),
            });
            
            if (res.ok) {
                updateRequestState(senderId, 'success', 'reject');
                // Small delay to show success state before removing
                setTimeout(() => {
                    setIncoming(prev => prev.filter((player) => player.userId !== senderId));
                    setRequestStates(prev => {
                        const newStates = { ...prev };
                        delete newStates[senderId];
                        return newStates;
                    });
                }, 500);
            } else {
                throw new Error('Failed to reject request');
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
            updateRequestState(senderId, 'error', 'reject');
            // Reset error state after a delay
            setTimeout(() => {
                updateRequestState(senderId, 'idle');
            }, 3000);
        }
    };

    const handleRejectOutgoing = async (receiverId: string) => {
        updateRequestState(receiverId, 'loading', 'reject');
        
        try {
            const res = await fetch(`/api/friends/outgoing/reject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ receiverId }),
            });
            
            if (res.ok) {
                updateRequestState(receiverId, 'success', 'reject');
                // Small delay to show success state before removing
                setTimeout(() => {
                    setOutgoing(prev => prev.filter((player) => player.userId !== receiverId));
                    setRequestStates(prev => {
                        const newStates = { ...prev };
                        delete newStates[receiverId];
                        return newStates;
                    });
                }, 500);
            } else {
                throw new Error('Failed to cancel request');
            }
        } catch (error) {
            console.error('Error canceling friend request:', error);
            updateRequestState(receiverId, 'error', 'reject');
            // Reset error state after a delay
            setTimeout(() => {
                updateRequestState(receiverId, 'idle');
            }, 3000);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Friend Request</h2>
                </div>
            </div>

            <div className="w-full">
                {error && (
                    <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-300 rounded-lg text-sm flex items-center gap-2">
                        <X className="h-4 w-4 flex-shrink-0" />
                        <span>{error}</span>
                        <button 
                            onClick={() => setError(null)}
                            className="ml-auto text-inherit hover:opacity-80"
                            aria-label="Dismiss error"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}
                
                <div className="grid grid-cols-2 bg-slate-700 p-1 h-10 rounded-lg mb-6 gap-2">
                    <button
                        onClick={() => { setActiveTab('incoming'); setPage(1) }}
                        className={`text-sm font-medium rounded-md transition-colors ${activeTab === 'incoming' 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-300 hover:bg-slate-600'}`}
                        disabled={isLoading.incoming || isLoading.outgoing}
                    >
                        Incoming
                    </button>
                    <button
                        onClick={() => { setActiveTab('outgoing'); setPage(1) }}
                        className={`text-sm font-medium rounded-md transition-colors ${activeTab === 'outgoing' 
                            ? 'bg-purple-600 text-white' 
                            : 'text-gray-300 hover:bg-slate-600'}`}
                        disabled={isLoading.incoming || isLoading.outgoing}
                    >
                        {isLoading.outgoing && activeTab === 'outgoing' ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Loading...
                            </span>
                        ) : 'Outgoing'}
                    </button>
                </div>

                <div className="mt-0 bg-slate-700 p-3 rounded-lg">
                    {activeTab === 'incoming' ? (
                        isLoading.incoming ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                            </div>
                        ) : incoming.length > 0 ? (
                            <div className="space-y-3">
                                {incoming.map((player) => {
                                    const requestState = requestStates[player.userId] || { status: 'idle' as const };
                                    const isProcessing = requestState.status === 'loading' || requestState.status === 'success';
                                    
                                    return (
                                        <div 
                                            key={player.userId} 
                                            className={`flex items-center justify-between p-3 rounded-lg transition-all ${isProcessing ? 'opacity-75' : 'bg-slate-700 hover:bg-slate-650'}`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <UserIcon alias={player.alias} className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12" />
                                                <span className="font-medium truncate">{player.alias}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => !isProcessing && handleAccept(player.userId)}
                                                    className={`p-2 rounded-full transition-colors ${requestState.status === 'error' && requestState.type === 'accept' 
                                                        ? 'bg-red-600' 
                                                        : 'bg-green-600 hover:bg-green-700'} 
                                                        ${isProcessing && (!requestState.type || requestState.type === 'accept') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    title={requestState.status === 'error' && requestState.type === 'accept' ? 'Retry accept' : 'Accept request'}
                                                    disabled={isProcessing && (!requestState.type || requestState.type === 'accept')}
                                                >
                                                    {requestState.status === 'loading' && requestState.type === 'accept' ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : requestState.status === 'error' && requestState.type === 'accept' ? (
                                                        <X className="h-4 w-4" />
                                                    ) : (
                                                        <Check className="h-4 w-4" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => !isProcessing && handleRejectIncoming(player.userId)}
                                                    className={`p-2 rounded-full transition-colors ${requestState.status === 'error' && requestState.type === 'reject' 
                                                        ? 'bg-amber-600' 
                                                        : 'bg-red-600 hover:bg-red-700'} 
                                                        ${isProcessing && requestState.type === 'reject' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    title={requestState.status === 'error' && requestState.type === 'reject' ? 'Retry reject' : 'Reject request'}
                                                    disabled={isProcessing && requestState.type === 'reject'}
                                                >
                                                    {requestState.status === 'loading' && requestState.type === 'reject' ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : requestState.status === 'error' && requestState.type === 'reject' ? (
                                                        <X className="h-4 w-4" />
                                                    ) : (
                                                        <X className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <UserRoundPlus className="h-10 w-10 text-gray-600" />
                                    <p>No incoming friend requests</p>
                                    <p className="text-sm text-gray-500">When you receive a request, it will appear here</p>
                                </div>
                            </div>
                        )
                    ) : (
                        isLoading.outgoing ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                            </div>
                        ) : outgoing.length > 0 ? (
                            <div className="space-y-3">
                                {outgoing.map((player) => {
                                    const requestState = requestStates[player.userId] || { status: 'idle' as const };
                                    const isProcessing = requestState.status === 'loading' || requestState.status === 'success';
                                    
                                    return (
                                        <div 
                                            key={player.userId} 
                                            className={`flex items-center justify-between p-3 rounded-lg transition-all ${isProcessing ? 'opacity-75' : 'bg-slate-700 hover:bg-slate-650'}`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <UserIcon alias={player.alias} className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12" />
                                                <span className="font-medium truncate">{player.alias}</span>
                                                <span className="text-xs text-gray-400 ml-1">Pending</span>
                                            </div>
                                            <button
                                                onClick={() => !isProcessing && handleRejectOutgoing(player.userId)}
                                                className={`p-2 rounded-full transition-colors ${requestState.status === 'error' && requestState.type === 'reject' 
                                                    ? 'bg-amber-600' 
                                                    : 'bg-red-600 hover:bg-red-700'} 
                                                    ${isProcessing && requestState.type === 'reject' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                title={requestState.status === 'error' && requestState.type === 'reject' ? 'Retry cancel' : 'Cancel request'}
                                                disabled={isProcessing && requestState.type === 'reject'}
                                            >
                                                {requestState.status === 'loading' && requestState.type === 'reject' ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : requestState.status === 'error' && requestState.type === 'reject' ? (
                                                    <X className="h-4 w-4" />
                                                ) : (
                                                    <X className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <UserRoundPlus className="h-10 w-10 text-gray-600" />
                                    <p>No outgoing friend requests</p>
                                    <p className="text-sm text-gray-500">Add friends to see your pending requests here</p>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Pagination */}
                <PaginationButtons
                    page={page}
                    setPage={setPage}
                    activeTab={activeTab}
                    totalIncoming={totalIncoming}
                    totalOutgoing={totalOutgoing}
                />
            </div>
        </div >
    )
}