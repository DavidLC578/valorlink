import { Trophy, Users, Flame, Target } from "lucide-react"

type StatItem = {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    bgColor?: string;
}

interface StatisticsProps {
    stats: StatItem[];
    className?: string;
}

export default function Statistics({ stats, className = '' }: StatisticsProps) {
    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ${className}`}>
            {stats.map((stat, index) => (
                <article
                    key={index}
                    className="bg-slate-800/50 border border-purple-500/20 backdrop-blur-sm p-6 rounded-xl"
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${stat.bgColor || 'bg-purple-500/20'}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                    </div>
                </article>
            ))}
        </section>
    )
}
