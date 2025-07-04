import Link from "next/link"
import { Zap } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function Navbar() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ValorLink
                        </span>
                    </Link>
                    {
                        !session?.user ? (
                            <>
                                <nav className="hidden md:flex items-center space-x-8">
                                    <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                                    <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
                                    <Link href="#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                                </nav>

                                <div>
                                    <Link
                                        href="/auth/signin"
                                        className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md border-0"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </>
                        ) :
                            (
                                <>
                                    <nav className="hidden md:flex items-center space-x-8">
                                        <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                                        <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
                                        <Link href="#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                                    </nav>

                                    <div className="flex items-center space-x-2">
                                        <p className="text-lg text-gray-300">{session.user.name}</p>
                                        <span className="bg-gray-800 h-6 w-px" aria-hidden="true"></span>
                                        <Link
                                            href="/api/auth/signout"
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-md border-0 text-sm font-medium"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </header >
    )
}

export default Navbar