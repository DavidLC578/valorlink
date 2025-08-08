'use client'
import regions from "@/libs/data/regions.json"
import roles from "@/libs/data/roles.json"
import ranks from "@/libs/data/ranks.json"
import { useState, useEffect } from "react"
import DropdownCard from "./DropdownCard"

export default function DropdownGrid() {
    const [filters, setFilters] = useState({
        region: "",
        role: "",
        rank: ""
    });

    const handleSelect = (name: string, value: string) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (
        <div className="flex gap-4 items-center">
            <DropdownCard data={regions} label="Region" name="region" onSelect={handleSelect} />
            <DropdownCard data={roles} label="Role" name="role" onSelect={handleSelect} />
            <DropdownCard data={ranks} label="Rank" name="rank" onSelect={handleSelect} />
        </div>
    )
}