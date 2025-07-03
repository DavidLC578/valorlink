import Link from "next/link"
import { Zap } from "lucide-react"
function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-gray-950 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ValorLink
                            </span>
                        </div>
                        <p className="text-gray-400">Find players that best fit your needs</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white">Product</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    API
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Status
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Valorlink. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer