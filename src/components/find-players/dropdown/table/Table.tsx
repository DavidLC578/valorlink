import { Player } from "@/generated/prisma";
import Link from "next/link";

export default function Table({ players }: { players: Player[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3.5 text-left text-md font-semibold text-gray-300">
                            Alias
                        </th>
                        <th scope="col" className="px-6 py-3.5 text-left text-md font-semibold text-gray-300">
                            Región
                        </th>
                        <th scope="col" className="px-6 py-3.5 text-left text-md font-semibold text-gray-300">
                            Rol
                        </th>
                        <th scope="col" className="px-6 py-3.5 text-left text-md font-semibold text-gray-300">
                            Rango
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-900">
                    {players.map((player) => (
                        <tr key={player.userId} className="hover:bg-gray-800 transition-colors duration-150">
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                    <Link href={`/profile/${player.userId}`} className="ml-4">
                                        <div className="text-md font-medium text-white">{player.alias}</div>
                                    </Link>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="text-md text-gray-300">{player.region.toUpperCase() || 'No especificada'}</div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex flex-wrap gap-3">
                                    {player.roles?.map((role, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center rounded-md bg-slate-600 px-3 py-1 text-md font-semibold text-white shadow-sm"
                                        >
                                            {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                    <span className="text-md font-medium text-white">{player.rank.charAt(0).toUpperCase() + player.rank.slice(1) || 'Sin rango'}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
