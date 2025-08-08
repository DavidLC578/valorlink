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
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
            <select
                className="w-full"
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