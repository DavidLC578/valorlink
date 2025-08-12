'use client'
import { useEffect, useState } from "react";

interface DropdownCardProps {
    data: {
        id: string;
        name: string;
        tier?: number;
        emoji?: string;
    }[];
    label: string;
    name: string;
    onSelect: (name: string, value: string) => void;
}

export default function DropdownCard({ data, label, name, onSelect }: DropdownCardProps) {
    return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 sm:p-6 w-full">
            <select
                className="w-full bg-gray-800 px-3 py-2 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500"
                defaultValue=""
                onChange={(e) => onSelect(name, e.target.value)}
            >
                <option value="" disabled>
                    Select {label}
                </option>
                {data.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    )
}