'use client'
import Link from "next/link";

export default function SignUp() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Create your account
                </h2>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="E.g. JohnDoe123"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="yourname@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-lg transition-all"
                    >
                        Sign up
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-900 text-gray-400">or sign up with</span>
                    </div>
                </div>
                <p className="mt-6 text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-purple-400 hover:underline">Log in</Link>
                </p>
            </div>
        </main>
    )
}