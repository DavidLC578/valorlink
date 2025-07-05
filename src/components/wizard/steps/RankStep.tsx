'use client';

import { useEffect, useState } from 'react';
import ranks from '@/libs/data/ranks.json';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/types';

export default function RankStep({ data, setData, next, prev }: StepProps) {
    const [selected, setSelected] = useState<string>(data.rank || '');

    const handleSelect = (rankId: string) => {
        setSelected(rankId);
    };

    const handleContinue = () => {
        if (!selected) return;
        setData({ ...data, rank: selected });
        next();
    };

    useEffect(() => {
        if (data.rank) setSelected(data.rank);
    }, [data.rank]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Select your rank</h2>
                <p className="text-gray-400">What's your current competitive rank?</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                {ranks.map((rank) => {
                    const isSelected = selected === rank.id;
                    return (
                        <motion.button
                            key={rank.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(rank.id)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 text-center ${isSelected
                                ? 'bg-purple-900/30 border-purple-500/50'
                                : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/30'
                                }`}
                        >
                            <div className="font-medium text-white">{rank.name}</div>
                        </motion.button>
                    );
                })}
            </div>
            <div className="flex justify-between">
                <button onClick={prev} className="text-sm text-gray-600 hover:underline">
                    ← Back
                </button>

                <button
                    onClick={handleContinue}
                    disabled={!selected}
                    className={`px-4 py-2 rounded-lg text-white transition ${!selected ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                >
                    Continue →
                </button>
            </div>
        </motion.div>
    );
}
