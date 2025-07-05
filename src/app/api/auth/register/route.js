import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
    try {
        const data = await request.json();

        const userFound = await db.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (userFound) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                    status: 400,
                },
            );
        }

        const usernameFound = await db.user.findUnique({
            where: {
                username: data.username,
            },
        });

        if (usernameFound) {
            return NextResponse.json(
                {
                    message: "Username already exists",
                    status: 400,
                },
            );
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>/?]).{8,}$/;

        if (!passwordRegex.test(data.password)) {
            return NextResponse.json(
                {
                    message: "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters",
                    status: 400,
                },
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
            },
        });

        const { password: _, ...user } = newUser;

        return NextResponse.json(
            {
                user,
                status: 200,
            },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
                status: 500,
            }
        );
    }
}