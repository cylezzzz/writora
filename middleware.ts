import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Erstmal basic - später mit Auth erweitern
  const { pathname } = request.nextUrl;

  // Protect studio routes (später mit Auth)
  if (pathname.startsWith('/studio')) {
    // Für jetzt einfach durchlassen
    return NextResponse.next();
  }

  // API routes durchlassen
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};