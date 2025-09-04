import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/auth/(.*)' // Allow auth-related API routes
];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some(route => {
    const regex = new RegExp(`^${route.replace('(.*)', '.*')}$`);
    return regex.test(pathname);
  });
};

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get('accessToken')?.value;
//   const refreshToken = request.cookies.get('refreshToken')?.value;

// console.log("In middleware")

//   if (isPublicRoute(pathname)) {
//     return NextResponse.next();
//   }

//   if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
//     if (accessToken) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//     return NextResponse.next();
//   }


//   // For API routes, just verify the token
//   if (pathname.startsWith('/api/')) {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`, {
//         headers: {
//           Cookie: request.headers.get('Cookie') || '',
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
//           status: 401,
//           headers: { 'Content-Type': 'application/json' },
//         });
//       }

//       return NextResponse.next();
//     } catch (error) {
//       return new NextResponse(JSON.stringify({ error: 'Authentication failed' }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//   }

//   // For page routes, redirect to login if not authenticated
//   try {
//     const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`, {
//       headers: {
//         Cookie: request.headers.get('Cookie') || '',
//       },
//       credentials: 'include'
//     });
// console.log("Verify Response", verifyResponse)
//     if (!verifyResponse.ok) {
//       throw new Error('Unauthorized');
//     }

//     return NextResponse.next();
//   } catch (error) {
//     const loginUrl = new URL('/sign-in', request.url);
//     loginUrl.searchParams.set('redirect', pathname);
//     return NextResponse.redirect(loginUrl);
//   }
// }
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // Skip middleware for public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // For all other routes, verify authentication
  if (!accessToken) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};