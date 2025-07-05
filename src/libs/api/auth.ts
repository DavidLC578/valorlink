import { User } from "@/interfaces/interface";

export const signup = async (data: User) => {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resJSON = await res.json();
    return resJSON;
};