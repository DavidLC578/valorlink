import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*****" },
            },
            async authorize(credentials, req) {
                console.log(credentials)

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error('No user found')

                console.log(userFound)

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)

                if (!matchPassword) throw new Error('Wrong password')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                    isProfileComplete: userFound.isProfileComplete
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signin",
        error: "/auth/signin",
    },
    callbacks: {
        async session({ session, token }) {
            // Get the latest user data from the database
            const user = await db.user.findUnique({
                where: { id: token.id },
                select: { isProfileComplete: true }
            });

            // Update the session with the latest data
            session.user.id = token.id;
            session.user.isProfileComplete = user?.isProfileComplete || false;
            return session;
        },
        async jwt({ token, user }) {
            // The `user` object is only available on first login
            if (user) {
                token.id = user.id;
                token.isProfileComplete = user.isProfileComplete;
            }
            return token;
        }
    }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };