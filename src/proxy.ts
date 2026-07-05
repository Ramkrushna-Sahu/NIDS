import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// 1. Define arrays for route categories. Easily add more in the future.
const AUTH_PAGES = ["/sign-in", "/sign-up", "/verify-email", "/reset-password", "/forgot-password"];

const PROTECTED_PREFIXES = ["/dashboard", "/profile", "file-analysis", "/real-time-monitoring"];

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl.pathname

    // 2. Dynamic check using arrays
    const isAuthPage = AUTH_PAGES.includes(url);
    
    // Checks if the current path starts with any of your protected route prefixes
    const isProtectedPage = PROTECTED_PREFIXES.some(prefix => url.startsWith(prefix));

    // Logged-in users should not visit auth pages -> bounce to dashboard
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Unauthenticated users trying to access any protected section -> bounce to sign-in
    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

// 3. Make the matcher catch all nested paths using wildcard configurations (:path*)
export const config = {
    matcher: [
        '/sign-in', 
        '/sign-up', 
        '/dashboard', 
        '/profile', 
        '/verify-email'
    ]
}



// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// export { default } from "next-auth/middleware"
// import { getToken } from 'next-auth/jwt'

// // This function can be marked `async` if using `await` inside
// export async function proxy(request: NextRequest) {
//     const token = await getToken({ req: request })
//     const url = request.nextUrl.pathname

//     const isAuthPage = url === "/sign-in" || url === "/register";
//     const isProtectedPage = url.startsWith("/dashboard");

//     // Logged-in users should not visit auth pages
//     if (token && isAuthPage) {
//         return NextResponse.redirect(
//             new URL("/dashboard", request.url)
//         );
//     }
//     // Unauthenticated users cannot access dashboard
//     if (!token && isProtectedPage) {
//         return NextResponse.redirect(
//             new URL("/sign-in", request.url)
//         );
//     }
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/sign-in', '/sign-up', '/', '/dashboard', '/verify-email']
// }