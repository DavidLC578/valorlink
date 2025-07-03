import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ArrowRight, CheckCircle, Users, MessageCircle, Filter } from "lucide-react"

export default function MainPage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-950 to-pink-900/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block mb-6 px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full text-sm font-medium">
              🎮 New: Find teammates in seconds
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                ideal teammates
              </span>{" "}
              for Valorant
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Connect with like-minded players, use smart filters, and chat directly from the platform.
              Rank up with your new team!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-md">
                Find Players
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-8 py-3 text-lg text-gray-300 border border-gray-600 hover:bg-gray-800 hover:text-white rounded-md">
                How It Works
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No ads or spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>100% gaming community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Features designed for{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                real players
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect, filter, chat, and play. All from a single platform for competitive gaming lovers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Find Teammates</h3>
              <p className="text-gray-300">
                Explore compatible players by rank, role, language, and playstyle. Never play alone again.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Filters</h3>
              <p className="text-gray-300">
                Filter by region, favorite agent, availability, and more. Find your perfect match.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Real-time Chat</h3>
              <p className="text-gray-300">
                Instantly connect with players you're interested in. Plan games and chat directly in the app.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main >
  )
}
