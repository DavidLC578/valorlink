'use client'
import { User } from "@/interfaces/interface";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signup } from "@/libs/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: User) => {
        const res = await signup(data);
        if (res.status === 200) {
            router.push("/auth/signin");
        }
        if (res.status === 400) {
            setError(res.message);
        }
    };
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Create your account
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
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            placeholder="E.g. JohnDoe123"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                            })}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-xs">
                                {errors.username.message}
                            </span>
                        )}
                    </div>

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
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email.message}
                            </span>
                        )}
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
                        {errors.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg text-lg transition-all"
                    >
                        Sign up
                    </button>
                </form>

                <div className="relative mt-6 mb-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
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