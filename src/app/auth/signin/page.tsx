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

        console.log(res)
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