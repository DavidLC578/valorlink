'use client'
import regions from "@/libs/data/regions.json"
import roles from "@/libs/data/roles.json"
import ranks from "@/libs/data/ranks.json"
import DropdownCard from "./DropdownCard"

interface Filters {
    region: string;
    role: string;
    rank: string;
}

interface DropdownGridProps {
    filters: Filters;
    onFilterChange: (name: keyof Filters, value: string) => void;
}

export default function DropdownGrid({ filters, onFilterChange }: DropdownGridProps) {
    const handleSelect = (name: string, value: string) => {
        onFilterChange(name as keyof Filters, value);
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-stretch sm:items-center w-full">
            <DropdownCard data={regions} label="Region" name="region" onSelect={handleSelect} />
            <DropdownCard data={roles} label="Role" name="role" onSelect={handleSelect} />
            <DropdownCard data={ranks} label="Rank" name="rank" onSelect={handleSelect} />
        </div>
    )
}