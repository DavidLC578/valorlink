'use client'

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        try {
            await signOut({
                redirect: false,
                callbackUrl: '/auth/signin'
            });
            router.refresh();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md border-0 text-sm font-medium cursor-pointer w-24 text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? '...' : 'Logout'}
        </button>
    );
}