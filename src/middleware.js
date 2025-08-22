import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Array of protected routes
const protectedRoutes = [
    '/home',
    '/profile',
    '/friend-list',
    '/find-players'
];

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req });

    // Redirect to /home if the user is authenticated and is at the root
    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/home', req.url));
        }
        return NextResponse.next();
    }

    // Verify protected routes
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    // Redirect to /auth/signin if the user is not authenticated and is at a protected route
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/home/:path*',
        '/profile/:path*',
        '/friend-list/:path*',
        '/find-players/:path*'
    ]
};