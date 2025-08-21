interface UserIconProps {
  alias: string;
  className?: string;
}

export default function UserIcon({ alias, className = '' }: UserIconProps) {
    return (
        <div className={`${className} rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1`}>
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-xl sm:text-xl md:text-xl font-bold text-white">
                    {alias.charAt(0).toUpperCase()}
                </span>
            </div>
        </div>
    )
}