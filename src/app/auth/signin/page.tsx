'use client'
import { User } from "@/interfaces/interface";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const { register, handleSubmit } = useForm<User>();
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (data: User) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res && res.error) {
            setError(res.error)
        } else {
            router.push('/home')
            router.refresh()
        }
    };
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h2>

                {
                    error && (
                        <div className="bg-red-600 border border-red-500 px-4 py-2 rounded-md font-semibold text-sm mb-4 flex items-center justify-between">
                            <span>{error}</span>
                            <button type="button" className="text-white hover:text-red-500 transition-colors" onClick={() => setError(null)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    )
                }

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="yourname@example.com"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                            })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="********"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                            })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-lg transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="relative mt-6 mb-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                </div>
                <p className="mt-6 text-sm text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="text-purple-400 hover:underline">Sign up</Link>
                </p>
            </div>
        </main>
    )
}