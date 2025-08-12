'use client';

import { useState, useEffect } from 'react';
import DropdownGrid from "@/components/find-players/dropdown/DropdownGrid";
import { Player } from '@/generated/prisma';
import Table from "@/components/find-players/dropdown/table/Table";



export default function FindPlayers() {
    const [filters, setFilters] = useState({
        region: "",
        role: "",
        rank: ""
    });
    const [players, setPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle filter changes
    const handleFilterChange = (name: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Effect to load players when filters change
    useEffect(() => {
        const fetchPlayers = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/players/find-players', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filters),
                });
                const data = await res.json();
                setPlayers(data.players || []);
            } catch (error) {
                console.error('Error loading players:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, [filters]);

    return (
        <main className="min-h-screen flex flex-col items-center py-6 px-2 sm:py-10 sm:px-6">
            <div className="w-full max-w-6xl mx-auto">
                {/* Filters section */}
                <section className="mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Find Players</h1>
                    <DropdownGrid
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </section>

                {/* Results section */}
                <section>
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">Results</h2>
                        {(filters.region || filters.role || filters.rank) && (
                            <button
                                onClick={() => setFilters({ region: "", role: "", rank: "" })}
                                className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    ) : players.length === 0 ? (
                        <p>No players found with the selected filters.</p>
                    ) : (
                        <Table players={players} />
                    )}
                </section>
            </div>
        </main>
    );
}