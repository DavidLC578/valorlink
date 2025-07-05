'use client';

import { useState, useEffect } from 'react';
import roles from '@/libs/data/roles.json';
import { motion } from 'framer-motion';
import { StepProps } from '@/types/types';

export default function RoleStep({ data, setData, next, prev }: StepProps) {
    const [selected, setSelected] = useState<string[]>(data.roles || []);

    const toggleRole = (roleId: string) => {
        setSelected((prev) =>
            prev.includes(roleId) ? prev.filter((r) => r !== roleId) : [...prev, roleId]
        );
    };

    const handleContinue = () => {
        setData({ ...data, roles: selected });
        next();
    };

    useEffect(() => {
        if (data.roles) setSelected(data.roles);
    }, [data.roles]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Select your roles</h2>
                <p className="text-gray-400">Which roles do you usually play?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {roles.map((role) => {
                    const isSelected = selected.includes(role.id);
                    return (
                        <motion.button
                            key={role.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleRole(role.id)}
                            className={`p-5 rounded-xl border-2 transition-all duration-200 text-center ${isSelected
                                ? 'bg-purple-900/30 border-purple-500/50'
                                : 'bg-gray-800/50 border-gray-700 hover:border-purple-500/30'
                                }`}
                        >
                            <div className="text-4xl mb-3">{role.emoji}</div>
                            <div className="font-medium text-white">{role.name}</div>
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
                    disabled={selected.length === 0}
                    className={`px-4 py-2 rounded-lg text-white transition ${selected.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                >
                    Continue →
                </button>
            </div>
        </motion.div>
    );
}
