// archivo: middleware.ts
export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/admin/:path*", // Proteger todas las sub-rutas de /admin
    "/profile",      // Ejemplo de otra ruta protegida para usuarios logueados
  ] 
}