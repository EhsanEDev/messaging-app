import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// const PUBLIC_PATHS = ['/signin', '/signup', '/api', '/logo.png', '/_next', '/favicon.ico', '/robots.txt'];

// function isPublicPath(pathname: string) {
//   return PUBLIC_PATHS.some(path => pathname.startsWith(path));
// }

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // ✅ Allow public routes without checks
//   if (isPublicPath(pathname)) return NextResponse.next();

  const token = request.cookies.get('authToken')?.value;
  
  // ⛔️ No token — redirect to /signin
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  try {
    // ✅ Verify token
    await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    // ⛔️ Invalid or expired token — redirect to /signin
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

// Define public routes
export const config = {
  matcher: ['/((?!_next|api|signin|signup|logo.png|favicon.ico|robots.txt).*)'],
};