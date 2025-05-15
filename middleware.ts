import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtener la ruta actual
  const path = request.nextUrl.pathname;

  // Definir rutas públicas
  const isPublicPath = [
    '/',
    '/login',
    '/menu',
    '/ubicacion',
    '/contacto'
  ].includes(path);

  // Definir rutas protegidas
  const isProtectedPath = path.startsWith('/admin') || path.startsWith('/inventario');

  // Obtener token de sesión (en este caso, localStorage simulado)
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  // Lógica de redirección
  if (isProtectedPath && !isLoggedIn) {
    // Si intenta acceder a ruta admin sin estar logueado, redirige a login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (path === '/login' && isLoggedIn) {
    // Si está logueado e intenta ir a login, redirige a dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Si no se cumple ninguna condición, continúa normalmente
  return NextResponse.next();
}

// Configurar qué rutas serán interceptadas por el middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/inventario/:path*',
    '/login',
    '/',
    '/login',
    '/admin/:path*',
    '/menu',
    '/ubicacion',
    '/contacto'
  ]
}
