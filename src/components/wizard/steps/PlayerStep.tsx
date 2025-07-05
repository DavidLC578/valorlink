'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import regions from '@/libs/data/regions.json';
import roles from '@/libs/data/roles.json';
import ranks from '@/libs/data/ranks.json';
import { useRouter } from 'next/navigation';
import { StepProps } from '@/types/types';

export default function PlayerStep({ data, setData, prev }: StepProps) {
    const [alias, setAlias] = useState(data.alias || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (!alias.trim()) {
            setError('Alias is required');
            return;
        }

        setLoading(true);
        setError('')
        try {
            const res = await fetch('/api/profile/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, alias: alias.trim() }),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || 'Error saving profile');
            }

            router.push('/home');
        } catch (err) {
            console.error(err as Error);
            setError((err as Error).message || 'Something went wrong');
        } finally {
            setLoading(false);
        }


    };

    const selectedRegion = regions.find((r) => r.id === data.region);
    const selectedRoles = roles.filter((r) => data.roles?.includes(r.id));
    const selectedRank = ranks.find((r) => r.id === data.rank);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">Alias and Confirmation</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Valorant Alias</label>
                <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="Ej: TenZ#1337"
                    className="w-full p-2 border rounded-lg"
                />
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 mb-6 text-sm">
                <p><strong>Region:</strong> {selectedRegion?.emoji} {selectedRegion?.name}</p>
                <p><strong>Roles:</strong> {selectedRoles.map((r) => `${r.emoji} ${r.name}`).join(', ')}</p>
                <p><strong>Rank:</strong> {selectedRank?.name}</p>
            </div>
            <div className="flex justify-between items-center">
                <button onClick={prev} className="text-sm text-gray-600 hover:underline">
                    ← Back
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg text-white transition ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                >
                    {loading ? 'Saving...' : 'Save profile'}
                </button>
            </div>
        </motion.div>
    );
}
